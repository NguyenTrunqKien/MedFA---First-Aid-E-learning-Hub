# Kiến trúc CSS & Hướng dẫn Tái lập `css/medfa.min.css` (MedFA)

Tài liệu này tổng hợp toàn bộ hệ thống tệp CSS của dự án **MedFA**, giải thích kiến trúc phân tầng CSS hiện tại, lý do sử dụng bản nén `css/medfa.min.css`, thời điểm tệp này được nạp, và hướng dẫn chi tiết cách tái lập (build lại) khi chỉnh sửa giao diện.

---

## 1. Bảng tổng hợp toàn bộ tệp CSS trong dự án

| Tên file | Dung lượng | Ý nghĩa / Vai trò | Được nạp ở trang nào | Nằm trong `medfa.min.css`? |
| :--- | :---: | :--- | :--- | :---: |
| `css/medfa.min.css` | ~56.3 KB | **Bản gộp & nén (Production Bundle)** của 6 file CSS lõi bên dưới. | **Cả 8 trang HTML** | *(File đầu ra)* |
| `css/variables.css` | ~5.1 KB | Khai báo Design Tokens (`:root`): bảng màu chuẩn y khoa (Material 3), khoảng cách (`--space-*`), font chữ, bo góc, bóng đổ. | Nguồn build cho cả 8 trang | **Có (Thứ tự 1)** |
| `css/base.css` | ~5.2 KB | CSS Reset, thiết lập mặc định cho `html`/`body`, kiểu chữ cơ bản, styling các thẻ ngữ nghĩa (`abbr`, `address`, `blockquote`, `sup`/`sub`). | Nguồn build cho cả 8 trang | **Có (Thứ tự 2)** |
| `css/layout.css` | ~6.6 KB | Cấu trúc bố cục khung trang: Header cố định (`.medfa-header`), Mobile Drawer, Footer, container lưới chính. | Nguồn build cho cả 8 trang | **Có (Thứ tự 3)** |
| `css/components.css` | ~15.9 KB | Style cho các thành phần UI: nút bấm (`.btn`), thẻ tình huống (`.first-aid-card`), bộ đếm nhịp CPR (`.cpr-metronome-card`), bảng thông số (`.medfa-table`), khung Chatbot AI, thanh tiến độ đọc & nút Back-to-top. | Nguồn build cho cả 8 trang | **Có (Thứ tự 4)** |
| `css/utilities.css` | ~36.5 KB | Tập hợp các lớp tiện ích (utility classes kiểu Tailwind: `flex`, `grid`, `p-*`, `text-*`, `bg-*`...) được biên dịch/định nghĩa sẵn để dùng trực tiếp mà không cần Tailwind CLI. | Nguồn build cho cả 8 trang | **Có (Thứ tự 5)** |
| `css/responsive.css` | ~7.6 KB | Quy tắc Responsive theo các breakpoint (Mobile `<640px`, Tablet `640–1023px`, Desktop `≥1024px`, màn hình rộng `≥1440px`), hỗ trợ `prefers-reduced-motion` và định dạng in ấn (`@media print`). | Nguồn build cho cả 8 trang | **Có (Thứ tự 6)** |
| `css/contact-quiz.css` | ~13.7 KB | Giao diện riêng cho Form liên hệ (validation, toast) và Trang trắc nghiệm tình huống (thanh tiến độ, phương án A–D, hộp giải thích, kết quả). | **Chỉ** `contact.html`, `quiz.html` | Không *(nạp riêng)* |
| `css/interactive-3d.css` | ~30.2 KB | Hiệu ứng lật thẻ 3D (`rotateY`, `perspective`), thanh điều khiển Quizlet-style, màn hình tổng kết phiên học và hiệu ứng pháo hoa giấy (`confetti`). | **Chỉ** `flashcards.html` | Không *(nạp riêng)* |

---

## 2. Thiết kế kiến trúc CSS hiện tại của nhóm

Hệ thống CSS của MedFA được tổ chức theo **2 nguyên tắc cốt lõi**:

### A. Kiến trúc phân tầng (Layered CSS Architecture)
6 file CSS lõi được xếp theo thứ tự ưu tiên từ **tổng quát → cụ thể → ghi đè theo màn hình** (đúng cơ chế CSS Cascade):

```text
1. variables.css   ──► Định nghĩa biến màu sắc, font, spacing (:root)
2. base.css        ──► Reset mặc định & kiểu chữ nền
3. layout.css      ──► Khung Header, Footer, bố cục tổng thể
4. components.css  ──► Các thành phần UI tái sử dụng (.btn, .medfa-table, .first-aid-card...)
5. utilities.css   ──► Các class tiện ích nhanh (flex, grid, gap, padding, màu sắc...)
6. responsive.css  ──► Media queries điều chỉnh cho Mobile / Tablet / Print (ghi đè cuối cùng)
```

### B. Tách CSS đặc thù theo trang (Page-level CSS Splitting)
Thay vì gộp tất cả CSS của toàn bộ website vào một file khổng lồ, nhóm chỉ gộp **6 file dùng chung cho cả 8 trang** vào `medfa.min.css`. Hai module nặng và chỉ dùng ở trang riêng được tách độc lập:
- `contact-quiz.css` chỉ nạp ở `contact.html` và `quiz.html`.
- `interactive-3d.css` chỉ nạp ở `flashcards.html`.
→ Nhờ vậy, trang chủ (`index.html`), thư viện (`topics.html`) và trang chi tiết (`topic-detail.html`) không phải tải thừa ~44 KB CSS của hiệu ứng 3D và form trắc nghiệm.

