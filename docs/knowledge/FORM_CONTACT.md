# Cách form Contact gửi phản hồi

Người học gửi góp ý ngay trên [trang Contact](../../contact.html). Trình duyệt gửi biểu mẫu đến Google Apps Script. Nhóm MedFA xem phản hồi đã lưu trong tab **Câu trả lời** của Google Form **Phản hồi MedFA**.

## Từ lúc nhập đến lúc gửi

1. [Mã xử lý form](../../js/contact-validation.js) kiểm tra các trường khi người dùng nhập, rời khỏi ô và bấm **Gửi phản hồi**. Nếu có lỗi, trang hiển thị hướng dẫn bên dưới trường tương ứng và đưa con trỏ tới trường sai đầu tiên khi gửi.
2. Khi dữ liệu hợp lệ, nút chuyển sang **Đang gửi…**, hiện vòng xoay và tạm khóa để tránh gửi lặp. JavaScript gửi `POST` tới URL `/exec` trong thuộc tính `action` của form. Dữ liệu được mã hóa bằng `URLSearchParams(new FormData(form))`.
3. Ở phía Google, web app nhận các giá trị trong `doPost(e)` qua `e.parameter`, kiểm tra dữ liệu, ghép từng giá trị với câu hỏi tương ứng và gọi `response.submit()`. Mã Apps Script được quản lý trong dự án Google của nhóm.
4. Khi `fetch` hoàn tất, trang xóa các giá trị đã nhập và thay form bằng khung cảm ơn. Nút **Gửi phản hồi khác** mở lại form trống và đưa con trỏ về ô họ tên. Nếu trình duyệt báo lỗi mạng, trang giữ nội dung và mở lại nút gửi.

**Cách xác nhận đã lưu.** Lệnh gửi dùng `mode: 'no-cors'` nên trình duyệt không đọc được mã trạng thái hoặc nội dung trả về từ Apps Script. Khung cảm ơn có thể xuất hiện cả khi script gặp lỗi. Khi kiểm thử, hãy gửi một lời nhắn dễ nhận biết và đối chiếu trong tab **Câu trả lời**.

## Các trường mà Apps Script nhận

Tên trong cột đầu lấy từ thuộc tính `name` của HTML. Tiêu đề và loại câu hỏi trong hai cột cuối phải khớp với cấu hình mà script dùng để ghi dữ liệu.

| Trường POST | Giá trị gửi đi | Tiêu đề trong Google Form | Loại câu hỏi |
| --- | --- | --- | --- |
| `name` | Họ tên có ít nhất một ký tự ngoài khoảng trắng | Họ và tên | Trả lời ngắn |
| `email` | Địa chỉ email | Email | Trả lời ngắn |
| `phone` | Số di động Việt Nam, ví dụ `0912345678` hoặc `+84912345678` | Số điện thoại | Trả lời ngắn |
| `subject` | Một trong các mã `feedback`, `scenario`, `correction`, `other`. Script đổi mã thành tên chủ đề | Nội dung đóng góp | Trả lời ngắn |
| `message` | Nội dung góp ý do người dùng nhập | Lời nhắn | Đoạn văn |
| `consent` | Giá trị `on` khi đã tích ô xác nhận. Script ghi lời xác nhận | Xác nhận | Trả lời ngắn |

## Khi cần tìm lỗi

- **Hiện lời cảm ơn nhưng thiếu câu trả lời.** Vào **Executions** trong Apps Script, mở lần chạy `doPost` loại **Web app** đúng giờ gửi. Nếu chạy `doPost` bằng nút **Run** trong trình chỉnh sửa thì hàm thiếu đối số sự kiện `e`.
- **Lỗi khi mở biểu mẫu.** Kiểm tra `FORM_ID` lấy từ URL chỉnh sửa Google Form và quyền chỉnh sửa của tài khoản chạy web app.
- **Lỗi ở `asTextItem()` hoặc `asParagraphTextItem()`.** Đối chiếu cả tiêu đề lẫn loại câu hỏi theo bảng trên. Khoảng trắng ở cuối tiêu đề cũng làm phép tra theo tên thất bại.
- **Sau khi sửa script.** Cập nhật phiên bản trong **Deploy → Manage deployments**. Nếu tạo deployment mới và nhận URL khác, cập nhật `action` trong [contact.html](../../contact.html).

Chỉnh lời cảm ơn và nhãn nút cho hai ngôn ngữ trong [translations.js](../../js/translations.js). Kiểu hiển thị form, vòng xoay và khung cảm ơn nằm trong [contact-quiz.css](../../css/contact-quiz.css).
