# TỔNG HỢP CHỨC NĂNG HỆ THỐNG – MEDFA (FIRST AID E-LEARNING HUB)

> **Dự án:** MedFA – Nền tảng Học tập & Tra cứu Sơ cấp cứu trong "4 Phút Vàng"  
> **Môn học:** IE104 – Internet và Công nghệ Web (UIT – ĐHQG-HCM)  
> **Kiến trúc:** Zero-dependency Frontend (HTML5 Semantic + CSS3 thuần + Vanilla JavaScript ES6+)  
> **Cập nhật:** 20/11/2026

---

## 1. BẢNG TỔNG HỢP CHỨC NĂNG & ĐÁNH GIÁ HOÀN THÀNH

| STT | Nhóm / Tên chức năng | Vị trí trong code (File & mục quan trọng) | Phương pháp / Kỹ thuật thực hiện | Trạng thái | Đánh giá chi tiết |
| :-: | :--- | :--- | :--- | :-: | :--- |
| 1 | **Trang chủ & Điều hướng dùng chung (Header / Footer DRY)** | `index.html`<br>`components/header.html`<br>`components/footer.html`<br>`js/main.js` (`injectHeaderAndFooter`, `FALLBACK_HEADER_HTML`, `FALLBACK_FOOTER_HTML`) | Nạp động component bằng `fetch()` kèm bản dự phòng nội tuyến (Offline fallback); tự động highlight menu active, Dropdown Luyện tập, Mobile Drawer, Toast toàn cục | ✅ Hoàn thành | Chạy ổn định cả trên server lẫn mở trực tiếp `file:///`; đã có fallback chống cắt file trên Live Server |
| 2 | **Thư viện 33 tình huống sơ cấp cứu (Tìm kiếm, Lọc, Sắp xếp)** | `topics.html`<br>`js/render-topics.js` (`TopicsRenderer`, `applyFiltersAndRender`)<br>`js/data-loader.js` (`DataLoader.loadTopics`, `normalizeText`)<br>`data/topics.json` (33 bài) | Render động bằng Template Literals (có `escapeHTML` chống XSS); tìm kiếm real-time tiếng Việt không dấu; lọc theo danh mục & bài đã lưu; sắp xếp theo độ ưu tiên/mức nguy hiểm; cache bộ nhớ + dữ liệu fallback | ✅ Hoàn thành | Đầy đủ 33 tình huống có icon SVG riêng biệt; phản hồi tức thời, không reload trang |
| 3 | **Chi tiết tình huống & Bộ đếm nhịp ép tim CPR 110 BPM** | `topic-detail.html`<br>`js/topic-detail.js` (`initCprMetronome`, `ensureAudioContext`)<br>`components/medical-disclaimer.html` | Đọc query `?id=...` để render động từng bước sơ cứu, mục Nên / Không nên, tuyên bố miễn trừ y khoa; tạo âm thanh & nhịp xung thị giác **110 BPM** (chuẩn AHA/ERC 100–120 nhịp/phút) bằng **Web Audio API (`AudioContext`)** | ✅ Hoàn thành | Trực quan, dễ theo dõi trong tình huống khẩn cấp; tự động tắt âm thanh khi rời trang (`pagehide`) |
| 4 | **Luyện tập Flashcard 3D** | `flashcards.html`<br>`js/flashcard-controller.js`<br>`css/interactive-3d.css` | Hiệu ứng lật thẻ 2 mặt bằng **CSS3 3D Transforms** (`perspective`, `preserve-3d`, `rotateY(180deg)`); xáo trộn bộ thẻ, điều khiển bằng phím tắt bàn phím, theo dõi tiến độ & hiệu ứng chúc mừng | ✅ Hoàn thành | Mượt trên cả Desktop và Mobile, hỗ trợ thao tác nhanh bằng bàn phím |
| 5 | **Thử thách 4 Phút Vàng (Timed Practice 240s)** | `timed-practice.html`<br>`js/timed-practice.js`<br>`data/timed_practice.json` (32 câu) | Đồng hồ đếm ngược tròn 240 giây bằng **SVG (`stroke-dasharray` / `stroke-dashoffset`)**; chấm điểm phản xạ theo thời gian thực và tổng hợp bảng đối chiếu đáp án | ✅ Hoàn thành | Tạo đúng áp lực "4 Phút Vàng", giữ nguyên đồng hồ khi chuyển đổi ngôn ngữ |
| 6 | **Trắc nghiệm tình huống (Quiz Case-Study)** | `quiz.html`<br>`js/quiz-engine.js`<br>`css/contact-quiz.css`<br>`data/quiz.json` (10 câu) | Ngân hàng 10 câu hỏi tình huống thực tế; thanh tiến độ trực tiếp, giải thích y khoa chi tiết ngay sau khi chọn đáp án và lưu lịch sử điểm vào `localStorage` | ✅ Hoàn thành | Đầy đủ giải thích chuẩn y khoa, bảo toàn trạng thái làm bài khi đổi ngôn ngữ |
| 7 | **Trợ lý AI Sơ cứu (Gemini Chatbot + Client-side RAG & Fallback ngoại tuyến)** | `components/footer.html` (`#medfa-chat-dock`)<br>`js/chatbot-gemini.js` (`ChatbotGemini`, `loadEnvConfig`, `findRelevantTopics`, `callGeminiApi`)<br>`env.example` / `env.local` | Nạp động API Key & model mặc định từ `env.local` (không hardcode model); modal chọn 4 model Gemini miễn phí lưu trong `localStorage`; lọc Client-side RAG 2–3 bài liên quan từ 33 bài song ngữ (`topics.json` / `en/topics.json`) + gợi ý thẻ link thư viện; System Prompt chuẩn AHA/ERC có Scope Guardrail & nhớ 3 lượt hội thoại; Graceful Fallback ngoại tuyến 3 tầng | ✅ Hoàn thành | Hoạt động ổn định cả Online (Gemini Live) lẫn Offline (33 bài + 7 quy tắc cứng AHA/ERC); hỗ trợ tự động đổi dữ liệu theo ngôn ngữ Việt – Anh. Xem chi tiết tại `docs/THIET_KE_CHATBOT_GEMINI.md` |
| 8 | **Hệ thống Song ngữ Việt – Anh tức thời (i18n)** | `js/i18n.js` (`I18n`)<br>`js/translations.js`<br>`data/en/topics.json` (33 bài)<br>`data/en/quiz.json` (10 câu)<br>`data/en/timed_practice.json` (32 câu) | Kiến trúc i18n thuần dựa trên thuộc tính `data-i18n`, `data-i18n-html`, `data-i18n-placeholder`; lưu lựa chọn `medfa.language` trong `localStorage` (có fallback RAM); phát sự kiện `medfa:languageChanged` để cập nhật không cần tải lại trang | ✅ Hoàn thành | Chuyển đổi đồng bộ cả giao diện tĩnh lẫn dữ liệu động (topics, quiz, flashcard, timed practice, validation) |
| 9 | **Lưu bài học (Bookmark) & Quản lý trạng thái cục bộ** | `js/storage.js` (`Storage`) | Wrapper an toàn cho `localStorage` có prefix quản lý key; Event Delegation đồng bộ trạng thái nút Bookmark trên mọi trang thông qua sự kiện `medfa:bookmark-changed`; lưu lịch sử điểm bài luyện tập | ✅ Hoàn thành | Có `try/catch` an toàn khi trình duyệt chặn storage |
| 10 | **Form Liên hệ & Tổng đài khẩn cấp nhanh** | `contact.html`<br>`js/contact-validation.js`<br>`components/footer.html` (cột Hotline) | Kiểm tra dữ liệu form bằng **Regex thuần** (họ tên, email, số điện thoại, nội dung), hiển thị lỗi inline theo từng trường (song ngữ) + Toast xác nhận; nút gọi nhanh 1 chạm `tel:115`, `114`, `113`, `111` | ✅ Hoàn thành | Validate chặt chẽ ở phía client; lưu ý chưa kết nối backend gửi email thật (chỉ mô phỏng gửi thành công ở frontend) |
| 11 | **SEO Web Vệ Tinh, Offline-first & Responsive Design** | `js/seo-config.js`<br>`js/topic-detail.js` (JSON-LD)<br>`css/variables.css`, `css/utilities.css`, `css/layout.css`, `css/responsive.css` | Chèn động **Schema.org JSON-LD** (`MedicalWebPage`, `HowTo`), mạng lưới liên kết nguồn y khoa chính thống (`#satellite-authority-links`); hệ thống CSS Design Tokens (Material 3) & Media Queries chuẩn Mobile (375px), Tablet (768px), Desktop | ✅ Hoàn thành | Tối ưu hiệu năng tải nhanh, không phụ thuộc CDN framework, hiển thị tốt trên đa thiết bị |

