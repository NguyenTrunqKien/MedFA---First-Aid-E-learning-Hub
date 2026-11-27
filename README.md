# MedFA – Medical First Aid E-Learning Hub

MedFA là website học sơ cấp cứu bằng tiếng Việt và tiếng Anh. Người học có thể tra cứu tình huống, ôn tập bằng thẻ ghi nhớ, làm trắc nghiệm và gửi góp ý cho nhóm qua trang Contact.

Đây là đồ án môn **IE104 – Internet và Công nghệ Web**, Trường Đại học Công nghệ Thông tin, ĐHQG-HCM. Giảng viên hướng dẫn là **ThS. Võ Tấn Khoa**.

## Chạy trên máy

Tại thư mục gốc của repo, chạy máy chủ tĩnh bằng Python 3:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Mở [MedFA trên localhost](http://127.0.0.1:8000/). Bạn cũng có thể mở [index.html](index.html) bằng Live Server trong VS Code. Các trang học sử dụng HTML, CSS, JavaScript và dữ liệu JSON có sẵn trong repo.

## Các trang chính

| Trang | Người dùng có thể làm gì |
| --- | --- |
| [Trang chủ](index.html) | Chọn nội dung học và truy cập các khu vực của website |
| [Thư viện](topics.html) và [chi tiết tình huống](topic-detail.html) | Tìm, lọc, lưu chủ đề và đọc hướng dẫn theo từng bước. Trang chi tiết nhận mã chủ đề qua tham số `id` |
| [Flashcards](flashcards.html) | Ôn kiến thức bằng thẻ hai mặt |
| [Trắc nghiệm](quiz.html) | Trả lời câu hỏi tình huống và xem giải thích |
| [Liên hệ](contact.html) | Gửi góp ý cho nhóm qua Google Form ngay trên website |
| [Tác động xã hội](social-impact.html) và [giới thiệu](about.html) | Tìm hiểu mục tiêu cộng đồng, dự án và đội ngũ |

## Tích hợp dịch vụ

**Form Contact.** Trang Contact gửi dữ liệu trực tiếp đến Google Apps Script kể cả khi chạy website trên localhost. Để kiểm tra một lần gửi thực tế, đối chiếu lời nhắn với tab **Câu trả lời** của Google Form. Xem [luồng gửi, cấu hình câu hỏi và cách xử lý lỗi](docs/knowledge/FORM_CONTACT.md).

**Chatbot Gemini.** Khi chạy trên Vercel, chatbot có thể gọi [hàm máy chủ `/api/chat`](api/chat.js). Để dùng luồng này, đặt `GEMINI_API_KEY` trong môi trường của dự án Vercel. Có thể đặt `GEMINI_DEFAULT_MODEL` để chọn mô hình. Máy chủ tĩnh Python ở trên chỉ phục vụ tệp, nên cần môi trường hỗ trợ Vercel Functions để thử API này. Xem [mẫu cấu hình](env.example) và [cấu hình định tuyến](vercel.json).

## Tìm đúng nơi để sửa

| Thành phần | Vị trí |
| --- | --- |
| Chủ đề và câu hỏi tiếng Việt | [topics.json](data/topics.json), [quiz.json](data/quiz.json) |
| Nội dung học tiếng Anh và chuỗi giao diện hai ngôn ngữ | [data/en](data/en/), [translations.js](js/translations.js), [i18n.js](js/i18n.js) |
| Thành phần dùng chung và khởi tạo trang | [js/components](js/components/), [main.js](js/main.js) |
| Giao diện, ảnh và tài nguyên nhận diện | [css](css/), [images](images/), [assets](assets/) |
| Hướng dẫn bảo trì | [Kiến trúc và tái sử dụng mã](docs/knowledge/KIEN_TRUC_VA_TAI_SU_DUNG_CODE.md), [cách tạo lại CSS dùng chung](docs/knowledge/KIEN_TRUC_VA_BUILD_CSS.md), [đặc tả dữ liệu](docs/DATA_SCHEMA_SPEC.md) |
| Mã và tài liệu lưu trữ | [archive](archive/) |

## Bản đồ cơ sở y tế

Mở `nearby-care.html` qua localhost hoặc HTTPS để dùng định vị. Bản mặc định dùng Leaflet và tìm trên thiết bị trong danh mục [cơ sở y tế Việt Nam](data/nearby-care-vn.json). Danh mục được lọc từ [bản xuất HOT/HDX](https://data.humdata.org/dataset/hotosm_vnm_health_facilities), dữ liệu ngày 15/11/2026, © OpenStreetMap contributors, phân phối theo [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/). Tọa độ cơ sở dạng vùng là tâm khung bao. Khi danh mục thiếu kết quả trong bán kính hoặc vị trí nằm ngoài phạm vi dữ liệu, trang tìm qua Overpass với thời gian chờ tối đa 8 giây. Để dùng Google, bật Maps JavaScript API và Places API (New), sau đó điền khóa **dành cho trình duyệt** vào thẻ meta `google-maps-browser-key` trong trang này. Giới hạn khóa theo tên miền, hai API trên và thiết lập hạn mức trong Google Cloud. Với dữ liệu Google, liên kết chi tiết dùng Place ID. Với OpenStreetMap, liên kết mở ghim theo đúng kinh độ và vĩ độ đã lưu của cơ sở.

## Nhóm thực hiện

Nguyễn Trung Kiên, Trần Gia Phú, Hồ Tấn Khải và Trương Đỗ Như Quỳnh. Xem [bảng phân công công việc](docs/KE_HOACH_PHAN_CONG_NHOM.md).
