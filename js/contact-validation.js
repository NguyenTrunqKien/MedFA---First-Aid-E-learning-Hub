(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const toast = document.getElementById('contact-toast');
  const validators = {
    name: value => value.trim() ? '' : (window.t ? t('contact.errName') : 'Vui lòng nhập họ và tên.'),
    email: value => {
      if (!value.trim()) return window.t ? t('contact.errEmailEmpty') : 'Vui lòng nhập email.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : (window.t ? t('contact.errEmailInvalid') : 'Email chưa đúng định dạng.');
    },
    phone: value => {
      if (!value.trim()) return window.t ? t('contact.errPhoneEmpty') : 'Vui lòng nhập số điện thoại.';
      return /^(0|\+84)[35789][0-9]{8}$/.test(value.trim()) ? '' : (window.t ? t('contact.errPhoneInvalid') : 'Nhập số di động Việt Nam, ví dụ 0912345678.');
    },
    subject: value => value ? '' : (window.t ? t('contact.errSubject') : 'Vui lòng chọn chủ đề đóng góp.'),
    message: value => value.trim() ? '' : (window.t ? t('contact.errMessage') : 'Vui lòng nhập lời nhắn.'),
    consent: checked => checked ? '' : (window.t ? t('contact.errConsent') : 'Vui lòng xác nhận để tiếp tục.')
  };
  let toastTimer;

  function getField(name) {
    return form.elements.namedItem(name);
  }

  function showFieldError(name, message) {
    const field = getField(name);
    const error = document.getElementById(`${name}-error`);
    if (!field || !error) return false;
    error.textContent = message;
    field.classList.toggle('is-invalid', Boolean(message));
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  function validateField(name) {
    const field = getField(name);
    if (!field) return true;
    const value = name === 'consent' ? field.checked : field.value;
    return showFieldError(name, validators[name](value));
  }

  function showToast(key, fallback, isError) {
    toast.dataset.i18n = key;
    toast.textContent = window.t ? t(key) : fallback;
    toast.classList.toggle('is-error', Boolean(isError));
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 5000);
  }

  Object.keys(validators).forEach(name => {
    const field = getField(name);
    if (!field) return;
    const eventName = name === 'consent' || name === 'subject' ? 'change' : 'input';
    field.addEventListener(eventName, () => validateField(name));
    field.addEventListener('blur', () => validateField(name));
  });

  const submitButton = form.querySelector('[type="submit"]');
  const submitLabel = submitButton.querySelector('[data-i18n]');
  const formCard = form.closest('.contact-form-card');
  const thanks = document.getElementById('contact-thanks');
  thanks.querySelector('button').addEventListener('click', () => {
    thanks.hidden = true;
    formCard.hidden = false;
    getField('name').focus();
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitButton.disabled) return;
    const isValid = Object.keys(validators).map(validateField).every(Boolean);
    if (!isValid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      showToast('contact.errFormInvalid', 'Vui lòng kiểm tra các trường được đánh dấu.', true);
      return;
    }

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitLabel.dataset.i18n = 'contact.sending';
    submitLabel.textContent = window.t ? t('contact.sending') : 'Đang gửi…';
    try {
      // Apps Script returns a cross-origin HTML page. Its receipt cannot be read here.
      await fetch(form.action, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(new FormData(form))
      });
      form.reset();
      toast.hidden = true;
      formCard.hidden = true;
      thanks.hidden = false;
      thanks.querySelector('h2').focus();
    } catch {
      showToast('contact.toastError', 'Gặp lỗi kết nối khi gửi phản hồi.', true);
    } finally {
      submitButton.removeAttribute('aria-busy');
      submitLabel.dataset.i18n = 'contact.submitBtn';
      submitLabel.textContent = window.t ? t('contact.submitBtn') : 'Gửi phản hồi';
      submitButton.disabled = false;
    }
  });

  // Khi đổi ngôn ngữ, cập nhật lại thông báo lỗi đang hiển thị (nếu có) nhưng giữ nguyên giá trị đã nhập
  window.addEventListener('medfa:languageChanged', () => {
    Object.keys(validators).forEach(name => {
      const field = getField(name);
      if (field && field.classList.contains('is-invalid')) {
        validateField(name);
      }
    });
  });

  const shareUrl = encodeURIComponent(window.location.href);
  const facebookLink = document.querySelector('[data-share="facebook"]');
  if (facebookLink) {
    facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  }
  const zaloLink = document.querySelector('[data-share="zalo"]');
  if (zaloLink) {
    zaloLink.href = `https://zalo.me/share?url=${shareUrl}`;
  }
})();
