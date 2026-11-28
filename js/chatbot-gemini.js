/**
 * MedFA AI Triage Chatbot Module (Google Gemini API & Offline Medical Reflex)
 * Trợ lý phản xạ sơ cấp cứu y tế MedFA:
 * - Đọc cấu hình GEMINI_API_KEY và GEMINI_DEFAULT_MODEL từ tệp .env (không hardcode model trong code).
 * - Cho phép người dùng chọn mô hình Gemini sử dụng và lưu tùy chọn vào LocalStorage.
 * - Cơ chế Graceful Fallback tự động: Chuyển sang bộ quy tắc phản xạ y tế ngoại tuyến
 *   khi chưa cấu hình API Key trong .env hoặc khi mất kết nối mạng.
 * 
 * Tác giả phụ trách: Nguyễn Trung Kiên (MSSV: 24520888)
 */

const ChatbotGemini = (() => {
  const STORAGE_KEY_MODEL = 'medfa_gemini_model';

  // Danh sách các mô hình Gemini miễn phí hỗ trợ lựa chọn trong giao diện
  const AVAILABLE_MODELS = [
    { id: 'gemini-3.5-flash-lite', label: 'Gemini 3.5 Flash Lite' },
    { id: 'gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash Lite' },
    { id: 'gemini-3.6-flash', label: 'Gemini 3.6 Flash' },
    { id: 'gemini-3.8-flash', label: 'Gemini 3.8 Flash' }
  ];

  let envConfig = { apiKey: '', defaultModel: '' };
  let envLoadPromise = null;
  let isVercelServerless = false;

  // Bộ nhớ đệm thư viện bài học theo ngôn ngữ
  const topicsCacheByLang = { vi: null, en: null, ja: null };
  const topicsPromiseByLang = { vi: null, en: null, ja: null };

  // Lịch sử hội thoại ngắn (tối đa 3 lượt hỏi-đáp gần nhất) giúp AI hiểu câu hỏi nối tiếp
  const MAX_HISTORY_TURNS = 3;
  let chatHistory = [];

  // System Prompt y khoa chuẩn hóa theo khuyến cáo ERC 2025 và AHA 2024/2025 (Tiếng Việt)
  const SYSTEM_INSTRUCTION = `
Bạn là Trợ lý Phản xạ Sơ cấp cứu Y tế MedFA (Medical First Aid Assistant) - tuân thủ hướng dẫn chuyên môn của Hiệp hội Tim mạch Hoa Kỳ (AHA) và Hội đồng Hồi sinh Châu Âu (ERC).
Nguyên tắc cốt lõi:
1. GIỚI HẠN PHẠM VI (SCOPE GUARDRAIL): Bạn CHỈ hỗ trợ các câu hỏi về sơ cấp cứu ban đầu, xử trí tai nạn/tình huống y tế khẩn cấp và cách sử dụng nền tảng học tập MedFA. Nếu người dùng hỏi chủ đề hoàn toàn ngoài phạm vi (lập trình, giải toán, nấu ăn, giải trí, chính trị, tin tức...), hãy TỪ CHỐI LỊCH SỰ trong 1-2 câu ngắn gọn và mời họ quay lại hỏi về các tình huống sơ cấp cứu. (Với lời chào xã giao ngắn như "xin chào", hãy chào lại thân thiện và hỏi họ cần hỗ trợ tình huống sơ cứu nào).
2. NGUY CẤP SỐNG CÒN: Nếu người dùng hỏi về tình trạng khẩn cấp (ngừng tim, ngưng thở, bất tỉnh, hóc nghẹn tím tái, bỏng nặng, co giật, sốc nhiệt >40°C, chảy máu ồ ạt...), LUÔN nhắc nhở to rõ "GỌI CẤP CỨU 115 NGAY LẬP TỨC" ở dòng đầu tiên.
3. ƯU TIÊN DỮ LIỆU THƯ VIỆN MEDFA & MINH BẠCH TRI THỨC:
   - Nếu có mục [TÀI LIỆU THƯ VIỆN MEDFA LIÊN QUAN] đính kèm: hãy bám sát nội dung đó để trả lời nhất quán với cẩm nang trên website (không tự bịa URL vì hệ thống tự hiển thị thẻ liên kết bên dưới).
   - Nếu là câu hỏi y tế/sơ cấp cứu nhưng KHÔNG có mục [TÀI LIỆU THƯ VIỆN MEDFA LIÊN QUAN] đính kèm: hãy nêu rõ ngắn gọn ở đầu rằng "Tình huống này hiện chưa có trong thư viện bài học chuẩn hóa của MedFA", sau đó chỉ đưa ra các nguyên tắc sơ cứu/lời khuyên an toàn chung theo chuẩn AHA/ERC và khuyến cáo liên hệ bác sĩ hoặc gọi 115 nếu diễn biến nặng. Không tự chẩn đoán bệnh hay kê đơn thuốc.
4. 3-4 BƯỚC HÀNH ĐỘNG TỨC THÌ: Trình bày quy trình sơ cứu tối đa 3-4 bước gạch đầu dòng ngắn gọn, chuẩn xác, dễ làm tại hiện trường trong "4 Phút Vàng". Không viết đoạn văn dài.
5. KHÔNG ĐƯỢC LÀM (LƯU Ý NGUY HIỂM): Nêu ngắn gọn 1-2 điều tối kỵ (ví dụ: không bôi kem đánh răng/nước mắm lên vết bỏng, không châm kim đầu ngón tay khi ngất, không móc họng mù khi hóc dị vật).
6. TÍNH CHÍNH XÁC & PHÁP LÝ: Ngôn từ bình tĩnh, dứt khoát. Cuối câu trả lời y tế kèm nhắc nhở: "Thông tin hỗ trợ phản xạ ban đầu, không thay thế nhân viên y tế chuyên nghiệp".
Format câu trả lời: Ngắn gọn, có dùng định dạng Markdown hoặc gạch đầu dòng rõ ràng.
`;

  // System Prompt y khoa chuẩn hóa (English)
  const SYSTEM_INSTRUCTION_EN = `
You are the MedFA Medical First Aid Reflex Assistant, following American Heart Association (AHA) and European Resuscitation Council (ERC) guidelines.
Core rules:
1. SCOPE GUARDRAIL: You ONLY assist with first aid, emergency medical response, and using the MedFA learning platform. If the user asks about unrelated topics (coding, math, cooking, entertainment, politics, etc.), POLITELY DECLINE in 1-2 brief sentences and invite them to ask about first aid situations instead. (For simple greetings like "hello", reply warmly and ask what first aid topic they need help with.)
2. LIFE-THREATENING EMERGENCIES: For critical conditions (cardiac arrest, not breathing, unconsciousness, severe choking, major burns, seizures, heat stroke, severe bleeding...), ALWAYS state "CALL 115 / LOCAL EMERGENCY IMMEDIATELY" on the first line.
3. MEDFA LIBRARY & KNOWLEDGE TRANSPARENCY:
   - If [RELATED MEDFA LIBRARY ARTICLES] are provided: align your steps with them (do not invent URLs; clickable article cards are rendered automatically below your answer).
   - If it is a first aid/medical question WITHOUT [RELATED MEDFA LIBRARY ARTICLES] attached: briefly state upfront that "This topic is not yet in the standardized MedFA Library", then offer general AHA/ERC safety guidance and advise consulting a healthcare professional or calling 115 if symptoms worsen. Never diagnose diseases or prescribe medication.
4. 3-4 IMMEDIATE ACTION STEPS: Present 3-4 concise, actionable bullet points suitable for the "Golden 4 Minutes". Avoid long paragraphs.
5. DO NOT (DANGEROUS MISTAKES): List 1-2 critical things to avoid (e.g., no toothpaste/ice on burns, no blind finger sweeps for choking).
6. DISCLAIMER: Keep a calm, decisive tone and end medical answers with: "This guidance supports initial first aid reflexes and does not replace professional medical care."
Format: Concise Markdown with clear bullet points.
`;

  const SYSTEM_INSTRUCTION_JA = `
あなたはMedFAの応急手当アシスタントです。米国心臓協会（AHA）および欧州蘇生協議会（ERC）のガイドラインに沿って回答してください。
基本原則:
1. 対応範囲: 応急手当、緊急時の初期対応、MedFA学習プラットフォームの使い方だけに対応してください。無関係な質問には1〜2文で丁寧に断り、応急手当に関する質問を促してください。短い挨拶には親しみやすく応答してください。
2. 生命に関わる緊急事態: 心停止、呼吸停止、意識不明、重度の窒息、重いやけど、けいれん、熱中症、大量出血などでは、最初に「直ちに地域の救急サービスへ連絡してください」と明確に伝えてください。ベトナムでは115、日本では119です。
3. MedFAライブラリと情報の透明性:
   - [RELATED MEDFA LIBRARY ARTICLES] がある場合は、その内容に沿って回答し、存在しないURLを作らないでください。
   - 関連記事がない医療・応急手当の質問では、その話題が標準化されたMedFAライブラリにないことを簡潔に伝え、一般的な安全情報のみを案内してください。診断や薬の処方はしないでください。
4. 直ちに行う手順: 現場で実行できる短い箇条書きで、3〜4段階以内にまとめてください。
5. 危険な行為: 避けるべきことを1〜2点示してください。
6. 正確性と注意: 落ち着いた明確な表現を使い、医療に関する回答の最後に「この情報は初期対応を支援するもので、専門的な医療の代わりにはなりません」と記してください。
日本語で簡潔なMarkdown形式で回答してください。
`;

  /**
   * Bộ quy tắc phản xạ ngoại tuyến (Offline Triage Rules)
   * Đảm bảo website phản hồi 100% chính xác ngay cả khi không có Internet hoặc không có API Key
   */
  const OFFLINE_RULES = [
    {
      keywords: ['cpr', 'ngừng tim', 'ngưng tim', 'ép tim', 'hồi sinh tim', 'bất tỉnh không thở'],
      title: '🚨 CẤP CỨU HỒI SINH TIM PHỔI (CPR) & GỌI 115',
      critical: true,
      steps: [
        '**GỌI 115 NGAY LẬP TỨC** hoặc bật loa ngoài để nhân viên y tế hướng dẫn.',
        'Đặt nạn nhân nằm ngửa trên nền cứng, bằng phẳng.',
        'Đặt gót bàn tay vào giữa ngực (nửa dưới xương ức), đan ngón tay còn lại lên trên.',
        '**Ép tim liên tục:** Tốc độ 100 - 120 lần/phút, độ sâu 5 - 6 cm, để ngực nở hoàn toàn sau mỗi lần ép.',
        'Nếu có máy khử rung tim tự động (AED), mở máy và dán bản điện cực theo hướng dẫn giọng nói của máy.'
      ],
      warning: 'KHÔNG dừng ép tim quá 10 giây cho đến khi nhân viên cấp cứu 115 tiếp quản.',
      link: { url: 'topic-detail.html?id=ngung-tuan-hoan-cpr', text: 'Xem quy trình ép tim CPR chi tiết' }
    },
    {
      keywords: ['hóc', 'nghẹn', 'dị vật', 'heimlich', 'tắc thở', 'tắc đường thở'],
      title: '⚠️ XỬ TRÍ HÓC DỊ VẬT ĐƯỜNG THỞ (NGHIỆM PHÁP HEIMLICH)',
      critical: true,
      steps: [
        'Kiểm tra: Nếu nạn nhân ho được, khuyến khích ho mạnh để tống dị vật ra ngoài.',
        'Nếu không ho được, tím tái, không nói được: Thực hiện **5 lần vỗ lưng** dứt khoát bằng gót bàn tay giữa hai xương bả vai.',
        'Nếu chưa ra: Đứng sau lưng, vòng tay ôm eo, đặt nắm tay trên rốn dưới xương ức, giật mạnh **5 lần ép bụng** hướng vào trong và lên trên (Heimlich).',
        'Luân phiên 5 vỗ lưng - 5 ép bụng. Nếu nạn nhân bất tỉnh, đặt nằm xuống và bắt đầu ép tim CPR ngay.'
      ],
      warning: 'TUYỆT ĐỐI KHÔNG dùng tay móc mò dị vật trong họng vì có thể đẩy dị vật vào sâu hơn.',
      link: { url: 'topic-detail.html?id=hoc-di-vat', text: 'Xem hướng dẫn xử trí hóc dị vật' }
    },
    {
      keywords: ['bỏng', 'cháy', 'nước sôi', 'dầu sôi', 'bỏng nhiệt'],
      title: '🔥 SƠ CỨU BỎNG NHIỆT CẤP TỐC',
      critical: false,
      steps: [
        'Đưa nạn nhân ra khỏi nguồn nhiệt ngay lập tức.',
        '**Xả nước mát sạch (15 - 25°C)** chảy nhẹ liên tục lên vùng bỏng trong 15 - 20 phút để hạ nhiệt độ mô da.',
        'Cởi bỏ nhẹ nhàng trang sức, đồng hồ trước khi vết bỏng phù nề (không xé quần áo dính chặt vào vết thương).',
        'Che phủ vết bỏng bằng gạc y tế vô khuẩn hoặc màng bọc thực phẩm sạch, giữ ấm cơ thể và đến cơ sở y tế.'
      ],
      warning: 'KHÔNG dùng đá lạnh buốt chườm trực tiếp, KHÔNG bôi kem đánh răng, mỡ trăn, nước mắm hay chọc vỡ bóng nước.',
      link: { url: 'topic-detail.html?id=bong-nhiet', text: 'Xem quy trình xử trí bỏng nhiệt' }
    },
    {
      keywords: ['chảy máu', 'máu', 'cầm máu', 'vết thương hở', 'đứt tay'],
      title: '🩸 KỸ THUẬT CẦM MÁU KHẨN CẤP',
      critical: false,
      steps: [
        'Dùng gạc vô khuẩn hoặc khăn sạch **ép trực tiếp và liên tục** lên vết thương bằng lực vừa đủ trong ít nhất 5 - 10 phút.',
        'Nâng cao vùng chi bị chảy máu cao hơn vị trí của tim (nếu không nghi ngờ gãy xương).',
        'Băng cố định gạc chặt vừa phải. Nếu máu thấm ướt gạc, đặt thêm lớp gạc mới lên trên chứ không tháo lớp cũ ra.',
        'Nếu máu phun thành tia (đứt động mạch) hoặc không cầm được sau 10 phút: **Gọi 115 ngay**.'
      ],
      warning: 'Chỉ đặt ga-rô khi có chảy máu đe dọa tính mạng ở tay chân hoặc đứt lìa chi, ghi rõ giờ đặt ga-rô.',
      link: { url: 'topic-detail.html?id=chay-mau-va-cam-mau', text: 'Xem kỹ thuật băng ép và cầm máu' }
    },
    {
      keywords: ['sốc nhiệt', 'say nắng', 'nắng nóng', 'thân nhiệt cao'],
      title: '☀️ SƠ CỨU SỐC NHIỆT & SAY NẮNG NGUY CẤP',
      critical: true,
      steps: [
        'Đưa nạn nhân ngay vào nơi râm mát, thoáng gió hoặc phòng điều hòa.',
        'Cởi bớt quần áo dày, nới lỏng thắt lưng.',
        '**Làm mát cấp tốc:** Dùng khăn ướt lau khắp người, bật quạt gió thổi trực tiếp, đặt túi chườm mát vào 2 bên cổ, nách và bẹn.',
        'Nếu nạn nhân tỉnh táo: Cho uống từng ngụm nước mát nhỏ (hoặc nước bù điện giải Oresol).',
        'Nếu nạn nhân lú lẫn, co giật hoặc hôn mê: **Gọi 115 khẩn cấp**.'
      ],
      warning: 'KHÔNG cho uống nước khi nạn nhân đang lơ mơ, hôn mê vì dễ sặc vào phổi.',
      link: { url: 'topic-detail.html?id=soc-nhiet-say-nang', text: 'Xem cẩm nang sốc nhiệt' }
    },
    {
      keywords: ['rắn cắn', 'rắn độc', 'bị cắn'],
      title: '🐍 SƠ CỨU KHI BỊ RẮN ĐỘC CẮN',
      critical: true,
      steps: [
        'Giữ nạn nhân nằm yên, trấn an tinh thần (vận động làm nọc độc lan nhanh vào máu).',
        'Đặt chi bị cắn **thấp hơn tim**.',
        'Rửa nhẹ vết thương bằng nước sạch hoặc xà phòng loãng, tháo bỏ nhẫn, lắc tay chân.',
        'Băng ép cố định bản rộng từ ngón tay/chân lên trên (đối với rắn cắn gây liệt cơ) và nẹp bất động chi.',
        '**Gọi 115 hoặc chuyển ngay tới bệnh viện có huyết thanh kháng nọc.** Nếu an toàn, chụp lại hình dạng con rắn.'
      ],
      warning: 'TUYỆT ĐỐI KHÔNG rạch mổ, không hút nọc độc bằng miệng, không chườm đá và không đắp lá thuốc bừa bãi.',
      link: { url: 'topic-detail.html?id=so-cuu-khi-bi-ran-can-ran-doc', text: 'Xem hướng dẫn rắn cắn' }
    },
    {
      keywords: ['ngất', 'xỉu', 'bất tỉnh'],
      title: '💫 SƠ CỨU KHI GẶP NGƯỜI NGẤT XỈU',
      critical: false,
      steps: [
        'Kiểm tra phản xạ và nhịp thở: Nếu ngừng thở, bắt đầu ép tim CPR ngay.',
        'Nếu còn thở bình thường: Đặt nạn nhân nằm ngửa, nâng 2 chân cao khoảng 20 - 30 cm so với mặt đất để tăng lượng máu về não.',
        'Nới lỏng cổ áo, thắt lưng và giải tán đám đông để có không khí thoáng mát.',
        'Nếu có dấu hiệu nôn ói: Đặt nằm nghiêng an toàn (Recovery position) để chống sặc chất nôn.',
        'Nếu sau 1 - 2 phút nạn nhân chưa tỉnh lại: Gọi 115 ngay.'
      ],
      warning: 'KHÔNG châm kim vào 10 đầu ngón tay, KHÔNG giật tóc hay tát mạnh vào mặt nạn nhân.',
      link: { url: 'topic-detail.html?id=nhung-cach-so-cuu-nguoi-bi-ngat', text: 'Xem kỹ thuật xử trí khi ngất' }
    }
  ];

  /**
   * Bộ quy tắc phản xạ ngoại tuyến tiếng Anh (AHA & ERC Compliant)
   */
  const OFFLINE_RULES_EN = [
    {
      keywords: ['cpr', 'cardiac arrest', 'chest compression', 'heart stop', 'resuscitation', 'unconscious not breathing', 'ngừng tim', 'ngưng tim', 'ép tim'],
      title: '🚨 CPR (CARDIOPULMONARY RESUSCITATION) & CALL EMERGENCY',
      critical: true,
      steps: [
        '**CALL 115 (OR LOCAL EMERGENCY) IMMEDIATELY** or turn on speakerphone for dispatcher guidance.',
        'Place victim on their back on a firm, flat surface.',
        'Place heel of one hand in center of chest (lower half of breastbone), interlock other hand on top.',
        '**Continuous chest compressions:** Rate 100 - 120/min, depth 5 - 6 cm, allow full chest recoil.',
        'If automated external defibrillator (AED) is available, turn on and follow voice prompts.'
      ],
      warning: 'DO NOT stop compressions for more than 10 seconds until emergency medical personnel arrive.',
      link: { url: 'topic-detail.html?id=ngung-tuan-hoan-cpr', text: 'View detailed CPR procedure' }
    },
    {
      keywords: ['choking', 'choke', 'heimlich', 'airway', 'suffocating', 'hóc', 'nghẹn', 'dị vật'],
      title: '⚠️ CHOKING & AIRWAY OBSTRUCTION (HEIMLICH MANEUVER)',
      critical: true,
      steps: [
        'Check: If victim can cough, encourage forceful coughing to expel object.',
        'If unable to cough, turning blue, or cannot speak: Deliver **5 firm back blows** between shoulder blades with heel of hand.',
        'If not dislodged: Stand behind, wrap arms around waist, place fist above navel below breastbone, deliver **5 abdominal thrusts** upward and inward (Heimlich).',
        'Alternate 5 back blows and 5 abdominal thrusts. If victim becomes unconscious, lay flat and start CPR immediately.'
      ],
      warning: 'NEVER perform blind finger sweeps in the throat as this can push the object deeper.',
      link: { url: 'topic-detail.html?id=hoc-di-vat', text: 'View choking first aid procedure' }
    },
    {
      keywords: ['burn', 'burns', 'scald', 'boiling water', 'thermal burn', 'fire', 'bỏng'],
      title: '🔥 EMERGENCY THERMAL BURN FIRST AID',
      critical: false,
      steps: [
        'Remove victim from the heat source immediately.',
        '**Cool under clean running water (15 - 25°C)** for 15 - 20 minutes to reduce skin tissue temperature.',
        'Gently remove jewelry or constrictive items before swelling begins (do not tear clothing stuck to wounds).',
        'Cover with sterile gauze or clean plastic wrap, keep warm, and seek medical care.'
      ],
      warning: 'DO NOT apply ice directly, DO NOT use toothpaste, fish sauce, or lard, and never puncture blisters.',
      link: { url: 'topic-detail.html?id=bong-nhiet', text: 'View thermal burn procedure' }
    },
    {
      keywords: ['bleeding', 'bleed', 'blood', 'wound', 'cut', 'hemorrhage', 'chảy máu', 'cầm máu'],
      title: '🩸 EMERGENCY BLEEDING CONTROL',
      critical: false,
      steps: [
        'Apply **firm, direct and continuous pressure** over the wound with sterile gauze or clean cloth for at least 5 - 10 minutes.',
        'Elevate injured limb above heart level (unless fracture suspected).',
        'Secure dressing snugly. If blood soaks through, add another layer on top—do not remove initial dressing.',
        'If blood is spurting (arterial) or bleeding does not stop after 10 minutes: **Call 115 immediately**.'
      ],
      warning: 'Apply tourniquet only for life-threatening limb hemorrhage or traumatic amputation; note exact application time.',
      link: { url: 'topic-detail.html?id=chay-mau-va-cam-mau', text: 'View bleeding control procedure' }
    },
    {
      keywords: ['heat stroke', 'heatstroke', 'sunstroke', 'hyperthermia', 'sốc nhiệt', 'say nắng'],
      title: '☀️ HEAT STROKE & SUNSTROKE EMERGENCY FIRST AID',
      critical: true,
      steps: [
        'Move victim immediately to a cool, shaded, or air-conditioned area.',
        'Loosen or remove excess tight clothing.',
        '**Aggressive cooling:** Sponge with cool water, fan continuously, place ice packs on neck, axillae (armpits), and groin.',
        'If conscious and alert: Offer small sips of cool water or electrolyte solution.',
        'If confused, vomiting, seizing, or unconscious: **Call 115 immediately**.'
      ],
      warning: 'DO NOT give fluids if victim is drowsy, confused, or unconscious due to aspiration risk.',
      link: { url: 'topic-detail.html?id=soc-nhiet-say-nang', text: 'View heat stroke handbook' }
    },
    {
      keywords: ['snake bite', 'snakebite', 'venomous', 'snake', 'rắn cắn', 'rắn độc'],
      title: '🐍 VENOMOUS SNAKE BITE FIRST AID',
      critical: true,
      steps: [
        'Keep victim calm and completely still (movement speeds venom circulation).',
        'Keep bitten limb **below heart level**.',
        'Gently clean wound with clean water or mild soap; remove tight jewelry and rings.',
        'Apply broad pressure immobilization bandage from fingers/toes upwards and splint limb.',
        '**Call 115 or transfer immediately to hospital with antivenom.** Take a photo of the snake if safe.'
      ],
      warning: 'NEVER cut the wound, suck venom by mouth, apply ice, or apply herbal pastes.',
      link: { url: 'topic-detail.html?id=so-cuu-khi-bi-ran-can-ran-doc', text: 'View snake bite guide' }
    },
    {
      keywords: ['faint', 'fainting', 'syncope', 'collapsed', 'ngất', 'xỉu', 'bất tỉnh'],
      title: '💫 FIRST AID FOR FAINTING (SYNCOPE)',
      critical: false,
      steps: [
        'Check responsiveness and breathing: If not breathing, start CPR immediately.',
        'If breathing normally: Lay victim on back, elevate legs 20 - 30 cm (8 - 12 in) to increase blood flow to brain.',
        'Loosen collar, belts, and disperse crowd for fresh airflow.',
        'If vomiting or nauseated: Place in recovery position to protect airway.',
        'If victim does not regain consciousness within 1 - 2 minutes: Call 115 immediately.'
      ],
      warning: 'DO NOT prick fingertips with needles, do not pull hair, and do not slap victim.',
      link: { url: 'topic-detail.html?id=nhung-cach-so-cuu-nguoi-bi-ngat', text: 'View fainting procedure' }
    }
  ];

  /**
   * Phân tích nội dung tệp .env (KEY=VALUE)
   * @param {string} text
   * @returns {Record<string, string>}
   */
  function parseEnvText(text) {
    const result = {};
    if (!text) return result;
    const lines = text.split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIndex = line.indexOf('=');
      if (eqIndex === -1) continue;
      const key = line.slice(0, eqIndex).trim();
      let value = line.slice(eqIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1).trim();
      }
      if (key) result[key] = value;
    }
    return result;
  }

  /**
   * Nạp cấu hình Gemini API:
   * 1. Ưu tiên kiểm tra Vercel Serverless Function (/api/chat) bảo mật key phía server
   * 2. Fallback sang tệp env.local / .env cho môi trường máy cục bộ (VS Code Live Server, Python http.server)
   * @param {boolean} [forceReload=false]
   * @returns {Promise<{apiKey: string, defaultModel: string}>}
   */
  async function loadEnvConfig(forceReload = false) {
    if (envLoadPromise && !forceReload) return envLoadPromise;
    envLoadPromise = (async () => {
      // 1. Kiểm tra Vercel Serverless Function (/api/chat)
      try {
        const apiRes = await fetch('api/chat', { cache: 'no-store' });
        if (apiRes.ok) {
          const contentType = apiRes.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const apiData = await apiRes.json();
            if (apiData && apiData.configured) {
              isVercelServerless = true;
              envConfig = {
                apiKey: 'vercel-serverless-managed',
                defaultModel: apiData.defaultModel || 'gemini-3.5-flash-lite'
              };
              return envConfig;
            }
          }
        }
      } catch (_) {
        // Chạy môi trường tĩnh không hỗ trợ serverless /api/chat
      }

      // 2. Fallback cho môi trường Local: đọc env.local hoặc .env
      const candidates = ['env.local', '.env'];
      for (const file of candidates) {
        try {
          const res = await fetch(file, { cache: 'no-store' });
          if (!res.ok) continue;
          const text = await res.text();
          const parsed = parseEnvText(text);
          const rawKey = (parsed.GEMINI_API_KEY || '').trim();
          const apiKey = rawKey && rawKey !== 'your_gemini_api_key_here' ? rawKey : '';
          const defaultModel = (parsed.GEMINI_DEFAULT_MODEL || '').trim();
          if (apiKey || defaultModel) {
            envConfig = { apiKey, defaultModel: defaultModel || 'gemini-3.5-flash-lite' };
            return envConfig;
          }
        } catch (_) {
          // Thử nguồn tiếp theo hoặc chuyển sang chế độ ngoại tuyến
        }
      }
      console.warn('[MedFA Chatbot] Chưa cấu hình API Key trên Vercel hoặc env.local. Dùng chế độ ngoại tuyến.');
      return envConfig;
    })();
    return envLoadPromise;
  }

  /**
   * Lấy mô hình Gemini hiện đang chọn (ưu tiên localStorage, nếu không có dùng GEMINI_DEFAULT_MODEL từ .env/Vercel)
   * @returns {string}
   */
  function getSelectedModel() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MODEL);
      if (saved && saved.trim()) return saved.trim();
    } catch (_) {}
    return envConfig.defaultModel || 'gemini-3.5-flash-lite';
  }

  /**
   * Lưu mô hình Gemini được chọn vào LocalStorage
   * @param {string} modelId
   * @returns {boolean}
   */
  function setSelectedModel(modelId) {
    const clean = (modelId || '').trim();
    try {
      if (!clean) {
        localStorage.removeItem(STORAGE_KEY_MODEL);
        return false;
      }
      localStorage.setItem(STORAGE_KEY_MODEL, clean);
      return true;
    } catch (_) {
      return false;
    }
  }

  /**
   * Đặt lại mô hình về mặc định theo .env
   */
  function resetSelectedModel() {
    try {
      localStorage.removeItem(STORAGE_KEY_MODEL);
    } catch (_) {}
  }

  /**
   * Lấy tên hiển thị của mô hình
   * @param {string} modelId
   * @returns {string}
   */
  function getModelLabel(modelId) {
    const found = AVAILABLE_MODELS.find(m => m.id === modelId);
    return found ? found.label : (modelId || 'Gemini');
  }

  /**
   * Lấy ngôn ngữ hiện hành ('vi', 'en' hoặc 'ja')
   * @returns {'vi'|'en'|'ja'}
   */
  function getCurrentLang() {
    const lang = typeof window !== 'undefined' && window.I18n && window.I18n.getLanguage
      ? window.I18n.getLanguage()
      : 'vi';
    return lang === 'en' || lang === 'ja' ? lang : 'vi';
  }

  /**
   * Chuẩn hóa chuỗi (bỏ dấu tiếng Việt, chữ thường, bỏ ký tự đặc biệt)
   * @param {string} str
   * @returns {string}
   */
  function normalizeText(str) {
    return String(str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Các từ đệm / xã giao phổ biến không mang nghĩa y khoa để tránh khớp nhầm bài
  const STOP_WORDS = new Set([
    'xin', 'chao', 'alo', 'hello', 'hi', 'hey', 'bye', 'thanks', 'thank', 'cam', 'on', 'ok', 'oke',
    'la', 'gi', 'sao', 'the', 'nao', 'khi', 'bi', 'thi', 'con', 'va', 'hay', 'hoac', 'cho', 'voi',
    'cua', 'can', 'phai', 'lam', 'xu', 'ly', 'tri', 'cach', 'huong', 'dan', 'so', 'cuu', 'cap',
    'nguoi', 'toi', 'ban', 'minh', 'neu', 'co', 'khong', 'duoc', 'o', 'tai', 'tren', 'duoi',
    'nha', 'nhe', 'roi', 'oi', 'anh', 'chi', 'em', 'nay', 'kia', 'nay', 'giup', 'hoi', 've',
    'what', 'how', 'when', 'if', 'is', 'are', 'to', 'do', 'for', 'with', 'the', 'a', 'an', 'of',
    'and', 'or', 'in', 'on', 'about', 'help', 'first', 'aid', 'someone', 'person', 'gets', 'get'
  ]);

  const GREETING_PATTERNS = /^(xin chao|chao|chao ban|chao ad|chao bot|hello|hi|hey|alo|good morning|good afternoon|good evening)$/;

  function tokenize(str) {
    return normalizeText(str)
      .split(' ')
      .filter(w => w.length >= 2 && !STOP_WORDS.has(w));
  }

  /**
   * Kiểm tra khoảng cách chỉnh sửa <= 1 (giúp bắt lỗi gõ thiếu/nhầm 1 ký tự như "bỏn" -> "bỏng")
   * @param {string} a
   * @param {string} b
   * @returns {boolean}
   */
  function isEditDistanceAtMost1(a, b) {
    if (a === b) return true;
    const lenDiff = Math.abs(a.length - b.length);
    if (lenDiff > 1) return false;
    let i = 0, j = 0, edits = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) {
        i++; j++;
      } else {
        edits++;
        if (edits > 1) return false;
        if (a.length > b.length) i++;
        else if (b.length > a.length) j++;
        else { i++; j++; }
      }
    }
    if (i < a.length || j < b.length) edits++;
    return edits <= 1;
  }

  /**
   * Nạp và cache danh sách bài học từ thư viện theo ngôn ngữ
   * @param {'vi'|'en'|'ja'} [lang]
   * @returns {Promise<Array>}
   */
  async function loadLibraryTopics(lang = getCurrentLang()) {
    const targetLang = lang === 'en' || lang === 'ja' ? lang : 'vi';
    if (topicsCacheByLang[targetLang]) return topicsCacheByLang[targetLang];
    if (topicsPromiseByLang[targetLang]) return topicsPromiseByLang[targetLang];

    const url = targetLang === 'vi' ? 'data/topics.json' : `data/${targetLang}/topics.json`;
    topicsPromiseByLang[targetLang] = (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          topicsCacheByLang[targetLang] = data;
          return data;
        }
      } catch (_) {
        // Chỉ dùng dữ liệu tiếng Việt dự phòng cho giao diện tiếng Việt.
        if (targetLang === 'vi' && typeof window !== 'undefined' && window.DataLoader && Array.isArray(window.DataLoader.FALLBACK_TOPICS)) {
          return window.DataLoader.FALLBACK_TOPICS;
        }
      }
      return [];
    })();

    return topicsPromiseByLang[targetLang];
  }

  function hasVietnameseDiacritics(str) {
    return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(String(str || ''));
  }

  function tokenizeRaw(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .filter(Boolean);
  }

  function getJapaneseBigrams(value) {
    const characters = Array.from(value.replace(/\s+/g, ''));
    const bigrams = new Set();
    for (let index = 0; index < characters.length - 1; index++) {
      bigrams.add(characters[index] + characters[index + 1]);
    }
    return [...bigrams];
  }

  /**
   * Tìm tối đa top N bài viết liên quan nhất trong thư viện (chỉ đọc ít bài liên quan thay vì nhồi hết 33 bài)
   * Có phân biệt dấu thanh khi người dùng gõ có dấu (tránh "sứa" khớp nhầm "sữa"), vẫn hỗ trợ gõ không dấu.
   * @param {string} query
   * @param {Array} topics
   * @param {number} [maxResults=3]
   * @returns {Array}
   */
  function findRelevantTopics(query, topics, maxResults = 3) {
    if (!query || !Array.isArray(topics) || topics.length === 0) return [];
    const normQuery = normalizeText(query);
    const japaneseBigrams = getCurrentLang() === 'ja' ? getJapaneseBigrams(normQuery) : [];
    const rawQueryTokens = tokenizeRaw(query).filter(w => {
      const n = normalizeText(w);
      return n.length >= 2 && !STOP_WORDS.has(n);
    });
    if (rawQueryTokens.length === 0) return [];

    const scored = [];
    for (const topic of topics) {
      const titleRaw = `${topic.title || ''} ${topic.fullTitle || ''}`;
      const descRaw = `${topic.shortDesc || ''} ${topic.lead || ''} ${topic.categoryLabel || ''}`;
      const titleNorm = normalizeText(titleRaw);
      const titleRawTokens = tokenizeRaw(titleRaw);
      const descRawTokens = tokenizeRaw(descRaw);

      let score = 0;

      // Khớp nguyên cụm tiêu đề
      if (titleNorm && normQuery.length >= 4 && (normQuery.includes(titleNorm) || titleNorm.includes(normQuery))) {
        score += 12;
      }

      for (const rawQt of rawQueryTokens) {
        const qt = normalizeText(rawQt);
        const qtHasAccent = hasVietnameseDiacritics(rawQt);

        // Khớp trong tiêu đề (trọng số cao nhất)
        let titleHit = 0;
        for (const rawTt of titleRawTokens) {
          const tt = normalizeText(rawTt);
          if (qtHasAccent) {
            // Người dùng gõ có dấu: so khớp tôn trọng dấu thanh (vd: "sứa" != "sữa", nhưng "bỏn" khớp "bỏng")
            if (rawTt === rawQt) {
              titleHit = Math.max(titleHit, 6);
            } else if (rawQt.length >= 3 && rawTt.startsWith(rawQt) && rawTt.length - rawQt.length <= 1) {
              titleHit = Math.max(titleHit, 4.5);
            } else if (qt.length >= 5 && tt.length >= 5 && isEditDistanceAtMost1(qt, tt)) {
              titleHit = Math.max(titleHit, 4);
            }
          } else {
            // Người dùng gõ không dấu hoặc tiếng Anh
            if (tt === qt) {
              titleHit = Math.max(titleHit, 6);
            } else if (qt.length >= 3 && tt.startsWith(qt) && tt.length - qt.length <= 1) {
              titleHit = Math.max(titleHit, 4.5);
            } else if (qt.length >= 4 && tt.includes(qt)) {
              titleHit = Math.max(titleHit, 4.5);
            } else if (qt.length >= 5 && tt.length >= 5 && isEditDistanceAtMost1(qt, tt)) {
              titleHit = Math.max(titleHit, 4);
            }
          }
        }
        score += titleHit;

        // Khớp trong mô tả ngắn / lead
        let descHit = 0;
        for (const rawDt of descRawTokens) {
          const dt = normalizeText(rawDt);
          if (qtHasAccent) {
            if (rawDt === rawQt) descHit = Math.max(descHit, 2);
          } else {
            if (dt === qt) {
              descHit = Math.max(descHit, 2);
            } else if (qt.length >= 4 && dt.includes(qt)) {
              descHit = Math.max(descHit, 1.5);
            } else if (qt.length >= 5 && dt.length >= 5 && isEditDistanceAtMost1(qt, dt)) {
              descHit = Math.max(descHit, 1);
            }
          }
        }
        score += descHit;
      }

      if (japaneseBigrams.length > 0) {
        const titleHits = japaneseBigrams.filter(bigram => titleNorm.includes(bigram)).length;
        const descNorm = normalizeText(descRaw);
        const descHits = japaneseBigrams.filter(bigram => descNorm.includes(bigram)).length;
        score += Math.min(titleHits * 2.5, 10) + Math.min(descHits * 0.75, 2);
      }

      if (score >= 4.5) {
        scored.push({ topic, score });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, maxResults).map(item => item.topic);
  }

  /**
   * Tạo ngữ cảnh rút gọn (chỉ 2-3 bài liên quan nhất) để gửi kèm cho Gemini, tiết kiệm token
   * @param {Array} matchedTopics
   * @param {'vi'|'en'|'ja'} lang
   * @returns {string}
   */
  function buildCompactTopicsContext(matchedTopics, lang) {
    if (!matchedTopics || matchedTopics.length === 0) return '';
    const isEn = lang === 'en';
    const header = isEn
      ? '[RELATED MEDFA LIBRARY ARTICLES]'
      : lang === 'ja'
        ? '[MEDFAライブラリの関連記事]'
        : '[TÀI LIỆU THƯ VIỆN MEDFA LIÊN QUAN]';

    const blocks = matchedTopics.slice(0, 2).map((t, idx) => {
      const stepsSummary = (t.steps || [])
        .slice(0, 4)
        .map(s => `  ${s.stepNumber || ''}. ${s.title}: ${s.desc}`)
        .join('\n');
      const dontsSummary = (t.donts || []).slice(0, 2).join('; ');
      return [
        `${idx + 1}. ${t.title} (${t.fullTitle || t.title})`,
        t.emergencyAlert ? `   - Alert: ${t.emergencyAlert}` : '',
        stepsSummary ? `   - Steps:\n${stepsSummary}` : '',
        dontsSummary ? `   - Avoid: ${dontsSummary}` : ''
      ].filter(Boolean).join('\n');
    });

    return `${header}\n${blocks.join('\n\n')}`;
  }

  /**
   * Tạo khối gợi ý liên kết trực tiếp tới các bài liên quan trong Thư viện MedFA
   * @param {Array} matchedTopics
   * @param {'vi'|'en'|'ja'} lang
   * @returns {string}
   */
  function renderTopicSuggestionsHtml(matchedTopics, lang) {
    if (!matchedTopics || matchedTopics.length === 0) return '';
    const isEn = lang === 'en';
    const heading = isEn
      ? 'Related guides in MedFA Library:'
      : lang === 'ja'
        ? 'MedFAライブラリの関連ガイド:'
        : 'Bài viết liên quan trong Thư viện MedFA:';

    const linksHtml = matchedTopics.map(t => `
      <a href="topic-detail.html?id=${encodeURIComponent(t.id)}" class="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-primary/10 border border-outline-variant/30 transition-colors text-xs text-primary font-semibold group">
        <span class="truncate">${escapeHTML(t.title)}</span>
        <span class="material-symbols-outlined text-[14px] shrink-0 group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
      </a>
    `).join('');

    return `
      <div class="mt-2.5 pt-2.5 border-t border-outline-variant/25 flex flex-col gap-1.5">
        <span class="text-[11px] font-bold text-on-surface-variant flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px] text-secondary">menu_book</span>
          <span>${heading}</span>
        </span>
        <div class="flex flex-col gap-1">
          ${linksHtml}
        </div>
      </div>
    `;
  }

  /**
   * Render câu trả lời ngoại tuyến trực tiếp từ bài học khớp nhất trong thư viện 33 bài (song ngữ)
   * @param {Array} matchedTopics
   * @param {'vi'|'en'|'ja'} lang
   * @returns {string}
   */
  function renderOfflineTopicHtml(matchedTopics, lang) {
    const primary = matchedTopics[0];
    const isEn = lang === 'en';
    const isCritical = primary.criticalLevel === 'critical' || primary.criticalLevel === 'high';
    const stepsHtml = (primary.steps || []).slice(0, 4).map(s => `
      <li class="flex items-start gap-2">
        <span class="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check_circle</span>
        <span><strong>${escapeHTML(s.title)}:</strong> ${escapeHTML(s.desc)}</span>
      </li>
    `).join('');

    const warningText = (primary.donts && primary.donts.length > 0)
      ? primary.donts[0]
      : '';
    const warningLabel = isEn ? 'Avoid:' : lang === 'ja' ? '避けること:' : 'Lưu ý tránh:';

    return `
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <span class="font-bold ${isCritical ? 'text-error' : 'text-primary'} text-sm">${escapeHTML(primary.fullTitle || primary.title)}</span>
        </div>
        ${primary.emergencyAlert ? `
          <div class="p-2 rounded-lg bg-error-container/25 border border-error/30 text-[11px] text-error font-semibold">
            🚨 ${escapeHTML(primary.emergencyAlert)}
          </div>
        ` : ''}
        ${stepsHtml ? `<ul class="flex flex-col gap-1.5 text-xs text-on-surface my-1">${stepsHtml}</ul>` : ''}
        ${warningText ? `
          <div class="p-2 rounded-lg bg-error-container/15 border border-error/20 text-[11px] text-error font-medium flex items-start gap-1.5">
            <span class="material-symbols-outlined text-[15px] shrink-0">warning</span>
            <span><strong>${warningLabel}</strong> ${escapeHTML(warningText)}</span>
          </div>
        ` : ''}
        ${renderTopicSuggestionsHtml(matchedTopics, lang)}
      </div>
    `;
  }

  /**
   * Trả lời bằng quy tắc ngoại tuyến (ưu tiên thư viện 33 bài theo ngôn ngữ, sau đó fallback 7 bộ quy tắc nội bộ)
   * @param {string} query 
   * @param {Array} [matchedTopics=[]]
   * @returns {string} HTML response
   */
  function generateOfflineResponse(query, matchedTopics = []) {
    const lang = getCurrentLang();
    const isEn = lang === 'en';
    const isJa = lang === 'ja';
    const q = normalizeText(query);

    // 0. Phản hồi tự nhiên cho câu chào hỏi ngắn
    if (GREETING_PATTERNS.test(q)) {
      if (isEn) {
        return `
          <div class="flex flex-col gap-1.5 text-xs leading-relaxed">
            <p class="font-semibold text-primary">Hello! I'm the MedFA First Aid Assistant 🩺</p>
            <p>Tell me the emergency or first aid situation you need help with (e.g., <em>burns, choking, bleeding, CPR, snakebite, fainting</em>), and I'll guide you step by step.</p>
          </div>
        `;
      }
      if (isJa) {
        return `
          <div class="flex flex-col gap-1.5 text-xs leading-relaxed">
            <p class="font-semibold text-primary">こんにちは。MedFA応急手当アシスタントです 🩺</p>
            <p>どのような応急手当が必要ですか？やけど、窒息、出血、CPR、熱中症などの状況を教えてください。</p>
          </div>
        `;
      }
      return `
        <div class="flex flex-col gap-1.5 text-xs leading-relaxed">
          <p class="font-semibold text-primary">Xin chào bạn! Mình là Trợ lý Sơ cấp cứu MedFA 🩺</p>
          <p>Bạn đang cần hướng dẫn xử trí tình huống nào? Hãy nhập triệu chứng hoặc tai nạn (vd: <em>bỏng nhiệt, hóc dị vật, chảy máu, ép tim CPR, rắn cắn, ngất xỉu...</em>) để mình hỗ trợ ngay nhé!</p>
        </div>
      `;
    }

    // 1. Ưu tiên trả lời trực tiếp từ thư viện 33 bài (đúng ngôn ngữ hiện hành)
    if (Array.isArray(matchedTopics) && matchedTopics.length > 0) {
      return renderOfflineTopicHtml(matchedTopics, lang);
    }
    
    // 2. Fallback về 7 quy tắc phản xạ nội bộ nếu chưa tải được topics.json (ví dụ mở file://)
    const primaryRules = isEn ? OFFLINE_RULES_EN : isJa ? [] : OFFLINE_RULES;
    const secondaryRules = isEn || isJa ? [] : OFFLINE_RULES_EN;

    let matchedRule = primaryRules.find(rule =>
      rule.keywords.some(keyword => q.includes(normalizeText(keyword)))
    );
    if (!matchedRule) {
      matchedRule = secondaryRules.find(rule =>
        rule.keywords.some(keyword => q.includes(normalizeText(keyword)))
      );
    }

    if (matchedRule) {
      const stepsHtml = matchedRule.steps.map(step => {
        // Simple markdown bold converter
        const formatted = step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return `<li class="flex items-start gap-2"><span class="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check_circle</span><span>${formatted}</span></li>`;
      }).join('');

      const warningLabel = isEn ? 'Note:' : isJa ? '注意:' : 'Lưu ý:';

      return `
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="font-bold ${matchedRule.critical ? 'text-error' : 'text-primary'} text-sm">${matchedRule.title}</span>
          </div>
          <ul class="flex flex-col gap-1.5 text-xs text-on-surface my-1">
            ${stepsHtml}
          </ul>
          ${matchedRule.warning ? `
            <div class="p-2 rounded-lg bg-error-container/20 border border-error/20 text-[11px] text-error font-medium flex items-start gap-1.5">
              <span class="material-symbols-outlined text-[15px] shrink-0">warning</span>
              <span><strong>${warningLabel}</strong> ${matchedRule.warning}</span>
            </div>
          ` : ''}
          ${matchedRule.link ? `
            <a href="${matchedRule.link.url}" class="inline-flex items-center gap-1 text-xs text-secondary font-bold hover:underline mt-1">
              <span>${matchedRule.link.text}</span>
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          ` : ''}
        </div>
      `;
    }

    if (isJa) {
      return `
        <div class="flex flex-col gap-2 text-xs leading-relaxed">
          <p>MedFAで質問を受け付けました: <em>"${escapeHTML(query)}"</em></p>
          <p>緊急時は、まず周囲の安全を確認し、地域の救急サービスへ連絡してください。ベトナムでは115、日本では119です。</p>
          <ul class="list-disc pl-4 space-y-1">
            <li>標準的な手順は<a href="topics.html" class="text-primary font-bold underline">応急手当ライブラリ</a>で確認できます。</li>
            <li><a href="flashcards.html" class="text-secondary font-bold underline">フラッシュカード</a>や<a href="quiz.html" class="text-tertiary font-bold underline">シナリオクイズ</a>で知識を確認できます。</li>
          </ul>
        </div>
      `;
    }

    // Phản hồi chung khi không khớp từ khóa
    if (isEn) {
      return `
        <div class="flex flex-col gap-2 text-xs leading-relaxed">
          <p>MedFA received your reflex emergency query: <em>"${escapeHTML(query)}"</em></p>
          <p>To preserve life during the <strong>"Golden 4 Minutes"</strong>:</p>
          <ul class="list-disc pl-4 space-y-1">
            <li>If victim is unconscious and not breathing: <strong class="text-error">CALL 115 / 911 IMMEDIATELY</strong> and begin chest compressions (CPR).</li>
            <li>Explore standardized step-by-step procedures in the <a href="topics.html" class="text-primary font-bold underline">First Aid Library</a>.</li>
            <li>Sharpen your reflexes with <a href="flashcards.html" class="text-secondary font-bold underline">Flashcards</a> or the <a href="quiz.html" class="text-tertiary font-bold underline">Scenario Quiz</a>.</li>
          </ul>
        </div>
      `;
    }

    return `
      <div class="flex flex-col gap-2 text-xs leading-relaxed">
        <p>MedFA đã tiếp nhận câu hỏi phản xạ: <em>"${escapeHTML(query)}"</em></p>
        <p>Để đảm bảo an toàn tính mạng trong <strong>"4 Phút Vàng"</strong>:</p>
        <ul class="list-disc pl-4 space-y-1">
          <li>Nếu nạn nhân bất tỉnh, ngừng thở: <strong class="text-error">GỌI 115 NGAY LẬP TỨC</strong> và ép tim CPR liên tục.</li>
          <li>Bạn có thể tra cứu nhanh quy trình chuẩn từng bước trong <a href="topics.html" class="text-primary font-bold underline">Thư viện sơ cấp cứu</a>.</li>
          <li>Thử phản xạ kiến thức với <a href="flashcards.html" class="text-secondary font-bold underline">Flashcard</a> hoặc <a href="quiz.html" class="text-tertiary font-bold underline">Bài thi trắc nghiệm</a>.</li>
        </ul>
      </div>
    `;
  }

  /**
   * Gọi Vercel Serverless Function /api/chat (Bảo mật API Key ở server Vercel)
   * @param {string} prompt 
   * @param {string} model 
   * @param {{ lang?: 'vi'|'en'|'ja', topicsContext?: string }} [options={}]
   * @returns {Promise<string>}
   */
  async function callVercelChatApi(prompt, model, options = {}) {
    const lang = options.lang === 'en' || options.lang === 'ja' ? options.lang : 'vi';
    const payload = {
      prompt,
      model,
      lang,
      topicsContext: options.topicsContext || '',
      history: chatHistory
    };

    const response = await fetch('api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const msg = errorData.error || `HTTP ${response.status}`;
      throw new Error(msg);
    }

    const data = await response.json();
    if (!data.text) {
      throw new Error('Mô hình Gemini không trả về nội dung.');
    }
    return data.text;
  }

  /**
   * Gọi REST API Google Gemini với model động + ngữ cảnh rút gọn từ thư viện + lịch sử ngắn
   * @param {string} prompt 
   * @param {string} apiKey 
   * @param {string} model
   * @param {{ lang?: 'vi'|'en'|'ja', topicsContext?: string }} [options={}]
   * @returns {Promise<string>}
   */
  async function callGeminiApi(prompt, apiKey, model, options = {}) {
    if (!model) {
      throw new Error('Chưa cấu hình mô hình Gemini (GEMINI_DEFAULT_MODEL trong .env hoặc chọn trong Cài đặt).');
    }
    const lang = options.lang === 'en' || options.lang === 'ja' ? options.lang : 'vi';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const userPromptWithContext = options.topicsContext
      ? `${options.topicsContext}\n\n${lang === 'en' ? 'User question' : lang === 'ja' ? '質問' : 'Câu hỏi người dùng'}: ${prompt}`
      : prompt;

    const contents = [
      ...chatHistory,
      {
        role: 'user',
        parts: [{ text: userPromptWithContext }]
      }
    ];

    const body = {
      contents,
      systemInstruction: {
        parts: [{ text: lang === 'en' ? SYSTEM_INSTRUCTION_EN : lang === 'ja' ? SYSTEM_INSTRUCTION_JA : SYSTEM_INSTRUCTION }]
      },
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 2048,
        topP: 0.8
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const msg = errorData.error?.message || `HTTP ${response.status}`;
      throw new Error(msg);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error('Mô hình Gemini không trả về nội dung.');
    }

    return candidateText;
  }

  /**
   * Chuyển đổi Markdown cơ bản sang HTML an toàn
   * @param {string} md 
   * @returns {string}
   */
  function formatMarkdownToHTML(md) {
    if (!md) return '';
    let html = escapeHTML(md);

    // Tiêu đề ###
    html = html.replace(/^### (.*$)/gim, '<h4 class="font-bold text-primary text-xs mt-2 mb-1">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 class="font-bold text-primary text-sm mt-2 mb-1">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 class="font-extrabold text-primary text-sm mt-2 mb-1">$1</h2>');

    // Bold **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic *text*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Bullet points: Gom các <li> liên tiếp vào trong <ul> hợp chuẩn HTML5 thay vì để <li> rời rạc
    html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li class="flex items-start gap-1.5 my-0.5"><span class="material-symbols-outlined text-primary text-[14px] shrink-0 mt-0.5">check_small</span><span>$1</span></li>');
    html = html.replace(/(?:<li[\s\S]*?<\/li>\n?)+/g, match => `<ul class="space-y-1 my-1">${match.replace(/\n/g, '')}</ul>`);

    // Replace newlines with breaks outside list
    html = html.replace(/\n\n/g, '<div class="h-2"></div>');
    html = html.replace(/\n/g, '<br/>');

    return html;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  /**
   * Thêm một bong bóng tin nhắn vào khung chat
   * @param {string} sender 'user' | 'bot'
   * @param {string} htmlContent 
   * @param {boolean} isLiveGemini 
   * @param {string} [modelId='']
   */
  function appendMessage(sender, htmlContent, isLiveGemini = false, modelId = '') {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const row = document.createElement('div');
    if (sender === 'user') {
      row.className = 'flex items-start justify-end gap-2 max-w-[90%] self-end';
      row.innerHTML = `
        <div class="bg-primary text-on-primary p-3 rounded-2xl rounded-tr-sm text-body-sm shadow-sm">
          <p>${escapeHTML(htmlContent)}</p>
        </div>
      `;
    } else {
      const liveBadgeText = modelId
        ? `${escapeHTML(getModelLabel(modelId))} Live`
        : (typeof window !== 'undefined' && window.t ? window.t('chat.geminiLive') : 'Gemini Live');
      const offlineBadgeText = typeof window !== 'undefined' && window.t ? window.t('chat.offlineReflex') : 'Bộ Phản Xạ Y Tế';

      row.className = 'flex items-start gap-2.5 max-w-[95%]';
      row.innerHTML = `
        <div class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
          <span class="material-symbols-outlined text-[16px]">${isLiveGemini ? 'psychology' : 'smart_toy'}</span>
        </div>
        <div class="flex flex-col items-start gap-1 flex-1">
          <div class="bg-surface-container-lowest text-on-surface p-3.5 rounded-2xl rounded-tl-sm border border-outline-variant/30 shadow-sm text-body-sm leading-relaxed w-full">
            ${htmlContent}
          </div>
          <div class="flex items-center gap-1.5 ml-1">
            <span class="text-[10px] text-on-surface-variant/60 font-medium" data-i18n="chat.justNow">${typeof window !== 'undefined' && window.t ? window.t('chat.justNow') : 'Vừa xong'}</span>
            <span class="text-[9px] px-1.5 py-0.5 rounded font-bold ${isLiveGemini ? 'bg-secondary-container/40 text-secondary' : 'bg-surface-container-high text-on-surface-variant'}" ${isLiveGemini ? '' : 'data-i18n="chat.offlineReflex"'}>
              ${isLiveGemini ? liveBadgeText : offlineBadgeText}
            </span>
          </div>
        </div>
      `;
    }

    container.appendChild(row);
    container.scrollTop = container.scrollHeight;
  }

  /**
   * Hiển thị chỉ báo AI đang suy nghĩ
   * @returns {HTMLElement}
   */
  function showThinkingIndicator() {
    const container = document.getElementById('chat-messages-container');
    if (!container) return null;

    const indicator = document.createElement('div');
    indicator.id = 'chat-thinking-indicator';
    indicator.className = 'flex items-center gap-2 max-w-[80%] text-xs text-on-surface-variant bg-surface-container-high/60 px-3 py-2 rounded-xl';
    indicator.innerHTML = `
      <div class="w-2 h-2 rounded-full bg-primary animate-ping"></div>
      <span class="font-medium" data-i18n="chat.thinking">${(typeof I18n !== 'undefined' && I18n.t) ? I18n.t('chat.thinking') : 'Đang tra cứu phản xạ y tế AHA/ERC...'}</span>
    `;
    container.appendChild(indicator);
    container.scrollTop = container.scrollHeight;
    return indicator;
  }

  /**
   * Xử lý gửi tin nhắn từ người dùng
   * @param {string} query 
   */
  async function handleUserQuery(query) {
    if (!query || !query.trim()) return;
    const cleanQuery = query.trim();

    // 1. Thêm tin nhắn của User
    appendMessage('user', cleanQuery);

    // 2. Hiện trạng thái đang suy nghĩ
    const thinkingEl = showThinkingIndicator();

    const lang = getCurrentLang();
    const [, topics] = await Promise.all([loadEnvConfig(), loadLibraryTopics(lang)]);
    const matchedTopics = findRelevantTopics(cleanQuery, topics, 3);
    const topicsContext = buildCompactTopicsContext(matchedTopics, lang);
    const suggestionsHtml = renderTopicSuggestionsHtml(matchedTopics, lang);

    const apiKey = envConfig.apiKey;
    const activeModel = getSelectedModel() || envConfig.defaultModel || 'gemini-3.5-flash-lite';
    let finalHtml = '';
    let isLiveGemini = false;

    if ((isVercelServerless || (apiKey && apiKey !== 'vercel-serverless-managed')) && activeModel) {
      try {
        const geminiText = isVercelServerless
          ? await callVercelChatApi(cleanQuery, activeModel, { lang, topicsContext })
          : await callGeminiApi(cleanQuery, apiKey, activeModel, { lang, topicsContext });
        finalHtml = formatMarkdownToHTML(geminiText) + suggestionsHtml;
        isLiveGemini = true;

        // Cập nhật lịch sử hội thoại ngắn (chỉ lưu câu hỏi gọn và câu trả lời)
        chatHistory.push(
          { role: 'user', parts: [{ text: cleanQuery }] },
          { role: 'model', parts: [{ text: geminiText }] }
        );
        if (chatHistory.length > MAX_HISTORY_TURNS * 2) {
          chatHistory = chatHistory.slice(-MAX_HISTORY_TURNS * 2);
        }
      } catch (err) {
        console.warn(`[MedFA Chatbot] Lỗi gọi Gemini AI (${activeModel}), chuyển sang chế độ phản xạ y khoa nội bộ:`, err.message);
        const fallbackBanner = lang === 'en'
          ? `Could not connect to ${escapeHTML(getModelLabel(activeModel))} (${escapeHTML(err.message)}). Switched to AHA/ERC offline guide:`
          : lang === 'ja'
            ? `${escapeHTML(getModelLabel(activeModel))}に接続できませんでした。AHA/ERCに基づくオフライン案内に切り替えました。`
            : `Không kết nối được ${escapeHTML(getModelLabel(activeModel))} (${escapeHTML(err.message)}). Đã tự động chuyển về phản xạ chuẩn AHA/ERC:`;
        finalHtml = `
          <div class="p-2 mb-2 rounded bg-error-container/20 text-error text-[11px] font-semibold flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">info</span>
            <span>${fallbackBanner}</span>
          </div>
          ${generateOfflineResponse(cleanQuery, matchedTopics)}
        `;
      }
    } else {
      // Giả lập độ trễ ngắn 400ms cho tự nhiên
      await new Promise(r => setTimeout(r, 400));
      finalHtml = generateOfflineResponse(cleanQuery, matchedTopics);
    }

    // 3. Xóa chỉ báo suy nghĩ và hiển thị câu trả lời
    if (thinkingEl && thinkingEl.parentNode) {
      thinkingEl.remove();
    }

    appendMessage('bot', finalHtml, isLiveGemini, activeModel);
  }

  /**
   * Cập nhật danh sách tùy chọn model trong dropdown theo .env và localStorage
   * @param {HTMLSelectElement} selectEl
   */
  function populateModelOptions(selectEl) {
    if (!selectEl) return;
    const defaultModel = envConfig.defaultModel;
    const lang = getCurrentLang();
    const defaultTag = lang === 'en' ? ' (Default)' : lang === 'ja' ? ' (デフォルト)' : ' (Mặc định)';

    const models = AVAILABLE_MODELS.slice();
    if (defaultModel && !models.some(m => m.id === defaultModel)) {
      models.unshift({ id: defaultModel, label: defaultModel });
    }

    selectEl.innerHTML = models.map(m => {
      const suffix = m.id === defaultModel ? defaultTag : '';
      return `<option value="${escapeHTML(m.id)}">${escapeHTML(m.label + suffix)}</option>`;
    }).join('');

    const currentModel = getSelectedModel();
    if (currentModel && models.some(m => m.id === currentModel)) {
      selectEl.value = currentModel;
    } else if (models.length > 0) {
      selectEl.value = models[0].id;
    }
  }

  /**
   * Khởi tạo giao diện chọn Mô hình AI (Modal Settings trong Chatbox)
   */
  function initSettingsModal() {
    const chatWindow = document.getElementById('medfa-chat-window');
    if (!chatWindow || document.getElementById('chat-settings-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'chat-settings-modal';
    modal.className = 'hidden absolute inset-0 z-20 bg-surface-container-lowest/95 backdrop-blur-md p-5 flex flex-col justify-between';
    modal.innerHTML = `
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[20px]">tune</span>
            <h4 class="font-bold text-on-surface text-sm" data-i18n="chat.settingsTitle">Cài Đặt Mô Hình AI</h4>
          </div>
          <button id="btn-close-settings" data-i18n-aria-label="chat.closeTitle" type="button" class="p-1 hover:bg-surface-container rounded-lg text-outline">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div class="mt-4 flex flex-col gap-3">
          <div>
            <label for="select-gemini-model" class="block text-xs font-bold text-on-surface mb-1" data-i18n="chat.modelLabel">
              Chọn mô hình Google Gemini:
            </label>
            <select
              id="select-gemini-model"
              class="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            ></select>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 pt-3 border-t border-outline-variant/30">
        <button id="btn-save-model" data-i18n="chat.saveSettingsBtn" type="button" class="flex-1 py-2 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs transition-colors shadow-sm">
          Lưu Cài Đặt
        </button>
        <button id="btn-reset-model" data-i18n="chat.resetModelBtn" type="button" class="py-2 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors">
          Mặc định
        </button>
      </div>
    `;

    chatWindow.appendChild(modal);
    window.I18n?.applyTranslations(modal);

    // Bind events
    const closeBtn = modal.querySelector('#btn-close-settings');
    const saveBtn = modal.querySelector('#btn-save-model');
    const resetBtn = modal.querySelector('#btn-reset-model');
    const modelSelect = modal.querySelector('#select-gemini-model');

    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

    saveBtn.addEventListener('click', () => {
      const selectedId = modelSelect.value;
      setSelectedModel(selectedId);
      modal.classList.add('hidden');
      const lang = getCurrentLang();
      const title = typeof window !== 'undefined' && window.t ? window.t('chat.keyUpdated') : '✅ Đã cập nhật cấu hình!';
      const label = escapeHTML(getModelLabel(selectedId));
      const desc = lang === 'en'
        ? `Assistant will use <strong>${label}</strong>.`
        : lang === 'ja'
          ? `アシスタントは<strong>${label}</strong>を使用します。`
          : `Trợ lý sẽ sử dụng mô hình <strong>${label}</strong>.`;
      appendMessage('bot', `
        <p class="text-xs text-secondary font-bold" data-i18n="chat.keyUpdated">${title}</p>
        <p class="text-xs text-on-surface-variant mt-1">${desc}</p>
      `);
    });

    resetBtn.addEventListener('click', () => {
      resetSelectedModel();
      populateModelOptions(modelSelect);
      modal.classList.add('hidden');
      const defaultId = envConfig.defaultModel || modelSelect.value;
      const lang = getCurrentLang();
      const msg = lang === 'en'
        ? `ℹ️ Reset to default model: <strong>${escapeHTML(getModelLabel(defaultId))}</strong>.`
        : lang === 'ja'
          ? `ℹ️ デフォルトモデルに戻しました: <strong>${escapeHTML(getModelLabel(defaultId))}</strong>。`
          : `ℹ️ Đã khôi phục mô hình mặc định: <strong>${escapeHTML(getModelLabel(defaultId))}</strong>.`;
      appendMessage('bot', `
        <p class="text-xs text-on-surface font-semibold">${msg}</p>
      `);
    });

    populateModelOptions(modelSelect);
  }

  let langListenerBound = false;

  let chatbotWarmedUp = false;

  /**
   * Lazy-load cấu hình /api/chat và dữ liệu thư viện khi người dùng thực sự mở Chatbot
   * (Tránh tạo request mạng thừa trong chuỗi critical path lúc mới tải trang)
   */
  function warmup() {
    if (chatbotWarmedUp) return;
    chatbotWarmedUp = true;
    loadEnvConfig();
    loadLibraryTopics(getCurrentLang());
  }

  /**
   * Khởi tạo liên kết sự kiện Chatbot (chống gắn trùng listener nếu gọi lại nhiều lần)
   */
  function initChatbot() {
    if (!langListenerBound && typeof window !== 'undefined') {
      langListenerBound = true;
      window.addEventListener('medfa:languageChanged', (e) => {
        if (!chatbotWarmedUp) return;
        const nextLang = e?.detail?.language === 'en' || e?.detail?.language === 'ja'
          ? e.detail.language
          : getCurrentLang();
        loadLibraryTopics(nextLang);
      });
    }

    const chatForm = document.getElementById('chat-input-form');
    const chatInput = document.getElementById('chat-user-input');
    const settingsBtn = document.getElementById('chat-settings-btn');

    if (chatForm && chatInput && (!chatForm.dataset || !chatForm.dataset.chatbotBound)) {
      if (chatForm.dataset) chatForm.dataset.chatbotBound = '1';

      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;
        chatInput.value = '';
        handleUserQuery(text);
      });
    }

    if (settingsBtn && (!settingsBtn.dataset || !settingsBtn.dataset.settingsBound)) {
      if (settingsBtn.dataset) settingsBtn.dataset.settingsBound = '1';

      settingsBtn.addEventListener('click', async () => {
        await loadEnvConfig();
        initSettingsModal();
        const modal = document.getElementById('chat-settings-modal');
        if (modal) {
          modal.classList.remove('hidden');
          const modelSelect = modal.querySelector('#select-gemini-model');
          populateModelOptions(modelSelect);
        }
      });
    }
  }

  return {
    initChatbot,
    warmup,
    handleUserQuery,
    loadEnvConfig,
    getSelectedModel,
    setSelectedModel,
    resetSelectedModel,
    getAvailableModels: () => AVAILABLE_MODELS.slice()
  };
})();

if (typeof window !== 'undefined') {
  window.ChatbotGemini = ChatbotGemini;
}