---

## 2. BẢNG TỔNG HỢP CÁC TRANG TRONG HỆ THỐNG (9 TRANG + 3 COMPONENT)

| STT | Đường dẫn file | Tên trang | Vai trò & Nội dung chính | Module JS / CSS / Data liên kết | Trạng thái |
| :-: | :--- | :--- | :--- | :--- | :-: |
| 1 | `index.html` | **Trang chủ** | Hero banner "4 Phút Vàng", thống kê thực trạng cấp cứu, lối vào nhanh Thư viện & Trung tâm Luyện tập (Flashcard, 4 Phút Vàng, Quiz), CTA khám phá | `js/main.js`, `js/i18n.js`, `js/translations.js`, `js/seo-config.js`, `css/layout.css`, `css/components.css` | ✅ Hoàn thành |
| 2 | `topics.html` | **Thư viện sơ cấp cứu** | Danh sách 33 thẻ tình huống sơ cứu; thanh tìm kiếm real-time không dấu, lọc theo danh mục & bài đã lưu (Bookmark), sắp xếp theo mức độ ưu tiên/nguy hiểm | `js/render-topics.js`, `js/data-loader.js`, `js/storage.js`, `data/topics.json`, `data/en/topics.json` | ✅ Hoàn thành |
| 3 | `topic-detail.html` | **Chi tiết tình huống** | Nạp động bài sơ cứu theo `?id=...`; hiển thị quy trình từng bước, lưu ý Nên/Không nên, bộ đếm nhịp ép tim **CPR 110 BPM**, tuyên bố miễn trừ y khoa & JSON-LD SEO | `js/topic-detail.js`, `js/data-loader.js`, `js/storage.js`, `components/medical-disclaimer.html`, `data/topics.json` | ✅ Hoàn thành |
| 4 | `flashcards.html` | **Flashcard 3D** | Luyện tập lật thẻ 3D 2 mặt (tình huống – xử trí), chọn chế độ học, xáo trộn thẻ, điều khiển bằng phím tắt bàn phím và màn hình chúc mừng | `js/flashcard-controller.js`, `js/data-loader.js`, `css/interactive-3d.css`, `data/topics.json` | ✅ Hoàn thành |
| 5 | `timed-practice.html` | **Thử thách 4 Phút Vàng** | Kiểm tra phản xạ 12 câu ngẫu nhiên trong 240 giây (đồng hồ tròn SVG đổi đỏ dưới 60s), đạt ≥ 70% để vượt qua, xem lại chi tiết đáp án & giải thích | `js/timed-practice.js`, `js/storage.js`, `css/interactive-3d.css`, `data/timed_practice.json`, `data/en/timed_practice.json` | ✅ Hoàn thành |
| 6 | `quiz.html` | **Trắc nghiệm tình huống** | 10 câu hỏi case-study thực tế, thanh tiến độ trực tiếp, giải thích cơ sở y khoa ngay sau khi chọn và lưu điểm cao nhất vào `localStorage` | `js/quiz-engine.js`, `js/storage.js`, `css/contact-quiz.css`, `data/quiz.json`, `data/en/quiz.json` | ✅ Hoàn thành |
| 7 | `contact.html` | **Liên hệ & Khẩn cấp** | Nút gọi cấp cứu 115 nổi bật, thông tin liên hệ nhóm dự án, form góp ý/phản hồi có kiểm tra Regex thuần, báo lỗi từng trường và Toast xác nhận | `js/contact-validation.js`, `css/contact-quiz.css`, `js/main.js` | ✅ Hoàn thành |
| 8 | `social-impact.html` | **Tác động xã hội** | Trình bày bức tranh thực trạng cấp cứu ngoài bệnh viện tại Việt Nam, ý nghĩa của "4 Phút Vàng" và tác động cộng đồng của dự án phi lợi nhuận | `js/main.js`, `js/i18n.js`, `js/translations.js` | ✅ Hoàn thành |
| 9 | `about.html` | **Về MedFA** | Giới thiệu sứ mệnh, mô hình Web Vệ Tinh, tiêu chuẩn y khoa tham chiếu (AHA, ERC, Bộ Y Tế), tuyên bố miễn trừ trách nhiệm (`#standards`) và đội ngũ sinh viên UIT | `js/main.js`, `js/i18n.js`, `js/translations.js`, `js/seo-config.js` | ✅ Hoàn thành |
| *—* | `components/header.html`<br>`components/footer.html`<br>`components/medical-disclaimer.html` | **3 Component dùng chung (DRY)** | Thanh điều hướng + Switch ngôn ngữ; Chân trang + Danh bạ Hotline (115/114/113/111) + Khung Chatbot AI nổi; Hộp tuyên bố miễn trừ trách nhiệm y khoa | `js/main.js`, `js/chatbot-gemini.js`, `env.local` | ✅ Hoàn thành |

