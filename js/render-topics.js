/**
 * MedFA Topics Renderer Module
 * Renders topic cards dynamically via template literals
 * Manages category filters, search, and sorting
 */

const TopicsRenderer = (() => {
  let allTopics = [];
  let currentCategory = 'all';
  let currentSearchQuery = '';
  let currentSort = 'popular';

  /**
   * Tạo HTML cho 1 thẻ tình huống sơ cấp cứu trên trang topics.html
   * Ủy quyền về hàm MedFAComponents.createTopicCardHTML() trong js/components/cards.js
   * @param {Object} topic
   * @returns {string}
   */
  function createTopicCardHTML(topic) {
    if (window.MedFAComponents && typeof window.MedFAComponents.createTopicCardHTML === 'function') {
      return window.MedFAComponents.createTopicCardHTML(topic);
    }
    return '';
  }

  /**
   * Render list of topics into the container
   * @param {Array} topics 
   * @param {string} containerId 
   */
  function renderTopics(topics, containerId = 'topics-container') {
    const container = document.getElementById(containerId);
    const emptyState = document.getElementById('empty-state');
    const counter = document.getElementById('card-counter');

    if (!container) return;

    if (counter) {
      counter.textContent = topics.length;
    }

    if (!topics || topics.length === 0) {
      container.innerHTML = '';
      container.classList.add('hidden');
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    container.classList.remove('hidden');

    const htmlContent = topics.map(topic => createTopicCardHTML(topic)).join('');
    container.innerHTML = htmlContent;
  }

  /**
   * Apply all active filters: category, query, sort
   */
  function applyFiltersAndRender() {
    let result = [...allTopics];

    // 1. Filter by category
    if (currentCategory && currentCategory !== 'all') {
      if (currentCategory === 'tai-nan' || currentCategory === 'chan-thuong') {
        result = result.filter(t => t.category === 'tai-nan' || t.category === 'chan-thuong' || t.categoryLabel === 'Chấn thương' || t.categoryLabel === 'Tai nạn');
      } else {
        result = result.filter(t => t.category === currentCategory);
      }
    }

    // 2. Filter by search query (Tìm kiếm tiếng Việt không dấu thông qua DataLoader.normalizeText)
    if (currentSearchQuery) {
      const norm = window.DataLoader?.normalizeText || (s => String(s || '').toLowerCase().trim());
      const q = norm(currentSearchQuery);
      if (q) {
        result = result.filter(t => {
          const haystack = [t.id, t.title, t.fullTitle, t.shortDesc, t.lead, t.category, t.categoryLabel]
            .map(norm)
            .join(' ');
          return haystack.includes(q);
        });
      }
    }

    // 3. Sort: Ưu tiên đẩy các bài đã đối chiếu y khoa lên trên các bài đang chờ rà soát
    if (currentSort === 'critical') {
      const priority = { critical: 3, high: 2, medium: 1, low: 0 };
      result.sort((a, b) => (priority[b.criticalLevel] || 0) - (priority[a.criticalLevel] || 0));
    } else if (currentSort === 'newest') {
      result.reverse();
    } else {
      result.sort((a, b) => Number(Boolean(a.needsMedicalReview)) - Number(Boolean(b.needsMedicalReview)));
    }

    renderTopics(result, 'topics-container');
  }

  /**
   * Initialize interactive listeners for the topics page
   */
  async function init() {
    const container = document.getElementById('topics-container');
    if (!container) return; // Not on topics.html

    // Hiển thị nhanh 6 thẻ Skeleton Loading bằng createSkeletonCardsHTML() từ js/components/cards.js trong lúc tải data/topics.json
    if (container.children.length === 0 && window.MedFAComponents?.createSkeletonCardsHTML) {
      container.innerHTML = window.MedFAComponents.createSkeletonCardsHTML(6);
    }

    // Load initial data
    if (window.DataLoader) {
      allTopics = await window.DataLoader.loadTopics();
    } else {
      console.error('[TopicsRenderer] DataLoader not found');
      return;
    }

    // Check URL parameters for category or search filter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const searchParam = urlParams.get('q');

    if (categoryParam) currentCategory = categoryParam;
    if (searchParam) currentSearchQuery = searchParam;

    // Attach Category Filter Buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
      const cat = btn.getAttribute('data-category');
      if (cat === currentCategory) {
        btn.classList.add('bg-secondary', 'text-on-secondary');
        btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
      } else {
        btn.classList.remove('bg-secondary', 'text-on-secondary');
        btn.classList.add('bg-surface-container-high', 'text-on-surface-variant');
      }

      btn.addEventListener('click', () => {
        categoryButtons.forEach(b => {
          b.classList.remove('bg-secondary', 'text-on-secondary');
          b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
        });
        btn.classList.add('bg-secondary', 'text-on-secondary');
        btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');

        currentCategory = cat;
        applyFiltersAndRender();
      });
    });

    // Attach Search Input
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    if (searchInput) {
      if (currentSearchQuery) {
        searchInput.value = currentSearchQuery;
      }

      searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value.trim();
        applyFiltersAndRender();
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          currentSearchQuery = searchInput.value.trim();
          applyFiltersAndRender();
        }
      });
    }

    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', () => {
        currentSearchQuery = searchInput.value.trim();
        applyFiltersAndRender();
      });
    }

    // Attach Sort Select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        applyFiltersAndRender();
      });
    }

    // Attach Reset Button
    const resetBtn = document.getElementById('reset-filter-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentCategory = 'all';
        currentSearchQuery = '';
        if (searchInput) searchInput.value = '';

        categoryButtons.forEach(b => {
          if (b.getAttribute('data-category') === 'all') {
            b.classList.add('bg-secondary', 'text-on-secondary');
            b.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
          } else {
            b.classList.remove('bg-secondary', 'text-on-secondary');
            b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
          }
        });

        applyFiltersAndRender();
      });
    }

    // First render
    applyFiltersAndRender();

    // Re-render when language changes
    window.addEventListener('medfa:languageChanged', async () => {
      if (window.DataLoader) {
        allTopics = await window.DataLoader.loadTopics();
        applyFiltersAndRender();
      }
    });
  }

  return {
    init,
    renderTopics,
    createTopicCardHTML,
    reloadTopics: async () => {
      if (window.DataLoader) {
        allTopics = await window.DataLoader.loadTopics();
        applyFiltersAndRender();
      }
    }
  };
})();

// Auto-run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  TopicsRenderer.init();
});

if (typeof window !== 'undefined') {
  window.TopicsRenderer = TopicsRenderer;
}
