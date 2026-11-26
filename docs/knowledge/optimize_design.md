# Thiết kế Tối ưu Hiệu suất, Khả năng Chịu tải & Chiến lược Lưu trữ Dữ liệu (MedFA)

Tài liệu này phân tích năng lực chịu tải thực tế của kiến trúc **MedFA** hiện tại, tổng hợp các kỹ thuật tối ưu hiệu suất đã áp dụng kèm lý do kỹ thuật, và đánh giá bài toán lưu trữ dữ liệu bằng JSON tĩnh so với lộ trình chuyển đổi sang Cơ sở dữ liệu (Database) khi mở rộng.

---

## 1. Khả năng chịu tải: Hệ thống hiện tại phục vụ được bao nhiêu người dùng cùng lúc (CCU) mà không bị nghẽn?

Để đánh giá chính xác, cần tách hệ thống MedFA thành **2 luồng xử lý độc lập** có đặc tính chịu tải hoàn toàn khác nhau:

### A. Luồng 1: Website tra cứu, Flashcard & Trắc nghiệm (HTML, CSS, JS, WebP, JSON)
- **Kiến trúc**: 100% **Static Assets phân phát qua CDN toàn cầu** (Vercel Edge Network / GitHub Pages CDN). Không có truy vấn Database trên máy chủ; toàn bộ thao tác tìm kiếm, lọc danh mục, lật thẻ Flashcard và chấm điểm Quiz chạy trực tiếp trên CPU/RAM trình duyệt người dùng (**Client-side Compute**).
- **Năng lực chịu tải**: Có thể phục vụ đồng thời **hàng chục nghìn đến trên 50.000 người dùng cùng lúc (CCU)** mà **không bao giờ nghẽn CPU hay tràn RAM máy chủ**.
- **Giới hạn thực tế duy nhất**: Nằm ở **hạn mức băng thông (Bandwidth Quota)** của gói hosting miễn phí (ví dụ Vercel Hobby cấp 100 GB/tháng). Với tổng dung lượng tải lần đầu trung bình ~150–250 KB/người (sau nén gzip/brotli và chưa tính browser cache ở các lần truy cập sau), gói miễn phí vẫn gánh được khoảng **400.000 – 700.000 lượt truy cập mới mỗi tháng**.

### B. Luồng 2: Trợ lý AI Sơ cấp cứu (`api/chat.js` → Google Gemini API)
- **Điểm nghẽn (Bottleneck) duy nhất**: Đây là tính năng duy nhất đi qua Serverless Function (`api/chat.js`) và gọi ra API bên thứ ba (Gemini API).
  - Trên **Gemini API gói miễn phí**, giới hạn tốc độ thường ở mức khoảng **15 lượt hỏi/phút (RPM)** cho mỗi API key dùng chung → nếu có nhiều hơn ~15 người gửi câu hỏi AI trong cùng 1 phút sẽ chạm ngưỡng Rate Limit (`429`).
  - Trên gói trả phí (Pay-as-you-go), giới hạn tăng lên hàng nghìn RPM và có thể mở rộng tuyến tính.
- **Cơ chế chống sập (Graceful Degradation)**: Khi chạm giới hạn API hoặc mất mạng, module `js/chatbot-gemini.js` tự động chuyển sang **bộ quy tắc phản xạ sơ cứu ngoại tuyến (Offline AHA/ERC Rules)** chạy ngay trên trình duyệt — đảm bảo người dùng vẫn nhận được hướng dẫn cấp cứu khẩn cấp mà hệ thống không bị treo.

---

## 2. Các kỹ thuật tối ưu hiệu suất nhóm đã áp dụng & Lý do lựa chọn

