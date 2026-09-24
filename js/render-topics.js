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
   * Template literal for a single first aid topic card
   * Extracted from Stitch mock HTML and made fully dynamic
   * @param {Object} topic 
   * @returns {string} HTML string
   */
  function createTopicCardHTML(topic) {
    return `
      <article 
        class="first-aid-card group bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer border border-outline-variant/20"
        data-id="${topic.id}"
        data-category="${topic.category}"
        data-critical="${topic.criticalLevel}"
        onclick="window.location.href='topic-detail.html?id=${topic.id}'"
      >
        <div>
          <div class="flex items-center justify-between">
            <!-- Icon -->
            <div class="w-12 h-12 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-300 shadow-sm">
              ${topic.iconSvg || '<span class="material-symbols-outlined text-[24px]">medical_services</span>'}
            </div>
            <!-- Status Badge -->
            <span class="px-space-md py-1 rounded-full font-label-md text-label-md ${topic.badgeClass || 'bg-surface-container-high text-on-surface-variant'} font-semibold tracking-tight">
              ${topic.badgeType || 'Sơ cứu'}
            </span>
          </div>

          <!-- Title -->
          <h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors mt-space-md font-bold">
            ${topic.title}
          </h3>

          <!-- Short Description -->
          <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-space-xs leading-relaxed">
            ${topic.shortDesc}
          </p>
        </div>

        <!-- Footer / CTA -->
        <div class="mt-space-lg pt-space-md flex items-center justify-between bg-surface-container-low/50 -mx-space-lg -mb-space-lg px-space-lg py-3 rounded-b-xl border-t border-outline-variant/10">
          <span class="inline-flex items-center gap-1 font-label-md text-label-md text-secondary group-hover:text-secondary-fixed-variant font-bold transition-colors">
            Xem hướng dẫn
            <svg aria-hidden="true" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <line x1="5" x2="19" y1="12" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
          <div class="flex items-center gap-1 text-outline font-label-sm text-label-sm">
            <span class="material-symbols-outlined text-[16px]">schedule</span>
            <span>${topic.readTime || '3 phút'}</span>
          </div>
        </div>
      </article>
    `;
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
      result = result.filter(t => t.category === currentCategory);
    }

    // 2. Filter by search query
    if (currentSearchQuery) {
      const q = currentSearchQuery.toLowerCase();
      result = result.filter(t => {
        const titleMatch = t.title.toLowerCase().includes(q) || (t.fullTitle && t.fullTitle.toLowerCase().includes(q));
        const descMatch = t.shortDesc.toLowerCase().includes(q);
        const catMatch = t.category.toLowerCase().includes(q) || (t.categoryLabel && t.categoryLabel.toLowerCase().includes(q));
        return titleMatch || descMatch || catMatch;
      });
    }

    // 3. Sort
    if (currentSort === 'critical') {
      const priority = { critical: 3, high: 2, medium: 1, low: 0 };
      result.sort((a, b) => (priority[b.criticalLevel] || 0) - (priority[a.criticalLevel] || 0));
    } else if (currentSort === 'newest') {
      result.reverse();
    }

    renderTopics(result, 'topics-container');
  }

  /**
   * Initialize interactive listeners for the topics page
   */
  async function init() {
    const container = document.getElementById('topics-container');
    if (!container) return; // Not on topics.html

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
  }

  return {
    init,
    renderTopics,
    createTopicCardHTML
  };
})();

// Auto-run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  TopicsRenderer.init();
});

if (typeof window !== 'undefined') {
  window.TopicsRenderer = TopicsRenderer;
}
