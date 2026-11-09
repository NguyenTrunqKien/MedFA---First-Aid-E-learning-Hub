/**
 * MedFA AI Triage Chatbot Module (Google Gemini API & Offline Medical Reflex)
 * Trợ lý phản xạ sơ cấp cứu y tế MedFA:
 * - Hỗ trợ gọi trực tiếp Google Gemini API (gemini-1.5-flash) với System Prompt chuẩn y khoa AHA/ERC.
 * - Cho phép lưu trữ và cấu hình API Key cá nhân cục bộ trong LocalStorage.
 * - Cơ chế Graceful Fallback tự động: Chuyển sang bộ quy tắc phản xạ y tế ngoại tuyến
 *   khi không có API Key hoặc khi mất kết nối mạng.
 * 
 * Tác giả phụ trách: Nguyễn Trung Kiên (MSSV: 24520888)
 */

const ChatbotGemini = (() => {
  const STORAGE_KEY_API = 'medfa_gemini_api_key';
  
  // System Prompt y khoa chuẩn hóa theo khuyến cáo ERC 2025 và AHA 2024/2025
  const SYSTEM_INSTRUCTION = `
Bạn là Trợ lý Phản xạ Sơ cấp cứu Y tế MedFA (Medical First Aid Assistant) - tuân thủ hướng dẫn chuyên môn của Hiệp hội Tim mạch Hoa Kỳ (AHA) và Hội đồng Hồi sinh Châu Âu (ERC).
Nguyên tắc cốt lõi:
1. NGUY CẤP SỐNG CÒN: Nếu người dùng hỏi về tình trạng khẩn cấp (ngừng tim, ngưng thở, bất tỉnh, hóc nghẹn tím tái, bỏng nặng, co giật, sốc nhiệt >40°C, chảy máu ồ ạt...), LUÔN nhắc nhở to rõ "GỌI CẤP CỨU 115 NGAY LẬP TỨC" ở dòng đầu tiên.
2. 3-4 BƯỚC HÀNH ĐỘNG TỨC THÌ: Trình bày quy trình sơ cứu tối đa 3-4 bước gạch đầu dòng ngắn gọn, chuẩn xác, dễ làm tại hiện trường trong "4 Phút Vàng". Không viết đoạn văn dài.
3. KHÔNG ĐƯỢC LÀM (LƯU Ý NGUY HIỂM): Nêu ngắn gọn 1-2 điều tối kỵ (ví dụ: không bôi kem đánh răng/nước mắm lên vết bỏng, không châm kim đầu ngón tay khi ngất, không móc họng mù khi hóc dị vật).
4. TÍNH CHÍNH XÁC & PHÁP LÝ: Ngôn từ bình tĩnh, dứt khoát. Cuối câu trả lời kèm nhắc nhở: "Thông tin hỗ trợ phản xạ ban đầu, không thay thế nhân viên y tế chuyên nghiệp".
Format câu trả lời: Ngắn gọn, có dùng định dạng Markdown hoặc gạch đầu dòng rõ ràng.
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
      link: { url: 'topic-detail.html?id=chay-mau-cam-mau', text: 'Xem kỹ thuật băng ép và cầm máu' }
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
      link: { url: 'topic-detail.html?id=so-cuu-nguoi-bi-ngat-xiu', text: 'Xem kỹ thuật xử trí khi ngất' }
    }
  ];

  /**
   * Lấy API Key từ LocalStorage
   * @returns {string|null}
   */
  function getApiKey() {
    return localStorage.getItem(STORAGE_KEY_API) || null;
  }

  /**
   * Lưu API Key vào LocalStorage
   * @param {string} key 
   * @returns {boolean}
   */
  function setApiKey(key) {
    if (!key || !key.trim()) {
      localStorage.removeItem(STORAGE_KEY_API);
      return false;
    }
    localStorage.setItem(STORAGE_KEY_API, key.trim());
    return true;
  }

  /**
   * Xóa API Key
   */
  function removeApiKey() {
    localStorage.removeItem(STORAGE_KEY_API);
  }

  /**
   * Trả lời bằng quy tắc ngoại tuyến (Rule-based Fallback)
   * @param {string} query 
   * @returns {string} HTML response
   */
  function generateOfflineResponse(query) {
    const q = query.toLowerCase();
    
    // Tìm rule khớp từ khóa
    const matchedRule = OFFLINE_RULES.find(rule => 
      rule.keywords.some(keyword => q.includes(keyword))
    );

    if (matchedRule) {
      const stepsHtml = matchedRule.steps.map(step => {
        // Simple markdown bold converter
        const formatted = step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return `<li class="flex items-start gap-2"><span class="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">check_circle</span><span>${formatted}</span></li>`;
      }).join('');

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
              <span><strong>Lưu ý:</strong> ${matchedRule.warning}</span>
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

    // Phản hồi chung khi không khớp từ khóa
    return `
      <div class="flex flex-col gap-2 text-xs leading-relaxed">
        <p>MedFA đã tiếp nhận câu hỏi phản xạ: <em>"${escapeHTML(query)}"</em></p>
        <p>Để đảm bảo an toàn tính mạng trong <strong>"4 Phút Vàng"</strong>:</p>
        <ul class="list-disc pl-4 space-y-1">
          <li>Nếu nạn nhân bất tỉnh, ngừng thở: <strong class="text-error">GỌI 115 NGAY LẬP TỨC</strong> và ép tim CPR liên tục.</li>
          <li>Bạn có thể tra cứu nhanh quy trình chuẩn từng bước trong <a href="topics.html" class="text-primary font-bold underline">Thư viện sơ cấp cứu</a>.</li>
          <li>Thử phản xạ kiến thức với <a href="flashcards.html" class="text-secondary font-bold underline">Flashcard 3D</a> hoặc <a href="quiz.html" class="text-tertiary font-bold underline">Bài thi trắc nghiệm</a>.</li>
        </ul>
        <p class="text-[11px] text-on-surface-variant/70 italic mt-1">* Lưu ý: Bạn có thể nhập Gemini API Key ở biểu tượng Cài đặt ⚙️ trên thanh tiêu đề chat để hỏi đáp AI mở rộng.</p>
      </div>
    `;
  }

  /**
   * Gọi REST API Google Gemini
   * @param {string} prompt 
   * @param {string} apiKey 
   * @returns {Promise<string>}
   */
  async function callGeminiApi(prompt, apiKey) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    const body = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }]
      },
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 600,
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

    // Bullet points
    html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li class="flex items-start gap-1.5 my-0.5"><span class="material-symbols-outlined text-primary text-[14px] shrink-0 mt-0.5">check_small</span><span>$1</span></li>');

    // Replace newlines with breaks if not in li
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
   */
  function appendMessage(sender, htmlContent, isLiveGemini = false) {
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
            <span class="text-[10px] text-on-surface-variant/60 font-medium">Vừa xong</span>
            <span class="text-[9px] px-1.5 py-0.2 rounded font-bold ${isLiveGemini ? 'bg-secondary-container/40 text-secondary' : 'bg-surface-container-high text-on-surface-variant'}">
              ${isLiveGemini ? 'Gemini 1.5 Flash Live' : 'Bộ Phản Xạ AHA/ERC'}
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
      <span class="font-medium">Đang tra cứu phản xạ y tế AHA/ERC...</span>
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

    const apiKey = getApiKey();
    let finalHtml = '';
    let isLiveGemini = false;

    if (apiKey) {
      try {
        const geminiText = await callGeminiApi(cleanQuery, apiKey);
        finalHtml = formatMarkdownToHTML(geminiText);
        isLiveGemini = true;
      } catch (err) {
        console.warn('[MedFA Chatbot] Lỗi gọi Gemini API, chuyển sang chế độ phản xạ y khoa nội bộ:', err.message);
        finalHtml = `
          <div class="p-2 mb-2 rounded bg-error-container/20 text-error text-[11px] font-semibold flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">info</span>
            <span>Không kết nối được Gemini (${escapeHTML(err.message)}). Đã tự động chuyển về phản xạ chuẩn AHA/ERC:</span>
          </div>
          ${generateOfflineResponse(cleanQuery)}
        `;
      }
    } else {
      // Giả lập độ trễ ngắn 400ms cho tự nhiên
      await new Promise(r => setTimeout(r, 400));
      finalHtml = generateOfflineResponse(cleanQuery);
    }

    // 3. Xóa chỉ báo suy nghĩ và hiển thị câu trả lời
    if (thinkingEl && thinkingEl.parentNode) {
      thinkingEl.remove();
    }

    appendMessage('bot', finalHtml, isLiveGemini);
  }

  /**
   * Khởi tạo giao diện cấu hình API Key (Modal Settings trong Chatbox)
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
            <h4 class="font-bold text-on-surface text-sm">Cài đặt Trợ lý AI</h4>
          </div>
          <button id="btn-close-settings" type="button" class="p-1 hover:bg-surface-container rounded-lg text-outline">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div class="mt-4 flex flex-col gap-3">
          <div>
            <label for="input-gemini-key" class="block text-xs font-bold text-on-surface mb-1">
              Google Gemini API Key:
            </label>
            <input 
              id="input-gemini-key" 
              type="password" 
              placeholder="AIzaSy..." 
              class="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <p class="text-[11px] text-on-surface-variant/70 mt-1.5 leading-relaxed">
              API Key được lưu bảo mật trong <code>localStorage</code> của trình duyệt bạn. MedFA không truyền key lên máy chủ trung gian.
            </p>
          </div>

          <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1.5 text-xs">
            <span class="font-bold text-on-surface flex items-center gap-1">
              <span class="material-symbols-outlined text-secondary text-[16px]">verified</span>
              Cơ chế Hoạt động:
            </span>
            <p class="text-on-surface-variant text-[11px] leading-relaxed">
              • <strong>Có Key:</strong> Gọi trực tiếp Gemini 1.5 Flash với System Prompt y khoa chuyên sâu.<br/>
              • <strong>Không có Key / Mất mạng:</strong> Tự động chuyển về Bộ phản xạ y tế AHA/ERC ngoại tuyến 100%.
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 pt-3 border-t border-outline-variant/30">
        <button id="btn-save-key" type="button" class="flex-1 py-2 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs transition-colors shadow-sm">
          Lưu Cài Đặt
        </button>
        <button id="btn-clear-key" type="button" class="py-2 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors">
          Xóa Key
        </button>
      </div>
    `;

    chatWindow.appendChild(modal);

    // Bind events
    const closeBtn = modal.querySelector('#btn-close-settings');
    const saveBtn = modal.querySelector('#btn-save-key');
    const clearBtn = modal.querySelector('#btn-clear-key');
    const keyInput = modal.querySelector('#input-gemini-key');

    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

    saveBtn.addEventListener('click', () => {
      const keyVal = keyInput.value.trim();
      setApiKey(keyVal);
      modal.classList.add('hidden');
      appendMessage('bot', `
        <p class="text-xs text-secondary font-bold">✅ Đã cập nhật cấu hình!</p>
        <p class="text-xs text-on-surface-variant mt-1">${keyVal ? 'Trợ lý đã chuyển sang chế độ <strong>Google Gemini 1.5 Flash Live</strong>.' : 'Đã xóa Key. Trợ lý sử dụng <strong>Bộ phản xạ sơ cấp cứu y khoa MedFA (Offline)</strong>.'}</p>
      `);
    });

    clearBtn.addEventListener('click', () => {
      removeApiKey();
      keyInput.value = '';
      modal.classList.add('hidden');
      appendMessage('bot', `
        <p class="text-xs text-on-surface font-semibold">ℹ️ Đã xóa API Key. Trợ lý đang hoạt động ở chế độ <strong>Bộ phản xạ y khoa ngoại tuyến chuẩn AHA/ERC</strong>.</p>
      `);
    });

    // Populate existing key
    const currentKey = getApiKey();
    if (currentKey) keyInput.value = currentKey;
  }

  /**
   * Khởi tạo liên kết sự kiện Chatbot
   */
  function initChatbot() {
    const chatForm = document.getElementById('chat-input-form');
    const chatInput = document.getElementById('chat-user-input');
    const settingsBtn = document.getElementById('chat-settings-btn');

    if (chatForm && chatInput) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;
        chatInput.value = '';
        handleUserQuery(text);
      });
    }

    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        initSettingsModal();
        const modal = document.getElementById('chat-settings-modal');
        if (modal) {
          modal.classList.remove('hidden');
          const keyInput = modal.querySelector('#input-gemini-key');
          if (keyInput) keyInput.value = getApiKey() || '';
        }
      });
    }
  }

  return {
    initChatbot,
    handleUserQuery,
    getApiKey,
    setApiKey,
    removeApiKey
  };
})();

if (typeof window !== 'undefined') {
  window.ChatbotGemini = ChatbotGemini;
}
