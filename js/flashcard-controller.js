/**
 * MedFA 3D Flashcard Controller
 * Chức năng: Điều khiển thẻ ghi nhớ 3D, lật thẻ, chuyển thẻ,
 * tự động trích xuất dữ liệu từ data/topics.json và xáo trộn ngẫu nhiên.
 */

// Bộ dữ liệu Flashcard dự phòng (trích xuất nguyên văn từ 8 bài học cốt lõi trong data/topics.json nếu fetch gặp lỗi)
const DEFAULT_CARDS = [
  {
    id: 'hoc-di-vat',
    category: 'Trẻ em',
    front: 'Hóc dị vật (Nghẹn)',
    frontDesc: 'Dị vật xâm nhập gây cản trở đường thở cấp tính. Não bộ sẽ bắt đầu tổn thương không thể phục hồi chỉ sau 4 phút thiếu oxy nếu không được can thiệp đúng phương pháp ngay tại hiện trường.',
    back: 'Xử trí: Hóc dị vật (Nghẹn)',
    steps: [
      'Đánh giá mức độ tắc nghẽn',
      'Vỗ lưng 5 lần dứt khoát (Back Blows)',
      'Ép bụng 5 lần Heimlich (Abdominal Thrusts)'
    ]
  },
  {
    id: 'bong-cap-do-1-2',
    category: 'Sinh hoạt',
    front: 'Bỏng cấp độ 1 & 2',
    frontDesc: 'Tổn thương da do nhiệt độ cao gây đau đớn dữ dội, thoát dịch huyết tương và nguy cơ nhiễm trùng cao. Việc ngâm rửa đúng cách trong 15-20 phút đầu quyết định 80% mức độ để lại sẹo.',
    back: 'Xử trí: Bỏng cấp độ 1 & 2',
    steps: [
      'Loại bỏ nguồn nhiệt và dị vật',
      'Làm mát bằng nước sạch chảy nhẹ trong 15-20 phút',
      'Bảo vệ vết bỏng bằng gạc sạch vô trùng'
    ]
  },
  {
    id: 'chay-mau-nghiem-trong',
    category: 'Chấn thương',
    front: 'Chảy máu nghiêm trọng',
    frontDesc: 'Chảy máu động mạch có thể dẫn đến sốc mất máu tử vong chỉ trong vòng vài phút. Hành động cầm máu tại chỗ bằng lực ép trực tiếp là kỹ năng then chốt cứu mạng.',
    back: 'Xử trí: Chảy máu nghiêm trọng',
    steps: [
      'Bảo hộ an toàn và đè ép trực tiếp',
      'Băng ép cố định và nâng cao chi',
      'Nếu máu vẫn thấm qua: Thêm lớp mới, KHÔNG gỡ lớp cũ'
    ]
  },
  {
    id: 'ngung-tuan-hoan-cpr',
    category: 'Bệnh lý',
    front: 'Ngừng tuần hoàn (Ép tim CPR)',
    frontDesc: 'Khi tim ngừng đập, dòng máu nuôi dưỡng não bộ ngưng trệ ngay lập tức. Mỗi phút trôi qua không có CPR làm giảm 10% cơ hội sống sót của nạn nhân.',
    back: 'Xử trí: Ngừng tuần hoàn (Ép tim CPR)',
    steps: [
      'Kiểm tra hiện trường và phản xạ nạn nhân',
      'Kích hoạt hệ thống cấp cứu 115 và tìm máy AED',
      'Ép tim đúng vị trí và tần số chuẩn 100-120 lần/phút'
    ]
  },
  {
    id: 'soc-nhiet-say-nang',
    category: 'Ngoài trời',
    front: 'Sốc nhiệt, say nắng',
    frontDesc: 'Sốc nhiệt là cấp cứu nguy hiểm, có thể kèm lú lẫn hoặc ngất. Kiệt sức vì nóng nhẹ hơn nhưng có thể tiến triển nặng; cách cho uống nước phụ thuộc mức tỉnh táo và tình trạng.',
    back: 'Xử trí: Sốc nhiệt, say nắng',
    steps: [
      'Gọi 115 khi nghi sốc nhiệt',
      'Đưa đến nơi mát',
      'Làm mát ngay'
    ]
  },
  {
    id: 'duoi-nuoc-o-tre-em',
    category: 'Ngoài trời',
    front: 'Đuối nước ở trẻ em',
    frontDesc: 'Đuối nước gây thiếu oxy. Ưu tiên cứu hộ an toàn, gọi cấp cứu và hỗ trợ hô hấp sớm; không mất thời gian tìm cách đẩy nước ra khỏi phổi.',
    back: 'Xử trí: Đuối nước ở trẻ em',
    steps: [
      'Đưa trẻ ra khỏi nước an toàn',
      'Gọi 115, kiểm tra đáp ứng và thở',
      'Nếu không thở: hỗ trợ hô hấp và CPR'
    ]
  },
  {
    id: 'dot-quy',
    category: 'Bệnh lý',
    front: 'Đột quỵ',
    frontDesc: 'Đột quỵ có thể biểu hiện bằng méo mặt, yếu tay chân, nói khó, rối loạn thị giác hoặc mất thăng bằng đột ngột. Cấp cứu sớm giúp giảm nguy cơ tổn thương lâu dài.',
    back: 'Xử trí: Đột quỵ',
    steps: [
      'Nhận biết dấu hiệu FAST',
      'Gọi 115 và ghi giờ khởi phát',
      'Đặt người bệnh an toàn'
    ]
  },
  {
    id: 'dien-giat',
    category: 'Sinh hoạt',
    front: 'Điện giật',
    frontDesc: 'Điện giật có thể gây rối loạn tim hoặc ngừng thở dù vết bỏng ngoài da nhỏ. Người cứu phải chắc chắn nguồn điện đã được ngắt trước khi tiếp cận.',
    back: 'Xử trí: Điện giật',
    steps: [
      'Cắt điện và giữ an toàn',
      'Gọi 115 và kiểm tra nạn nhân',
      'CPR nếu ngừng thở bình thường'
    ]
  }
];

