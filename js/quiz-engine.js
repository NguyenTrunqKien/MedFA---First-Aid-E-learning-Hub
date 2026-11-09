(() => {
  const dataUrl = 'data/quiz.json';
  const fallbackQuestions = [
    {
      id: 'unresponsive',
      scenario: 'Bạn thấy một người lớn nằm bất động, không đáp ứng khi gọi và lay nhẹ. Khu vực xung quanh an toàn.',
      question: 'Bạn nên làm gì tiếp theo?',
      options: [
        { id: 'a', text: 'Gọi người hỗ trợ, nhờ gọi 115/lấy AED; kiểm tra thở bình thường và bắt đầu CPR nếu không thở bình thường.' },
        { id: 'b', text: 'Cho người đó uống nước để tỉnh lại.' },
        { id: 'c', text: 'Để người đó nằm một mình vài phút rồi kiểm tra lại.' },
        { id: 'd', text: 'Tát mạnh vào mặt để đánh thức.' }
      ],
      answer: 'a',
      explanation: 'Gọi cấp cứu sớm và khởi động CPR khi người bệnh không đáp ứng, không thở bình thường là hành động ưu tiên. Không cho ăn uống người đang bất tỉnh.'
    },
    {
      id: 'cpr',
      scenario: 'Một người lớn đột ngột gục xuống, không đáp ứng và chỉ thở ngáp cá (thở không bình thường). Có người khác ở gần.',
      question: 'Hành động phù hợp nhất là gì?',
      options: [
        { id: 'a', text: 'Đặt nằm nghiêng và chờ tự hồi phục.' },
        { id: 'b', text: 'Nhờ gọi 115 và lấy AED; bắt đầu ép tim giữa ngực, nhanh và mạnh.' },
        { id: 'c', text: 'Cho uống nước đường.' },
        { id: 'd', text: 'Chỉ xoa bóp tay chân.' }
      ],
      answer: 'b',
      explanation: 'Thở ngáp cá không được xem là thở bình thường. Gọi 115, dùng AED sớm nếu có và ép tim liên tục ở giữa ngực; nếu chưa được huấn luyện, làm theo hướng dẫn của tổng đài.'
    },
    {
      id: 'choking',
      scenario: 'Một người lớn đang ăn bỗng không thể nói, ho hoặc thở, có vẻ hoảng loạn.',
      question: 'Bạn nên xử trí thế nào?',
      options: [
        { id: 'a', text: 'Cho uống nước và yêu cầu nuốt.' },
        { id: 'b', text: 'Móc họng bằng tay dù không nhìn thấy dị vật.' },
        { id: 'c', text: 'Nhờ gọi 115; thực hiện vỗ lưng và ép bụng theo hướng dẫn sơ cứu phù hợp.' },
        { id: 'd', text: 'Để người đó nằm ngửa.' }
      ],
      answer: 'c',
      explanation: 'Tắc nghẽn đường thở nặng cần trợ giúp khẩn cấp. Với người lớn còn tỉnh, luân phiên vỗ lưng và ép bụng theo hướng dẫn hiện hành; không móc mù. Nếu nạn nhân bất tỉnh, bắt đầu CPR và làm theo tổng đài 115.'
    },
    {
      id: 'bleeding',
      scenario: 'Một người bị vết thương ở cẳng tay và máu chảy nhiều. Bạn đã đảm bảo khu vực an toàn.',
      question: 'Biện pháp sơ cứu ban đầu phù hợp là gì?',
      options: [
        { id: 'a', text: 'Ép trực tiếp, liên tục lên vết thương bằng gạc hoặc vải sạch và gọi cấp cứu nếu chảy máu nặng.' },
        { id: 'b', text: 'Rửa vết thương thật lâu trước khi cầm máu.' },
        { id: 'c', text: 'Tháo bỏ các cục máu đông liên tục.' },
        { id: 'd', text: 'Đắp bột hoặc kem không rõ thành phần.' }
      ],
      answer: 'a',
      explanation: 'Ép trực tiếp liên tục bằng vật liệu sạch là bước đầu để kiểm soát chảy máu. Không tháo lớp gạc đã thấm; nếu máu thấm qua, đặt thêm lớp mới và tìm trợ giúp y tế khẩn cấp khi chảy máu nặng.'
    },
    {
      id: 'burn',
      scenario: 'Một người vừa bị bỏng do nước nóng ở cẳng tay. Vùng bỏng không dính vào quần áo.',
      question: 'Nên làm gì ngay?',
      options: [
        { id: 'a', text: 'Chườm đá trực tiếp lên vùng bỏng.' },
        { id: 'b', text: 'Làm mát dưới vòi nước sạch mát đang chảy và tháo trang sức gần vùng bỏng nếu dễ tháo.' },
        { id: 'c', text: 'Bôi kem đánh răng để giảm đau.' },
        { id: 'd', text: 'Chọc vỡ các bóng nước.' }
      ],
      answer: 'b',
      explanation: 'Làm mát bỏng nhiệt bằng nước sạch mát đang chảy; không dùng đá, kem đánh răng hoặc chọc bóng nước. Bỏng rộng, sâu, ở mặt/bàn tay/sinh dục hoặc có dấu hiệu nặng cần được nhân viên y tế đánh giá.'
    },
    {
      id: 'seizure',
      scenario: 'Một người co giật trên sàn. Xung quanh có đồ vật cứng và sắc.',
      question: 'Bạn nên làm gì trong lúc co giật?',
      options: [
        { id: 'a', text: 'Giữ chặt tay chân để ngăn cử động.' },
        { id: 'b', text: 'Đặt vật vào miệng để tránh cắn lưỡi.' },
        { id: 'c', text: 'Dọn vật nguy hiểm, bảo vệ đầu, canh thời gian và không ghì giữ hay cho vật vào miệng.' },
        { id: 'd', text: 'Cho uống thuốc hoặc nước ngay.' }
      ],
      answer: 'c',
      explanation: 'Giữ an toàn, đỡ đầu bằng vật mềm và ghi thời gian cơn co giật. Không ghì giữ, không đưa bất cứ thứ gì vào miệng. Gọi cấp cứu nếu cơn kéo dài khoảng 5 phút, lặp lại, khó thở/chấn thương hoặc là cơn đầu tiên.'
    },
    {
      id: 'stroke',
      scenario: 'Một người đột ngột méo miệng, yếu một bên tay và nói khó.',
      question: 'Việc nào cần ưu tiên?',
      options: [
        { id: 'a', text: 'Cho ăn để lấy sức.' },
        { id: 'b', text: 'Ghi nhớ thời điểm khởi phát triệu chứng và gọi 115 ngay.' },
        { id: 'c', text: 'Đợi vài giờ xem triệu chứng có hết không.' },
        { id: 'd', text: 'Tự cho uống thuốc của người khác.' }
      ],
      answer: 'b',
      explanation: 'Méo mặt, yếu tay, nói khó là dấu hiệu cảnh báo đột quỵ. Gọi cấp cứu ngay và ghi thời điểm người bệnh lần cuối còn bình thường; không cho ăn uống hay tự dùng thuốc.'
    },
    {
      id: 'fainting',
      scenario: 'Một người vừa ngất và hiện đã tỉnh lại, đang nằm ở nơi an toàn, không có chấn thương rõ.',
      question: 'Bạn nên làm gì?',
      options: [
        { id: 'a', text: 'Cho đứng dậy thật nhanh.' },
        { id: 'b', text: 'Cho uống nước khi vẫn còn lơ mơ.' },
        { id: 'c', text: 'Để người đó nằm nghỉ, theo dõi đáp ứng và hô hấp; gọi cấp cứu nếu không hồi phục nhanh hoặc có dấu hiệu nghiêm trọng.' },
        { id: 'd', text: 'Tát hoặc dội nước lạnh vào mặt.' }
      ],
      answer: 'c',
      explanation: 'Giữ người bệnh nằm ở tư thế an toàn và theo dõi. Không cho uống khi chưa tỉnh hoàn toàn. Gọi 115 nếu bất tỉnh kéo dài, khó thở, đau ngực, chấn thương hoặc tình trạng xấu đi.'
    },
    {
      id: 'anaphylaxis',
      scenario: 'Sau khi ăn một món mới, một người nổi mề đay toàn thân, sưng môi và khó thở.',
      question: 'Đây có thể là phản ứng nặng. Bạn nên làm gì?',
      options: [
        { id: 'a', text: 'Gọi 115 ngay; hỗ trợ dùng bút tiêm epinephrine của chính người bệnh nếu có và làm theo hướng dẫn cấp cứu.' },
        { id: 'b', text: 'Chờ xem ban có tự hết không.' },
        { id: 'c', text: 'Cho ăn thêm để kiểm tra dị ứng.' },
        { id: 'd', text: 'Để người bệnh tự đi bộ đến cơ sở y tế.' }
      ],
      answer: 'a',
      explanation: 'Khó thở kèm sưng môi sau tiếp xúc dị nguyên có thể là phản vệ, cần cấp cứu ngay. Nếu có bút tiêm epinephrine được kê cho người đó, hỗ trợ sử dụng theo hướng dẫn trên thiết bị và không trì hoãn gọi 115.'
    },
    {
      id: 'poisoning',
      scenario: 'Bạn phát hiện một người có thể vừa uống nhầm hóa chất tẩy rửa. Người đó còn tỉnh.',
      question: 'Hướng xử trí an toàn là gì?',
      options: [
        { id: 'a', text: 'Gây nôn để đẩy hóa chất ra ngoài.' },
        { id: 'b', text: 'Cho uống sữa hoặc giấm để trung hòa.' },
        { id: 'c', text: 'Gọi 115 hoặc cơ sở chống độc; giữ lại bao bì và không tự gây nôn hay cho ăn uống khi chưa được hướng dẫn.' },
        { id: 'd', text: 'Để người đó ngủ cho hết mệt.' }
      ],
      answer: 'c',
      explanation: 'Ngộ độc cần được nhân viên y tế hoặc cơ sở chống độc hướng dẫn khẩn cấp. Không tự gây nôn, không cố trung hòa bằng thức ăn/đồ uống; giữ lại nhãn hoặc bao bì để cung cấp thông tin.'
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

  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let answered = false;
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

  async function loadQuestions() {
    if (window.location.protocol === 'file:') {
      dataStatus.textContent = 'Đang dùng bộ câu hỏi dự phòng để hỗ trợ mở trực tiếp bằng tệp HTML.';
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
      dataStatus.textContent = 'Không thể tải tệp dữ liệu; bài trắc nghiệm đang dùng bộ câu hỏi dự phòng.';
      return fallbackQuestions;
    }
  }

  function renderQuestion() {
    const item = questions[currentIndex];
    answered = false;
    count.textContent = `Câu ${currentIndex + 1} / ${questions.length}`;
    scoreLive.textContent = `Điểm: ${score}`;
    progress.value = currentIndex;
    category.textContent = `Tình huống ${currentIndex + 1}`;
    title.textContent = item.scenario;
    question.textContent = item.question;
    feedback.hidden = true;
    feedback.textContent = '';
    feedback.className = 'quiz-feedback';
    nextButton.hidden = true;
    nextButton.textContent = currentIndex === questions.length - 1 ? 'Xem kết quả' : 'Tiếp theo';
    options.replaceChildren();

    item.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option';
      button.dataset.optionId = option.id;
      button.setAttribute('aria-label', `Phương án ${String.fromCharCode(65 + index)}: ${option.text}`);
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
    const item = questions[currentIndex];
    const isCorrect = optionId === item.answer;
    if (isCorrect) score += 1;
    options.querySelectorAll('.quiz-option').forEach(button => {
      button.disabled = true;
      if (button.dataset.optionId === item.answer) button.classList.add('is-correct');
      if (button.dataset.optionId === optionId && !isCorrect) button.classList.add('is-incorrect');
    });
    scoreLive.textContent = `Điểm: ${score}`;
    feedback.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
    feedback.textContent = `${isCorrect ? 'Chính xác. ' : 'Chưa chính xác. '}${item.explanation}`;
    feedback.hidden = false;
    progress.value = currentIndex + 1;
    nextButton.hidden = false;
    nextButton.focus();
  }

  function showResult() {
    questionCard.hidden = true;
    progress.value = questions.length;
    count.textContent = 'Đã hoàn thành';
    scoreLive.textContent = `Điểm: ${score}`;
    result.hidden = false;
    resultScore.textContent = `${score} / ${questions.length} câu đúng`;
    const passed = score >= 8;
    badge.textContent = passed ? 'Sơ cứu viên Tinh anh' : 'Cần ôn luyện thêm';
    badge.classList.toggle('is-achievement', passed);
    resultMessage.textContent = passed
      ? 'Làm tốt lắm! Hãy tiếp tục ôn luyện và thực hành cùng các nguồn hướng dẫn đáng tin cậy.'
      : 'Hãy xem lại phần giải thích và thử lại để củng cố kiến thức sơ cứu.';
    saveStatus.textContent = '';
    saveButton.disabled = hasSaved;
  }

  function restartQuiz() {
    currentIndex = 0;
    score = 0;
    answered = false;
    hasSaved = false;
    result.hidden = true;
    questionCard.hidden = false;
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

  saveButton.addEventListener('click', () => {
    const storage = window.Storage;
    if (!storage || typeof storage.get !== 'function' || typeof storage.set !== 'function') {
      saveStatus.textContent = 'Không tìm thấy mô-đun lưu điểm. Vui lòng tải lại trang và thử lại.';
      return;
    }
    const history = storage.get('quiz_scores', []);
    if (!Array.isArray(history)) {
      saveStatus.textContent = 'Không thể lưu vì dữ liệu điểm hiện có không hợp lệ.';
      return;
    }
    const saved = storage.set('quiz_scores', history.concat({
      score,
      total: questions.length,
      timeSpent: null,
      completedAt: new Date().toISOString()
    }));
    if (!saved) {
      saveStatus.textContent = 'Trình duyệt không cho phép lưu điểm. Hãy kiểm tra cài đặt lưu trữ.';
      return;
    }
    hasSaved = true;
    saveButton.disabled = true;
    saveStatus.textContent = 'Đã lưu điểm trên thiết bị này.';
  });

  loadQuestions().then(data => {
    if (!validateQuestions(data)) throw new Error('Bộ câu hỏi dự phòng không hợp lệ.');
    questions = data;
    loading.hidden = true;
    content.hidden = false;
    progress.max = questions.length;
    renderQuestion();
  }).catch(error => {
    console.error('[MedFA Quiz] Không thể khởi tạo bài trắc nghiệm.', error);
    loading.textContent = 'Không thể khởi tạo bài trắc nghiệm. Vui lòng tải lại trang.';
  });
})();
