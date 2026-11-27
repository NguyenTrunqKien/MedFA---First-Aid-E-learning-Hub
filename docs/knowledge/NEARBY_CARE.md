# Cách trang Cơ sở y tế tìm địa điểm gần người dùng

Trang **Cơ sở y tế** nằm cạnh **Liên hệ** trên menu MedFA. Người dùng có thể tìm quanh vị trí thiết bị hoặc chọn một điểm trên bản đồ. Cấu hình mặc định dùng Leaflet và OpenStreetMap (OSM). Hai nút mở Google Maps hoạt động ngay cả khi dự án chưa cấu hình khóa Google. [Trang Cơ sở y tế](../../nearby-care.html)

## Từ vị trí đến danh sách kết quả

1. **Dùng vị trí hiện tại** yêu cầu quyền định vị của trình duyệt. Mở trang qua HTTPS hoặc localhost. Nếu người dùng từ chối quyền, họ vẫn có thể bấm **Chọn điểm trên bản đồ** rồi chọn vị trí cần tìm. Với bàn phím, dùng phím mũi tên để di chuyển bản đồ và nhấn Enter để chọn tâm.
2. Trang tìm trong bán kính **5 km** quanh điểm đã chọn. Người dùng có thể mở rộng đến **10 km**. Kéo hoặc thu phóng bản đồ chỉ thay đổi vùng nhìn. Muốn tìm quanh điểm khác, dùng lại nút chọn điểm.
3. Trang tính khoảng cách đường chim bay, bỏ các kết quả trùng tên cách nhau dưới 100 m và lấy tối đa **10 cơ sở** theo thứ tự gần nhất. Trên bản đồ, ghim đang chọn và các bệnh viện được ưu tiên khi thiếu chỗ hiển thị nhãn. Vì vậy số ghim nhìn thấy có thể ít hơn số mục trong danh sách.
4. Bấm tên cơ sở để đưa ghim về giữa, phóng gần và mở thẻ chi tiết. **Xem trên Google Maps** mở tọa độ của ghim OSM. **Chỉ đường** dùng tọa độ đó làm đích đến. Ở chế độ Google Places, hai liên kết còn mang theo Place ID để Google nhận diện cơ sở. [Mã xử lý bản đồ và kết quả](../../js/nearby-care.js)

## Trang lấy dữ liệu ở đâu?

| Nguồn | Khi nào được dùng |
| --- | --- |
| Danh mục Việt Nam trong repo | Với điểm nằm trong vùng tra cứu Việt Nam, trang tải danh mục và lọc theo khoảng cách ngay trong trình duyệt. Khi đã tìm thấy cơ sở trong bán kính, trang dùng kết quả này. |
| Overpass | Khi điểm nằm ngoài vùng tra cứu, danh mục không tải được hoặc không có mục nào trong bán kính, trình duyệt gửi truy vấn theo tọa độ đến Overpass. Thời gian chờ tối đa là 8 giây. |
| Bản ghi OSM của từng cơ sở | Khi mở thẻ, trang dùng các thuộc tính đã nhận từ Overpass hoặc tra theo `osmId` của mục trong danh mục. Địa chỉ, điện thoại, giờ hoạt động, lối tiếp cận cho xe lăn và liên kết ảnh Wikimedia Commons xuất hiện khi có dữ liệu phù hợp. |

Bản danh mục hiện tại có **2.693 cơ sở**, trích từ dữ liệu OSM ngày **15/11/2026**. Tọa độ của cơ sở dạng vùng là tâm khung bao, có thể khác vị trí cổng vào. Danh mục là bản lưu tĩnh. Khi thay dữ liệu, giữ các trường `name`, `type`, `lat`, `lng` và mã đối tượng `osmId` để thẻ chi tiết tiếp tục tra đúng cơ sở. Cập nhật ngày `snapshot` và thông tin nguồn cùng bản xuất. Dữ liệu © OpenStreetMap contributors. [Danh mục MedFA](../../data/nearby-care-vn.json) · [Bản xuất HOT/HDX](https://data.humdata.org/dataset/hotosm_vnm_health_facilities) · [Giấy phép ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/)

## Cấu hình Google Maps nếu cần

Để trống thẻ meta `google-maps-browser-key` để dùng Leaflet. Nếu muốn hiển thị Google Maps và tìm bằng Google Places, bật **Maps JavaScript API** và **Places API (New)** cho project Google Cloud có thanh toán. Điền khóa trình duyệt vào thuộc tính `content` của thẻ meta, giới hạn khóa theo hai API và các tên miền hoặc cổng localhost được dùng. Việc mở liên kết Google Maps từ một thẻ cơ sở độc lập với lựa chọn này. [Cấu hình trong HTML](../../nearby-care.html) · [Hướng dẫn thiết lập của Google](https://developers.google.com/maps/documentation/javascript/get-api-key)

## Kiểm tra sau khi sửa

- **Định vị và chọn điểm.** Thử cả khi cho phép và từ chối quyền vị trí. Chọn một điểm gần Bệnh viện Chợ Rẫy và kiểm tra bán kính 5 km, sau đó mở rộng đến 10 km.
- **Danh sách và ghim.** Chọn một cơ sở ở cuối danh sách, kiểm tra bản đồ phóng đến đúng ghim, đóng thẻ rồi bấm lại cùng ghim. Thu nhỏ bản đồ để kiểm tra nhãn và cuộn danh sách để kiểm tra tiêu đề đứng yên.
- **Mạng và dữ liệu thiếu.** Bản đồ nền, tìm qua Overpass và tải chi tiết OSM là các yêu cầu riêng. Nếu thấy bản đồ nhưng danh sách báo lỗi, kiểm tra yêu cầu tải JSON hoặc Overpass trong Network. Nếu chỉ thiếu giờ hoạt động, kiểm tra trường `opening_hours` trên bản ghi OSM của địa điểm.
- **Giao diện.** Kiểm tra trên màn hình hẹp và đổi Việt–Anh sau khi đã có kết quả. Kiểu hiển thị, chuỗi giao diện và biểu tượng được quản lý riêng. [CSS](../../css/nearby-care.css) · [Bản dịch](../../js/translations.js) · [Biểu tượng](../../assets/icons/care.svg)
