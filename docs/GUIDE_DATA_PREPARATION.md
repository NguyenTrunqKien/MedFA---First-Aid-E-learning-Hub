# Hướng Dẫn Chuẩn Bị & Chuẩn Hóa Dữ Liệu Cào (Scraped Data) Cho Topic MedFA

Tài liệu này hướng dẫn chi tiết quy trình chuyển đổi dữ liệu thô cào được (từ các nguồn web y tế, cẩm nang sơ cấp cứu như Hội Chữ thập đỏ, AHA, ERC, Vinmec, SSVN, WebMD,...) thành đúng cấu trúc đối tượng JSON tương thích 100% với hệ thống **MedFA (`data/topics.json`)**.

---

## 📑 MỤC LỤC
1. [Tổng quan Cấu trúc JSON của 1 Topic](#1-tổng-quan-cấu-trúc-json-của-1-topic)
2. [Bảng Đặc Tả Chi Tiết Từng Trường Dữ Liệu (Field Specification)](#2-bảng-đặc-tả-chi-tiết-từng-trường-dữ-liệu)
3. [Quy Tắc Định Danh Danh Mục & Mức Độ Khẩn Cấp](#3-quy-tắc-định-danh-danh-mục--mức-độ-khẩn-cấp)
4. [Quy Trình 5 Bước Xử Lý Dữ Liệu Cào Thô](#4-quy-trình-5-bước-xử-lý-dữ-liệu-cào-thô)
5. [Ví Dụ Chuyển Đổi Thực Tế (Before vs After)](#5-ví-dụ-chuyển-đổi-thực-tế-before-vs-after)
6. [Prompt Mẫu Tự Động Hóa Chuyển Đổi Bằng AI (1-Click)](#6-prompt-mẫu-tự-động-hóa-chuyển-đổi-bằng-ai)
7. [Checklist Kiểm Tra Tính Toàn Vẹn Trước Khi Đưa Vào Hệ Thống](#7-checklist-kiểm-tra-tính-toàn-vẹn)

---

## 1. Tổng quan Cấu trúc JSON của 1 Topic

Một đối tượng topic hoàn chỉnh trong `data/topics.json` có cấu trúc chuẩn như sau:

```json
{
  "id": "hoc-di-vat",
  "title": "Hóc dị vật (Nghẹn)",
  "fullTitle": "Hóc dị vật (Nghẹn & Tắc đường thở)",
  "category": "tre-em",
  "categoryLabel": "Trẻ em",
  "badgeType": "Khẩn cấp",
  "badgeClass": "bg-error-container text-on-error-container",
  "criticalLevel": "high",
  "readTime": "2 phút",
  "standard": "Chuẩn ERC & AHA 2025",
  "iconSvg": "<svg aria-hidden=\"true\" class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\"></polyline></svg>",
  "shortDesc": "Cách thực hiện nghiệm pháp Heimlich để tống dị vật ra khỏi đường thở cho người lớn và trẻ nhỏ.",
  "lead": "Dị vật xâm nhập gây cản trở đường thở cấp tính. Não bộ sẽ bắt đầu tổn thương không thể phục hồi chỉ sau 4 phút thiếu oxy nếu không được can thiệp đúng phương pháp ngay tại hiện trường.",
  "emergencyAlert": "GỌI 115 NGAY LẬP TỨC nếu nạn nhân bất tỉnh, tím tái môi đầu chi hoặc không còn phát ra tiếng thở.",
  "timeline": [
    { "time": "0 - 1 phút", "status": "Khó thở, hoảng loạn, ôm cổ họng", "level": "safe" },
    { "time": "1 - 2 phút", "status": "Tím tái môi, mất dần phản xạ ho", "level": "warning" },
    { "time": "2 - 4 phút", "status": "Ngất lịm, mất tri giác, ngừng thở", "level": "danger" },
    { "time": "> 4 phút", "status": "Tổn thương não vĩnh viễn hoặc tử vong", "level": "critical" }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Đánh giá mức độ tắc nghẽn",
      "desc": "Hỏi nạn nhân 'Bạn có bị nghẹn không?'. Nếu nạn nhân vẫn nói, khóc hoặc ho mạnh được: KHUYẾN KHÍCH HO MẠNH, tuyệt đối KHÔNG đập lưng hay can thiệp ép bụng lúc này."
    },
    {
      "stepNumber": 2,
      "title": "5 vỗ lưng dứt khoát (Back Blows)",
      "desc": "Nếu nạn nhân không thở được hoặc ho yếu: Đứng hơi chếch sau lưng, một tay đỡ ngực nạn nhân nghiêng người về phía trước. Dùng gót bàn tay kia vỗ mạnh, dứt khoát 5 lần vào khoảng giữa 2 xương bả vai hướng lên trên."
    }
  ],
  "dos": [
    "Khuyến khích nạn nhân tiếp tục ho mạnh nếu họ còn ho được.",
    "Cúi người nạn nhân về phía trước khi vỗ lưng để dị vật rơi ra ngoài."
  ],
  "donts": [
    "KHÔNG móc họng mù quáng bằng ngón tay khi không nhìn thấy rõ dị vật.",
    "KHÔNG cho uống nước hay nuốt cơm để cố đẩy dị vật xuống."
  ]
}
```

---

## 2. Bảng Đặc Tả Chi Tiết Từng Trường Dữ Liệu

| Trường (Field) | Kiểu (Type) | Bắt buộc | Quy tắc & Giới hạn | Nơi hiển thị trên Giao diện |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | **Có** | Dạng `kebab-case` không dấu, duy nhất. VD: `duoi-nuoc`, `bong-cap-do-1-2`. | Dùng trong URL: `topic-detail.html?id=duoi-nuoc` và thuộc tính `data-id`. |
| `title` | `string` | **Có** | Tên ngắn gọn (dưới 35 ký tự). | Thẻ Card trong danh sách `topics.html`, Chat widget. |
| `fullTitle` | `string` | **Có** | Tên đầy đủ chuẩn y khoa (khoảng 40-70 ký tự). | Breadcrumb, tiêu đề trang và thẻ H1 trên `topic-detail.html`. |
| `category` | `string` | **Có** | Bắt buộc thuộc 1 trong 4 mã: `sinh-hoat`, `tre-em`, `ngoai-troi`, `benh-ly`. | Dùng cho bộ lọc danh mục và thuộc tính `data-category`. |
| `categoryLabel` | `string` | **Có** | Nhãn danh mục hiển thị tiếng Việt tương ứng. | Badge trên Card và Badge ở đầu trang chi tiết. |
| `badgeType` | `string` | **Có** | Loại tag ngắn: "Khẩn cấp", "Sinh tử", "Sinh hoạt", "Ngoài trời", "Bệnh lý". | Tag nhỏ trên góc phải thẻ Card. |
| `badgeClass` | `string` | **Có** | Class màu Tailwind quy định màu nền/màu chữ của tag. | Style màu sắc của `badgeType`. |
| `criticalLevel` | `string` | **Có** | 1 trong 4 mức: `low`, `medium`, `high`, `critical`. | Dùng cho bộ sắp xếp (sort) theo độ khẩn cấp. |
| `readTime` | `string` | **Có** | Thời gian đọc ước tính: `"2 phút"`, `"3 phút"`, `"5 phút"`. | Footer thẻ Card và metadata trang chi tiết. |
| `standard` | `string` | **Có** | Cơ quan/tiêu chuẩn y khoa tham chiếu: "Chuẩn AHA 2025", "Chuẩn ERC & Red Cross". | Badge xác thực y khoa trên trang chi tiết. |
| `iconSvg` | `string` | **Có** | Chuỗi SVG dạng inline 24x24 px, stroke-width=2, viewBox="0 0 24 24". | Icon tròn trên góc thẻ Card `topics.html`. |
| `shortDesc` | `string` | **Có** | Tóm tắt súc tích trong 1-2 câu (khoảng 100 - 150 ký tự). | Đoạn mô tả 2 dòng (line-clamp-2) trên thẻ Card. |
| `lead` | `string` | **Có** | Giải thích nguy cơ sinh mạng, cơ chế tổn thương (khoảng 150 - 250 ký tự). | Đoạn dẫn nhập (lead text) dưới tiêu đề H1 ở trang chi tiết. |
| `emergencyAlert` | `string` | **Có** | Lời cảnh báo nguy cấp. Khởi đầu bằng `GỌI 115 NGAY LẬP TỨC nếu...`. | Hộp cảnh báo màu đỏ/cam viền nổi bật. |
| `timeline` | `Array` | Không | Mảng 3-4 giai đoạn diễn tiến: `{ time, status, level }`. | Thước đo thời gian vàng (Golden Time). |
| `steps` | `Array` | **Có** | Mảng các bước tuần tự: `{ stepNumber: int, title: str, desc: str }`. | Khối quy trình thao tác chính từng bước. |
| `dos` | `Array` | **Có** | Mảng các chuỗi hành động NÊN làm (chuẩn y khoa). | Cột màu xanh lá "NÊN LÀM". |
| `donts` | `Array` | **Có** | Mảng các sai lầm TUYỆT ĐỐI KHÔNG LÀM (bắt đầu bằng "KHÔNG..."). | Cột màu đỏ "TUYỆT ĐỐI KHÔNG LÀM". |

---

## 3. Quy Tắc Định Danh Danh Mục & Mức Độ Khẩn Cấp

### 3.1. Bảng ánh xạ Category bắt buộc
Để bộ lọc trên `topics.html` hoạt động chính xác, trường `category` **bắt buộc** phải là một trong 4 giá trị sau:

| `category` (code) | `categoryLabel` (hiển thị) | Tiêu chí phân loại tình huống |
| :--- | :--- | :--- |
| `sinh-hoat` | **Sinh hoạt** | Bỏng nước sôi, bỏng nhiệt, chảy máu cắt trúng tay chân, điện giật gia dụng, ngã trầy xước. |
| `tre-em` | **Trẻ em** | Hóc dị vật/sặc sữa, sốt cao co giật ở trẻ nhỏ, té ngã chấn thương đầu trẻ em. |
| `ngoai-troi` | **Ngoài trời** | Đuối nước, sốc nhiệt say nắng, rắn độc cắn, ong đốt sốc phản vệ, tai nạn giao thông. |
| `benh-ly` | **Bệnh lý** | Ngừng tim đột ngột (CPR), đột quỵ não (FAST), nhồi máu cơ tim, cơn hen phế quản cấp, co giật động kinh. |

### 3.2. Bảng ánh xạ Critical Level & Badge Class
| `criticalLevel` | `badgeType` | `badgeClass` (Tailwind) | Ví dụ tình huống |
| :--- | :--- | :--- | :--- |
| `critical` | **Sinh tử** | `bg-tertiary-fixed text-tertiary font-bold` | Ngừng tim (CPR), Đuối nước ngưng thở, Sốc phản vệ độ 4. |
| `high` | **Khẩn cấp** | `bg-error-container text-on-error-container` | Hóc dị vật nghẹn thở, Chảy máu phun tia đứt động mạch. |
| `medium` | **Trung bình / Tên danh mục** | `bg-secondary-container text-on-secondary-container` hoặc `bg-surface-container-high text-on-surface-variant` | Bỏng độ 1-2, Sốc nhiệt, Cơn co giật sau khi dứt. |
| `low` | **Sơ cứu cơ bản** | `bg-surface-container-high text-on-surface-variant` | Trầy xước da, Chảy máu cam, Bong gân nhẹ. |

---

## 4. Quy Trình 5 Bước Xử Lý Dữ Liệu Cào Thô

```
[Bài viết cào thô (HTML/Text)]
               │
               ▼
┌────────────────────────────────────────┐
│ Bước 1: Thu thập & Lọc rác             │ ➔ Bỏ rác quảng cáo, link nội bộ, giữ lại các phần chính
└────────────────────────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│ Bước 2: Bóc tách thành phần cấu trúc   │ ➔ Phân chia: Tiêu đề, Bước làm, Nên/Không nên, Cảnh báo
└────────────────────────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│ Bước 3: Chuẩn hóa ngôn ngữ sơ cứu      │ ➔ Ngắn gọn, mệnh lệnh, in hoa từ khóa ("KHÔNG", "GỌI 115")
└────────────────────────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│ Bước 4: Khởi tạo Metadata kỹ thuật     │ ➔ Sinh id (slug), tính readTime, gán Category & BadgeClass
└────────────────────────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│ Bước 5: Validate JSON & Ghép file      │ ➔ Kiểm tra cú pháp, escape ký tự, ghép vào data/topics.json
└────────────────────────────────────────┘
```

### Bước 1: Thu thập & Lọc rác (Raw Cleaning)
- Bỏ các đoạn giới thiệu dài dòng, thông tin tác giả, khuyến mãi bệnh viện/khoá học.
- Giữ lại 4 nhóm nội dung cốt lõi:
  1. Tên bệnh lý/tai nạn & Cơ chế nguy hiểm.
  2. Các bước xử trí hiện trường (Cấp cứu trước viện).
  3. Dấu hiệu cần gọi xe cấp cứu 115.
  4. Những sai lầm dân gian cần tránh.

### Bước 2: Bóc tách cấu trúc
- **Tách bước (Steps)**: Gom thành 3 đến 5 bước tuần tự. Mỗi bước có `stepNumber`, `title` (hành động ngắn gọn) và `desc` (thao tác cụ thể).
- **Tách Nên & Không nên (Dos & Donts)**:
  - `dos`: 3-4 gạch đầu dòng những thao tác quan trọng nhất.
  - `donts`: 3-4 điều kiêng kỵ dân gian sai lệch (Ví dụ: bôi kem đánh răng lên vết bỏng, nhét đũa vào mồm khi co giật, dốc ngược người khi đuối nước).

### Bước 3: Biên tập ngôn ngữ y tế chuẩn MedFA
- **Ngắn gọn & Dứt khoát**: Người dùng đọc hướng dẫn sơ cứu thường đang ở trong tình thế khẩn cấp. Tránh câu văn phức tạp hoặc từ ngữ học thuật khó hiểu.
- **In hoa điểm mấu chốt**: Các hành động mang tính an toàn sinh mạng cần in hoa: `KHÔNG`, `GỌI 115 NGAY`, `ÉP TIM LIÊN TỤC`.

### Bước 4: Tạo Metadata kỹ thuật
1. **Sinh `id`**: Chuyển tiêu đề tiếng Việt có dấu thành chuỗi không dấu, cách nhau bởi dấu `-` (Ví dụ: `Sơ cứu gãy xương kín` ➔ `gay-xuong-kin`).
2. **Tính `readTime`**:
   - Dưới 300 từ: `"2 phút"`
   - Từ 300 - 500 từ: `"3 phút"`
   - Trên 500 từ: `"4 phút"` hoặc `"5 phút"`.
3. **Chọn SVG Icon**: Chọn một icon SVG 24x24 tương ứng với hành động (có thể lấy từ thư viện Lucide hoặc Feather icons).

### Bước 5: Kiểm tra tính hợp lệ của JSON
- Chú ý escape dấu ngoặc kép `\"` nếu bên trong chuỗi có chứa dấu nháy kép (nhất là trong chuỗi `iconSvg` hoặc lời nói trực tiếp).
- Đảm bảo `id` chưa từng tồn tại trong `data/topics.json`.

---

## 5. Ví Dụ Chuyển Đổi Thực Tế (Before vs After)

### 🔻 Dữ liệu cào thô ban đầu (Raw Scraped Text):
> **Bài viết: Cách sơ cứu người bị đuối nước an toàn theo hướng dẫn bác sĩ**  
> Đuối nước là tai nạn rất phổ biến vào mùa hè ở trẻ nhỏ và người lớn. Khi gặp người bị đuối nước, việc đầu tiên mọi người hay làm là dốc ngược nạn nhân lên vai rồi chạy vòng quanh để tháo nước trong phổi ra. Tuy nhiên theo bác sĩ đây là quan niệm cực kỳ sai lầm làm mất thời gian vàng.  
> Đầu tiên phải đưa nạn nhân lên bờ an toàn nhưng người cứu phải biết bơi và dùng phao hoặc gậy chứ không nhảy xuống bừa. Lên bờ kiểm tra xem nạn nhân có thở không. Nếu không thở thì phải hà hơi thổi ngạt 2 đến 5 lần trước rồi mới ép tim 30 lần. Cứ thế ép 30 lần ấn ngực rồi 2 lần thổi ngạt liên tục. Nếu có máy sốc điện thì bật lên. Không được hơ lửa hay dốc ngược người nạn nhân vì nước vào phổi không tự chảy ra được mà dịch dạ dày còn trào ngược vào đường thở gây tắc thở thêm. Gọi cấp cứu 115 ngay khi nạn nhân bất tỉnh.

---

### 🟢 Kết quả chuyển đổi chuẩn JSON MedFA:
```json
{
  "id": "so-cuu-duoi-nuoc",
  "title": "Sơ cứu Đuối nước",
  "fullTitle": "Sơ cứu Nạn nhân Đuối nước & Ngạt nước Cấp tính",
  "category": "ngoai-troi",
  "categoryLabel": "Ngoài trời",
  "badgeType": "Sinh tử",
  "badgeClass": "bg-tertiary-fixed text-tertiary font-bold",
  "criticalLevel": "critical",
  "readTime": "4 phút",
  "standard": "Phác đồ Cấp cứu Đuối nước ERC & AHA 2025",
  "iconSvg": "<svg aria-hidden=\"true\" class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M2 12h20M2 17h20M2 7c2.5-2 5-2 7 0s4.5 2 7 0 4.5-2 6 0\"></path></svg>",
  "shortDesc": "Kỹ thuật cấp cứu đuối nước trên bờ: Ưu tiên thổi ngạt, ép tim CPR và loại bỏ sai lầm dốc ngược nạn nhân.",
  "lead": "Ngạt nước làm co thắt thanh quản và cạn kiệt oxy nuôi não. Việc cấp cứu đúng cách ngay khi đưa nạn nhân lên bờ quyết định hoàn toàn khả năng sống sót và tránh di chứng phù não.",
  "emergencyAlert": "GỌI 115 NGAY LẬP TỨC và hô hoán người hỗ trợ khi phát hiện người gặp nạn dưới nước.",
  "timeline": [
    { "time": "0 - 3 phút", "status": "Ngạt nước, hoảng loạn, co thắt đường thở", "level": "warning" },
    { "time": "3 - 5 phút", "status": "Hít sặc nước, ngưng thở, bất tỉnh", "level": "danger" },
    { "time": "> 5 phút", "status": "Ngừng tim tuần hoàn, tổn thương tế bào não", "level": "critical" }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Cứu hộ an toàn và đưa lên bờ phẳng",
      "desc": "Ưu tiên quăng phao, cành cây hoặc dây cứu hộ. TUYỆT ĐỐI KHÔNG nhảy xuống nước nếu không được huấn luyện kỹ năng cứu đuối. Đặt nạn nhân nằm ngửa trên mặt đất bằng phẳng, khô ráo."
    },
    {
      "stepNumber": 2,
      "title": "Kiểm tra hô hấp (5 - 10 giây)",
      "desc": "Áp tai lại gần miệng và quan sát lồng ngực nạn nhân trong 10 giây. Nếu không thấy ngực phập phồng hoặc chỉ thở ngáp cá: Nạn nhân đã ngừng thở."
    },
    {
      "stepNumber": 3,
      "title": "Thổi ngạt cấp cứu 5 lần đầu tiên",
      "desc": "Đặc thù đuối nước là thiếu oxy: Ngửa đầu nâng cằm, kẹp mũi và thổi ngạt 5 hơi liên tiếp (mỗi hơi 1 giây, thấy lồng ngực phồng lên) để bù oxy khẩn cấp."
    },
    {
      "stepNumber": 4,
      "title": "Tiến hành chu kỳ CPR (30 ép tim : 2 thổi ngạt)",
      "desc": "Nếu nạn nhân vẫn chưa thở lại, đặt hai tay vào giữa ngực ép tim lún 5-6cm với tốc độ 100-120 lần/phút. Luân phiên 30 lần ép tim và 2 lần thổi ngạt liên tục đến khi nạn nhân hồi tỉnh hoặc nhân viên 115 tiếp nhận."
    }
  ],
  "dos": [
    "Tiến hành thổi ngạt và CPR ngay trên bờ, không được chậm trễ.",
    "Giữ ấm cho nạn nhân bằng chăn hoặc áo khô sau khi hồi tỉnh.",
    "Đưa tất cả nạn nhân đuối nước đến bệnh viện kiểm tra để phòng biến chứng đuối nước thứ cấp (Secondary Drowning)."
  ],
  "donts": [
    "TUYỆT ĐỐI KHÔNG vác nạn nhân dốc ngược chạy vòng quanh (làm trào ngược dịch dạ dày bít tắc khí quản và mất thời gian vàng).",
    "KHÔNG hơ lửa hoặc sưởi ấm than củi cho nạn nhân.",
    "KHÔNG nhảy xuống cứu khi bản thân không biết bơi hoặc không có dụng cụ nổi bảo hộ."
  ]
}
```

---

## 6. Prompt Mẫu Tự Động Hóa Chuyển Đổi Bằng AI

Bạn có thể sao chép đoạn prompt mẫu dưới đây và dán vào AI (Google Gemini, Claude hoặc ChatGPT) cùng với bài viết cào thô để nhận về JSON chuẩn xác 100%:

````markdown
Bạn là chuyên gia chuyển hóa dữ liệu y tế cho dự án web sơ cấp cứu MedFA. 
Nhiệm vụ của bạn là nhận văn bản bài viết cào thô (Scraped Text) về một chủ đề sơ cấp cứu và chuyển đổi nó thành một đối tượng JSON chuẩn xác theo đúng Schema của MedFA.

### QUY TẮC BẮT BUỘC:
1. `category` BẮT BUỘC chọn 1 trong 4 mã: "sinh-hoat" | "tre-em" | "ngoai-troi" | "benh-ly".
2. `categoryLabel` tương ứng: "Sinh hoạt" | "Trẻ em" | "Ngoài trời" | "Bệnh lý".
3. `criticalLevel` chọn: "critical" | "high" | "medium" | "low".
4. `badgeClass`:
   - Nếu critical: "bg-tertiary-fixed text-tertiary font-bold"
   - Nếu high: "bg-error-container text-on-error-container"
   - Nếu medium hoặc ngoài trời/sinh hoạt: "bg-secondary-container text-on-secondary-container" hoặc "bg-surface-container-high text-on-surface-variant"
5. `id`: Chuỗi không dấu nối nhau bằng dấu gạch ngang (kebab-case).
6. `iconSvg`: Một thẻ <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">...</svg> phù hợp.
7. Ngôn ngữ: Tiếng Việt, câu từ ngắn gọn, mệnh lệnh, hành động dứt khoát. Các từ cấm kỵ phải viết hoa "KHÔNG", "TUYỆT ĐỐI KHÔNG".
8. Trả về DUY NHẤT một khối code JSON hợp lệ, không kèm văn bản giải thích ngoài.

### VĂN BẢN CÀO THÔ CẦN CHUYỂN ĐỔI:
[DÁN VĂN BẢN CỦA BẠN VÀO ĐÂY]
````

---

## 7. Checklist Kiểm Tra Tính Toàn Vẹn

Trước khi thêm đối tượng mới vào mảng trong file `data/topics.json`, hãy kiểm tra 6 tiêu chí:

- [ ] **1. ID Duy nhất**: `id` chưa từng tồn tại trong `data/topics.json`.
- [ ] **2. Category hợp lệ**: `category` phải đúng chính xác 1 trong 4 giá trị (`sinh-hoat`, `tre-em`, `ngoai-troi`, `benh-ly`).
- [ ] **3. Cú pháp JSON**: Không thừa dấu phẩy ở phần tử cuối cùng của mảng/đối tượng; tất cả dấu nháy kép nội dung đã được escape (`\"`).
- [ ] **4. Số bước hợp lý**: Mục `steps` có từ 3 đến 5 bước, được đánh số `stepNumber` từ 1 trở đi.
- [ ] **5. Đầy đủ Dos & Donts**: Mục `dos` và `donts` có ít nhất 3 lời khuyên chuẩn y khoa mỗi mục.
- [ ] **6. Cảnh báo khẩn cấp**: `emergencyAlert` nêu rõ điều kiện gọi ngay cho tổng đài **115**.
