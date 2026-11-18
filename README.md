# MedFA – Medical First Aid E-Learning Hub
> **Đồ án môn học:** IE104 – Internet và Công nghệ Web  
> **Giảng viên hướng dẫn:** ThS. Võ Tấn Khoa – Khoa Khoa học và Kỹ thuật Thông tin  
> **Trường Đại học Công nghệ Thông tin – ĐHQG-HCM (UIT)**  
> **Mô hình triển khai:** Web Vệ Tinh Giáo Dục & Cứu Trợ Khẩn Cấp (Satellite Educational Hub)  
> **Định hướng chuyên môn:** Phản xạ sơ cấp cứu tức thì trong "4 Phút Vàng" sống còn

---

## 🌟 1. GIỚI THIỆU DỰ ÁN & MÔ HÌNH WEB VỆ TINH

**MedFA** là nền tảng trực tuyến phi lợi nhuận chuyên chuẩn hóa và phổ biến kiến thức sơ cấp cứu ban đầu theo các tiêu chuẩn y khoa quốc tế (**AHA** – Hiệp hội Tim mạch Hoa Kỳ, **ERC** – Hội đồng Hồi sinh Châu Âu và **Bộ Y Tế Việt Nam**). 

Khác với các cổng thông tin bệnh viện cồng kềnh, MedFA được thiết kế dưới mô hình **Web Vệ Tinh (Satellite Website)**:
* **Mục tiêu chuyên sâu duy nhất (Niche):** Hướng dẫn thao tác phản xạ xử trí tại hiện trường trong **"4 Phút Vàng"** trước khi nhân viên y tế 115 tiếp cận.
* **Tải trang siêu tốc (< 0.5s):** 100% công nghệ Frontend thuần (Zero-dependency), đạt điểm Google Core Web Vitals tối đa, hỗ trợ tra cứu ngoại tuyến (Offline-first).
* **Đón đầu Search Intent khẩn cấp:** Tích hợp Schema Structured Data (`MedicalWebPage`, `HowTo`) để Google hiển thị các bước sơ cứu dạng Rich Snippets trực tiếp trên trang tìm kiếm.

---

## 🏗️ 2. CẤU TRÚC THƯ MỤC DỰ ÁN

Cấu trúc repository tuân thủ nghiêm ngặt theo **Mục 5 trong Tài liệu hướng dẫn đồ án IE104 của ThS. Võ Tấn Khoa**:

```
project MedFA/
├── index.html                 # Trang chủ: Hero banner, số liệu thực trạng & Hub luyện tập phản xạ
├── topics.html                # Thư viện sơ cấp cứu: Tìm kiếm real-time, lọc danh mục & bài đã lưu
├── topic-detail.html          # Chi tiết tình huống: Nạp động ?id=..., sơ đồ bước, Medical Disclaimer
├── flashcards.html            # Flashcard 3D: Lật thẻ CSS3 3D hai mặt, 2 chế độ học & phím tắt
├── timed-practice.html        # Thử thách 4 Phút Vàng: Đồng hồ SVG đếm ngược 240s & 12 ca cấp cứu
├── quiz.html                  # Trắc nghiệm tình huống: 10 câu case-study, giải thích y khoa, lưu điểm
├── contact.html               # Trang liên hệ: Gọi 115 khẩn cấp, form góp ý có JS Validation thuần
├── social-impact.html         # Tác động xã hội: Bức tranh thực trạng cấp cứu tại Việt Nam
├── about.html                 # Giới thiệu dự án, tài liệu chuẩn và đội ngũ sinh viên thực hiện
├── components/
│   ├── header.html            # Header dùng chung: Logo SVG, Menu Dropdown Luyện tập, Switch Lang
│   ├── footer.html            # Footer dùng chung: Hotline 115, mạng xã hội, Chatbot AI Popup
│   └── medical-disclaimer.html# Component tuyên bố miễn trừ y khoa và nguồn AHA/ERC
├── css/
│   ├── variables.css          # Design Tokens: Màu Material 3, Spacing, Typography
│   ├── base.css               # CSS Reset, Typography cơ bản, Smooth scroll
│   ├── layout.css             # Grid, Flexbox, Container, Header/Footer layout
│   ├── components.css         # Card, Button, Badge, Modal, Chat widget, Alert
│   ├── utilities.css          # Bộ tiện ích CSS3 thuần (>650 dòng) thay thế Tailwind runtime
│   ├── responsive.css         # Media queries chuẩn Mobile (375px), Tablet (768px), Desktop
│   ├── interactive-3d.css     # CSS 3D Transforms chuyên sâu cho Flashcards & 4 Phút Vàng
│   └── contact-quiz.css       # Stylesheet chuyên dụng cho Form liên hệ và Module Trắc nghiệm
├── js/
│   ├── data-loader.js         # Nạp data/topics.json, cache bộ nhớ, fallback dữ liệu nhúng offline
│   ├── render-topics.js       # Template Literal render card, tìm kiếm, lọc danh mục & bookmark
│   ├── storage.js             # Quản lý LocalStorage, Bookmark bài học, lưu điểm, Event Delegation
│   ├── chatbot-gemini.js      # Trợ lý AI gọi Google Gemini REST API + Fallback phản xạ ngoại tuyến
│   ├── flashcard-controller.js# Điều khiển lật thẻ 3D, xáo trộn, phím tắt bàn phím & Confetti
│   ├── timed-practice.js      # Logic đếm ngược 240s, chấm điểm và bảng thống kê đáp án
│   ├── quiz-engine.js         # Logic trắc nghiệm 10 câu, live progress, giải thích y khoa, lưu điểm
│   ├── contact-validation.js  # Kiểm tra form liên hệ bằng Regex thuần, inline error & Toast
│   └── main.js                # Chèn Header/Footer động, highlight menu, điều phối toàn cục
├── data/
│   ├── topics.json            # Ngân hàng 33 tình huống cấp cứu chuẩn hóa y khoa
│   ├── quiz.json              # Ngân hàng 10 câu trắc nghiệm case-study
│   └── timed_practice.json    # Ngân hàng 32 câu hỏi phản xạ áp lực thời gian
├── images/                    # Hình ảnh nén WebP nội bộ (<150KB): hero-cpr, child, team (Chuẩn Mục 5)
├── assets/
│   └── icons/                 # Logo SVG MedFA và biểu tượng nhận diện
├── docs/
│   ├── KE_HOACH_PHAN_CONG_NHOM.md # Kế hoạch phân công & ma trận đóng góp của nhóm
│   ├── DATA_SCHEMA_SPEC.md        # Đặc tả cấu trúc Schema JSON cho dữ liệu sơ cứu
│   ├── SEO_SCHEMA_SATELLITE.md    # Đặc tả Schema.org JSON-LD và Open Graph Web Vệ Tinh
│   └── GUIDE_DATA_PREPARATION.md  # Hướng dẫn thu thập & rà soát dữ liệu y khoa
└── archive/
    └── legacy-js/             # Lưu trữ các file script phiên bản cũ (flashcard.js, search.js)
```