const DEFAULT_CARDS_EN = [
  {
    id: 'hoc-di-vat',
    category: 'Pediatric',
    front: 'Choking (Airway Obstruction)',
    frontDesc: 'Foreign object causes acute airway blockage. Brain damage begins after 4 minutes without oxygen.',
    back: 'Action: Choking (Airway Obstruction)',
    steps: [
      'Assess airway obstruction level',
      'Deliver 5 firm Back Blows',
      'Perform 5 Abdominal Thrusts (Heimlich)'
    ]
  },
  {
    id: 'bong-cap-do-1-2',
    category: 'Daily Life',
    front: '1st & 2nd Degree Burns',
    frontDesc: 'Thermal skin damage causes severe pain and high infection risk. Proper cooling for 15-20 minutes reduces scar severity by 80%.',
    back: 'Action: 1st & 2nd Degree Burns',
    steps: [
      'Remove heat source and constrictions',
      'Cool under clean running water for 15-20 mins',
      'Protect burn with sterile dressing'
    ]
  },
  {
    id: 'chay-mau-nghiem-trong',
    category: 'Trauma',
    front: 'Severe Bleeding',
    frontDesc: 'Arterial bleeding can cause fatal hemorrhagic shock within minutes. Direct firm pressure is the critical life-saving skill.',
    back: 'Action: Severe Bleeding',
    steps: [
      'Safety precautions and direct firm pressure',
      'Pressure bandage and limb elevation',
      'If blood soaks through: add new layer, DO NOT remove old'
    ]
  },
  {
    id: 'ngung-tuan-hoan-cpr',
    category: 'Medical',
    front: 'Cardiac Arrest (CPR)',
    frontDesc: 'When the heart stops, cerebral circulation halts immediately. Every minute without CPR reduces survival chances by 10%.',
    back: 'Action: Cardiac Arrest (CPR)',
    steps: [
      'Check scene safety and responsiveness',
      'Call 115 and locate an AED',
      'Compress chest at standard rate 100-120 bpm'
    ]
  },
  {
    id: 'soc-nhiet-say-nang',
    category: 'Outdoors',
    front: 'Heat Stroke & Sunstroke',
    frontDesc: 'Heat stroke is a medical emergency with confusion or collapse. Rapid active cooling is vital.',
    back: 'Action: Heat Stroke & Sunstroke',
    steps: [
      'Call 115 for suspected heat stroke',
      'Move victim to a cool area',
      'Initiate rapid active cooling'
    ]
  },
  {
    id: 'duoi-nuoc-o-tre-em',
    category: 'Outdoors',
    front: 'Pediatric Drowning',
    frontDesc: 'Drowning induces severe hypoxia. Rescuer safety, calling emergency services, and early rescue breaths are crucial.',
    back: 'Action: Pediatric Drowning',
    steps: [
      'Safely remove child from water',
      'Call 115, assess response and breathing',
      'If not breathing: begin rescue breathing and CPR'
    ]
  },
  {
    id: 'dot-quy',
    category: 'Medical',
    front: 'Stroke (Cerebrovascular Accident)',
    frontDesc: 'Identified by facial drooping, arm weakness, and speech difficulty. Early intervention prevents permanent brain damage.',
    back: 'Action: Stroke (Cerebrovascular Accident)',
    steps: [
      'Identify FAST symptoms',
      'Call 115 immediately & record symptom onset',
      'Position patient safely and monitor vitals'
    ]
  },
  {
    id: 'dien-giat',
    category: 'Daily Life',
    front: 'Electrical Shock',
    frontDesc: 'Electric current can cause fatal arrhythmias and internal tissue burns. Power source must be safely cut before touching the victim.',
    back: 'Action: Electrical Shock',
    steps: [
      'Turn off power breaker and secure scene',
      'Call 115 and assess patient responsiveness',
      'Begin CPR if victim is not breathing normally'
    ]
  }
];