| Nhóm tối ưu | Kỹ thuật đã triển khai trong MedFA | Lý do lựa chọn & Hiệu quả đạt được |
| :--- | :--- | :--- |
| **Hình ảnh & LCP** | - Chuyển toàn bộ ảnh sang **WebP** (`images/*.webp`).<br>- Dùng `<picture>` + `<source media="(max-width: 639px)">` tách ảnh mobile/desktop (`hero-cpr-sm.webp` chỉ **10 KB** vs `22.6 KB`).<br>- Gắn `<link rel="preload" as="image" fetchpriority="high">` cho ảnh Hero.<br>- Gắn `loading="lazy" decoding="async"` và khai báo sẵn `width`/`height` cho ảnh bên dưới. | Giảm mạnh dung lượng ảnh trên mạng di động, ưu tiên tải ảnh **LCP (Largest Contentful Paint)** ngay từ giây đầu tiên và triệt tiêu lỗi giật layout (**CLS**) khi ảnh chưa tải xong. |
| **Font & Icon** | - Dùng `preconnect` tới `fonts.googleapis.com` & `fonts.gstatic.com`.<br>- Tải font bất đồng bộ (`media="print" onload="this.media='all'"`).<br>- **Subsetted Material Symbols** (`&icon_names=...` chỉ tải đúng ~90 icon dự án sử dụng). | Tránh chặn dựng giao diện (non-render-blocking) và giảm kích thước bộ icon từ **1.088 KiB xuống còn ~15 KiB** (tiết kiệm >98% băng thông). |
| **CSS Architecture** | - Gộp & nén 6 file CSS lõi thành 1 file `css/medfa.min.css` (~56 KB thô / ~11 KB gzip).<br>- Tách riêng `contact-quiz.css` và `interactive-3d.css` chỉ nạp ở trang dùng. | Giảm từ **6 request CSS xuống 1 request**, rút ngắn Critical Rendering Path, cache 1 lần cho cả 8 trang và tránh tải thừa ~44 KB CSS ở các trang không dùng 3D/Quiz. |
| **JS & Component Splitting** | - Toàn bộ script đặt ở cuối `<body>` với thuộc tính `defer`.<br>- Tách `js/components/` thành 3 module theo phạm vi trang (`layout.js`, `cards.js`, `detail.js`).<br>- **Conditional Mounting**: chỉ gắn `CPR_METRONOME_HTML` và `CPR_TABLE_HTML` vào DOM khi `isCprTopic(topic) === true`.<br>- Đóng gói template trong JS thay vì `fetch()` từng file `.html`. | Không chặn dựng HTML; các trang nhẹ (`quiz`, `contact`, `flashcards`) không tải thừa code của `cards.js`/`detail.js`; loại bỏ chuỗi chờ `fetch()` nối tiếp (network waterfall) và redirect `308` trên Vercel `cleanUrls`. |
| **Dữ liệu & Chuyển động mượt** | - Cache `data/topics.json` trên RAM (`topicsCache` trong `data-loader.js`).<br>- Giữ `min-h-[480px]` + 6 thẻ Skeleton Loading trên `topics.html`.<br>- Thanh tiến độ đọc bài dùng `transform: scaleX()` (GPU compositing) và `scroll` listener `{ passive: true }`; Scroll-Reveal dùng `IntersectionObserver`. | Tránh tải lại JSON nhiều lần; ngăn dịch chuyển bố cục (CLS ≈ 0); giữ tốc độ cuộn trang mượt 60 FPS không gây reflow/repaint nặng. |

---

## 3. Đánh giá việc lưu dữ liệu tập trung bằng JSON (`data/topics.json`)

Hiện tại toàn bộ 33 tình huống sơ cấp cứu được lưu tập trung trong `data/topics.json` (~135 KB thô, **~28 KB sau nén gzip**) cùng bản tiếng Anh `data/en/topics.json` (~121 KB) và bộ câu hỏi `data/quiz.json` (~10 KB).

### A. Tại sao nhóm vẫn chọn JSON tĩnh trong thiết kế hiện tại?
Trong giai đoạn hiện tại (nền tảng giáo dục cộng đồng phi lợi nhuận, dữ liệu chủ yếu là **Read-only** — đọc nhiều, ít thay đổi), chọn JSON tập trung theo kiến trúc **JAMstack / Static-First** là lựa chọn tối ưu vì:
1. **Chi phí vận hành bằng 0**: Không cần thuê máy chủ Database, không gặp tình trạng "ngủ đông" (cold start 2–5 giây) thường thấy ở các gói Database/Backend miễn phí.
2. **Tìm kiếm & lọc tức thì (< 1 ms)**: Sau khi tải ~28 KB (gzip) 1 lần duy nhất và cache trên RAM, mọi thao tác gõ tìm kiếm tiếng Việt không dấu, lọc danh mục, sắp xếp đều phản hồi tức thì mà **không tốn thêm request server nào**.
3. **Độ tin cậy cực cao & hỗ trợ ngoại tuyến**: File JSON được CDN nhân bản toàn cầu (không bao giờ chết vì quá tải kết nối DB), kết hợp `FALLBACK_TOPICS` giúp mở offline vẫn hoạt động.
4. **Kiểm soát chất lượng y khoa qua Git**: Mọi chỉnh sửa nội dung sơ cấp cứu đều có lịch sử Git (commit/diff/review) rõ ràng, dễ đối chiếu nguồn AHA/ERC.

