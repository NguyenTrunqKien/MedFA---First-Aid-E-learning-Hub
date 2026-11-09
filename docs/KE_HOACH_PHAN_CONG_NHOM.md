# KẾ HOẠCH TRIỂN KHAI & PHÂN CHIA CÔNG VIỆC DỰ ÁN MEDFA
> **Đồ án môn học:** IE104 - Internet và Công nghệ Web  
> **Giảng viên hướng dẫn:** ThS. Võ Tấn Khoa – Khoa Khoa học và Kỹ thuật Thông tin (UIT)  
> **Dự án:** MedFA – Medical First Aid E-Learning Hub (Nền tảng Sơ cấp cứu Y tế Vì Cộng Đồng)  
> **Mô hình định hướng:** Web Vệ Tinh Giáo Dục & Cứu Trợ Khẩn Cấp (Satellite Educational Hub)

---

## MỤC LỤC
1. [Chiến lược Mô hình Web Vệ Tinh (Satellite Website)](#1-chiến-lược-mô-hình-web-vệ-tinh-satellite-website)
2. [Tổng hợp Công việc Đã Hoàn Thành](#2-tổng-hợp-công-việc-đã-hoàn-thành)
3. [Phân chia Công việc Chi tiết Cho Nhóm 4 Người](#3-phân-chia-công-việc-chi-tiết-cho-nhóm-4-người)
4. [Bảng Ma trận Phân công & Tỷ lệ Đóng góp (File GroupX.docx)](#4-bảng-ma-trận-phân-công--tỷ-lệ-đóng-góp)
5. [Quy trình Git & Chiến lược Làm việc Không Xung đột](#5-quy-trình-git--chiến-lược-làm-việc-không-xung-đột)
6. [Lộ trình Triển khai Chi tiết (Timeline)](#6-lộ-trình-triển-khai-chi-tiết-timeline)

---

## 1. CHIẾN LƯỢC MÔ HÌNH WEB VỆ TINH (SATELLITE WEBSITE)

### 1.1. Định nghĩa (What)
**Web vệ tinh (Satellite Website / Microsite)** là một website hoạt động độc lập, tập trung giải quyết **chuyên sâu và duy nhất một chủ đề ngách (niche)**: *Phản xạ sơ cấp cứu trong "4 Phút Vàng"*. Website không ôm đồm các chức năng của bệnh viện hay cổng tin tức lớn, mà đóng vai trò như một **tiền đồn cứu sinh siêu nhẹ, siêu nhanh**.

### 1.2. Lý do & Khả năng Tăng Traffic Thực tế (Why)
1. **Đón đầu Search Intent khẩn cấp:** Người dùng khi gặp sự cố tra cứu các từ khóa cấp bách: *"cách sơ cứu hóc dị vật"*, *"ép tim CPR mấy lần"*, *"xử lý bỏng nhiệt"*. Website tải trang dưới 0.5s với nội dung 1-2-3 rõ ràng sẽ được ưu tiên click.
2. **Chiếm lĩnh SEO từ khóa ngách dài (Long-tail Keywords):** Độ tập trung chuyên môn 100% vào sơ cấp cứu giúp website đạt điểm liên quan (Relevance Score) rất cao trên Google.
3. **Tính lan truyền tự nhiên (Social Virality & Backlinks):** Các tính năng Quiz trắc nghiệm, Flashcard 3D, Timed Mode dễ dàng được chia sẻ trên các hội nhóm làm mẹ, trường học, cộng đồng thể thao/du lịch.
4. **Chi phí vận hành 0 đồng:** Bản chất là Web tĩnh (Pure HTML/CSS/JS), có thể deploy miễn phí trên GitHub Pages / Vercel, chịu tải hàng trăm nghìn lượt truy cập đồng thời mà không nghẽn server.

### 1.3. Các tác vụ cốt lõi của Web Vệ Tinh MedFA (Tasks)
* **Tác vụ 1 - Tra cứu phản xạ cấp cứu (Emergency Triage):** Tìm kiếm và hiển thị nhanh quy trình sơ cứu sống còn theo chuẩn AHA/ERC.
* **Tác vụ 2 - Tương tác giữ chân người dùng (Retention & Engagement):** Luyện phản xạ qua Flashcard 3D và bài thi trắc nghiệm tình huống có tính giờ.
* **Tác vụ 3 - Trợ lý sơ cứu tức thì:** Chatbot Triage ứng dụng Google Gemini API hỗ trợ sàng lọc câu hỏi khẩn cấp.
* **Tác vụ 4 - Phễu điều hướng & Kết nối:** Hotline 115 nổi bật, chia sẻ mạng xã hội, form đóng góp ý kiến.

### 1.4. Giải pháp Kỹ thuật Frontend (How)
* **SEO On-Page & Structured Data:** Tích hợp Schema `JSON-LD` (`MedicalWebPage`, `HowTo`) vào `<head>` để xuất hiện trên Google Rich Snippets.
* **Open Graph Tags (OG):** Khai báo đầy đủ `og:title`, `og:image`, `og:description` phục vụ chia sẻ lên Facebook/Zalo.
* **Tối ưu Core Web Vitals:** Giữ kiến trúc thuần (Zero-dependency), đạt điểm Lighthouse 95-100/100.

---

## 2. TỔNG HỢP CÔNG VIỆC ĐÃ HOÀN THÀNH
*(Ghi nhận trạng thái nhánh `main` sau khi merge nhánh `fix-css` tại commit `94f4e1a`)*

1. **Quy hoạch Header & Footer tập trung (DRY):**
   * Đã tách thành `components/header.html` và `components/footer.html`.
   * Tự động inject động qua `js/main.js`, nhận diện trang hiện tại để highlight menu điều hướng.
2. **Hệ thống CSS Utility thuần (Zero Framework):**
   * Xây dựng `css/utilities.css` (hơn 650 dòng CSS thuần) thay thế hoàn toàn Tailwind CSS runtime.
   * Tổ chức CSS đa tầng: `variables.css`, `base.css`, `layout.css`, `components.css`, `responsive.css`.
3. **Chuẩn hóa Giao diện 5 Trang Cơ bản:**
   * `index.html`: Trang chủ (Hero banner, số liệu thực trạng, tình huống nguy cấp).
   * `topics.html`: Thư viện tra cứu tình huống sơ cấp cứu.
   * `topic-detail.html`: Trang chi tiết từng tình huống (render động qua tham số `?id=...`).
   * `social-impact.html`: Trang tác động xã hội & thông điệp cộng đồng.
   * `about.html`: Trang giới thiệu dự án, tài liệu chuẩn và đội ngũ sinh viên thực hiện.
4. **Cơ chế DataLoader & Graceful Fallback:**
   * Nạp dữ liệu từ `data/topics.json` (11 tình huống cấp cứu).
   * Nhúng sẵn bộ dữ liệu tĩnh trong `js/data-loader.js` để website vẫn hiển thị đủ nội dung khi mở trực tiếp bằng giao thức `file:///`.
5. **Bộ lọc, Tìm kiếm & Sắp xếp Động:**
   * Lập trình trong `js/render-topics.js`: Lọc theo danh mục, tìm kiếm theo từ khóa real-time, sắp xếp theo mức độ khẩn cấp.
6. **Widget Trợ lý Chat AI mô phỏng:**
   * Cửa sổ pop-up chatbox ở footer, hỗ trợ kịch bản tư vấn nhanh cho CPR, bỏng, hóc dị vật, cầm máu.

---

## 3. PHÂN CHIA CÔNG VIỆC CHI TIẾT CHO NHÓM 4 NGƯỜI
*(Nguyên tắc: Các đầu việc hoàn toàn rời rạc, làm việc trên file riêng, không phụ thuộc lẫn nhau)*

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   KIẾN TRÚC TÁCH FILE ĐỘC LẬP                               │
├───────────────────────────────┬───────────────────────────────┬─────────────────────────────┤
│  THÀNH VIÊN 1 (KIÊN)          │  THÀNH VIÊN 2 (PHÚ)           │  THÀNH VIÊN 4 (QUỲNH)       │
│  • js/storage.js              │  • flashcards.html            │  • contact.html             │
│  • js/chatbot-gemini.js       │  • timed-practice.html        │  • js/contact-validation.js │
│  • docs/SEO_SCHEMA.md         │  • css/interactive-3d.css     │  • quiz.html + js/quiz.js   │
│  • Cấu trúc Repo & README.md  │  • js/flashcard-controller.js │  • data/quiz.json           │
├───────────────────────────────┴───────────────────────────────┴─────────────────────────────┤
│  THÀNH VIÊN 3 (KHẢI): Check & Thống nhất Data Schema, assets/images/* (offline),            │
│                       components/medical-disclaimer.html, Báo cáo PDF (15-40 trang)         │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 👤 THÀNH VIÊN 1: NGUYỄN TRUNG KIÊN (MSSV: 24520888) - Trưởng nhóm
* **Vai trò:** Team Leader, Kiến trúc sư Logic, Quản lý Cấu trúc Repo & Tích hợp AI.
* **Nhánh Git làm việc:** `feature/storage-gemini-repo-kien`
* **File phụ trách độc lập:**
  1. `js/storage.js` *(Nâng cấp logic LocalStorage)*
  2. `js/chatbot-gemini.js` *(Tách module Chatbot riêng, gọi API Gemini)*
  3. `docs/SEO_SCHEMA_SATELLITE.md` *(Cấu trúc thẻ SEO & Schema JSON-LD)*
  4. `README.md` & Cấu trúc Repository *(Chuẩn hóa theo Mục 5 Hướng dẫn đồ án)*

#### Nhiệm vụ cụ thể:
1. **Module Lưu trữ Trình duyệt (`js/storage.js`):**
   * Viết module xử lý `localStorage` thuần:
     * `Storage.toggleBookmark(topicId)`: Lưu / Hủy lưu bài học vào mảng `medfa_bookmarks`.
     * `Storage.getBookmarks()`: Lấy danh sách ID đã lưu.
     * `Storage.saveQuizScore(score, total, timeSpent)`: Lưu lịch sử điểm số bài thi trắc nghiệm.
   * Viết cơ chế Event Delegation lắng nghe click trên nút `.btn-bookmark` để đổi trạng thái icon ngay lập tức.
2. **Tích hợp Chatbot Triage với Google Gemini API (`js/chatbot-gemini.js`):**
   * Sử dụng Vanilla JS `fetch()` gọi trực tiếp REST API của Gemini (`gemini-1.5-flash:generateContent`).
   * Thiết lập **System Prompt y tế**: *"Bạn là trợ lý phản xạ sơ cấp cứu MedFA. Khi nhận triệu chứng, hãy: (1) Nhắc gọi 115 nếu nguy kịch, (2) Đưa ra tối đa 3-4 bước sơ cứu sống còn theo chuẩn AHA/ERC, câu từ ngắn gọn, gạch đầu dòng, không lan man"*.
   * Cơ chế fallback: Nếu mất mạng hoặc hết quota API key, tự động chuyển về bộ phản xạ có sẵn.
3. **Chuẩn hóa Cấu trúc Repository & Hoàn thiện `README.md` theo quy chuẩn Thầy Khoa:**
   * Soát lại cây thư mục khớp 100% với mục 5 trong `IE104_Project_Guide.pdf` (gồm: `css/`, `js/`, `assets/images/`, `components/`, các file HTML gốc).
   * Cập nhật `README.md` chuẩn chuyên nghiệp: Giới thiệu đề tài, kiến trúc không thư viện ngoài (Zero-dependency), bảng phân công nhiệm vụ và hướng dẫn chạy web trên VS Code Live Server / Python HTTP Server.
4. **Tối ưu SEO & Schema.org cho Web Vệ Tinh:**
   * Xây dựng mẫu `JSON-LD` (`MedicalWebPage`, `HowTo`) để các trang chi tiết được Google hiển thị dạng Rich Results.

* **Cách test độc lập:** Mở DevTools Console kiểm tra `Storage.toggleBookmark('bong-nhiet')` xem dữ liệu có lưu vào Application > Local Storage không; mở cửa sổ chat kiểm tra phản hồi API Gemini.

---

### 👤 THÀNH VIÊN 2: TRẦN GIA PHÚ (MSSV: 24521365)
* **Vai trò:** UI/UX Specialist, Hiệu ứng CSS 3D & Chế độ Luyện tập Tính giờ.
* **Nhánh Git làm việc:** `feature/css3d-flashcard-phu`
* **File phụ trách độc lập:**
  1. `flashcards.html` *(Trang luyện thẻ ghi nhớ 3D)*
  2. `timed-practice.html` *(Trang thử thách phản xạ "4 Phút Vàng")*
  3. `css/interactive-3d.css` *(CSS 3D thuần, độc lập hoàn toàn)*
  4. `js/flashcard-controller.js` *(Xử lý lật thẻ và chuyển thẻ)*

#### Nhiệm vụ cụ thể:
1. **Thiết kế Hiệu ứng Thẻ Flashcard CSS 3D thuần (`css/interactive-3d.css`):**
   * Ứng dụng CSS3 3D Transforms thuần:
     * Khung chứa: `perspective: 1000px;`
     * Thẻ lật: `transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);`
     * Hai mặt: `position: absolute; backface-visibility: hidden;`
     * Mặt sau: `transform: rotateY(180deg);`
     * Class khi lật: `.is-flipped { transform: rotateY(180deg); }`
   * Nội dung thẻ: Mặt trước là tình huống khẩn cấp (Triệu chứng), mặt sau là hành động xử trí tức thì.
2. **Chế độ Luyện tập Tính giờ "4 Phút Vàng" (`timed-practice.html`):**
   * Xây dựng đồng hồ đếm ngược SVG hình tròn (Circular Countdown Timer) với kỹ thuật `stroke-dasharray` và `stroke-dashoffset`.
   * Lập trình JS `setInterval()` đếm lùi 240 giây (4 phút vàng).
   * Khi thời gian còn dưới 60 giây: Đổi màu đồng hồ từ Xanh sang Đỏ rực kèm hiệu ứng CSS `animation: pulse 1s infinite`.
   * Hiển thị lần lượt các câu hỏi tình huống yêu cầu người chơi phản xạ nhanh.
3. **Kiểm thử Responsive Toàn diện:**
   * Đảm bảo giao diện hiển thị mượt mà trên mobile nhỏ (375px), tablet (768px) và desktop lớn.

* **Cách test độc lập:** Chạy trực tiếp `flashcards.html` và `timed-practice.html` trên trình duyệt để kiểm tra độ mượt của animation 3D và bộ đếm thời gian.

---

### 👤 THÀNH VIÊN 3: HỒ TẤN KHẢI (MSSV: 24520721)
* **Vai trò:** Quản lý Dữ liệu Y tế, Thống nhất Data Schema & Offline Assets.
* **Nhánh Git làm việc:** `feature/data-schema-offline-khai`
* **File phụ trách độc lập:**
  1. `data/topics.json` & `docs/DATA_SCHEMA_SPEC.md` *(Check và thống nhất Data Schema)*
  2. Thư mục `assets/images/*` *(Tải và lưu trữ toàn bộ ảnh offline)*
  3. `components/medical-disclaimer.html` *(Khối minh bạch nguồn tin y khoa)*
  4. Khung Báo cáo đồ án `BaoCao_IE104_MedFA.docx/pdf` *(Soạn thảo cấu trúc 15-40 trang)*

#### Nhiệm vụ cụ thể:
1. **Kiểm tra dữ liệu (Check Data) & Thống nhất Cấu trúc Data Schema:**
   * Rà soát toàn bộ các bản ghi trong `data/topics.json`:
     * Kiểm tra tính nhất quán của các trường: `id`, `title`, `fullTitle`, `category`, `criticalLevel`, `readTime`, `steps` (gồm `stepNumber`, `title`, `desc`), `dos`, `donts`, `emergencyAlert`.
     * Chuẩn hóa từ khóa y khoa theo khuyến cáo AHA (Hiệp hội Tim mạch Hoa Kỳ) và ERC (Hội đồng Hồi sinh Châu Âu).
   * Soạn thảo tài liệu đặc tả cấu trúc `docs/DATA_SCHEMA_SPEC.md` để các thành viên khác khi viết code lấy dữ liệu đều dùng chung một chuẩn thống nhất, không bị lỗi `undefined`.
2. **Lưu trữ Offline toàn bộ Hình ảnh (Xóa bỏ rủi ro link chết):**
   * Tải toàn bộ các ảnh từ link tạm `https://lh3.googleusercontent.com/...` về máy.
   * Chuyển đổi sang định dạng WebP/JPG tối ưu dung lượng (< 150KB/ảnh), đặt tên rõ ràng (ví dụ: `hero-cpr.webp`, `first-aid-child.webp`) và lưu vào `assets/images/`.
   * Cập nhật đường dẫn nội bộ trong `index.html`, `about.html`, `social-impact.html`.
3. **Xây dựng Module Minh Bạch Nguồn Tin & Tuyên Bố Miễn Trừ Y Khoa:**
   * Tạo component `components/medical-disclaimer.html`:
     * Trích dẫn nguồn tài liệu thẩm định: ví dụ AHA Guidelines 2020, ERC Guidelines 2021, Quyết định Bộ Y Tế.
     * Khung cảnh báo miễn trừ trách nhiệm (Medical Disclaimer) rõ ràng nhằm bảo đảm tính pháp lý và độ tin cậy y khoa của Web vệ tinh.


* **Cách test độc lập:** Chạy lệnh kiểm tra cú pháp JSON: `node -e "JSON.parse(fs.readFileSync('data/topics.json'))"`; ngắt toàn bộ Internet để kiểm tra ảnh hiển thị 100% offline.

---

### 👤 THÀNH VIÊN 4: TRƯƠNG ĐỖ NHƯ QUỲNH (MSSV: 24521513)
* **Vai trò:** Lập trình Tính năng Tương tác, Xử lý Form Validation & Module Quiz.
* **Nhánh Git làm việc:** `feature/contact-quiz-quynh`
* **File phụ trách độc lập:**
  1. `contact.html` *(Trang liên hệ theo chuẩn đồ án)*
  2. `js/contact-validation.js` *(Xác thực form bằng JS thuần)*
  3. `quiz.html` *(Trang thi trắc nghiệm tình huống)*
  4. `data/quiz.json` *(Ngân hàng câu hỏi trắc nghiệm)*
  5. `js/quiz-engine.js` *(Logic tính điểm và phản hồi y khoa)*

#### Nhiệm vụ cụ thể:
1. **Xây dựng Trang Liên Hệ & Form Validation thuần (`contact.html` & `js/contact-validation.js`):**
   * Xây dựng giao diện trang `contact.html` chuẩn với đầy đủ: Thông tin liên hệ khẩn cấp (115), mạng xã hội, form gửi phản hồi/đóng góp tình huống.
   * Lập trình Form Validation bằng Vanilla JS:
     * Bắt sự kiện `input` và `blur` trên từng ô nhập.
     * Kiểm tra trường bắt buộc không để trống.
     * Regex Email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
     * Regex Số điện thoại Việt Nam: `/^(0|\+84)[3|5|7|8|9][0-9]{8}$/`.
     * Hiển thị thông báo lỗi trực quan (Inline error message) viền đỏ dưới ô nhập.
     * Khi bấm Gửi: Ngăn reload bằng `e.preventDefault()`, hiển thị Toast Notification thông báo gửi thành công và lưu tạm dữ liệu vào `sessionStorage`.
2. **Phát triển Module Trắc nghiệm Tình huống Sơ cứu (`quiz.html` & `js/quiz-engine.js`):**
   * Xây dựng file dữ liệu `data/quiz.json` gồm 10 câu hỏi case-study thực tế.
   * Viết `js/quiz-engine.js`:
     * Hiển thị từng câu hỏi kèm thanh tiến độ (Progress bar).
     * Khi người dùng chọn đáp án: Đổi màu Xanh (Đúng) hoặc Đỏ (Sai), hiển thị ngay hộp giải thích lý do y khoa.
     * Trang kết quả cuối: Tổng kết điểm số, cấp huy hiệu (*"Sơ cứu viên Tinh anh"* / *"Cần ôn luyện thêm"*), có nút "Làm lại" hoặc "Lưu điểm".

* **Cách test độc lập:** Mở trực tiếp `contact.html` thử nhập sai form để kiểm tra thông báo lỗi; mở `quiz.html` làm hết 10 câu trắc nghiệm để kiểm tra tính điểm và giải thích y khoa.

---

## 4. BẢNG MA TRẬN PHÂN CÔNG & TỶ LỆ ĐÓNG GÓP
*(Sử dụng trực tiếp để điền vào file `GroupX.docx` nộp giảng viên)*

| STT | Họ và Tên | MSSV | Vai trò chính | Module & Sản phẩm đầu ra | Tỷ lệ đóng góp |
| :---: | :--- | :---: | :--- | :--- | :---: |
| 1 | **Nguyễn Trung Kiên** | 24520888 | Trưởng nhóm, Logic & AI | `js/storage.js`, `js/chatbot-gemini.js`, Chuẩn hóa Repo & `README.md`, SEO Schema | **25%** |
| 2 | **Trần Gia Phú** | 24521365 | UI/UX & Motion | `flashcards.html`, `timed-practice.html`, `css/interactive-3d.css`, Responsive tuning | **25%** |
| 3 | **Hồ Tấn Khải** | 24520721 | Content & Data Schema | Check & thống nhất `topics.json`, `assets/images/*` (offline), Medical Disclaimer | **25%** |
| 4 | **Trương Đỗ Như Quỳnh**| 24521513 | Interactive & Form Dev | `contact.html`, `js/contact-validation.js`, `quiz.html`, `data/quiz.json`, `js/quiz-engine.js` | **25%** |
| **TỔNG**| **4 thành viên** | | | | **100%** |

---

## 5. QUY TRÌNH GIT & CHIẾN LƯỢC LÀM VIỆC KHÔNG XUNG ĐỘT

Để đảm bảo không bị đụng code (merge conflict), nhóm tuân thủ nghiêm ngặt quy trình:

1. **Nguyên tắc phân nhánh (Branching):**
   * Nhánh `main`: Chỉ chứa code đã ổn định, kiểm thử chạy tốt.
   * Mỗi thành viên tạo nhánh riêng từ `main`:
     * Kiên: `git checkout -b feature/storage-gemini-repo-kien`
     * Phú: `git checkout -b feature/css3d-flashcard-phu`
     * Khải: `git checkout -b feature/data-schema-offline-khai`
     * Quỳnh: `git checkout -b feature/contact-quiz-quynh`
2. **Quy chuẩn thông điệp Commit (Conventional Commits):**
   * `feat: add contact form validation with vanilla js`
   * `feat: implement css 3d flip card animation`
   * `fix: replace google cdn image links with local assets`
   * `docs: update readme with project guidelines and repo structure`
3. **Quy trình Merge:**
   * Trước khi merge về `main`: `git pull origin main` trên nhánh cá nhân để kiểm tra đồng bộ.
   * Trưởng nhóm (Kiên) là người review và thực hiện merge Pull Request.

---

*Tài liệu được thiết lập nhằm định hướng và bám sát toàn diện theo quy định môn học IE104 của ThS. Võ Tấn Khoa.*