function getDefaultCards() {
  const isEn = typeof window !== 'undefined' && window.I18n && window.I18n.getLanguage() === 'en';
  return isEn ? DEFAULT_CARDS_EN : DEFAULT_CARDS;
}

let allTopicsCards = [...DEFAULT_CARDS];
let cards = [];
let index = 0;
let currentMode = 'quick'; // 'quick' (10 thẻ ngẫu nhiên) hoặc 'all' (tất cả dữ liệu)

// Các phần tử DOM
const card = document.querySelector('#card');
const front = document.querySelector('#card-front');
const frontDesc = document.querySelector('#card-front-desc');
const back = document.querySelector('#card-back');
const backDesc = document.querySelector('#card-back-desc');
const backSteps = document.querySelector('#card-back-steps');
const cardCategory = document.querySelector('#card-category');
const flip = document.querySelector('#flip');
const flipText = document.querySelector('#flip-text');
const progress = document.querySelector('#card-progress');
const count = document.querySelector('#card-count');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const shuffleBtn = document.querySelector('#shuffle');

// Các phần tử chọn chế độ học
const modeQuickBtn = document.querySelector('#mode-quick');
const modeAllBtn = document.querySelector('#mode-all');
const sessionDoneBox = document.querySelector('#quick-session-done');
const btnNextBatch = document.querySelector('#btn-next-batch');
const btnSwitchAll = document.querySelector('#btn-switch-all');

// Các phần tử màn hình Hoàn thành & Chúc mừng (Completion View)
const cardCompletion = document.querySelector('#card-completion');
const cardInner = document.querySelector('.card-inner');
const completionTitle = document.querySelector('#completion-title');
const completionSubtitle = document.querySelector('#completion-subtitle');
const completionStatCount = document.querySelector('#completion-stat-count');
const btnCompletionRepeat = document.querySelector('#btn-completion-repeat');
const btnCompletionRepeatText = document.querySelector('#btn-completion-repeat-text');
const btnCompletionSecondary = document.querySelector('#btn-completion-secondary');
const btnCompletionSecondaryIcon = document.querySelector('#btn-completion-secondary-icon');
const btnCompletionSecondaryText = document.querySelector('#btn-completion-secondary-text');
let isCompletedScreen = false;

/**
 * Đổi chế độ học tập: 'quick' (10 thẻ) hoặc 'all' (tất cả dữ liệu)
 */
function setMode(mode) {
  currentMode = mode;
  if (modeQuickBtn && modeAllBtn) {
    modeQuickBtn.classList.toggle('is-active', mode === 'quick');
    modeQuickBtn.setAttribute('aria-selected', String(mode === 'quick'));
    modeAllBtn.classList.toggle('is-active', mode === 'all');
    modeAllBtn.setAttribute('aria-selected', String(mode === 'all'));
  }

  if (mode === 'quick') {
    const shuffled = shuffleArray([...allTopicsCards]);
    cards = shuffled.slice(0, Math.min(10, shuffled.length));
  } else {
    cards = [...allTopicsCards];
  }

  index = 0;
  if (sessionDoneBox) sessionDoneBox.style.display = 'none';
  showCard();
}

