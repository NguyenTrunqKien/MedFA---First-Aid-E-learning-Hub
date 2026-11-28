(() => {
  'use strict';
  const el = id => document.getElementById(id);
  const t = (key, params) => window.I18n.t('care.' + key, params);
  const defaultCenter = { lat: 10.7769, lng: 106.7009 };
  let adapter, origin, radius, results = [], markers = [], picking = false, sequence = 0;
  let status = 'initial';
  let layoutFrame, selectedPlace;
  function scheduleLayout() {
    cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(layoutPins);
  }
  function layoutPins() {
    if (!adapter || !markers.length) return;
    const container = el('care-map');
    const zoom = adapter.zoom();
    const limit = zoom <= 13 ? 3 : zoom <= 15 ? 5 : 10;
    container.style.setProperty('--care-label-size', Math.max(11, Math.min(16, 28 - zoom)) + 'px');
    const view = container.getBoundingClientRect();
    const occupied = [];
    let count = 0;
    const rank = marker => marker.place === selectedPlace && selectedPlace ? 0 : marker.place?.type === 'hospital' ? 1 : 2;
    // Stable sort preserves nearest-first order within each priority group.
    for (const marker of [...markers].sort((a, b) => rank(a) - rank(b))) {
      if (!marker.place) continue;
      const root = marker.element;
      const icon = root.querySelector('.care-symbol');
      const label = root.querySelector('.care-place-label');
      if (!icon || !label) continue;
      root.style.visibility = 'hidden';
      if (count >= limit) continue;
      const pin = icon.getBoundingClientRect();
      if (!pin.width || pin.right < view.left || pin.left > view.right || pin.bottom < view.top || pin.top > view.bottom) continue;
      for (const side of ['right', 'left']) {
        label.dataset.side = side;
        const name = label.getBoundingClientRect();
        const box = { left: Math.min(pin.left, name.left), right: Math.max(pin.right, name.right),
          top: Math.min(pin.top, name.top), bottom: Math.max(pin.bottom, name.bottom) };
        if (box.left < view.left || box.right > view.right || box.top < view.top || box.bottom > view.bottom) continue;
        if (occupied.some(r => box.left < r.right + 5 && box.right > r.left - 5 &&
          box.top < r.bottom + 5 && box.bottom > r.top - 5)) continue;
        root.style.visibility = 'visible';
        occupied.push(box);
        count++;
        break;
      }
    }
  }
  function message(key) {
    status = key;
    el('fallback').hidden = key !== 'error';
    el('care-status').textContent = t(key, { km: radius / 1000, n: results.length });
  }
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = resolve;
      script.onerror = reject;
      script.src = src;
      document.head.append(script);
    });
  }
  function distance(a, b) {
    const rad = Math.PI / 180;
    const h = Math.sin((b.lat - a.lat) * rad / 2) ** 2 +
      Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin((b.lng - a.lng) * rad / 2) ** 2;
    return 12742000 * Math.asin(Math.sqrt(Math.min(1, h)));
  }
  function pinContent(type, name) {
    const pin = document.createElement('span');
    pin.className = type ? 'care-symbol' : 'care-location-dot';
    if (type) {
      pin.textContent = type === 'hospital' ? 'H' : '+';
      const label = document.createElement('span');
      label.className = 'care-place-label';
      label.textContent = name;
      pin.append(label);
    }
    return pin;
  }
  async function openMap() {
    const base = 'https://unpkg.com/leaflet@1.9.4/dist/';
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = base + 'leaflet.css';
    document.head.append(css);
    await loadScript(base + 'leaflet.js');
    const map = L.map('care-map').setView(defaultCenter, 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);
    map.on('click', event => choose(event.latlng));
    map.on('move zoomend resize viewreset', scheduleLayout);
    let vietnamDirectory;
    return {
      center: () => map.getCenter(),
      zoom: () => map.getZoom(),
      focus: (point, zoom = 14) => map.setView(point, zoom, { animate: false }),
      bounds: points => map.fitBounds(points, { padding: [30, 30], maxZoom: 16, animate: false }),
      pin(point, type, name, select) {
        const icon = L.divIcon({ className: 'care-pin', html: pinContent(type, name), iconSize: [22, 22] });
        const marker = L.marker(point, { icon, title: name, alt: name, riseOnHover: true }).addTo(map);
        marker.on('click', () => picking ? choose(point) : select?.());
        // Open explicitly so Leaflet doesn't also toggle the popup on the same click.
        const popup = L.popup({ offset: [0, -10] }, marker).setLatLng(point);
        return {
          element: marker.getElement(),
          remove() { popup.remove(); marker.remove(); },
          resize() { if (popup.isOpen()) popup.update(); },
          show(node) { popup.setContent(node).openOn(map); }
        };
      },
      async search(point, meters) {
        // The HOT extract covers mainland Vietnam. Check nearby entries on-device
        // before sending coordinates to a public Overpass server.
        if (point.lat >= 8.2 && point.lat <= 23.6 && point.lng >= 101.9 && point.lng <= 109.7) {
          try {
            if (!vietnamDirectory) {
              const response = await fetch('data/nearby-care-vn.json', { signal: AbortSignal.timeout(4000) });
              if (!response.ok) throw Error('Directory unavailable');
              vietnamDirectory = (await response.json()).facilities;
            }
            const nearby = vietnamDirectory.filter(place => distance(point, place) <= meters);
            if (nearby.length) return nearby;
          } catch {
            // A missing local file should still allow a live search.
          }
        }
        const around = '(around:' + meters + ',' + point.lat + ',' + point.lng + ')';
        const query = '[out:json][timeout:20];(nwr["amenity"~"^(hospital|clinic|doctors)$"]' + around +
          ';nwr["healthcare"~"^(hospital|clinic|doctor|centre|health_post)$"]' + around + ';);out center;';
        const response = await fetch('https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query),
          { signal: AbortSignal.timeout(8000) });
        if (!response.ok) throw Error('Places unavailable');
        const data = await response.json();
        if (data.remark || !Array.isArray(data.elements)) throw Error('Incomplete results');
        return data.elements.flatMap(item => {
          const tags = item.tags || {}, location = item.center || item;
          const name = tags.name || tags['name:vi'] || tags['name:en'];
          if (!name || !Number.isFinite(location.lat) || !Number.isFinite(location.lon)) return [];
          const kind = tags.healthcare || tags.amenity;
          const type = /trạm y tế/i.test(name) || kind === 'health_post' ? 'station' :
            kind === 'hospital' ? 'hospital' : ['clinic', 'doctor', 'doctors'].includes(kind) ? 'clinic' : 'facility';
          return [{ name, type, tags, address: tags['addr:full'] || ['housenumber', 'street', 'suburb', 'city']
            .map(k => tags['addr:' + k]).filter(Boolean).join(' '), lat: location.lat, lng: location.lon }];
        });
      }
    };
  }
  async function googleMap(key) {
    await loadScript('https://maps.googleapis.com/maps/api/js?v=weekly&key=' + encodeURIComponent(key));
    const [{ Map, InfoWindow }, { AdvancedMarkerElement }, { Place, SearchNearbyRankPreference }] =
      await Promise.all(['maps', 'marker', 'places'].map(lib => google.maps.importLibrary(lib)));
    const map = new Map(el('care-map'), { center: defaultCenter, zoom: 12, mapId: 'DEMO_MAP_ID', streetViewControl: false });
    const popup = new InfoWindow();
    map.addListener('bounds_changed', scheduleLayout);
    map.addListener('idle', scheduleLayout);
    map.addListener('click', event => { if (event.latLng) choose(event.latLng.toJSON()); });
    return {
      center: () => map.getCenter().toJSON(),
      zoom: () => map.getZoom(),
      focus(point, zoom = 14) { popup.close(); map.setCenter(point); map.setZoom(zoom); },
      bounds(points) {
        const bounds = new google.maps.LatLngBounds();
        points.forEach(point => bounds.extend(point));
        map.fitBounds(bounds, 40);
      },
      pin(point, type, title, select) {
        const marker = new AdvancedMarkerElement({ map, position: point, title, gmpClickable: !!select, anchorTop: '-50%' });
        marker.append(pinContent(type, title));
        if (select) marker.addEventListener('gmp-click', () => picking ? choose(point) : select());
        return { element: marker, remove() { marker.map = null; }, show(node) { popup.setContent(node); popup.open({ map, anchor: marker }); } };
      },
      async search(point, meters) {
        const { places } = await Place.searchNearby({
          fields: ['id', 'displayName', 'location', 'formattedAddress', 'primaryType'],
          includedTypes: ['hospital', 'general_hospital', 'medical_center', 'medical_clinic', 'doctor'],
          locationRestriction: { center: point, radius: meters }, maxResultCount: 10,
          rankPreference: SearchNearbyRankPreference.DISTANCE
        });
        return places.filter(p => p.location).map(p => ({
          ...p.location.toJSON(), id: p.id, name: p.displayName, address: p.formattedAddress,
          type: /trạm y tế/i.test(p.displayName) ? 'station' : /hospital/.test(p.primaryType) ? 'hospital' :
            ['medical_clinic', 'doctor'].includes(p.primaryType) ? 'clinic' : 'facility'
        }));
      }
    };
  }
  const osmDetails = new Map();
  async function fillPlaceDetails(place, container, resize) {
    let tags = place.tags;
    if (!tags && /^(node|way|relation)\/\d+$/.test(place.osmId || '')) {
      if (!osmDetails.has(place.osmId)) {
        osmDetails.set(place.osmId, fetch('https://api.openstreetmap.org/api/0.6/' + place.osmId + '.json',
          { signal: AbortSignal.timeout(5000) }).then(async response => {
          if (!response.ok) throw Error('OSM unavailable');
          return (await response.json()).elements[0].tags || {};
        }).catch(() => { osmDetails.delete(place.osmId); return {}; }));
      }
      tags = await osmDetails.get(place.osmId);
    }
    if (!tags) return;
    const address = tags['addr:full'] || [tags['addr:housenumber'], tags['addr:street'], tags['addr:city']].filter(Boolean).join(' ');
    for (const [label, value] of [['address', address !== place.address && address], ['hours', tags.opening_hours],
      ['phone', tags['contact:phone'] || tags.phone], ['access', tags.wheelchair === 'yes' && t('accessible')]]) {
      if (!value) continue;
      const line = document.createElement('p');
      line.textContent = t(label) + ' · ' + value;
      container.append(line);
    }
    if (/^(File|Category):/i.test(tags.wikimedia_commons || '')) {
      const link = document.createElement('a');
      link.textContent = t('photo');
      link.href = 'https://commons.wikimedia.org/wiki/' + encodeURIComponent(tags.wikimedia_commons);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      container.append(link);
    }
    if (container.isConnected && container.childElementCount) resize?.();
  }
  function card(place, select, resize) {
    const node = document.createElement('div');
    const name = document.createElement(select ? 'button' : 'strong');
    name.textContent = place.name;
    if (select) name.onclick = select;
    const meta = document.createElement('p');
    const km = new Intl.NumberFormat(window.I18n.getLanguage(), { maximumFractionDigits: 2 }).format(place.meters / 1000);
    meta.textContent = [t(place.type), km + ' km', place.address].filter(Boolean).join(' · ');
    const links = document.createElement('div');
    links.className = 'care-links';
    const coords = place.lat + ',' + place.lng;
    for (const directions of [false, true]) {
      const url = new URL('https://www.google.com/maps/' + (directions ? 'dir/' : 'search/'));
      url.searchParams.set('api', '1');
      if (directions) url.searchParams.set('origin', origin.lat + ',' + origin.lng);
      const param = directions ? 'destination' : 'query';
      url.searchParams.set(param, coords);
      if (place.id) url.searchParams.set(param + '_place_id', place.id);
      const link = document.createElement('a');
      link.textContent = t(directions ? 'directions' : 'details');
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('class', 'care-icon');
      icon.setAttribute('aria-hidden', 'true');
      const glyph = document.createElementNS(icon.namespaceURI, 'use');
      glyph.setAttribute('href', 'assets/icons/care.svg#' + (directions ? 'directions' : 'external'));
      icon.append(glyph);
      link.prepend(icon);
      link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
      links.append(link);
    }
    node.append(name, meta, links);
    if (!select) {
      node.className = 'care-place-card';
      const details = document.createElement('div');
      links.before(details);
      fillPlaceDetails(place, details, resize);
    }
    return node;
  }
  function render() {
    markers.forEach(marker => marker.remove());
    markers = [];
    el('care-list').replaceChildren();
    if (origin) markers.push(adapter.pin(origin, null, t('origin')));
    results.forEach(place => {
      const select = () => {
        selectedPlace = place;
        marker.element.style.visibility = 'visible';
        marker.show(card(place, null, marker.resize));
        scheduleLayout();
      };
      const marker = adapter.pin(place, place.type, place.name, select);
      marker.place = place;
      markers.push(marker);
      const item = document.createElement('li');
      item.append(card(place, () => {
        adapter.focus(place, Math.max(17, adapter.zoom()));
        select();
        if (window.matchMedia('(max-width: 750px)').matches) {
          el('care-map').scrollIntoView({ block: 'center' });
        }
      }));
      el('care-list').append(item);
    });
    message(status);
    scheduleLayout();
  }
  async function search(point, meters) {
    const id = ++sequence;
    setPicking(false);
    selectedPlace = null;
    origin = { lat: point.lat, lng: point.lng };
    radius = meters;
    results = [];
    el('expand').hidden = el('retry').hidden = true;
    adapter.focus(origin);
    message('loading');
    render();
    try {
      const places = await adapter.search(origin, meters);
      if (id !== sequence) return;
      for (const p of places) p.meters = distance(origin, p);
      const sorted = places.filter(p => p.meters <= meters).sort((a, b) => a.meters - b.meters);
      for (const p of sorted) {
        if (!results.some(r => r.name === p.name && distance(r, p) < 100)) results.push(p);
        if (results.length === 10) break;
      }
      message(results.length ? 'found' : 'empty');
      render();
      if (results.length) adapter.bounds([origin, ...results]);
      el('expand').hidden = meters >= 10000;
    } catch {
      if (id !== sequence) return;
      message('error');
      el('retry').hidden = false;
      const fallback = el('fallback');
      const url = new URL('https://www.google.com/maps/search/');
      url.searchParams.set('api', '1');
      url.searchParams.set('query', 'bệnh viện gần ' + origin.lat + ',' + origin.lng);
      fallback.href = url.href;
    }
  }
  function choose(point) { if (picking) search(point, 5000); }
  function setPicking(value) {
    picking = value;
    el('care-map').classList.toggle('care-picking', value);
    el('pick').setAttribute('aria-pressed', String(value));
  }
  el('pick').onclick = event => {
    ++sequence;
    setPicking(true);
    if (!event.detail) el('care-map').focus();
    message('picking');
  };
  el('care-map').addEventListener('keydown', event => {
    if (picking && event.key === 'Enter' && !event.target.closest('button, a, [role="button"]')) {
      event.preventDefault();
      choose(adapter.center());
    }
  });
  el('expand').onclick = () => search(origin, 10000);
  el('retry').onclick = () => search(origin, radius);
  el('locate').onclick = () => {
    const id = ++sequence;
    setPicking(false);
    if (!navigator.geolocation) return message('denied');
    message('gps');
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      if (id === sequence) search({ lat: coords.latitude, lng: coords.longitude }, 5000);
    }, () => { if (id === sequence) message('denied'); }, { timeout: 12000, maximumAge: 60000, enableHighAccuracy: true });
  };
  window.addEventListener('medfa:languageChanged', render);
  async function init() {
    message('initial');
    try {
      const key = document.querySelector('meta[name="google-maps-browser-key"]').content.trim();
      adapter = key ? await googleMap(key) : await openMap();
      el('locate').disabled = el('pick').disabled = false;
    } catch { message('mapError'); }
  }
  init();
})();
