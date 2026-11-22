/**
 * MedFA LocalStorage API Wrapper & Bookmark Manager
 * Quản lý bộ nhớ trình duyệt, trạng thái lưu bài học (Bookmark),
 * và lịch sử điểm số bài thi / luyện tập phản xạ 4 phút vàng.
 * 
 * Tác giả phụ trách: Nguyễn Trung Kiên (MSSV: 24520888)
 */

const Storage = (() => {
  const PREFIX = 'medfa_';

  /**
   * Lấy dữ liệu an toàn từ LocalStorage
   * @param {string} key 
   * @param {*} defaultValue 
   * @returns {*}
   */
  function get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item !== null ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn('[Storage] Lỗi đọc từ localStorage:', e);
      return defaultValue;
    }
  }

  /**
   * Ghi dữ liệu an toàn vào LocalStorage
   * @param {string} key 
   * @param {*} value 
   * @returns {boolean}
   */
  function set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('[Storage] Lỗi ghi vào localStorage:', e);
      return false;
    }
  }

  /**
   * Xóa một key trong LocalStorage
   * @param {string} key 
   * @returns {boolean}
   */
  function remove(key) {
    try {
      localStorage.removeItem(PREFIX + key);
      return true;
    } catch (e) {
      console.warn('[Storage] Lỗi xóa key trong localStorage:', e);
      return false;
    }
  }

  // ==================== QUẢN LÝ BOOKMARK (ĐÃ GỠ BỎ) ====================
  function getBookmarks() { return []; }
  function isBookmarked() { return false; }
  function toggleBookmark() { return false; }

  // ==================== LỊCH SỬ ĐIỂM SỐ & LUYỆN TẬP ====================

  /**
   * Lưu điểm thi trắc nghiệm tình huống
   * @param {number} score 
   * @param {number} total 
   * @param {number|null} timeSpent Giây
   * @returns {boolean}
   */
  function saveQuizScore(score, total, timeSpent = null) {
    const history = get('quiz_scores', []);
    const record = {
      score,
      total,
      timeSpent,
      completedAt: new Date().toISOString()
    };
    if (Array.isArray(history)) {
      history.push(record);
      return set('quiz_scores', history);
    }
    return set('quiz_scores', [record]);
  }

  /**
   * Lấy lịch sử điểm trắc nghiệm
   * @returns {Array}
   */
  function getQuizScores() {
    const history = get('quiz_scores', []);
    return Array.isArray(history) ? history : [];
  }

  function syncAllBookmarkButtons() {}

  return {
    get,
    set,
    remove,
    getBookmarks,
    isBookmarked,
    toggleBookmark,
    saveQuizScore,
    getQuizScores,
    syncAllBookmarkButtons
  };
})();

if (typeof window !== 'undefined') {
  window.Storage = Storage;
}
