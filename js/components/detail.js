/**
 * ==========================================================================
 * MedFA Topic Detail Components (js/components/detail.js)
 * ==========================================================================
 * CHỈ nạp duy nhất ở topic-detail.html (7 trang còn lại không phải tải thừa):
 *  - CPR_METRONOME_HTML (chỉ gắn DOM khi bài thuộc nhóm CPR)
 *  - CPR_TABLE_HTML (chỉ gắn DOM khi bài thuộc nhóm CPR)
 *  - MEDICAL_DISCLAIMER_HTML (Lưu ý y khoa & nguồn tham khảo chính thức)
 *  - Pure templates: createStepCardHTML, createBulletListHTML, createRelatedTopicCardHTML
 */
(function (global) {
  'use strict';

  const host = global.MedFAComponents || {};
  const escapeHTML = host.escapeHTML || (str => String(str || '').replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag)));

  /**
   * Widget Bộ đếm nhịp ép tim CPR 110 BPM (chỉ bơm vào DOM khi bài thuộc nhóm CPR)
   */
  const CPR_METRONOME_HTML = `<section data-cpr-metronome-widget class="mt-6 cpr-metronome-card" aria-label="Bộ đếm nhịp ép tim CPR" data-i18n-aria="detail.cprMetronomeTitle">
  <div class="flex items-center gap-3">
    <div data-cpr-beat-indicator class="cpr-beat-indicator" aria-hidden="true">
      <span class="material-symbols-outlined text-[26px]" style="font-variation-settings: 'FILL' 1;">favorite</span>
    </div>
    <div class="flex flex-col gap-1">
      <div class="flex flex-wrap items-center gap-2">
        <h2 class="text-sm md:text-base font-bold text-on-surface" data-i18n="detail.cprMetronomeTitle">Bộ đếm nhịp thực hiện ép tim CPR 110 BPM</h2>
        <span data-cpr-beat-counter class="cpr-beat-counter">0 / 30 nhịp</span>
      </div>
      <p data-cpr-cycle-hint class="text-xs text-on-surface-variant">
        Bấm Bắt đầu để nghe tiếng bíp & nhịp đập trực quan giữ tốc độ 100–120 lần/phút (30 ép tim : 2 thổi ngạt).
      </p>
    </div>
  </div>
  <div class="flex flex-wrap items-center gap-2">
    <button data-cpr-metronome-btn type="button" class="btn btn-danger text-xs py-2 px-4">
      <span class="material-symbols-outlined text-[18px]">play_arrow</span>
      <span data-cpr-metronome-btn-text>Bắt đầu nhịp 110 BPM</span>
    </button>
    <button data-cpr-sound-btn data-i18n-title="detail.cprSoundTitle" type="button" aria-pressed="true" title="Bật / Tắt âm thanh bíp" class="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest hover:bg-surface-container text-xs font-semibold text-on-surface transition-colors">
      <span data-cpr-sound-icon class="material-symbols-outlined text-[18px] text-primary">volume_up</span>
      <span data-cpr-sound-text>Âm thanh: Bật</span>
    </button>
  </div>
</section>`;

  function initCprMetronome(widget) {
    const toggleBtn = widget.querySelector('[data-cpr-metronome-btn]');
    const btnText = widget.querySelector('[data-cpr-metronome-btn-text]');
    const indicator = widget.querySelector('[data-cpr-beat-indicator]');
    const counterEl = widget.querySelector('[data-cpr-beat-counter]');
    const hintEl = widget.querySelector('[data-cpr-cycle-hint]');
    const soundBtn = widget.querySelector('[data-cpr-sound-btn]');
    const soundIcon = widget.querySelector('[data-cpr-sound-icon]');
    const soundText = widget.querySelector('[data-cpr-sound-text]');
    if (!toggleBtn || !indicator || !counterEl) return;

    const BPM = 110; // Khuyến cáo AHA/ERC: 100 - 120 nhịp/phút
    const INTERVAL_MS = Math.round(60000 / BPM);
    let timerId = null;
    let audioCtx = null;
    let soundEnabled = true;
    let totalBeats = 0;

    function ensureAudioContext() {
      const AudioCtx = global.AudioContext || global.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!audioCtx) audioCtx = new AudioCtx();
      return audioCtx;
    }

    function playBeep(isCycleEnd) {
      if (!soundEnabled) return;
      try {
        const ctx = ensureAudioContext();
        if (!ctx) return;

        const activeTimer = timerId;
        const triggerTone = () => {
          if (timerId !== activeTimer || !soundEnabled || ctx.state !== 'running') return;
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
      counterEl.textContent = global.t
        ? (cycleBeat ? global.t('detail.cprBeatFormat', { beat: cycleBeat, cycle }) : global.t('detail.cprBeatIdle'))
        : (cycleBeat ? `${cycleBeat} / 30 nhịp · Chu kỳ ${cycle}` : '0 / 30 nhịp');
      if (hintEl && global.t) {
        const key = !cycleBeat ? 'detail.cprMetronomeDesc'
          : cycleBeat === 30 ? 'detail.cprCycleHintEnd' : 'detail.cprCycleHintDefault';
        hintEl.textContent = global.t(key);
      }
      if (btnText) btnText.textContent = global.t
        ? global.t(timerId ? 'detail.cprStop' : 'detail.cprStart')
        : (timerId ? 'Dừng đếm nhịp' : 'Bắt đầu nhịp 110 BPM');
      if (soundText) soundText.textContent = global.t
        ? global.t(soundEnabled ? 'detail.soundOn' : 'detail.soundOff')
        : (soundEnabled ? 'Âm thanh: Bật' : 'Âm thanh: Tắt');
    }

    function triggerBeat() {
      totalBeats += 1;
      const isCycleEnd = totalBeats % 30 === 0;
      updateMetronomeText();

      playBeep(isCycleEnd);
      indicator.classList.add('is-beat');
      global.setTimeout(() => indicator.classList.remove('is-beat'), 140);
    }

    function stopMetronome() {
      if (timerId) {
        global.clearInterval(timerId);
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
      totalBeats = 0;
      timerId = global.setInterval(triggerBeat, INTERVAL_MS);
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
    global.addEventListener('medfa:languageChanged', updateMetronomeText);
    global.addEventListener('pagehide', stopMetronome);
    return stopMetronome;
  }

  function mountCprMetronome(slot) {
    slot.innerHTML = CPR_METRONOME_HTML;
    global.I18n?.applyTranslations(slot);
    return initCprMetronome(slot.querySelector('[data-cpr-metronome-widget]'));
  }

  /**
   * Bảng đối chiếu thông số hồi sinh tim phổi CPR & AED (chỉ bơm vào DOM khi bài thuộc nhóm CPR)
   */
  const CPR_TABLE_HTML = `<section id="detail-cpr-table-section" class="mt-8 pt-6 border-t border-outline-variant/20" aria-labelledby="table-cpr-title">
  <div class="flex items-center gap-2 mb-3">
    <div class="w-8 h-8 rounded-lg bg-primary-container text-primary flex items-center justify-center shrink-0">
      <span class="material-symbols-outlined text-[20px]">table_chart</span>
    </div>
    <h3 id="table-cpr-title" class="text-lg font-bold text-on-surface" data-i18n="detail.tableSectionTitle">
      Bảng đối chiếu thông số hồi sinh tim phổi (CPR &amp; AED)
    </h3>
  </div>
  <p class="text-sm text-on-surface-variant mb-3 leading-relaxed" data-i18n="detail.tableSectionDesc">
    Đối chiếu các thông số ép tim, thổi ngạt và sử dụng máy khử rung tim tự động ngoài lồng ngực (<abbr title="Automated External Defibrillator">AED</abbr>) giữa các nhóm lứa tuổi theo khuyến nghị cập nhật từ <abbr title="American Heart Association">AHA</abbr> &amp; <abbr title="European Resuscitation Council">ERC</abbr> 2025:
  </p>
  <div class="medfa-table-wrapper">
    <table class="medfa-table">
      <caption data-i18n="detail.tableCaption">Bảng 1: Thông số kỹ thuật ép tim CPR &amp; AED theo lứa tuổi (AHA/ERC 2025)</caption>
      <thead>
        <tr>
          <th scope="col" rowspan="2" class="text-center" data-i18n="detail.thParameter">Thông số kỹ thuật</th>
          <th scope="colgroup" colspan="3" class="text-center" data-i18n="detail.thAgeGroups">Phân loại đối tượng nạn nhân</th>
        </tr>
        <tr>
          <th scope="col" data-i18n="detail.thAdult">Người lớn (≥ 8 tuổi)</th>
          <th scope="col" data-i18n="detail.thChild">Trẻ em (1 – 8 tuổi)</th>
          <th scope="col" data-i18n="detail.thInfant">Trẻ sơ sinh (&lt; 1 tuổi)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" data-i18n="detail.rowRate">Tần số ép tim (Rate)</th>
          <td colspan="3" class="text-center font-bold text-primary">
            <span class="badge-cpr" data-i18n="detail.rowRateBadge">100 – 120 nhịp/phút</span> <span class="text-xs text-on-surface-variant font-normal" data-i18n="detail.rowRateShared">(áp dụng đồng nhất cho mọi lứa tuổi)</span>
          </td>
        </tr>
        <tr>
          <th scope="row" data-i18n="detail.rowDepth">Độ sâu ép tim (Depth)</th>
          <td>
            <strong data-i18n="detail.rowDepthAdultValue">5 – 6 cm</strong><br>
            <span class="text-xs text-on-surface-variant" data-i18n="detail.rowDepthAdult">Không ấn sâu quá 6 cm</span>
          </td>
          <td>
            <strong data-i18n="detail.rowDepthChildValue">Khoảng 5 cm</strong><br>
            <span class="text-xs text-on-surface-variant" data-i18n="detail.rowDepthChild">~1/3 đường kính lồng ngực</span>
          </td>
          <td>
            <strong data-i18n="detail.rowDepthInfantValue">Khoảng 4 cm</strong><br>
            <span class="text-xs text-on-surface-variant" data-i18n="detail.rowDepthInfant">~1/3 đường kính lồng ngực</span>
          </td>
        </tr>
        <tr>
          <th scope="row" data-i18n="detail.rowHandPos">Vị trí đặt tay</th>
          <td data-i18n="detail.rowHandPosAdult">1/2 dưới xương ức, giữa 2 núm vú</td>
          <td data-i18n="detail.rowHandPosChild">1/2 dưới xương ức</td>
          <td data-i18n="detail.rowHandPosInfant">Giữa ngực, ngay dưới đường nối 2 núm vú</td>
        </tr>
        <tr>
          <th scope="row" data-i18n="detail.rowHandTech">Kỹ thuật dùng tay</th>
          <td data-i18n="detail.rowHandTechAdult">2 bàn tay đan chặt ngón vào nhau, gót tay tì lực</td>
          <td data-i18n="detail.rowHandTechChild">1 hoặc 2 bàn tay (tùy thể trạng trẻ)</td>
          <td data-i18n="detail.rowHandTechInfant">2 ngón tay (trỏ &amp; giữa) hoặc 2 ngón cái bao quanh ngực</td>
        </tr>
        <tr>
          <th scope="row" data-i18n="detail.rowRatio">Tỷ lệ Ép tim : Thổi ngạt</th>
          <td>
            <span class="font-bold text-primary">30 : 2</span><br>
            <span class="text-xs text-on-surface-variant" data-i18n="detail.rowRatioAdult">Áp dụng cho cả 1 hoặc 2 người sơ cứu</span>
          </td>
          <td>
            <span class="font-bold text-primary">30 : 2</span> <span data-i18n="detail.rowRatioSingleRescuer">(1 người cứu)</span><br>
            <span class="font-bold text-secondary">15 : 2</span> <span data-i18n="detail.rowRatioTwoRescuers">(2 người cứu y tế)</span>
          </td>
          <td>
            <span class="font-bold text-primary">30 : 2</span> <span data-i18n="detail.rowRatioSingleRescuer">(1 người cứu)</span><br>
            <span class="font-bold text-secondary">15 : 2</span> <span data-i18n="detail.rowRatioTwoRescuers">(2 người cứu y tế)</span>
          </td>
        </tr>
        <tr>
          <th scope="row" data-i18n="detail.rowAed">Sử dụng máy sốc tim AED</th>
          <td data-i18n="detail.rowAedAdult">Miếng dán người lớn tiêu chuẩn</td>
          <td data-i18n="detail.rowAedChild">Miếng dán nhi khoa (hoặc chuyển công tắc trẻ em)</td>
          <td data-i18n="detail.rowAedInfant">Ưu tiên máy khử rung thủ công / Miếng dán nhi có bộ giảm liều</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="text-xs text-on-surface-variant italic mt-1">
    *<sup>(1)</sup> <span data-i18n="detail.tableFootnote">Nguồn dữ liệu tham chiếu: Khuyến cáo Hồi sinh tim phổi AHA ECC Guidelines 2025 &amp; Phác đồ Cấp cứu Ngoại viện Bộ Y Tế.</span>
  </p>
</section>`;

  const CPR_AGE_GROUPS = { adult: 'Adult', child: 'Child', infant: 'Infant' };
  const CPR_INSTRUCTIONS = [
    ['rate', 'rowRate', 'cprRate'],
    ['depth', 'rowDepth', 'cprDepth'],
    ['hand-position', 'rowHandPos', 'cprHandPos'],
    ['hand-technique', 'rowHandTech', 'cprHandTech'],
    ['breaths', 'rowRatio', 'cprRatio'],
    ['aed', 'rowAed', 'cprAed']
  ];

  function mountCprAgeGuide(slot) {
    slot.innerHTML = `<section class="cpr-age-guide" aria-label="CPR &amp; AED" data-i18n-aria="detail.cprAgeTitle">
      <h3 class="cpr-age-guide__title" data-i18n="detail.cprAgeTitle">Hướng dẫn CPR &amp; AED theo nhóm tuổi</h3>
      <p data-i18n="detail.cprAgeQuestion">Nạn nhân thuộc nhóm tuổi nào?</p>
      <div class="cpr-age-guide__choices" role="group" data-i18n-aria="detail.cprAgeQuestion">
        ${Object.entries(CPR_AGE_GROUPS).map(([age, suffix]) => `
          <button type="button" data-cpr-age="${age}" aria-pressed="false" data-i18n="detail.cprAge${suffix}"></button>
        `).join('')}
      </div>
      ${CPR_METRONOME_HTML}
      <div class="cpr-age-guide__instructions" aria-live="polite"></div>
      <a class="cpr-age-guide__source" href="https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms/"
         target="_blank" rel="noopener noreferrer" data-i18n="detail.cprAgeSource">Hướng dẫn AHA 2025</a>
    </section>`;

    const instructions = slot.querySelector('.cpr-age-guide__instructions');
    const buttons = slot.querySelectorAll('[data-cpr-age]');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (button.getAttribute('aria-pressed') === 'true') return;
        const age = button.dataset.cprAge;
        const suffix = CPR_AGE_GROUPS[age];
        buttons.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
        instructions.innerHTML = CPR_INSTRUCTIONS.map(([file, title, key]) => {
          const text = file === 'rate' ? key : key + suffix;
          return `<article class="cpr-age-guide__instruction">
            <h4 data-i18n="detail.${title}"></h4>
            <p data-i18n="detail.${text}"></p>
          </article>`;
        }).join('');

        const cards = instructions.querySelectorAll('.cpr-age-guide__instruction');
        CPR_INSTRUCTIONS.forEach(([file, title], index) => {
          const image = document.createElement('img');
          image.hidden = true;
          image.setAttribute('data-i18n-alt', `detail.${title}`);
          image.addEventListener('load', () => { image.hidden = false; }, { once: true });
          image.addEventListener('error', () => image.remove(), { once: true });
          image.src = `images/cpr-aed/${age}/${file}.webp`;
          cards[index].appendChild(image);
        });
        global.I18n?.applyTranslations(instructions);
      });
    });
    global.I18n?.applyTranslations(slot);
    return {
      stop: initCprMetronome(slot.querySelector('[data-cpr-metronome-widget]')),
      selectAge(age) {
        buttons.forEach(button => {
          button.disabled = Boolean(age) && button.dataset.cprAge !== age;
          if (age && !button.disabled) button.click();
        });
        if (!age) {
          buttons.forEach(button => button.setAttribute('aria-pressed', 'false'));
          instructions.replaceChildren();
        }
      }
    };
  }

  /**
   * Khối Lưu ý y khoa & Nguồn tham khảo chính thức
   */
  const MEDICAL_DISCLAIMER_HTML = `<h2 id="medical-disclaimer-title" class="text-xl font-bold text-on-surface" data-i18n="disclaimer.title">Nguồn tham khảo và lưu ý quan trọng về trách nhiệm y khoa</h2>
<p class="mt-2 text-sm text-on-surface-variant leading-relaxed" data-i18n-html="disclaimer.p1">
  Toàn bộ nội dung, tài liệu và tình huống trên website MedFA chỉ mang tính chất <strong>tham khảo, phục vụ mục đích giáo dục và nâng cao nhận thức cộng đồng</strong>. Các thông tin này <strong>KHÔNG thay thế</strong> cho chẩn đoán, tư vấn chuyên môn hay chỉ định điều trị từ bác sĩ, nhân viên y tế có chuyên môn. Website không thể thay thế cho các khóa huấn luyện sơ cấp cứu thực hành có cấp chứng chỉ chính thức. Trong mọi tình huống khẩn cấp, <a class="font-bold underline text-error" href="tel:115">KHUYẾN CÁO GỌI NGAY TỔNG ĐÀI 115</a> hoặc nhanh chóng đưa người bệnh đến cơ sở y tế gần nhất để được hỗ trợ chuyên môn.
</p>

<h3 class="mt-4 text-sm font-bold text-on-surface" data-i18n="disclaimer.sourcesHeading">Nguồn được ghi cho chủ đề này</h3>
<p id="detail-sources-empty" class="mt-1 text-sm text-on-surface-variant" data-i18n="disclaimer.sourcesEmpty">Chưa có nguồn cụ thể được ghi trong dữ liệu chủ đề.</p>
<ul id="detail-source-list" class="mt-1 list-disc pl-5 text-sm space-y-1"></ul>

<h3 class="mt-4 text-sm font-bold text-on-surface" data-i18n="disclaimer.officialHeading">Hướng dẫn chính thức để đối chiếu</h3>
<ul class="mt-1 list-disc pl-5 text-sm space-y-1">
  <li><a class="underline text-primary" href="https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines" target="_blank" rel="noopener noreferrer" data-i18n="disclaimer.officialAha2024">American Heart Association và American Red Cross — Hướng dẫn sơ cứu 2024</a></li>
  <li><a class="underline text-primary" href="https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines" target="_blank" rel="noopener noreferrer" data-i18n="disclaimer.officialAha2025">American Heart Association — Hướng dẫn CPR và chăm sóc tim mạch khẩn cấp 2025</a></li>
  <li><a class="underline text-primary" href="https://www.erc.edu/science-research/guidelines/guidelines-2025" target="_blank" rel="noopener noreferrer" data-i18n="disclaimer.officialErc2025">European Resuscitation Council — Hướng dẫn hồi sức và sơ cứu 2025</a></li>
</ul>`;

  /** Pure Component: Thẻ từng bước sơ cứu */
  function createStepCardHTML(step, topicId) {
    const imagePath = topicId
      ? `images/steps/${encodeURIComponent(topicId)}/step-${String(step.stepNumber).padStart(2, '0')}.webp`
      : '';
    return `
      <div class="bg-surface rounded-xl p-4 md:p-6 shadow-sm border border-outline-variant/20">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-secondary text-on-secondary font-bold text-lg flex items-center justify-center shrink-0">
            ${escapeHTML(step.stepNumber)}
          </div>
          <div class="flex-1">
            <h3 class="text-base md:text-lg font-bold text-on-surface">${escapeHTML(step.title)}</h3>
            <p class="text-sm text-on-surface-variant mt-1 leading-relaxed">${escapeHTML(step.desc)}</p>
          </div>
        </div>
        ${imagePath ? `
          <figure class="detail-step-illustration-frame">
            <img
              class="detail-step-illustration"
              data-step-image="${escapeHTML(imagePath)}"
              alt="${escapeHTML(step.title)}"
              loading="lazy"
              decoding="async"
            >
          </figure>
        ` : ''}
      </div>
    `;
  }

  /** Pure Component: Danh sách gạch đầu dòng (Nên làm / Cần tránh) */
  function createBulletListHTML(items, bulletColorClass = 'text-emerald-600') {
    if (!Array.isArray(items)) return '';
    return items.map(item => `
      <li class="flex items-start gap-2">
        <span class="${escapeHTML(bulletColorClass)} font-bold">•</span>
        <span>${escapeHTML(item)}</span>
      </li>
    `).join('');
  }

  /** Pure Component: Thẻ tình huống liên quan */
  function createRelatedTopicCardHTML(item) {
    return `
      <a href="topic-detail.html?id=${encodeURIComponent(item.id)}" class="group p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 transition-all flex flex-col gap-2">
        <span class="text-xs font-bold text-primary uppercase tracking-wider">${escapeHTML(item.categoryLabel || 'Sơ cấp cứu')}</span>
        <h3 class="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">${escapeHTML(item.title)}</h3>
        <p class="text-xs text-on-surface-variant line-clamp-2">${escapeHTML(item.shortDesc || item.lead)}</p>
      </a>
    `;
  }

  if (typeof host.registerComponent === 'function') {
    host.registerComponent('step-card', createStepCardHTML);
    host.registerComponent('related-topic-card', createRelatedTopicCardHTML);
  }

  global.MedFAComponents = Object.assign(host, {
    CPR_METRONOME_HTML,
    mountCprMetronome,
    CPR_TABLE_HTML,
    mountCprAgeGuide,
    MEDICAL_DISCLAIMER_HTML,
    createStepCardHTML,
    createBulletListHTML,
    createRelatedTopicCardHTML
  });
})(typeof window !== 'undefined' ? window : globalThis);
