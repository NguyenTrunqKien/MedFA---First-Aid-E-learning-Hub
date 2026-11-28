/**
 * Điểm khởi chạy chính toàn cục (js/main.js)
 * Điều phối: Nạp các component tái sử dụng từ thư mục js/components/ (layout.js, cards.js),
 * tự động render các khối JSON props trên từng trang, đồng bộ trạng thái menu active,
 * điều khiển menu mobile, dropdown luyện tập/ngôn ngữ, hiệu ứng cuộn trang (scroll)
 * và kết nối module Chatbot AI Gemini (js/chatbot-gemini.js).
 */

/**
 * Cập nhật giao diện nút chuyển ngôn ngữ và menu dropdown
 * @param {'vi'|'en'|'ja'} [lang]
 */
function updateLanguageSwitcherUI(lang) {
  const currentLang = lang || (window.I18n ? window.I18n.getLanguage() : 'vi');
  const flagContainer = document.getElementById('lang-btn-flag');
  const textContainer = document.getElementById('lang-btn-text');
  const langMenu = document.getElementById('language-dropdown-menu');

  const vnFlagSvg = '<svg class="w-5 h-3.5 rounded-sm shadow-sm shrink-0 inline-block" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect fill="#DA251D" height="20" width="30"></rect><polygon fill="#FFFF00" points="15,4 16.545,8.755 21.55,8.755 17.502,11.695 19.048,16.45 15,13.51 10.952,16.45 12.498,11.695 8.45,8.755 13.455,8.755"></polygon></svg>';
  const ukFlagSvg = '<svg class="w-5 h-3.5 rounded-sm shadow-sm shrink-0 inline-block" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg"><clipPath id="uk-flag-clip-header"><rect width="60" height="30"></rect></clipPath><g clip-path="url(#uk-flag-clip-header)"><rect width="60" height="30" fill="#012169"></rect><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"></path><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="2"></path><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"></path><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"></path></g></svg>';
  const jpFlagSvg = '<svg class="w-5 h-3.5 rounded-sm shadow-sm shrink-0 inline-block" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#fff"></rect><circle cx="15" cy="10" r="6" fill="#BC002D"></circle></svg>';

  if (flagContainer) {
    flagContainer.innerHTML = currentLang === 'en' ? ukFlagSvg : currentLang === 'ja' ? jpFlagSvg : vnFlagSvg;
  }
  if (textContainer) {
    textContainer.textContent = currentLang === 'en' ? 'ENG' : currentLang === 'ja' ? '日本' : 'VN';
  }
  if (langMenu) {
    langMenu.querySelectorAll('button[data-language]').forEach(btn => {
      const selected = btn.dataset.language === currentLang;
      btn.setAttribute('aria-pressed', String(selected));
    });
  }
}

function getCurrentPageKey() {
  const bodyPage = document.body.getAttribute('data-page');
  if (bodyPage) return bodyPage;

  const path = window.location.pathname.toLowerCase();
  if (path.endsWith('index.html') || path.endsWith('/') || path === '') return 'home';
  if (path.includes('social-impact')) return 'social-impact';
  if (path.includes('topic-detail') || path.includes('topics')) return 'topics';
  if (path.includes('flashcards')) return 'flashcards';
  if (path.includes('quiz')) return 'quiz';
  if (path.includes('contact')) return 'contact';
  if (path.includes('about')) return 'about';
  return 'home';
}

/**
 * Đánh dấu mục điều hướng đang kích hoạt (Desktop & Mobile) bằng aria-current="page"
 */
