# Thiết kế responsive của MedFA

Tài liệu ghi lại các thay đổi responsive đã thực hiện cho header dùng chung, Thư viện sơ cứu, quiz, luyện tập tính giờ và chatbot. Bản sửa dùng HTML, CSS và JavaScript thuần. Các điểm chuyển bố cục nằm trong CSS. JavaScript đồng bộ trạng thái của menu khi người dùng tương tác hoặc đổi kích thước cửa sổ.

## Bố cục hiện tại

| Thành phần | Cách thiết kế |
|---|---|
| **Header dùng chung** | Flexbox giữ kích thước của logo và cụm thao tác bên phải. Khung SVG của logo được thu gọn để giảm khoảng trống bên trong. Biểu tượng tìm kiếm, hamburger và mũi tên dùng SVG nội tuyến. Nút tìm kiếm, hamburger và nút ngôn ngữ có vùng bấm tối thiểu 44 px. |
| **Menu thu gọn** | Dưới 1280 px, các liên kết điều hướng chính nằm trong hamburger. Menu có giới hạn chiều cao theo viewport và cuộn dọc được khi màn hình thấp. Khi mở hamburger, menu ngôn ngữ đang mở sẽ đóng và ngược lại. Phím Escape đóng menu đang mở và trả focus về nút. |
| **Tìm kiếm và bộ lọc Thư viện** | Ô nhập và nút tìm kiếm nằm trong các ô CSS Grid riêng. Trên màn hình rất hẹp, nút tìm kiếm xuống hàng. Các nút lọc dùng Flexbox để xuống dòng trong lề nội dung. |
| **Thẻ bài sơ cứu** | Lưới bài dùng một, hai hoặc ba cột tùy chiều rộng. Quy tắc hai cột ở mức tablet được giới hạn vào lưới Thư viện. |
| **Quiz và luyện tập tính giờ** | Cột đáp án có thể co theo khung. Chữ dài ngắt dòng trong nút. Ở quiz, nút tiếp theo căn trái từ 540 px trở xuống để giảm khả năng trùng vị trí với chatbot ở góc phải. |
| **Chatbot** | Một khối cố định quản lý vị trí của cả nút và cửa sổ chat. Kích thước cửa sổ dựa theo viewport, chiều cao header và khoảng trống ở mép màn hình. Vùng tin nhắn cuộn bên trong, còn ô nhập có thể co theo chiều rộng. |

## Các mốc màn hình

Các kích thước dưới đây tính theo chiều rộng viewport bằng CSS pixel. Cột thiết bị đưa ra ví dụ thường gặp. Cùng một thiết bị có thể chuyển nhóm khi xoay màn hình, thu hẹp cửa sổ hoặc thay đổi mức zoom.

| Chiều rộng | Thiết bị thường gặp | Header | Thư viện |
|---|---|---|---|
| Dưới **375 px** | Điện thoại màn hình nhỏ khi cầm dọc, ví dụ iPhone hoặc Android có viewport 320–360 px. | Hamburger. Logo cao 40 px. | 1 cột. Nút tìm kiếm nằm dưới ô nhập. |
| **375–639 px** | Phần lớn iPhone và điện thoại Android khi cầm dọc. | Hamburger. Header cao tối thiểu 68 px. | 1 cột. Ô nhập và nút tìm kiếm nằm cùng hàng. |
| **640–1023 px** | Nhiều iPad và tablet Android khi cầm dọc. Một số iPhone và điện thoại Android khi xoay ngang. | Hamburger. Header cao tối thiểu 80 px. | 2 cột. |
| **1024–1279 px** | Nhiều iPad và tablet Android khi xoay ngang, laptop có viewport hẹp hoặc cửa sổ desktop thu nhỏ. | Hamburger để giữ đủ chỗ cho logo và các nút thao tác. | 3 cột. |
| Từ **1280 px** | Laptop và desktop có cửa sổ đủ rộng. Một số tablet lớn khi xoay ngang. | Hiện đầy đủ menu desktop. | 3 cột. |

## Các file mã nguồn đã sửa

| File | Nội dung thay đổi |
|---|---|
| [components/header.html](../components/header.html) | Cấu trúc header dùng chung, khung SVG logo, biểu tượng và thuộc tính trợ năng của nút. |
| [js/main.js](../js/main.js) | Cập nhật bản header dự phòng và cấu trúc chatbot. Đồng bộ `aria-expanded`, thao tác Escape, đóng menu khi mở menu khác và đóng hamburger khi CSS chuyển sang menu desktop. |
| [css/layout.css](../css/layout.css) | Bố cục và chiều cao header, khoảng chừa phía trên nội dung, kích thước logo và nút, vùng cuộn hamburger và mốc 1280 px cho menu desktop. |
| [topics.html](../topics.html) | Cấu trúc ô nhập và nút tìm kiếm, placeholder ngắn, nhóm bộ lọc xuống dòng và thanh sắp xếp có thể xuống hàng. |
| [css/components.css](../css/components.css) | CSS cho thanh tìm kiếm, vùng bấm bộ lọc và kích thước, vị trí của chatbot. |
| [css/responsive.css](../css/responsive.css) | Bố cục ở màn hình dưới 375 px, khoảng cách lưới trên mobile và lưới hai cột của Thư viện trên tablet. Bỏ quy tắc ép bộ lọc cuộn ngang và các quy tắc chồng lên header, ô tìm kiếm và chatbot. |
| [css/contact-quiz.css](../css/contact-quiz.css) | Cột đáp án co theo khung, ngắt dòng đáp án dài và căn nút tiếp theo sang trái trên mobile. |
| [css/interactive-3d.css](../css/interactive-3d.css) | Cột lựa chọn và phần chữ của đáp án ở bài luyện tập tính giờ có thể co và ngắt dòng. |

## Kiểm tra và nghiệm thu

Đã kiểm tra cú pháp JavaScript và chạy `git diff --check`. Kiểm thử mô phỏng đã xác nhận trạng thái mở, đóng, chuyển giữa hai menu, phím Escape và đóng hamburger khi chuyển sang menu desktop. Phiên xem thử không kết nối được localhost, nên bố cục và thao tác thực tế trên trình duyệt vẫn cần nghiệm thu.

| Viewport cần thử | Thao tác cần xác nhận |
|---|---|
| **320, 374/375, 390 px** | Logo và các nút nằm trong header. Tìm kiếm được, bấm được cả bộ lọc đầu và cuối. Chọn đáp án dài và sang câu tiếp khi chatbot đang thu gọn. |
| **639/640 và 1023/1024 px** | Lưới Thư viện chuyển đúng số cột. Ô tìm kiếm, thanh sắp xếp và thẻ bài không tràn lề. |
| **1200, 1279/1280 và 1440 px** | Kéo qua mốc chuyển menu. Cụm logo, các liên kết và nút bên phải đều có đủ chỗ khi menu đầy đủ xuất hiện. |
| **740 × 360 px** | Mở hamburger và cuộn đến liên kết cuối. Mở chatbot và kiểm tra còn thao tác được với ô nhập và nút đóng. |