---

## ⚡ 3. CÔNG NGHỆ ÁP DỤNG (ZERO-DEPENDENCY STACK)

Tuân thủ quy định không sử dụng Framework nặng nhằm đảm bảo sinh viên nắm vững bản chất công nghệ Web:
* **HTML5 Semantic:** Cấu trúc ngữ nghĩa cao (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`).
* **CSS3 Pure & 3D Transforms:**
  * Không dùng CDN runtime của Tailwind/Bootstrap.
  * Hiệu ứng không gian 3 chiều: `perspective: 1000px`, `transform-style: preserve-3d`, `rotateY(180deg)`.
  * Bộ đếm thời gian tròn SVG: `stroke-dasharray` & `stroke-dashoffset`.
* **Vanilla JavaScript (ES6+):**
  * Mô hình Module Pattern tách biệt độc lập, không xung đột biến toàn cục.
  * Xử lý bất đồng bộ (`async`/`await`, `fetch()`).
  * Quản lý bộ nhớ trình duyệt qua `localStorage` và `sessionStorage`.
* **Trí tuệ Nhân tạo (Generative AI):**
  * Tích hợp trực tiếp Google Gemini API (`gemini-1.5-flash:generateContent`).
  * System Instruction định hướng phản xạ chuẩn AHA/ERC.
  * Cơ chế Fallback ngoại tuyến 100% khi không có mạng hoặc không có API Key.

---

## 👥 4. BẢNG PHÂN CÔNG CÔNG VIỆC & MA TRẬN ĐÓNG GÓP

| STT | Họ và Tên | MSSV | Vai trò chính | Module & Sản phẩm đầu ra | Tỷ lệ |
| :---: | :--- | :---: | :--- | :--- | :---: |
| 1 | **Nguyễn Trung Kiên** | 24520888 | Trưởng nhóm, Logic & AI | `js/storage.js`, `js/chatbot-gemini.js`, `docs/SEO_SCHEMA_SATELLITE.md`, Chuẩn hóa Repo & `README.md`, Merge & Đồng bộ toàn dự án | **25%** |
| 2 | **Trần Gia Phú** | 24521365 | UI/UX & Motion 3D | `flashcards.html`, `timed-practice.html`, `css/interactive-3d.css`, `js/flashcard-controller.js`, `js/timed-practice.js`, `data/timed_practice.json` | **25%** |
| 3 | **Hồ Tấn Khải** | 24520721 | Quản lý Dữ liệu Y tế | Chuẩn hóa `data/topics.json`, `docs/DATA_SCHEMA_SPEC.md`, Ảnh offline `images/*`, `components/medical-disclaimer.html`, Khung Báo cáo đồ án | **25%** |
| 4 | **Trương Đỗ Như Quỳnh** | 24521513 | Tương tác & Form Dev | `contact.html`, `js/contact-validation.js`, `quiz.html`, `data/quiz.json`, `js/quiz-engine.js`, `css/contact-quiz.css`, Menu navigation | **25%** |
| **TỔNG** | **4 thành viên** | | | | **100%** |

---

## 🚀 5. HƯỚNG DẪN CÀI ĐẶT & CHẠY THỬ NGHIỆM

Website MedFA được thiết kế để có thể chạy mượt mà trên mọi môi trường phát triển:

### Cách 1: Sử dụng VS Code Live Server (Khuyên dùng)
1. Cài đặt extension **Live Server** (Ritwick Dey) trên Visual Studio Code.
2. Chuột phải vào file `index.html` chọn **"Open with Live Server"**.
3. Website sẽ tự động mở tại địa chỉ `http://127.0.0.1:5500/`.

### Cách 2: Sử dụng Python HTTP Server
Mở terminal tại thư mục `project MedFA`:
```bash
# Python 3
python -m http.server 8000
```
Sau đó truy cập `http://localhost:8000/` trên trình duyệt.

### Cách 3: Kiểm tra Chế độ Ngoại Tuyến (Offline / file:///)
Website tích hợp sẵn bộ dữ liệu tĩnh nhúng (`DataLoader fallback`) và bộ kịch bản phản xạ y tế nội bộ, cho phép bạn mở trực tiếp bất kỳ file `.html` nào trên trình duyệt mà không cần cài đặt Web server.