---

## 3. Khi nào `css/medfa.min.css` được sử dụng?

- **Trên môi trường chạy thực tế (Trình duyệt / Localhost / GitHub Pages / Vercel)**:
  - Cả **8 trang HTML** đều nạp trực tiếp `<link rel="stylesheet" href="css/medfa.min.css">` bên trong thẻ `<head>`.
  - Trình duyệt tải `medfa.min.css` ngay lập tức (render-blocking có chủ đích) để trang hiển thị đúng giao diện ngay từ khung hình đầu tiên, tránh hiện tượng **FOUC** (*Flash of Unstyled Content* — nháy giao diện vỡ chữ trước khi có CSS).
- **Trong quá trình phát triển (Development)**:
  - 6 file nguồn (`variables.css` → `responsive.css`) là nơi lập trình viên **đọc và chỉnh sửa CSS**.
  - **Lưu ý quan trọng**: Trình duyệt **không nạp trực tiếp** 6 file nguồn này. Sau khi sửa bất kỳ file nào trong 6 file nguồn, bắt buộc phải **build lại `css/medfa.min.css`** thì thay đổi mới xuất hiện trên website.

---

## 4. Tại sao dùng `css/medfa.min.css` tối ưu hơn nạp lẻ 6 file CSS?

| Tiêu chí | Nạp lẻ 6 file CSS nguồn | Nạp 1 file `css/medfa.min.css` |
| :--- | :--- | :--- |
| **Số lượng HTTP Request** | **6 request** chặn render trong `<head>` | **1 request duy nhất** — rút ngắn Critical Rendering Path |
| **Dung lượng file thô** | ~77.0 KB (gồm nhiều comment, khoảng trắng, xuống dòng) | **~56.3 KB** (giảm ~27% trước nén; chỉ còn ~10–12 KB khi nén gzip/brotli trên server) |
| **Tốc độ hiển thị (FCP / LCP)** | Chậm hơn trên mạng di động do nhiều vòng bắt tay & chờ tải 6 file | Nhanh và ổn định hơn, đạt điểm cao trên Lighthouse |
| **Cơ chế Cache trình duyệt** | Phải quản lý & kiểm tra cache cho 6 file riêng | Tải & cache **1 lần duy nhất** ở trang đầu tiên; 7 trang còn lại dùng ngay từ cache |

---

## 5. Phương pháp tái lập (Build lại) `css/medfa.min.css`

> **Bắt buộc giữ đúng thứ tự 6 file:**
> `variables.css` → `base.css` → `layout.css` → `components.css` → `utilities.css` → `responsive.css`
> *(Nếu đảo thứ tự, `responsive.css` có thể bị `layout.css`/`utilities.css` ghi đè ngược lại làm lệch giao diện mobile.)*

### Cách 1 — Dùng `npx clean-css-cli` (Khuyên dùng, nhanh & chuẩn nhất)
Chỉ cần máy đã cài Node.js (không cần tạo `package.json`). Mở terminal tại thư mục gốc dự án và chạy:

```powershell
npx -y clean-css-cli -o css/medfa.min.css css/variables.css css/base.css css/layout.css css/components.css css/utilities.css css/responsive.css
```

### Cách 2 — Dùng Node.js thuần (Chạy được offline, không cần tải gói từ mạng)
Chạy trực tiếp trong PowerShell tại thư mục gốc dự án:

```powershell
node -e "const fs=require('fs');const files=['variables','base','layout','components','utilities','responsive'];const css=files.map(f=>fs.readFileSync('css/'+f+'.css','utf8')).join('\n').replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,' ').replace(/\s*([{}:;,>~+])\s*/g,'$1').replace(/;}/g,'}').trim();fs.writeFileSync('css/medfa.min.css',css,'utf8');console.log('Build xong css/medfa.min.css:', css.length, 'bytes');"
```

### Cách 3 — Không dùng dòng lệnh (Thủ công)
1. Ghép nội dung 6 file theo đúng thứ tự `variables.css` → `base.css` → `layout.css` → `components.css` → `utilities.css` → `responsive.css`.
2. Đưa vào công cụ nén CSS (như extension **Minify** trên VS Code hoặc công cụ CSS Minifier trực tuyến).
3. Lưu kết quả ghi đè vào `css/medfa.min.css`.

---

## 6. Quy trình chuẩn khi thành viên nhóm muốn sửa CSS

1. **Không sửa trực tiếp** vào `css/medfa.min.css` (vì file đã nén thành 1 dòng, rất khó đọc và sẽ bị ghi đè mất ở lần build sau).
2. Mở đúng file nguồn tương ứng trong `css/` (`variables.css`, `components.css`, `responsive.css`...) để chỉnh sửa.
3. Chạy lệnh **Cách 1** (hoặc **Cách 2**) ở mục 5 để cập nhật lại `css/medfa.min.css`.
4. Tải lại trình duyệt (nhấn `Ctrl + Shift + R` để xóa cache cũ) và kiểm tra giao diện trên cả Desktop lẫn Mobile.