---

## 3. DIỄN GIẢI CHI TIẾT CÁC CHỨC NĂNG

### 3.1. Kiến trúc Component dùng chung & Điều hướng (`index.html`, `components/`, `js/main.js`)
- **Nạp Header & Footer theo nguyên lý DRY:** Thay vì lặp lại mã HTML thanh điều hướng và chân trang ở cả 9 trang `.html`, hàm `injectHeaderAndFooter()` trong `js/main.js` tải tập trung từ `components/header.html` và `components/footer.html`.
- **Cơ chế chống lỗi & chạy ngoại tuyến:** Toàn bộ HTML của Header và Footer đều có bản dự phòng (`FALLBACK_HEADER_HTML`, `FALLBACK_FOOTER_HTML`) ngay trong `js/main.js`, giúp trang vẫn hiển thị đầy đủ khi mở trực tiếp bằng giao thức `file:///` hoặc khi môi trường phát triển gặp sự cố cắt dữ liệu.
- **Điều hướng thông minh:** Tự động nhận diện trang hiện tại để đánh dấu mục menu đang mở (`active`), hỗ trợ Dropdown **Luyện tập** (Flashcard 3D, Thử thách 4 Phút Vàng, Trắc nghiệm), menu trượt trên thiết bị di động (Mobile Drawer) và thanh chọn ngôn ngữ Việt/Anh.

