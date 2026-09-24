/**
 * MedFA Search Utility Module
 * Simple fuzzy search and keyword scoring for first aid topics
 */

const SearchUtil = (() => {
  function search(items, query, keys = ['title', 'shortDesc', 'category']) {
    if (!query || !query.trim()) return items;
    const cleanQuery = query.toLowerCase().trim();

    return items.filter(item => {
      return keys.some(key => {
        const val = item[key];
        if (typeof val === 'string') {
          return val.toLowerCase().includes(cleanQuery);
        }
        return false;
      });
    });
  }

  return { search };
})();

if (typeof window !== 'undefined') {
  window.SearchUtil = SearchUtil;
}
