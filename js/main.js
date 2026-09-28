/**
 * MedFA Main Entry Point
 * Handles Header & Footer injection, Active Nav highlighting,
 * Mobile navigation, Language switcher, and AI Chat Assistant.
 */

// Fallback Header HTML template (4 core navigation tabs, no quiz)
const FALLBACK_HEADER_HTML = `
<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
  <div class="h-20 max-w-7xl mx-auto px-margin-sm lg:px-margin flex items-center justify-between gap-space-md">
    <div class="flex items-center gap-space-md">
      <a aria-label="Trang chủ MedFA" class="flex items-center gap-space-sm focus:outline-none" data-path="home" href="index.html">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" class="h-10 w-auto" fill="none">
          <rect width="64" height="64" x="8" y="8" rx="16" fill="#1E40AF"/>
          <path d="M40 24v32M24 40h32" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
          <path d="M26 40c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#0D9488" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 4"/>
          <circle cx="56" cy="24" r="4" fill="#E63946"/>
          <text x="86" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="800" fill="#1E40AF" letter-spacing="-0.5">Med<tspan fill="#0D9488">FA</tspan></text>
          <text x="88" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#64748B" letter-spacing="1.5">MEDICAL FIRST AID</text>
        </svg>
      </a>
    </div>
    <nav aria-label="Menu điều hướng chính" class="hidden items-center gap-space-md 2xl:gap-space-lg lg:flex justify-end flex-1" id="main-nav">
      <a class="nav-link font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-3.5 rounded-full" data-page="home" href="index.html">Trang chủ</a>
      <a class="nav-link font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-3.5 rounded-full" data-page="social-impact" href="social-impact.html">Tác động xã hội</a>
      <a class="nav-link font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-3.5 rounded-full" data-page="topics" href="topics.html">Thư viện sơ cấp cứu</a>
      <a class="nav-link font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-3.5 rounded-full" data-page="about" href="about.html">Về MedFA</a>
    </nav>
    <div class="flex items-center gap-2 sm:gap-space-sm md:gap-space-md">
      <a href="topics.html" aria-label="Tìm kiếm tình huống sơ cứu" class="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
        <span class="material-symbols-outlined">search</span>
      </a>
      <div class="relative inline-block text-left" id="language-dropdown-container">
        <button id="language-switcher-btn" aria-label="Chuyển đổi ngôn ngữ: Tiếng Việt" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors text-on-surface focus:outline-none" type="button">
          <span class="flag-container shrink-0 inline-flex items-center">
            <svg class="w-5 h-3.5 rounded-sm shadow-sm shrink-0 inline-block" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
              <rect fill="#DA251D" height="20" width="30"></rect>
              <polygon fill="#FFFF00" points="15,4 16.545,8.755 21.55,8.755 17.502,11.695 19.048,16.45 15,13.51 10.952,16.45 12.498,11.695 8.45,8.755 13.455,8.755"></polygon>
            </svg>
          </span>
          <span class="font-label-md text-label-md font-bold text-primary">VN</span>
          <span class="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200">expand_more</span>
        </button>
        <div id="language-dropdown-menu" class="hidden absolute right-0 top-full mt-2 w-48 rounded-xl bg-surface-container-lowest shadow-xl border border-outline-variant/30 py-1.5 z-50 flex flex-col overflow-hidden">
          <button type="button" data-lang-select="vi" class="w-full flex items-center justify-between px-3.5 py-2.5 text-left hover:bg-surface-container transition-colors bg-surface-container/50">
            <div class="flex items-center gap-2.5">
              <svg class="w-5 h-3.5 rounded-sm shadow-xs shrink-0" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                <rect fill="#DA251D" height="20" width="30"></rect>
                <polygon fill="#FFFF00" points="15,4 16.545,8.755 21.55,8.755 17.502,11.695 19.048,16.45 15,13.51 10.952,16.45 12.498,11.695 8.45,8.755 13.455,8.755"></polygon>
              </svg>
              <span class="font-label-md text-label-md font-bold text-primary">Tiếng Việt</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-bold text-on-surface-variant/70 bg-surface-container-high px-1.5 py-0.5 rounded">VN</span>
              <span class="material-symbols-outlined text-primary text-[18px] lang-check-icon">check</span>
            </div>
          </button>
          <button type="button" data-lang-select="en" class="w-full flex items-center justify-between px-3.5 py-2.5 text-left hover:bg-surface-container transition-colors">
            <div class="flex items-center gap-2.5">
              <svg class="w-5 h-3.5 rounded-sm shadow-xs shrink-0" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="uk-flag-clip"><rect width="60" height="30"></rect></clipPath>
                <g clip-path="url(#uk-flag-clip)"><rect width="60" height="30" fill="#012169"></rect><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"></path><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="2"></path><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"></path><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"></path></g>
              </svg>
              <span class="font-label-md text-label-md font-medium text-on-surface">English</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-bold text-on-surface-variant/70 bg-surface-container-high px-1.5 py-0.5 rounded">ENG</span>
              <span class="material-symbols-outlined text-primary text-[18px] lang-check-icon hidden">check</span>
            </div>
          </button>
        </div>
      </div>
      <button id="mobile-menu-btn" aria-label="Mở menu di động" class="w-10 h-10 flex lg:hidden items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors" type="button">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden lg:hidden bg-surface-container-lowest border-t border-outline-variant/30 px-4 py-3 flex-col gap-2 shadow-lg">
    <a class="nav-link-mobile px-4 py-2 rounded-lg font-medium text-on-surface hover:bg-surface-container transition-colors" data-page="home" href="index.html">Trang chủ</a>
    <a class="nav-link-mobile px-4 py-2 rounded-lg font-medium text-on-surface hover:bg-surface-container transition-colors" data-page="social-impact" href="social-impact.html">Tác động xã hội</a>
    <a class="nav-link-mobile px-4 py-2 rounded-lg font-medium text-on-surface hover:bg-surface-container transition-colors" data-page="topics" href="topics.html">Thư viện sơ cấp cứu</a>
    <a class="nav-link-mobile px-4 py-2 rounded-lg font-medium text-on-surface hover:bg-surface-container transition-colors" data-page="about" href="about.html">Về MedFA</a>
  </div>
</header>
`;

