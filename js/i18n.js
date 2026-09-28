/**
 * MedFA Internationalization (i18n) Engine
 * Handles client-side bilingual switching (VI / EN), UI updates, 
 * persistence via localStorage, and event broadcasting.
 */

(function () {
  'use strict';

  // SVG Flag Constants
  const FLAGS = {
    vi: `<svg class="w-5 h-3.5 rounded-sm shadow-sm shrink-0 inline-block" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
      <rect fill="#DA251D" height="20" width="30"></rect>
      <polygon fill="#FFFF00" points="15,4 16.545,8.755 21.55,8.755 17.502,11.695 19.048,16.45 15,13.51 10.952,16.45 12.498,11.695 8.45,8.755 13.455,8.755"></polygon>
    </svg>`,
    en: `<svg class="w-5 h-3.5 rounded-sm shadow-sm shrink-0 inline-block" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="uk-flag-clip-btn"><rect width="60" height="30"></rect></clipPath>
      <g clip-path="url(#uk-flag-clip-btn)"><rect width="60" height="30" fill="#012169"></rect><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"></path><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="2"></path><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"></path><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"></path></g>
    </svg>`
  };

  /**
   * Determine the active language
   */
  function detectLanguage() {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'en' || urlLang === 'vi') {
      try { localStorage.setItem('medfa_lang', urlLang); } catch (e) {}
      return urlLang;
    }

    try {
      const savedLang = localStorage.getItem('medfa_lang');
      if (savedLang === 'en' || savedLang === 'vi') return savedLang;
    } catch (e) {}

    return 'vi'; // Default to Vietnamese
  }

  let currentLang = detectLanguage();

  /**
   * Safe dictionary lookup with dot notation (e.g., 'nav.home')
   */
  function t(path, fallback = '') {
    if (!window.MEDFA_TRANSLATIONS) return fallback;
    const dict = window.MEDFA_TRANSLATIONS[currentLang] || window.MEDFA_TRANSLATIONS['vi'];
    if (!dict) return fallback;

    const parts = path.split('.');
    let val = dict;
    for (const p of parts) {
      if (val && typeof val === 'object' && p in val) {
        val = val[p];
      } else {
        return fallback || path;
      }
    }
    return typeof val === 'string' ? val : fallback;
  }

  /**
   * Update the UI state of the Language Switcher Dropdown button and menu
   */
  function updateLanguageSwitcherUI(lang) {
    const btn = document.getElementById('language-switcher-btn');
    if (btn) {
      btn.setAttribute('aria-label', t('nav.lang_btn_aria'));
      
      // Update Flag and Text Label in Trigger Button
      const flagSpan = btn.querySelector('.flag-container') || btn.querySelector('svg');
      const textSpan = btn.querySelector('.font-label-md');
      
      if (flagSpan) {
        flagSpan.outerHTML = `<span class="flag-container shrink-0 inline-flex items-center">${FLAGS[lang]}</span>`;
      }
      if (textSpan) {
        textSpan.textContent = lang === 'en' ? 'ENG' : 'VN';
      }
    }

    // Update Dropdown Menu items (active styles and checkmarks)
    const viItem = document.querySelector('[data-lang-select="vi"]');
    const enItem = document.querySelector('[data-lang-select="en"]');

    if (viItem) {
      const viCheck = viItem.querySelector('.lang-check-icon');
      if (lang === 'vi') {
        viItem.classList.add('bg-surface-container/50');
        if (viCheck) viCheck.classList.remove('hidden');
      } else {
        viItem.classList.remove('bg-surface-container/50');
        if (viCheck) viCheck.classList.add('hidden');
      }
    }

    if (enItem) {
      const enCheck = enItem.querySelector('.lang-check-icon');
      if (lang === 'en') {
        enItem.classList.add('bg-surface-container/50');
        if (enCheck) enCheck.classList.remove('hidden');
      } else {
        enItem.classList.remove('bg-surface-container/50');
        if (enCheck) enCheck.classList.add('hidden');
      }
    }
  }

  /**
   * Apply translations to all DOM elements tagged with data-i18n attributes
   */
  function applyTranslations(lang) {
    document.documentElement.lang = lang;

    // 1. Text & HTML content
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const translated = t(key);
      if (translated) {
        el.innerHTML = translated;
      }
    });

    // 2. Placeholders for inputs and search bars
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translated = t(key);
      if (translated) {
        el.setAttribute('placeholder', translated);
      }
    });

    // 3. Titles and Aria-labels
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      const translated = t(key);
      if (translated) {
        el.setAttribute('title', translated);
        el.setAttribute('aria-label', translated);
      }
    });

    // 4. Smart auto-translation for Navigation Links (using data-page)
    const navMap = {
      'home': 'nav.home',
      'social-impact': 'nav.social_impact',
      'topics': 'nav.topics',
      'about': 'nav.about'
    };

    document.querySelectorAll('.nav-link[data-page]').forEach((el) => {
      const page = el.getAttribute('data-page');
      if (navMap[page]) {
        el.textContent = t(navMap[page]);
      }
    });

    document.querySelectorAll('.nav-link-mobile[data-page]').forEach((el) => {
      const page = el.getAttribute('data-page');
      if (navMap[page]) {
        const textSpan = el.querySelector('span:first-child');
        if (textSpan) {
          textSpan.textContent = t(navMap[page]);
        }
      }
    });

    // 5. Smart auto-translation for AI Chat Floating Assistant if loaded
    translateChatbotUI();
  }

  /**
   * Translate AI Chat Assistant Widget
   */
  function translateChatbotUI() {
    const chatTitle = document.querySelector('#medfa-chat-window .font-title-md');
    if (chatTitle) chatTitle.textContent = t('chat.title');

    const chatBadge = document.querySelector('#medfa-chat-window span.text-\\[10px\\]');
    if (chatBadge && (chatBadge.textContent === 'Y KHOA' || chatBadge.textContent === 'MEDICAL')) {
      chatBadge.textContent = t('chat.badge');
    }

    const chatStatus = document.querySelector('#medfa-chat-window span.text-\\[12px\\]');
    if (chatStatus) {
      chatStatus.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>${t('chat.status')}`;
    }

    const chatGreetingTitle = document.querySelector('#chat-messages-container .font-semibold.text-primary');
    if (chatGreetingTitle) chatGreetingTitle.textContent = t('chat.greeting_title');

    const chatGreetingDesc = document.querySelector('#chat-messages-container p.text-on-surface-variant');
    if (chatGreetingDesc) chatGreetingDesc.textContent = t('chat.greeting_desc');

    const chatPromptTitle = document.querySelector('#chat-messages-container .uppercase.tracking-wider');
    if (chatPromptTitle) chatPromptTitle.textContent = t('chat.quick_title');

    const chatInput = document.getElementById('chat-user-input');
    if (chatInput) chatInput.placeholder = t('chat.placeholder');

    const chatRef = document.querySelector('#medfa-chat-window .mt-2.px-1 span.text-\\[11px\\]');
    if (chatRef) chatRef.textContent = t('chat.medical_ref');

    const chat115 = document.querySelector('#medfa-chat-window a[href="tel:115"]');
    if (chat115) {
      chat115.innerHTML = `<span class="material-symbols-outlined text-[13px]">call</span>${t('chat.emergency_115')}`;
    }
  }

  /**
   * Set and apply a new language
   */
  function setLanguage(lang) {
    if (lang !== 'vi' && lang !== 'en') return;
    currentLang = lang;
    try {
      localStorage.setItem('medfa_lang', lang);
    } catch (e) {}

    updateLanguageSwitcherUI(lang);
    applyTranslations(lang);

    // Hide dropdown menu if open
    const langMenu = document.getElementById('language-dropdown-menu');
    if (langMenu) langMenu.classList.add('hidden');

    // Broadcast change event for other components (e.g. data loaders)
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  /**
   * Bind click events on dropdown language options
   */
  function bindLanguageEvents() {
    const viItem = document.querySelector('[data-lang-select="vi"]');
    const enItem = document.querySelector('[data-lang-select="en"]');

    if (viItem) {
      viItem.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLanguage('vi');
      };
    }

    if (enItem) {
      enItem.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLanguage('en');
      };
    }
  }

  /**
   * Public API
   */
  window.MedFAi18n = {
    getLanguage: () => currentLang,
    setLanguage: setLanguage,
    t: t,
    applyCurrentLanguage: () => {
      updateLanguageSwitcherUI(currentLang);
      applyTranslations(currentLang);
      bindLanguageEvents();
    },
    init: () => {
      currentLang = detectLanguage();
      updateLanguageSwitcherUI(currentLang);
      applyTranslations(currentLang);
      bindLanguageEvents();
    }
  };

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.MedFAi18n.init();
    });
  } else {
    window.MedFAi18n.init();
  }
})();
