# Kế hoạch triển khai phiên bản tiếng Anh cho MedFA

Tài liệu bàn giao để triển khai và nghiệm thu tính năng chuyển ngôn ngữ Việt–Anh. MedFA tiếp tục dùng HTML, CSS và JavaScript thuần, cùng các tệp JSON tĩnh. Nút **English** trong header đổi chữ ngay trên trang đang mở. Lựa chọn được ghi nhớ khi tải lại hoặc chuyển trang. Giai đoạn này triển khai tính năng trên trình duyệt. Việc sinh URL tiếng Anh riêng và cấu hình deploy được dành cho giai đoạn SEO sau.

## Cây thư mục

Cây dưới đây liệt kê những mục liên quan đến tính năng. Các chú thích `[mới]`, `[sửa]` và `[dùng chung]` thể hiện công việc dự kiến.

```text
MedFA---First-Aid-E-learning-Hub/
├── index.html                         [sửa] Trang chủ
├── topics.html                        [sửa] Thư viện sơ cứu
├── topic-detail.html                  [sửa] Chi tiết bài sơ cứu
├── flashcards.html                     [sửa] Flashcard
├── quiz.html                           [sửa] Quiz
├── timed-practice.html                 [sửa] Luyện tập tính giờ
├── about.html                          [sửa] Giới thiệu
├── contact.html                        [sửa] Liên hệ
├── social-impact.html                  [sửa] Tác động xã hội
├── components/
│   ├── header.html                     [sửa] Menu và nút đổi ngôn ngữ
│   ├── footer.html                     [sửa] Nội dung footer
│   └── medical-disclaimer.html         [sửa] Lưu ý y khoa
├── css/                               [dùng chung] Kiểm tra bố cục với chữ tiếng Anh
├── js/
│   ├── translations.js                [mới] Từ điển chữ giao diện vi/en
│   ├── i18n.js                        [mới] Đọc, lưu và áp dụng ngôn ngữ
│   ├── main.js                        [sửa] Header, footer, menu và lối vào Thư viện
│   ├── data-loader.js                 [sửa] Nạp và ghép nội dung dịch
│   ├── render-topics.js               [sửa] Thư viện, tìm kiếm và bộ lọc
│   ├── topic-detail.js                [sửa] Nội dung bài và lưu ý y khoa
│   ├── flashcard-controller.js        [sửa] Chữ trên hai mặt thẻ
│   ├── quiz-engine.js                 [sửa] Câu hỏi, lựa chọn, giải thích và kết quả
│   ├── timed-practice.js              [sửa] Nội dung luyện tập tính giờ
│   ├── contact-validation.js          [sửa] Nhãn và thông báo của form
│   └── chatbot-gemini.js              [sửa] Chữ cố định trên giao diện chatbot
├── data/
│   ├── topics.json                    [dùng chung] Dữ liệu gốc
│   ├── quiz.json                      [dùng chung] Dữ liệu gốc và đáp án
│   ├── timed_practice.json            [dùng chung] Dữ liệu gốc và đáp án
│   └── en/
│       ├── topics.json                [mới] Bản dịch bài theo ID
│       ├── quiz.json                  [mới] Bản dịch quiz theo ID
│       └── timed_practice.json        [mới] Bản dịch luyện tập theo ID
├── docs/
│   └── KE_HOACH_TRIEN_KHAI_TIENG_ANH.md
└── README.md                          [sửa] Hướng dẫn cập nhật bản dịch
```

## 1. Giao diện và cơ chế đổi ngôn ngữ