// Danh sách các bài trong topics.json bị lỗi nội dung scraper (cắt câu vụn), dính tên tác giả/bác sĩ, hoặc là lý thuyết chung
const INVALID_TOPIC_IDS = new Set([
  'bi-bong-gan-co-tay-co-chan-phai',             // Lỗi dữ liệu steps bị cắt câu
  'xu-ly-khi-bi-soc-phan-ve',                   // Lỗi dữ liệu steps
  'so-cuu-khi-bi-ran-can-ran-doc',              // Lỗi dữ liệu steps
  'xu-ly-ha-duong-huyet-o-nguoi-tieu',          // Lỗi dữ liệu steps
  'nghiem-phap-heimlich-la-gi-cach',             // Lỗi dữ liệu steps và trùng lặp
  'nguyen-tac-so-cap-cuu-va-ke-hoach-thuc-hien', // Lý thuyết chung
  'sac-sua-o-tre-so-sinh-rat-nguy',             // Lead dính tên tác giả / bác sĩ
  'so-cuu-ong-dot',                             // Lead dính tên tác giả / bác sĩ
  'so-cap-cuu-chan-thuong-dau-va-tuy',          // Lead dính tên tác giả / bác sĩ
  'cach-lay-di-vat-trong-mat',                  // Lead dính tên tác giả / bác sĩ
  'cach-so-cuu-dong-kinh-xu-tri-dung'           // Trùng lặp với bài Co giật & Động kinh
]);

/**
 * Kiểm tra xem chuỗi có dính tên tác giả, bác sĩ hoặc đơn vị cào bài không
 */
function isAuthorOrCrawlerJunk(str) {
  if (!str) return false;
  const lower = str.toLowerCase();
  return (
    lower.includes('bài viết được tư vấn') ||
    lower.includes('bài viết bởi') ||
    lower.includes('tham vấn chuyên môn') ||
    lower.includes('bác sĩ') ||
    lower.includes('bệnh viện') ||
    lower.includes('vinmec')
  );
}

/**
 * Loại bỏ các đoạn văn bản giới thiệu tác giả nếu còn sót lại
 */
function stripAuthorAndJunk(str) {
  if (!str) return '';
  return str
    .replace(/^Bài viết được (tư vấn|tham vấn) chuyên môn bởi[^.]*\./gi, '')
    .replace(/^Bài viết bởi[^.]*\./gi, '')
    .trim();
}

/**
 * Làm sạch và chuẩn hóa tiêu đề tình huống
 */
function cleanTitle(str) {
  if (!str) {
    return (typeof window !== 'undefined' && typeof window.t === 'function')
      ? window.t('flashcard.defaultTitle')
      : 'Tình huống khẩn cấp';
  }
  let t = str.trim();
  t = t.replace(/^Hướng dẫn sơ cứu trẻ bị\s*/i, 'Trẻ bị ');
  t = t.replace(/^Hướng dẫn sơ cứu\s*/i, 'Sơ cứu ');
  t = t.replace(/^Hướng dẫn\s*/i, '');
  t = t.replace(/^Cách sơ cứu người bị\s*/i, 'Nạn nhân bị ');
  t = t.replace(/^Cách sơ cứu khi bị\s*/i, 'Bị ');
  t = t.replace(/^Sơ cứu khi bị\s*/i, 'Bị ');
  t = t.replace(/^Sơ cấp cứu\s*/i, '');
  t = t.replace(/:\s*Phải(\s*làm sao\?)?/i, '');
  t = t.replace(/\s+sao cho đúng chuẩn và an toàn\?/i, '');
  return t.trim();
}

/**
 * Chuyển đổi dữ liệu trực tiếp từ topics.json thành thẻ Flashcard
 */
