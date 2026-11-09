/**
 * MedFA Timed Practice Controller - Thử thách phản xạ "4 Phút Vàng"
 * Chức năng: Đếm ngược 240 giây bằng SVG Circular Ring (stroke-dashoffset),
 * đổi màu Xanh sang Đỏ rực kèm animation: pulse 1s infinite khi dưới 60s,
 * hiển thị câu hỏi tình huống ngẫu nhiên và chấm điểm phản xạ.
 */

const duration = 240; // 4 phút vàng (240 giây)
const clock = document.querySelector('.clock');
const time = document.querySelector('#time');
const ring = document.querySelector('#ring');
const question = document.querySelector('#question');
const choices = document.querySelector('#choices');
const feedback = document.querySelector('#status');
const panel = document.querySelector('.challenge-content');
const resultIcon = document.querySelector('#result-icon');
const start = document.querySelector('#start');
const review = document.querySelector('#review');
const reviewTime = document.querySelector('#review-time');
const reviewStats = document.querySelector('#review-stats');
const reviewLinks = document.querySelector('#review-links');
const reviewAnswers = document.querySelector('#review-answers');

// Ngân hàng câu hỏi tình huống phản xạ cấp cứu chuẩn hóa từ cẩm nang MedFA (topics.json)
// Fallback an toàn 100% nếu mở file:// hoặc mất mạng
const DEFAULT_QUESTIONS = [
  {
    id: "tp-01",
    topicId: "ngung-tuan-hoan-cpr",
    topicTitle: "Ngừng tuần hoàn (Ép tim CPR)",
    prompt: "Thời gian vàng tối đa để cấp cứu hồi sinh tế bào não trước khi bị tổn thương không thể hồi phục khi ngừng tuần hoàn là bao lâu?",
    options: ["4 phút", "10 phút", "15 phút", "30 phút"],
    answer: 0,
    explanation: "Theo cẩm nang MedFA và khuyến cáo ERC/AHA, não bộ sẽ bắt đầu tổn thương không thể phục hồi chỉ sau 4 phút thiếu oxy nếu tim ngừng đập.",
    standard: "Chuẩn ERC & AHA 2025"
  },
  {
    id: "tp-02",
    topicId: "ngung-tuan-hoan-cpr",
    topicTitle: "Ngừng tuần hoàn (Ép tim CPR)",
    prompt: "Khi thực hiện ép tim ngoài lồng ngực (CPR) cho người lớn theo khuyến cáo, tần số ép ngực đạt chuẩn là bao nhiêu?",
    options: ["60 - 80 lần/phút", "100 - 120 lần/phút", "130 - 150 lần/phút", "Tùy theo nhịp thở của người sơ cứu"],
    answer: 1,
    explanation: "Tần số ép tim chuẩn là 100 - 120 lần/phút, độ sâu 5 - 6 cm đối với người lớn và phải để lồng ngực nở hoàn toàn sau mỗi lần ép.",
    standard: "Chuẩn ERC & AHA 2025"
  },
  {
    id: "tp-03",
    topicId: "ngung-tuan-hoan-cpr",
    topicTitle: "Ngừng tuần hoàn (Ép tim CPR)",
    prompt: "Trong quy trình hồi sinh tim phổi (CPR) kết hợp ép tim và thổi ngạt, tỉ lệ chu kỳ chuẩn là:",
    options: ["15 lần ép tim : 2 lần thổi ngạt", "30 lần ép tim : 2 lần thổi ngạt", "30 lần ép tim : 5 lần thổi ngạt", "50 lần ép tim : 1 lần thổi ngạt"],
    answer: 1,
    explanation: "Chu kỳ chuẩn theo AHA/ERC là 30 lần ép tim liên tục xen kẽ 2 lần thổi ngạt hiệu quả, gián đoạn ép tim không quá 10 giây.",
    standard: "Chuẩn ERC & AHA 2025"
  },
  {
    id: "tp-04",
    topicId: "hoc-di-vat",
    topicTitle: "Hóc dị vật (Nghẹn)",
    prompt: "Phát hiện một người lớn đang bị nghẹn thức ăn nhưng vẫn còn nói được và đang cố ho mạnh. Bạn nên làm gì?",
    options: ["Lao vào thực hiện nghiệm pháp Heimlich ngay lập tức", "Dùng ngón tay móc sâu vào họng để tìm dị vật", "Khuyến khích nạn nhân tiếp tục ho mạnh, không can thiệp đập lưng hay ép bụng", "Cho nạn nhân uống ngay một cốc nước đầy"],
    answer: 2,
    explanation: "Nếu nạn nhân vẫn nói, khóc hoặc ho mạnh được, phản xạ ho tự nhiên là cách tống dị vật tốt nhất. Khuyến khích ho mạnh, tuyệt đối không vỗ lưng hay ép bụng lúc này.",
    standard: "Chuẩn ERC & AHA 2025"
  },
  {
    id: "tp-05",
    topicId: "hoc-di-vat",
    topicTitle: "Hóc dị vật (Nghẹn)",
    prompt: "Khi thực hiện nghiệm pháp Heimlich cho người lớn bị tắc nghẽn đường thở hoàn toàn, vị trí đặt nắm đấm tay là:",
    options: ["Chính giữa xương ức", "Vùng thượng vị (trên rốn, dưới mũi ức)", "Dưới rốn 5cm", "Vùng hạ sườn phải"],
    answer: 1,
    explanation: "Nắm đấm đặt tại vùng thượng vị (trên rốn và dưới mũi ức), tay kia bọc lấy và giật mạnh dứt khoát theo hướng VÀO TRONG VÀ LÊN TRÊN.",
    standard: "Chuẩn ERC & AHA 2025"
  },
  {
    id: "tp-06",
    topicId: "hoc-di-vat-o-tre-em",
    topicTitle: "Hóc dị vật ở trẻ em",
    prompt: "Trẻ sơ sinh dưới 1 tuổi bị sặc dị vật tím tái, không khóc được. Hành động nào sau đây bị CẤM tuyệt đối vì gây nguy cơ dập vỡ nội tạng?",
    options: ["Thực hiện 5 lần vỗ lưng", "Thực hiện 5 lần ấn ngực", "Thực hiện nghiệm pháp ép bụng Heimlich", "Gọi cấp cứu 115"],
    answer: 2,
    explanation: "Đối với trẻ dưới 1 tuổi, gan và các cơ quan nội tạng còn rất non nớt. TUYỆT ĐỐI KHÔNG ép bụng Heimlich, chỉ dùng chu kỳ 5 vỗ lưng và 5 ấn ngực.",
    standard: "Chuẩn ERC & AHA 2025"
  },
  {
    id: "tp-07",
    topicId: "bong-cap-do-1-2",
    topicTitle: "Bỏng cấp độ 1 & 2",
    prompt: "Bị bỏng nước sôi ở cẳng tay xuất hiện các vết phồng rộp. Cách xử trí làm mát tại chỗ đúng chuẩn y khoa là gì?",
    options: ["Xối nhẹ dưới vòi nước mát sạch (15-25°C) liên tục 15-20 phút", "Chườm trực tiếp đá lạnh đóng băng lên vết bỏng", "Bôi ngay kem đánh răng hoặc mỡ trăn để làm dịu", "Chọc thủng các bọng nước để thoát dịch nhanh"],
    answer: 0,
    explanation: "Làm mát vết bỏng bằng nước sạch chảy nhẹ trong 15-20 phút giúp hạ nhiệt mô sâu. Tránh đá lạnh (gây bỏng lạnh hoại tử) và không bôi kem đánh răng, mỡ trăn.",
    standard: "Chuẩn Hội Bỏng Quốc tế (ISBI)"
  },
  {
    id: "tp-08",
    topicId: "chay-mau-nghiem-trong",
    topicTitle: "Chảy máu nghiêm trọng",
    prompt: "Khi đang băng ép cầm máu cho vết thương sâu ở cẳng tay, nếu thấy máu vẫn tiếp tục thấm đỏ qua lớp băng gạc đầu tiên, bạn nên làm gì?",
    options: ["Tháo toàn bộ lớp gạc cũ ra để kiểm tra miệng vết thương", "Đặt thêm lớp gạc mới chèn lên trên lớp cũ và tiếp tục quấn băng ép chặt hơn", "Rắc bột cà phê hoặc thuốc lá để cầm máu", "Nới lỏng băng để máu lưu thông tốt hơn"],
    answer: 1,
    explanation: "Tuyệt đối KHÔNG tháo lớp băng cũ vì sẽ làm vỡ các cục máu đông đang hình thành. Hãy đặt thêm lớp gạc mới lên trên và tiếp tục đè ép cố định.",
    standard: "Chuẩn IFRC / Hội Chữ Thập Đỏ"
  },
  {
    id: "tp-09",
    topicId: "chay-mau-va-cam-mau",
    topicTitle: "Chảy máu và cầm máu",
    prompt: "Khi nào người sơ cứu bắt buộc phải sử dụng phương pháp đặt Ga-rô (Tourniquet)?",
    options: ["Mọi vết thương chảy máu ở tay chân", "Chỉ khi chảy máu động mạch dữ dội phun thành tia hoặc đứt lìa chi mà băng ép trực tiếp không kiểm soát được", "Vết trầy xước chảy máu rỉ rỉ ngoài da", "Chảy máu ở vùng đầu và cổ"],
    answer: 1,
    explanation: "Ga-rô là biện pháp cứu mạng cuối cùng chỉ áp dụng cho vết thương chi chảy máu ồ ạt đe dọa tính mạng (phun tia, đứt lìa) khi đè ép trực tiếp thất bại.",
    standard: "Chuẩn IFRC / Hội Chữ Thập Đỏ"
  },
  {
    id: "tp-10",
    topicId: "co-giat-dong-kinh",
    topicTitle: "Co giật & Động kinh",
    prompt: "Gặp nạn nhân đang lên cơn co giật dữ dội, hành vi nào sau đây TUYỆT ĐỐI KHÔNG ĐƯỢC LÀM?",
    options: ["Kê đệm mềm dưới đầu nạn nhân và gạt bỏ các vật sắc nhọn xung quanh", "Cố gắng nhét thìa, đũa, chanh hoặc ngón tay vào miệng nạn nhân", "Nới lỏng cổ áo và thắt lưng của nạn nhân", "Bấm giờ theo dõi thời gian cơn co giật diễn ra"],
    answer: 1,
    explanation: "Nạn nhân không thể tự cắn đứt lưỡi khi co giật. Nhét vật cứng vào miệng có nguy cơ gãy răng, rách họng, tắc nghẽn đường thở hoặc cắn đứt ngón tay người cứu.",
    standard: "Chuẩn Hiệp hội Động kinh Quốc tế"
  },
  {
    id: "tp-11",
    topicId: "dot-quy",
    topicTitle: "Đột quỵ",
    prompt: "Quy tắc F.A.S.T dùng để nhận diện nhanh cơn Đột quỵ bao gồm những dấu hiệu nào?",
    options: ["Face (Méo mặt), Arms (Yếu liệt tay chân), Speech (Nói khó/ngọng), Time (Thời gian vàng gọi 115)", "Fever (Sốt cao), Allergy (Dị ứng), Shock (Sốc), Tremor (Run tay)", "Food (Ngộ độc), Airway (Tắc thở), Skin (Tái nhợt), Temperature (Hạ thân nhiệt)", "Fracture (Gãy xương), Ache (Đau đầu), Sleep (Mơ màng), Tension (Tăng huyết áp)"],
    answer: 0,
    explanation: "FAST là bộ quy tắc chuẩn quốc tế: F - Face (cười lệch mặt), A - Arms (yếu một bên tay), S - Speech (nói khó, phát âm không rõ), T - Time (khẩn cấp gọi 115).",
    standard: "Chuẩn Hội Đột Quỵ Thế Giới (WSO)"
  },
  {
    id: "tp-12",
    topicId: "duoi-nuoc-o-tre-em",
    topicTitle: "Đuối nước ở trẻ em",
    prompt: "Sau khi vớt một nạn nhân đuối nước ngừng thở lên bờ cát, hành vi sai lầm nguy hiểm nào cần TUYỆT ĐỐI TRÁNH?",
    options: ["Lập tức tiến hành khai thông đường thở và hà hơi thổi ngạt", "Ép tim ngoài lồng ngực kết hợp thổi ngạt", "Vác nạn nhân chạy vòng quanh để xốc nước ra khỏi phổi", "Gọi hỗ trợ y tế 115 ngay lập tức"],
    answer: 2,
    explanation: "Hành động vác chạy xốc nước làm chậm trễ thời gian vàng hồi sức tim phổi CPR và có thể khiến dịch dạ dày trào ngược lọt vào đường thở gây ngạt thở thứ phát.",
    standard: "Chuẩn Hiệp hội Cứu sinh Quốc tế (ILS)"
  }
];

