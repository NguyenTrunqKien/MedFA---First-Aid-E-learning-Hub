(() => {
  const dataUrl = 'data/quiz.json';

  const fallbackQuestions = [
    {
      "id": "unresponsive",
      "scenario": "Bạn thấy một người lớn nằm bất động, không đáp ứng khi gọi và lay nhẹ. Khu vực xung quanh an toàn.",
      "question": "Bạn nên làm gì tiếp theo?",
      "options": [
        { "id": "a", "text": "Gọi người hỗ trợ, nhờ gọi 115/lấy AED; kiểm tra thở bình thường và bắt đầu CPR nếu không thở bình thường." },
        { "id": "b", "text": "Cho người đó uống nước để tỉnh lại." },
        { "id": "c", "text": "Để người đó nằm một mình vài phút rồi kiểm tra lại." },
        { "id": "d", "text": "Tát mạnh vào mặt để đánh thức." }
      ],
      "answer": "a",
      "explanation": "Gọi cấp cứu sớm và khởi động CPR khi người bệnh không đáp ứng, không thở bình thường là hành động ưu tiên. Không cho ăn uống người đang bất tỉnh."
    },
    {
      "id": "cpr",
      "scenario": "Một người lớn đột ngột gục xuống, không đáp ứng và chỉ thở ngáp cá (thở không bình thường). Có người khác ở gần.",
      "question": "Hành động phù hợp nhất là gì?",
      "options": [
        { "id": "a", "text": "Đặt nằm nghiêng và chờ tự hồi phục." },
        { "id": "b", "text": "Nhờ gọi 115 và lấy AED; bắt đầu ép tim giữa ngực, nhanh và mạnh." },
        { "id": "c", "text": "Cho uống nước đường." },
        { "id": "d", "text": "Chỉ xoa bóp tay chân." }
      ],
      "answer": "b",
      "explanation": "Thở ngáp cá không được xem là thở bình thường. Gọi 115, dùng AED sớm nếu có và ép tim liên tục ở giữa ngực; nếu chưa được huấn luyện, làm theo hướng dẫn của tổng đài."
    },
    {
      "id": "choking",
      "scenario": "Một người lớn đang ăn bỗng không thể nói, ho hoặc thở, có vẻ hoảng loạn.",
      "question": "Bạn nên xử trí thế nào?",
      "options": [
        { "id": "a", "text": "Cho uống nước và yêu cầu nuốt." },
        { "id": "b", "text": "Móc họng bằng tay dù không nhìn thấy dị vật." },
        { "id": "c", "text": "Nhờ gọi 115; thực hiện vỗ lưng và ép bụng theo hướng dẫn sơ cứu phù hợp." },
        { "id": "d", "text": "Để người đó nằm ngửa." }
      ],
      "answer": "c",
      "explanation": "Tắc nghẽn đường thở nặng cần trợ giúp khẩn cấp. Với người lớn còn tỉnh, luân phiên vỗ lưng và ép bụng theo hướng dẫn hiện hành; không móc mù. Nếu nạn nhân bất tỉnh, bắt đầu CPR và làm theo tổng đài 115."
    },
    {
      "id": "bleeding",
      "scenario": "Một người bị vết thương ở cẳng tay và máu chảy nhiều. Bạn đã đảm bảo khu vực an toàn.",
      "question": "Biện pháp sơ cứu ban đầu phù hợp là gì?",
      "options": [
        { "id": "a", "text": "Ép trực tiếp, liên tục lên vết thương bằng gạc hoặc vải sạch và gọi cấp cứu nếu chảy máu nặng." },
        { "id": "b", "text": "Rửa vết thương thật lâu trước khi cầm máu." },
        { "id": "c", "text": "Tháo bỏ các cục máu đông liên tục." },
        { "id": "d", "text": "Đắp bột hoặc kem không rõ thành phần." }
      ],
      "answer": "a",
      "explanation": "Ép trực tiếp liên tục bằng vật liệu sạch là bước đầu để kiểm soát chảy máu. Không tháo lớp gạc đã thấm; nếu máu thấm qua, đặt thêm lớp mới và tìm trợ giúp y tế khẩn cấp khi chảy máu nặng."
    },
    {
      "id": "burn",
      "scenario": "Một người vừa bị bỏng do nước nóng ở cẳng tay. Vùng bỏng không dính vào quần áo.",
      "question": "Nên làm gì ngay?",
      "options": [
        { "id": "a", "text": "Chườm đá trực tiếp lên vùng bỏng." },
        { "id": "b", "text": "Làm mát dưới vòi nước sạch mát đang chảy và tháo trang sức gần vùng bỏng nếu dễ tháo." },
        { "id": "c", "text": "Bôi kem đánh răng để giảm đau." },
        { "id": "d", "text": "Chọc vỡ các bóng nước." }
      ],
      "answer": "b",
      "explanation": "Làm mát dưới nước sạch, mát đang chảy trong khoảng 15-20 phút và tháo đồ trang sức sớm để tránh chèn ép khi sưng nề. Không dùng đá lạnh hoặc bôi kem đánh răng."
    },
    {
      "id": "seizure",
      "scenario": "Một người bất ngờ ngã xuống và co giật toàn thân. Xung quanh có bàn ghế.",
      "question": "Bạn nên làm gì trong lúc co giật?",
      "options": [
        { "id": "a", "text": "Giữ chặt tay chân để ngăn cử động." },
        { "id": "b", "text": "Đặt vật vào miệng để tránh cắn lưỡi." },
        { "id": "c", "text": "Dọn vật nguy hiểm, bảo vệ đầu, canh thời gian và không ghì giữ hay cho vật vào miệng." },
        { "id": "d", "text": "Cho uống thuốc hoặc nước ngay." }
      ],
      "answer": "c",
      "explanation": "Giữ an toàn, đỡ đầu bằng vật mềm và ghi thời gian cơn co giật. Không ghì giữ, không đưa bất cứ thứ gì vào miệng. Gọi cấp cứu nếu cơn kéo dài khoảng 5 phút, lặp lại, khó thở/chấn thương hoặc là cơn đầu tiên."
    },
    {
      "id": "stroke",
      "scenario": "Một người đột ngột méo miệng, yếu một bên tay và nói khó.",
      "question": "Việc nào cần ưu tiên?",
      "options": [
        { "id": "a", "text": "Cho ăn để lấy sức." },
        { "id": "b", "text": "Ghi nhớ thời điểm khởi phát triệu chứng và gọi 115 ngay." },
        { "id": "c", "text": "Đợi vài giờ xem triệu chứng có hết không." },
        { "id": "d", "text": "Tự cho uống thuốc của người khác." }
      ],
      "answer": "b",
      "explanation": "Méo mặt, yếu tay, nói khó là dấu hiệu cảnh báo đột quỵ. Gọi cấp cứu ngay và ghi thời điểm người bệnh lần cuối còn bình thường; không cho ăn uống hay tự dùng thuốc."
    },
    {
      "id": "fainting",
      "scenario": "Một người vừa ngất và hiện đã tỉnh lại, đang nằm ở nơi an toàn, không có chấn thương rõ.",
      "question": "Bạn nên làm gì?",
      "options": [
        { "id": "a", "text": "Cho đứng dậy thật nhanh." },
        { "id": "b", "text": "Cho uống nước khi vẫn còn lơ mơ." },
        { "id": "c", "text": "Để người đó nằm nghỉ, theo dõi đáp ứng và hô hấp; gọi cấp cứu nếu không hồi phục nhanh hoặc có dấu hiệu nghiêm trọng." },
        { "id": "d", "text": "Tát hoặc dội nước lạnh vào mặt." }
      ],
      "answer": "c",
      "explanation": "Giữ người bệnh nằm ở tư thế an toàn và theo dõi. Không cho uống khi chưa tỉnh hoàn toàn. Gọi 115 nếu bất tỉnh kéo dài, khó thở, đau ngực, chấn thương hoặc tình trạng xấu đi."
    },
    {
      "id": "anaphylaxis",
      "scenario": "Sau khi ăn một món mới, một người nổi mề đay toàn thân, sưng môi và khó thở.",
      "question": "Đây có thể là phản ứng nặng. Bạn nên làm gì?",
      "options": [
        { "id": "a", "text": "Gọi 115 ngay; hỗ trợ dùng bút tiêm epinephrine của chính người bệnh nếu có và làm theo hướng dẫn cấp cứu." },
        { "id": "b", "text": "Chờ xem ban có tự hết không." },
        { "id": "c", "text": "Cho ăn thêm để kiểm tra dị ứng." },
        { "id": "d", "text": "Để người bệnh tự đi bộ đến cơ sở y tế." }
      ],
      "answer": "a",
      "explanation": "Khó thở kèm sưng môi sau tiếp xúc dị nguyên có thể là phản vệ, cần cấp cứu ngay. Nếu có bút tiêm epinephrine được kê cho người đó, hỗ trợ sử dụng theo hướng dẫn trên thiết bị và không trì hoãn gọi 115."
    },
    {
      "id": "poisoning",
      "scenario": "Bạn phát hiện một người có thể vừa uống nhầm hóa chất tẩy rửa. Người đó còn tỉnh.",
      "question": "Hướng xử trí an toàn là gì?",
      "options": [
        { "id": "a", "text": "Gây nôn để đẩy hóa chất ra ngoài." },
        { "id": "b", "text": "Cho uống sữa hoặc giấm để trung hòa." },
        { "id": "c", "text": "Gọi 115 hoặc cơ sở chống độc; giữ lại bao bì và không tự gây nôn hay cho ăn uống khi chưa được hướng dẫn." },
        { "id": "d", "text": "Để người đó ngủ cho hết mệt." }
      ],
      "answer": "c",
      "explanation": "Ngộ độc cần được nhân viên y tế hoặc cơ sở chống độc hướng dẫn khẩn cấp. Không tự gây nôn, không cố trung hòa bằng thức ăn/đồ uống; giữ lại nhãn hoặc bao bì để cung cấp thông tin."
    }
  ];

  const loading = document.getElementById('quiz-loading');
  const content = document.getElementById('quiz-content');
  const questionCard = document.getElementById('quiz-question-card');
  const count = document.getElementById('quiz-count');
  const scoreLive = document.getElementById('quiz-score-live');
  const progress = document.getElementById('quiz-progress');
  const category = document.getElementById('quiz-category');
  const title = document.getElementById('quiz-title');
  const question = document.getElementById('quiz-question');
  const options = document.getElementById('quiz-options');
  const feedback = document.getElementById('quiz-feedback');
  const nextButton = document.getElementById('quiz-next');
  const result = document.getElementById('quiz-result');
  const badge = document.getElementById('quiz-badge');
  const resultScore = document.getElementById('quiz-result-score');
  const resultMessage = document.getElementById('quiz-result-message');
  const saveButton = document.getElementById('quiz-save');
  const saveStatus = document.getElementById('quiz-save-status');
  const dataStatus = document.getElementById('quiz-data-status');

  let baseQuestions = [];
  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let selectedOptionId = null;
  let hasSaved = false;

  function validateQuestions(data) {
    return Array.isArray(data) && data.length === 10 && data.every(item => {
      return item &&
        typeof item.id === 'string' &&
        typeof item.scenario === 'string' &&
        typeof item.question === 'string' &&
        typeof item.answer === 'string' &&
        typeof item.explanation === 'string' &&
        Array.isArray(item.options) &&
        item.options.length === 4 &&
        item.options.every(option => option && typeof option.id === 'string' && typeof option.text === 'string') &&
        item.options.some(option => option.id === item.answer);
    });
  }

  function setStatus(element, key, fallback = '') {
    element.dataset.i18n = key;
    element.textContent = window.t ? t(key) : fallback;
  }

  async function loadBaseQuestions() {
    if (window.location.protocol === 'file:') {
      setStatus(dataStatus, 'quiz.fallbackFile', 'Đang dùng bộ câu hỏi dự phòng để hỗ trợ mở trực tiếp bằng tệp HTML.');
      return fallbackQuestions;
    }
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) throw new Error(`Không tải được ngân hàng câu hỏi (${response.status}).`);
      const data = await response.json();
      if (!validateQuestions(data)) throw new Error('Cấu trúc ngân hàng câu hỏi không hợp lệ.');
      return data;
    } catch (error) {
      console.warn('[MedFA Quiz] Đang chuyển sang bộ câu hỏi dự phòng.', error);
      setStatus(dataStatus, 'quiz.fallbackFetch', 'Không thể tải tệp dữ liệu; bài trắc nghiệm đang dùng bộ câu hỏi dự phòng.');
      return fallbackQuestions;
    }
  }

  async function getTranslatedQuestions() {
    const currentLang = (typeof window !== 'undefined' && window.I18n && typeof window.I18n.getLanguage === 'function')
      ? window.I18n.getLanguage()
      : 'vi';

    if (currentLang !== 'en' && currentLang !== 'ja') {
      return baseQuestions;
    }

    try {
      const res = await fetch(`data/${currentLang}/quiz.json`);
      if (!res.ok) throw new Error(`Cannot load ${currentLang.toUpperCase()} quiz`);
      const localizedData = await res.json();
      if (window.I18n.getLanguage() !== currentLang) return getTranslatedQuestions();
      const localizedMap = new Map();
      localizedData.forEach(item => localizedMap.set(item.id, item));

      return baseQuestions.map(q => {
        const localized = localizedMap.get(q.id);
        if (!localized) return q;
        const optMap = new Map();
        if (Array.isArray(localized.options)) {
          localized.options.forEach(o => optMap.set(o.id, o.text));
        }
        return {
          ...q,
          scenario: localized.scenario || q.scenario,
          question: localized.question || q.question,
          explanation: localized.explanation || q.explanation,
          options: q.options.map(o => ({
            ...o,
            text: optMap.get(o.id) || o.text
          }))
        };
      });
    } catch {
      if (window.I18n.getLanguage() !== currentLang) return getTranslatedQuestions();
      return baseQuestions;
    }
  }

  function renderQuestion() {
    const item = questions[currentIndex];
    answered = false;
    selectedOptionId = null;

    count.textContent = window.t
      ? t('quiz.countFormat', { current: currentIndex + 1, total: questions.length })
      : `Câu ${currentIndex + 1} / ${questions.length}`;
    scoreLive.textContent = window.t
      ? t('quiz.scoreLiveFormat', { score })
      : `Điểm: ${score}`;
    progress.value = currentIndex;
    category.textContent = window.t
      ? t('quiz.scenarioBadge', { num: currentIndex + 1 })
      : `Tình huống ${currentIndex + 1}`;
    title.textContent = item.scenario;
    question.textContent = item.question;
    feedback.hidden = true;
    feedback.textContent = '';
    feedback.className = 'quiz-feedback';
    nextButton.hidden = true;
    nextButton.textContent = currentIndex === questions.length - 1
      ? (window.t ? t('quiz.viewResultBtn') : 'Xem kết quả')
      : (window.t ? t('quiz.nextBtn') : 'Tiếp theo');
    options.replaceChildren();

    item.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option';
      button.dataset.optionId = option.id;
      button.setAttribute('aria-label', `${String.fromCharCode(65 + index)}: ${option.text}`);
      const letter = document.createElement('span');
      letter.className = 'quiz-option-letter';
      letter.textContent = String.fromCharCode(65 + index);
      const text = document.createElement('span');
      text.className = 'quiz-option-text';
      text.textContent = option.text;
      button.append(letter, text);
      button.addEventListener('click', () => chooseAnswer(option.id));
      options.append(button);
    });
  }

  function chooseAnswer(optionId) {
    if (answered) return;
    answered = true;
    selectedOptionId = optionId;
    const item = questions[currentIndex];
    const isCorrect = optionId === item.answer;
    if (isCorrect) score += 1;
    options.querySelectorAll('.quiz-option').forEach(button => {
      button.disabled = true;
      if (button.dataset.optionId === item.answer) button.classList.add('is-correct');
      if (button.dataset.optionId === optionId && !isCorrect) button.classList.add('is-incorrect');
    });
    scoreLive.textContent = window.t
      ? t('quiz.scoreLiveFormat', { score })
      : `Điểm: ${score}`;
    feedback.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
    const prefix = isCorrect
      ? (window.t ? t('quiz.correctPrefix') : 'Chính xác. ')
      : (window.t ? t('quiz.incorrectPrefix') : 'Chưa chính xác. ');
    feedback.textContent = `${prefix}${item.explanation}`;
    feedback.hidden = false;
    progress.value = currentIndex + 1;
    nextButton.hidden = false;
    nextButton.focus();
  }

  function showResult() {
    questionCard.hidden = true;
    progress.value = questions.length;
    count.textContent = window.t ? t('quiz.completedStatus') : 'Đã hoàn thành';
    scoreLive.textContent = window.t
      ? t('quiz.scoreLiveFormat', { score })
      : `Điểm: ${score}`;
    result.hidden = false;
    resultScore.textContent = window.t
      ? t('quiz.resultScoreFormat', { score, total: questions.length })
      : `${score} / ${questions.length} câu đúng`;
    const passed = score >= 8;
    badge.textContent = passed
      ? (window.t ? t('quiz.badgeElite') : 'Sơ cứu viên Tinh anh')
      : (window.t ? t('quiz.badgePractice') : 'Cần ôn luyện thêm');
    badge.classList.toggle('is-achievement', passed);
    resultMessage.textContent = passed
      ? (window.t ? t('quiz.msgElite') : 'Làm tốt lắm! Hãy tiếp tục ôn luyện và thực hành cùng các nguồn hướng dẫn đáng tin cậy.')
      : (window.t ? t('quiz.msgPractice') : 'Hãy xem lại phần giải thích và thử lại để củng cố kiến thức sơ cứu.');
    saveButton.disabled = false;
  }

  function drawRoundedRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function drawMedalIcon(ctx, cx, cy) {
    ctx.save();
    ctx.strokeStyle = '#b45309';
    ctx.fillStyle = '#d97706';
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // Ribbon tails
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy + 20);
    ctx.lineTo(cx - 20, cy + 52);
    ctx.lineTo(cx, cy + 42);
    ctx.lineTo(cx + 20, cy + 52);
    ctx.lineTo(cx + 16, cy + 20);
    ctx.stroke();

    // Outer circle
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#fffbeb';
    ctx.fill();
    ctx.stroke();

    // Inner 5-point star
    const spikes = 5;
    const outerR = 13;
    const innerR = 6;
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i += 1) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (i * Math.PI) / spikes - Math.PI / 2;
      const sx = cx + Math.cos(angle) * r;
      const sy = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.fillStyle = '#d97706';
    ctx.fill();
    ctx.restore();
  }

  function wrapCanvasText(ctx, text, maxWidth) {
    const words = String(text || '').trim().split(/\s+/);
    const lines = [];
    let line = '';
    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  async function downloadResultImage() {
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch (_) {}
    }

    const width = 1200;
    const height = 780;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    const lang = (window.I18n && typeof window.I18n.getLanguage === 'function')
      ? window.I18n.getLanguage()
      : 'vi';
    const fontFamily = '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const total = questions.length || 10;
    const passed = score >= 8;
    const now = new Date();
    const locale = lang === 'en' ? 'en-US' : lang === 'ja' ? 'ja-JP' : 'vi-VN';
    const dateStr = now.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    // Page background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#eef4ff');
    bgGrad.addColorStop(1, '#f8fafc');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Main white card with soft shadow
    const cardX = 64;
    const cardY = 56;
    const cardW = width - 128;
    const cardH = height - 112;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 40, 142, 0.10)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 12;
    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 28);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();

    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 28);
    ctx.strokeStyle = '#dde5f4';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Header bar inside card: Brand (left) + Date/Score (right)
    const padX = cardX + 56;
    const topY = cardY + 52;

    // MedFA cross emblem
    drawRoundedRect(ctx, padX, topY - 8, 44, 44, 12);
    const logoGrad = ctx.createLinearGradient(padX, topY - 8, padX + 44, topY + 36);
    logoGrad.addColorStop(0, '#00288e');
    logoGrad.addColorStop(1, '#0d9488');
    ctx.fillStyle = logoGrad;
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(padX + 18, topY + 2, 8, 24);
    ctx.fillRect(padX + 10, topY + 10, 24, 8);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#00288e';
    ctx.font = `800 24px ${fontFamily}`;
    ctx.fillText('MedFA', padX + 58, topY + 14);

    ctx.fillStyle = '#555765';
    ctx.font = `600 14px ${fontFamily}`;
    ctx.fillText('FIRST AID E-LEARNING HUB', padX + 58, topY + 33);

    // Right side status & timestamp
    const completedText = window.t ? t('quiz.completedStatus') : 'Đã hoàn thành';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#121c2a';
    ctx.font = `700 18px ${fontFamily}`;
    ctx.fillText(`${completedText} · ${dateStr} ${timeStr}`, cardX + cardW - 56, topY + 20);

    // Teal progress bar (matches UI)
    const barX = padX;
    const barY = topY + 58;
    const barW = cardW - 112;
    const barH = 14;
    drawRoundedRect(ctx, barX, barY, barW, barH, 7);
    const barGrad = ctx.createLinearGradient(barX, barY, barX + barW, barY);
    barGrad.addColorStop(0, '#006a61');
    barGrad.addColorStop(1, '#0d9488');
    ctx.fillStyle = barGrad;
    ctx.fill();

    // Medal icon
    const centerX = width / 2;
    drawMedalIcon(ctx, centerX, barY + 84);

    // Badge pill
    const badgeText = passed
      ? (window.t ? t('quiz.badgeElite') : 'Sơ cứu viên Tinh anh')
      : (window.t ? t('quiz.badgePractice') : 'Cần ôn luyện thêm');
    ctx.font = `700 20px ${fontFamily}`;
    const badgeTextW = ctx.measureText(badgeText).width;
    const pillW = badgeTextW + 52;
    const pillH = 44;
    const pillX = centerX - pillW / 2;
    const pillY = barY + 158;

    drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 22);
    ctx.fillStyle = passed ? '#d1fae5' : '#86f2e4';
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = passed ? '#065f46' : '#005049';
    ctx.fillText(badgeText, centerX, pillY + pillH / 2 + 1);

    // Title: Kết quả bài kiểm tra
    const headingText = window.t ? t('quiz.resultHeading') : 'Kết quả bài kiểm tra';
    ctx.fillStyle = '#00288e';
    ctx.font = `800 42px ${fontFamily}`;
    ctx.fillText(headingText, centerX, pillY + 98);

    // Score: X / 10 câu đúng
    const scoreText = window.t
      ? t('quiz.resultScoreFormat', { score, total })
      : `${score} / ${total} câu đúng`;
    ctx.fillStyle = '#006a61';
    ctx.font = `800 58px ${fontFamily}`;
    ctx.fillText(scoreText, centerX, pillY + 174);

    // Message (wrapped)
    const msgText = passed
      ? (window.t ? t('quiz.msgElite') : 'Làm tốt lắm! Hãy tiếp tục ôn luyện và thực hành cùng các nguồn hướng dẫn đáng tin cậy.')
      : (window.t ? t('quiz.msgPractice') : 'Hãy xem lại phần giải thích và thử lại để củng cố kiến thức sơ cứu.');
    ctx.fillStyle = '#444653';
    ctx.font = `500 22px ${fontFamily}`;
    const msgLines = wrapCanvasText(ctx, msgText, cardW - 180);
    msgLines.slice(0, 3).forEach((line, idx) => {
      ctx.fillText(line, centerX, pillY + 242 + idx * 34);
    });

    // Subtle footer divider & caption
    const footerY = cardY + cardH - 54;
    ctx.beginPath();
    ctx.moveTo(padX, footerY - 24);
    ctx.lineTo(cardX + cardW - 56, footerY - 24);
    ctx.strokeStyle = '#e6eeff';
    ctx.lineWidth = 2;
    ctx.stroke();

    const subtitleText = window.t
      ? t('quiz.imageSubtitle')
      : 'Trắc nghiệm tình huống sơ cứu · Chuẩn khuyến cáo ERC & AHA';
    ctx.fillStyle = '#64748b';
    ctx.font = `600 17px ${fontFamily}`;
    ctx.fillText(subtitleText, centerX, footerY + 6);

    // Filename
    const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const filePrefix = lang === 'en' ? 'MedFA-QuizResult' : lang === 'ja' ? 'MedFA-クイズ結果' : 'MedFA-KetQua';
    const fileName = `${filePrefix}-${score}of${total}-${stamp}.png`;

    // Trigger download
    return new Promise(resolve => {
      const triggerLink = href => {
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
      };

      if (typeof canvas.toBlob === 'function') {
        canvas.toBlob(blob => {
          if (!blob) {
            resolve(false);
            return;
          }
          const url = URL.createObjectURL(blob);
          triggerLink(url);
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          resolve(true);
        }, 'image/png');
      } else {
        try {
          triggerLink(canvas.toDataURL('image/png'));
          resolve(true);
        } catch (_) {
          resolve(false);
        }
      }
    });
  }

  function restartQuiz() {
    currentIndex = 0;
    score = 0;
    answered = false;
    selectedOptionId = null;
    hasSaved = false;
    result.hidden = true;
    questionCard.hidden = false;
    delete saveStatus.dataset.i18n;
    saveStatus.textContent = '';
    saveButton.disabled = false;
    renderQuestion();
    title.focus();
  }

  nextButton.addEventListener('click', () => {
    if (!answered) return;
    if (currentIndex === questions.length - 1) {
      showResult();
      document.getElementById('quiz-result-title').focus();
      return;
    }
    currentIndex += 1;
    renderQuestion();
    title.focus();
  });

  document.getElementById('quiz-restart').addEventListener('click', restartQuiz);

  saveButton.addEventListener('click', async () => {
    saveButton.disabled = true;
    try {
      // Vẫn lưu lịch sử điểm vào localStorage (chỉ 1 lần cho mỗi lượt thi)
      if (!hasSaved && window.Storage && typeof window.Storage.saveQuizScore === 'function') {
        window.Storage.saveQuizScore(score, questions.length, null);
        hasSaved = true;
      }

      const downloaded = await downloadResultImage();
      if (!downloaded) {
        setStatus(saveStatus, 'quiz.savedBlocked', 'Không thể tạo ảnh kết quả. Vui lòng thử lại.');
        return;
      }
      setStatus(saveStatus, 'quiz.savedSuccess', 'Đã tải ảnh kết quả về thiết bị của bạn.');
    } catch (error) {
      console.error('[MedFA Quiz] Không thể xuất ảnh kết quả.', error);
      setStatus(saveStatus, 'quiz.savedBlocked', 'Không thể tạo ảnh kết quả. Vui lòng thử lại.');
    } finally {
      saveButton.disabled = false;
    }
  });

  // Khởi tạo bài trắc nghiệm
  loadBaseQuestions().then(async data => {
    baseQuestions = data;
    questions = await getTranslatedQuestions();
    loading.hidden = true;
    content.hidden = false;
    progress.max = questions.length;
    renderQuestion();
  }).catch(error => {
    console.error('[MedFA Quiz] Không thể khởi tạo bài trắc nghiệm.', error);
    setStatus(loading, 'quiz.initError', 'Không thể khởi tạo bài trắc nghiệm. Vui lòng tải lại trang.');
  });

  // Lắng nghe sự kiện chuyển ngôn ngữ: Giữ nguyên trạng thái làm bài (câu hiện tại, điểm, đáp án đã chọn)
  window.addEventListener('medfa:languageChanged', async () => {
    questions = await getTranslatedQuestions();
    if (result.hidden === false) {
      showResult();
    } else if (questions[currentIndex]) {
      const curItem = questions[currentIndex];
      title.textContent = curItem.scenario;
      question.textContent = curItem.question;
      count.textContent = window.t
        ? t('quiz.countFormat', { current: currentIndex + 1, total: questions.length })
        : `Câu ${currentIndex + 1} / ${questions.length}`;
      scoreLive.textContent = window.t
        ? t('quiz.scoreLiveFormat', { score })
        : `Điểm: ${score}`;
      category.textContent = window.t
        ? t('quiz.scenarioBadge', { num: currentIndex + 1 })
        : `Tình huống ${currentIndex + 1}`;
      nextButton.textContent = currentIndex === questions.length - 1
        ? (window.t ? t('quiz.viewResultBtn') : 'Xem kết quả')
        : (window.t ? t('quiz.nextBtn') : 'Tiếp theo');

      // Update text in buttons
      options.querySelectorAll('.quiz-option').forEach(button => {
        const optId = button.dataset.optionId;
        const matchingOpt = curItem.options.find(o => o.id === optId);
        if (matchingOpt) {
          const txtEl = button.querySelector('.quiz-option-text');
          if (txtEl) txtEl.textContent = matchingOpt.text;
          button.setAttribute('aria-label', `${button.querySelector('.quiz-option-letter').textContent}: ${matchingOpt.text}`);
        }
      });

      if (answered) {
        const isCorrect = selectedOptionId === curItem.answer;
        const prefix = isCorrect
          ? (window.t ? t('quiz.correctPrefix') : 'Chính xác. ')
          : (window.t ? t('quiz.incorrectPrefix') : 'Chưa chính xác. ');
        feedback.textContent = `${prefix}${curItem.explanation}`;
      }
    }
  });
})();