### 3.2. Thư viện Sơ cấp cứu 33 Tình huống (`topics.html`, `js/render-topics.js`, `js/data-loader.js`)
- **Ngân hàng dữ liệu chuẩn hóa:** Gồm **33 tình huống sơ cấp cứu** (cả tiếng Việt tại `data/topics.json` và tiếng Anh tại `data/en/topics.json`), mỗi tình huống có icon SVG riêng biệt, mô tả ngắn, thời gian đọc ước tính, mức độ khẩn cấp (`criticalLevel`) và phân loại danh mục.
- **Tìm kiếm & Lọc đa tiêu chí:**
  - Tìm kiếm tức thời theo tiêu đề, mô tả, từ khóa; hỗ trợ **tiếng Việt không dấu** nhờ hàm `DataLoader.normalizeText()`.
  - Lọc theo nhóm bệnh/tai nạn hoặc chỉ xem danh sách **Bài đã lưu (Bookmarks)**.
  - Sắp xếp theo độ ưu tiên (ưu tiên bài đã rà soát y khoa), mức độ nguy hiểm (`critical` → `low`) hoặc mới nhất.
- **Bảo mật hiển thị:** Toàn bộ dữ liệu JSON trước khi đưa vào Template Literal đều đi qua `escapeHTML()` để phòng tránh lỗi XSS.

