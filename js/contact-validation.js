(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const toast = document.getElementById('contact-toast');
  const validators = {
    name: value => value.trim() ? '' : 'Vui lòng nhập họ và tên.',
    email: value => {
      if (!value.trim()) return 'Vui lòng nhập email.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Email chưa đúng định dạng.';
    },
    phone: value => {
      if (!value.trim()) return 'Vui lòng nhập số điện thoại.';
      return /^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(value.trim()) ? '' : 'Nhập số di động Việt Nam, ví dụ 0912345678.';
    },
    subject: value => value ? '' : 'Vui lòng chọn chủ đề đóng góp.',
    message: value => value.trim() ? '' : 'Vui lòng nhập lời nhắn.',
    consent: checked => checked ? '' : 'Vui lòng xác nhận để tiếp tục.'
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
    const value = name === 'consent' ? field.checked : field.value;
    return showFieldError(name, validators[name](value));
  }

  function showToast(message, isError) {
    toast.textContent = message;
    toast.classList.toggle('is-error', Boolean(isError));
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 5000);
  }

  Object.keys(validators).forEach(name => {
    const field = getField(name);
    const eventName = name === 'consent' || name === 'subject' ? 'change' : 'input';
    field.addEventListener(eventName, () => validateField(name));
    field.addEventListener('blur', () => validateField(name));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const isValid = Object.keys(validators).map(validateField).every(Boolean);
    if (!isValid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      showToast('Vui lòng kiểm tra các trường được đánh dấu.', true);
      return;
    }

    const submission = {
      name: getField('name').value.trim(),
      email: getField('email').value.trim(),
      phone: getField('phone').value.trim(),
      subject: getField('subject').value,
      message: getField('message').value.trim(),
      submittedAt: new Date().toISOString()
    };

    try {
      const stored = JSON.parse(sessionStorage.getItem('medfa_contact_submissions') || '[]');
      if (!Array.isArray(stored)) throw new Error('Dữ liệu phản hồi trong phiên không hợp lệ.');
      stored.push(submission);
      sessionStorage.setItem('medfa_contact_submissions', JSON.stringify(stored));
      form.reset();
      Object.keys(validators).forEach(name => showFieldError(name, ''));
      showToast('Đã lưu phản hồi tạm thời trong phiên trình duyệt. Cảm ơn bạn!');
    } catch (error) {
      console.error('[MedFA Contact] Không thể lưu phản hồi trong sessionStorage.', error);
      showToast('Không thể lưu phản hồi trong phiên này. Vui lòng kiểm tra cài đặt trình duyệt.', true);
    }
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