function highlightActiveNav() {
  const currentKey = getCurrentPageKey();
  const isPracticePage = ['flashcards', 'quiz'].includes(currentKey);

  // Điều hướng Desktop
  document.querySelectorAll('.nav-link').forEach(link => {
    const page = link.getAttribute('data-page');
    if (page === currentKey || (page === 'practice' && isPracticePage)) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  // Điều hướng Mobile Drawer
  document.querySelectorAll('.nav-link-mobile').forEach(link => {
    const page = link.getAttribute('data-page');
    if (page === currentKey) {
      link.classList.add('bg-primary/10', 'text-primary', 'font-bold');
    } else {
      link.classList.remove('bg-primary/10', 'text-primary', 'font-bold');
    }
  });
}

/**
 * Hiển thị thông báo nổi nhẹ nhàng (Toast) cho các phản hồi giao diện toàn cục
 * @param {string} message
 */
let globalToastTimer = null;
function showGlobalToast(message) {
  let toast = document.getElementById('medfa-global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'medfa-global-toast';
    toast.className = 'medfa-global-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(globalToastTimer);
  globalToastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 3500);
}

/**
 * Gắn toàn bộ sự kiện tương tác cho Header, Footer & AI Chatbot sau khi inject DOM
 */
function bindHeaderFooterEvents() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    const root = document.documentElement;
    const syncThemeToggle = () => {
      themeToggleBtn.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
    };

    syncThemeToggle();
    themeToggleBtn.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      root.style.colorScheme = nextTheme;
      syncThemeToggle();

      try {
        window.localStorage.setItem('medfa.theme', nextTheme);
      } catch (error) {
        console.warn('[MedFA] Không thể lưu giao diện đã chọn:', error);
      }
    });

    window.addEventListener('storage', (event) => {
      if (event.key !== 'medfa.theme' || !['light', 'dark'].includes(event.newValue)) return;
      root.dataset.theme = event.newValue;
      root.style.colorScheme = event.newValue;
      syncThemeToggle();
    });
  }

  // 1. Điều khiển Mobile Navigation Drawer
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    const closeMobileMenu = () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      mobileBtn.setAttribute('aria-expanded', 'false');
    };

    mobileBtn.addEventListener('click', () => {
      const isClosed = mobileMenu.classList.contains('hidden');
      if (isClosed) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        mobileBtn.setAttribute('aria-expanded', 'true');
      } else {
        closeMobileMenu();
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
        mobileBtn.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (getComputedStyle(mobileBtn).display === 'none') closeMobileMenu();
    });
  }

  // 2. Dropdown Luyện tập (Kéo dài thời gian chờ hover 450ms & hỗ trợ click/keyboard để kịp chọn 3 mục nhỏ)
  const practiceContainer = document.getElementById('practice-dropdown-container');
  const practiceBtn = document.getElementById('practice-dropdown-btn');
  const practiceMenu = document.getElementById('practice-dropdown-menu');

  if (practiceContainer && practiceBtn) {
    let hoverTimer = null;

    const openPractice = () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
      practiceContainer.classList.add('is-hovered');
      practiceBtn.setAttribute('aria-expanded', 'true');
    };

    const closePracticeWithDelay = (delay = 450) => {
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        practiceContainer.classList.remove('is-hovered', 'is-open');
        practiceBtn.setAttribute('aria-expanded', 'false');
        hoverTimer = null;
      }, delay);
    };

    // Khi di chuột vào container hoặc menu: Mở ngay và hủy bộ đếm đóng
    practiceContainer.addEventListener('mouseenter', openPractice);
    if (practiceMenu) practiceMenu.addEventListener('mouseenter', openPractice);

    // Khi di chuột ra ngoài: Giữ menu mở thêm 450ms để người dùng kịp lia chuột chọn 3 mục
    practiceContainer.addEventListener('mouseleave', () => closePracticeWithDelay(450));
    if (practiceMenu) practiceMenu.addEventListener('mouseleave', () => closePracticeWithDelay(450));

    // Hỗ trợ click toggle cho màn hình cảm ứng hoặc phím
    practiceBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = practiceContainer.classList.contains('is-open') || practiceContainer.classList.contains('is-hovered');
      if (isOpen) {
        practiceContainer.classList.remove('is-hovered', 'is-open');
        practiceBtn.setAttribute('aria-expanded', 'false');
      } else {
        openPractice();
        practiceContainer.classList.add('is-open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!practiceContainer.contains(e.target)) {
        practiceContainer.classList.remove('is-hovered', 'is-open');
        practiceBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        practiceContainer.classList.remove('is-hovered', 'is-open');
        practiceBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Language Switcher Dropdown (VN / ENG / JP)
  const langBtn = document.getElementById('language-switcher-btn');
  const langMenu = document.getElementById('language-dropdown-menu');
  if (langBtn && langMenu) {
    const closeLangMenu = () => {
      langMenu.classList.add('hidden');
      langBtn.setAttribute('aria-expanded', 'false');
    };

    langBtn.addEventListener('click', () => {
      const willOpen = langMenu.classList.contains('hidden');
      langMenu.classList.toggle('hidden');
      langBtn.setAttribute('aria-expanded', String(willOpen));
    });

    langMenu.querySelectorAll('button[data-language]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = btn.getAttribute('data-language') || 'vi';
        closeLangMenu();
        if (window.I18n && typeof window.I18n.setLanguage === 'function') {
          window.I18n.setLanguage(lang);
        }
        langBtn.focus();
      });
    });

    document.addEventListener('click', (e) => {
      if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        closeLangMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !langMenu.classList.contains('hidden')) {
        closeLangMenu();
        langBtn.focus();
      }
    });
  }

  // 4. Mở / Thu gọn cửa sổ Chatbot AI nổi
  const chatToggleBtn = document.getElementById('medfa-chat-toggle-btn');
  const chatWindow = document.getElementById('medfa-chat-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');

  if (chatToggleBtn && chatWindow) {
    chatToggleBtn.addEventListener('click', () => {
      const willOpen = chatWindow.classList.contains('hidden');
      chatWindow.classList.toggle('hidden');
      if (willOpen && window.ChatbotGemini && typeof window.ChatbotGemini.warmup === 'function') {
        window.ChatbotGemini.warmup();
      }
    });
  }

  if (chatCloseBtn && chatWindow) {
    chatCloseBtn.addEventListener('click', () => {
      chatWindow.classList.add('hidden');
    });
  }

  // 5. Kích hoạt module ChatbotGemini (Google Gemini API + 7 quy tắc phản xạ AHA/ERC ngoại tuyến + Modal Cài đặt API Key)
  // Sửa lỗi trước đây js/main.js tự bắt submit với hàm cũ nên ChatbotGemini bị vô hiệu hóa ngầm.
  if (window.ChatbotGemini && typeof window.ChatbotGemini.initChatbot === 'function') {
    window.ChatbotGemini.initChatbot();
  }
}