function extractCardsFromTopics(topics) {
  if (!Array.isArray(topics) || topics.length === 0) return getDefaultCards();

  // Lọc bỏ bài chưa đối chiếu y khoa (needsMedicalReview), bài lỗi data, bài lý thuyết hoặc dính tên tác giả
  const validTopics = topics.filter(t => {
    if (!t || !t.id || t.needsMedicalReview === true) return false;
    if (!Array.isArray(t.steps) || t.steps.length < 3) return false;
    if (INVALID_TOPIC_IDS.has(t.id)) return false;
    if (isAuthorOrCrawlerJunk(t.lead) || isAuthorOrCrawlerJunk(t.shortDesc)) return false;
    return true;
  });

  const isEn = typeof window !== 'undefined' && window.I18n && window.I18n.getLanguage() === 'en';
  const actionPrefix = (typeof window !== 'undefined' && typeof window.t === 'function')
    ? window.t('flashcard.actionPrefix')
    : (isEn ? 'Action: ' : 'Xử trí: ');
  const stepPrefix = (typeof window !== 'undefined' && typeof window.t === 'function')
    ? window.t('flashcard.stepPrefix')
    : (isEn ? 'Step ' : 'Bước ');

  return validTopics.map(t => {
    const frontTitle = cleanTitle(t.title || t.fullTitle);
    const category = t.categoryLabel || (typeof window !== 'undefined' && typeof window.t === 'function' ? window.t('flashcard.deckTag') : (isEn ? 'First Aid Reflex' : 'Phản xạ sơ cứu'));
    const situation = stripAuthorAndJunk(t.lead || t.shortDesc || t.emergencyAlert || '');

    // Mặt sau: Tiêu đề hành động xử trí và tối đa 3 bước sơ cứu từ topics.json
    const backTitle = `${actionPrefix}${frontTitle}`;
    const stepsList = t.steps.slice(0, 3).map(s => {
      let txt = (s.title || '').trim();
      // Chuẩn hóa câu chữ tránh số đứng đầu cạnh số thứ tự bước (VD: "2  5 vỗ lưng" -> "2  Vỗ lưng 5 lần")
      txt = txt.replace(/^5\s+vỗ lưng/i, 'Vỗ lưng 5 lần');
      txt = txt.replace(/^5\s+lần ép bụng/i, 'Ép bụng 5 lần');
      if (txt.length > 70) txt = txt.slice(0, 67).trim() + '...';
      return txt;
    });

    return {
      id: t.id,
      category: category,
      front: frontTitle,
      frontDesc: situation,
      back: backTitle,
      steps: stepsList,
      backDesc: stepsList.map((s, idx) => `${stepPrefix}${idx + 1}: ${s}`).join('\n')
    };
  });
}

/**
 * Xáo trộn ngẫu nhiên bộ thẻ (Thuật toán Fisher-Yates)
 */
function shuffleArray(arr) {
  const cloned = [...arr];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

/**
 * Đổi trạng thái lật thẻ
 */
function setFlipped(flipped) {
  if (flipText) {
    const isEn = typeof window !== 'undefined' && window.I18n && window.I18n.getLanguage() === 'en';
    const label = (typeof window !== 'undefined' && typeof window.t === 'function')
      ? window.t(flipped ? 'flashcard.flipBackBtn' : 'flashcard.flipBtn')
      : (flipped ? (isEn ? 'Show question' : 'Xem câu hỏi') : (isEn ? 'Flip card' : 'Lật thẻ'));
    flipText.textContent = label;
  }
  card.classList.toggle('is-flipped', flipped);
  card.setAttribute('aria-pressed', String(flipped));
  const current = cards[index];
  if (current) {
    const activeText = flipped ? (current.back + '. ' + (current.backDesc || '')) : (current.front + '. ' + (current.frontDesc || ''));
    const flipAria = (typeof window !== 'undefined' && typeof window.t === 'function')
      ? window.t('flashcard.cardAria')
      : 'Lật thẻ';
    card.setAttribute('aria-label', `${flipAria}. ${activeText}`);
  }
}

/**
 * Mức độ 2: Hiệu ứng pháo hoa giấy (Micro Confetti) bằng Canvas thuần y tế
 */
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  const colors = ['#002b80', '#0d9488', '#f59e0b', '#10b981', '#3b82f6', '#ec4899'];
  const pieces = [];
  const count = 75;

  for (let i = 0; i < count; i++) {
    pieces.push({
      x: window.innerWidth * (0.35 + Math.random() * 0.3),
      y: window.innerHeight * 0.55,
      w: 8 + Math.random() * 6,
      h: 5 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 14,
      vy: -11 - Math.random() * 9,
      gravity: 0.35,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      opacity: 1
    });
  }

  let animationFrame;
  const startTime = Date.now();

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - startTime;

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      if (elapsed > 1100) {
        p.opacity = Math.max(0, 1 - (elapsed - 1100) / 750);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (elapsed < 1900) {
      animationFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
      cancelAnimationFrame(animationFrame);
    }
  }

  render();
}

