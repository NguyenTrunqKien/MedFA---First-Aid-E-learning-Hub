/**
 * MedFA Internationalization (i18n) Engine
 * Quản lý trạng thái ngôn ngữ (vi / en), lưu trữ localStorage (có bộ nhớ đệm dự phòng),
 * tra cứu từ điển và áp dụng bản dịch động vào DOM.
 */

const I18n = (() => {
  'use strict';

  const STORAGE_KEY = 'medfa.language';
  const SUPPORTED_LANGUAGES = ['vi', 'en'];
  const DEFAULT_LANGUAGE = 'vi';

  function getSavedLanguage() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return SUPPORTED_LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE;
    } catch {
      return DEFAULT_LANGUAGE;
    }
  }

  let currentLanguage = getSavedLanguage();

  function getLanguage() {
    return currentLanguage;
  }

  /**
   * Tra cứu bản dịch theo mã khóa và thay thế tham số định dạng
   * @param {string} key
   * @param {Object} [params]
   * @returns {string}
   */
  function t(key, params = {}) {
    if (!key) return '';
    const currentLang = getLanguage();
    const dictionary = window.MedFATranslations || {};
    const currentDict = dictionary[currentLang] || {};
    const fallbackDict = dictionary[DEFAULT_LANGUAGE] || {};

    let translation = currentDict[key];
    if (translation === undefined || translation === null) {
      translation = fallbackDict[key];
    }
    if (translation === undefined || translation === null) {
      return key; // Trả về mã khóa nếu thiếu bản dịch
    }

    if (params && typeof params === 'object') {
      for (const [paramKey, paramVal] of Object.entries(params)) {
        translation = String(translation).replaceAll(`{${paramKey}}`, String(paramVal));
      }
    }

    return String(translation);
  }

  /**
   * Áp dụng từ điển dịch cho toàn bộ cây DOM bên trong root
   * @param {HTMLElement|Document} [root=document]
   */
  function applyTranslations(root = document) {
    if (!root) return;
    const currentLang = getLanguage();
    if (document.documentElement) {
      document.documentElement.lang = currentLang;
    }

    // 1. TextContent: data-i18n
    const textElements = root.querySelectorAll('[data-i18n]');
    textElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = t(key, el.dataset.i18nId ? { id: el.dataset.i18nId } : {});
      }
    });

    // 2. InnerHTML (chứa markup như <strong>, <a>): data-i18n-html
    const htmlElements = root.querySelectorAll('[data-i18n-html]');
    htmlElements.forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (key) {
        el.innerHTML = t(key);
      }
    });

    for (const attribute of ['placeholder', 'aria-label', 'title', 'alt']) {
      const marker = `data-i18n-${attribute}`;
      const selector = attribute === 'aria-label' ? `[${marker}], [data-i18n-aria]` : `[${marker}]`;
      root.querySelectorAll(selector).forEach(el => {
        const key = el.getAttribute(marker) || el.getAttribute('data-i18n-aria');
        if (key) el.setAttribute(attribute, t(key));
      });
    }

    // 6. Cập nhật document.title nếu có thẻ meta chỉ định
    const pageTitleMeta = document.querySelector('meta[name="i18n-title"]');
    if (pageTitleMeta) {
      const key = pageTitleMeta.getAttribute('content');
      if (key) {
        document.title = t(key);
      }
    }
  }

  /**
   * Thay đổi ngôn ngữ, lưu vào bộ nhớ, cập nhật HTML và phát sự kiện toàn cục
   * @param {'vi'|'en'} lang
   */
  function setLanguage(lang) {
    const validLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
    currentLanguage = validLang;

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, validLang);
      }
    } catch {
      // Keep the current page language even when storage is unavailable.
    }

    if (document.documentElement) {
      document.documentElement.lang = validLang;
    }

    applyTranslations(document);

    // Phát sự kiện toàn cục để các mô-đun dữ liệu động (Topics, Flashcards, Quiz, Timed Practice) cập nhật
    const eventPayload = { detail: { language: validLang } };
    window.dispatchEvent(new CustomEvent('medfa:languageChanged', eventPayload));
    window.dispatchEvent(new CustomEvent('languageChanged', eventPayload));
  }

  // Tự động khởi tạo thuộc tính <html lang> ngay khi nạp file script
  try {
    const initialLang = getLanguage();
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.lang = initialLang;
    }
  } catch {
    // An toàn trong môi trường test
  }

  return {
    getLanguage,
    setLanguage,
    t,
    applyTranslations,
    SUPPORTED_LANGUAGES,
    DEFAULT_LANGUAGE
  };
})();

if (typeof window !== 'undefined') {
  window.I18n = I18n;
  // Cung cấp hàm t() toàn cục tiện dụng
  window.t = I18n.t;
}
