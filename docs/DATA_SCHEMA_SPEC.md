# Đặc tả dữ liệu chủ đề MedFA

`data/topics.json` chứa một mảng đối tượng. `js/data-loader.js` nạp mảng này và dùng bộ dữ liệu nhúng khi không tải được JSON. Hai bộ dữ liệu dùng cùng cấu trúc. Bộ nhúng có ít chủ đề hơn.

| Trường | Kiểu | Quy tắc |
| --- | --- | --- |
| `id` | Chuỗi | Không dấu, dạng `kebab-case`, duy nhất. Giữ ID ổn định vì trang chi tiết dùng `?id=`. |
| `title`, `fullTitle` | Chuỗi | Tên ngắn trên thẻ và tên đầy đủ trên trang chi tiết. |
| `category`, `categoryLabel` | Chuỗi | Mã bộ lọc và nhãn tiếng Việt tương ứng. |
| `criticalLevel` | Chuỗi | Một trong `low`, `medium`, `high`, `critical`. Giao diện sắp xếp từ `critical` đến `low`. |
| `badgeType`, `badgeClass` | Chuỗi | Nhãn và lớp màu trên thẻ chủ đề. |
| `readTime` | Chuỗi | Thời gian đọc, ví dụ `"3 phút"`. |
| `standard` | Chuỗi | Ghi chú về tài liệu tham chiếu. Đưa link cụ thể vào `sources` khi có. |
| `iconSvg` | Chuỗi | SVG nội tuyến do nhóm kiểm soát. |
| `shortDesc`, `lead`, `emergencyAlert` | Chuỗi | Tóm tắt, đoạn mở đầu và cảnh báo riêng của chủ đề. |
| `steps` | Mảng đối tượng | Ít nhất một bước. Mỗi bước có `stepNumber` là số nguyên liên tiếp từ 1, `title` và `desc` là chuỗi. |
| `dos`, `donts` | Mảng chuỗi | Danh sách điều nên làm và nên tránh. Mỗi danh sách có ít nhất một mục. |
| `timeline` | Mảng đối tượng, tùy chọn | Mỗi mốc có `time`, `status`, `level` là chuỗi. Có thể bỏ trường hoặc dùng mảng rỗng. |
| `sources` | Mảng đối tượng, tùy chọn | Mỗi nguồn có `name`, URL tuyệt đối HTTPS tại `url` và có thể ghi `accessDate` dạng `DD/MM/YYYY`. Chỉ ghi nguồn đã dùng cho bài. |
| `video` | Đối tượng, tùy chọn | Có `creator` và `youtubeUrl` dạng HTTPS. |
| `needsMedicalReview` | Boolean, tùy chọn | Đặt `true` cho bài cần đối chiếu trước khi hiển thị cảnh báo và hướng dẫn thao tác. Gỡ cờ sau khi đã rà nội dung và ghi nguồn cụ thể. |

Các mã danh mục là `sinh-hoat` (Sinh hoạt), `tre-em` (Trẻ em), `ngoai-troi` (Ngoài trời), `benh-ly` (Bệnh lý) và `tai-nan` (Tai nạn).

`so-cuu-chay-mau-cam` trong [data/topics.json](../data/topics.json) là ví dụ đầy đủ có bước, nguồn và video. Khi thêm bài, kiểm tra ID, thứ tự bước, mã danh mục và mức khẩn cấp. Mở bài qua trang thư viện để kiểm tra dữ liệu hiển thị. Dùng `node -e "require('./data/topics.json')"` để kiểm tra cú pháp JSON.

Khi chỉnh nội dung sơ cứu, ghi rõ tài liệu và mục được đối chiếu. Nhóm có thể dùng hướng dẫn [sơ cứu AHA và American Red Cross 2024](https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines), [CPR và chăm sóc tim mạch khẩn cấp AHA 2025](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines) và [hướng dẫn ERC 2025](https://www.erc.edu/science-research/guidelines/guidelines-2025).
