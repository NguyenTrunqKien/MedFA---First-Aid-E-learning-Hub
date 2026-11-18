/**
 * ==========================================================================
 * MedFA - Cấu hình SEO Tập Trung & Mạng lưới Web Vệ Tinh (Satellite Config)
 * ==========================================================================
 * Hướng dẫn cho Developer:
 * - Chỉ cần chỉnh sửa file này khi muốn đổi Domain triển khai, ảnh chia sẻ MXH,
 *   hoặc cấu hình liên kết trỏ về "Website chính" (Main Site / Money Site).
 * - Các trang HTML và module JS (topic-detail.js, main.js) sẽ tự động đồng bộ
 *   Canonical, Open Graph, Breadcrumb Schema và khối liên kết chính thống.
 */
(function (global) {
  'use strict';

  const SEO_CONFIG = {
    // 1. Domain triển khai chính thức (không có dấu / ở cuối)
    siteUrl: 'https://nguyentrunqkien.github.io/MedFA---First-Aid-E-learning-Hub',
    siteName: 'MedFA - Sơ cấp cứu Y tế Cộng đồng',
    locale: 'vi_VN',
    defaultOgImage: 'https://nguyentrunqkien.github.io/MedFA---First-Aid-E-learning-Hub/images/hero-cpr.webp',
    logoUrl: 'https://nguyentrunqkien.github.io/MedFA---First-Aid-E-learning-Hub/assets/icons/logo.svg',

    // 2. Cấu hình "Website chính" (Main Site) khi vận hành theo mô hình Web Vệ Tinh
    // Đổi `enabled: true` và cập nhật `url`, `name`, `ctaText` để bật CTA trỏ về trang đích chính.
    mainWebsite: {
      enabled: false,
      name: 'Cổng Thông Tin Sức Khỏe Chính',
      url: 'https://moh.gov.vn',
      ctaText: 'Xem thêm tại Website chính',
      description: 'Kết nối trực tiếp tới hệ thống đặt lịch khám, tư vấn bác sĩ và trang chủ dự án.'
    },

    // 3. Danh sách Tổ chức & Nguồn Y khoa Chính thống (E-E-A-T Authority Outbound Links)
    // Tổng hợp từ tài liệu tham chiếu AHA/ERC và dữ liệu đối chiếu nhóm IE104 UIT
    officialAuthorities: [
      {
        shortName: 'AHA',
        titleKey: 'footer.authorityAha',
        name: 'Hiệp hội Tim mạch Hoa Kỳ (AHA)',
        url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines',
        role: 'Chuẩn ép tim CPR & ECC'
      },
      {
        shortName: 'ERC',
        titleKey: 'footer.authorityErc',
        name: 'Hội đồng Hồi sinh Châu Âu (ERC)',
        url: 'https://www.erc.edu/science-research/guidelines/',
        role: 'Khuyến cáo hồi sinh cấp cứu'
      },
      {
        shortName: 'HCDC',
        titleKey: 'footer.authorityHcdc',
        name: 'Trung tâm Kiểm soát Bệnh tật TP.HCM',
        url: 'https://hcdc.vn/',
        role: 'Hướng dẫn y tế dự phòng'
      },
      {
        shortName: 'Vinmec',
        titleKey: 'footer.authorityVinmec',
        name: 'Hệ thống Y tế Vinmec',
        url: 'https://www.vinmec.com/vie/bai-viet/',
        role: 'Tài liệu đối chiếu sơ cứu'
      },
      {
        shortName: 'Tâm Anh',
        titleKey: 'footer.authorityTamAnh',
        name: 'Bệnh viện Đa khoa Tâm Anh',
        url: 'https://tamanhhospital.vn/',
        role: 'Tài liệu chuyên môn y khoa'
      }
    ]
  };

  /**
   * Tạo URL tuyệt đối chuẩn hóa (tránh trùng lặp URL khi SEO)
   * @param {string} pathAndQuery - Ví dụ: 'topics.html' hoặc 'topic-detail.html?id=hoc-di-vat'
   * @returns {string}
   */
  function buildCanonicalUrl(pathAndQuery) {
    const base = SEO_CONFIG.siteUrl.replace(/\/+$/, '');
    const cleanPath = String(pathAndQuery || '').replace(/^\/+/, '');
    if (!cleanPath || cleanPath === 'index.html') return `${base}/`;
    return `${base}/${cleanPath}`;
  }

  /**
   * Cập nhật đồng bộ thẻ <link rel="canonical">, Open Graph và Twitter Card khi trang thay đổi động
   * @param {Object} meta
   */
  function updateDynamicHeadMeta({ title, description, canonicalUrl, imageUrl }) {
    if (title) document.title = title;

    if (description) {
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) descEl.setAttribute('content', description);
    }

    if (canonicalUrl) {
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', canonicalUrl);
    }

    const ogMappings = {
      'og:title': title,
      'og:description': description,
      'og:url': canonicalUrl,
      'og:image': imageUrl || SEO_CONFIG.defaultOgImage
    };

    Object.entries(ogMappings).forEach(([prop, val]) => {
      if (!val) return;
      const el = document.querySelector(`meta[property="${prop}"]`);
      if (el) el.setAttribute('content', val);
    });

    const twitterMappings = {
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': imageUrl || SEO_CONFIG.defaultOgImage
    };

    Object.entries(twitterMappings).forEach(([name, val]) => {
      if (!val) return;
      const el = document.querySelector(`meta[name="${name}"]`);
      if (el) el.setAttribute('content', val);
    });
  }

  /**
   * Tạo JSON-LD BreadcrumbList giúp Google hiển thị đường dẫn phân cấp trên SERP
   * @param {Array<{name: string, url: string}>} items
   */
  function injectBreadcrumbSchema(items) {
    if (!Array.isArray(items) || items.length === 0) return;

    const existing = document.getElementById('dynamic-breadcrumb-schema');
    if (existing) existing.remove();

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: item.url
      }))
    };

    const script = document.createElement('script');
    script.id = 'dynamic-breadcrumb-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }

  /**
   * Render khối CTA kết nối "Website chính" (nếu enabled) và danh sách nguồn chính thống
   * @param {HTMLElement} container
   */
  function renderSatelliteNetworkBlock(container) {
    if (!container) return;
    container.innerHTML = '';

    // 1. Khối CTA trỏ về Website chính (chỉ hiện khi dev bật SEO_CONFIG.mainWebsite.enabled = true)
    if (SEO_CONFIG.mainWebsite?.enabled && SEO_CONFIG.mainWebsite?.url) {
      const ctaCard = document.createElement('div');
      ctaCard.className = 'mb-3 p-3 rounded-xl bg-primary-fixed/50 border border-primary/20 flex flex-col gap-1.5';

      const title = document.createElement('span');
      title.className = 'text-xs font-bold text-primary';
      title.textContent = SEO_CONFIG.mainWebsite.name;

      const desc = document.createElement('p');
      desc.className = 'text-xs text-on-surface-variant leading-relaxed';
      desc.textContent = SEO_CONFIG.mainWebsite.description;

      const link = document.createElement('a');
      link.href = SEO_CONFIG.mainWebsite.url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'inline-flex items-center gap-1 text-xs font-bold text-primary underline';
      link.textContent = SEO_CONFIG.mainWebsite.ctaText;

      ctaCard.append(title, desc, link);
      container.appendChild(ctaCard);
    }

    // 2. Danh sách badge nguồn tham chiếu y khoa chính thống (E-E-A-T Outbound Authorities)
    const listWrap = document.createElement('div');
    listWrap.className = 'flex flex-wrap items-center gap-2';

    SEO_CONFIG.officialAuthorities.forEach(auth => {
      const a = document.createElement('a');
      a.href = auth.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.dataset.i18nTitle = auth.titleKey;
      a.title = global.t ? global.t(auth.titleKey) : `${auth.name} — ${auth.role}`;
      a.className = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container hover:bg-primary-fixed hover:text-primary text-on-surface-variant border border-outline-variant/40 transition-colors';
      a.textContent = auth.shortName;
      listWrap.appendChild(a);
    });

    container.appendChild(listWrap);
  }

  global.MedFASeoConfig = SEO_CONFIG;
  global.MedFASeoHelper = {
    buildCanonicalUrl,
    updateDynamicHeadMeta,
    injectBreadcrumbSchema,
    renderSatelliteNetworkBlock
  };
})(window);