### B. Khi nào KHÔNG nên dùng 1 file JSON tập trung nữa?
Kiến trúc 1 file JSON sẽ bắt đầu bộc lộ nhược điểm và **cần chuyển đổi** khi dự án chạm tới một trong các ngưỡng sau:
- **Quy mô nội dung lớn**: Vượt quá **~200–500 tình huống** hoặc file `topics.json` vượt **500 KB – 1 MB** (làm chậm lần tải đầu tiên và tốn RAM trên điện thoại cấu hình thấp).
- **Cần giao diện quản trị (CMS) cho biên tập viên / chuyên gia y tế**: Khi người không biết lập trình cần thêm/sửa/duyệt bài sơ cứu trực tiếp mà không phải sửa file JSON và deploy lại Git.
- **Cần lưu dữ liệu đóng góp từ cộng đồng (Write)**: Lưu thực tế các phản hồi và đề xuất tình huống mới gửi từ `contact.html`, báo lỗi nội dung hoặc thống kê các tình huống được tra cứu nhiều nhất (không cần làm hệ thống đăng nhập/tài khoản người dùng).
- **Cần tìm kiếm toàn văn nâng cao (Full-Text Search)** theo từ khóa/triệu chứng trên hàng trăm đến hàng nghìn bài viết.

### C. Lộ trình nâng cấp & Lựa chọn Hệ quản trị CSDL gọn nhẹ phù hợp

Vì MedFA là nền tảng tra cứu mở vì cộng đồng (**không lưu tài khoản người dùng**, chủ yếu là đọc nội dung và nhận góp ý), không cần các hệ quản trị CSDL nặng nề. Lộ trình nâng cấp gồm **2 giai đoạn**:

#### Giai đoạn 1 — Mở rộng nội dung (100–500 bài, vẫn giữ kiến trúc tĩnh siêu nhanh)
- **Tách nhỏ JSON (Index + Detail Splitting)**:
  - `data/topics-index.json` (~15–20 KB): Chỉ chứa metadata tóm tắt (`id`, `title`, `category`, `shortDesc`, `readTime`) để nạp cực nhanh cho `topics.html`.
  - `data/topics/<id>.json` (~4 KB/bài): Chỉ tải đúng 1 file chi tiết khi người dùng mở `topic-detail.html?id=<id>`.
- Có thể kết hợp **Headless CMS** nhẹ (như **Decap CMS** gắn thẳng vào GitHub, hoặc **Sanity**) để biên tập viên cập nhật bài dễ dàng mà vẫn xuất ra file tĩnh.

#### Giai đoạn 2 — Chuyển sang CSDL gọn nhẹ (Khi có >500 bài, CMS, tìm kiếm FTS hoặc lưu form góp ý)

| Hệ quản trị CSDL | Mức độ phù hợp với MedFA | Lý do & Trường hợp nên chọn |
| :--- | :---: | :--- |
| **SQLite** *(hoặc bản Cloud nhẹ cho Serverless: **Turso / Cloudflare D1**)* | **Nhẹ nhất & Khuyên dùng số 1** | **Nhẹ nhất trong các HQT CSDL**: toàn bộ dữ liệu gói gọn trong 1 file duy nhất, không cần server DB nặng, tốc độ đọc cực nhanh cho web tra cứu. Hỗ trợ sẵn **FTS5** (Full-Text Search) và **JSON** để lưu `steps`/`dos`/`donts`. Khi deploy trên Vercel Serverless (không lưu đĩa cứng cục bộ), dùng **Turso (libSQL)** hoặc **Cloudflare D1** để giữ nguyên sự siêu nhẹ của SQLite mà vẫn chạy cloud ổn định. |
| **MongoDB Atlas** *(Gói Free M0)* | Phù hợp nếu muốn giữ nguyên JSON | Lưu trực tiếp từng tình huống trong `topics.json` thành 1 Document mà không cần tách bảng quan hệ; thích hợp để lưu thêm bảng phản hồi (`feedbacks`) từ trang Liên hệ. |
| **PostgreSQL** *(Supabase / Neon Free)* | Chỉ cân nhắc nếu mở rộng quy mô lớn hơn | Mạnh về truy vấn phức tạp và kiểu cột `JSONB`, nhưng nặng hơn SQLite; chỉ nên chọn nếu tương lai dự án phát triển thêm hệ thống quản trị đa vai trò phức tạp. |

> **Nguyên tắc giữ vững hiệu năng khi lên Database:** Dù dùng SQLite (Turso/D1) hay MongoDB, vẫn nên đặt lớp **CDN Cache (`Cache-Control: s-maxage`)** phía trước API đọc bài viết (`GET /api/topics`) để giữ nguyên khả năng chịu tải hàng chục nghìn người tra cứu đồng thời mà không đánh liên tục vào Database.