1. Trong `translations.js`, dùng cùng bộ khóa cho `vi` và `en`. Đặt khóa theo vị trí hoặc chức năng, ví dụ `nav.topics`, `contact.errors.required` và `quiz.result.title`.
2. Trong `i18n.js`, đọc `medfa.language` từ `localStorage`. Chấp nhận `vi` và `en`, mặc định `vi` khi chưa có giá trị hoặc giá trị đã lưu không hợp lệ. Cập nhật `<html lang>` và cung cấp `t(key, params)` để tra chữ, `applyTranslations(root)` để dịch một vùng HTML và `setLanguage(lang)` để lưu lựa chọn, cập nhật chữ rồi phát sự kiện đổi ngôn ngữ. Nếu trình duyệt chặn lưu trữ, giữ lựa chọn trong bộ nhớ của trang.
3. Đánh dấu phần chữ tĩnh bằng `data-i18n`. Gắn khóa vào phần tử chứa chữ để giữ biểu tượng, liên kết và cấu trúc lồng bên trong. Áp dụng bản dịch bằng `textContent`. Dùng thuộc tính `data-*` tương ứng cho `placeholder`, `aria-label` hoặc `title` khi cần. Dịch tiêu đề tab, trạng thái trống, thông báo lỗi và chữ do JavaScript sinh bằng cùng bộ khóa. Dùng tham số cho chuỗi có số điểm, số câu hoặc thời gian.
4. Nạp `translations.js` trước `i18n.js`, rồi nạp các script sử dụng bản dịch theo thứ tự hiện tại của từng trang. Trong `main.js`, nối menu `data-language` với `setLanguage()`, cập nhật nhãn nút và dấu chọn. Áp dụng bản dịch sau khi chèn header/footer, kể cả khi chúng đến từ HTML dự phòng trong `main.js`. Làm tương tự cho lưu ý y khoa được nạp sau.

```html
<a href="topics.html">
  <span data-i18n="nav.topics">Chủ đề sơ cứu</span>
</a>
```

Khóa `nav.topics` ánh xạ tới `Chủ đề sơ cứu` trong `vi` và `First Aid Topics` trong `en`. `data-i18n` là thuộc tính tùy chỉnh của HTML. JavaScript thuần đọc khóa và cập nhật chữ.

## 2. Dữ liệu học tập và trạng thái

Các file trong `data/en/` lưu ID và những trường chữ cần dịch. Nạp bản dịch của bộ dữ liệu đang dùng khi vào chế độ tiếng Anh và tái sử dụng kết quả trong trang. Ghép bản dịch vào dữ liệu hiển thị theo ID. Dữ liệu gốc tiếp tục cung cấp các mã danh mục, mức khẩn cấp, đáp án đúng, liên kết, ID dùng cho bookmark và giá trị dùng để lưu tiến độ. Khi thiếu trường dịch hoặc không tải được file dịch, dùng chữ tiếng Việt tương ứng. Với `steps`, `timeline`, `dos` và `donts`, giữ cùng số mục và thứ tự nội dung như bản gốc. Khi nạp dữ liệu, kiểm tra độ dài và nội dung trống, đồng thời đối chiếu số thứ tự của từng bước và mức của từng mốc thời gian. Nếu một danh sách không hợp lệ, dùng danh sách tiếng Việt tương ứng. Người rà soát bản dịch cần đối chiếu thứ tự và ý nghĩa của những mục không có mã riêng.

| Phần | Cách triển khai | Trạng thái cần giữ khi đổi ngôn ngữ |
|---|---|---|
| Thư viện và tìm kiếm | Kính lúp trên header mở trang Thư viện. Ô tìm kiếm tại Thư viện tìm theo nội dung ở ngôn ngữ đang chọn. Bộ lọc dùng mã danh mục gốc. | Từ khóa đang nhập, danh mục đang chọn và danh sách bài đã lưu. |
| Chi tiết bài học | Ghép theo `id`. Dịch phần mở đầu, cảnh báo, các bước, điều nên làm và nên tránh, cùng các nhãn có hiển thị. Giữ `stepNumber`, liên kết nguồn và video theo dữ liệu gốc. | ID trên URL `topic-detail.html?id=…` và trạng thái bài đã lưu. |
| Flashcard | Tái sử dụng bản dịch từ dữ liệu chủ đề để cập nhật hai mặt thẻ. | Thứ tự bộ thẻ, thẻ hiện tại, mặt đang mở và tiến độ. |
| Quiz | Ghép `scenario`, `question` và `explanation` theo ID câu hỏi. Ghép `options[].text` theo `options[].id`, chẳng hạn `a` hoặc `b`. Chấm theo `answer` gốc. | Câu hiện tại, thứ tự câu và lựa chọn, đáp án đã chọn, điểm và trạng thái đã nộp. |
| Luyện tập tính giờ | Ghép `prompt`, `topicTitle`, `explanation` và các trường chữ đang hiển thị theo ID câu hỏi. Dịch `options` theo đúng thứ tự gốc vì `answer` là chỉ số. | Câu hiện tại, đáp án đã chọn, thời gian còn lại và kết quả đã chấm. |
| Liên hệ và chatbot | Dịch nhãn, placeholder, lỗi kiểm tra form và chữ cố định trong khung chat. Phản hồi tự động của chatbot nằm ngoài phạm vi dịch lần này. | Chữ đã nhập, lỗi đang hiển thị và trạng thái mở khung chat. |

