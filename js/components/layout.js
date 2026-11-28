/**
 * ==========================================================================
 * MedFA Core Layout Components (js/components/layout.js)
 * ==========================================================================
 * Nạp trên tất cả 8 trang HTML:
 *  - Khởi tạo namespace dùng chung window.MedFAComponents & COMPONENT_REGISTRY
 *  - Helper chống XSS (escapeHTML) & bộ render chung (registerComponent, renderComponentList)
 *  - Khung giao diện toàn cục: HEADER_HTML & FOOTER_HTML (kèm Floating AI Chatbot)
 */
(function (global) {
  'use strict';

  const registry = {};

  /**
   * Escape ký tự HTML đặc biệt để ngăn XSS khi chèn dữ liệu động vào template string
   * @param {string|number} str
   * @returns {string}
   */
  function escapeHTML(str) {
    return String(str || '').replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  /**
   * Đăng ký một pure component (props => HTML) vào registry dùng chung
   * @param {string} name
   * @param {Function} renderer
   */
  function registerComponent(name, renderer) {
    if (name && typeof renderer === 'function') {
      registry[name] = renderer;
    }
  }

  /**
   * Render danh sách items bất kỳ vào container bằng tên component đã đăng ký
   * @param {string} componentName
   * @param {HTMLElement|null} container
   * @param {Array<Object>} items
   */
  function renderComponentList(componentName, container, items) {
    const renderer = registry[componentName];
    if (!container || !renderer || !Array.isArray(items)) return;
    container.innerHTML = items.map(renderer).join('');
  }

  /**
   * Header dùng chung (Desktop Nav + Language Switcher + Mobile Drawer)
   */
  const HEADER_HTML = `<!-- MedFA Shared Header Component -->
<header class="medfa-header fixed top-0 left-0 right-0 transition-all duration-300 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
  <div class="medfa-header__inner">
    <!-- Brand Logo -->
    <div class="medfa-header__brand">
      <a aria-label="Trang chủ MedFA" data-i18n-aria-label="header.homeAria" class="flex items-center gap-space-sm focus:outline-none" data-path="home" href="index.html">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224 80" class="medfa-header__logo" fill="none">
          <rect width="64" height="64" x="8" y="8" rx="16" fill="#1E40AF"/>
          <path d="M40 24v32M24 40h32" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
          <path d="M26 40c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#0D9488" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 4"/>
          <circle cx="56" cy="24" r="4" fill="#E63946"/>
          <text x="86" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="800" fill="#1E40AF" letter-spacing="-0.5">Med<tspan fill="#0D9488">FA</tspan></text>
          <text x="88" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#64748B" letter-spacing="1.5">MEDICAL FIRST AID</text>
        </svg>
      </a>
    </div>

    <!-- Desktop Navigation Links -->
    <nav aria-label="Menu điều hướng chính" data-i18n-aria-label="header.navAria" class="items-center justify-end flex-1" id="main-nav">
      <a class="nav-link font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-3.5 rounded-full" data-page="home" href="index.html"><span data-i18n="nav.home">Trang chủ</span></a>
      <a class="nav-link font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-3.5 rounded-full" data-page="social-impact" href="social-impact.html"><span data-i18n="nav.socialImpact">Tác động xã hội</span></a>
      <a class="nav-link font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-3.5 rounded-full" data-page="topics" href="topics.html"><span data-i18n="nav.topics">Thư viện sơ cấp cứu</span></a>

      <!-- Dropdown Luyện tập & Phản xạ -->
      <div class="relative group" id="practice-dropdown-container">
        <button id="practice-dropdown-btn" type="button" aria-expanded="false" aria-haspopup="true" aria-controls="practice-dropdown-menu" class="nav-link font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-3.5 rounded-full inline-flex items-center gap-1 focus:outline-none cursor-pointer" data-page="practice">
          <span data-i18n="nav.practice">Luyện tập</span>
          <svg class="medfa-header__chevron transition-transform duration-200" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div id="practice-dropdown-menu" class="hidden group-hover:flex hover:flex absolute left-0 top-full mt-1.5 w-64 rounded-2xl bg-surface-container-lowest shadow-2xl border border-outline-variant/30 p-2 z-50 flex-col gap-1 transition-all">
          <a href="flashcards.html" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container-low transition-colors text-on-surface font-semibold text-sm" data-page="flashcards">
            <span class="material-symbols-outlined text-primary text-[20px]">style</span>
            <div class="flex flex-col">
              <span class="font-bold" data-i18n="nav.flashcards">Flashcard</span>
              <span class="text-xs text-on-surface-variant font-normal" data-i18n="nav.flashcardsDesc">Lật thẻ phản xạ trực quan</span>
            </div>
          </a>
          <a href="quiz.html" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container-low transition-colors text-on-surface font-semibold text-sm" data-page="quiz">
            <span class="material-symbols-outlined text-tertiary text-[20px]">quiz</span>
            <div class="flex flex-col">
              <span class="font-bold" data-i18n="nav.quiz">Trắc nghiệm tình huống</span>
              <span class="text-xs text-on-surface-variant font-normal" data-i18n="nav.quizDesc">10 case-study có giải thích y khoa</span>
            </div>
          </a>
        </div>
      </div>

      <a class="nav-link font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-3.5 rounded-full" data-page="contact" href="contact.html"><span data-i18n="nav.contact">Liên hệ</span></a>
      <a class="nav-link font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-3.5 rounded-full" data-page="nearby-care" href="nearby-care.html"><span data-i18n="nav.care">Cơ sở y tế</span></a>
      <a class="nav-link font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-3.5 rounded-full" data-page="about" href="about.html"><span data-i18n="nav.about">Về MedFA</span></a>
    </nav>

    <!-- Header Actions (Search, Theme, Language, Mobile Toggle) -->
    <div class="medfa-header__actions">
      <a href="topics.html" aria-label="Tìm kiếm tình huống sơ cứu" data-i18n-aria-label="header.searchAria" class="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
        <svg class="shrink-0" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4 4"/></svg>
      </a>

      <button id="theme-toggle-btn" type="button" aria-label="Chuyển đổi giao diện sáng/tối" data-i18n-aria-label="header.themeToggleAria" aria-pressed="false" class="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
        <svg class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z"/></svg>
        <svg class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>
      </button>

      <!-- Language Switcher -->
      <div class="relative inline-block text-left" id="language-dropdown-container">
        <button id="language-switcher-btn" aria-controls="language-dropdown-menu" aria-label="Chuyển đổi ngôn ngữ: Tiếng Việt" data-i18n-aria-label="header.langBtnAria" aria-expanded="false" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors text-on-surface focus:outline-none" type="button">
          <span id="lang-btn-flag">
            <svg class="w-5 h-3.5 rounded-sm shadow-sm shrink-0 inline-block" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
              <rect fill="#DA251D" height="20" width="30"></rect>
              <polygon fill="#FFFF00" points="15,4 16.545,8.755 21.55,8.755 17.502,11.695 19.048,16.45 15,13.51 10.952,16.45 12.498,11.695 8.45,8.755 13.455,8.755"></polygon>
            </svg>
          </span>
          <span id="lang-btn-text" class="font-label-md text-label-md font-bold text-primary">VN</span>
          <svg class="medfa-header__chevron text-on-surface-variant transition-transform duration-200" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div id="language-dropdown-menu" class="hidden absolute right-0 top-full mt-2 w-48 rounded-xl bg-surface-container-lowest shadow-xl border border-outline-variant/30 py-1.5 z-50 flex flex-col">
          <button type="button" data-language="vi" aria-pressed="true" class="w-full flex items-center justify-between px-3.5 py-2.5 text-left hover:bg-surface-container transition-colors">
            <div class="flex items-center gap-2.5">
              <svg class="w-5 h-3.5 rounded-sm shadow-xs shrink-0" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                <rect fill="#DA251D" height="20" width="30"></rect>
                <polygon fill="#FFFF00" points="15,4 16.545,8.755 21.55,8.755 17.502,11.695 19.048,16.45 15,13.51 10.952,16.45 12.498,11.695 8.45,8.755 13.455,8.755"></polygon>
              </svg>
              <span class="font-label-md text-label-md" data-i18n="header.language.vietnamese">Tiếng Việt</span>
            </div>
            <div class="flex items-center gap-1.5 lang-status">
              <span class="text-[10px] font-bold text-on-surface-variant/70 bg-surface-container-high px-1.5 py-0.5 rounded">VN</span>
            </div>
          </button>
          <button type="button" data-language="en" aria-pressed="false" class="w-full flex items-center justify-between px-3.5 py-2.5 text-left hover:bg-surface-container transition-colors">
            <div class="flex items-center gap-2.5">
              <svg class="w-5 h-3.5 rounded-sm shadow-xs shrink-0" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="uk-flag-clip"><rect width="60" height="30"></rect></clipPath>
                <g clip-path="url(#uk-flag-clip)"><rect width="60" height="30" fill="#012169"></rect><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"></path><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="2"></path><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"></path><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"></path></g>
              </svg>
              <span class="font-label-md text-label-md" data-i18n="header.language.english">Tiếng Anh</span>
            </div>
            <div class="flex items-center gap-1.5 lang-status">
              <span class="text-[10px] font-bold text-on-surface-variant/70 bg-surface-container-high px-1.5 py-0.5 rounded">ENG</span>
            </div>
          </button>
          <button type="button" data-language="ja" aria-pressed="false" class="w-full flex items-center justify-between px-3.5 py-2.5 text-left hover:bg-surface-container transition-colors">
            <div class="flex items-center gap-2.5">
              <svg class="w-5 h-3.5 rounded-sm shadow-xs shrink-0" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="30" height="20" fill="#fff"></rect>
                <circle cx="15" cy="10" r="6" fill="#BC002D"></circle>
              </svg>
              <span class="font-label-md text-label-md" data-i18n="header.language.japanese">日本語</span>
            </div>
            <div class="flex items-center gap-1.5 lang-status">
              <span class="text-[10px] font-bold text-on-surface-variant/70 bg-surface-container-high px-1.5 py-0.5 rounded">日本</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile menu toggle button -->
      <button id="mobile-menu-btn" aria-controls="mobile-menu" aria-expanded="false" aria-label="Mở menu di động" data-i18n-aria-label="header.mobileMenuAria" class="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors" type="button">
        <svg class="shrink-0" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="medfa-header__menu-icon" d="M4 6h16M4 12h16M4 18h16"/><path class="medfa-header__close-icon" d="m6 6 12 12M18 6 6 18"/></svg>
      </button>
    </div>
  </div>

  <!-- Mobile Dropdown Navigation Drawer -->
  <div id="mobile-menu" class="hidden bg-surface-container-lowest border-t border-outline-variant/30 px-4 py-4 flex-col gap-1.5 shadow-2xl">
    <div class="flex items-center justify-between pb-2 mb-1 border-b border-outline-variant/20">
      <span class="text-xs font-bold text-primary tracking-wider uppercase" data-i18n="header.mobileMenuTitle">Menu Điều Hướng</span>
      <span class="text-xs text-on-surface-variant font-medium">MedFA Mobile</span>
    </div>
    <a class="nav-link-mobile px-4 py-3 rounded-xl font-semibold text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between" data-page="home" href="index.html">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-primary text-[20px]">home</span>
        <span data-i18n="nav.home">Trang chủ</span>
      </div>
      <span class="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
    </a>
    <a class="nav-link-mobile px-4 py-3 rounded-xl font-semibold text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between" data-page="social-impact" href="social-impact.html">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-secondary text-[20px]">volunteer_activism</span>
        <span data-i18n="nav.socialImpact">Tác động xã hội</span>
      </div>
      <span class="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
    </a>
    <a class="nav-link-mobile px-4 py-3 rounded-xl font-semibold text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between" data-page="topics" href="topics.html">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-primary text-[20px]">menu_book</span>
        <span data-i18n="nav.topics">Thư viện sơ cấp cứu</span>
      </div>
      <span class="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
    </a>
    <!-- Luyện tập & Phản xạ Group -->
    <div class="rounded-xl bg-surface-container-low/70 p-2 flex flex-col gap-1 border border-outline-variant/20 my-1">
      <span class="text-[10px] font-bold text-primary tracking-wider uppercase px-2 py-0.5" data-i18n="header.mobilePracticeGroup">Luyện tập & Phản xạ</span>
      <a class="nav-link-mobile px-3 py-2 rounded-lg font-semibold text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between" data-page="flashcards" href="flashcards.html">
        <div class="flex items-center gap-2.5">
          <span class="material-symbols-outlined text-primary text-[18px]">style</span>
          <span class="text-sm" data-i18n="nav.flashcards">Flashcard</span>
        </div>
        <span class="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
      </a>
      <a class="nav-link-mobile px-3 py-2 rounded-lg font-semibold text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between" data-page="quiz" href="quiz.html">
        <div class="flex items-center gap-2.5">
          <span class="material-symbols-outlined text-tertiary text-[18px]">quiz</span>
          <span class="text-sm" data-i18n="nav.quiz">Trắc nghiệm tình huống</span>
        </div>
        <span class="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
      </a>
    </div>
    <a class="nav-link-mobile px-4 py-3 rounded-xl font-semibold text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between" data-page="contact" href="contact.html">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-secondary text-[20px]">contact_support</span>
        <span data-i18n="nav.contact">Liên hệ</span>
      </div>
      <span class="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
    </a>
    <a class="nav-link-mobile px-4 py-3 rounded-xl font-semibold text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between" data-page="nearby-care" href="nearby-care.html">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-secondary text-[20px]">local_hospital</span>
        <span data-i18n="nav.care">Cơ sở y tế</span>
      </div>
      <span class="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
    </a>
    <a class="nav-link-mobile px-4 py-3 rounded-xl font-semibold text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between" data-page="about" href="about.html">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-secondary text-[20px]">info</span>
        <span data-i18n="nav.about">Về MedFA</span>
      </div>
      <span class="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
    </a>
    <div class="pt-2.5 mt-1 border-t border-outline-variant/20 flex flex-col gap-2">
      <a href="tel:115" class="w-full py-2.5 px-4 rounded-xl bg-error hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors">
        <span class="material-symbols-outlined text-[18px]">call</span>
        <span data-i18n="nav.callEmergency">Gọi Cấp Cứu 115 Khẩn Cấp</span>
      </a>
    </div>
  </div>
</header>`;

  /**
   * Footer & Floating AI Chatbot dùng chung
   */
  const FOOTER_HTML = `<footer class="w-full bg-surface-container-low text-on-surface mt-auto border-t border-outline-variant/30">
  <div class="w-full px-4 sm:px-6 lg:px-8 pt-space-xl pb-space-lg">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-space-xl">
      <!-- Cột 1: Thương hiệu & Sứ mệnh -->
      <div class="flex flex-col gap-space-md">
        <div class="flex items-center gap-space-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224 80" class="h-14 w-auto" fill="none">
            <rect width="64" height="64" x="8" y="8" rx="16" fill="#1E40AF"/>
            <path d="M40 24v32M24 40h32" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
            <path d="M26 40c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#0D9488" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 4"/>
            <circle cx="56" cy="24" r="4" fill="#E63946"/>
            <text x="86" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="800" fill="#1E40AF" letter-spacing="-0.5">Med<tspan fill="#0D9488">FA</tspan></text>
            <text x="88" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#64748B" letter-spacing="1.5">MEDICAL FIRST AID</text>
          </svg>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed" data-i18n-html="footer.mission">
          MedFA là nền tảng phi lợi nhuận chuyên chuẩn hóa và phổ biến kiến thức sơ cấp cứu ban đầu trong <strong>"4 Phút Vàng"</strong> theo chuẩn y khoa quốc tế AHA & ERC.
        </p>
        <div class="flex flex-wrap items-center gap-2 pt-1">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">
            <span class="material-symbols-outlined text-[14px]">volunteer_activism</span>
            <span data-i18n="footer.nonProfit">Dự án phi lợi nhuận</span>
          </span>
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-primary-fixed text-primary">
            <span class="material-symbols-outlined text-[14px]">school</span>
            <span data-i18n="footer.schoolProject">Đồ án IE104 UIT</span>
          </span>
        </div>
      </div>

      <!-- Cột 2: Danh bạ Khẩn cấp Quốc Gia -->
      <address class="flex flex-col gap-space-sm not-italic">
        <span class="font-title-md text-title-md text-on-surface font-bold flex items-center gap-1.5">
          <span class="material-symbols-outlined text-error text-[20px]" style="font-variation-settings: 'FILL' 1;">emergency</span>
          <span data-i18n="footer.emergencyTitle">Tổng đài khẩn cấp</span>
        </span>
        <div class="flex flex-col gap-2 mt-1">
          <a href="tel:115" class="flex items-center justify-between p-2 rounded-lg bg-error-container/30 border border-error/30 hover:bg-error-container/50 transition-colors group">
            <div class="flex items-center gap-2">
              <span class="font-bold text-xs text-white bg-error px-2 py-0.5 rounded shadow-xs">115</span>
              <span class="font-body-sm text-body-sm font-bold text-error" data-i18n="footer.em115">Cấp cứu Y tế</span>
            </div>
            <span class="material-symbols-outlined text-error text-[18px] group-hover:translate-x-0.5 transition-transform">phone_in_talk</span>
          </a>
          <a href="tel:114" class="flex items-center justify-between p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
            <div class="flex items-center gap-2">
              <span class="font-bold text-xs text-on-surface bg-surface-container-lowest border border-outline-variant/30 px-2 py-0.5 rounded shadow-xs">114</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant font-medium" data-i18n="footer.em114">Cứu hỏa & Cứu nạn</span>
            </div>
            <span class="material-symbols-outlined text-outline text-[16px]">call</span>
          </a>
          <a href="tel:113" class="flex items-center justify-between p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
            <div class="flex items-center gap-2">
              <span class="font-bold text-xs text-on-surface bg-surface-container-lowest border border-outline-variant/30 px-2 py-0.5 rounded shadow-xs">113</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant font-medium" data-i18n="footer.em113">Cảnh sát & An ninh</span>
            </div>
            <span class="material-symbols-outlined text-outline text-[16px]">call</span>
          </a>
          <a href="tel:111" class="flex items-center justify-between p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
            <div class="flex items-center gap-2">
              <span class="font-bold text-xs text-on-surface bg-surface-container-lowest border border-outline-variant/30 px-2 py-0.5 rounded shadow-xs">111</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant font-medium" data-i18n="footer.em111">Bảo vệ Trẻ em</span>
            </div>
            <span class="material-symbols-outlined text-outline text-[16px]">call</span>
          </a>
        </div>
      </address>

      <!-- Cột 3: Cẩm nang Sơ cấp cứu -->
      <div class="flex flex-col gap-space-sm">
        <span class="font-title-md text-title-md text-on-surface font-bold" data-i18n="footer.handbookTitle">Cẩm nang sơ cứu</span>
        <nav aria-label="Tình huống sơ cứu" data-i18n-aria-label="footer.topicsAria" class="flex flex-col gap-space-xs">
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5" href="topics.html">
            <span class="material-symbols-outlined text-[16px] text-secondary">arrow_right</span>
            <span data-i18n="footer.handbookLibrary">Thư viện tình huống sơ cứu</span>
          </a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5" href="topic-detail.html?id=hoi-sinh-tim-phoi-nguoi-lon">
            <span class="material-symbols-outlined text-[16px] text-secondary">arrow_right</span>
            <span data-i18n="footer.handbookCpr">Ép tim CPR & Máy sốc điện AED</span>
          </a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5" href="topic-detail.html?id=hoc-di-vat-o-tre-em">
            <span class="material-symbols-outlined text-[16px] text-secondary">arrow_right</span>
            <span data-i18n="footer.handbookChoking">Hóc dị vật & Nghiệm pháp Heimlich</span>
          </a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5" href="topic-detail.html?id=bong-nhiet">
            <span class="material-symbols-outlined text-[16px] text-secondary">arrow_right</span>
            <span data-i18n="footer.handbookBurns">Sơ cứu bỏng nhiệt an toàn</span>
          </a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5" href="topic-detail.html?id=chay-mau-va-cam-mau">
            <span class="material-symbols-outlined text-[16px] text-secondary">arrow_right</span>
            <span data-i18n="footer.handbookBleeding">Kỹ thuật băng ép & Cầm máu</span>
          </a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5" href="topic-detail.html?id=dot-quy">
            <span class="material-symbols-outlined text-[16px] text-secondary">arrow_right</span>
            <span data-i18n="footer.handbookStroke">Nhận biết dấu hiệu Đột quỵ FAST</span>
          </a>
        </nav>
      </div>

      <!-- Cột 4: Dự án & Thông tin liên hệ -->
      <div class="flex flex-col gap-space-sm">
        <span class="font-title-md text-title-md text-on-surface font-bold" data-i18n="footer.projectTitle">Dự án & Liên hệ</span>
        <p class="font-body-sm text-body-sm text-on-surface-variant" data-i18n-html="footer.courseDesc">
          Đồ án môn học <strong>IE104 - Internet và Công nghệ Web</strong>. Trường Đại học Công nghệ Thông tin (UIT - ĐHQG-HCM).
        </p>
        <div class="flex flex-col gap-space-xs mt-1">
          <div class="flex items-center gap-2 text-on-surface-variant">
            <span class="material-symbols-outlined text-primary text-[18px]">call</span>
            <a class="font-body-sm text-body-sm text-primary font-bold hover:underline" href="tel:+84919985358">(+84) 919 985 358</a>
          </div>
          <div class="flex items-center gap-2 text-on-surface-variant">
            <span class="material-symbols-outlined text-primary text-[18px]">mail</span>
            <a class="font-body-sm text-body-sm text-on-surface hover:text-primary" href="mailto:24520888@gm.uit.edu.vn">24520888@gm.uit.edu.vn</a>
          </div>
          <div class="flex items-center gap-2 text-on-surface-variant">
            <span class="material-symbols-outlined text-primary text-[18px]">location_on</span>
            <span class="font-body-sm text-body-sm" data-i18n="footer.address">ĐHQG-HCM, TP. Thủ Đức</span>
          </div>
        </div>
        <div class="mt-2 pt-2 border-t border-outline-variant/20 flex flex-wrap gap-2 text-xs">
          <a class="text-on-surface-variant hover:text-primary transition-colors" href="about.html" data-i18n="footer.aboutLink">Về MedFA</a>
          <span>•</span>
          <a class="text-on-surface-variant hover:text-primary transition-colors" href="social-impact.html" data-i18n="footer.impactLink">Tác động xã hội</a>
          <span>•</span>
          <a class="text-on-surface-variant hover:text-primary transition-colors" href="about.html#standards" data-i18n="footer.disclaimerLink">Miễn trừ trách nhiệm y khoa</a>
        </div>
      </div>
    </div>

    <!-- Mạng lưới Nguồn Y khoa Chính thống -->
    <div class="pb-space-lg pt-space-md border-t border-outline-variant/20 flex flex-col gap-2">
      <span class="text-xs font-bold uppercase tracking-wider text-on-surface-variant" data-i18n="footer.sourcesHeading">Nguồn tham chiếu y khoa</span>
      <div id="satellite-authority-links"></div>
    </div>

    <!-- Bottom Copyright -->
    <div class="pt-space-lg border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant">
      <span class="font-body-sm text-body-sm">© 2026 MedFA - Medical First Aid (IE104 UIT). <span data-i18n="footer.copyright">Dự án giáo dục phi lợi nhuận phục vụ cộng đồng.</span></span>
      <div class="flex flex-wrap items-center gap-space-md text-body-sm">
        <a class="hover:text-primary transition-colors" href="about.html#standards" data-i18n="footer.disclaimerLink">Miễn trừ trách nhiệm y khoa</a>
      </div>
    </div>
  </div>
</footer>

<!-- FLOATING COMPONENT: MEDFA AI FIRST AID ASSISTANT -->
<div id="medfa-chat-dock" class="fixed z-50 flex flex-col items-end pointer-events-none">
  <!-- Chat Window -->
  <div id="medfa-chat-window" class="pointer-events-auto bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right hidden">
    <!-- Chat Header -->
    <div class="bg-gradient-to-r from-primary-container to-primary px-4 py-3.5 text-on-primary flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            <span class="material-symbols-outlined text-[24px]">smart_toy</span>
          </div>
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-secondary-container rounded-full border-2 border-primary-container shadow-xs"></span>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-1.5">
            <span class="font-title-md text-title-md font-bold tracking-tight leading-tight text-white" data-i18n="chat.title">MedFA Trợ lý AI</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-1.5 text-white">
        <button id="chat-settings-btn" type="button" title="Cài đặt Mô hình AI" data-i18n-title="chat.settingsTitle" class="p-1.5 text-white bg-white/10 hover:bg-white/25 rounded-lg transition-colors focus:outline-none flex items-center justify-center"><span class="material-symbols-outlined text-[18px] text-white">settings</span></button>
        <button id="chat-close-btn" type="button" title="Thu nhỏ" data-i18n-title="chat.closeTitle" class="p-1.5 text-white bg-white/10 hover:bg-white/25 rounded-lg transition-colors focus:outline-none flex items-center justify-center">
          <span class="material-symbols-outlined text-[20px] text-white">close</span>
        </button>
      </div>
    </div>

    <!-- Messages Container -->
    <div id="chat-messages-container" class="flex-1 p-4 overflow-y-auto bg-surface-container-low flex flex-col gap-3">
      <div class="flex items-start gap-2.5 max-w-[90%]">
        <div class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
          <span class="material-symbols-outlined text-[16px]">smart_toy</span>
        </div>
        <div class="flex flex-col items-start gap-1">
          <div class="bg-surface-container-lowest text-on-surface p-3.5 rounded-2xl rounded-tl-sm border border-outline-variant/30 shadow-sm text-body-sm leading-relaxed">
            <p class="font-semibold text-primary mb-1" data-i18n="chat.greeting">Xin chào bạn! Mình là Trợ lý AI MedFA 🩺</p>
            <p class="text-on-surface-variant" data-i18n="chat.greetingDesc">Bạn hoặc người thân đang gặp tình huống sơ cấp cứu nào cần hướng dẫn xử trí khẩn cấp không?</p>
          </div>
          <span class="text-[10px] text-on-surface-variant/60 font-medium ml-1" data-i18n="chat.justNow">Vừa xong</span>
        </div>
      </div>
      <!-- Quick Suggestions -->
      <div class="flex flex-col gap-1.5 pl-9 mt-1">
        <div class="flex flex-wrap gap-1.5">
          <a href="topic-detail.html?id=hoi-sinh-tim-phoi-nguoi-lon" class="px-3 py-1.5 text-body-sm font-semibold rounded-full bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant/40 shadow-xs transition-colors flex items-center gap-1" data-i18n="chat.quickCpr">
            🚨 Ép tim CPR & AED
          </a>
          <a href="topic-detail.html?id=hoc-di-vat-o-tre-em" class="px-3 py-1.5 text-body-sm font-semibold rounded-full bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant/40 shadow-xs transition-colors flex items-center gap-1" data-i18n="chat.quickChoking">
            👶 Hóc dị vật đường thở
          </a>
          <a href="topic-detail.html?id=bong-nhiet" class="px-3 py-1.5 text-body-sm font-semibold rounded-full bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant/40 shadow-xs transition-colors flex items-center gap-1" data-i18n="chat.quickBurns">
            🔥 Sơ cứu vết bỏng
          </a>
          <a href="topic-detail.html?id=chay-mau-va-cam-mau" class="px-3 py-1.5 text-body-sm font-semibold rounded-full bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant/40 shadow-xs transition-colors flex items-center gap-1" data-i18n="chat.quickBleeding">
            🩸 Băng ép cầm máu
          </a>
        </div>
      </div>
    </div>

    <!-- Chat Input Area -->
    <div class="p-3 bg-surface-container-lowest border-t border-outline-variant/30">
      <form id="chat-input-form" class="flex items-center gap-2 bg-surface-container-low rounded-xl px-3 py-2 border border-outline-variant/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <input id="chat-user-input" type="text" placeholder="Nhập tình huống sơ cứu..." data-i18n-placeholder="footer.chatPlaceholder" class="flex-1 bg-transparent border-none text-body-sm text-on-surface focus:outline-none placeholder:text-on-surface-variant/50 p-0" />
        <button type="submit" class="w-8 h-8 rounded-lg bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center transition-colors shadow-xs shrink-0">
          <span class="material-symbols-outlined text-[18px]">send</span>
        </button>
      </form>
      <div class="flex items-center justify-between mt-2 px-1">
        <span class="text-[11px] text-on-surface-variant/70" data-i18n="footer.chatRefData">Dữ liệu tham khảo y khoa</span>
        <a href="tel:115" class="text-[11px] font-bold text-error hover:underline flex items-center gap-0.5">
          <span class="material-symbols-outlined text-[13px]">call</span><span data-i18n="footer.chatEmergency">Cấp cứu 115</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Chat Floating Trigger Button -->
  <button id="medfa-chat-toggle-btn" type="button" aria-label="Mở trợ lý sơ cứu AI" data-i18n-aria-label="footer.chatToggleAria" class="pointer-events-auto relative w-14 h-14 rounded-full bg-primary-container hover:bg-primary text-on-primary shadow-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/40 group">
    <span class="absolute inline-flex h-full w-full rounded-full bg-primary opacity-30 animate-ping -z-10"></span>
    <span class="material-symbols-outlined text-[26px]">smart_toy</span>
    <span class="absolute -top-1 -right-1 w-4 h-4 bg-error text-white font-bold text-[9px] rounded-full flex items-center justify-center border-2 border-surface-container-lowest shadow-xs">1</span>
  </button>
</div>`;

  global.MedFAComponents = Object.assign(global.MedFAComponents || {}, {
    escapeHTML,
    registerComponent,
    renderComponentList,
    HEADER_HTML,
    FOOTER_HTML
  });
})(typeof window !== 'undefined' ? window : globalThis);