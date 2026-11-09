# CHIẾN LƯỢC SEO ON-PAGE & ĐẶC TẢ SCHEMA.ORG CHO WEB VỆ TINH MEDFA
> **Dự án:** MedFA – Medical First Aid E-Learning Hub  
> **Tài liệu đặc tả kỹ thuật:** Cấu trúc Thẻ Meta, Open Graph và Dữ liệu có cấu trúc (Structured Data JSON-LD)  
> **Người phụ trách:** Nguyễn Trung Kiên (MSSV: 24520888) – Trưởng nhóm, Phụ trách Kiến trúc & SEO

---

## 1. TỔNG QUAN CHIẾN LƯỢC SEO WEB VỆ TINH (SATELLITE SEO)

MedFA đóng vai trò là một **Web Vệ Tinh Y Tế (Satellite Health Hub)** tập trung vào ngách phản xạ cứu sinh trong *"4 Phút Vàng"*. Để đón đầu Search Intent khẩn cấp của người dùng trên Google (ví dụ: *"cách sơ cứu hóc dị vật"*, *"ép tim CPR mấy lần"*, *"xử lý bỏng nước sôi"*), website cần đạt 3 mục tiêu SEO cốt lõi:

1. **Hiển thị Google Rich Results (Kết quả nhiều định dạng):** Sử dụng Schema `HowTo` để Google hiển thị trực tiếp các bước sơ cứu 1-2-3 ngay trên trang kết quả tìm kiếm (SERP), giúp người dùng xem nhanh quy trình mà không cần click vào trang khác khi đang trong tình thế nguy kịch.
2. **Thẩm quyền Y khoa (Medical Authority E-E-A-T):** Khai báo schema `MedicalWebPage` gắn liền với tài liệu tham chiếu quốc tế (AHA 2024/2025, ERC 2025).
3. **Tối ưu Tương tác Mạng Xã Hội (Social Virality):** Tích hợp Open Graph đầy đủ để bài viết khi được chia sẻ lên Facebook, Zalo, Messenger luôn hiển thị thumbnail thẻ sơ cứu bắt mắt và mô tả súc tích.

---

## 2. CHUẨN HÓA THẺ META & OPEN GRAPH (OG TAGS)

Mọi trang HTML trong MedFA đều được thiết lập bộ thẻ chuẩn sau tại `<head>`:

```html
<!-- Cấu hình hiển thị chuẩn Mobile-first -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Thẻ mô tả SEO On-Page -->
<meta name="description" content="MedFA - Nền tảng giáo dục sơ cấp cứu y tế phi lợi nhuận vì cộng đồng, rèn luyện phản xạ trong 4 phút vàng chuẩn AHA & ERC.">
<meta name="robots" content="index, follow">

<!-- Open Graph (Facebook / Zalo / LinkedIn) -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="MedFA">
<meta property="og:title" content="MedFA - Cẩm nang & Phản xạ Sơ cấp cứu Y tế Vì Cộng Đồng">
<meta property="og:description" content="Học kỹ năng sơ cấp cứu, xử trí chính xác trong 4 phút vàng cứu sống người thân. Thư viện chuẩn y khoa, Flashcard 3D và thử thách đếm ngược.">
<meta property="og:image" content="https://nguyentrunqkien.github.io/MedFA/assets/images/hero-cpr.webp">
<meta property="og:url" content="https://nguyentrunqkien.github.io/MedFA/">
```

---

## 3. CẤU TRÚC SCHEMA.ORG DỮ LIỆU CÓ CẤU TRÚC (JSON-LD)

MedFA áp dụng chuẩn **JSON-LD** (khuyến nghị chính thức của Google) được phân tầng thành 2 cấp độ:

### 3.1. Cấp độ Toàn trang (Global Level - `index.html`)
Khai báo nhận diện thực thể tổ chức phi lợi nhuận (`Organization`) và website (`WebSite`):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nguyentrunqkien.github.io/MedFA/#organization",
      "name": "MedFA - Medical First Aid Educational Hub",
      "url": "https://nguyentrunqkien.github.io/MedFA/",
      "logo": "assets/icons/logo.svg",
      "description": "Nền tảng giáo dục sơ cấp cứu y tế phi lợi nhuận vì cộng đồng theo khuyến cáo AHA và ERC."
    },
    {
      "@type": "WebSite",
      "@id": "https://nguyentrunqkien.github.io/MedFA/#website",
      "url": "https://nguyentrunqkien.github.io/MedFA/",
      "name": "MedFA",
      "description": "Cẩm nang và phản xạ sơ cấp cứu y tế trong 4 phút vàng vì cộng đồng",
      "publisher": {
        "@id": "https://nguyentrunqkien.github.io/MedFA/#organization"
      },
      "inLanguage": "vi-VN"
    }
  ]
}
```

---

### 3.2. Cấp độ Trang Chi tiết Bài học (`topic-detail.html`)
Mỗi bài học khi nạp dữ liệu động từ `data/topics.json` sẽ tự động kích hoạt hàm `injectTopicSchema(topic)` để nhúng 2 schema quan trọng nhất:

1. **`MedicalWebPage`:**
   - Xác định trang web có chuyên môn y khoa.
   - Trường `medicalAudience`: `"Patient"` (hướng tới người dân và cộng đồng sơ cứu viên ban đầu).
   - Trường `about`: Thể hiện bệnh lý/chấn thương liên quan (`MedicalCondition`).
2. **`HowTo` & `HowToStep`:**
   - Liệt kê từng bước sơ cứu tuần tự (`stepNumber`, `name`, `text`).
   - Đây là điều kiện tiên quyết để thuật toán Google Search hiển thị **Google Rich Snippets (Carousel các bước thao tác)**.

#### Mẫu JSON-LD động được sinh tự động:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://nguyentrunqkien.github.io/MedFA/topic-detail.html?id=hoc-di-vat#webpage",
      "url": "https://nguyentrunqkien.github.io/MedFA/topic-detail.html?id=hoc-di-vat",
      "name": "Hóc dị vật (Nghẹn & Tắc đường thở)",
      "description": "Nhận diện dấu hiệu tắc nghẽn đường thở hoàn toàn và các bước sơ cứu tức thì bằng nghiệm pháp Heimlich.",
      "medicalAudience": "Patient",
      "about": {
        "@type": "MedicalCondition",
        "name": "Hóc dị vật đường thở"
      }
    },
    {
      "@type": "HowTo",
      "name": "Quy trình sơ cứu: Hóc dị vật (Nghẹn & Tắc đường thở)",
      "description": "Nghiệm pháp Heimlich và vỗ lưng tống xuất dị vật trong 4 phút vàng.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Nhận biết dấu hiệu nghẹn thở hoàn toàn",
          "text": "Nạn nhân ôm cổ họng, không thể nói, không thể ho hoặc thở thành tiếng, da tím tái nhanh chóng."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "5 lần vỗ lưng dứt khoát",
          "text": "Đứng chếch phía sau, dùng gót bàn tay vỗ mạnh 5 lần vào lưng giữa hai xương bả vai."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "5 lần ép bụng (Nghiệm pháp Heimlich)",
          "text": "Vòng tay ra trước ôm eo nạn nhân, nắm một tay đặt trên rốn, giật mạnh vào trong và hướng lên trên."
        }
      ]
    }
  ]
}
```

---

## 4. HƯỚNG DẪN KIỂM THỬ DỮ LIỆU CÓ CẤU TRÚC (TESTING & VERIFICATION)

Trước khi nghiệm thu đồ án, nhóm thực hiện kiểm tra cấu trúc qua 2 công cụ chính thức:

1. **Google Rich Results Test (Kiểm tra Kết quả Nhiều định dạng):**
   - URL: `https://search.google.com/test/rich-results`
   - Dán URL hoặc dán trực tiếp đoạn mã HTML/JSON-LD.
   - Tiêu chí đạt: Báo xanh mục **HowTo** và không có lỗi nghiêm trọng (Zero Errors).
2. **Schema Markup Validator (Schema.org):**
   - URL: `https://validator.schema.org/`
   - Xác thực hợp lệ các thuộc tính của `MedicalWebPage`, `HowTo`, `Organization`.

---

## 5. TỐI ƯU CORE WEB VITALS CHO WEB VỆ TINH

Để Google xếp hạng cao, website vệ tinh phải có tốc độ phản hồi cực nhanh:
* **LCP (Largest Contentful Paint) < 1.2s:** Hình ảnh Hero được tối ưu ở định dạng WebP nội bộ dung lượng < 30KB.
* **FID / INP (Interaction to Next Paint) < 50ms:** 100% mã JavaScript thuần (Vanilla JS), không có chi phí phân tích cú pháp của các Framework nặng (React/Angular/Vue).
* **CLS (Cumulative Layout Shift) = 0:** Khung chứa SVG, kích thước ảnh và font chữ dự phòng được khai báo kích thước tĩnh, tránh giật lag layout khi nạp trang.