let questions = [];
let index = 0;
let score = 0;
let deadline = 0;
let timer = null;
let answers = [];

function formatTime(seconds) {
  return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
}

/**
 * Xáo trộn ngẫu nhiên mảng
 */
function shuffle(array) {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function showReview(completed) {
  const elapsed = completed ? Math.floor((Date.now() - deadline + duration * 1000) / 1000) : duration;
  reviewTime.textContent = 'Thời gian làm bài · ' + formatTime(elapsed);
  const stats = [
    ['Tỷ lệ đúng', Math.round(score / questions.length * 100) + '%'],
    ['Đúng', score],
    ['Sai', answers.length - score],
    ['Bỏ trống', questions.length - answers.length]
  ];
  reviewStats.replaceChildren();
  for (const [label, value] of stats) {
    const group = document.createElement('div');
    const term = document.createElement('dt');
    const count = document.createElement('dd');
    term.textContent = label;
    count.textContent = value;
    group.append(term, count);
    reviewStats.append(group);
  }

  reviewLinks.replaceChildren();
  reviewAnswers.replaceChildren();
  const letters = ['A', 'B', 'C', 'D'];

  questions.forEach((item, position) => {
    const selected = answers[position];
    const isAnswered = selected !== undefined;
    const isCorrect = isAnswered && selected === item.answer;
    const state = !isAnswered ? 'Bỏ trống' : isCorrect ? 'Đúng' : 'Sai';

    const entry = document.createElement('li');
    entry.id = 'review-question-' + (position + 1);
    entry.dataset.state = state;

    const title = document.createElement('h3');
    title.textContent = 'Câu ' + (position + 1) + ' · ' + state;

    const prompt = document.createElement('p');
    prompt.style.fontWeight = '700';
    prompt.style.color = 'var(--color-primary)';
    prompt.style.marginBottom = '0.65rem';
    prompt.textContent = item.prompt;

    // Danh sách 4 đáp án A, B, C, D kèm tô màu chuẩn xác
    const optionsList = document.createElement('div');
    optionsList.className = 'review-options-list';

    item.options.forEach((optText, optIdx) => {
      const optItem = document.createElement('div');
      optItem.className = 'review-opt-item';

      const optMain = document.createElement('div');
      optMain.className = 'review-opt-main';

      const optLetter = document.createElement('span');
      optLetter.className = 'review-opt-letter';
      optLetter.textContent = letters[optIdx] || (optIdx + 1);

      const optLabel = document.createElement('span');
      optLabel.className = 'review-opt-label';
      optLabel.textContent = optText;

      optMain.append(optLetter, optLabel);
      optItem.append(optMain);

      // Quy tắc tô màu:
      // 1. Nếu người dùng chọn đúng: chỉ tô xanh đáp án mình chọn đúng
      // 2. Nếu người dùng chọn sai: tô đỏ đáp án đã chọn sai VÀ tô xanh đáp án chính xác
      // 3. Nếu bỏ trống: tô xanh đáp án chính xác
      if (optIdx === item.answer && isCorrect) {
        optItem.classList.add('is-correct');
        const badge = document.createElement('span');
        badge.className = 'review-opt-badge badge-correct';
        badge.textContent = '✓ Bạn chọn đúng';
        optItem.append(badge);
      } else if (optIdx === selected && !isCorrect) {
        optItem.classList.add('is-wrong');
        const badge = document.createElement('span');
        badge.className = 'review-opt-badge badge-wrong';
        badge.textContent = '✗ Bạn đã chọn';
        optItem.append(badge);
      } else if (optIdx === item.answer && !isCorrect) {
        optItem.classList.add('is-correct');
        const badge = document.createElement('span');
        badge.className = 'review-opt-badge badge-correct';
        badge.textContent = '✓ Đáp án đúng';
        optItem.append(badge);
      }

      optionsList.append(optItem);
    });

    entry.append(title, prompt, optionsList);

    if (item.explanation) {
      const explainEl = document.createElement('p');
      explainEl.style.cssText = 'margin-top: 0.65rem; font-size: 0.9rem; color: var(--color-on-surface-variant); background: var(--color-surface-container-low); padding: 0.65rem 0.9rem; border-radius: 0.5rem; border-left: 3px solid var(--color-primary); line-height: 1.45;';
      explainEl.innerHTML = `<strong>💡 Giải thích chuyên môn:</strong> ${item.explanation}`;
      entry.append(explainEl);
    }

    if (item.topicId) {
      const topicEl = document.createElement('p');
      topicEl.style.cssText = 'margin-top: 0.4rem;';
      topicEl.innerHTML = `<a href="topic-detail.html?id=${item.topicId}" class="review-topic-link" style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.85rem; font-weight: 700; color: var(--color-primary); text-decoration: underline;">
        <span class="material-symbols-outlined" style="font-size: 16px;">menu_book</span> Ôn lại bài học: ${item.topicTitle || 'Chi tiết chủ đề'}
      </a>`;
      entry.append(topicEl);
    }

    reviewAnswers.append(entry);

    const link = document.createElement('a');
    link.href = '#' + entry.id;
    link.dataset.state = state;
    link.textContent = (position + 1) + ' · ' + state;
    reviewLinks.append(link);
  });
  review.hidden = false;
}

function finish(completed) {
  clearInterval(timer);
  choices.replaceChildren();
  const passed = completed && score >= Math.ceil(questions.length * 0.7);
  const result = passed ? 'complete' : completed ? 'failed' : 'timeout';
  const outcomes = {
    complete: { icon: 'emoji_events', title: 'Đạt chuẩn phản xạ 4 Phút Vàng!' },
    failed: { icon: 'cancel', title: 'Chưa đạt thử thách phản xạ' },
    timeout: { icon: 'timer_off', title: 'Hết 4 phút vàng!' }
  };
  panel.dataset.result = result;
  resultIcon.textContent = outcomes[result].icon;
  resultIcon.hidden = false;
  resultIcon.style.display = '';
  question.style.display = 'block';
  question.textContent = outcomes[result].title;
  feedback.textContent = 'Bạn trả lời chính xác ' + score + ' / ' + questions.length + ' tình huống phản xạ cấp cứu.';

  start.innerHTML = '<span class="material-symbols-outlined">restart_alt</span> Thử thách lại';
  start.style.display = 'inline-flex';
  start.disabled = false;

  // Lưu điểm vào LocalStorage nếu module Storage có sẵn
  if (typeof window.Storage !== 'undefined' && typeof window.Storage.set === 'function') {
    window.Storage.set('last_timed_practice', {
      score: score,
      total: questions.length,
      passed: passed,
      date: new Date().toISOString()
    });
  }

  showReview(completed);

  // Tự động cuộn mượt xuống phần xem thống kê và đáp án chi tiết
  setTimeout(() => {
    review.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 350);
}

/**
 * Cập nhật đồng hồ đếm ngược và trạng thái cảnh báo < 60s
 */
function updateClock() {
  const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  time.textContent = formatTime(remaining);

  // Kỹ thuật stroke-dashoffset hình tròn
  ring.setAttribute('stroke-dashoffset', String(100 * (1 - remaining / duration)));

  // Khi dưới 60 giây: Đổi sang class .warning (Đỏ rực + animation: pulse 1s infinite)
  const isWarning = remaining > 0 && remaining <= 60;
  clock.classList.toggle('warning', isWarning);

  if (remaining === 0) finish(false);
}

function showQuestion() {
  const introBox = document.querySelector('#challenge-intro-box');
  if (introBox) introBox.style.display = 'none';

  resultIcon.hidden = true;
  resultIcon.textContent = '';
  resultIcon.style.display = 'none';

  question.style.display = 'block';
  const item = questions[index];
  question.innerHTML = `<span class="q-progress-badge">Tình huống ${index + 1} / ${questions.length}</span><div class="q-text">${item.prompt}</div>`;

  choices.replaceChildren();
  const letters = ['A', 'B', 'C', 'D'];
  item.options.forEach((label, optionIndex) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-btn';
    button.innerHTML = `<span class="choice-letter">${letters[optionIndex] || (optionIndex + 1)}</span><span class="choice-label">${label}</span>`;
    button.addEventListener('click', () => {
      if (Date.now() >= deadline) {
        updateClock();
        return;
      }
      answers.push(optionIndex);
      if (optionIndex === item.answer) score += 1;
      index += 1;
      if (index === questions.length) finish(true);
      else showQuestion();
    });
    choices.append(button);
  });
  question.focus();
}

start.addEventListener('click', async () => {
  start.disabled = true;
  start.style.display = 'none';
  feedback.textContent = '';
  clock.classList.remove('warning');

  // Nạp dữ liệu câu hỏi phản xạ (Ưu tiên fetch timed_practice.json, tự động fallback nếu offline/CORS)
  try {
    const response = await fetch('data/timed_practice.json');
    if (response.ok) {
      const data = await response.json();
      const pool = Array.isArray(data) && data.length > 0 ? data : DEFAULT_QUESTIONS;
      // Lấy ngẫu nhiên 12 tình huống khẩn cấp cho mỗi lượt thử thách 4 phút vàng
      questions = shuffle(pool).slice(0, 12);
    } else {
      questions = shuffle(DEFAULT_QUESTIONS).slice(0, 12);
    }
  } catch (err) {
    console.warn('Đang chạy ở chế độ offline (local file://), nạp bộ câu hỏi phản xạ dự phòng.');
    questions = shuffle(DEFAULT_QUESTIONS).slice(0, 12);
  }

  delete panel.dataset.result;
  resultIcon.hidden = true;
  resultIcon.textContent = '';
  resultIcon.style.display = 'none';
  review.hidden = true;
  answers = [];
  index = 0;
  score = 0;
  deadline = Date.now() + duration * 1000;
  updateClock();
  showQuestion();
  if (timer) clearInterval(timer);
  timer = setInterval(updateClock, 250);

  // Cuộn lên lại khung làm bài nếu bắt đầu lượt mới từ dưới phần review
  const challengeSection = document.querySelector('.challenge');
  if (challengeSection) {
    challengeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

/**
 * Hỗ trợ Dev/Tester: Tự động chọn đúng 100% tất cả các câu hỏi
 * Cách dùng: Mở F12 -> Console -> gõ `testAutoWin()` -> Enter
 */
window.testAutoWin = async function () {
  // Nếu chưa bấm bắt đầu, tự động kích hoạt bắt đầu
  if (start && start.style.display !== 'none' && !start.disabled) {
    start.click();
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  if (!questions || questions.length === 0) {
    console.warn('[MedFA Debug] Chưa có dữ liệu câu hỏi, hãy bấm bắt đầu rồi thử lại.');
    return;
  }

  // Tự động gán toàn bộ đáp án chính xác
  answers = questions.map(item => item.answer);
  score = questions.length;
  index = questions.length;

  console.log(
    '%c🏆 [MedFA Dev Mode] Đã kích hoạt testAutoWin() thành công! Đạt 100% (' + score + '/' + questions.length + ').',
    'background: #10b981; color: #ffffff; font-weight: bold; font-size: 13px; padding: 4px 8px; border-radius: 4px;'
  );

  finish(true);
};
