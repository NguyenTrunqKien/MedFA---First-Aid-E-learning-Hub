/**
 * MedFA LocalStorage API Wrapper
 * Manages bookmarked topics and user preferences
 */

const Storage = (() => {
  const PREFIX = 'medfa_';

  function get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn('[Storage] Error reading from localStorage', e);
      return defaultValue;
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('[Storage] Error writing to localStorage', e);
      return false;
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(PREFIX + key);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Bookmarks
  function toggleBookmark(topicId) {
    const bookmarks = get('bookmarks', []);
    const idx = bookmarks.indexOf(topicId);
    if (idx > -1) {
      bookmarks.splice(idx, 1);
    } else {
      bookmarks.push(topicId);
    }
    set('bookmarks', bookmarks);
    return bookmarks.includes(topicId);
  }

  function isBookmarked(topicId) {
    const bookmarks = get('bookmarks', []);
    return bookmarks.includes(topicId);
  }

  return {
    get,
    set,
    remove,
    toggleBookmark,
    isBookmarked
  };
})();

if (typeof window !== 'undefined') {
  window.Storage = Storage;
}