Khi đổi ngôn ngữ, cập nhật phần hiển thị từ trạng thái hiện tại. Nếu hàm render đang kiêm khởi tạo câu hỏi, xáo thẻ, gắn sự kiện hoặc bắt đầu đồng hồ, tách phần cập nhật chữ ra. Với bản dịch nạp bất đồng bộ, kiểm tra lựa chọn ngôn ngữ đang có hiệu lực trước khi áp dụng kết quả, đặc biệt khi người dùng bấm chuyển qua lại nhanh. Rà lại bản dịch bài sơ cứu và câu hỏi với nội dung gốc trước khi demo.

## 3. Thứ tự triển khai

1. Làm từ điển giao diện, bộ xử lý ngôn ngữ, header/footer và trang chủ. Kiểm tra menu, lưu lựa chọn và nhánh header/footer dự phòng.
2. Áp dụng bản dịch giao diện cho các trang còn lại. Nối bản dịch chủ đề vào thư viện, trang chi tiết, tìm kiếm và flashcard.
3. Nối bản dịch quiz và luyện tập tính giờ. Kiểm tra đổi ngôn ngữ giữa phiên làm bài và sau khi nộp.
4. Hoàn thiện form, chữ cố định của chatbot và README. Rà toàn bộ chữ tiếng Anh còn thiếu và kiểm tra trên desktop lẫn mobile.

## 4. Checklist nghiệm thu

- [ ] Lần đầu mở website hiển thị tiếng Việt. Chọn English, tải lại và đi qua các trang vẫn giữ tiếng Anh. Chuyển về tiếng Việt hoạt động tương tự.
- [ ] Kiểm tra đủ 9 trang ở cả hai ngôn ngữ, gồm tiêu đề, header/footer, menu mobile, nhãn trợ năng, thông báo lỗi và trạng thái trống.
- [ ] Tìm được bài theo tiêu đề tiếng Anh. Bộ lọc đang chọn và bài đã lưu vẫn mở đúng sau khi đổi ngôn ngữ.
- [ ] Quiz giữ câu, đáp án đã chọn và điểm. Luyện tập tính giờ giữ đáp án và đồng hồ tiếp tục đếm. Flashcard giữ thẻ và mặt đang mở.
- [ ] Form giữ dữ liệu đã nhập. Các lỗi đang hiển thị chuyển sang đúng ngôn ngữ.
- [ ] Thử thiếu một khóa dịch, tải file dịch thất bại và đổi qua lại nhanh. Trang vẫn sử dụng được và kết quả hiển thị khớp với ngôn ngữ đã chọn.
- [ ] Tính năng dùng chung mã hiển thị và logic hiện tại. README giải thích cách thêm khóa giao diện và cách ghép bản dịch theo ID. Tính năng dùng HTML, CSS, JavaScript và JSON tĩnh, với các API sẵn có của trình duyệt.

## 5. Hướng mở rộng SEO

Giai đoạn này dùng cùng URL cho hai ngôn ngữ. Nếu cần người dùng tìm thấy bản tiếng Anh riêng trên công cụ tìm kiếm, có thể dùng các khóa dịch và dữ liệu theo ID để sinh HTML tĩnh ở `/en/` trước khi deploy. Mỗi trang đã dịch đầy đủ có URL riêng, nội dung tiếng Anh sẵn trong HTML, tiêu đề và mô tả tiếng Anh, cùng khai báo `hreflang` hai chiều. Từng bài sơ cứu cần có trang riêng nếu muốn bài đó được tìm thấy riêng bằng tiếng Anh. Phần này nằm ngoài checklist triển khai hiện tại.
