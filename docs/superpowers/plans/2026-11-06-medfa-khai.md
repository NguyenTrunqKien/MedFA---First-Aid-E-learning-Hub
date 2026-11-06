# Kế hoạch triển khai dữ liệu, ảnh và nguồn y khoa MedFA

**Mục tiêu** — Hoàn thành ba mục kỹ thuật của Khải trong kế hoạch phân công nhóm. Website tiếp tục chạy bằng HTML, JavaScript và JSON tĩnh.

1. **Dữ liệu sơ cứu.** Kiểm tra ID duy nhất, kiểu dữ liệu, danh mục, mức độ và thứ tự bước. Giữ một bản sốc nhiệt theo dữ liệu dự phòng hiện có và giữ URL cũ. Đồng bộ mức `medium` với bộ sắp xếp. Giữ danh mục Tai nạn và bổ sung bộ lọc. Ghi hợp đồng dữ liệu tại `docs/DATA_SCHEMA_SPEC.md`.
2. **Ảnh cục bộ.** Đối chiếu bốn vị trí dùng ảnh với ba URL gốc. Lưu ba ảnh WebP trong `assets/images/`, dưới 150.000 byte mỗi ảnh. Đổi đường dẫn ở trang chủ, giới thiệu và tác động xã hội. Kiểm tra giải mã và hiển thị khi chặn mạng ngoài.
3. **Nguồn và lưu ý y khoa.** Tạo `components/medical-disclaimer.html` và nạp ở trang chi tiết. Hiển thị hướng dẫn chính thức dùng để đối chiếu và nguồn được khai báo riêng của bài. Giữ thông báo giáo dục/cấp cứu khi component không tải được. Không gắn nhãn xác thực chung cho các chủ đề. Kiểm tra trường hợp có nguồn, thiếu nguồn và lỗi tải component.

Khi kiểm tra tích hợp, mở từng ID qua bộ nạp dữ liệu, thử tải dữ liệu dự phòng, thử bộ lọc Tai nạn và kiểm tra ảnh trên ba trang.

Trong lúc rà dữ liệu, hai bài ngất và co giật cần tách tài liệu tham khảo khỏi các bước thao tác. Đối chiếu lại hai bài này với nguồn trực tiếp. Giữ các bài nhập thô còn cần rà trong dữ liệu và đánh dấu `needsMedicalReview` để trang chi tiết chỉ hiện thông báo chờ rà soát cùng khối nguồn. Nếu ID không có trong dữ liệu hiện tại, hiện thông báo thay vì dùng bài đầu tiên.