// Fallback Footer HTML template
const FALLBACK_FOOTER_HTML = `
<footer class="w-full bg-surface-container-low text-on-surface mt-auto border-t border-outline-variant/30">
  <div class="max-w-7xl mx-auto px-margin-sm lg:px-margin pt-space-xl pb-space-lg">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter-lg pb-space-xl">
      <div class="lg:col-span-2 flex flex-col gap-space-md">
        <div class="flex items-center gap-space-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" class="h-9 w-auto" fill="none">
            <rect width="64" height="64" x="8" y="8" rx="16" fill="#1E40AF"/>
            <path d="M40 24v32M24 40h32" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
            <path d="M26 40c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#0D9488" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 4"/>
            <circle cx="56" cy="24" r="4" fill="#E63946"/>
            <text x="86" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="800" fill="#1E40AF" letter-spacing="-0.5">Med<tspan fill="#0D9488">FA</tspan></text>
            <text x="88" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#64748B" letter-spacing="1.5">MEDICAL FIRST AID</text>
          </svg>
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-sm">
          MedFA (Medical First Aid) là nền tảng trực tuyến phi lợi nhuận chuyên tổng hợp và cung cấp kiến thức sơ cấp cứu cơ bản. Đây là sản phẩm được phát triển dưới dạng đồ án môn học IE104 (Trường Đại học Công nghệ Thông tin - UIT), hướng tới mục tiêu nâng cao nhận thức cộng đồng và trang bị kỹ năng phản ứng khẩn cấp thiết yếu.
        </p>
        <div class="rounded-xl bg-error-container/20 border border-error/20 p-3 self-start shadow-sm transition-all duration-200 w-full max-w-md">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-7 h-7 rounded-full bg-error-container flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-error text-[18px]" style="font-variation-settings: 'FILL' 1;">emergency</span>
            </div>
            <span class="font-label-md text-label-md uppercase font-bold text-error tracking-wider">Tổng đài Khẩn cấp Quốc Gia</span>
          </div>
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center gap-2 text-on-surface">
              <span class="font-label-sm text-label-sm font-bold text-error bg-surface-container-lowest border border-error/30 px-2 py-0.5 rounded shadow-sm shrink-0 min-w-[42px] text-center">111</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant font-medium">Tổng đài Quốc gia Bảo vệ Trẻ em</span>
            </div>
            <div class="flex items-center gap-2 text-on-surface">
              <span class="font-label-sm text-label-sm font-bold text-error bg-surface-container-lowest border border-error/30 px-2 py-0.5 rounded shadow-sm shrink-0 min-w-[42px] text-center">112</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant font-medium">Yêu cầu Tìm kiếm Cứu nạn khẩn cấp</span>
            </div>
            <div class="flex items-center gap-2 text-on-surface">
              <span class="font-label-sm text-label-sm font-bold text-error bg-surface-container-lowest border border-error/30 px-2 py-0.5 rounded shadow-sm shrink-0 min-w-[42px] text-center">113</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant font-medium">Lực lượng Cảnh sát & An ninh trật tự</span>
            </div>
            <div class="flex items-center gap-2 text-on-surface">
              <span class="font-label-sm text-label-sm font-bold text-error bg-surface-container-lowest border border-error/30 px-2 py-0.5 rounded shadow-sm shrink-0 min-w-[42px] text-center">114</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant font-medium">Cứu hỏa & Cứu nạn cứu hộ</span>
            </div>
            <div class="flex items-center gap-2 text-on-surface">
              <span class="font-label-sm text-label-sm font-bold text-error bg-surface-container-lowest border border-error/30 px-2 py-0.5 rounded shadow-sm shrink-0 min-w-[42px] text-center">115</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant font-medium font-bold text-primary">Cấp cứu Y tế</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-space-sm">
        <span class="font-title-md text-title-md text-on-surface font-bold">Khám phá</span>
        <nav aria-label="Liên kết nhanh" class="flex flex-col gap-space-xs">
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="topics.html">Thư viện tình huống sơ cứu</a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="social-impact.html">Tác động xã hội & Giá trị</a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="topic-detail.html?id=ngung-tuan-hoan-cpr">Hồi sinh tim phổi (CPR & AED)</a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="topic-detail.html?id=hoc-di-vat">Sơ cứu hóc dị vật Heimlich</a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="topic-detail.html?id=bong-cap-do-1-2">Sơ cứu vết bỏng nhiệt & lửa</a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="topic-detail.html?id=chay-mau-nghiem-trong">Kỹ thuật băng ép & Ga-rô</a>
        </nav>
      </div>
      <div class="flex flex-col gap-space-sm">
        <span class="font-title-md text-title-md text-on-surface font-bold">Về dự án</span>
        <nav aria-label="Về MedFA" class="flex flex-col gap-space-xs">
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="about.html">Giới thiệu MedFA</a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="about.html#team">Đội ngũ phát triển IE104</a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="about.html#mission">Mục tiêu & Sứ mệnh</a>
          <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="about.html#standards">Nguồn chuẩn Y khoa tham khảo</a>
        </nav>
      </div>
      <div class="flex flex-col gap-space-sm">
        <span class="font-title-md text-title-md text-on-surface font-bold">Thông tin liên hệ</span>
        <p class="font-body-sm text-body-sm text-on-surface-variant">Website phát triển phi lợi nhuận cho đồ án môn học IE104 - Trường Đại học Công nghệ Thông tin (UIT - ĐHQG-HCM).</p>
        <div class="flex flex-col gap-space-xs mt-space-xs">
          <span class="font-label-md text-label-md text-on-surface-variant">Số điện thoại:</span>
          <a class="font-title-md text-title-md text-primary font-bold hover:underline" href="tel:+84919985358">(+84) 919 985 358</a>
        </div>
        <div class="flex flex-col gap-space-xs">
          <span class="font-label-md text-label-md text-on-surface-variant">Email:</span>
          <a class="font-body-sm text-body-sm text-on-surface hover:text-primary" href="mailto:24520888@gm.uit.edu.vn">24520888@gm.uit.edu.vn</a>
        </div>
      </div>
    </div>
    <div class="pt-space-lg border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant">
      <span class="font-body-sm text-body-sm">© 2026 MedFA - Medical First Aid. Đồ án môn học IE104 - UIT.</span>
      <div class="flex items-center gap-space-md text-body-sm">
        <a class="hover:text-primary transition-colors" href="about.html#standards">Nguồn tài liệu tham khảo</a>
        <span>•</span>
        <a class="hover:text-primary transition-colors" href="about.html#team">Danh sách thành viên</a>
        <span>•</span>
        <a class="text-tertiary font-medium hover:underline" href="about.html#standards">Miễn trừ trách nhiệm y khoa</a>
      </div>
    </div>
  </div>
</footer>
<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
  <div id="medfa-chat-window" class="pointer-events-auto w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 flex flex-col overflow-hidden mb-3 transition-all duration-300 origin-bottom-right hidden">
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
            <span class="font-title-md text-title-md font-bold tracking-tight leading-tight text-white">MedFA Trợ lý AI</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white leading-none">Y KHOA</span>
          </div>
          <span class="text-[12px] text-white/80 font-medium flex items-center gap-1 mt-0.5">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>Trực tuyến 24/7 • Phản xạ cấp cứu
          </span>
        </div>
      </div>
      <div class="flex items-center gap-1 text-white/90">
        <button id="chat-close-btn" type="button" title="Thu nhỏ" class="p-1.5 hover:bg-white/10 rounded-lg transition-colors focus:outline-none">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
    </div>
    <div id="chat-messages-container" class="flex-1 p-4 overflow-y-auto bg-surface-container-low flex flex-col gap-3">
      <div class="flex justify-center my-1">
        <span class="text-[11px] font-medium text-on-surface-variant/70 bg-surface-container-high px-2.5 py-0.5 rounded-full">Trợ lý y tế phản hồi tức thì</span>
      </div>
      <div class="flex items-start gap-2.5 max-w-[90%]">
        <div class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
          <span class="material-symbols-outlined text-[16px]">smart_toy</span>
        </div>
        <div class="flex flex-col items-start gap-1">
          <div class="bg-surface-container-lowest text-on-surface p-3.5 rounded-2xl rounded-tl-sm border border-outline-variant/30 shadow-sm text-body-sm leading-relaxed">
            <p class="font-semibold text-primary mb-1">Xin chào bạn! Mình là Trợ lý AI MedFA 🩺</p>
            <p class="text-on-surface-variant">Bạn hoặc người thân đang gặp tình huống sơ cấp cứu nào cần hướng dẫn xử trí khẩn cấp không?</p>
          </div>
          <span class="text-[10px] text-on-surface-variant/60 font-medium ml-1">Vừa xong</span>
        </div>
      </div>
      <div class="flex flex-col gap-1.5 pl-9 mt-1">
        <span class="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Gợi ý tình huống nhanh:</span>
        <div class="flex flex-wrap gap-1.5">
          <a href="topic-detail.html?id=ngung-tuan-hoan-cpr" class="px-3 py-1.5 text-body-sm font-semibold rounded-full bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant/40 shadow-xs transition-colors flex items-center gap-1">
            <span>🚨</span> Ép tim CPR & AED
          </a>
          <a href="topic-detail.html?id=hoc-di-vat" class="px-3 py-1.5 text-body-sm font-semibold rounded-full bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant/40 shadow-xs transition-colors flex items-center gap-1">
            <span>👶</span> Hóc dị vật đường thở
          </a>
          <a href="topic-detail.html?id=bong-cap-do-1-2" class="px-3 py-1.5 text-body-sm font-semibold rounded-full bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant/40 shadow-xs transition-colors flex items-center gap-1">
            <span>🔥</span> Sơ cứu vết bỏng
          </a>
          <a href="topic-detail.html?id=chay-mau-nghiem-trong" class="px-3 py-1.5 text-body-sm font-semibold rounded-full bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant/40 shadow-xs transition-colors flex items-center gap-1">
            <span>🩸</span> Băng ép cầm máu
          </a>
        </div>
      </div>
    </div>
    <div class="p-3 bg-surface-container-lowest border-t border-outline-variant/30">
      <form id="chat-input-form" class="flex items-center gap-2 bg-surface-container-low rounded-xl px-3 py-2 border border-outline-variant/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <input id="chat-user-input" type="text" placeholder="Nhập tình huống sơ cứu..." class="flex-1 bg-transparent border-none text-body-sm text-on-surface focus:outline-none placeholder:text-on-surface-variant/50 p-0" />
        <button type="submit" class="w-8 h-8 rounded-lg bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center transition-colors shadow-xs shrink-0">
          <span class="material-symbols-outlined text-[18px]">send</span>
        </button>
      </form>
      <div class="flex items-center justify-between mt-2 px-1">
        <span class="text-[11px] text-on-surface-variant/70">Dữ liệu tham khảo y khoa</span>
        <a href="tel:115" class="text-[11px] font-bold text-error hover:underline flex items-center gap-0.5">
          <span class="material-symbols-outlined text-[13px]">call</span>Cấp cứu 115
        </a>
      </div>
    </div>
  </div>
  <button id="medfa-chat-toggle-btn" type="button" aria-label="Mở trợ lý sơ cứu AI" class="pointer-events-auto relative w-14 h-14 rounded-full bg-primary-container hover:bg-primary text-on-primary shadow-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/40 group">
    <span class="absolute inline-flex h-full w-full rounded-full bg-primary opacity-30 animate-ping -z-10"></span>
    <span class="material-symbols-outlined text-[26px]">smart_toy</span>
    <span class="absolute -top-1 -right-1 w-4 h-4 bg-error text-white font-bold text-[9px] rounded-full flex items-center justify-center border-2 border-surface-container-lowest shadow-xs">1</span>
  </button>
</div>
`;

