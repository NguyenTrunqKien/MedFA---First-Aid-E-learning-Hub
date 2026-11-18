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

  // ==================== QUẢN LÝ BOOKMARK ====================

  /**
   * Lấy danh sách toàn bộ ID bài học đã lưu
   * @returns {string[]}
   */
  function getBookmarks() {
    const list = get('bookmarks', []);
    return Array.isArray(list) ? list : [];
  }

  /**
   * Kiểm tra bài học đã được lưu hay chưa
   * @param {string} topicId 
   * @returns {boolean}
   */
  function isBookmarked(topicId) {
    if (!topicId) return false;
    return getBookmarks().includes(topicId);
  }

  /**
   * Bật / tắt trạng thái lưu bài học
   * @param {string} topicId 
   * @returns {boolean} Trạng thái sau khi toggle (true: đã lưu, false: đã bỏ lưu)
   */
  function toggleBookmark(topicId) {
    if (!topicId) return false;
    const bookmarks = getBookmarks();
    const idx = bookmarks.indexOf(topicId);
    let active = false;

    if (idx > -1) {
      bookmarks.splice(idx, 1);
      active = false;
    } else {
      bookmarks.push(topicId);
      active = true;
    }

    set('bookmarks', bookmarks);

    // Bắn sự kiện tùy biến để các trang UI khác cập nhật tức thì
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('medfa:bookmark-changed', {
        detail: { topicId, isBookmarked: active, bookmarks }
      }));
    }

    return active;
  }

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

  /**
   * Lưu kết quả phiên luyện tập tính giờ 4 phút vàng
   * @param {number} score 
   * @param {number} total 
   * @param {number|null} timeSpent 
   * @returns {boolean}
   */
  function savePracticeScore(score, total, timeSpent = null) {
    const record = {
      score,
      total,
      timeSpent,
      completedAt: new Date().toISOString()
    };
    return set('last_timed_practice', record);
  }

  // ==================== EVENT DELEGATION TỰ ĐỘNG ====================

  /**
   * Cập nhật giao diện của một nút bookmark
   * @param {HTMLElement} btn 
   * @param {boolean} active 
   */
  function updateBookmarkButtonUI(btn, active) {
    btn.classList.toggle('is-bookmarked', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    const titleKey = active ? 'topics.bookmarkRemove' : 'detail.bookmarkTitle';
    btn.dataset.i18nTitle = titleKey;
    btn.title = window.t ? t(titleKey) : (active ? 'Bỏ lưu bài học này' : 'Lưu bài học này');

    const textEl = btn.querySelector('.bookmark-text');
    if (textEl) {
      textEl.textContent = active
        ? (window.t ? t('topics.bookmarkSaved') : 'Đã lưu')
        : (window.t ? t('topics.bookmarkSave') : 'Lưu bài học');
    }

    const icon = btn.querySelector('.material-symbols-outlined') || btn.querySelector('.bookmark-icon');
    if (icon) {
      icon.textContent = active ? 'bookmark_added' : 'bookmark_add';
      if (active) {
        icon.classList.add('fill-current', 'text-primary');
        icon.classList.remove('text-outline');
      } else {
        icon.classList.remove('fill-current', 'text-primary');
        icon.classList.add('text-outline');
      }
    }
  }

  /**
   * Đồng bộ toàn bộ các nút bookmark trên trang hiện tại
   */
  function syncAllBookmarkButtons() {
    const buttons = document.querySelectorAll('.btn-bookmark, [data-action="bookmark"]');
    buttons.forEach(btn => {
      const topicId = btn.getAttribute('data-topic-id') || 
                      btn.closest('[data-id]')?.getAttribute('data-id') ||
                      new URLSearchParams(window.location.search).get('id');
      if (topicId) {
        updateBookmarkButtonUI(btn, isBookmarked(topicId));
      }
    });
  }

  /**
   * Khởi tạo lắng nghe sự kiện Click toàn cục (Event Delegation)
   */
  function initEventDelegation() {
    if (typeof document === 'undefined') return;

    // Capture bookmark clicks before the surrounding topic card handles navigation.
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-bookmark, [data-action="bookmark"]');
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      const topicId = btn.getAttribute('data-topic-id') || 
                      btn.closest('[data-id]')?.getAttribute('data-id') ||
                      new URLSearchParams(window.location.search).get('id');

      if (!topicId) return;

      const newState = toggleBookmark(topicId);
      
      // Đồng bộ lại tất cả các nút có cùng topicId trên trang
      document.querySelectorAll(`[data-topic-id="${topicId}"], [data-id="${topicId}"] .btn-bookmark`).forEach(b => {
        updateBookmarkButtonUI(b, newState);
      });
      updateBookmarkButtonUI(btn, newState);
    }, { capture: true });

    // Tự động kiểm tra và cập nhật icon khi DOM sẵn sàng
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', syncAllBookmarkButtons);
    } else {
      syncAllBookmarkButtons();
    }

    // Đồng bộ lại mỗi khi có sự thay đổi từ tab khác hoặc module khác
    window.addEventListener('medfa:bookmark-changed', () => {
      syncAllBookmarkButtons();
    });
  }

  // Khởi động Event Delegation ngay khi nạp script
  initEventDelegation();

  return {
    get,
    set,
    remove,
    getBookmarks,
    isBookmarked,
    toggleBookmark,
    saveQuizScore,
    getQuizScores,
    savePracticeScore,
    syncAllBookmarkButtons
  };
})();

if (typeof window !== 'undefined') {
  window.Storage = Storage;
}
