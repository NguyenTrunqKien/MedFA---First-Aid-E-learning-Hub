# MedFA – Medical First Aid E-Learning Hub

> **Dự án Frontend Web Sơ cấp cứu Y tế Vì Cộng Đồng**  
> Đồ án môn học: **IE104 - Thiết kế Giao diện Người dùng (UI/UX)**  
> Trường Đại học Công nghệ Thông tin – ĐHQG-HCM (UIT)

---

## 🌟 1. Giới thiệu Dự án

**MedFA** là nền tảng trực tuyến phi lợi nhuận chuyên tổng hợp, chuẩn hóa và phổ biến kiến thức sơ cấp cứu ban đầu theo các tiêu chuẩn y khoa quốc tế (**AHA** - Hiệp hội Tim mạch Hoa Kỳ, **ERC** - Hội đồng Hồi sinh Tim phổi Châu Âu và **Bộ Y Tế Việt Nam**). Dự án hướng tới mục tiêu cung cấp giải pháp tra cứu phản xạ cấp cứu tức thì trong "4 Phút Vàng" sinh tử.

---

## 🏗️ 2. Cấu trúc Thư mục Dự án

```
project MedFA/
├── index.html                 (Trang chủ: Giới thiệu & Số liệu thực trạng)
├── topics.html                (Thư viện tình huống sơ cứu: Lọc danh mục, tìm kiếm động)
├── topic-detail.html          (Chi tiết 1 tình huống - load động theo ?id=...)
├── social-impact.html         (Tác động xã hội: Bức tranh thực trạng & giải pháp)
├── about.html                 (Giới thiệu dự án, đội ngũ IE104, chuẩn y khoa & miễn trừ)
├── components/
│   ├── header.html            (Component Header & Navigation dùng chung)
│   └── footer.html            (Component Footer & Chat AI Assistant dùng chung)
├── css/
│   ├── variables.css          (Màu sắc Material 3 / LifeSafe, Spacing, Typography)
│   ├── base.css               (CSS Reset, Typography cơ bản, Smooth scroll)
│   ├── layout.css             (Grid, Flexbox, Container, Header/Footer layout)
│   ├── components.css         (Card, Button, Badge, Modal, Chat widget, Alert)
│   ├── utilities.css          (Tiện ích CSS3 thuần thay thế hoàn toàn Tailwind)
│   └── responsive.css         (Media queries chuẩn Mobile, Tablet, Desktop)
├── js/
│   ├── data-loader.js         (DataLoader: Fetch JSON tĩnh, cache bộ nhớ, fallback an toàn)
│   ├── render-topics.js       (TopicsRenderer: Template Literal Card, filter & search)
│   └── main.js                (Khởi tạo chung, chèn Header/Footer, Active nav, Trợ lý AI)
├── data/
│   └── topics.json            (Dữ liệu 11 tình huống cấp cứu chuẩn hóa y khoa)
├── assets/
│   ├── icons/                 (Logo SVG MedFA và biểu tượng)
│   └── images/
├── docs/
│   └── GUIDE_DATA_PREPARATION.md (Hướng dẫn chuẩn bị dữ liệu cào chuẩn schema)
├── scripts/
│   ├── build-utilities-css.js (Build CSS tiện ích thuần tự động từ code dự án)
│   ├── validate-topics.js     (Kiểm thử tính hợp lệ và chuẩn y khoa của topics.json)
│   └── verify-all.js          (Kiểm tra toàn diện tính nguyên vẹn & tiêu chuẩn thuần)
└── README.md
```

---

## 🎯 3. Các Tính Năng Đã Hiện Thực Hóa

1. **Bóc tách & Chuẩn hóa Giao diện từ Stitch**:
   - Chuyển toàn bộ 5 màn hình Stitch vào thư mục gốc (`index.html`, `topics.html`, `topic-detail.html`, `social-impact.html`, `about.html`).
   - Loại bỏ inline styling cố định `width: 1280px` để giao diện co giãn hoàn toàn responsive từ thiết bị di động (< 480px) đến màn hình lớn.
2. **Quy hoạch Header & Footer tập trung (DRY)**:
   - Tách thanh Navigation và Footer thành component dùng chung trong thư mục `components/` (`components/header.html` và `components/footer.html`).
   - `main.js` tự động fetch và inject vào mọi trang qua `<div id="header-placeholder"></div>` và `<div id="footer-placeholder"></div>`.
   - Tự động nhận diện trang đang mở và đánh dấu (highlight) active tab tương ứng.
3. **Làm rỗng Container & Render Động**:
   - Xóa bỏ các card HTML tĩnh trên `topics.html`.
   - Giữ lại 1 card mẫu chuẩn hóa dưới dạng Template Literal trong `js/render-topics.js`.
   - Kết nối với `data/topics.json` thông qua `DataLoader` để render danh sách, hỗ trợ lọc theo danh mục (Trẻ em, Sinh hoạt, Ngoài trời, Bệnh lý), tìm kiếm trực tiếp và sắp xếp.
4. **Trang Chi Tiết Tình Huống Động**:
   - `topic-detail.html` tự động nhận diện query parameter `?id=...` để nạp dữ liệu chi tiết tương ứng từ `DataLoader`.
5. **Trợ lý AI Cấp cứu 24/7 (Floating Widget)**:
   - Tích hợp cửa sổ chat phản xạ cấp cứu, đưa ra gợi ý nhanh về ép tim CPR, sơ cứu hóc dị vật Heimlich, xử trí bỏng nhiệt và cầm máu.

---

## 🚀 4. Hướng Dẫn Chạy Thử Dự Án

### Cách 1: Sử dụng VS Code Live Server (Khuyên dùng)
1. Mở thư mục `project MedFA` trong VS Code.
2. Nhấp chuột phải vào file `index.html` và chọn **"Open with Live Server"**.
3. Website sẽ chạy tại địa chỉ `http://127.0.0.1:5500/index.html`.

### Cách 2: Sử dụng Python HTTP Server
Mở terminal tại thư mục dự án và chạy:
```bash
python -m http.server 8000
```
Sau đó truy cập: `http://localhost:8000/index.html`

### Cách 3: Mở trực tiếp file HTML
- Các file JavaScript đã được tích hợp cơ chế **Graceful Fallback**: nếu trình duyệt chặn Fetch API do chính sách CORS cục bộ của `file:///`, hệ thống sẽ tự động kích hoạt bộ dữ liệu và template nhúng sẵn trong JS để giao diện luôn hiển thị đầy đủ và không bị lỗi trống trang!
