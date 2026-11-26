/**
 * ==========================================================================
 * MedFA Pure Card & Banner Components (js/components/cards.js)
 * ==========================================================================
 * Chỉ nạp ở các trang có danh sách thẻ/banner: index.html, topics.html,
 * about.html, social-impact.html (các trang khác không phải tải thừa).
 *
 * Nguyên tắc Separation of Concerns:
 *  - KHÔNG chứa dữ liệu cứng của từng trang.
 *  - Chỉ định nghĩa các hàm thuần (props => HTML) và đăng ký vào MedFAComponents.
 */
(function (global) {
  'use strict';

  const host = global.MedFAComponents || {};
  const escapeHTML = host.escapeHTML || (str => String(str || '').replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag)));

  /**
   * Emergency 115 Support Banner dùng chung
   */
  const EMERGENCY_BANNER_HTML = `<section class="bg-surface pb-16 px-4 md:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary p-6 md:p-8 shadow-md">
      <div class="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 pointer-events-none">
        <svg class="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
          <path d="M38 0h24v38h38v24H62v38H38V62H0V38h38z"></path>
        </svg>
      </div>
      <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-white text-[28px]">phone_in_talk</span>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white" data-i18n="topics.emBannerTitle">Bạn đang đối mặt với ca khẩn cấp ngay lúc này?</h2>
            <p class="text-sm text-white/90 mt-1 max-w-xl" data-i18n="topics.emBannerDesc">
              Đừng lúng túng! Gọi ngay tổng đài cấp cứu quốc gia 115 hoặc bật loa ngoài để nhân viên y tế hướng dẫn bạn ép tim CPR qua điện thoại.
            </p>
          </div>
        </div>
        <a href="tel:115" class="px-6 py-3 rounded-xl bg-error hover:bg-red-700 text-white font-bold text-base shadow-lg transition-colors flex items-center gap-2 whitespace-nowrap">
          <span class="material-symbols-outlined">call</span>
          <span data-i18n="topics.emBannerBtn">GỌI 115 NGAY</span>
        </a>
      </div>
    </div>
  </div>
</section>`;

  /**
   * SVG nền đường nhịp tim ECG dùng chung cho CTA Banner (index.html & social-impact.html)
   */
  const HEARTBEAT_BG_SVG = `<svg class="w-full max-w-4xl h-48" fill="none" stroke="currentColor" viewBox="0 0 1000 200" aria-hidden="true">
  <path d="M0,100 L250,100 L280,40 L310,170 L340,80 L360,110 L380,100 L650,100 L680,30 L710,180 L740,70 L760,110 L780,100 L1000,100" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></path>
</svg>`;

  /** Pure Component: Thẻ Thống kê (Stat Card) */
  function createStatCardHTML(props) {
    return `
      <li class="flex items-center gap-space-md p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors shadow-sm">
        <div class="w-14 h-14 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-secondary text-[30px]">${escapeHTML(props.icon)}</span>
        </div>
        <div>
          <div class="text-3xl font-bold text-on-surface leading-none mb-1">${escapeHTML(props.value)}</div>
          <p class="text-sm text-on-surface-variant font-medium" data-i18n="${escapeHTML(props.descKey)}">${escapeHTML(props.descDefault)}</p>
        </div>
      </li>
    `;
  }

  /** Pure Component: Thẻ Tình huống ưu tiên (Priority Situation Card) */
  function createPrioritySituationCardHTML(props) {
    return `
      <article class="flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20">
        <div class="w-12 h-12 rounded-lg bg-secondary-container/50 flex items-center justify-center shrink-0 mt-1">
          <span class="material-symbols-outlined text-secondary text-[24px]">${escapeHTML(props.icon)}</span>
        </div>
        <div class="flex flex-col gap-1">
          <h3 class="text-lg font-bold text-on-surface" data-i18n="${escapeHTML(props.titleKey)}">${escapeHTML(props.titleDefault)}</h3>
          <p class="text-sm text-on-surface-variant leading-relaxed" data-i18n="${escapeHTML(props.descKey)}">${escapeHTML(props.descDefault)}</p>
        </div>
      </article>
    `;
  }

  /** Pure Component: Thẻ Tình huống nổi bật trên Trang chủ */
  function createFeaturedTopicCardHTML(props) {
    const safeId = encodeURIComponent(props.id);
    return `
      <article class="group p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-200 shadow-sm flex flex-col justify-between border border-outline-variant/20">
        <div>
          <div class="w-12 h-12 rounded-full bg-secondary-container/50 flex items-center justify-center mb-space-md">
            <span class="material-symbols-outlined text-secondary text-[24px]">${escapeHTML(props.icon)}</span>
          </div>
          <h3 class="text-lg font-bold text-on-surface mb-2" data-i18n="${escapeHTML(props.titleKey)}">${escapeHTML(props.titleDefault)}</h3>
          <p class="text-sm text-on-surface-variant mb-space-md" data-i18n="${escapeHTML(props.descKey)}">${escapeHTML(props.descDefault)}</p>
        </div>
        <a class="font-semibold text-secondary hover:text-primary transition-colors inline-flex items-center gap-1.5 self-start" href="topic-detail.html?id=${safeId}">
          <span data-i18n="home.viewDetail">Xem hướng dẫn chi tiết</span>
          <span class="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
        </a>
      </article>
    `;
  }

  /** Pure Component: Thẻ Thành viên nhóm (Team Member Card) */
  function createTeamMemberCardHTML(props) {
    const colorMap = {
      primary: { text: 'text-primary', bg: 'bg-primary/10' },
      secondary: { text: 'text-secondary', bg: 'bg-secondary/10' },
      tertiary: { text: 'text-tertiary', bg: 'bg-tertiary/10' }
    };
    const palette = colorMap[props.color] || colorMap.primary;
    const iconsHTML = (Array.isArray(props.icons) ? props.icons : []).map(ic => `
      <span class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
        <span class="material-symbols-outlined text-[16px]">${escapeHTML(ic)}</span>
      </span>
    `).join('');

    return `
      <div class="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center border border-outline-variant/20 hover:-translate-y-1">
        <div class="w-20 h-20 rounded-full p-1 bg-surface-container-low flex items-center justify-center ${palette.text} mb-4 shadow-inner">
          <div class="w-full h-full rounded-full ${palette.bg} flex items-center justify-center ${palette.text} font-bold text-xl">
            ${escapeHTML(props.initials)}
          </div>
        </div>
        <h3 class="text-lg font-bold text-on-surface mb-1">${escapeHTML(props.name)}</h3>
        <p class="text-xs font-bold ${palette.text} mb-1" data-i18n="${escapeHTML(props.roleKey)}">${escapeHTML(props.roleDefault)}</p>
        <span class="text-xs text-on-surface-variant mb-4" data-i18n="about.studentId" data-i18n-id="${escapeHTML(props.studentId)}">MSSV: ${escapeHTML(props.studentId)}</span>
        <div class="flex items-center justify-center gap-2 mt-auto pt-2">${iconsHTML}</div>
      </div>
    `;
  }

  /** Pure Component: Thẻ Nguồn tiêu chuẩn y khoa (Medical Standard Card) */
  function createStandardCardHTML(props) {
    let headingMarkup;
    if (props.abbr) {
      const i18nAttr = props.abbrI18n ? ` data-i18n="${escapeHTML(props.abbrI18n)}"` : '';
      const suffix = props.titleSuffix ? ` ${escapeHTML(props.titleSuffix)}` : '';
      headingMarkup = `<abbr title="${escapeHTML(props.abbrTitle || '')}" class="cursor-help"${i18nAttr}>${escapeHTML(props.abbr)}</abbr>${suffix}`;
    } else {
      headingMarkup = escapeHTML(props.title || '');
    }

    return `
      <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
        <span class="font-bold ${escapeHTML(props.titleColor || 'text-primary')} text-base">${headingMarkup}</span>
        <span class="text-xs text-on-surface-variant mt-1" data-i18n="${escapeHTML(props.descKey)}">${escapeHTML(props.descDefault)}</span>
      </div>
    `;
  }

  /** Pure Component: Thẻ Giải pháp / Tiếp cận (Approach Card) */
  function createApproachCardHTML(props) {
    return `
      <article class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start group hover:-translate-y-1">
        <div class="w-14 h-14 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0D9488] mb-5 group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
          <span class="material-symbols-outlined text-[32px]">${escapeHTML(props.icon)}</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2" data-i18n="${escapeHTML(props.titleKey)}">${escapeHTML(props.titleDefault)}</h3>
        <p class="text-gray-600 text-sm leading-relaxed" data-i18n="${escapeHTML(props.descKey)}">${escapeHTML(props.descDefault)}</p>
        <div class="mt-6 pt-4 border-t border-gray-50 w-full flex items-center text-xs font-semibold text-[#0D9488] group-hover:text-primary transition-colors">
          <span data-i18n="${escapeHTML(props.ctaKey)}">${escapeHTML(props.ctaDefault)}</span>
          <span class="material-symbols-outlined text-[14px] ml-1">arrow_forward</span>
        </div>
      </article>
    `;
  }

  /** Pure Component: Thẻ tình huống trong Thư viện (topics.html) */
  function createTopicCardHTML(topic) {
    const safeId = encodeURIComponent(topic.id);
    const viewText = topic.needsMedicalReview
      ? (global.t ? global.t('topics.viewReviewStatus') : 'Xem trạng thái rà soát')
      : (global.t ? global.t('topics.viewGuide') : 'Xem hướng dẫn');

    return `
      <article 
        class="first-aid-card group bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer border border-outline-variant/20 h-full"
        data-id="${escapeHTML(topic.id)}"
        data-category="${escapeHTML(topic.category)}"
        data-critical="${escapeHTML(topic.criticalLevel)}"
        onclick="window.location.href='topic-detail.html?id=${safeId}'"
      >
        <div>
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-300 shadow-sm">
              ${topic.iconSvg || '<span class="material-symbols-outlined text-[24px]">medical_services</span>'}
            </div>
          </div>

          <h2 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors mt-space-md font-bold">
            ${escapeHTML(topic.title)}
          </h2>

          <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-space-xs leading-relaxed">
            ${escapeHTML(topic.shortDesc)}
          </p>
        </div>

        <div class="mt-space-lg pt-space-md flex items-center justify-between bg-surface-container-low/50 -mx-space-lg -mb-space-lg px-space-lg py-3 rounded-b-xl border-t border-outline-variant/10">
          <a href="topic-detail.html?id=${safeId}" onclick="event.stopPropagation();" class="inline-flex items-center gap-1 font-label-md text-label-md text-secondary group-hover:text-secondary-fixed-variant font-bold transition-colors">
            ${viewText}
            <span class="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
          </a>
          <div class="flex items-center gap-1 text-outline font-label-sm text-label-sm">
            <span class="material-symbols-outlined text-[16px]">schedule</span>
            <span>${escapeHTML(topic.readTime || (global.t ? global.t('topics.readTimeDefault') : '3 phút'))}</span>
          </div>
        </div>
      </article>
    `;
  }

  /** Pure Component: Thẻ Skeleton Loading cho trang danh sách */
  function createSkeletonCardsHTML(count = 6) {
    const singleCard = `
      <div class="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between border border-outline-variant/20 animate-pulse min-h-[220px]">
        <div>
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-full bg-surface-container-high"></div>
            <div class="w-8 h-8 rounded-full bg-surface-container-high"></div>
          </div>
          <div class="h-6 bg-surface-container-high rounded w-3/4 mt-4"></div>
          <div class="h-4 bg-surface-container-high rounded w-full mt-3"></div>
          <div class="h-4 bg-surface-container-high rounded w-2/3 mt-2"></div>
        </div>
        <div class="flex items-center justify-between pt-4 mt-4 border-t border-outline-variant/10">
          <div class="h-4 bg-surface-container-high rounded w-20"></div>
          <div class="h-4 bg-surface-container-high rounded w-16"></div>
        </div>
      </div>`;
    return singleCard.repeat(count);
  }

  // Đăng ký các pure component vào registry dùng chung
  if (typeof host.registerComponent === 'function') {
    host.registerComponent('stat-card', createStatCardHTML);
    host.registerComponent('priority-card', createPrioritySituationCardHTML);
    host.registerComponent('featured-topic-card', createFeaturedTopicCardHTML);
    host.registerComponent('team-card', createTeamMemberCardHTML);
    host.registerComponent('standard-card', createStandardCardHTML);
    host.registerComponent('approach-card', createApproachCardHTML);
    host.registerComponent('topic-card', createTopicCardHTML);
  }

  global.MedFAComponents = Object.assign(host, {
    EMERGENCY_BANNER_HTML,
    HEARTBEAT_BG_SVG,
    createStatCardHTML,
    createPrioritySituationCardHTML,
    createFeaturedTopicCardHTML,
    createTeamMemberCardHTML,
    createStandardCardHTML,
    createApproachCardHTML,
    createTopicCardHTML,
    createSkeletonCardsHTML
  });
})(typeof window !== 'undefined' ? window : globalThis);