### 3.3. Trang Chi tiết Tình huống & Máy đếm nhịp CPR (`topic-detail.html`, `js/topic-detail.js`)
- **Render động theo tham số URL:** Dựa vào `topic-detail.html?id=<slug>`, hệ thống nạp đúng bài hướng dẫn gồm: quy trình từng bước trực quan, bảng **Nên làm / Tuyệt đối tránh**, mốc thời gian cảnh báo và tuyên bố miễn trừ trách nhiệm y khoa (`components/medical-disclaimer.html`).
- **Bộ đếm nhịp ép tim CPR 110 BPM:**
  - Xây dựng bằng **Web Audio API (`AudioContext`)** kết hợp hiệu ứng nhịp đập thị giác (Visual Pulse), tạo âm thanh bíp đều đặn ở tần số **110 nhịp/phút** (nằm giữa khung khuyến cáo 100–120 nhịp/phút của AHA/ERC).
  - Tự động giải phóng và dừng âm thanh khi người dùng chuyển trang (`pagehide`).

### 3.4. Trung tâm Luyện tập Phản xạ (`flashcards.html`, `timed-practice.html`, `quiz.html`)
1. **Flashcard 3D (`js/flashcard-controller.js`, `css/interactive-3d.css`):**
   - Thẻ học lật 2 mặt (Tình huống / Dấu hiệu ở mặt trước – Cách xử trí chuẩn ở mặt sau) bằng CSS3 3D (`rotateY(180deg)`).
   - Hỗ trợ xáo trộn thẻ ngẫu nhiên, điều khiển phím tắt bàn phím (`↑`/`↓` hoặc `Enter` để lật thẻ, `←`/`→` để chuyển thẻ, `S`/`R` để xáo trộn) và hiệu ứng chúc mừng khi hoàn thành.
2. **Thử thách 4 Phút Vàng (`js/timed-practice.js`, `data/timed_practice.json`):**
   - Gồm ngân hàng **32 tình huống phản xạ nhanh** (lấy ngẫu nhiên 12 câu/lượt) dưới đồng hồ SVG đếm ngược **240 giây** (tự chuyển cảnh báo đỏ khi còn dưới 60 giây).
   - Điều kiện vượt qua thử thách: trả lời đúng **≥ 70%** (`score >= Math.ceil(questions.length * 0.7)`, tức ≥ 9/12 câu) trước khi hết giờ; kết thúc có bảng tổng kết tỷ lệ đúng/sai/bỏ trống và giải thích chuyên môn từng câu.
   - **Ghi chú về mã lệnh thắng nhanh (Demo / Test):** Hiện tại trong mã nguồn `js/timed-practice.js` **chưa cài đặt mã cheat cố định trong giao diện**. Tuy nhiên, do các biến trạng thái (`score`, `questions`, `answers`) và hàm `finish()` nằm ở phạm vi toàn cục (global scope), khi cần demo màn hình chiến thắng nhanh trên trình duyệt (F12 → Console sau khi bấm *Bắt đầu*), có thể chạy lệnh:
     ```js
     score = questions.length; answers = questions.map(q => q.answer); finish(true);
     ```
3. **Trắc nghiệm tình huống (`js/quiz-engine.js`, `data/quiz.json`):**
   - Gồm **10 câu hỏi case-study** sát thực tế, có thanh tiến độ hoàn thành, giải thích cơ sở y khoa chi tiết ngay sau mỗi lựa chọn và tự động lưu điểm cao nhất vào trình duyệt.