/**
 * Xử lý sự kiện cuộn trang (window.scroll) bằng Vanilla JS thuần:
 * - Tăng độ nổi (shadow/border) cho Header cố định khi cuộn xuống.
 * - Cập nhật thanh tiến độ đọc bài (Reading Progress Bar) bằng scaleX tối ưu GPU.
 * - Hiển thị nút "Lên đầu trang" (Back to Top) khi cuộn qua 360px.
 */
function initScrollFeatures() {
  const headerEl = document.querySelector('#header-placeholder > header');

  let progressBar = document.getElementById('medfa-reading-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'medfa-reading-progress';
    progressBar.className = 'medfa-reading-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progressBar);
  }

  let backTopBtn = document.getElementById('medfa-back-top');
  if (!backTopBtn) {
    backTopBtn = document.createElement('button');
    backTopBtn.id = 'medfa-back-top';
    backTopBtn.type = 'button';
    backTopBtn.className = 'medfa-back-top';
    backTopBtn.setAttribute('data-i18n-aria-label', 'common.backToTop');
    backTopBtn.setAttribute('data-i18n-title', 'common.backToTop');
    backTopBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">arrow_upward</span>';
    backTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(backTopBtn);
  }

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;

    progressBar.style.transform = `scaleX(${ratio.toFixed(4)})`;

    if (headerEl) {
      headerEl.classList.toggle('site-header--scrolled', y > 20);
    }
    backTopBtn.classList.toggle('is-visible', y > 360);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * Hiệu ứng Scroll-Reveal bằng IntersectionObserver thuần:
 * Chỉ áp dụng cho các section/card tĩnh bên dưới màn hình đầu tiên để không trì hoãn LCP
 * và không làm gián đoạn kết quả lọc động trong #topics-container.
 */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const candidates = document.querySelectorAll(
    'main section:not(#topics-container section), main article:not(#topics-container article), .cq-card'
  );
  const viewH = window.innerHeight || document.documentElement.clientHeight;
  const targets = [];

  candidates.forEach(el => {
    if (el.closest('#topics-container')) return;
    const rect = el.getBoundingClientRect();
    // Giữ nguyên hiển thị tức thì cho phần tử đã nằm trong khung nhìn ban đầu
    if (rect.top > viewH * 0.92) {
      el.classList.add('medfa-reveal');
      targets.push(el);
    }
  });

  if (targets.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  targets.forEach(el => observer.observe(el));
}

/**
 * Chèn tức thì các component dùng chung vào các thẻ placeholder trên mỗi trang HTML:
 *  - #header-placeholder -> lấy HEADER_HTML từ js/components/layout.js
 *  - #footer-placeholder -> lấy FOOTER_HTML từ js/components/layout.js
 *  - #emergency-banner-placeholder -> lấy EMERGENCY_BANNER_HTML từ js/components/cards.js
 *  - script[type="application/json"][data-component][data-target] -> gọi MedFAComponents.renderComponentList()
 *  - [data-component="heartbeat-bg"] -> lấy HEARTBEAT_BG_SVG từ js/components/cards.js
 */
function injectSharedComponents() {
  const components = window.MedFAComponents;
  if (!components) {
    console.error('[MedFA] Chưa nạp được MedFAComponents (js/components/layout.js).');
    return;
  }

  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  const emergencyBannerPlaceholder = document.getElementById('emergency-banner-placeholder');

  if (headerPlaceholder && headerPlaceholder.children.length === 0) {
    headerPlaceholder.innerHTML = components.HEADER_HTML;
  }

  if (footerPlaceholder && footerPlaceholder.children.length === 0) {
    footerPlaceholder.innerHTML = components.FOOTER_HTML;
  }

  if (emergencyBannerPlaceholder && emergencyBannerPlaceholder.children.length === 0) {
    emergencyBannerPlaceholder.innerHTML = components.EMERGENCY_BANNER_HTML;
  }

  // Hydrate tự động toàn bộ khối dữ liệu do từng trang HTML khai báo qua <script type="application/json" data-component="..." data-target="...">
  document.querySelectorAll('script[type="application/json"][data-component][data-target]').forEach(scriptEl => {
    const componentName = scriptEl.getAttribute('data-component');
    const targetId = scriptEl.getAttribute('data-target');
    const targetEl = targetId ? document.getElementById(targetId) : null;
    if (!targetEl || targetEl.children.length > 0) return;

    try {
      const items = JSON.parse(scriptEl.textContent || '[]');
      components.renderComponentList(componentName, targetEl, items);
    } catch (err) {
      console.error(`[MedFA] Lỗi parse JSON cho component "${componentName}" (#${targetId}):`, err);
    }
  });

  // Bơm SVG nền nhịp tim ECG dùng chung
  document.querySelectorAll('[data-component="heartbeat-bg"]').forEach(el => {
    if (el.children.length === 0) {
      el.innerHTML = components.HEARTBEAT_BG_SVG;
    }
  });

  highlightActiveNav();
  bindHeaderFooterEvents();
  initScrollFeatures();
  initScrollReveal();

  if (window.I18n && typeof window.I18n.applyTranslations === 'function') {
    window.I18n.applyTranslations(document);
  }
  updateLanguageSwitcherUI();

  if (window.MedFASeoHelper) {
    window.MedFASeoHelper.renderSatelliteNetworkBlock(document.getElementById('satellite-authority-links'));
  }
}

// Khởi chạy toàn cục khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  injectSharedComponents();
});

// Lắng nghe sự kiện đổi ngôn ngữ toàn cục
if (typeof window !== 'undefined') {
  window.addEventListener('medfa:languageChanged', (e) => {
    updateLanguageSwitcherUI(e.detail && e.detail.language);
    highlightActiveNav();
  });
}