/**
 * Mức độ 1: Hiển thị Thẻ Tổng kết Thành tích (Summary Celebration View)
 */
function showCompletionScreen() {
  isCompletedScreen = true;
  if (cardInner) cardInner.style.display = 'none';
  if (cardCompletion) cardCompletion.style.display = 'flex';

  // Mức độ 3: Thanh tiến độ phát sáng hoàn thành 100%
  if (progress) {
    progress.value = cards.length;
    progress.classList.add('is-completed');
  }
  if (count) count.textContent = window.t ? t('flashcard.completedBadge') : '🏆 Hoàn thành';

  if (currentMode === 'quick') {
    if (completionTitle) completionTitle.textContent = window.t ? t('flashcard.compQuickTitle') : 'Tuyệt vời! Bạn đã hoàn thành 10 phản xạ!';
    if (completionSubtitle) completionSubtitle.textContent = window.t ? t('flashcard.compQuickSub') : '10 phản xạ y khoa sống còn đã được kích hoạt. Hãy duy trì luyện tập mỗi ngày nhé!';
    if (completionStatCount) completionStatCount.textContent = window.t ? t('flashcard.compQuickStat') : '10 / 10 Thẻ';
    if (btnCompletionRepeatText) btnCompletionRepeatText.textContent = window.t ? t('flashcard.compQuickRepeat') : 'Luyện 10 thẻ khác';
    if (btnCompletionSecondaryIcon) btnCompletionSecondaryIcon.textContent = 'library_books';
    if (btnCompletionSecondaryText) btnCompletionSecondaryText.textContent = window.t ? t('flashcard.compQuickAll') : 'Học tất cả dữ liệu';
  } else {
    if (completionTitle) completionTitle.textContent = window.t ? t('flashcard.compAllTitle') : 'Xuất sắc! Bạn đã làm chủ toàn bộ bài học!';
    if (completionSubtitle) completionSubtitle.textContent = window.t ? t('flashcard.compAllSub', { count: cards.length }) : `Bạn đã hoàn thành trọn vẹn ${cards.length} quy trình sơ cấp cứu chuẩn y tế MedFA!`;
    if (completionStatCount) completionStatCount.textContent = `${cards.length} / ${cards.length} ${window.t ? t('flashcard.cardsWord') : 'Thẻ'}`;
    if (btnCompletionRepeatText) btnCompletionRepeatText.textContent = window.t ? t('flashcard.compAllRepeat') : 'Luyện lại từ đầu';
    if (btnCompletionSecondaryIcon) btnCompletionSecondaryIcon.textContent = 'bolt';
    if (btnCompletionSecondaryText) btnCompletionSecondaryText.textContent = window.t ? t('flashcard.compAllQuick') : 'Luyện nhanh (10 thẻ)';
  }

  previous.disabled = false;
  next.disabled = true;

  // Mức độ 2: Bắn pháo hoa giấy chúc mừng
  launchConfetti();
}

/**
 * Ẩn Thẻ Tổng kết để trở về học bình thường
 */
function hideCompletionScreen() {
  isCompletedScreen = false;
  if (cardInner) cardInner.style.display = 'grid';
  if (cardCompletion) cardCompletion.style.display = 'none';
  if (progress) progress.classList.remove('is-completed');
}

/**
 * Hiển thị thẻ hiện tại
 */
