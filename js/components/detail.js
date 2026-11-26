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
  const CPR_METRONOME_HTML = `<section id="cpr-metronome-widget" class="mt-6 cpr-metronome-card" aria-label="Bộ đếm nhịp ép tim CPR" data-i18n-aria="detail.cprMetronomeTitle">
  <div class="flex items-center gap-3">
    <div id="cpr-beat-indicator" class="cpr-beat-indicator" aria-hidden="true">
      <span class="material-symbols-outlined text-[26px]" style="font-variation-settings: 'FILL' 1;">favorite</span>
    </div>
    <div class="flex flex-col gap-1">
      <div class="flex flex-wrap items-center gap-2">
        <h2 class="text-sm md:text-base font-bold text-on-surface" data-i18n="detail.cprMetronomeTitle">Bộ đếm nhịp thực hiện ép tim CPR 110 BPM</h2>
        <span id="cpr-beat-counter" class="cpr-beat-counter">0 / 30 nhịp</span>
      </div>
      <p id="cpr-cycle-hint" class="text-xs text-on-surface-variant" data-i18n="detail.cprMetronomeDesc">
        Bấm Bắt đầu để nghe tiếng bíp & nhịp đập trực quan giữ tốc độ 100–120 lần/phút (30 ép tim : 2 thổi ngạt).
      </p>
    </div>
  </div>
  <div class="flex flex-wrap items-center gap-2">
    <button id="cpr-metronome-btn" type="button" class="btn btn-danger text-xs py-2 px-4">
      <span class="material-symbols-outlined text-[18px]">play_arrow</span>
      <span id="cpr-metronome-btn-text" data-i18n="detail.cprStart">Bắt đầu nhịp 110 BPM</span>
    </button>
    <button id="cpr-sound-btn" data-i18n-title="detail.cprSoundTitle" type="button" aria-pressed="true" title="Bật / Tắt âm thanh bíp" class="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest hover:bg-surface-container text-xs font-semibold text-on-surface transition-colors">
      <span id="cpr-sound-icon" class="material-symbols-outlined text-[18px] text-primary">volume_up</span>
      <span id="cpr-sound-text" data-i18n="detail.soundOn">Âm thanh: Bật</span>
    </button>
  </div>
</section>`;

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
            <span class="badge-cpr">100 – 120 nhịp/phút</span> <span class="text-xs text-on-surface-variant font-normal" data-i18n="detail.rowRateShared">(áp dụng đồng nhất cho mọi lứa tuổi)</span>
          </td>
        </tr>
        <tr>
          <th scope="row" data-i18n="detail.rowDepth">Độ sâu ép tim (Depth)</th>
          <td>
            <strong>5 – 6 cm</strong><br>
            <span class="text-xs text-on-surface-variant" data-i18n="detail.rowDepthAdult">Không ấn sâu quá 6 cm</span>
          </td>
          <td>
            <strong>Khoảng 5 cm</strong><br>
            <span class="text-xs text-on-surface-variant" data-i18n="detail.rowDepthChild">~1/3 đường kính lồng ngực</span>
          </td>
          <td>
            <strong>Khoảng 4 cm</strong><br>
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
            <span class="font-bold text-primary">30 : 2</span> (1 người cứu)<br>
            <span class="font-bold text-secondary">15 : 2</span> (2 người cứu y tế)
          </td>
          <td>
            <span class="font-bold text-primary">30 : 2</span> (1 người cứu)<br>
            <span class="font-bold text-secondary">15 : 2</span> (2 người cứu y tế)
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
  function createStepCardHTML(step) {
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
    CPR_TABLE_HTML,
    MEDICAL_DISCLAIMER_HTML,
    createStepCardHTML,
    createBulletListHTML,
    createRelatedTopicCardHTML
  });
})(typeof window !== 'undefined' ? window : globalThis);