/**
 * Determine the current page key
 */
function getCurrentPageKey() {
  const bodyPage = document.body.getAttribute('data-page');
  if (bodyPage) return bodyPage;

  const path = window.location.pathname.toLowerCase();
  if (path.endsWith('index.html') || path.endsWith('/') || path === '') return 'home';
  if (path.includes('social-impact')) return 'social-impact';
  if (path.includes('topic-detail')) return 'topics';
  if (path.includes('topics')) return 'topics';
  if (path.includes('about')) return 'about';
  return 'home';
}

/**
 * Update active state on navigation elements
 */
function highlightActiveNav() {
  const currentKey = getCurrentPageKey();

  // Desktop links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const page = link.getAttribute('data-page');
    if (page === currentKey) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  // Mobile links
  const mobileLinks = document.querySelectorAll('.nav-link-mobile');
  mobileLinks.forEach(link => {
    const page = link.getAttribute('data-page');
    if (page === currentKey) {
      link.classList.add('bg-primary/10', 'text-primary', 'font-bold');
    } else {
      link.classList.remove('bg-primary/10', 'text-primary', 'font-bold');
    }
  });
}

/**
 * Bind interactive events for Header & Footer
 */
function bindHeaderFooterEvents() {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });
  }

  // 2. Language Dropdown Toggle
  const langBtn = document.getElementById('language-switcher-btn');
  const langMenu = document.getElementById('language-dropdown-menu');
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      if (!langMenu.classList.contains('hidden')) {
        langMenu.classList.add('hidden');
      }
    });
  }

  // 3. AI Chat Floating Assistant Toggle
  const chatToggleBtn = document.getElementById('medfa-chat-toggle-btn');
  const chatWindow = document.getElementById('medfa-chat-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');

  if (chatToggleBtn && chatWindow) {
    chatToggleBtn.addEventListener('click', () => {
      chatWindow.classList.toggle('hidden');
    });
  }

  if (chatCloseBtn && chatWindow) {
    chatCloseBtn.addEventListener('click', () => {
      chatWindow.classList.add('hidden');
    });
  }

  // 4. AI Chat Assistant Messaging
  const chatForm = document.getElementById('chat-input-form');
  const chatInput = document.getElementById('chat-user-input');
  const messagesContainer = document.getElementById('chat-messages-container');

  if (chatForm && chatInput && messagesContainer) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      // Append User message
      const userBubble = document.createElement('div');
      userBubble.className = 'flex items-start justify-end gap-2 max-w-[90%] self-end';
      userBubble.innerHTML = `
        <div class="bg-primary text-on-primary p-3 rounded-2xl rounded-tr-sm text-body-sm shadow-sm">
          <p>${escapeHTML(text)}</p>
        </div>
      `;
      messagesContainer.appendChild(userBubble);
      chatInput.value = '';
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Simulated AI Response
      setTimeout(() => {
        const responseText = generateBotReply(text);
        const botBubble = document.createElement('div');
        botBubble.className = 'flex items-start gap-2.5 max-w-[90%]';
        botBubble.innerHTML = `
          <div class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <span class="material-symbols-outlined text-[16px]">smart_toy</span>
          </div>
          <div class="flex flex-col items-start gap-1">
            <div class="bg-surface-container-lowest text-on-surface p-3.5 rounded-2xl rounded-tl-sm border border-outline-variant/30 shadow-sm text-body-sm leading-relaxed">
              ${responseText}
            </div>
            <span class="text-[10px] text-on-surface-variant/60 font-medium ml-1">Vừa xong</span>
          </div>
        `;
        messagesContainer.appendChild(botBubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 600);
    });
  }

  // Refresh Lucide icons if available
  if (typeof window !== 'undefined' && window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Simple bot reply generator for first aid emergency triage
 */
function generateBotReply(query) {
  const q = query.toLowerCase();
  const isEn = window.MedFAi18n && window.MedFAi18n.getLanguage() === 'en';

  if (q.includes('cpr') || q.includes('ngừng tim') || q.includes('ép tim') || q.includes('cardiac') || q.includes('compress')) {
    return isEn ? window.MedFAi18n.t('chat.cpr_reply') : `<p class="font-semibold text-error mb-1">🚨 Ép tim CPR khẩn cấp:</p>
            <p>1. Gọi 115 ngay!</p>
            <p>2. Đặt gót bàn tay giữa ngực, ép sâu 5-6cm với tốc độ 100-120 lần/phút.</p>
            <a href="topic-detail.html?id=ngung-tuan-hoan-cpr" class="text-primary font-bold underline mt-1.5 inline-block">Xem chi tiết bài CPR & AED →</a>`;
  }
  if (q.includes('hóc') || q.includes('nghẹn') || q.includes('heimlich') || q.includes('chok')) {
    return isEn ? window.MedFAi18n.t('chat.choking_reply') : `<p class="font-semibold text-primary mb-1">👶 Hóc dị vật đường thở:</p>
            <p>Thực hiện ngay 5 vỗ lưng dứt khoát kết hợp 5 lần ép bụng Heimlich.</p>
            <a href="topic-detail.html?id=hoc-di-vat" class="text-primary font-bold underline mt-1.5 inline-block">Xem quy trình Heimlich chi tiết →</a>`;
  }
  if (q.includes('bỏng') || q.includes('cháy') || q.includes('burn')) {
    return isEn ? window.MedFAi18n.t('chat.burn_reply') : `<p class="font-semibold text-primary mb-1">🔥 Sơ cứu bỏng:</p>
            <p>Xả nước mát sạch (15-25°C) liên tục trong 15-20 phút. KHÔNG bôi kem đánh răng hay chườm đá lạnh.</p>
            <a href="topic-detail.html?id=bong-cap-do-1-2" class="text-primary font-bold underline mt-1.5 inline-block">Xem hướng dẫn xử trí bỏng →</a>`;
  }
  if (q.includes('chảy máu') || q.includes('máu') || q.includes('vết thương') || q.includes('bleed') || q.includes('wound')) {
    return isEn ? window.MedFAi18n.t('chat.bleed_reply') : `<p class="font-semibold text-primary mb-1">🩸 Cầm máu:</p>
            <p>Dùng gạc sạch đè chặt trực tiếp lên miệng vết thương trong 5-10 phút. Nâng cao chi bị thương.</p>
            <a href="topic-detail.html?id=chay-mau-nghiem-trong" class="text-primary font-bold underline mt-1.5 inline-block">Xem kỹ thuật băng ép và ga-rô →</a>`;
  }
  return isEn ? window.MedFAi18n.t('chat.default_reply') : `<p>MedFA đã ghi nhận câu hỏi của bạn: <em>"${escapeHTML(query)}"</em>.</p>
          <p class="mt-1">Bạn có thể tra cứu toàn bộ tình huống chuẩn Y khoa trong <a href="topics.html" class="text-primary font-bold underline">Thư viện sơ cấp cứu</a> hoặc gọi ngay <strong class="text-error">115</strong> nếu đang trong tình trạng khẩn cấp!</p>`;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/**
 * Fetch and inject Header & Footer components into HTML placeholders
 */
async function injectHeaderAndFooter() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  // Inject Header
  if (headerPlaceholder) {
    try {
      const res = await fetch('header.html');
      if (res.ok) {
        headerPlaceholder.innerHTML = await res.text();
      } else {
        const resComp = await fetch('components/header.html');
        if (resComp.ok) {
          headerPlaceholder.innerHTML = await resComp.text();
        } else {
          headerPlaceholder.innerHTML = FALLBACK_HEADER_HTML;
        }
      }
    } catch (err) {
      headerPlaceholder.innerHTML = FALLBACK_HEADER_HTML;
    }
  }

  // Inject Footer (only if empty)
  if (footerPlaceholder && footerPlaceholder.children.length === 0) {
    try {
      const res = await fetch('footer.html');
      if (res.ok) {
        footerPlaceholder.innerHTML = await res.text();
      } else {
        const resComp = await fetch('components/footer.html');
        if (resComp.ok) {
          footerPlaceholder.innerHTML = await resComp.text();
        } else {
          footerPlaceholder.innerHTML = FALLBACK_FOOTER_HTML;
        }
      }
    } catch (err) {
      footerPlaceholder.innerHTML = FALLBACK_FOOTER_HTML;
    }
  }

  // Once injected, bind events, highlight active nav, and apply i18n
  highlightActiveNav();
  bindHeaderFooterEvents();
  if (window.MedFAi18n) {
    window.MedFAi18n.applyCurrentLanguage();
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  injectHeaderAndFooter();
});