### 3.5. Trợ lý AI Sơ cứu (`js/chatbot-gemini.js`, `docs/THIET_KE_CHATBOT_GEMINI.md`) — ✅ Hoàn thành
- **Nút nổi toàn trang & chọn mô hình linh hoạt:** Đặt cố định ở góc dưới bên phải mọi trang (`#medfa-chat-dock`) với 4 lối tắt tình huống nguy kịch nhất (Ép tim CPR, Hóc dị vật, Bỏng, Băng ép cầm máu), nút gọi khẩn cấp 115 và nút Cài đặt (⚙️) cho phép chọn 4 model Gemini miễn phí (`gemini-3.5-flash-lite`, `gemini-3.1-flash-lite`, `gemini-3.6-flash`, `gemini-3.8-flash`). Cấu hình `GEMINI_API_KEY` và `GEMINI_DEFAULT_MODEL` được nạp động từ `env.local` (tương thích VS Code Live Server, fallback `.env`), không hardcode model trong mã nguồn.
- **Hai chế độ vận hành đồng bộ song ngữ Việt – Anh:**
  - **Chế độ AI trực tuyến (Gemini Live + Client-side RAG):** Lọc cục bộ 2–3 bài liên quan nhất trong 33 bài (`data/topics.json` hoặc `data/en/topics.json` theo ngôn ngữ đang chọn) để bơm ngữ cảnh rút gọn cho Gemini và tự động gắn thẻ liên kết `topic-detail.html?id=...` dưới câu trả lời. Tích hợp **Scope Guardrail** từ chối lịch sự câu hỏi ngoài y tế, thông báo minh bạch khi tình huống chưa có trong thư viện 33 bài, và lưu 3 lượt hội thoại gần nhất.
  - **Chế độ dự phòng ngoại tuyến 3 tầng (Graceful Fallback):** Khi chưa có `env.local`, gặp lỗi API/503 hoặc mất mạng, chatbot tự động tra cứu trực tiếp trên **33 bài thư viện JSON**, kế tiếp là **7 quy tắc phản xạ cứng (`OFFLINE_RULES` / `OFFLINE_RULES_EN`)** và cuối cùng là khung hướng dẫn an toàn nhắc gọi 115.

### 3.6. Hệ thống Đa ngôn ngữ Việt – Anh (`js/i18n.js`, `js/translations.js`, `data/en/*`)
- **Chuyển đổi tức thời không tải lại trang:** Người dùng chọn `Tiếng Việt` hoặc `English` ngay trên Header; hệ thống quét toàn bộ thuộc tính `data-i18n*` và phát sự kiện `medfa:languageChanged` để các module động tự cập nhật dữ liệu tương ứng.
- **Bảo toàn trạng thái đang tương tác:** Khi đổi ngôn ngữ giữa chừng, người dùng không bị mất bộ lọc đang chọn ở thư viện, không bị reset vị trí thẻ Flashcard, câu hỏi Quiz đang làm hay đồng hồ 240 giây đang chạy.

### 3.7. Lưu trữ Cục bộ, Form Liên hệ & Hotline Khẩn cấp (`js/storage.js`, `contact.html`, `js/contact-validation.js`)
- **Bookmark & Điểm số (`js/storage.js`):** Cho phép đánh dấu bài học quan trọng để mở lại nhanh; mọi trạng thái nút bookmark được đồng bộ tức thì giữa các trang và thẻ card.
- **Form liên hệ kiểm tra dữ liệu thuần:** Dùng Regex kiểm tra định dạng Email, Số điện thoại Việt Nam, độ dài Họ tên và Nội dung; thông báo lỗi cụ thể ngay dưới từng ô nhập và tự động dịch thông báo lỗi theo ngôn ngữ đang chọn.
- **Danh bạ khẩn cấp 1 chạm:** Tích hợp sẵn liên kết gọi trực tiếp **115** (Cấp cứu Y tế), **114** (Cứu hỏa), **113** (Cảnh sát), **111** (Bảo vệ Trẻ em) tại Footer và trang Liên hệ.

### 3.8. SEO Web Vệ Tinh, Offline-first & Thiết kế Responsive (`js/seo-config.js`, `css/`)
- **Chuẩn Web Vệ Tinh (Satellite SEO):** Tự động chèn dữ liệu có cấu trúc **JSON-LD (`MedicalWebPage`, `HowTo`)** vào thẻ `<head>` của trang chi tiết và hiển thị khối liên kết tham chiếu tới các tổ chức y khoa uy tín (AHA, ERC, HCDC, Vinmec, Tâm Anh).
- **Zero-dependency CSS & Responsive:** Toàn bộ giao diện dùng hệ thống Design Tokens (`css/variables.css`) và lớp tiện ích tự viết (`css/utilities.css`, `css/responsive.css`) tương thích đầy đủ các khung hình Mobile (`375px`), Tablet (`768px`) và Desktop mà không cần tải thư viện CSS ngoài.
