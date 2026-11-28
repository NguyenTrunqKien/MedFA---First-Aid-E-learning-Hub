/**
 * Vercel Serverless Function: /api/chat
 * MedFA AI First Aid Assistant - Secure Gemini API Proxy
 * 
 * - Đọc GEMINI_API_KEY và GEMINI_DEFAULT_MODEL từ Vercel Environment Variables
 * - Không phụ thuộc thư viện npm ngoài (dùng Node.js native fetch)
 * - Bảo mật API Key tuyệt đối ở server Vercel, không lộ ra client-side
 */

const SYSTEM_INSTRUCTION_VI = `
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
   - [MEDFAライブラリの関連記事] がある場合は、その内容に沿って回答し、存在しないURLを作らないでください。
   - 関連記事がない医療・応急手当の質問では、その話題が標準化されたMedFAライブラリにないことを簡潔に伝え、一般的な安全情報のみを案内してください。診断や薬の処方はしないでください。
4. 直ちに行う手順: 現場で実行できる短い箇条書きで、3〜4段階以内にまとめてください。
5. 危険な行為: 避けるべきことを1〜2点示してください。
6. 正確性と注意: 落ち着いた明確な表現を使い、医療に関する回答の最後に「この情報は初期対応を支援するもので、専門的な医療の代わりにはなりません」と記してください。
日本語で簡潔なMarkdown形式で回答してください。
`;

async function handler(req, res) {
  // Cấu hình header CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const rawKey = (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GEMINI_KEY ||
    process.env.API_KEY ||
    process.env.gemini_api_key ||
    ''
  ).trim();
  const apiKey = rawKey && rawKey !== 'your_gemini_api_key_here' ? rawKey : '';
  const defaultModel = (process.env.GEMINI_DEFAULT_MODEL || process.env.DEFAULT_MODEL || 'gemini-3.5-flash-lite').trim();

  // GET: Kiểm tra trạng thái cấu hình serverless của Vercel
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      configured: Boolean(apiKey),
      defaultModel
    });
  }

  // POST: Xử lý hỏi đáp với Google Gemini API
  if (req.method === 'POST') {
    if (!apiKey) {
      return res.status(503).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trong Environment Variables trên Vercel.'
      });
    }

    try {
      let payload = req.body;
      if (typeof payload === 'string') {
        try {
          payload = JSON.parse(payload);
        } catch (_) {}
      }
      payload = payload || {};

      const prompt = (payload.prompt || '').trim();
      if (!prompt) {
        return res.status(400).json({ error: 'Thiếu nội dung câu hỏi (prompt).' });
      }

      const model = (payload.model || defaultModel || 'gemini-3.5-flash-lite').trim();
      const lang = payload.lang === 'en' || payload.lang === 'ja' ? payload.lang : 'vi';
      const topicsContext = payload.topicsContext || '';
      const history = Array.isArray(payload.history) ? payload.history : [];

      const userPromptWithContext = topicsContext
        ? `${topicsContext}\n\n${lang === 'en' ? 'User question' : lang === 'ja' ? '質問' : 'Câu hỏi người dùng'}: ${prompt}`
        : prompt;

      const contents = [
        ...history,
        {
          role: 'user',
          parts: [{ text: userPromptWithContext }]
        }
      ];

      const body = {
        contents,
        systemInstruction: {
          parts: [{ text: lang === 'en' ? SYSTEM_INSTRUCTION_EN : lang === 'ja' ? SYSTEM_INSTRUCTION_JA : SYSTEM_INSTRUCTION_VI }]
        },
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
          topP: 0.8
        }
      };

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const upstreamRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!upstreamRes.ok) {
        const errorData = await upstreamRes.json().catch(() => ({}));
        const msg = errorData.error?.message || `Google API HTTP ${upstreamRes.status}`;
        return res.status(upstreamRes.status >= 400 && upstreamRes.status < 600 ? upstreamRes.status : 500).json({
          error: msg
        });
      }

      const data = await upstreamRes.json();
      const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!candidateText) {
        return res.status(500).json({ error: 'Mô hình Gemini không trả về nội dung.' });
      }

      return res.status(200).json({
        text: candidateText,
        model
      });
    } catch (err) {
      console.error('[Vercel api/chat] Error:', err);
      return res.status(500).json({
        error: err.message || 'Lỗi xử lý nội bộ tại serverless function'
      });
    }
  }

  return res.status(405).json({ error: 'Phương thức không được hỗ trợ (Method Not Allowed).' });
}

module.exports = handler;
module.exports.default = handler;