function showCard() {
  hideCompletionScreen();
  if (!cards || cards.length === 0) return;
  const current = cards[index];

  if (cardCategory) {
    const isEn = typeof window !== 'undefined' && window.I18n && window.I18n.getLanguage() === 'en';
    cardCategory.textContent = current.category || (typeof window.t === 'function' ? window.t('flashcard.deckTag') : (isEn ? 'First Aid Reflex' : 'Phản xạ sơ cứu'));
  }

  front.textContent = current.front;
  if (frontDesc) frontDesc.textContent = current.frontDesc || '';
  back.textContent = current.back;

  // Hiển thị các bước sơ cứu dạng Step Badges trực quan
  if (backSteps) {
    backSteps.innerHTML = '';
    if (Array.isArray(current.steps) && current.steps.length > 0) {
      current.steps.forEach((stepText, idx) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'step-item';
        // Tạo DOM node thuần bằng textContent để tránh rủi ro XSS từ dữ liệu JSON
        const numSpan = document.createElement('span');
        numSpan.className = 'step-num';
        numSpan.textContent = String(idx + 1);
        const txtSpan = document.createElement('span');
        txtSpan.className = 'step-txt';
        txtSpan.textContent = stepText;
        stepEl.append(numSpan, txtSpan);
        backSteps.appendChild(stepEl);
      });
      backSteps.style.display = 'grid';
      if (backDesc) backDesc.style.display = 'none';
    } else {
      backSteps.style.display = 'none';
      if (backDesc) {
        backDesc.style.display = 'block';
        backDesc.textContent = current.backDesc || '';
      }
    }
  } else if (backDesc) {
    backDesc.textContent = current.backDesc || '';
  }

  count.textContent = (index + 1) + ' / ' + cards.length;
  progress.max = cards.length;
  progress.value = index + 1;

  previous.disabled = index === 0;
  if (previous) {
    previous.title = typeof window.t === 'function' ? window.t('flashcard.btnPrevTitle') : 'Thẻ trước (Phím ←)';
  }

  // Nút Next: Khi đến thẻ cuối cùng sẽ sáng lên với icon Cúp để bấm xem tổng kết
  if (index === cards.length - 1) {
    next.disabled = false;
    next.title = typeof window.t === 'function' ? window.t('flashcard.viewResultTitle') : 'Xem kết quả hoàn thành! 🏆';
    next.innerHTML = '<span class="material-symbols-outlined text-amber-500">emoji_events</span>';
  } else {
    next.disabled = false;
    next.title = typeof window.t === 'function' ? window.t('flashcard.btnNextTitle') : 'Thẻ tiếp (Phím →)';
    next.innerHTML = '<span class="material-symbols-outlined">arrow_forward</span>';
  }

  setFlipped(false);
}

function flipCard() {
  if (isCompletedScreen) return;
  setFlipped(!card.classList.contains('is-flipped'));
}

// Bắt sự kiện click
card.addEventListener('click', flipCard);
flip.addEventListener('click', flipCard);

previous.addEventListener('click', () => {
  if (isCompletedScreen) {
    hideCompletionScreen();
    showCard();
  } else if (index > 0) {
    index -= 1;
    showCard();
  }
});

next.addEventListener('click', () => {
  if (index < cards.length - 1) {
    index += 1;
    showCard();
  } else if (index === cards.length - 1) {
    showCompletionScreen();
  }
});

// Các nút bấm bên trong Thẻ Tổng kết Thành tích
if (btnCompletionRepeat) {
  btnCompletionRepeat.addEventListener('click', () => {
    hideCompletionScreen();
    setMode(currentMode);
  });
}
if (btnCompletionSecondary) {
  btnCompletionSecondary.addEventListener('click', () => {
    hideCompletionScreen();
    if (currentMode === 'quick') {
      setMode('all');
    } else {
      setMode('quick');
    }
  });
}

// Chuyển đổi chế độ học
if (modeQuickBtn) {
  modeQuickBtn.addEventListener('click', () => {
    hideCompletionScreen();
    setMode('quick');
  });
}
if (modeAllBtn) {
  modeAllBtn.addEventListener('click', () => {
    hideCompletionScreen();
    setMode('all');
  });
}
if (btnNextBatch) {
  btnNextBatch.addEventListener('click', () => {
    hideCompletionScreen();
    setMode('quick');
  });
}
if (btnSwitchAll) {
  btnSwitchAll.addEventListener('click', () => {
    hideCompletionScreen();
    setMode('all');
  });
}

if (shuffleBtn) {
  shuffleBtn.addEventListener('click', () => {
    hideCompletionScreen();
    if (currentMode === 'quick') {
      setMode('quick');
    } else {
      cards = shuffleArray(cards);
      index = 0;
      showCard();
    }
  });
}

