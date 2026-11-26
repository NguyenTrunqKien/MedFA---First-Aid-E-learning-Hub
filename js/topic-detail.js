/**
 * ==========================================================================
 * MedFA - Điều phối Trang Chi tiết Tình huống Sơ cấp cứu (topic-detail.html)
 * ==========================================================================
 * Tách riêng từ inline script để mã nguồn dễ đọc, dễ bảo trì cho developer.
 * Chức năng chính:
 *  1. Nạp dữ liệu chi tiết tình huống theo tham số `?id=...`
 *  2. Đồng bộ SEO động: Title, Description, Canonical, Open Graph & Schema.org
 *     (MedicalWebPage + HowTo + BreadcrumbList + Citation nguồn y khoa)
 *  3. Render Timeline 4 phút vàng, Video minh họa, Nguồn tham khảo & Tình huống liên quan
 *  4. Bộ đếm nhịp ép tim CPR 110 BPM (Web Audio API + Visual Pulse)
 */
(function () {
  'use strict';

  /**
   * Escape ký tự đặc biệt HTML để chống XSS (tái sử dụng hàm escapeHTML từ js/components/layout.js)
   * @param {string|number} str
   * @returns {string}
   */
  function escapeTopicHTML(str) {
    if (window.MedFAComponents?.escapeHTML) {
      return window.MedFAComponents.escapeHTML(str);
    }
    return String(str || '').replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  /**
   * Tạo URL tuyệt đối cho trang chi tiết hiện tại
   * @param {string} topicId
   * @returns {string}
   */
  function getTopicCanonicalUrl(topicId) {
    if (window.MedFASeoHelper) {
      return window.MedFASeoHelper.buildCanonicalUrl(`topic-detail.html?id=${encodeURIComponent(topicId)}`);
    }
    return window.location.href;
  }

  /**
   * Nhúng Structured Data Schema.org (MedicalWebPage + HowTo) giúp Google hiển thị Rich Snippets
   * và ghi nhận trích dẫn (citation) từ các nguồn y khoa chính thống (E-E-A-T).
   * @param {Object} topic
   */
  function injectTopicSchema(topic) {
    if (!topic) return;
    const existing = document.getElementById('dynamic-topic-schema');
    if (existing) existing.remove();

    const canonicalUrl = getTopicCanonicalUrl(topic.id);
    const displayTitle = topic.fullTitle || topic.title;
    const citations = Array.isArray(topic.sources)
      ? topic.sources
          .filter(s => s && s.url && s.url.startsWith('https://'))
          .map(s => ({
            '@type': 'CreativeWork',
            name: s.name || s.url,
            url: s.url
          }))
      : [];

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalWebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: displayTitle,
          description: topic.shortDesc || topic.lead,
          inLanguage: 'vi-VN',
          medicalAudience: {
            '@type': 'MedicalAudience',
            audienceType: 'Patient'
          },
          about: {
            '@type': 'MedicalCondition',
            name: topic.title
          },
          ...(citations.length > 0 ? { citation: citations } : {})
        },
        {
          '@type': 'HowTo',
          name: `Quy trình sơ cứu: ${displayTitle}`,
          description: topic.lead || topic.shortDesc,
          step: Array.isArray(topic.steps)
            ? topic.steps.map((s, idx) => ({
                '@type': 'HowToStep',
                position: s.stepNumber || idx + 1,
                name: s.title,
                text: s.desc
              }))
            : []
        }
      ]
    };

    const scriptEl = document.createElement('script');
    scriptEl.id = 'dynamic-topic-schema';
    scriptEl.type = 'application/ld+json';
    scriptEl.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(scriptEl);
  }

  /**
   * Kiểm tra xem tình huống hiện tại có liên quan đến Hồi sinh tim phổi (CPR) hay không (DRY)
   * Dùng chung để quyết định bật/tắt cả Widget CPR Metronome và Bảng thông số CPR & AED.
   * @param {Object} topic
   * @returns {boolean}
   */
  const CPR_TOPIC_IDS = new Set([
    'ngung-tuan-hoan-cpr',
    'hoi-sinh-tim-phoi-nguoi-lon',
    'duoi-nuoc-o-tre-em',
    'dien-giat',
    'hoc-di-vat',
    'hoc-di-vat-o-tre-em'
  ]);

  function isCprTopic(topic) {
    if (!topic) return false;
    if (CPR_TOPIC_IDS.has(topic.id)) return true;
    const text = [
      topic.title || '',
      topic.lead || '',
      topic.emergencyAlert || '',
      ...(Array.isArray(topic.steps) ? topic.steps.map(s => `${s.title || ''} ${s.desc || ''}`) : [])
    ].join(' ').toLowerCase();
    return text.includes('cpr') || text.includes('ép tim') || text.includes('hồi sinh tim phổi');
  }

  /**
   * Nạp khối Lưu ý y khoa (MEDICAL_DISCLAIMER_HTML) từ js/components/detail.js và gắn danh sách nguồn của bài
   */
  function renderMedicalDisclaimer(topic) {
    const disclaimer = document.getElementById('medical-disclaimer');
    if (!disclaimer) return;
    const markup = window.MedFAComponents?.MEDICAL_DISCLAIMER_HTML;
    if (markup && !disclaimer.dataset.loaded) {
      disclaimer.innerHTML = markup;
      disclaimer.dataset.loaded = 'true';
    }
    window.I18n?.applyTranslations(disclaimer);

    const list = document.getElementById('detail-source-list');
    if (!list) return;
    list.replaceChildren();

    for (const source of topic?.sources || []) {
      if (!source?.name && !source?.url) continue;
      let url;
      try {
        url = new URL(source.url);
      } catch {
        continue;
      }
      if (url.protocol !== 'https:') continue;

      const link = document.createElement('a');
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = source.name || url.hostname;
      link.className = 'underline text-primary hover:text-primary-container';

      const item = document.createElement('li');
      item.append(link);
      if (source.accessDate) {
        const dateNote = document.createElement('span');
        dateNote.className = 'text-xs text-on-surface-variant ml-1.5';
        const accessedPrefix = window.t ? t('disclaimer.accessedDate', { date: source.accessDate }) : `(Đối chiếu: ${source.accessDate})`;
        dateNote.textContent = accessedPrefix;
        item.append(dateNote);
      }
      list.append(item);
    }

    const emptyNotice = document.getElementById('detail-sources-empty');
    if (emptyNotice) {
      emptyNotice.hidden = list.childElementCount > 0;
    }
  }

  /**
   * Render động thanh mốc thời gian thiếu oxy cho bất kỳ bài học nào có dữ liệu timeline
   * @param {Object} topic
   */
  function renderTopicTimeline(topic) {
    const timelineBox = document.getElementById('choking-timeline');
    const labelsGrid = document.getElementById('hypoxia-timeline-labels');
    if (!timelineBox || !labelsGrid) return;

    if (!Array.isArray(topic.timeline) || topic.timeline.length === 0) {
      timelineBox.hidden = true;
      return;
    }

    const barsContainer = timelineBox.querySelector('.flex.w-full.bg-surface-container, .w-full.bg-surface-container');
    const colorMap = {
      safe: 'bg-secondary-container',
      warning: 'bg-primary-fixed',
      danger: 'bg-on-tertiary-container',
      critical: 'bg-tertiary'
    };
    const textMap = {
      safe: '',
      warning: '',
      danger: 'text-tertiary font-semibold',
      critical: 'text-tertiary font-bold'
    };

    const count = topic.timeline.length;
    const pct = `${(100 / count).toFixed(2)}%`;

    if (barsContainer) {
      barsContainer.innerHTML = topic.timeline.map(item => {
        const bg = colorMap[item.level] || 'bg-primary-fixed';
        return `<div class="h-full ${bg} transition-all" style="width: ${pct}" title="${escapeTopicHTML(item.time)}: ${escapeTopicHTML(item.status)}"></div>`;
      }).join('');
    }

    labelsGrid.className = `grid grid-cols-${Math.min(count, 4)} gap-2 text-center text-xs mt-2 text-on-surface-variant hypoxia-timeline-labels`;
    labelsGrid.innerHTML = topic.timeline.map(item => {
      const cls = textMap[item.level] || '';
      return `<div class="${cls}"><strong>${escapeTopicHTML(item.time)}</strong><br><span class="hidden sm:inline">${escapeTopicHTML(item.status)}</span></div>`;
    }).join('');

    timelineBox.hidden = false;
  }

  const CREATOR_EN_MAP = {
    'Bệnh viện Đa Khoa Tâm Anh': 'Tam Anh General Hospital',
    'Bệnh viện Đa khoa Tâm Anh': 'Tam Anh General Hospital',
    'Bệnh viện Bạch Mai / Báo Sức khỏe & Đời sống': 'Bach Mai Hospital / Health & Life Newspaper',
    'Bệnh viện Đại học Y dược TP.HCM': 'University Medical Center HCMC',
    'Bệnh viện Bỏng quốc gia Lê Hữu Trác': 'Le Huu Trac National Burn Hospital',
    'Bệnh viện Chấn thương Chỉnh hình TP.HCM': 'Hospital for Traumatology and Orthopaedics HCMC',
    'Bệnh viện Đa khoa tỉnh Phú Thọ': 'Phu Tho Provincial General Hospital',
    'Bệnh viện Hoàn Mỹ Sài Gòn': 'Hoan My Saigon Hospital',
    'Bệnh viện Nam Sài Gòn': 'South Saigon International General Hospital',
    'Sức khỏe & Đời sống (SKĐS)': 'Health & Life Newspaper (SKDS)',
    'Báo Sức khỏe & Đời sống': 'Health & Life Newspaper',
    'Báo Pháp Luật TP HCM': 'Ho Chi Minh City Law Newspaper',
    'Dr. Wynn Tran Official': 'Dr. Wynn Tran Official',
    'CDC Đồng Nai': 'Dong Nai CDC',
    'VTV24': 'VTV24',
    'THVL Tổng Hợp': 'THVL General',
    'Truyền hình Quảng Trị': 'Quang Tri Television',
    'Kênh sức khỏe cộng đồng': 'Community Health Channel',
    'HTV7': 'HTV7',
    '1LIFE FIRST AID (BS. Phạm Quang Vinh)': '1LIFE FIRST AID (Dr. Pham Quang Vinh)',
    'Nghệ An TV': 'Nghe An TV',
    'Y học thường thức – BS Nguyễn Trung Thực': 'General Medicine – Dr. Nguyen Trung Thuc',
    'VTV Sức khỏe': 'VTV Health',
    'Học Y Cùng Tui': 'Study Medicine With Me'
  };

  /**
   * Render liên kết video hướng dẫn — mở trực tiếp trên YouTube (không nhúng iframe)
   * @param {Object} topic
   */
  function renderTopicVideo(topic) {
    const videoSection = document.getElementById('detail-video-section');
    const creatorEl = document.getElementById('detail-video-creator');
    const linkEl = document.getElementById('detail-video-link');
    const linkLabelEl = document.getElementById('detail-video-link-label');

    if (!videoSection || !linkEl || !topic?.video?.youtubeUrl) {
      if (videoSection) videoSection.hidden = true;
      return;
    }

    try {
      const parsed = new URL(topic.video.youtubeUrl);
      if (parsed.protocol !== 'https:') {
        videoSection.hidden = true;
        return;
      }
      linkEl.href = parsed.href;
      if (linkLabelEl) {
        const isYouTube = parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be');
        const ytText = window.t ? t('detail.youtubeView') : 'Mở trên YouTube';
        const vidText = window.t ? t('detail.videoGuide') : 'Xem video hướng dẫn';
        linkLabelEl.textContent = isYouTube ? ytText : vidText;
      }
      if (creatorEl) {
        const isEn = typeof window !== 'undefined' && window.I18n && window.I18n.getLanguage() === 'en';
        const prefix = (typeof window !== 'undefined' && typeof window.t === 'function')
          ? window.t('detail.videoSourcePrefix')
          : (isEn ? 'Professional Source: ' : 'Nguồn chuyên môn: ');
        const fallback = (typeof window !== 'undefined' && typeof window.t === 'function')
          ? window.t('detail.videoFallbackDesc')
          : (isEn ? 'Visual instructional video for first aid procedure.' : 'Video minh họa trực quan quy trình sơ cấp cứu.');

        let creatorName = topic.video.creator || '';
        if (isEn && CREATOR_EN_MAP[creatorName]) {
          creatorName = CREATOR_EN_MAP[creatorName];
        }

        creatorEl.textContent = creatorName
          ? `${prefix}${creatorName}`
          : fallback;
      }

      videoSection.hidden = false;
    } catch {
      videoSection.hidden = true;
    }
  }

  /**
   * Render tối đa 3 tình huống liên quan cùng chuyên mục nhằm tăng liên kết nội bộ (Internal Linking SEO)
   * @param {Object} currentTopic
   * @param {Array<Object>} allTopics
   */
  function renderRelatedTopics(currentTopic, allTopics) {
    const section = document.getElementById('related-topics-section');
    const grid = document.getElementById('related-topics-grid');
    if (!section || !grid || !currentTopic || !Array.isArray(allTopics)) return;

    const sameCategory = allTopics.filter(
      t => t.id !== currentTopic.id && t.category === currentTopic.category && !t.needsMedicalReview
    );
    const fallbackPool = allTopics.filter(
      t => t.id !== currentTopic.id && t.category !== currentTopic.category && !t.needsMedicalReview
    );
    const related = [...sameCategory, ...fallbackPool].slice(0, 3);

    if (related.length === 0) {
      section.hidden = true;
      return;
    }

    grid.innerHTML = related.map(item =>
      window.MedFAComponents?.createRelatedTopicCardHTML
        ? window.MedFAComponents.createRelatedTopicCardHTML(item)
        : ''
    ).join('');

    section.hidden = false;
  }

  /**
   * Bộ đếm nhịp Ép tim CPR 110 lần/phút bằng Web Audio API + hiệu ứng nhấp nháy trực quan.
   * Chỉ được gắn vào DOM qua js/components.js khi bài thuộc nhóm CPR.
   */
  function initCprMetronome() {
    const toggleBtn = document.getElementById('cpr-metronome-btn');
    const btnText = document.getElementById('cpr-metronome-btn-text');
    const indicator = document.getElementById('cpr-beat-indicator');
    const counterEl = document.getElementById('cpr-beat-counter');
    const hintEl = document.getElementById('cpr-cycle-hint');
    const soundBtn = document.getElementById('cpr-sound-btn');
    const soundIcon = document.getElementById('cpr-sound-icon');
    const soundText = document.getElementById('cpr-sound-text');
    if (!toggleBtn || !indicator || !counterEl) return;

    const BPM = 110; // Khuyến cáo AHA/ERC: 100 - 120 nhịp/phút
    const INTERVAL_MS = Math.round(60000 / BPM);
    let timerId = null;
    let audioCtx = null;
    let soundEnabled = true;
    let totalBeats = 0;

    function ensureAudioContext() {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!audioCtx) audioCtx = new AudioCtx();
      return audioCtx;
    }

    function playBeep(isCycleEnd) {
      if (!soundEnabled) return;
      try {
        const ctx = ensureAudioContext();
        if (!ctx) return;

        const triggerTone = () => {
          if (!ctx || ctx.state !== 'running') return;
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(isCycleEnd ? 1174.66 : 880, now);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.45, now + 0.008);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.12);
        };

        if (ctx.state === 'suspended') {
          ctx.resume().then(triggerTone).catch(() => {});
        } else {
          triggerTone();
        }
      } catch {
        // Bỏ qua an toàn nếu trình duyệt chặn audio
      }
    }

    function updateMetronomeText() {
      const cycleBeat = totalBeats ? ((totalBeats - 1) % 30) + 1 : 0;
      const cycle = Math.floor((totalBeats - 1) / 30) + 1;
      counterEl.textContent = window.t
        ? (cycleBeat ? t('detail.cprBeatFormat', { beat: cycleBeat, cycle }) : t('detail.cprBeatIdle'))
        : (cycleBeat ? `${cycleBeat} / 30 nhịp · Chu kỳ ${cycle}` : '0 / 30 nhịp');
      if (hintEl && window.t) {
        const key = !cycleBeat ? 'detail.cprMetronomeDesc'
          : cycleBeat === 30 ? 'detail.cprCycleHintEnd' : 'detail.cprCycleHintDefault';
        hintEl.textContent = t(key);
      }
      if (btnText) btnText.textContent = window.t
        ? t(timerId ? 'detail.cprStop' : 'detail.cprStart')
        : (timerId ? 'Dừng đếm nhịp' : 'Bắt đầu nhịp 110 BPM');
      if (soundText) soundText.textContent = window.t
        ? t(soundEnabled ? 'detail.soundOn' : 'detail.soundOff')
        : (soundEnabled ? 'Âm thanh: Bật' : 'Âm thanh: Tắt');
    }

    function triggerBeat() {
      totalBeats += 1;
      const isCycleEnd = totalBeats % 30 === 0;
      updateMetronomeText();

      playBeep(isCycleEnd);
      indicator.classList.add('is-beat');
      window.setTimeout(() => indicator.classList.remove('is-beat'), 140);
    }

    function stopMetronome() {
      if (timerId) {
        window.clearInterval(timerId);
        timerId = null;
      }
      indicator.classList.remove('is-beat');
      const btnIcon = toggleBtn.querySelector('.material-symbols-outlined');
      if (btnIcon) btnIcon.textContent = 'play_arrow';
      updateMetronomeText();
    }

    toggleBtn.addEventListener('click', () => {
      if (timerId) {
        stopMetronome();
        return;
      }
      const ctx = ensureAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      totalBeats = 0;
      timerId = window.setInterval(triggerBeat, INTERVAL_MS);
      triggerBeat();
      const btnIcon = toggleBtn.querySelector('.material-symbols-outlined');
      if (btnIcon) btnIcon.textContent = 'stop';
    });

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundBtn.setAttribute('aria-pressed', String(soundEnabled));
        if (soundIcon) soundIcon.textContent = soundEnabled ? 'volume_up' : 'volume_off';
        updateMetronomeText();
      });
    }

    updateMetronomeText();
    window.addEventListener('medfa:languageChanged', updateMetronomeText);
    window.addEventListener('pagehide', stopMetronome);
  }

  /**
   * Bơm động 2 component CPR (CPR_METRONOME_HTML & CPR_TABLE_HTML) từ js/components/detail.js
   * chỉ khi isCprTopic(topic) === true; các bài không phải CPR sẽ giữ 2 slot trống và ẩn hoàn toàn.
   * @param {Object} topic
   */
  function renderCprComponents(topic) {
    const hasCpr = isCprTopic(topic);
    const metronomeSlot = document.getElementById('cpr-metronome-slot');
    const tableSlot = document.getElementById('cpr-table-slot');

    if (metronomeSlot) {
      if (hasCpr) {
        if (!metronomeSlot.dataset.mounted && window.MedFAComponents?.CPR_METRONOME_HTML) {
          metronomeSlot.innerHTML = window.MedFAComponents.CPR_METRONOME_HTML;
          metronomeSlot.dataset.mounted = 'true';
        }
        metronomeSlot.hidden = false;
        window.I18n?.applyTranslations(metronomeSlot);
        if (!metronomeInitialized) {
          initCprMetronome();
          metronomeInitialized = true;
        }
      } else {
        metronomeSlot.hidden = true;
        metronomeSlot.innerHTML = '';
        delete metronomeSlot.dataset.mounted;
      }
    }

    if (tableSlot) {
      if (hasCpr) {
        if (!tableSlot.dataset.mounted && window.MedFAComponents?.CPR_TABLE_HTML) {
          tableSlot.innerHTML = window.MedFAComponents.CPR_TABLE_HTML;
          tableSlot.dataset.mounted = 'true';
        }
        tableSlot.hidden = false;
        window.I18n?.applyTranslations(tableSlot);
      } else {
        tableSlot.hidden = true;
        tableSlot.innerHTML = '';
        delete tableSlot.dataset.mounted;
      }
    }
  }

  /**
   * Điểm khởi chạy chính của trang Chi tiết tình huống
   */
  let metronomeInitialized = false;
  let renderRevision = 0;

  async function renderCurrentTopicDetail() {
    const revision = ++renderRevision;
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('id') || 'hoc-di-vat';
    const allTopics = await window.DataLoader?.loadTopics();
    const topic = Array.isArray(allTopics)
      ? allTopics.find(t => t.id === topicId)
      : await window.DataLoader?.getTopicById(topicId);
    const matchesTopic = topic?.id === topicId;

    if (revision !== renderRevision) return;
    renderMedicalDisclaimer(matchesTopic ? topic : null);

    if (!matchesTopic || !topic) {
      const title = window.t ? t('detail.unavailableTitle') : 'Chủ đề hiện không khả dụng';
      document.title = `${title} - MedFA`;
      const breadcrumbEl = document.getElementById('breadcrumb-topic-title');
      const detailTitleEl = document.getElementById('detail-title');
      const detailLeadEl = document.getElementById('detail-lead');
      if (breadcrumbEl) breadcrumbEl.textContent = title;
      if (detailTitleEl) detailTitleEl.textContent = title;
      if (detailLeadEl) detailLeadEl.textContent = window.t ? t('detail.unavailableDesc') : 'Quay lại thư viện để chọn một chủ đề đang có.';
      const catBadge = document.getElementById('detail-category-badge');
      const readTimeBadge = document.getElementById('detail-read-time');
      if (catBadge) catBadge.hidden = true;
      if (readTimeBadge) readTimeBadge.hidden = true;
      return;
    }

    // Cập nhật SEO Meta, Canonical, Open Graph & Structured Data
    const displayTitle = topic.fullTitle || topic.title;
    const seoDesc = topic.shortDesc || topic.lead;
    const canonicalUrl = getTopicCanonicalUrl(topic.id);

    if (window.MedFASeoHelper) {
      window.MedFASeoHelper.updateDynamicHeadMeta({
        title: `${displayTitle} - MedFA`,
        description: seoDesc,
        canonicalUrl
      });
      window.MedFASeoHelper.injectBreadcrumbSchema([
        { name: window.t ? t('detail.breadcrumbHome') : 'Trang chủ', url: window.MedFASeoHelper.buildCanonicalUrl('index.html') },
        { name: window.t ? t('detail.breadcrumbTopics') : 'Thư viện sơ cấp cứu', url: window.MedFASeoHelper.buildCanonicalUrl('topics.html') },
        { name: displayTitle, url: canonicalUrl }
      ]);
    } else {
      document.title = `${displayTitle} - MedFA`;
    }

    injectTopicSchema(topic);

    // Cập nhật nội dung giao diện trang
    const breadcrumb = document.getElementById('breadcrumb-topic-title');
    if (breadcrumb) breadcrumb.textContent = displayTitle;

    const titleEl = document.getElementById('detail-title');
    if (titleEl) titleEl.textContent = displayTitle;

    const leadEl = document.getElementById('detail-lead');
    if (leadEl) leadEl.textContent = topic.lead || topic.shortDesc;

    const catBadge = document.getElementById('detail-category-badge');
    const catLabel = document.getElementById('detail-category-label');
    if (catBadge && catLabel) {
      const isEn = typeof window !== 'undefined' && window.I18n && window.I18n.getLanguage() === 'en';
      const catKey = (topic.category || '').toLowerCase();
      const rawLabel = (topic.categoryLabel || '').toLowerCase();

      let icon = 'medical_services';
      let labelText = topic.categoryLabel || topic.category;

      if (catKey === 'tai-nan' || catKey === 'chan-thuong' || rawLabel.includes('chấn thương') || rawLabel.includes('trauma')) {
        icon = 'personal_injury';
        labelText = isEn ? 'Trauma' : 'Chấn thương';
      } else if (catKey === 'tre-em' || rawLabel.includes('trẻ em') || rawLabel.includes('pediatric')) {
        icon = 'child_care';
        labelText = isEn ? 'Pediatric' : 'Trẻ em';
      } else if (catKey === 'sinh-hoat' || rawLabel.includes('sinh hoạt') || rawLabel.includes('daily life')) {
        icon = 'home';
        labelText = isEn ? 'Daily Life' : 'Sinh hoạt';
      } else if (catKey === 'ngoai-troi' || rawLabel.includes('ngoài trời') || rawLabel.includes('outdoor')) {
        icon = 'nature_people';
        labelText = isEn ? 'Outdoors' : 'Ngoài trời';
      } else if (catKey === 'benh-ly' || rawLabel.includes('bệnh lý') || rawLabel.includes('medical')) {
        icon = 'ecg_heart';
        labelText = isEn ? 'Medical' : 'Bệnh lý';
      } else if (topic.id && topic.id.includes('hoc-di-vat')) {
        icon = 'air';
        labelText = isEn ? 'Airway Choking' : 'Cấp cứu đường thở';
      }

      const iconEl = catBadge.querySelector('.material-symbols-outlined');
      if (iconEl) iconEl.textContent = icon;
      catLabel.textContent = labelText;
    }

    const readTime = document.getElementById('detail-read-time');
    if (readTime && topic.readTime) {
      readTime.innerHTML = `<span class="material-symbols-outlined text-[15px]">timer</span><span>${window.t ? t('detail.readPrefix') + ' ' : 'Đọc '}${escapeTopicHTML(topic.readTime)}</span>`;
    }

    // Khóa hiển thị hướng dẫn thao tác đối với bài chưa qua đối chiếu y khoa
    if (topic.needsMedicalReview) {
      if (leadEl) leadEl.textContent = window.t ? t('detail.reviewNotice') : 'Bài này đang chờ đối chiếu nội dung y khoa. Xem hướng dẫn chính thức bên dưới.';
      return;
    }

    const chokingNote = document.getElementById('choking-alert-note');
    if (chokingNote) chokingNote.hidden = topic.id !== 'hoc-di-vat';

    renderTopicTimeline(topic);
    renderTopicVideo(topic);
    renderCprComponents(topic);
    renderRelatedTopics(topic, allTopics);

    const alertEl = document.getElementById('detail-alert-text');
    if (alertEl && topic.emergencyAlert) {
      alertEl.textContent = topic.emergencyAlert;
    }

    const stepsContainer = document.getElementById('detail-steps-container');
    if (stepsContainer && Array.isArray(topic.steps) && topic.steps.length > 0 && window.MedFAComponents?.createStepCardHTML) {
      stepsContainer.innerHTML = topic.steps.map(window.MedFAComponents.createStepCardHTML).join('');
    }

    const dosList = document.getElementById('detail-dos-list');
    if (dosList && Array.isArray(topic.dos) && topic.dos.length > 0 && window.MedFAComponents?.createBulletListHTML) {
      dosList.innerHTML = window.MedFAComponents.createBulletListHTML(topic.dos, 'text-emerald-600');
    }

    const dontsList = document.getElementById('detail-donts-list');
    if (dontsList && Array.isArray(topic.donts) && topic.donts.length > 0 && window.MedFAComponents?.createBulletListHTML) {
      dontsList.innerHTML = window.MedFAComponents.createBulletListHTML(topic.donts, 'text-rose-600');
    }

    const guidanceEl = document.getElementById('topic-guidance');
    if (guidanceEl) guidanceEl.hidden = false;

  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.t) document.title = t('detail.pageTitle');
    renderCurrentTopicDetail();
  });

  window.addEventListener('medfa:languageChanged', () => {
    renderCurrentTopicDetail();
  });

})();