// Bắt sự kiện bàn phím trên thẻ khi focus
card.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    flipCard();
  }
});

// Phím tắt bàn phím toàn trang: Mũi tên Lên/Xuống để lật, Trái/Phải để chuyển, S để xáo trộn
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  // 1. Phím mũi tên Phải: Thẻ tiếp theo hoặc xem Hoàn thành
  if (e.key === 'ArrowRight') {
    if (index < cards.length - 1) {
      index += 1;
      showCard();
    } else if (index === cards.length - 1 && !isCompletedScreen) {
      showCompletionScreen();
    }
  }
  // 2. Phím mũi tên Trái: Thẻ trước đó hoặc đóng màn hoàn thành
  else if (e.key === 'ArrowLeft') {
    if (isCompletedScreen) {
      hideCompletionScreen();
      showCard();
    } else if (index > 0) {
      index -= 1;
      showCard();
    }
  }
  // 3. Phím Mũi tên Lên hoặc Mũi tên Xuống: Lật thẻ
  else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
    flipCard();
  }
  // 4. Phím 'S' hoặc 'R': Xáo trộn / Đổi bộ thẻ
  else if (e.key === 's' || e.key === 'S' || e.key === 'r' || e.key === 'R') {
    e.preventDefault();
    hideCompletionScreen();
    if (currentMode === 'quick') {
      setMode('quick');
    } else {
      cards = shuffleArray(cards);
      index = 0;
      showCard();
    }
  }
});

/**
 * Khởi tạo dữ liệu chuẩn từ data/topics.json
 */
async function initFlashcards() {
  try {
    let topicsData = null;

    // Tải dữ liệu từ DataLoader hoặc data/topics.json
    if (typeof window.DataLoader !== 'undefined' && typeof window.DataLoader.loadTopics === 'function') {
      topicsData = await window.DataLoader.loadTopics();
    } else {
      const res = await fetch('data/topics.json');
      if (res.ok) {
        topicsData = await res.json();
      }
    }

    if (topicsData && topicsData.length > 0) {
      const extracted = extractCardsFromTopics(topicsData);
      if (extracted && extracted.length > 0) {
        allTopicsCards = extracted;
      }
    } else {
      allTopicsCards = [...getDefaultCards()];
    }
  } catch (err) {
    console.warn('Sử dụng bộ Flashcard mặc định:', err);
    allTopicsCards = [...getDefaultCards()];
  }

  // Khởi động mặc định với chế độ luyện nhanh (10 thẻ ngẫu nhiên)
  setMode('quick');
}

// Khởi chạy
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFlashcards);
} else {
  initFlashcards();
}

// Cập nhật nội dung thẻ khi ngôn ngữ thay đổi nhưng giữ nguyên thẻ hiện tại, mặt đang lật và thứ tự
if (typeof window !== 'undefined') {
  window.addEventListener('medfa:languageChanged', async () => {
    try {
      let rawTopics = null;
      if (window.DataLoader && typeof window.DataLoader.loadTopics === 'function') {
        rawTopics = await window.DataLoader.loadTopics();
      } else {
        const res = await fetch('data/topics.json');
        if (res.ok) {
          rawTopics = await res.json();
        }
      }

      const newExtracted = extractCardsFromTopics(rawTopics);
      const newMap = new Map();
      newExtracted.forEach(c => {
        if (c && c.id) newMap.set(c.id, c);
      });

      allTopicsCards = allTopicsCards.map((c, idx) => {
        if (c && c.id && newMap.has(c.id)) {
          return { ...newMap.get(c.id) };
        }
        if (newExtracted[idx]) {
          return { ...newExtracted[idx] };
        }
        return c;
      });

      const isFlipped = card ? card.classList.contains('is-flipped') : false;
      cards = cards.map((c, idx) => {
        if (c && c.id && newMap.has(c.id)) {
          return { ...newMap.get(c.id) };
        }
        if (newExtracted[idx]) {
          return { ...newExtracted[idx] };
        }
        return c;
      });

      if (isCompletedScreen) {
        showCompletionScreen();
      } else {
        const curIdx = index;
        showCard();
        index = curIdx;
        setFlipped(isFlipped);
      }
    } catch (err) {
      console.warn('[Flashcard] Lỗi cập nhật ngôn ngữ:', err);
    }
  });
}
