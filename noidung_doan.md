# Cẩm nang sơ cấp cứu y tế cộng đồng - Dự án MedFA
> **Tài liệu tổng hợp nội dung sơ cấp cứu ngoại viện**  
> *Đồ án môn học: IE104 - Internet và Công nghệ Web*  
> *Trường Đại học Công nghệ Thông tin – ĐHQG-HCM (UIT)*  
> *Biên soạn: Nhóm sinh viên thực hiện dự án MedFA*

---

## Mục lục
1. [Phần I: Giới thiệu dự án MedFA](#phan-i-gioi-thieu-du-an-medfa)
   - 1.1. Lý do làm dự án và mục tiêu
   - 1.2. Một số số liệu về cấp cứu ngoại viện tại Việt Nam
   - 1.3. Vì sao kiến thức sơ cứu lại quan trọng?
   - 1.4. Nguyên tắc "4 phút vàng" trong sơ cấp cứu
2. [Phần II: Nhóm thực hiện và nguồn tài liệu tham khảo](#phan-ii-nhom-thuc-hien-va-nguon-tai-lieu-tham-khao)
   - 2.1. Thành viên nhóm MedFA (UIT)
   - 2.2. Công nghệ sử dụng trong đồ án
   - 2.3. Nguồn tài liệu y khoa đối chiếu
   - 2.4. Lưu ý về trách nhiệm y khoa
3. [Phần III: Giá trị cộng đồng của dự án](#phan-iii-gia-tri-cong-dong-cua-du-an)
   - 3.1. Những thói quen sai khi sơ cứu thường gặp
   - 3.2. Phổ cập kiến thức đơn giản, dễ nhớ
   - 3.3. Ba hướng chính của MedFA
4. [Phần IV: Cẩm nang 33 tình huống sơ cấp cứu](#phan-iv-cam-nang-33-tinh-huong-so-cap-cuu)
   - 4.1. Nhóm 1: Trẻ em và trẻ sơ sinh (6 chủ đề)
   - 4.2. Nhóm 2: Tai nạn sinh hoạt gia đình (11 chủ đề)
   - 4.3. Nhóm 3: Bệnh lý cấp tính (6 chủ đề)
   - 4.4. Nhóm 4: Tai nạn ngoài trời và môi trường (6 chủ đề)
   - 4.5. Nhóm 5: Tai nạn giao thông và chấn thương nặng (4 chủ đề)
5. [Phần V: 10 tình huống trắc nghiệm thực tế](#phan-v-10-tinh-huong-trac-nghiem-thuc-te)
6. [Phần VI: 32 câu hỏi luyện phản xạ 4 phút vàng](#phan-vi-32-cau-hoi-luyen-phan-xa-4-phut-vang)
7. [Phần VII: Thẻ ghi nhớ Flashcard 3D và bảng tra cứu nhanh](#phan-vii-the-ghi-nho-flashcard-3d-va-bang-tra-cuu-nhanh)
8. [Phần VIII: Cách gọi cấp cứu 115 và thông tin đóng góp](#phan-viii-cach-goi-cap-cuu-115-va-thong-tin-dong-gop)

---

## Phần I: Giới thiệu dự án MedFA

### 1.1. Lý do làm dự án và mục tiêu
**MedFA (Medical First Aid)** là đồ án môn học **IE104 – Internet và Công nghệ Web** của nhóm sinh viên Trường Đại học Công nghệ Thông tin (UIT).

Tai nạn hay sự cố sức khỏe có thể xảy ra bất cứ lúc nào ở nhà, ngoài đường hay nơi làm việc. Thực tế, nhiều người có mặt tại hiện trường thường lúng túng, không biết phải xử lý thế nào, hoặc làm theo các mẹo truyền miệng chưa kiểm chứng khiến vết thương nặng thêm.

Nhóm xây dựng MedFA như một trang web miễn phí, phi lợi nhuận để tổng hợp lại các bước sơ cứu cơ bản theo cách ngắn gọn, dễ nhìn và dễ làm theo. Mục tiêu của trang web là giúp người bình thường có thể tra cứu nhanh và tự tin hỗ trợ người xung quanh trong lúc chờ xe cấp cứu.

### 1.2. Một số số liệu về cấp cứu ngoại viện tại Việt Nam
Các con số dưới đây cho thấy việc biết sơ cứu ban đầu quan trọng như thế nào:

| Vấn đề | Số liệu ước tính | Ý nghĩa thực tế |
| :--- | :--- | :--- |
| **Tai nạn thương tích** | **Khoảng 3.600 ca / ngày** | Số người gặp tai nạn giao thông, tai nạn sinh hoạt cần được hỗ trợ y tế mỗi ngày. |
| **Tử vong do tai nạn** | **Khoảng 90 ca / ngày** | Nhiều trường hợp nặng có thể giảm bớt rủi ro nếu được xử trí đúng cách ngay từ những phút đầu. |
| **Đột quỵ não** | **Khoảng 200.000 ca / năm** | Nhiều bệnh nhân hồi phục kém hoặc để lại di chứng do người nhà nhận biết muộn, mất thời gian vàng đưa đi viện. |
| **Sơ cứu tai nạn giao thông** | **Khoảng 70% xử lý chưa đúng** | Thói quen bế xốc, kéo lê nạn nhân ngay tại hiện trường dễ làm tổn thương cột sống nặng hơn. |
| **Đuối nước ở trẻ em** | **Khoảng 2.000 trẻ / năm** | Việc vác dốc ngược trẻ chạy quanh thay vì ép tim, thổi ngạt làm mất đi thời gian cấp cứu quý giá. |
| **Ngừng tim ngoài bệnh viện** | **Tỷ lệ tử vong cao** | Phần lớn nạn nhân ngừng tim ngoài đường khó qua khỏi vì người xung quanh chưa biết cách ép tim (CPR). |

### 1.3. Vì sao kiến thức sơ cứu lại quan trọng?
> Đằng sau mỗi con số thống kê là sức khỏe và tính mạng của chính người thân, bạn bè hay người đi đường quanh ta.
>
> *Sẽ ra sao nếu một ngày bạn gặp phải:*
> - Trẻ nhỏ đang ăn bị hóc dị vật, nghẹn thở?
> - Người lớn tuổi đột nhiên méo miệng, nói ngọng, yếu một bên tay chân?
> - Người đi đường bị ngã xe, vết thương chảy nhiều máu?
>
> **Khi đã biết trước những bước cơ bản, bạn sẽ giữ được bình tĩnh để giúp nạn nhân an toàn hơn trước khi nhân viên y tế đến.**

### 1.4. Nguyên tắc "4 phút vàng" trong sơ cấp cứu
- **Não rất dễ tổn thương khi thiếu oxy:** Khi tim ngừng đập hoặc đường thở bị tắc hoàn toàn:
  - **Trong 0 – 4 phút đầu:** Nếu được ép tim (CPR) và hỗ trợ thở kịp thời, khả năng bảo vệ não bộ còn rất cao.
  - **Từ 4 – 6 phút:** Tế bào não bắt đầu tổn thương.
  - **Từ 6 – 10 phút:** Tổn thương nặng hơn, dễ để lại di chứng lâu dài.
  - **Trên 10 phút:** Não khó có khả năng hồi phục.
- **Vai trò của người có mặt tại chỗ:** Ở nhiều khu vực đông đúc, xe cấp cứu 115 có thể mất 15–30 phút mới tới nơi. Vì vậy, những việc làm đúng của người chứng kiến trong vài phút đầu tiên giúp giữ cơ hội sống cho nạn nhân.

---

## Phần II: Nhóm thực hiện và nguồn tài liệu tham khảo

### 2.1. Thành viên nhóm MedFA (UIT)
Đồ án được thực hiện bởi 4 sinh viên Trường Đại học Công nghệ Thông tin (ĐHQG-HCM):

1. **Nguyễn Trung Kiên (MSSV: 24520888)** - Trưởng nhóm: Phụ trách cấu trúc dự án, viết logic JavaScript thuần, tối ưu tốc độ tải trang và ghép nối dữ liệu.
2. **Trần Gia Phú (MSSV: 24521365)** - Thành viên: Thiết kế giao diện, bố cục hiển thị trên điện thoại và máy tính.
3. **Hồ Tấn Khải (MSSV: 24520721)** - Thành viên: Tìm kiếm, đối chiếu tài liệu y khoa và biên tập bộ dữ liệu 33 tình huống, câu hỏi trắc nghiệm.
4. **Trương Đỗ Như Quỳnh (MSSV: 24521513)** - Thành viên: Làm các phần luyện tập tương tác (Flashcard 3D, đếm ngược 4 phút, kiểm tra trắc nghiệm) và kiểm thử giao diện.

### 2.2. Công nghệ sử dụng trong đồ án
- **HTML5, CSS3 và JavaScript thuần:** Không dùng thư viện ngoài như Bootstrap, Tailwind, jQuery hay React, tuân thủ yêu cầu môn IE104.
- **Xử lý dữ liệu trên trình duyệt:** Dùng Fetch API để đọc các file JSON và dùng LocalStorage/SessionStorage để lưu kết quả học tập.
- **Tổ chức thư mục rõ ràng:** Các file HTML đặt ở thư mục gốc, CSS trong `css/`, JavaScript trong `js/`, dữ liệu trong `data/` và hình ảnh trong `images/`.

### 2.3. Nguồn tài liệu y khoa đối chiếu
Nội dung trên MedFA được nhóm tổng hợp và đối chiếu từ các hướng dẫn y khoa uy tín:
- **AHA (American Heart Association):** Hướng dẫn hồi sinh tim phổi (CPR) và cấp cứu tim mạch.
- **ERC (European Resuscitation Council):** Hướng dẫn sơ cấp cứu châu Âu.
- **Hội Chữ thập đỏ quốc tế (IFRC / Red Cross):** Tài liệu sơ cấp cứu cộng đồng.
- **Bộ Y tế Việt Nam:** Hướng dẫn xử trí tai nạn thương tích ban đầu.
- **Các bệnh viện và nhà thuốc uy tín trong nước:** Tham khảo bài viết chuyên môn từ Vinmec, Tâm Anh, Bạch Mai, Long Châu (có đính kèm link nguồn).

### 2.4. Lưu ý về trách nhiệm y khoa
> [!WARNING]
> **Lưu ý quan trọng:**
> 1. Toàn bộ nội dung trên MedFA chỉ dùng để tham khảo và học tập, giúp mọi người nâng cao nhận thức về sơ cứu.
> 2. Thông tin trên trang **không thay thế** cho việc khám bệnh, chẩn đoán hay chỉ định của bác sĩ.
> 3. Trang web cũng không thay thế được các lớp học thực hành sơ cứu trực tiếp có cấp chứng chỉ.
> 4. Khi gặp tình huống nguy hiểm, **hãy gọi ngay cấp cứu 115** hoặc đưa người bệnh đến cơ sở y tế gần nhất.

---

## Phần III: Giá trị cộng đồng của dự án

### 3.1. Những thói quen sai khi sơ cứu thường gặp
Nhiều tai nạn đáng tiếc trở nên nặng hơn vì người xung quanh làm theo thói quen sai:
- Thấy người lên cơn co giật lại cố nhét thìa, đũa hoặc vắt chanh vào miệng, dễ làm gãy răng hoặc gây sặc.
- Bị bỏng lại bôi kem đánh răng, nước mắm hay mỡ trăn lên vết thương, dễ gây nhiễm trùng.
- Thấy người đuối nước lại dốc ngược chạy quanh bờ thay vì ép tim, thổi ngạt.
- Nhiều người muốn giúp nhưng lại sợ làm sai, dẫn đến chần chừ, bỏ lỡ thời gian vàng.

### 3.2. Phổ cập kiến thức đơn giản, dễ nhớ
Cách bền vững nhất để giảm rủi ro tai nạn là giúp mọi người nắm được các bước sơ cứu cơ bản. Khi mỗi gia đình có ít nhất một người biết xử trí đúng, nạn nhân sẽ được hỗ trợ an toàn hơn ngay tại chỗ.

### 3.3. Ba hướng chính của MedFA
1. **Dễ tra cứu:** Đưa toàn bộ hướng dẫn lên web miễn phí, mở xem nhanh trên điện thoại mọi lúc mọi nơi.
2. **Dễ hiểu, dễ làm:** Viết ngắn gọn bằng ngôn ngữ đời thường, chỉ rõ từng bước cần làm và những điều nên tránh.
3. **Luyện phản xạ:** Có thêm thẻ lật Flashcard 3D, bài tập tình huống và chế độ đếm ngược 4 phút để người đọc nhớ lâu hơn.

---

## Phần IV: Cẩm nang 33 tình huống sơ cấp cứu

33 tình huống được chia thành 5 nhóm theo hoàn cảnh xảy ra:

*(Lưu ý: Các bước dưới đây mang tính chất hướng dẫn tham khảo, luôn ưu tiên gọi 115 khi có dấu hiệu nguy hiểm).* 

### 4.1. Nhóm 1: Trẻ em và trẻ sơ sinh
*Số lượng: 5 chủ đề*

#### 1. Hóc dị vật (nghẹn & tắc đường thở)
- **Mã chủ đề:** `hoc-di-vat`
- **Phân loại:** Trẻ em và trẻ sơ sinh
- **Mức độ:** Khẩn cấp
- **Thời gian đọc:** 2 phút
- **Nguồn đối chiếu:** Chuẩn ERC & AHA 2025
- **Tóm tắt:** Cách thực hiện nghiệm pháp Heimlich để tống dị vật ra khỏi đường thở cho người lớn và trẻ nhỏ.

**Tổng quan:**  
Dị vật xâm nhập gây cản trở đường thở cấp tính. Não bộ sẽ bắt đầu tổn thương khó có khả năng phục hồi chỉ sau 4 phút thiếu oxy nếu không được can thiệp đúng phương pháp ngay tại hiện trường.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu nạn nhân bất tỉnh, tím tái môi đầu chi hoặc không còn phát ra tiếng thở.

**Các bước xử trí:**
1. **Đánh giá mức độ tắc nghẽn**: Hỏi nạn nhân 'bạn có bị nghẹn không? '. Nếu nạn nhân vẫn nói, khóc hoặc ho mạnh được: KHUYẾN KHÍCH HO MẠNH, tối đa không nên đập lưng hay can thiệp ép bụng lúc này.
2. **5 vỗ lưng dứt khoát (back blows)**: Nếu nạn nhân không thở được hoặc ho yếu: Đứng hơi chếch sau lưng, một tay đỡ ngực nạn nhân nghiêng người về phía trước. Dùng gót bàn tay kia vỗ mạnh, dứt khoát 5 lần vào khoảng giữa 2 xương bả vai hướng lên trên.
3. **5 lần ép bụng Heimlich (abdominal thrusts)**: Vòng hai tay quanh eo nạn nhân. Nắm chặt một bàn tay, đặt nắm đấm (ngón cái hướng vào trong) tại vùng thượng vị (trên rốn, dưới mũi ức). Tay kia bọc lấy nắm đấm, giật mạnh dứt khoát theo hướng VÀO TRONG VÀ LÊN TRÊN.
4. **Lặp lại chu kỳ 5 vỗ lưng: 5 ép bụng**: Tiếp tục luân phiên 5 vỗ lưng và 5 ép bụng cho đến khi dị vật bật ra ngoài hoặc nạn nhân thở lại bình thường.
5. **Nếu nạn nhân bất tỉnh: Chuyển sang CPR**: Đặt nạn nhân nằm ngửa trên mặt sàn phẳng cứng, gọi 115 và bắt đầu ép tim ngoài lồng ngực (30 lần ép tim: 2 lần thổi ngạt). Trước mỗi lần thổi ngạt, kiểm tra khoang miệng xem có dị vật trồi lên không.

**Nên làm:**
- Khuyến khích nạn nhân tiếp tục ho mạnh nếu họ còn ho được.
- Cúi người nạn nhân về phía trước khi vỗ lưng để dị vật rơi ra ngoài.
- Đối với trẻ sơ sinh (<1 tuổi): Dùng 5 vỗ lưng và 5 ấn ngực bằng 2 ngón tay, không nên ép bụng Heimlich.

**Cần tránh:**
- Không nên móc họng mù quáng bằng ngón tay khi không nhìn thấy rõ dị vật.
- Không nên cho uống nước hay nuốt cơm để cố đẩy dị vật xuống.
- Không nên ép bụng cho phụ nữ mang thai tháng cuối (chuyển sang ép ngực).

---

#### 2. Hướng dẫn sơ cứu trẻ bị hóc dị vật đường thở
- **Mã chủ đề:** `hoc-di-vat-o-tre-em`
- **Phân loại:** Trẻ em và trẻ sơ sinh
- **Mức độ:** Khẩn cấp
- **Thời gian đọc:** 1 phút
- **Nguồn đối chiếu:** Tham khảo nguồn y tế, chưa thẩm định lâm sàng
- **Tóm tắt:** Nhận biết nghẹn thở và sơ cứu khác nhau cho trẻ dưới 1 tuổi và trẻ lớn hơn.

**Tổng quan:**  
Dị vật có thể làm tắc đường thở rất nhanh. Cách xử trí phụ thuộc vào việc trẻ còn ho được hay không và trẻ đã đủ 1 tuổi chưa.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu trẻ không thể ho, khóc hoặc thở, tím tái hay bất tỉnh; nhờ người khác gọi trong khi bắt đầu sơ cứu.

**Các bước xử trí:**
1. **Đánh giá khả năng ho và thở**: Nếu trẻ còn ho mạnh hoặc khóc được, khuyến khích trẻ tiếp tục ho và theo dõi sát. Nếu ho yếu, không phát ra tiếng hoặc không thở được, xử trí tắc nghẽn đường thở ngay.
2. **Trẻ dưới 1 tuổi: vỗ lưng**: Đỡ đầu và cổ, đặt trẻ nằm sấp dọc cẳng tay, đầu thấp hơn ngực. Dùng gót bàn tay vỗ 5 lần giữa hai xương bả vai.
3. **Trẻ dưới 1 tuổi: ấn ngực**: Lật trẻ nằm ngửa, vẫn giữ đầu thấp hơn ngực; dùng hai ngón tay ấn nhanh 5 lần vào giữa ngực, ngay dưới đường nối hai núm vú. Lặp lại 5 vỗ lưng và 5 ấn ngực nếu dị vật chưa ra.
4. **Trẻ từ 1 tuổi: vỗ lưng và ép bụng**: Cho trẻ cúi người về trước, vỗ 5 lần giữa hai xương bả vai. Nếu chưa hết nghẹn, đứng hoặc quỳ phía sau, thực hiện 5 lần ép bụng hướng vào trong và lên trên; lặp lại đến khi trẻ thở được hoặc bất tỉnh.
5. **Nếu trẻ bất tỉnh**: Đặt trẻ nằm trên mặt phẳng cứng, gọi 115 nếu chưa gọi và bắt đầu CPR theo hướng dẫn của tổng đài hoặc kỹ năng đã được học. Chỉ lấy dị vật khi nhìn thấy rõ trong miệng.

**Nên làm:**
- Khuyến khích trẻ còn ho hiệu quả tiếp tục ho và quan sát liên tục.
- Với trẻ dưới 1 tuổi, luân phiên 5 vỗ lưng và 5 ấn ngực.
- Với trẻ từ 1 tuổi bị nghẹn nặng, luân phiên 5 vỗ lưng và 5 ép bụng.

**Cần tránh:**
- Không nên ép bụng cho trẻ dưới 1 tuổi.
- Không nên móc họng bằng ngón tay khi không nhìn thấy rõ dị vật.
- Không nên để trẻ một mình hoặc chờ đợi nếu trẻ không thể thở, ho hay khóc.

---

#### 3. Xử lý nghi ngờ sốc phản vệ cấp tính (anaphylaxis)
- **Mã chủ đề:** `xu-ly-khi-bi-soc-phan-ve`
- **Phân loại:** Trẻ em và trẻ sơ sinh
- **Mức độ:** Rất khẩn cấp (cần xử trí ngay)
- **Thời gian đọc:** 2 phút
- **Nguồn đối chiếu:** Tham khảo: www.vinmec.com
- **Tóm tắt:** Bị sốc phản vệ là một phản ứng dị ứng cấp tính và nghiêm trọng, có thể gây nguy hiểm đến tính mạng nếu không được cấp cứu kịp thời.

**Tổng quan:**  
Sốc phản vệ là phản ứng dị ứng toàn thân nghiêm trọng, có thể xuất hiện nhanh chóng sau khi tiếp xúc với dị nguyên (thuốc, nọc ong, thực phẩm như hải sản, lạc...). điều này dễ đe dọa tính mạng do phù nề thanh quản hoặc tụt huyết áp nếu không được hỗ trợ y tế kịp thời.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> Hãy gọi 115 ngay. Hỗ trợ người bệnh dùng bút tiêm Adrenalin (Epinephrine) vào mặt trước ngoài đùi nếu họ được bác sĩ kê đơn mang theo.

**Các bước xử trí:**
1. **Cách ly dị nguyên nghi ngờ**: Ngừng ngay việc tiếp xúc với tác nhân nghi ngờ (thức ăn, thuốc), hoặc nhẹ nhàng gạt ngòi độc ong ra nếu bị đốt.
2. **Tư thế nằm phù hợp**: Đặt người bệnh nằm ngửa trên mặt phẳng, có thể kê cao hai chân khoảng 30 cm để hỗ trợ tuần hoàn. Nếu người bệnh khó thở nhiều, có thể cho ngồi tựa lưng (nửa nằm nửa ngồi).
3. **Hỗ trợ sử dụng Adrenalin (Epinephrine)**: Nếu người bệnh có sẵn bút tiêm Adrenalin tự động (epiPen) được kê đơn, hỗ trợ họ tiêm vào mặt trước ngoài đùi theo hướng dẫn sử dụng.
4. **Gọi 115 và theo dõi hồi sức**: Liên hệ ngay 115 để chuyển đến cơ sở y tế. nếu người bệnh ngừng thở, ngừng tim, có thể ép tim ngoài lồng ngực (CPR) theo hướng dẫn.

**Nên làm:**
- Hỗ trợ người bệnh dùng Adrenalin sớm theo chỉ định sẵn có khi nhận thấy dấu hiệu khó thở hoặc tụt huyết áp.
- Giữ người bệnh nằm yên, kê cao chân (nếu không khó thở) và giữ ấm cơ thể.
- Theo dõi tại cơ sở y tế tối thiểu 24 giờ theo hướng dẫn bác sĩ để đề phòng phản vệ hai pha (biphasic reaction).

**Cần tránh:**
- Tránh để người bệnh đột ngột ngồi dậy hoặc đứng lên đi lại vì có nguy cơ gây tụt huyết áp.
- Không nên chần chừ việc gọi cấp cứu khi đã xuất hiện dấu hiệu phù thanh quản hoặc khó thở.
- Tránh cho người bệnh ăn, uống hay tự ý dùng các loại thuốc uống khác khi đang khó thở hoặc suy giảm ý thức.

---

#### 4. Sơ cứu khi trẻ sơ sinh & trẻ nhỏ bị sặc sữa
- **Mã chủ đề:** `sac-sua-o-tre-so-sinh-rat-nguy`
- **Phân loại:** Trẻ em và trẻ sơ sinh
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 3 phút
- **Nguồn đối chiếu:** Tham khảo: www.vinmec.com
- **Tóm tắt:** Bài viết được tư vấn chuyên môn bởi bác sĩ chuyên khoa I Bùi Thị Hà - bác sĩ nhi - sơ sinh - khoa nhi - sơ sinh - Bệnh viện đa khoa quốc tế Vinmec Hạ…

**Tổng quan:**  
Sặc sữa là tình huống hay gặp ở trẻ sơ sinh và trẻ nhỏ khi sữa tràn vào đường thở, làm tắc đường thở và có nguy cơ dẫn đến thiếu oxy nhanh chóng nếu không được xử trí kịp thời.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> Hãy gọi 115 ngay nếu trẻ có dấu hiệu tím tái, ngừng thở hoặc không khóc được sau khi xử trí ban đầu.

**Các bước xử trí:**
1. **Vỗ lưng hỗ trợ đẩy sữa**: Đặt trẻ nằm sấp dọc theo cẳng tay người hỗ trợ, đầu hướng thấp hơn ngực, bàn tay giữ nhẹ cằm và má trẻ. Dùng gót bàn tay kia vỗ dứt khoát 5 lần vào vùng lưng giữa hai xương bả vai.
2. **Ấn ngực nếu trẻ vẫn khó thở**: Nếu trẻ vẫn tím tái, nhẹ nhàng lật ngửa trẻ sang cẳng tay đối diện, giữ đầu thấp hơn thân. Dùng 2 ngón tay (trỏ và giữa) ấn 5 lần vào nửa dưới xương ức (dưới đường nối hai núm vú khoảng 1 cm).
3. **Làm sạch dịch mũi họng**: Sử dụng dụng cụ hút mũi chuyên dụng hoặc gạc sạch làm thông thoáng dịch sữa đọng ở miệng và mũi trẻ (ưu tiên làm sạch miệng trước, mũi sau).
4. **Hỗ trợ hô hấp và đưa đi cấp cứu**: Nếu trẻ ngừng thở, có thể thực hiện thổi ngạt nhẹ nhàng kết hợp ép tim theo hướng dẫn nhi khoa và đưa trẻ đến cơ sở y tế gần nhất.

**Nên làm:**
- Giữ đầu trẻ ở vị trí thấp hơn ngực trong quá trình vỗ lưng ấn ngực để hỗ trợ dịch sữa thoát ra ngoài.
- Ưu tiên làm sạch vùng miệng trước khi làm sạch mũi.
- Cho trẻ bú đúng tư thế: bế đầu cao, cho bú từ từ và vỗ ợ hơi cho trẻ sau khi bú.

**Cần tránh:**
- Tránh dốc ngược trẻ lên hoặc bế xốc thẳng đứng khi trẻ đang sặc sữa.
- Tránh dùng ngón tay móc họng trẻ mù quáng vì có thể làm trầy xước niêm mạc và đẩy sữa vào sâu hơn.
- Không nên tiếp tục cho bú khi trẻ đang khóc, ho hoặc có dấu hiệu khó thở.

---

#### 5. Tìm hiểu nghiệm pháp Heimlich: Xử trí dị vật đường thở
- **Mã chủ đề:** `nghiem-phap-heimlich-la-gi-cach`
- **Phân loại:** Trẻ em và trẻ sơ sinh
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 2 phút
- **Nguồn đối chiếu:** Chưa ghi nhận nguồn cụ thể
- **Tóm tắt:** Nghiệm pháp Heimlich là một biện pháp cấp cứu đầu tiên nhằm loại bỏ dị vật gây tắc nghẽn đường thở.

**Tổng quan:**  
Nghiệm pháp Heimlich (ép bụng đẩy dị vật) là kỹ thuật sơ cứu được áp dụng khi người lớn hoặc trẻ lớn bị tắc nghẽn đường thở do dị vật. Nguyên lý của kỹ thuật là tạo ra áp lực đẩy luồng khí từ phổi lên giúp tống dị vật ra ngoài.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> Nên thực hiện sớm khi nhận thấy nạn nhân có dấu hiệu tắc nghẽn đường thở nặng (ôm cổ, không nói, không ho được, tím tái) và nhờ người gọi 115.

**Các bước xử trí:**
1. **Chuẩn bị tư thế đứng phía sau**: Đứng vững phía sau nạn nhân (chân trước chân sau để tạo điểm tựa), vòng hai tay ôm quanh vùng eo của họ.
2. **Xác định vị trí đặt tay**: Nắm một bàn tay lại thành nắm đấm, đặt mặt ngón cái áp vào vùng bụng trên rốn và dưới mũi xương ức khoảng 2-3 cm.
3. **Làm động tác ép bụng**: Dùng bàn tay còn lại ôm lấy nắm đấm, kéo giật dứt khoát theo hướng VÀO TRONG VÀ CHẾCH LÊN TRÊN.
4. **Luân phiên vỗ lưng và ép bụng**: Theo nhiều hướng dẫn hiện hành (như ERC), có thể luân phiên 5 lần vỗ lưng và 5 lần ép bụng cho đến khi dị vật bật ra hoặc nạn nhân ho, thở trở lại.
5. **Trường hợp nạn nhân bất tỉnh**: Nhẹ nhàng đỡ nạn nhân nằm ngửa trên mặt phẳng cứng, gọi 115 và thực hiện quy trình hồi sinh tim phổi (CPR). Chỉ lấy dị vật trong miệng nếu nhìn thấy rõ.

**Nên làm:**
- Tạo lực ép theo hướng chếch lên trên để tận dụng áp lực khí đẩy dị vật.
- Nên khuyên người bệnh đi kiểm tra y tế sau khi dị vật đã được tống ra để đánh giá các chấn thương phần mềm nếu có.
- Áp dụng linh hoạt luân phiên 5 vỗ lưng - 5 ép bụng theo hướng dẫn sơ cứu cập nhật.

**Cần tránh:**
- Tránh áp dụng kỹ thuật ép bụng Heimlich cho trẻ sơ sinh dưới 1 tuổi (nên dùng kỹ thuật vỗ lưng và ấn ngực).
- Tránh đặt nắm đấm trực tiếp lên mũi ức hoặc khung xương sườn.
- Không nên ép bụng cho phụ nữ mang thai ở những tháng cuối (thay bằng kỹ thuật ép ngực).
- Tránh đưa tay móc họng mù quáng khi không quan sát thấy dị vật.

---

### 4.2. Nhóm 2: Tai nạn sinh hoạt gia đình
*Số lượng: 13 chủ đề*

#### 6. Sơ cứu bỏng nhiệt cấp độ 1 & 2 (nước sôi, lửa, bô xe)
- **Mã chủ đề:** `bong-cap-do-1-2`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 3 phút
- **Nguồn đối chiếu:** Chuẩn Hội Bỏng Quốc tế (ISBI)
- **Tóm tắt:** Các bước làm mát vết bỏng, sơ cứu chống nhiễm trùng và những điều không nên làm.

**Tổng quan:**  
Tổn thương da do nhiệt độ cao gây đau đớn dữ dội, thoát dịch huyết tương và nguy cơ nhiễm trùng cao. Việc ngâm rửa đúng cách trong 15-20 phút đầu quyết định 80% mức độ để lại sẹo.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> Đưa đến cơ sở y tế ngay nếu diện tích bỏng lớn hơn 1 bàn tay, bỏng ở mặt, khớp, bàn tay, vùng kín hoặc nạn nhân là trẻ nhỏ.

**Các bước xử trí:**
1. **Loại bỏ nguồn nhiệt và dị vật**: Nhanh chóng đưa nạn nhân rời khỏi vùng nguy hiểm. Cởi bỏ nhẹ nhàng quần áo dính chất nóng hoặc trang sức vùng bị bỏng trước khi vết thương sưng nề. Nếu quần áo dính chặt vào da, không nên cố giật ra mà cắt vòng quanh.
2. **Làm mát bằng nước sạch chảy nhẹ trong 15-20 phút**: Xả nước mát sạch (nhiệt độ phòng khoảng 15-25°C) chảy nhẹ liên tục lên vùng bỏng tối thiểu 15-20 phút đến khi nạn nhân thấy dịu đau. tối đa không nên dùng đá lạnh trực tiếp.
3. **Bảo vệ vết bỏng bằng gạc sạch vô trùng**: Dùng gạc y tế vô khuẩn hoặc màng bọc thực phẩm sạch che phủ lỏng lẻo lên vết bỏng. Băng nhẹ tay, không siết chặt để tránh gây cọ xát và tổn thương mô phù nề.
4. **Bù nước và chuyển tuyến y tế**: Cho nạn nhân uống nước điện giải hoặc nước ấm nếu còn tỉnh táo. Đưa đến bệnh viện gần nhất nếu diện tích bỏng rộng hoặc có bóng nước lớn.

**Nên làm:**
- Ngâm hoặc xả nước sạch liên tục 15-20 phút ngay sau khi bị bỏng.
- Giữ nguyên các bọng nước (phỏng nước), đặc biệt tránh chọc vỡ.
- Che phủ vết bỏng bằng gạc ẩm vô khuẩn hoặc màng bọc thực phẩm sạch.

**Cần tránh:**
- Không nên bôi kem đánh răng, nước mắm, mỡ trăn, trứng gà lên vết bỏng.
- Không nên chườm đá lạnh trực tiếp (gây bỏng lạnh và co mạch hoại tử mô).
- Không nên chọc vỡ bọng nước tự nhiên của da.

---

#### 7. Sơ cứu vết thương chảy máu nghiêm trọng & sử dụng ga-rô
- **Mã chủ đề:** `chay-mau-nghiem-trong`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Khẩn cấp
- **Thời gian đọc:** 4 phút
- **Nguồn đối chiếu:** Khuyến nghị Stop the Bleed & Red Cross
- **Tóm tắt:** Kỹ thuật băng ép trực tiếp cầm máu và cách sử dụng ga-rô trong tình huống khẩn cấp.

**Tổng quan:**  
Chảy máu động mạch có thể dẫn đến sốc mất máu tử vong chỉ trong vòng vài phút. Hành động cầm máu tại chỗ bằng lực ép trực tiếp là kỹ năng then chốt cứu mạng.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC khi máu phun thành tia, thấm đẫm nhiều lớp vải hoặc nạn nhân có dấu hiệu da lạnh, vã mồ hôi, lơ mơ.

**Các bước xử trí:**
1. **Bảo hộ an toàn và đè ép trực tiếp**: Đeo găng tay y tế nếu có. Dùng một tấm gạc sạch hoặc vải dày đè thật chặt trực tiếp lên miệng vết thương đang chảy máu. Giữ lực ép liên tục không buông trong ít nhất 5-10 phút.
2. **Băng ép cố định và nâng cao chi**: Dùng cuộn băng thun quấn chặt quanh vết thương để duy trì áp lực ép. Nâng chi bị thương cao hơn tim (nếu không nghi ngờ gãy xương) để giảm áp lực dòng máu.
3. **Nếu máu vẫn thấm qua: Thêm lớp mới, không nên gỡ lớp cũ**: Nếu máu tiếp tục thấm ướt qua lớp băng gạc đầu tiên, không nên tháo gạc cũ ra (để tránh phá vỡ cục máu đông đang hình thành), hãy đặt thêm lớp gạc mới lên trên và băng chặt hơn.
4. **Áp dụng ga-rô (tourniquet) nếu máu phun tia ở tay/chân**: Nếu máu chảy ồ ạt từ động mạch tay hoặc chân không thể cầm bằng băng ép: Đặt dây ga-rô cách vết thương 5-7cm về phía gốc chi (không đặt đè lên khớp). Siết chặt cho đến khi máu ngừng chảy hoàn toàn và ghi rõ giờ đặt ga-rô lên trán nạn nhân.

**Nên làm:**
- Ép chặt tay liên tục lên vị trí vết thương ít nhất 5 phút.
- Ghi rõ thời gian đặt ga-rô (giờ:phút) để báo cho bác sĩ cấp cứu.
- Giữ ấm cho nạn nhân để phòng tránh sốc hạ thân nhiệt.

**Cần tránh:**
- Không nên tháo băng cũ ra kiểm tra khi máu đang cầm.
- Không nên đặt ga-rô trực tiếp lên khớp khuỷu tay hoặc đầu gối.
- Không nên tự ý nới lỏng ga-rô khi chưa có nhân viên y tế hỗ trợ.

---

#### 8. Sơ cứu khi bị bỏng lửa, bỏng nước sôi
- **Mã chủ đề:** `bong-nhiet`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 1 phút
- **Nguồn đối chiếu:** Tham khảo nguồn y tế, chưa thẩm định lâm sàng
- **Tóm tắt:** Làm mát vết bỏng bằng nước mát chảy, che phủ sạch và nhận diện dấu hiệu cần cấp cứu.

**Tổng quan:**  
Bỏng do nước sôi hoặc lửa cần được ngừng tiếp xúc nguồn nhiệt và làm mát sớm. Cần bảo vệ da sau khi làm mát và đánh giá mức độ bỏng.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu bỏng rộng, sâu, bỏng mặt/cổ hoặc gây khó thở; bỏng ở tay, chân, khớp hay vùng sinh dục cũng cần được khám khẩn.

**Các bước xử trí:**
1. **Ngừng tiếp xúc nguồn nhiệt**: Đưa nạn nhân ra khỏi nguồn nhiệt một cách an toàn; nếu quần áo cháy, dập lửa bằng nước hoặc cho nằm xuống và lăn.
2. **Làm mát 20 phút**: Cho vùng bỏng dưới nước mát chảy khoảng 20 phút. Giữ ấm phần cơ thể còn lại, đặc biệt ở trẻ em hoặc khi bỏng rộng.
3. **Bỏ đồ không dính vết thương**: Tháo trang sức và quần áo gần vùng bỏng trước khi sưng, nhưng để nguyên phần đã dính vào da.
4. **Che phủ và đánh giá**: Sau khi làm mát, phủ lỏng bằng màng bọc thực phẩm sạch hoặc gạc sạch không dính; không quấn chặt. Đưa đi khám nếu bỏng rộng, sâu hoặc ở vị trí nhạy cảm.

**Nên làm:**
- Làm mát vùng bỏng bằng nước mát chảy khoảng 20 phút.
- Tháo trang sức gần vùng bỏng nếu chưa dính da.
- Che phủ lỏng bằng vật liệu sạch sau khi làm mát.

**Cần tránh:**
- Không nên chườm đá trực tiếp lên vết bỏng.
- Không nên bóc quần áo đã dính vào vùng da bỏng.
- Không nên bôi kem đánh răng, dầu, bơ hay tự chọc vỡ bóng nước.

---

#### 9. Sơ cứu khi bị bỏng hóa chất
- **Mã chủ đề:** `bong-hoa-chat`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Khẩn cấp
- **Thời gian đọc:** 1 phút
- **Nguồn đối chiếu:** Tham khảo nguồn y tế, chưa thẩm định lâm sàng
- **Tóm tắt:** Bảo vệ người cứu, loại bỏ hóa chất, xả nước liên tục và đưa nạn nhân đi cấp cứu.

**Tổng quan:**  
Hóa chất có thể tiếp tục gây tổn thương khi còn bám trên da hoặc trong mắt. Cần ngừng phơi nhiễm ngay và nhờ nhân viên y tế đánh giá.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu hóa chất dính vào da hoặc mắt, đặc biệt khi bỏng rộng, đau tăng, khó thở hoặc không rõ loại hóa chất.

**Các bước xử trí:**
1. **Bảo vệ người cứu và gọi 115**: Tránh chạm trực tiếp vào hóa chất; đeo găng nếu có, rời khỏi vùng phơi nhiễm và gọi cấp cứu.
2. **Loại bỏ đồ nhiễm hóa chất**: Cởi quần áo, trang sức bị nhiễm hóa chất nếu làm được an toàn. Với bột hóa chất khô, nhẹ nhàng phủi bột khỏi da trước khi xả nước.
3. **Xả nước liên tục**: Rửa vùng bị ảnh hưởng bằng thật nhiều nước mát hoặc ấm chảy liên tục ít nhất 20 phút; tiếp tục theo hướng dẫn của 115. Nếu dính mắt, tiếp tục rửa mắt cho đến khi nhân viên y tế tiếp nhận.
4. **Theo dõi và chuyển viện**: Theo dõi hô hấp, mức tỉnh táo và đưa nạn nhân đến cơ sở y tế. Mang theo nhãn hoặc tên hóa chất nếu có, không để hóa chất tiếp tục tiếp xúc với người cứu.

**Nên làm:**
- Đeo găng và tránh phơi nhiễm cho người cứu.
- Loại bỏ quần áo nhiễm hóa chất và phủi bột khô trước khi xả.
- Xả nước nhiều, liên tục và đưa nạn nhân đi đánh giá y tế.

**Cần tránh:**
- Không nên dùng hóa chất khác để cố trung hòa vết bỏng.
- Không nên bôi kem, dầu hoặc thuốc lên vùng bỏng khi chờ cấp cứu.
- Không nên chạm tay trần vào quần áo hoặc da còn dính hóa chất.

---

#### 10. Cách sơ cứu ngộ độc thực phẩm: Lưu ý quan trọng khi thực hiện
- **Mã chủ đề:** `ngo-doc-thuc-pham`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 1 phút
- **Nguồn đối chiếu:** Tham khảo nguồn y tế, chưa thẩm định lâm sàng
- **Tóm tắt:** Bù nước an toàn, theo dõi dấu hiệu mất nước và nhận biết khi cần khám cấp cứu.

**Tổng quan:**  
Ngộ độc thực phẩm có thể gây nôn, tiêu chảy và mất nước. Mục tiêu ban đầu là bù dịch an toàn, theo dõi dấu hiệu nặng và tìm hỗ trợ y tế khi cần.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu người bệnh bất tỉnh, co giật hoặc khó thở. Đi khám sớm nếu đi ngoài ra máu, sốt cao, nôn không giữ được nước hoặc có dấu hiệu mất nước.

**Các bước xử trí:**
1. **Đánh giá mức độ nặng**: Kiểm tra mức tỉnh táo, nhịp thở, số lần nôn và tiêu chảy. Nếu bất tỉnh, co giật hoặc khó thở, gọi 115.
2. **Bù nước từng ngụm nhỏ**: Nếu tỉnh táo và nuốt được, cho uống nước từng ngụm nhỏ thường xuyên. Khi tiêu chảy nhiều, ưu tiên dung dịch bù nước đường uống pha đúng hướng dẫn.
3. **Theo dõi mất nước**: Chú ý khô miệng, tiểu ít, chóng mặt khi đứng, mệt lả; trẻ nhỏ có thể ít nước mắt hoặc lừ đừ.
4. **Đi khám khi có dấu hiệu nặng**: Liên hệ cơ sở y tế nếu phân có máu, sốt cao, nôn không giữ được nước, tiêu chảy kéo dài hoặc có dấu hiệu mất nước. Ghi lại thực phẩm đã ăn để báo nhân viên y tế.

**Nên làm:**
- Cho người tỉnh táo uống nước thành nhiều ngụm nhỏ.
- Pha dung dịch bù nước đường uống đúng hướng dẫn nếu cần.
- Theo dõi dấu hiệu mất nước và đi khám khi có triệu chứng nặng.

**Cần tránh:**
- Không nên tự gây nôn hoặc kích thích họng để nôn.
- Không nên ép người bất tỉnh hoặc khó nuốt uống nước.
- Không nên tự dùng thuốc cầm tiêu chảy khi sốt cao hoặc đi ngoài ra máu nếu chưa có chỉ dẫn y tế.

---

#### 11. Cách sơ cứu người bị điện giật sao cho đúng chuẩn và an toàn?
- **Mã chủ đề:** `dien-giat`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Khẩn cấp
- **Thời gian đọc:** 1 phút
- **Nguồn đối chiếu:** Tham khảo nguồn y tế, chưa thẩm định lâm sàng
- **Tóm tắt:** Ngắt nguồn điện an toàn, gọi cấp cứu, kiểm tra hô hấp và chăm sóc bỏng điện.

**Tổng quan:**  
Điện giật có thể gây rối loạn tim hoặc ngừng thở dù vết bỏng ngoài da nhỏ. Người cứu phải thường dễ nguồn điện đã được ngắt trước khi tiếp cận.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu nạn nhân bất tỉnh, thở bất thường, đau ngực, bỏng nặng hoặc liên quan điện cao thế. Người bị điện giật cần được nhân viên y tế đánh giá.

**Các bước xử trí:**
1. **Cắt điện và giữ an toàn**: Ngắt điện ở công tắc hoặc cầu dao trước khi chạm vào nạn nhân. Với điện cao thế hoặc nguồn chưa an toàn, không tiếp cận, gọi 115 và lực lượng chuyên trách.
2. **Gọi 115 và kiểm tra nạn nhân**: Khi đã an toàn, kiểm tra mức tỉnh táo và thở bình thường. Nhờ người gọi 115 và tìm AED.
3. **CPR nếu ngừng thở bình thường**: Nếu nạn nhân không đáp ứng và không thở hoặc chỉ thở ngáp, bắt đầu CPR theo hướng dẫn 115; dùng AED ngay khi có.
4. **Chăm sóc bỏng và theo dõi**: Nếu có vết bỏng, làm mát bằng nước mát sạch chảy khi đã thường dễ không còn điện. Theo dõi thay đổi hô hấp, tri giác và đưa đi đánh giá y tế.

**Nên làm:**
- Ngắt nguồn điện trước khi chạm vào nạn nhân.
- Gọi 115, theo dõi thở và bắt đầu CPR nếu ngừng thở bình thường.
- Đưa người bị điện giật đi đánh giá y tế dù vết bỏng nhỏ.

**Cần tránh:**
- Không nên chạm trực tiếp vào nạn nhân khi còn nối với nguồn điện.
- Không nên tiếp cận dây điện cao thế hoặc khu vực chưa được xác nhận an toàn.
- Không nên đánh giá mức độ tổn thương chỉ theo vết bỏng ngoài da.

---

#### 12. Sơ cứu chảy máu (cầm máu): Những điều cần biết
- **Mã chủ đề:** `chay-mau-va-cam-mau`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Khẩn cấp
- **Thời gian đọc:** 1 phút
- **Nguồn đối chiếu:** Tham khảo nguồn y tế, chưa thẩm định lâm sàng
- **Tóm tắt:** Ép trực tiếp để cầm máu, gọi 115 khi chảy máu nặng và dùng ga-rô khi phù hợp.

**Tổng quan:**  
Chảy máu nhiều có thể gây sốc nhanh. Ưu tiên ép trực tiếp vào nguồn chảy máu và gọi cấp cứu; ga-rô dành cho chảy máu đe dọa tính mạng ở tay hoặc chân.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu máu chảy nhiều liên tục hoặc phun tia, không cầm được bằng ép trực tiếp, hay nạn nhân tái lạnh, lơ mơ, thở nhanh.

**Các bước xử trí:**
1. **Đánh giá an toàn và gọi hỗ trợ**: Đeo găng hoặc dùng vật chắn nếu có. Gọi 115 ngay với chảy máu nặng; tìm vị trí chảy máu.
2. **Ép trực tiếp lên vết thương**: Đặt gạc hoặc vải sạch lên nguồn chảy máu và ép mạnh liên tục. Nếu có vật cắm sâu, không rút ra; ép quanh vật.
3. **Ga-rô khi chảy máu chi đe dọa tính mạng**: Nếu chảy máu dữ dội ở tay hoặc chân và đã được hướng dẫn sử dụng ga-rô, đặt ga-rô phía trên vết thương, tránh khớp; siết đến khi máu ngừng chảy và ghi giờ đặt.
4. **Theo dõi trong khi chờ cấp cứu**: Tiếp tục ép nếu chưa cầm máu. Giữ ấm, theo dõi hô hấp và mức tỉnh táo, báo cho nhân viên y tế những gì đã làm.

**Nên làm:**
- Ép mạnh trực tiếp lên nguồn chảy máu bằng gạc hoặc vải sạch.
- Gọi 115 ngay nếu máu chảy dữ dội hoặc có dấu hiệu sốc.
- Ghi giờ đặt ga-rô và báo lại cho nhân viên y tế nếu đã dùng.

**Cần tránh:**
- Không nên rút vật cắm sâu ra khỏi vết thương.
- Không nên tháo lớp gạc đầu tiên đang tiếp xúc trực tiếp vết thương khi máu thấm qua.
- Không nên tự nới hoặc tháo ga-rô sau khi đã đặt; việc đó để nhân viên y tế thực hiện.

---

#### 13. Sơ cứu khi bị gãy xương: Đừng cố di chuyển người bệnh
- **Mã chủ đề:** `gay-xuong`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Khẩn cấp
- **Thời gian đọc:** 1 phút
- **Nguồn đối chiếu:** Tham khảo nguồn y tế, chưa thẩm định lâm sàng
- **Tóm tắt:** Giữ yên vùng nghi gãy, xử trí chảy máu và nhận biết dấu hiệu cần gọi cấp cứu.

**Tổng quan:**  
Gãy xương có thể kín hoặc hở; di chuyển hoặc nắn chỉnh sai có thể làm tổn thương thêm. Ưu tiên giữ yên vùng bị thương và đánh giá dấu hiệu nặng.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu xương lòi ra ngoài, chi biến dạng nhiều, chảy máu nặng, tê/lạnh phía dưới chỗ gãy, hoặc nghi chấn thương đầu, cổ, lưng, hông.

**Các bước xử trí:**
1. **Đánh giá tình trạng và gọi hỗ trợ**: Kiểm tra hiện trường, hô hấp, chảy máu và dấu hiệu sốc. Gọi 115 nếu có gãy xương hở, biến dạng nặng hoặc nghi tổn thương đầu/cột sống.
2. **Giữ yên vùng nghi gãy**: Giúp nạn nhân nằm hoặc ngồi yên ở tư thế đang có. Đỡ chi bị thương bằng khăn hay đệm mềm; không cố nắn xương về vị trí cũ.
3. **Xử trí chảy máu và giảm sưng**: Dùng gạc sạch ép quanh vết thương nếu chảy máu, tránh đè trực tiếp lên xương nhô ra. Với chấn thương kín, có thể chườm lạnh qua khăn cao nhất có thể 20 phút nếu người bệnh chịu được.
4. **Theo dõi và chờ nhân viên y tế**: Theo dõi màu sắc, cảm giác phía dưới chỗ gãy và mức tỉnh táo. Giữ ấm, hạn chế di chuyển; đặc biệt không tự di chuyển nếu nghi chấn thương cột sống.

**Nên làm:**
- Giữ yên vùng nghi gãy và đỡ ở tư thế đang có.
- Gọi 115 khi có gãy xương hở, biến dạng nặng hoặc nghi chấn thương cột sống.
- Theo dõi cảm giác, màu da phía dưới vùng chấn thương.

**Cần tránh:**
- Không nên cố duỗi thẳng hoặc nắn lại chi biến dạng.
- Không nên đẩy xương lòi ra vào trong hoặc ép trực tiếp lên đầu xương.
- Không nên tự di chuyển người nghi chấn thương cổ hoặc cột sống trừ khi nơi đó không an toàn.

---

#### 14. Xử trí bong gân cổ tay, cổ chân theo nguyên tắc R.I.C.E
- **Mã chủ đề:** `bi-bong-gan-co-tay-co-chan-phai`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Cơ bản, theo dõi thêm
- **Thời gian đọc:** 4 phút
- **Nguồn đối chiếu:** Tham khảo: www.vinmec.com
- **Tóm tắt:** Bị bong gân nên làm gì là câu hỏi mà nhiều người đặc biệt quan tâm, nếu như không có cách xử lý hiệu quả có thể dẫn đến tình trạng nghiêm trọng hơn.

**Tổng quan:**  
Bong gân là tình trạng giãn hoặc rách dây chằng quanh khớp do vận động quá mức hoặc vấp ngã. Việc áp dụng nguyên tắc R.I.C.E thường được khuyến cáo để giảm đau, hạn chế sưng nề ban đầu.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> Nên đưa đến cơ sở y tế thăm khám nếu nhận thấy khớp biến dạng, không thể chịu lực hoặc đau nhức nhiều nghi ngờ có gãy xương kèm theo.

**Các bước xử trí:**
1. **Rest (nghỉ ngơi)**: Ngừng các hoạt động thể lực, hạn chế đi lại hoặc cử động khớp đang bị tổn thương.
2. **Ice (chườm lạnh)**: Bọc đá lạnh trong khăn vải mềm và chườm lên vùng khớp khoảng 15-20 phút mỗi lần, cách 2-3 giờ trong 48 giờ đầu để hỗ trợ giảm sưng đau.
3. **Compression (băng ép nhẹ)**: Dùng băng thun quấn nhẹ nhàng quanh khớp để hỗ trợ cố định, tránh quấn quá chặt gây tê hoặc tím đầu ngón.
4. **Elevation (nâng cao chi)**: Kê khớp bị thương cao hơn mức tim khi nghỉ ngơi để hỗ trợ lưu thông tuần hoàn và giảm phù nề.

**Nên làm:**
- Áp dụng 4 bước R.I.C.E trong 48 giờ đầu sau chấn thương.
- Luôn bọc đá qua lớp khăn vải để tránh gây bỏng lạnh cho da.
- Thăm khám bác sĩ để đánh giá mức độ tổn thương dây chằng hoặc loại trừ gãy xương.

**Cần tránh:**
- Tránh xoa bóp dầu nóng, rượu thuốc hoặc ngâm nước nóng ngay sau chấn thương vì có thể làm tăng sưng nề.
- Tránh tự ý nắn chỉnh hoặc kéo giật khớp bị thương.
- Không nên vận động mạnh trở lại khi khớp chưa hồi phục ổn định.

---

#### 15. Sơ cứu chảy máu cam
- **Mã chủ đề:** `so-cuu-chay-mau-cam`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 3 phút
- **Nguồn đối chiếu:** Chuẩn Y khoa tham chiếu từ Vinmec
- **Tóm tắt:** Mao mạch niêm mạc mũi bị vỡ do thời tiết hanh khô hoặc chấn thương. Cần ngồi thẳng, hơi cúi đầu về phía trước, bóp chặt cánh mũi 10-15 phút để cầm máu.

**Tổng quan:**  
Mao mạch niêm mạc mũi bị vỡ do thời tiết hanh khô, ngoáy mũi hoặc chấn thương. Cần cho nạn nhân ngồi thẳng, hơi cúi đầu về phía trước, bóp chặt cánh mũi 10-15 phút và thở bằng miệng. không nên ngửa cổ ra sau.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 HOẶC ĐẾN BỆNH VIỆN NGAY nếu chảy máu mũi kéo dài trên 30 phút không cầm, nạn nhân ngất xỉu, choáng váng hoặc chảy máu sau tai nạn chấn thương vùng đầu mặt.

**Các bước xử trí:**
1. **Ngồi thẳng và cúi nhẹ đầu về phía trước**: Cho nạn nhân ngồi thẳng lưng, đầu hơi cúi về phía trước. Ở tư thế này áp lực máu giảm, tránh máu chảy ngược xuống họng gây sặc vào khí quản hoặc nôn.
2. **Bóp chặt hai cánh mũi trong 10 đến 15 phút**: Dùng ngón cái và ngón trỏ bóp chặt hai bên cánh mũi mềm, thở đều bằng miệng liên tục từ 10 đến 15 phút để tạo áp lực cầm máu.
3. **Kiểm tra và xử trí lặp lại**: Sau 15 phút từ từ buông tay ra. Nếu máu còn chảy, nhắc lại thao tác bóp mũi thêm 10-15 phút. Nếu vẫn không cầm được máu, đưa ngay đến cơ sở y tế.

**Nên làm:**
- Ngồi hơi cúi người về phía trước để máu chảy ra ngoài lỗ mũi.
- Dùng ngón cái và ngón trỏ bóp chặt hai cánh mũi mềm liên tục trong 10-15 phút.
- Thở đều bằng miệng trong lúc bóp mũi.
- Giữ phần đầu cao hơn ngực trong vài giờ sau khi máu đã cầm.

**Cần tránh:**
- Khuyến cáo tránh ngửa cổ ra sau (tránh máu chảy xuống họng gây sặc khí quản hoặc kích thích nôn).
- Không nên ngoáy mũi, không xì mũi mạnh và không cúi gập người trong vài giờ sau sơ cứu.
- Không nên nhét khăn giấy bẩn hay bông gòn thô ráp sâu vào hốc mũi.

**Tài liệu tham khảo:**
- Vinmec (Truy cập: 16/09/2026): https://www.vinmec.com/vie/bai-viet/so-cuu-dung-khi-bi-chay-mau-cam-vi
- Nguồn đối chiếu 2 (Truy cập: 16/09/2026): https://tamanhhospital.vn/so-cuu-chay-mau-cam/

---

#### 16. Nguyên tắc sơ cấp cứu và kế hoạch thực hiện
- **Mã chủ đề:** `nguyen-tac-so-cap-cuu-va-ke-hoach-thuc-hien`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 4 phút
- **Nguồn đối chiếu:** Chuẩn Y khoa tham chiếu từ Vinmec
- **Tóm tắt:** 04 nguyên tắc chính: Giữ bình tĩnh và an toàn, kiểm soát tình huống, làm sơ cấp cứu ban đầu, và làm theo từng bước (nhận định - lập kế hoạch - thực hiện - đánh giá).

**Tổng quan:**  
Có 04 nguyên tắc sơ cấp cứu chính cần tuân thủ: Giữ bình tĩnh và an toàn, kiểm soát tình huống, làm sơ cứu ban đầu, và làm theo từng bước. Kế hoạch thực hiện gồm 4 bước cơ bản: Nhận định, lập kế hoạch, thực hiện và đánh giá để tránh bỏ sót thông tin quan trọng.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu hiện trường có nguy cơ tai nạn liên hoàn, cháy nổ hoặc nạn nhân bất tỉnh, ngừng thở, mất máu nhiều đe dọa trực tiếp tính mạng.

**Các bước xử trí:**
1. **Nhận định**: Nhận định về tình huống để thường dễ môi trường đã an toàn cho bạn và nạn nhân. Nhận định về tình trạng của nạn nhân để xác định loại sơ cấp cứu cần thiết nhất.
2. **Lập kế hoạch**: Bạn cần phải có kế hoạch hành động. Nếu cần, hãy lập kế hoạch để gọi hỗ trợ từ bên ngoài (cấp cứu 115, bệnh viện) hoặc gọi trợ giúp từ những người xung quanh.
3. **Thực hiện**: Thực hiện kế hoạch của bạn đã lập ra. Sơ cấp cứu ngay lập tức nếu cần thiết hoặc sơ cấp cứu dựa trên mức độ ưu tiên của chấn thương đã được đánh giá.
4. **Đánh giá**: Đánh giá lại các hành động sơ cấp cứu của bạn. Đảm bảo hiện trường tiếp tục an toàn. Tiếp tục nhận định tình trạng của nạn nhân để xem có sự thay đổi hay không.

**Nên làm:**
- Giữ bình tĩnh và không mạo hiểm với sự an toàn của chính bạn, của nạn nhân hoặc của những người xung quanh.
- Kiểm soát tình huống để thường dễ hiện trường là an toàn.
- Làm sơ cấp cứu ban đầu (bảo toàn tính mạng và thúc đẩy sự hồi phục).
- Làm theo từng bước, để tránh thiếu sót, tránh bị choáng ngợp do lo lắng, tránh bỏ sót các thông tin quan trọng.

**Cần tránh:**
- Không nên mạo hiểm lao vào hiện trường nguy hiểm (điện hở, cháy nổ, khí độc).
- Không nên di chuyển bệnh nhân nếu có nghi ngờ chấn thương cột sống.
- Không nên tập trung vào một nạn nhân không đe dọa tính mạng mà bỏ quên người chấn thương nặng khác (nếu có nhiều nạn nhân).

**Tài liệu tham khảo:**
- Vinmec (Truy cập: 16/09/2026): https://www.vinmec.com/vie/bai-viet/nguyen-tac-so-cap-cuu-va-ke-hoach-thuc-hien-vi
- Nguồn đối chiếu 2 (Truy cập: 16/09/2026): https://tramytep10q10.medinet.gov.vn/chuyen-muc/huong-dan-so-cap-cuu-ban-dau-cmobile3091-154422.aspx

---

#### 17. Sơ cấp cứu bỏng ở trẻ em
- **Mã chủ đề:** `so-cap-cuu-bong-o-tre-em`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Khẩn cấp
- **Thời gian đọc:** 4 phút
- **Nguồn đối chiếu:** Chuẩn Y khoa tham chiếu từ Vinmec
- **Tóm tắt:** Bỏng nước sôi, thức ăn nóng, lửa ở trẻ em. Cần ngâm/xả ngay vùng bỏng dưới nước sạch mát 15-20 phút, băng gạc sạch và đưa ngay đến cơ sở y tế gần nhất.

**Tổng quan:**  
Da trẻ mỏng và nhạy cảm nên bỏng nước sôi, thức ăn nóng, lửa dễ ăn sâu gây sốc bỏng và nhiễm trùng. Cần ngâm/xả ngay vùng bỏng dưới nước sạch mát 15-20 phút, giữ sạch bằng gạc và đưa đi viện. không nên bôi mỡ trăn, kem đánh răng.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> ĐƯA TRẺ ĐẾN BỆNH VIỆN NGAY nếu vết bỏng có diện tích rộng (toàn bộ lưng, ngực, bụng hoặc một chi), bỏng ở mặt, vùng kín, bỏng từ độ 2 trở lên hoặc trẻ có biểu hiện sốc, hoảng loạn.

**Các bước xử trí:**
1. **Loại bỏ tác nhân gây bỏng và đưa trẻ ra nơi an toàn**: Nhanh chóng cách ly trẻ khỏi nguồn nhiệt. Cởi bỏ nhẹ nhàng quần áo dính chất lỏng nóng (nếu quần áo dính chặt vào da, đặc biệt tránh cố lột mà hãy dùng kéo cắt bỏ xung quanh).
2. **Ngâm xả nước mát sạch từ 15 đến 20 phút**: Ngâm ngay phần bị bỏng vào nước sạch mát hoặc xả nhẹ dưới vòi nước chảy (nhiệt độ 15 - 20°C) trong 15-20 phút để giảm độ sâu bỏng, giảm đau và phù nề.
3. **Bảo vệ vết bỏng bằng gạc sạch vô khuẩn**: Giữ vết bỏng sạch, băng nhẹ bằng gạc vô trùng để giảm đau tại chỗ. không nên bôi thuốc lạ hay hóa chất lên vết bỏng.
4. **Bù nước, phòng chống sốc bỏng và chuyển viện**: Cho trẻ bú hoặc uống nhiều nước đường pha chút muối/Oresol để phòng sốc. Bế đầu cao nghiêng một bên tránh trào ngược. Nhanh chóng đưa trẻ đến cơ sở y tế gần nhất.

**Nên làm:**
- Ngâm ngay vùng bỏng vào nước sạch mát trong 15-20 phút đầu.
- Cho trẻ uống bù nước đường pha muối hoặc dung dịch Oresol.
- Động viên an ủi để trẻ không bị hoảng loạn tinh thần.

**Cần tránh:**
- Khuyến cáo tránh bôi kem đánh răng, kem trị bỏng, mỡ trăn hay thuốc lạ lên vết bỏng của trẻ.
- Khuyến cáo tránh ngâm nước đá quá lạnh (gây bỏng lạnh và hạ thân nhiệt ở trẻ).
- Không nên chọc vỡ các bóng phỏng rộp của da.
- Không nên cố lột giật quần áo dính chặt vào vết bỏng.

**Tài liệu tham khảo:**
- Vinmec (Truy cập: 16/09/2026): https://www.vinmec.com/vie/bai-viet/so-cap-cuu-bong-o-tre-em-vi
- Nguồn đối chiếu 2 (Truy cập: 16/09/2026): https://tamanhhospital.vn/so-cuu-tre-bi-bong/
- Vinmec - Sơ cứu bỏng lửa, nước sôi (Truy cập: 16/09/2026): https://www.vinmec.com/vie/bai-viet/so-cuu-khi-bi-bong-lua-bong-nuoc-soi-vi
- Vinmec - Các bước sơ cứu ban đầu trẻ bị bỏng (Truy cập: 16/09/2026): https://www.vinmec.com/vie/bai-viet/cac-buoc-so-cuu-ban-dau-tre-bi-bong-vi

---

#### 18. Sơ cứu và bảo quản chi bị đứt lìa trong cấp cứu
- **Mã chủ đề:** `so-cuu-va-bao-quan-chi-bi-dut-lia-trong-cap-cuu`
- **Phân loại:** Tai nạn sinh hoạt gia đình
- **Mức độ:** Rất khẩn cấp (cần xử trí ngay)
- **Thời gian đọc:** 5 phút
- **Nguồn đối chiếu:** Chuẩn Y khoa tham chiếu từ Vinmec
- **Tóm tắt:** Tai nạn khiến chi bị đứt rời tối khẩn cấp. Cần sơ cứu cầm máu cho nạn nhân và bảo quản chi đứt rời trong túi kín đặt vào thùng đá lạnh gián tiếp.

**Tổng quan:**  
Tai nạn khiến chi bị đứt rời là tình trạng tối khẩn cấp. Sơ cứu cầm máu cho nạn nhân và bảo quản phần chi đứt rời đúng kỹ thuật (bọc túi sạch, đặt trong xô đá lạnh gián tiếp) quyết định khả năng vi phẫu nối lại chi.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC! Vừa cầm máu tính mạng cho nạn nhân vừa bảo quản đúng cách phần chi đứt rời trong môi trường lạnh gián tiếp để kịp thời gian vàng vi phẫu ghép nối (trong vòng 6 giờ).

**Các bước xử trí:**
1. **Bảo đảm đường thở và kiểm tra sinh hiệu**: Bảo đảm đường thở luôn thông thoáng, không bị tắc nghẹt. Nếu bệnh nhân ngừng tuần hoàn hô hấp thì làm hồi sinh tim phổi (CPR) ngay lập tức.
2. **Cầm máu mỏm cụt cho nạn nhân trước tiên**: Rửa vết thương bằng nước muối sinh lý hoặc nước sạch rồi băng kín. Băng ép mỏm cụt để cầm máu; nếu đứt lìa bàn tay, bàn chân hoặc băng ép không cầm máu được thì làm đặt garo cách mỏm cụt 10cm và ghi nhận thời điểm.
3. **Rửa nhẹ và bọc gạc ẩm phần chi đứt rời**: Cầm nắm nhẹ nhàng, rửa sạch phần chi bị đứt bằng nước muối sinh lý vô khuẩn hoặc nước sạch (đặc biệt tránh dùng xà phòng hay hóa chất). Làm ẩm gạc vô khuẩn bằng nước muối sinh lý rồi bọc kín phần chi đứt (chú ý không bọc quá dày).
4. **Bảo quản gián tiếp trong túi kín và thùng đá lạnh**: Đặt phần chi đã bọc gạc vào túi nilon sạch, cột kín lại để nước không thấm vào. Đặt túi nilon vào một thùng đá lạnh hoặc chậu nước đá (đặc biệt tránh để chi tiếp xúc trực tiếp với đá).
5. **Vận chuyển khẩn cấp nạn nhân và chi thể đến bệnh viện**: Nhanh chóng vận chuyển bệnh nhân và phần chi đứt lìa đến bệnh viện có đủ khả năng thực hiện phẫu thuật vi phẫu ghép chi.

**Nên làm:**
- Ưu tiên cầm máu tính mạng cho nạn nhân trước tiên.
- Cầm nắm nhẹ nhàng và rửa phần chi bằng nước muối sinh lý sạch.
- Bọc chi trong gạc ẩm, cho vào túi nilon kín rồi mới đặt vào thùng đá lạnh (bảo quản gián tiếp).
- Nếu chi chưa đứt lìa hoàn toàn thì giữ nguyên không cắt rời.

**Cần tránh:**
- Khuyến cáo tránh để chi thể tiếp xúc trực tiếp với đá lạnh (nhiệt độ quá lạnh sẽ làm chết mô vi phẫu).
- Khuyến cáo tránh dùng xà phòng, cồn hay hóa chất để rửa phần chi đứt.
- Không nên tự ý cắt rời phần chi nếu nó vẫn còn dính lại một phần trên da.

**Tài liệu tham khảo:**
- Vinmec (Truy cập: 16/09/2026): https://www.vinmec.com/vie/bai-viet/so-cuu-va-bao-quan-chi-bi-dut-lia-trong-cap-cuu-vi
- Nguồn đối chiếu 2 (Truy cập: 16/09/2026): https://nhathuoclongchau.com.vn/bai-viet/cach-so-cuu-va-bao-quan-chi-the-dut-roi.html

---

### 4.3. Nhóm 3: Bệnh lý cấp tính
*Số lượng: 8 chủ đề*

#### 19. Hồi sinh tim phổi (CPR) & sử dụng máy sốc điện tự động AED
- **Mã chủ đề:** `ngung-tuan-hoan-cpr`
- **Phân loại:** Bệnh lý cấp tính
- **Mức độ:** Rất khẩn cấp (cần xử trí ngay)
- **Thời gian đọc:** 5 phút
- **Nguồn đối chiếu:** Phác đồ Quốc tế AHA & ERC 2025
- **Tóm tắt:** Hướng dẫn thực hiện hồi sinh tim phổi (CPR) kết hợp hơi thở nhân tạo đúng nhịp độ.

**Tổng quan:**  
Khi tim ngừng đập, dòng máu nuôi dưỡng não bộ ngưng trệ ngay lập tức. Mỗi phút trôi qua không có CPR làm giảm 10% cơ hội sống sót của nạn nhân.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> HÔ TO GỌI NGƯỜI HỖ TRỢ, GỌI 115 VÀ TÌM MÁY AED NGAY LẬP TỨC. Bắt đầu ép tim ngay không được chậm trễ.

**Các bước xử trí:**
1. **Kiểm tra hiện trường và phản xạ nạn nhân**: Đảm bảo hiện trường xung quanh an toàn. Vỗ mạnh hai vai nạn nhân và gọi to: 'Anh/chị có sao không? '. Quan sát lồng ngực trong 5-10 giây xem có thở bình thường không (thở ngáp cá được coi là không thở).
2. **Kích hoạt hệ thống cấp cứu 115 và tìm máy AED**: Chỉ định rõ một người xung quanh: 'Anh áo xanh gọi 115 và tìm máy sốc điện AED gần đây mang lại đây! '. Nếu chỉ có một mình, bật loa ngoài điện thoại gọi 115 và bắt đầu ép tim ngay.
3. **Ép tim đúng vị trí và tần số chuẩn 100-120 lần/phút**: Đặt gót bàn tay vào nửa dưới xương ức (chính giữa ngực). Bàn tay kia lồng lên trên, các ngón đan vào nhau. Hai cánh tay thẳng vuông góc với ngực nạn nhân. Dùng trọng lượng nửa thân trên ép lún sâu 5 - 6 cm, để ngực nở hoàn toàn sau mỗi lần ép.
4. **Thổi ngạt (30 ép tim: 2 thổi ngạt)**: Sau 30 lần ép tim, ngửa đầu nâng cằm nạn nhân, kẹp mũi và thổi ngạt 2 hơi liên tiếp (mỗi hơi 1 giây, thấy ngực phồng lên). Nếu không quen hoặc không có màng che bảo vệ: Tiếp tục ÉP TIM LIÊN TỤC không nên DỪNG (hands-only CPR).
5. **Bật máy AED ngay khi có sẵn**: Bật nguồn máy AED và làm theo hướng dẫn giọng nói phát ra từ máy. Dán hai miếng điện cực theo hình vẽ. Đảm bảo không nên AI CHẠM vào nạn nhân khi máy phân tích nhịp tim hoặc giật điện.

**Nên làm:**
- Ép tim nhanh và mạnh: tần số 100 - 120 nhịp/phút (nhịp bài hát stayin' alive).
- Ép đủ độ sâu (5 - 6 cm đối với người lớn) và để ngực nở lại hoàn toàn.
- Đổi người ép tim mỗi 2 phút để tránh mỏi tay làm giảm chất lượng ép.

**Cần tránh:**
- Không nên tì đè liên tục lên ngực mà không để lồng ngực nở về vị trí cũ.
- Không nên dừng ép tim quá 10 giây giữa các chu kỳ.
- Không nên chạm vào nạn nhân khi máy AED đang phóng điện sốc tim.

---

#### 20. Xử trí cơn co giật & cơn động kinh cấp tính
- **Mã chủ đề:** `co-giat-dong-kinh`
- **Phân loại:** Bệnh lý cấp tính
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 4 phút
- **Nguồn đối chiếu:** Hiệp hội Động kinh Quốc tế (ILAE)
- **Tóm tắt:** Bảo vệ nạn nhân khỏi chấn thương trong cơn co giật, tư thế phục hồi sau khi tỉnh.

**Tổng quan:**  
Co giật là tình trạng phóng điện đột ngột và bất thường của các tế bào não bộ. Đa số các cơn co giật tự ngừng sau 1-3 phút. Vai trò chính của người sơ cứu là BẢO VỆ NẠN NHÂN TRÁNH CHẤN THƯƠNG.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu cơn co giật kéo dài trên 5 phút, hoặc co giật tái diễn liên tiếp mà nạn nhân chưa kịp tỉnh lại.

**Các bước xử trí:**
1. **Bảo vệ đầu và dọn dẹp vật sắc nhọn xung quanh**: Đỡ nhẹ nạn nhân nằm xuống sàn phẳng an toàn. Kê gối mềm hoặc áo gấp dưới đầu để tránh chấn thương sọ não do đập đầu. Dời xa các vật cứng, sắc nhọn, bàn ghế xung quanh.
2. **Nới lỏng trang phục và bấm giờ cơn giật**: Nới lỏng cà vạt, cúc cổ áo, thắt lưng để nạn nhân dễ thở. Nhìn đồng hồ bấm chính xác thời gian cơn giật diễn ra.
3. **Không nên kìm kẹp, không nên nhét bất cứ thứ gì vào miệng**: Để cơ thể nạn nhân co giật tự nhiên, không nên đè giữ chân tay (có thể gây gãy xương hoặc rách cơ). khuyến cáo tránh nhét khăn, đũa, ngón tay vào miệng nạn nhân.
4. **Đặt vào tư thế nằm nghiêng an toàn (tư thế hồi phục)**: Khi cơn co giật vừa dứt, nhẹ nhàng xoay toàn bộ cơ thể nạn nhân nằm nghiêng sang một bên. Tư thế này giúp đờm dãi, chất nôn chảy ra ngoài, tránh hít sặc và tránh tụt lưỡi bịt đường thở.

**Nên làm:**
- Kê vật mềm dưới đầu để tránh va đập sọ não.
- Ghi nhận chính xác thời gian bắt đầu và kết thúc cơn co giật.
- Xoay nạn nhân nằm nghiêng an toàn ngay khi cơn giật kết thúc.

**Cần tránh:**
- Khuyến cáo tránh nhét bất cứ vật gì (đũa, muỗng, chanh, ngón tay) vào miệng nạn nhân.
- Không nên ghì chặt hoặc cố định chân tay nạn nhân khi đang co giật.
- Không nên cho ăn, uống bất kỳ thứ gì cho đến khi nạn nhân hoàn toàn tỉnh táo.

---

#### 21. Đột quỵ có cứu được không? Yếu tố nào gây ảnh hưởng?
- **Mã chủ đề:** `dot-quy`
- **Phân loại:** Bệnh lý cấp tính
- **Mức độ:** Rất khẩn cấp (cần xử trí ngay)
- **Thời gian đọc:** 1 phút
- **Nguồn đối chiếu:** Tham khảo nguồn y tế, chưa thẩm định lâm sàng
- **Tóm tắt:** Nhận biết FAST, gọi 115 ngay và ghi thời điểm khởi phát triệu chứng đột quỵ.

**Tổng quan:**  
Đột quỵ có thể biểu hiện bằng méo mặt, yếu tay chân, nói khó, rối loạn thị giác hoặc mất thăng bằng đột ngột. Cấp cứu sớm giúp giảm nguy cơ tổn thương lâu dài.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC khi nghi đột quỵ: méo mặt, yếu một bên tay, nói khó, hoặc triệu chứng thần kinh xuất hiện đột ngột; gọi kể cả khi triệu chứng đã hết.

**Các bước xử trí:**
1. **Nhận biết dấu hiệu FAST**: Kiểm tra mặt có lệch không, hai tay có nâng đều không, lời nói có méo hoặc khó hiểu không. Chú ý thêm mất thăng bằng, nhìn mờ hoặc đau đầu dữ dội bất ngờ.
2. **Gọi 115 và ghi giờ khởi phát**: Gọi cấp cứu ngay. Ghi lại thời điểm triệu chứng bắt đầu hoặc lần cuối người bệnh còn bình thường để báo nhân viên y tế.
3. **Đặt người bệnh an toàn**: Để người bệnh nghỉ, trấn an và nới lỏng trang phục chật. Nếu lơ mơ, chảy dãi hoặc khó nuốt nhưng vẫn thở, đặt nằm nghiêng an toàn nếu không nghi chấn thương cột sống.
4. **Theo dõi trong lúc chờ cấp cứu**: Theo dõi hô hấp và mức độ tỉnh táo. Nếu ngừng thở bình thường, bắt đầu CPR theo hướng dẫn của tổng đài.

**Nên làm:**
- Gọi 115 ngay khi nghi đột quỵ, kể cả khi dấu hiệu thoáng qua.
- Ghi giờ bắt đầu triệu chứng hoặc giờ cuối cùng còn bình thường.
- Ở lại, trấn an và theo dõi hô hấp, tri giác của người bệnh.

**Cần tránh:**
- Không nên chờ triệu chứng tự hết rồi mới gọi cấp cứu.
- Không nên cho ăn hoặc uống khi có nguy cơ khó nuốt, sặc.
- Không nên nhét đũa, khăn hay bất kỳ vật gì vào miệng nếu người bệnh co giật.

---

#### 22. Hồi sinh tim phổi cơ bản cho người lớn khi bị tai nạn
- **Mã chủ đề:** `hoi-sinh-tim-phoi-nguoi-lon`
- **Phân loại:** Bệnh lý cấp tính
- **Mức độ:** Rất khẩn cấp (cần xử trí ngay)
- **Thời gian đọc:** 1 phút
- **Nguồn đối chiếu:** Tham khảo nguồn y tế, chưa thẩm định lâm sàng
- **Tóm tắt:** Nhận biết ngừng tim, gọi 115, ép tim đúng nhịp và dùng AED sớm.

**Tổng quan:**  
Người lớn bất tỉnh và không thở bình thường hoặc chỉ thở ngáp cần được gọi cấp cứu và bắt đầu CPR ngay. AED nên dùng sớm khi có sẵn.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu người lớn không đáp ứng và không thở bình thường hoặc chỉ thở ngáp; yêu cầu người xung quanh mang AED.

**Các bước xử trí:**
1. **Kiểm tra an toàn, đáp ứng và thở**: Bảo đảm hiện trường an toàn, gọi to và vỗ vai. Quan sát thở bình thường trong cao nhất có thể 10 giây; thở ngáp không phải thở bình thường.
2. **Gọi 115 và lấy AED**: Nhờ người xung quanh gọi 115, lấy AED; nếu một mình, gọi trên loa ngoài để nhận hướng dẫn và bắt đầu CPR.
3. **Ép ngực 30 lần**: Đặt hai tay ở giữa ngực trên mặt phẳng cứng, ép sâu khoảng 5–6 cm với nhịp 100–120 lần/phút, để ngực nở lại hoàn toàn sau mỗi lần ép.
4. **Thổi ngạt nếu đã được học**: Nếu được huấn luyện và có thể thực hiện, sau 30 lần ép ngực thổi 2 hơi, mỗi hơi khoảng 1 giây để ngực nâng lên; tiếp tục 30:2. Nếu không thể thổi ngạt, ép ngực liên tục.
5. **Dùng AED và tiếp tục CPR**: Bật AED, dán điện cực theo hình trên máy và làm theo lời nhắc. Đảm bảo không ai chạm nạn nhân khi máy phân tích hoặc sốc điện; tiếp tục CPR khi máy yêu cầu.

**Nên làm:**
- Gọi 115 và bắt đầu ép ngực ngay khi không đáp ứng, không thở bình thường.
- Ép ngực 100–120 lần/phút, để ngực nở lại hoàn toàn.
- Dùng AED sớm và làm theo hướng dẫn của máy.

**Cần tránh:**
- Không nên trì hoãn ép ngực để cố tìm mạch nếu không được huấn luyện.
- Không nên ngừng ép ngực lâu quá 10 giây giữa các chu kỳ.
- Không nên chạm vào nạn nhân khi AED đang phân tích hoặc phát sốc.

---

#### 23. Sơ cấp cứu nghi ngờ chấn thương đầu và cột sống - tủy sống
- **Mã chủ đề:** `so-cap-cuu-chan-thuong-dau-va-tuy`
- **Phân loại:** Bệnh lý cấp tính
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 2 phút
- **Nguồn đối chiếu:** Tham khảo: www.vinmec.com
- **Tóm tắt:** Bài viết bởi bác sĩ chuyên khoa I Trịnh Ngọc Duy - bác sĩ cấp cứu - khoa cấp cứu - Bệnh viện đa khoa quốc tế Vinmec Times City

**Tổng quan:**  
Chấn thương đầu và cột sống cổ là những tổn thương nghiêm trọng, rất nguy hiểm đến tính mạng hoặc gây di chứng vận động lâu dài nếu việc sơ cứu và di chuyển không đúng kỹ thuật.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> Cần ưu tiên cố định cổ tại chỗ và gọi 115. Đặc biệt tránh bế xốc nách, cõng hoặc xoay vặn cổ nạn nhân.

**Các bước xử trí:**
1. **Hạn chế di chuyển và giữ thẳng trục đầu - cổ**: Giữ đầu và cổ nạn nhân thẳng hàng ở tư thế trung gian, tránh gập, ngửa hay xoay. Có thể dùng hai tay giữ nhẹ hai bên đầu hoặc chèn vật mềm hai bên tai.
2. **Kêu gọi hỗ trợ phối hợp nhiều người**: Nếu cần di chuyển khẩn cấp khỏi vùng nguy hiểm, nên có tối thiểu 3-4 người phối hợp theo kỹ thuật lật khối thống nhất (log-roll).
3. **Chuẩn bị cáng cứng phẳng**: Đặt cáng cứng (hoặc tấm ván phẳng) song song sát cạnh nạn nhân.
4. **Phối hợp đưa nạn nhân lên cáng**: Người giữ đầu điều phối nhịp để tất cả cùng lật nghiêng nạn nhân đồng thời theo một trục thẳng, trượt cáng vào dưới lưng và nhẹ nhàng hạ nạn nhân xuống.
5. **Cố định vào cáng và chuyển viện**: Cố định nhẹ nhàng vùng trán, ngực, hông vào cáng và chuyển đến cơ sở y tế có chuyên khoa chấn thương.

**Nên làm:**
- Duy trì trục thẳng đầu - cổ - thân mình trong suốt quá trình hỗ trợ.
- Thường xuyên quan sát đường thở, nhịp thở và mức độ tỉnh táo của nạn nhân.
- Nới lỏng trang phục chật và giữ ấm cơ thể cho nạn nhân trong khi chờ y tế.

**Cần tránh:**
- Tránh bế xốc nách, cõng hoặc ôm ngang người nạn nhân vì có nguy cơ làm tổn thương tủy sống nặng hơn.
- Tránh xoay hoặc gập đầu nạn nhân để kiểm tra vết thương vùng gáy.
- Không nên tự ý tháo mũ bảo hiểm của nạn nhân nếu chưa được tập huấn kỹ thuật cố định cổ hai người.

---

#### 24. Xử trí Hạ đường huyết ở người bệnh đái tháo đường
- **Mã chủ đề:** `xu-ly-ha-duong-huyet-o-nguoi-tieu`
- **Phân loại:** Bệnh lý cấp tính
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 4 phút
- **Nguồn đối chiếu:** Tham khảo: www.vinmec.com
- **Tóm tắt:** Hạ đường huyết là một trong những biến chứng hay gặp ở người bệnh đái tháo đường.

**Tổng quan:**  
Hạ đường huyết có thể xảy ra ở người bệnh đái tháo đường khi dùng thuốc quá liều, ăn uống thiếu bữa hoặc vận động nhiều. Các dấu hiệu thường gặp gồm run tay, vã mồ hôi lạnh, đói cồn cào; nếu kéo dài có nguy cơ ảnh hưởng đến ý thức và hệ thần kinh.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> Hãy gọi 115 ngay nếu người bệnh có biểu hiện lơ mơ, hôn mê hoặc co giật. Đặc biệt tránh đổ nước hoặc thức ăn vào miệng người đang bất tỉnh.

**Các bước xử trí:**
1. **Nhận biết triệu chứng và kiểm tra nhanh**: Nếu có máy đo đường huyết cá nhân, đo kiểm tra (mức dưới 3.9 mmol/L hoặc dưới 70 mg/dL thường được xem là hạ đường huyết).
2. **Áp dụng quy tắc 15 (khi người bệnh còn tỉnh táo)**: Cho người bệnh ăn hoặc uống ngay khoảng 15g đường hấp thu nhanh: uống khoảng 120ml nước ép trái cây ngọt, hoặc 3 viên đường, hoặc 1 thìa canh mật ong, hoặc một cốc nước đường ấm.
3. **Nghỉ ngơi và kiểm tra lại sau 15 phút**: Để người bệnh ngồi nghỉ ngơi. Sau 15 phút kiểm tra lại đường huyết; nếu vẫn thấp, có thể lặp lại việc bổ sung 15g đường.
4. **Bổ sung bữa phụ duy trì**: Khi đường huyết ổn định trở lại, người bệnh có thể ăn nhẹ tinh bột (bánh quy, bánh mì hoặc cháo) để duy trì mức đường huyết.
5. **Trường hợp người bệnh suy giảm ý thức**: Đặt người bệnh nằm nghiêng an toàn và gọi 115. Không cho ăn uống qua đường miệng; nếu người bệnh có sẵn bút tiêm Glucagon được kê đơn, có thể sử dụng theo hướng dẫn y tế.

**Nên làm:**
- Hỗ trợ bổ sung đường nhanh ngay khi nhận thấy các dấu hiệu sớm như run tay, vã mồ hôi.
- Người bệnh đái tháo đường được nên mang theo vài viên kẹo hoặc gói đường bên mình.
- Trao đổi với bác sĩ điều trị để rà soát lại phác đồ dùng thuốc nếu điều này lặp lại.

**Cần tránh:**
- Tránh đưa thức ăn hoặc nước uống vào miệng người đang hôn mê, co giật vì có nguy cơ gây sặc đường thở.
- Hạn chế dùng thực phẩm nhiều chất béo (như socola, kem) để xử trí cấp tốc vì chất béo làm chậm quá trình hấp thu đường.
- Tránh tự ý tiêm thêm insulin khi đang có dấu hiệu nghi ngờ hạ đường huyết.

---

#### 25. Sơ cứu người đang co giật
- **Mã chủ đề:** `cach-so-cuu-dong-kinh-xu-tri-dung`
- **Phân loại:** Bệnh lý cấp tính
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 3 phút
- **Nguồn đối chiếu:** Tham khảo Epilepsy Foundation Australia
- **Tóm tắt:** Bảo vệ người đang co giật khỏi chấn thương, theo dõi thời gian và biết khi nào cần gọi cấp cứu.

**Tổng quan:**  
Giữ bình tĩnh và ở cạnh người bệnh. Hãy bảo vệ họ khỏi chấn thương trong cơn và theo dõi cho đến khi họ tỉnh lại.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> Gọi 115 nếu cơn kéo dài từ 5 phút, cơn khác tiếp diễn, đây là cơn đầu tiên hoặc người bệnh không hồi tỉnh sau cơn.

**Các bước xử trí:**
1. **Bảo vệ khỏi chấn thương**: Dọn vật cứng và sắc xung quanh, kê vật mềm dưới đầu và theo dõi thời gian co giật.
2. **Giữ đường thở thông thoáng**: Nhẹ nhàng đặt người bệnh nằm nghiêng khi có thể thực hiện an toàn. Nếu có thức ăn, dịch hoặc chất nôn trong miệng, đặt họ nằm nghiêng ngay.
3. **Ở lại theo dõi**: Theo dõi nhịp thở và ở lại cho đến khi người bệnh tỉnh hoặc nhân viên cấp cứu tới.

**Nên làm:**
- Theo dõi thời điểm bắt đầu và kết thúc cơn.
- Dọn vật nguy hiểm và trấn an người bệnh khi họ tỉnh.

**Cần tránh:**
- Tránh không ghì giữ người đang co giật.
- Tránh không đặt vật vào miệng hoặc cho ăn uống khi chưa hoàn toàn tỉnh.

**Tài liệu tham khảo:**
- Epilepsy Foundation Australia — Sơ cứu cơn co giật: https://epilepsyfoundation.org.au/understanding-epilepsy/seizure-first-aid/tonic-clonic-seizures/

---

#### 26. Sơ cứu người bị nhồi máu cơ tim (đau tim đột ngột)
- **Mã chủ đề:** `so-cuu-nguoi-bi-nhoi-mau-co-tim-dau-tim-dot-ngot`
- **Phân loại:** Bệnh lý cấp tính
- **Mức độ:** Rất khẩn cấp (cần xử trí ngay)
- **Thời gian đọc:** 5 phút
- **Nguồn đối chiếu:** Chuẩn Y khoa tham chiếu từ Vinmec
- **Tóm tắt:** Động mạch vành bị tắc nghẽn đột ngột khiến cơ tim thiếu máu nuôi; đau thắt ngực dữ dội lan vai/tay trái. Cần nghỉ ngơi, gọi 115 và chuẩn bị CPR ngay.

**Tổng quan:**  
Động mạch vành bị tắc nghẽn đột ngột khiến cơ tim thiếu máu nuôi; nạn nhân đau thắt ngực dữ dội lan lên vai/cánh tay trái/hàm, khó thở, vã mồ hôi. Cần để nạn nhân nghỉ ngơi tư thế nửa nằm nửa ngồi, gọi cấp cứu 115 ngay, sẵn sàng hồi sinh tim phổi (CPR) nếu ngừng tim.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC khi phát hiện cơn đau thắt ngực dữ dội kéo dài trên vài phút lan lên vai, hàm, cánh tay trái hoặc nạn nhân có dấu hiệu ngất xỉu, bất tỉnh.

**Các bước xử trí:**
1. **Nghỉ ngơi hoàn toàn ở tư thế nửa nằm nửa ngồi**: Dừng ngay mọi việc đang làm, ngồi nghỉ hoặc nằm theo tư thế nửa nằm nửa ngồi (co đầu gối, nằm nghiêng 75 độ so với mặt đất) ở nơi thoáng đãng.
2. **Nới lỏng trang phục và hít thở nhẹ nhàng**: Buông lỏng phần vai và hai cánh tay, nhắm mắt hít thở nhẹ nhàng bằng mũi. Nới rộng cổ áo, cà vạt, khăn quàng cổ để đường thở thông thoáng.
3. **Dùng thuốc hỗ trợ theo chỉ định của bác sĩ**: Nếu bệnh nhân có sẵn đơn thuốc, dùng ngay viên ngậm dưới lưỡi Nitroglycerin hoặc nhai 1 viên aspirin chống đông máu theo hướng dẫn y tế.
4. **Ép tim ngoài lồng ngực (CPR) nếu bất tỉnh**: Đặt nạn nhân nằm lên mặt phẳng cứng. Chồng hai bàn tay đặt lên giữa ngực (trên xương ức) ép mạnh và sâu 1/3 lồng ngực, duy trì liên tục trong khi chờ xe 115.

**Nên làm:**
- Dừng ngay mọi việc, nằm tư thế nửa nằm nửa ngồi co nhẹ đầu gối.
- Buông lỏng vai và hai tay, nhắm mắt hít thở nhẹ nhàng bằng mũi.
- Cho dùng thuốc ngậm Nitroglycerin hoặc nhai aspirin nếu có chỉ định sẵn của bác sĩ.
- Gọi ngay cấp cứu 115 và chuẩn bị ép tim ngoài lồng ngực nếu nạn nhân ngưng thở.

**Cần tránh:**
- Không nên cố hít sâu hoặc nín thở (làm tăng gánh nặng và khiến tim mệt thêm).
- Không nên nói to hay hỏi quá nhiều gây hoảng loạn, căng thẳng tâm lý cho nạn nhân.
- Không nên để nạn nhân tự đi lại hoặc tự lái xe đến bệnh viện.

**Tài liệu tham khảo:**
- Vinmec (Truy cập: 16/09/2026): https://www.vinmec.com/vie/bai-viet/huong-dan-xu-tri-so-cuu-cho-nguoi-bi-nhoi-mau-co-tim-vi
- Nguồn đối chiếu 2 (Truy cập: 16/09/2026): https://tiemchunglongchau.com.vn/kien-thuc-tiem-chung/huong-dan-so-cuu-nhoi-mau-co-tim-va-bien-phap-phong-benh-hieu-qua
- BVĐK Tâm Anh - Dấu hiệu đau tim & cảnh báo (Truy cập: 16/09/2026): https://tamanhhospital.vn/dau-hieu-dau-tim/
- Nhà thuốc Long Châu - Đau ngực trái & Xử trí an toàn (Truy cập: 16/09/2026): https://nhathuoclongchau.com.vn/bai-viet/dau-nguc-trai-nguyen-nhan-dau-hieu-nhan-biet-va-cach-xu-tri-an-toan.html

---

### 4.4. Nhóm 4: Tai nạn ngoài trời và môi trường
*Số lượng: 6 chủ đề*

#### 27. Say nắng, say nóng là gì? Nguyên nhân và cách xử trí khi gặp
- **Mã chủ đề:** `soc-nhiet-say-nang`
- **Phân loại:** Tai nạn ngoài trời và môi trường
- **Mức độ:** Khẩn cấp
- **Thời gian đọc:** 1 phút
- **Nguồn đối chiếu:** Tham khảo nguồn y tế, chưa thẩm định lâm sàng
- **Tóm tắt:** Nhận diện say nắng và sốc nhiệt, gọi cấp cứu khi rối loạn ý thức, làm mát cơ thể ngay.

**Tổng quan:**  
Sốc nhiệt là cấp cứu nguy hiểm, có thể kèm lú lẫn hoặc ngất. Kiệt sức vì nóng nhẹ hơn nhưng có thể tiến triển nặng; cách cho uống nước phụ thuộc mức tỉnh táo và tình trạng.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu nghi sốc nhiệt: lú lẫn, ngất, co giật, thân nhiệt rất cao hoặc tình trạng xấu đi nhanh.

**Các bước xử trí:**
1. **Gọi 115 khi nghi sốc nhiệt**: Nếu người bệnh lú lẫn, ngất, co giật hoặc rất nóng, gọi 115 ngay. Đừng đợi có nhiệt kế mới bắt đầu xử trí.
2. **Đưa đến nơi mát**: Đưa người bệnh ra khỏi nắng hoặc nơi nóng, nới lỏng và cởi bớt quần áo không cần thiết.
3. **Làm mát ngay**: Dùng nước mát làm ướt da và quạt; có thể chườm khăn lạnh ở cổ, nách, bẹn hoặc cho vào bồn nước mát nếu an toàn và có người giám sát.
4. **Theo dõi và xử trí uống nước**: Theo dõi hô hấp, mức tỉnh táo đến khi cấp cứu đến. Với kiệt sức vì nóng, người tỉnh táo và nuốt tốt có thể uống từng ngụm nước; nếu nghi sốc nhiệt, không cho uống.

**Nên làm:**
- Gọi 115 ngay khi có rối loạn ý thức hoặc nghi sốc nhiệt.
- Đưa nạn nhân đến nơi mát và làm mát cơ thể ngay.
- Theo dõi hô hấp và mức tỉnh táo liên tục khi chờ cấp cứu.

**Cần tránh:**
- Không nên chậm làm mát để chờ xe cấp cứu.
- Không nên cho người nghi sốc nhiệt, lú lẫn hoặc bất tỉnh uống nước.
- Không nên để người lơ mơ một mình trong bồn nước.

**Tài liệu tham khảo:**
- CDC — Nhận biết và sơ cứu bệnh do nóng: https://stacks.cdc.gov/view/cdc/59395

---

#### 28. Các bước sơ cứu ban đầu trẻ bị đuối nước
- **Mã chủ đề:** `duoi-nuoc-o-tre-em`
- **Phân loại:** Tai nạn ngoài trời và môi trường
- **Mức độ:** Rất khẩn cấp (cần xử trí ngay)
- **Thời gian đọc:** 1 phút
- **Nguồn đối chiếu:** Tham khảo nguồn y tế, chưa thẩm định lâm sàng
- **Tóm tắt:** Đưa trẻ ra khỏi nước an toàn, gọi cấp cứu và hỗ trợ hô hấp nếu trẻ không thở bình thường.

**Tổng quan:**  
Đuối nước gây thiếu oxy. Ưu tiên cứu hộ an toàn, gọi cấp cứu và hỗ trợ hô hấp sớm; không mất thời gian tìm cách đẩy nước ra khỏi phổi.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu trẻ bất tỉnh, không thở hoặc chỉ thở ngáp; trẻ ho kéo dài, khó thở hoặc bất thường sau khi được đưa khỏi nước cũng cần được đánh giá y tế.

**Các bước xử trí:**
1. **Đưa trẻ ra khỏi nước an toàn**: Gọi người cứu hộ và đưa trẻ lên bờ bằng cách không đặt bản thân vào nguy hiểm; không xuống nước nếu không có kỹ năng và phương tiện an toàn.
2. **Gọi 115, kiểm tra đáp ứng và thở**: Nhờ người khác gọi 115 và tìm AED. Kiểm tra trẻ có đáp ứng và có thở bình thường không; thở ngáp không phải thở bình thường.
3. **Nếu không thở: hỗ trợ hô hấp và CPR**: Nếu biết thực hiện, mở đường thở và cho 2 hơi thổi ngạt ban đầu, sau đó luân phiên 30 ép ngực với 2 hơi thổi. Nếu không thể thổi ngạt, thực hiện ép ngực liên tục theo hướng dẫn của 115.
4. **Dùng AED và tiếp tục theo dõi**: Dùng AED ngay khi có và làm theo lời máy. Tiếp tục hỗ trợ cho đến khi nhân viên y tế tiếp nhận; nếu trẻ đã thở bình thường, theo dõi hô hấp và tình trạng tỉnh táo.

**Nên làm:**
- Đảm bảo an toàn cho người cứu trước khi tiếp cận trẻ.
- Gọi 115 sớm và bắt đầu CPR khi trẻ không thở bình thường.
- Dùng AED khi có sẵn và tiếp tục theo dõi trẻ sau khi ra khỏi nước.

**Cần tránh:**
- Không nên nhảy xuống nước cứu khi không đủ kỹ năng hoặc thiếu phương tiện an toàn.
- Không nên ép bụng hoặc dốc ngược trẻ để cố đẩy nước ra.
- Không nên trì hoãn CPR để móc họng hoặc tìm cách hút nước khỏi phổi.

---

#### 29. Hướng dẫn sơ cứu ong đốt
- **Mã chủ đề:** `so-cuu-ong-dot`
- **Phân loại:** Tai nạn ngoài trời và môi trường
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 3 phút
- **Nguồn đối chiếu:** Tham khảo: www.vinmec.com
- **Tóm tắt:** Bài viết được tư vấn chuyên môn bởi thạc sĩ, bác sĩ lê Thị thanh hương - bác sĩ hồi sức cấp cứu - khoa hồi sức cấp cứu - Bệnh viện đa khoa quốc tế…

**Tổng quan:**  
Bài viết được tư vấn chuyên môn bởi thạc sĩ, bác sĩ lê Thị thanh hương - bác sĩ hồi sức cấp cứu - khoa hồi sức cấp cứu - Bệnh viện đa khoa quốc tế Vinmec central park

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC nếu bị ong đốt một số trường hợp sau cần thiết phải đến cơ sở y tế càng sớm càng tốt.

**Các bước xử trí:**
1. **Nhanh chóng ra khỏi khu vực có ong**: Nhanh chóng ra khỏi khu vực có ong.
2. **Lấy vòi chích của ong ra bằng cách khều nhẹ (có thể dùng**: Lấy vòi chích của ong ra bằng cách khều nhẹ (có thể dùng móng tay khều nhẹ xuôi chiều hướng vòi chích) hoặc dùng nhíp lấy ra vì hầu hết sau khi đốt, ong đều để lại vòi chích và túi nọc ở vết đốt trên da. Tránh nặn ép bằng tay vì có thể làm nọc độc lan ra.
3. **Rửa sạch vùng da bị đốt bằng xà phòng và nước ấm**: Rửa sạch vùng da bị đốt bằng xà phòng và nước ấm. Bôi dung dịch sát trùng như povidine 10% hoặc cồn 70 độ lên vết đốt mỗi ngày 2 lần.
4. **Uống nhiều nước để loại thải độc tố**: Uống nhiều nước để loại thải độc tố.
5. **Chườm lạnh lên vết đốt để giảm đau và giảm sưng**: Chườm lạnh lên vết đốt để giảm đau và giảm sưng.

**Nên làm:**
- Nhanh chóng ra khỏi khu vực có ong.
- Lấy vòi chích của ong ra bằng cách khều nhẹ (có thể dùng.
- Rửa sạch vùng da bị đốt bằng xà phòng và nước ấm.
- Uống nhiều nước để loại thải độc tố.

**Cần tránh:**
- Không nên về cơ bản có những loại ong đốt là lành tính, tuy nhiên lại có những loại ong chứa nhiều độc tố, khi đốt có thể ảnh hưởng nghiêm trọng tới sức khỏe.
- Không nên vì thế cách tốt là nên chủ động phòng tránh ong đốt để đảm bảo an toàn.
- Không nên tiếp xúc với ong. Không chọc phá tổ ong.
- Không nên khi ong bay đến, không chạy, cần đứng hoặc ngồi im và không cử động (ong sẽ không bay theo nữa).

---

#### 30. Sơ cứu khi có dị vật trong mắt
- **Mã chủ đề:** `cach-lay-di-vat-trong-mat`
- **Phân loại:** Tai nạn ngoài trời và môi trường
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 3 phút
- **Nguồn đối chiếu:** Tham khảo: www.vinmec.com
- **Tóm tắt:** Bài viết được tham vấn chuyên môn cùng thạc sĩ, bác sĩ vũ hữu thắng - bác sĩ hồi sức - cấp cứu - khoa hồi sức cấp cứu - Bệnh viện đa khoa quốc tế…

**Tổng quan:**  
Bụi bẩn, côn trùng nhỏ hoặc hạt cát bay vào mắt là tai nạn hay gặp. Xử trí nhẹ nhàng và đúng cách giúp giảm nguy cơ trầy xước giác mạc hoặc nhiễm trùng mắt.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> Nên đưa đến cơ sở y tế chuyên khoa mắt ngay nếu dị vật là mảnh kim loại ghim sâu, mắt chảy máu hoặc đau nhức nhiều.

**Các bước xử trí:**
1. **Vệ sinh tay sạch sẽ**: Rửa tay bằng xà phòng và nước sạch trước khi chạm vào vùng mắt.
2. **Rửa mắt bằng nước muối sinh lý hoặc nước sạch**: Nghiêng đầu và dùng nước muối sinh lý (naCl 0.9%) nhỏ hoặc xối nhẹ từ góc trong mắt ra góc ngoài để dòng nước cuốn trôi dị vật.
3. **Chớp mắt nhẹ nhàng trong nước sạch**: Có thể ngâm nhẹ mắt vào cốc nước sạch hoặc nước muối sinh lý rồi chớp mắt nhiều lần.
4. **Kiểm tra và đi khám nếu cần thiết**: Nếu dị vật nằm ở kết mạc mi dưới và dễ thấy, có thể dùng tăm bông ẩm chạm nhẹ. Nếu dị vật bám trên tròng đen (giác mạc) hoặc vẫn cộm nhiều sau khi rửa, nên đến cơ sở y tế để bác sĩ xử lý.

**Nên làm:**
- Chớp mắt nhiều lần để nước mắt tự nhiên hỗ trợ đẩy dị vật ra ngoài.
- Ưu tiên sử dụng nước muối sinh lý 0.9% chuyên dụng cho mắt.
- Che nhẹ mắt bằng gạc sạch và đến khám bác sĩ nếu cảm giác cộm đau không giảm.

**Cần tránh:**
- Tránh dụi mắt bằng tay vì có nguy cơ làm dị vật chà xát gây xước giác mạc.
- Tránh dùng nhíp, tăm nhọn hoặc vật cứng tự ý gắp dị vật trong mắt.
- Không nên cố gắng cạy gỡ dị vật đã ghim chặt vào phần tròng đen.

---

#### 31. Những cách sơ cứu người bị ngất xỉu và các lưu ý cần nhớ
- **Mã chủ đề:** `nhung-cach-so-cuu-nguoi-bi-ngat`
- **Phân loại:** Tai nạn ngoài trời và môi trường
- **Mức độ:** Cần xử trí kịp thời
- **Thời gian đọc:** 2 phút
- **Nguồn đối chiếu:** Tham khảo St John Ambulance
- **Tóm tắt:** Giúp người sắp ngất nằm xuống và kiểm tra nhịp thở nếu họ vẫn không đáp ứng.

**Tổng quan:**  
Ngất thường chỉ kéo dài trong thời gian ngắn. Nếu người bệnh vẫn không đáp ứng, cần kiểm tra nhịp thở và gọi cấp cứu.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> Gọi 115 nếu người bệnh không tỉnh lại hoặc không thở bình thường. Làm theo hướng dẫn của nhân viên cấp cứu.

**Các bước xử trí:**
1. **Giúp người bệnh nằm xuống**: Nếu có thể, kê chân hơi cao. Đề nghị người xung quanh lùi ra để có không khí thoáng.
2. **Theo dõi khi tỉnh lại**: Trấn an người bệnh. Khi họ thấy đỡ, giúp họ ngồi dậy từ từ trong vài phút.
3. **Kiểm tra nếu vẫn không đáp ứng**: Mở đường thở, kiểm tra nhịp thở và gọi 115. Nếu họ thở bình thường, đặt nằm nghiêng an toàn và tiếp tục theo dõi.

**Nên làm:**
- Giữ khu vực xung quanh thông thoáng.
- Theo dõi mức tỉnh táo và nhịp thở.

**Cần tránh:**
- Tránh không giúp người bệnh đứng lên ngay khi vừa tỉnh.
- Tránh không tụ tập sát quanh người bệnh.

**Tài liệu tham khảo:**
- St John Ambulance — Sơ cứu khi ngất: https://www.sja.org.uk/first-aid-advice/fainting/
- St John Ambulance — Tư thế nằm nghiêng an toàn: https://www.sja.org.uk/first-aid-advice/recovery-position/

---

#### 32. Sơ cứu khi bị rắn cắn
- **Mã chủ đề:** `so-cuu-khi-bi-ran-can-ran-doc`
- **Phân loại:** Tai nạn ngoài trời và môi trường
- **Mức độ:** Khẩn cấp
- **Thời gian đọc:** 3 phút
- **Nguồn đối chiếu:** Chưa ghi nhận nguồn cụ thể
- **Tóm tắt:** Trong số khoảng 3.000 loài rắn trên thế giới, chỉ có 15% – 20% loài có nọc độc hoặc chất tiết nước bọt độc hại cho con người.

**Tổng quan:**  
Vết cắn của rắn độc có nguy cơ ảnh hưởng nghiêm trọng đến hệ thần kinh hoặc cơ chế đông máu. Việc sơ cứu đúng cách để làm chậm quá trình lan truyền nọc độc trong khi chờ điều trị chuyên khoa.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> Cần đưa nạn nhân đến cơ sở y tế gần nhất càng sớm càng tốt để được thăm khám và truyền huyết thanh kháng nọc độc (nếu cần).

**Các bước xử trí:**
1. **Rời khỏi khu vực nguy hiểm và trấn an**: Đưa nạn nhân ra xa tầm hoạt động của rắn. Hỗ trợ họ giữ bình tĩnh và nằm yên, hạn chế vận động vì lo lắng và cử động mạnh có thể làm độc tố lan nhanh hơn.
2. **Tháo bỏ đồ trang sức và nới lỏng trang phục**: Nhanh chóng tháo nhẫn, vòng tay, đồng hồ ở vùng chi bị cắn trước khi vết thương sưng nề.
3. **Làm sạch nhẹ và hạn chế cử động chi**: Có thể rửa nhẹ bề mặt vết cắn bằng nước sạch hoặc nước muối sinh lý, che bằng gạc sạch. Dùng nẹp cố định nhẹ nhàng chi bị cắn và giữ chi thấp hơn mức tim.
4. **Vận chuyển đến cơ sở y tế**: Hỗ trợ vận chuyển nạn nhân bằng cáng hoặc phương tiện phù hợp, hạn chế để họ tự đi bộ. Nếu an toàn, có thể ghi nhớ đặc điểm hoặc chụp ảnh con rắn từ xa để cung cấp thông tin cho bác sĩ.

**Nên làm:**
- Giữ nạn nhân nằm yên và hạn chế cao nhất có thể cử động ở chi bị cắn.
- Tháo bỏ vật dụng gây chèn ép (nhẫn, đồng hồ) sớm.
- Đưa đến cơ sở y tế có khả năng cấp cứu chống độc trong thời gian sớm nhất.

**Cần tránh:**
- Tránh rạch da, trích nặn máu tại vết cắn vì dễ làm tăng nguy cơ nhiễm trùng và tổn thương mạch máu.
- Tránh dùng miệng hút nọc độc để bảo vệ an toàn cho cả người hỗ trợ.
- Không nên buộc garô quá chặt gây cản trở hoàn toàn máu lưu thông dẫn đến nguy cơ hoại tử chi.
- Tránh đắp lá cây hoặc áp dụng các mẹo dân gian chưa được kiểm chứng làm chậm thời gian đến bệnh viện.

---

### 4.5. Nhóm 5: Tai nạn giao thông và chấn thương nặng
*Số lượng: 1 chủ đề*

#### 33. Sơ cấp cứu chấn thương bụng theo hướng dẫn của Bộ Y tế
- **Mã chủ đề:** `so-cap-cuu-chan-thuong-bung-theo-huong-dan-cua-bo-y-te`
- **Phân loại:** Tai nạn giao thông và chấn thương nặng
- **Mức độ:** Khẩn cấp
- **Thời gian đọc:** 5 phút
- **Nguồn đối chiếu:** Chuẩn Y khoa tham chiếu từ Vinmec
- **Tóm tắt:** Tổn thương nội tạng do va đập hoặc thấu bụng; nạn nhân đau, bụng chướng. Cần nằm yên, ủ ấm, không cho ăn uống, gọi 115 cấp cứu khẩn cấp.

**Tổng quan:**  
Tổn thương nội tạng trong ổ bụng do va đập mạnh hoặc vết thương thấu bụng; nạn nhân kêu đau, bụng chướng, có thể kèm sốc mất máu. Cần cho nạn nhân nằm yên, giữ ấm, không cho ăn uống và chuyển cấp cứu khẩn cấp.

> [!CAUTION]
> **Lưu ý khẩn cấp:**  
> GỌI 115 NGAY LẬP TỨC khi nghi ngờ chấn thương bụng có biểu hiện choáng, vã mồ hôi, bụng chướng, nôn ra máu hoặc có vết thương lòi ruột/tạng, dị vật đâm xuyên.

**Các bước xử trí:**
1. **Để nạn nhân nằm thoải mái ở nơi thoáng mát**: Nới lỏng quần áo, thắt lưng. Nếu nạn nhân nôn hoặc có xu hướng nôn, cho nằm nghiêng an toàn sang bên trái. Thực hiện quy trình ABC (đường thở, hô hấp, tuần hoàn) nếu cần thiết.
2. **Xử trí khi có sốc và vết thương hở**: Nếu có sốc nên để đầu thấp, chân cao, ủ ấm tạm thời nạn nhân. Vết thương hở, chảy máu băng bó bằng gạc vô trùng hoặc quần áo sạch.
3. **Bảo vệ phần tạng lộ ra ngoài (nếu lòi ruột)**: Không nên cố gắng ấn nhét tạng vào trong. Dùng gạc sạch tẩm nước muối sinh lý đậy lên hoặc úp bát/chậu sạch lên trên để giữ ẩm và chống nhiễm trùng.
4. **Giữ nguyên dị vật đâm xuyên và chờ xe cấp cứu**: Không được rút hay tháo dị vật, vũ khí đâm xuyên ra khỏi thành bụng vì sẽ gây chảy máu ồ ạt nguy hiểm tính mạng. Chờ xe 115 tiếp nhận.

**Nên làm:**
- Nằm nghiêng an toàn bên trái nếu nạn nhân nôn mửa.
- Dùng gạc sạch tẩm nước muối sinh lý hoặc bát sạch úp lên phần tạng lộ ra ngoài.
- Giữ ấm cho nạn nhân bằng chăn mỏng.
- Thông báo rõ tình trạng lòi tạng hoặc dấu hiệu sốc cho tổng đài 115.

**Cần tránh:**
- Khuyến cáo tránh ấn nhét phần ruột, tạng bị lòi ra ngoài trở lại ổ bụng.
- Khuyến cáo tránh rút dị vật đâm xuyên tại hiện trường.
- Không nên cho nạn nhân ăn hay uống bất kỳ thứ gì.
- Không nên tự ý di chuyển nạn nhân khi chấn thương nặng chưa ổn định.

**Tài liệu tham khảo:**
- Vinmec (Truy cập: 16/09/2026): https://www.vinmec.com/vie/bai-viet/so-cap-cuu-chan-thuong-bung-huong-dan-cua-bo-y-te-vi
- Nguồn đối chiếu 2 (Truy cập: 16/09/2026): https://bvnguyentriphuong.com.vn/hoi-suc-tich-cuc-chong-doc/so-cap-cuu-chan-thuong-bung

---

## Phần V: 10 tình huống trắc nghiệm thực tế

10 câu hỏi dưới đây mô phỏng các ca tai nạn thường gặp, kèm giải thích ngắn gọn giúp bạn chọn cách xử trí đúng.

### Tình huống 1: UNRESPONSIVE
- **Hoàn cảnh:** Bạn thấy một người lớn nằm bất động, không đáp ứng khi gọi và lay nhẹ. Khu vực xung quanh an toàn.
- **Câu hỏi:** **Bạn nên làm gì tiếp theo?**

**Các lựa chọn:**
- **[A]** Gọi người hỗ trợ, nhờ gọi 115/lấy AED; kiểm tra thở bình thường và bắt đầu CPR nếu không thở bình thường. *(Đáp án đúng)*
- **[B]** Cho người đó uống nước để tỉnh lại. 
- **[C]** Để người đó nằm một mình vài phút rồi kiểm tra lại. 
- **[D]** Tát mạnh vào mặt để đánh thức. 

> [!NOTE]
> **Đáp án đúng: [A]**  
> **Giải thích:** Gọi cấp cứu sớm và khởi động CPR khi người bệnh không đáp ứng, không thở bình thường là hành động ưu tiên. Không cho ăn uống người đang bất tỉnh.

---

### Tình huống 2: CPR
- **Hoàn cảnh:** Một người lớn đột ngột gục xuống, không đáp ứng và chỉ thở ngáp cá (thở không bình thường). Có người khác ở gần.
- **Câu hỏi:** **Hành động phù hợp nhất là gì?**

**Các lựa chọn:**
- **[A]** Đặt nằm nghiêng và chờ tự hồi phục. 
- **[B]** Nhờ gọi 115 và lấy AED; bắt đầu ép tim giữa ngực, nhanh và mạnh. *(Đáp án đúng)*
- **[C]** Cho uống nước đường. 
- **[D]** Chỉ xoa bóp tay chân. 

> [!NOTE]
> **Đáp án đúng: [B]**  
> **Giải thích:** Thở ngáp cá không được xem là thở bình thường. Gọi 115, dùng AED sớm nếu có và ép tim liên tục ở giữa ngực; nếu chưa được huấn luyện, làm theo hướng dẫn của tổng đài.

---

### Tình huống 3: CHOKING
- **Hoàn cảnh:** Một người lớn đang ăn bỗng không thể nói, ho hoặc thở, có vẻ hoảng loạn.
- **Câu hỏi:** **Bạn nên xử trí thế nào?**

**Các lựa chọn:**
- **[A]** Cho uống nước và yêu cầu nuốt. 
- **[B]** Móc họng bằng tay dù không nhìn thấy dị vật. 
- **[C]** Nhờ gọi 115; thực hiện vỗ lưng và ép bụng theo hướng dẫn sơ cứu phù hợp. *(Đáp án đúng)*
- **[D]** Để người đó nằm ngửa. 

> [!NOTE]
> **Đáp án đúng: [C]**  
> **Giải thích:** Tắc nghẽn đường thở nặng cần trợ giúp khẩn cấp. Với người lớn còn tỉnh, luân phiên vỗ lưng và ép bụng theo hướng dẫn hiện hành; không móc mù. Nếu nạn nhân bất tỉnh, bắt đầu CPR và làm theo tổng đài 115.

---

### Tình huống 4: BLEEDING
- **Hoàn cảnh:** Một người bị vết thương ở cẳng tay và máu chảy nhiều. Bạn đã đảm bảo khu vực an toàn.
- **Câu hỏi:** **Biện pháp sơ cứu ban đầu phù hợp là gì?**

**Các lựa chọn:**
- **[A]** Ép trực tiếp, liên tục lên vết thương bằng gạc hoặc vải sạch và gọi cấp cứu nếu chảy máu nặng. *(Đáp án đúng)*
- **[B]** Rửa vết thương thật lâu trước khi cầm máu. 
- **[C]** Tháo bỏ các cục máu đông liên tục. 
- **[D]** Đắp bột hoặc kem không rõ thành phần. 

> [!NOTE]
> **Đáp án đúng: [A]**  
> **Giải thích:** Ép trực tiếp liên tục bằng vật liệu sạch là bước đầu để kiểm soát chảy máu. Không tháo lớp gạc đã thấm; nếu máu thấm qua, đặt thêm lớp mới và tìm trợ giúp y tế khẩn cấp khi chảy máu nặng.

---

### Tình huống 5: BURN
- **Hoàn cảnh:** Một người vừa bị bỏng do nước nóng ở cẳng tay. Vùng bỏng không dính vào quần áo.
- **Câu hỏi:** **Nên làm gì ngay?**

**Các lựa chọn:**
- **[A]** Chườm đá trực tiếp lên vùng bỏng. 
- **[B]** Làm mát dưới vòi nước sạch mát đang chảy và tháo trang sức gần vùng bỏng nếu dễ tháo. *(Đáp án đúng)*
- **[C]** Bôi kem đánh răng để giảm đau. 
- **[D]** Chọc vỡ các bóng nước. 

> [!NOTE]
> **Đáp án đúng: [B]**  
> **Giải thích:** Làm mát bỏng nhiệt bằng nước sạch mát đang chảy; không dùng đá, kem đánh răng hoặc chọc bóng nước. Bỏng rộng, sâu, ở mặt/bàn tay/sinh dục hoặc có dấu hiệu nặng cần được nhân viên y tế đánh giá.

---

### Tình huống 6: SEIZURE
- **Hoàn cảnh:** Một người co giật trên sàn. Xung quanh có đồ vật cứng và sắc.
- **Câu hỏi:** **Bạn nên làm gì trong lúc co giật?**

**Các lựa chọn:**
- **[A]** Giữ chặt tay chân để ngăn cử động. 
- **[B]** Đặt vật vào miệng để tránh cắn lưỡi. 
- **[C]** Dọn vật nguy hiểm, bảo vệ đầu, canh thời gian và không ghì giữ hay cho vật vào miệng. *(Đáp án đúng)*
- **[D]** Cho uống thuốc hoặc nước ngay. 

> [!NOTE]
> **Đáp án đúng: [C]**  
> **Giải thích:** Giữ an toàn, đỡ đầu bằng vật mềm và ghi thời gian cơn co giật. Không ghì giữ, không đưa bất cứ thứ gì vào miệng. Gọi cấp cứu nếu cơn kéo dài khoảng 5 phút, lặp lại, khó thở/chấn thương hoặc là cơn đầu tiên.

---

### Tình huống 7: STROKE
- **Hoàn cảnh:** Một người đột ngột méo miệng, yếu một bên tay và nói khó.
- **Câu hỏi:** **Việc nào cần ưu tiên?**

**Các lựa chọn:**
- **[A]** Cho ăn để lấy sức. 
- **[B]** Ghi nhớ thời điểm khởi phát triệu chứng và gọi 115 ngay. *(Đáp án đúng)*
- **[C]** Đợi vài giờ xem triệu chứng có hết không. 
- **[D]** Tự cho uống thuốc của người khác. 

> [!NOTE]
> **Đáp án đúng: [B]**  
> **Giải thích:** Méo mặt, yếu tay, nói khó là dấu hiệu cảnh báo đột quỵ. Gọi cấp cứu ngay và ghi thời điểm người bệnh lần cuối còn bình thường; không cho ăn uống hay tự dùng thuốc.

---

### Tình huống 8: FAINTING
- **Hoàn cảnh:** Một người vừa ngất và hiện đã tỉnh lại, đang nằm ở nơi an toàn, không có chấn thương rõ.
- **Câu hỏi:** **Bạn nên làm gì?**

**Các lựa chọn:**
- **[A]** Cho đứng dậy thật nhanh. 
- **[B]** Cho uống nước khi vẫn còn lơ mơ. 
- **[C]** Để người đó nằm nghỉ, theo dõi đáp ứng và hô hấp; gọi cấp cứu nếu không hồi phục nhanh hoặc có dấu hiệu nghiêm trọng. *(Đáp án đúng)*
- **[D]** Tát hoặc dội nước lạnh vào mặt. 

> [!NOTE]
> **Đáp án đúng: [C]**  
> **Giải thích:** Giữ người bệnh nằm ở tư thế an toàn và theo dõi. Không cho uống khi chưa tỉnh hoàn toàn. Gọi 115 nếu bất tỉnh kéo dài, khó thở, đau ngực, chấn thương hoặc tình trạng xấu đi.

---

### Tình huống 9: ANAPHYLAXIS
- **Hoàn cảnh:** Sau khi ăn một món mới, một người nổi mề đay toàn thân, sưng môi và khó thở.
- **Câu hỏi:** **Đây có thể là phản ứng nặng. Bạn nên làm gì?**

**Các lựa chọn:**
- **[A]** Gọi 115 ngay; hỗ trợ dùng bút tiêm epinephrine của chính người bệnh nếu có và làm theo hướng dẫn cấp cứu. *(Đáp án đúng)*
- **[B]** Chờ xem ban có tự hết không. 
- **[C]** Cho ăn thêm để kiểm tra dị ứng. 
- **[D]** Để người bệnh tự đi bộ đến cơ sở y tế. 

> [!NOTE]
> **Đáp án đúng: [A]**  
> **Giải thích:** Khó thở kèm sưng môi sau tiếp xúc dị nguyên có thể là phản vệ, cần cấp cứu ngay. Nếu có bút tiêm epinephrine được kê cho người đó, hỗ trợ sử dụng theo hướng dẫn trên thiết bị và không trì hoãn gọi 115.

---

### Tình huống 10: POISONING
- **Hoàn cảnh:** Bạn phát hiện một người có thể vừa uống nhầm hóa chất tẩy rửa. Người đó còn tỉnh.
- **Câu hỏi:** **Hướng xử trí an toàn là gì?**

**Các lựa chọn:**
- **[A]** Gây nôn để đẩy hóa chất ra ngoài. 
- **[B]** Cho uống sữa hoặc giấm để trung hòa. 
- **[C]** Gọi 115 hoặc cơ sở chống độc; giữ lại bao bì và không tự gây nôn hay cho ăn uống khi chưa được hướng dẫn. *(Đáp án đúng)*
- **[D]** Để người đó ngủ cho hết mệt. 

> [!NOTE]
> **Đáp án đúng: [C]**  
> **Giải thích:** Ngộ độc cần được nhân viên y tế hoặc cơ sở chống độc hướng dẫn khẩn cấp. Không tự gây nôn, không cố trung hòa bằng thức ăn/đồ uống; giữ lại nhãn hoặc bao bì để cung cấp thông tin.

---

## Phần VI: 32 câu hỏi luyện phản xạ 4 phút vàng

Phần này gồm 32 câu hỏi nhanh trong thời gian 240 giây để bạn tập giữ bình tĩnh và nhớ lại các thao tác sơ cứu quan trọng.

### Câu 1 [tp-01] - Ngừng tuần hoàn (ép tim CPR)
- **Câu hỏi:** **Thời gian vàng cao nhất có thể để cấp cứu hồi sinh tế bào não trước khi bị tổn thương khó có khả năng hồi phục khi ngừng tuần hoàn là bao lâu?**
- **Nguồn tham khảo:** Chuẩn ERC & AHA 2025

**Các lựa chọn:**
- **[A]** 4 phút *(Đáp án đúng)*
- **[B]** 10 phút 
- **[C]** 15 phút 
- **[D]** 30 phút 

> [!TIP]
> **Đáp án đúng: [A]**  
> **Giải thích:** Theo cẩm nang medFA và khuyến cáo ERC/AHA, não bộ sẽ bắt đầu tổn thương khó có khả năng phục hồi chỉ sau 4 phút thiếu oxy nếu tim ngừng đập.

---

### Câu 2 [tp-02] - Ngừng tuần hoàn (ép tim CPR)
- **Câu hỏi:** **Khi thực hiện ép tim ngoài lồng ngực (CPR) cho người lớn theo khuyến cáo, tần số ép ngực đạt chuẩn là bao nhiêu?**
- **Nguồn tham khảo:** Chuẩn ERC & AHA 2025

**Các lựa chọn:**
- **[A]** 60 - 80 lần/phút 
- **[B]** 100 - 120 lần/phút *(Đáp án đúng)*
- **[C]** 130 - 150 lần/phút 
- **[D]** Tùy theo nhịp thở của người sơ cứu 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Tần số ép tim chuẩn là 100 - 120 lần/phút, độ sâu 5 - 6 cm đối với người lớn và phải để lồng ngực nở hoàn toàn sau mỗi lần ép.

---

### Câu 3 [tp-03] - Ngừng tuần hoàn (ép tim CPR)
- **Câu hỏi:** **Trong quy trình hồi sinh tim phổi (CPR) kết hợp ép tim và thổi ngạt, tỉ lệ chu kỳ chuẩn là:**
- **Nguồn tham khảo:** Chuẩn ERC & AHA 2025

**Các lựa chọn:**
- **[A]** 15 lần ép tim: 2 lần thổi ngạt 
- **[B]** 30 lần ép tim: 2 lần thổi ngạt *(Đáp án đúng)*
- **[C]** 30 lần ép tim: 5 lần thổi ngạt 
- **[D]** 50 lần ép tim: 1 lần thổi ngạt 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Chu kỳ chuẩn theo AHA/ERC là 30 lần ép tim liên tục xen kẽ 2 lần thổi ngạt hiệu quả, gián đoạn ép tim không quá 10 giây.

---

### Câu 4 [tp-04] - Hóc dị vật (nghẹn)
- **Câu hỏi:** **Phát hiện một người lớn đang bị nghẹn thức ăn nhưng vẫn còn nói được và đang cố ho mạnh. Bạn nên làm gì?**
- **Nguồn tham khảo:** Chuẩn ERC & AHA 2025

**Các lựa chọn:**
- **[A]** Lao vào thực hiện nghiệm pháp Heimlich ngay lập tức 
- **[B]** Dùng ngón tay móc sâu vào họng để tìm dị vật 
- **[C]** Khuyến khích nạn nhân tiếp tục ho mạnh, không can thiệp đập lưng hay ép bụng *(Đáp án đúng)*
- **[D]** Cho nạn nhân uống ngay một cốc nước đầy 

> [!TIP]
> **Đáp án đúng: [C]**  
> **Giải thích:** Nếu nạn nhân vẫn nói, khóc hoặc ho mạnh được, phản xạ ho tự nhiên là cách tống dị vật tốt nhất. Khuyến khích ho mạnh, đặc biệt tránh vỗ lưng hay ép bụng lúc này.

---

### Câu 5 [tp-05] - Hóc dị vật (nghẹn)
- **Câu hỏi:** **Khi thực hiện nghiệm pháp Heimlich cho người lớn bị tắc nghẽn đường thở hoàn toàn, vị trí đặt nắm đấm tay là:**
- **Nguồn tham khảo:** Chuẩn ERC & AHA 2025

**Các lựa chọn:**
- **[A]** Chính giữa xương ức 
- **[B]** Vùng thượng vị (trên rốn, dưới mũi ức) *(Đáp án đúng)*
- **[C]** Dưới rốn 5cm 
- **[D]** Vùng hạ sườn phải 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Nắm đấm đặt tại vùng thượng vị (trên rốn và dưới mũi ức), tay kia bọc lấy và giật mạnh dứt khoát theo hướng VÀO TRONG VÀ LÊN TRÊN.

---

### Câu 6 [tp-06] - Hóc dị vật ở trẻ em
- **Câu hỏi:** **Trẻ sơ sinh dưới 1 tuổi bị sặc dị vật tím tái, không khóc được. Hành động nào sau đây cần tránh vì gây nguy cơ dập vỡ nội tạng?**
- **Nguồn tham khảo:** Chuẩn ERC & AHA 2025

**Các lựa chọn:**
- **[A]** Thực hiện 5 lần vỗ lưng 
- **[B]** Thực hiện 5 lần ấn ngực 
- **[C]** Thực hiện nghiệm pháp ép bụng Heimlich *(Đáp án đúng)*
- **[D]** Gọi cấp cứu 115 

> [!TIP]
> **Đáp án đúng: [C]**  
> **Giải thích:** Đối với trẻ dưới 1 tuổi, gan và các cơ quan nội tạng còn rất non nớt. khuyến cáo tránh ép bụng Heimlich, chỉ dùng chu kỳ 5 vỗ lưng và 5 ấn ngực.

---

### Câu 7 [tp-07] - Bỏng cấp độ 1 & 2
- **Câu hỏi:** **Bị bỏng nước sôi ở cẳng tay xuất hiện các vết phồng rộp. Cách xử trí làm mát tại chỗ đúng chuẩn y khoa là gì?**
- **Nguồn tham khảo:** Chuẩn Hội Bỏng Quốc tế (ISBI)

**Các lựa chọn:**
- **[A]** Xối nhẹ dưới vòi nước mát sạch (15-25°C) liên tục 15-20 phút *(Đáp án đúng)*
- **[B]** Chườm trực tiếp đá lạnh đóng băng lên vết bỏng 
- **[C]** Bôi ngay kem đánh răng hoặc mỡ trăn để làm dịu 
- **[D]** Chọc thủng các bọng nước để thoát dịch nhanh 

> [!TIP]
> **Đáp án đúng: [A]**  
> **Giải thích:** Làm mát vết bỏng bằng nước sạch chảy nhẹ trong 15-20 phút giúp hạ nhiệt mô sâu. Tránh đá lạnh (gây bỏng lạnh hoại tử) và không bôi kem đánh răng, mỡ trăn.

---

### Câu 8 [tp-08] - Chảy máu nghiêm trọng
- **Câu hỏi:** **Khi đang băng ép cầm máu cho vết thương sâu ở cẳng tay, nếu thấy máu vẫn tiếp tục thấm đỏ qua lớp băng gạc đầu tiên, bạn nên làm gì?**
- **Nguồn tham khảo:** Chuẩn IFRC / Hội Chữ Thập Đỏ

**Các lựa chọn:**
- **[A]** Tháo toàn bộ lớp gạc cũ ra để kiểm tra miệng vết thương 
- **[B]** Đặt thêm lớp gạc mới chèn lên trên lớp cũ và tiếp tục quấn băng ép chặt hơn *(Đáp án đúng)*
- **[C]** Rắc bột cà phê hoặc thuốc lá để cầm máu 
- **[D]** Nới lỏng băng để máu lưu thông tốt hơn 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Tối đa không nên tháo lớp băng cũ vì sẽ làm vỡ các cục máu đông đang hình thành. Hãy đặt thêm lớp gạc mới lên trên và tiếp tục đè ép cố định.

---

### Câu 9 [tp-09] - Chảy máu và cầm máu
- **Câu hỏi:** **Khi nào người sơ cứu cần thiết phải sử dụng phương pháp đặt ga-rô (tourniquet)?**
- **Nguồn tham khảo:** Chuẩn IFRC / Hội Chữ Thập Đỏ

**Các lựa chọn:**
- **[A]** Mọi vết thương chảy máu ở tay chân 
- **[B]** Chỉ khi chảy máu động mạch dữ dội phun thành tia hoặc đứt lìa chi mà băng ép trực tiếp không kiểm soát được *(Đáp án đúng)*
- **[C]** Vết trầy xước chảy máu rỉ rỉ ngoài da 
- **[D]** Chảy máu ở vùng đầu và cổ 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Ga-rô là biện pháp cứu mạng cuối cùng chỉ áp dụng cho vết thương chi chảy máu ồ ạt đe dọa tính mạng (phun tia, đứt lìa) khi đè ép trực tiếp thất bại.

---

### Câu 10 [tp-10] - Co giật & động kinh
- **Câu hỏi:** **Gặp nạn nhân đang lên cơn co giật dữ dội, hành vi nào sau đây không nên LÀM?**
- **Nguồn tham khảo:** Chuẩn Hiệp hội Động kinh Quốc tế

**Các lựa chọn:**
- **[A]** Kê đệm mềm dưới đầu nạn nhân và gạt bỏ các vật sắc nhọn xung quanh 
- **[B]** Cố gắng nhét thìa, đũa, chanh hoặc ngón tay vào miệng nạn nhân *(Đáp án đúng)*
- **[C]** Nới lỏng cổ áo và thắt lưng của nạn nhân 
- **[D]** Bấm giờ theo dõi thời gian cơn co giật diễn ra 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Nạn nhân không thể tự cắn đứt lưỡi khi co giật. Nhét vật cứng vào miệng có nguy cơ gãy răng, rách họng, tắc nghẽn đường thở hoặc cắn đứt ngón tay người cứu.

---

### Câu 11 [tp-11] - Đột quỵ
- **Câu hỏi:** **Quy tắc F. A. S. T dùng để nhận diện nhanh cơn đột quỵ bao gồm những dấu hiệu nào?**
- **Nguồn tham khảo:** Chuẩn Hội Đột Quỵ Thế Giới (WSO)

**Các lựa chọn:**
- **[A]** Face (méo mặt), arms (yếu liệt tay chân), speech (nói khó/ngọng), time (thời gian vàng gọi 115) *(Đáp án đúng)*
- **[B]** Fever (sốt cao), allergy (dị ứng), shock (sốc), tremor (run tay) 
- **[C]** Food (ngộ độc), airway (tắc thở), skin (tái nhợt), temperature (Hạ thân nhiệt) 
- **[D]** Fracture (gãy xương), ache (đau đầu), sleep (mơ màng), tension (tăng huyết áp) 

> [!TIP]
> **Đáp án đúng: [A]**  
> **Giải thích:** FAST là bộ quy tắc chuẩn quốc tế: F - face (cười lệch mặt), A - arms (yếu một bên tay), S - speech (nói khó, phát âm không rõ), T - time (khẩn cấp gọi 115).

---

### Câu 12 [tp-12] - Đuối nước ở trẻ em
- **Câu hỏi:** **Sau khi vớt một nạn nhân đuối nước ngừng thở lên bờ cát, hành vi sai lầm nguy hiểm nào cần đặc biệt tránh?**
- **Nguồn tham khảo:** Chuẩn Hiệp hội Cứu sinh Quốc tế (ILS)

**Các lựa chọn:**
- **[A]** Lập tức làm khai thông đường thở và hà hơi thổi ngạt 
- **[B]** Ép tim ngoài lồng ngực kết hợp thổi ngạt 
- **[C]** Vác nạn nhân chạy vòng quanh để xốc nước ra khỏi phổi *(Đáp án đúng)*
- **[D]** Gọi hỗ trợ y tế 115 ngay lập tức 

> [!TIP]
> **Đáp án đúng: [C]**  
> **Giải thích:** Hành động vác chạy xốc nước làm chậm trễ thời gian vàng hồi sức tim phổi CPR và có thể khiến dịch dạ dày trào ngược lọt vào đường thở gây ngạt thở thứ phát.

---

### Câu 13 [tp-13] - Điện giật
- **Câu hỏi:** **Phát hiện nạn nhân bị điện giật tại nhà đang dính chặt vào dây điện hở, hành động ĐẦU TIÊN cần thiết phải làm là:**
- **Nguồn tham khảo:** Chuẩn An toàn Điện lực & Cấp cứu

**Các lựa chọn:**
- **[A]** Lao vào dùng hai tay kéo nạn nhân ra ngay 
- **[B]** Ngắt ngay nguồn điện (cầu dao, aptomat) hoặc dùng vật liệu cách điện khô gạt dây điện ra *(Đáp án đúng)*
- **[C]** Hô hấp nhân tạo ngay tại chỗ khi dây điện còn cắm 
- **[D]** Tạt nước lạnh vào hiện trường để dập tắt tia lửa 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** An toàn cho người sơ cứu là nguyên tắc số 1. Phải ngắt cầu dao hoặc dùng vật cách điện khô (gậy gỗ khô, chổi nhựa) tách nạn nhân ra khỏi nguồn điện trước khi chạm vào.

---

### Câu 14 [tp-14] - Gãy xương
- **Câu hỏi:** **Nguyên tắc sơ cứu quan trọng nhất đối với một trường hợp nghi ngờ gãy kín xương cẳng chân là gì?**
- **Nguồn tham khảo:** Chuẩn Chấn thương Chỉnh hình & Cấp cứu

**Các lựa chọn:**
- **[A]** Cố định bất động chi gãy qua 2 khớp lân cận (khớp gối và khớp cổ chân) trước khi vận chuyển *(Đáp án đúng)*
- **[B]** Cố gắng nắn bẻ đầu xương gãy cho thẳng trục ngay tại hiện trường 
- **[C]** Cho nạn nhân đứng dậy đi thử để đánh giá mức độ đau 
- **[D]** Chườm nóng và xoa bóp dầu cao liên tục 

> [!TIP]
> **Đáp án đúng: [A]**  
> **Giải thích:** Nguyên tắc bất động xương gãy là nẹp cố định qua 2 khớp liền kề (khớp trên và khớp dưới ổ gãy). không nên nắn chỉnh xương vì có thể đâm thủng mạch máu và biến gãy kín thành gãy hở.

---

### Câu 15 [tp-15] - Sốc nhiệt, say nắng
- **Câu hỏi:** **Đối với nạn nhân bị sốc nhiệt nặng kèm lú lẫn hoặc bất tỉnh, điều nào sau đây cần tránh làm?**
- **Nguồn tham khảo:** Chuẩn Cấp cứu Say nắng & Sốc nhiệt

**Các lựa chọn:**
- **[A]** Đưa nạn nhân vào nơi râm mát, thoáng khí 
- **[B]** Cởi bớt quần áo ngoài và chườm mát vùng cổ, nách, bẹn 
- **[C]** Cố ép nạn nhân uống nước hoặc dung dịch điện giải *(Đáp án đúng)*
- **[D]** Bật quạt thổi nhẹ và gọi 115 

> [!TIP]
> **Đáp án đúng: [C]**  
> **Giải thích:** Khi nạn nhân bị lú lẫn, co giật hoặc mất ý thức, việc cố đổ nước vào miệng sẽ gây sặc nghiêm trọng vào đường thở dẫn đến nghẹt thở hoặc viêm phổi hít.

---

### Câu 16 [tp-16] - Xử lý khi bị sốc phản vệ
- **Câu hỏi:** **Thuốc đầu tay và quan trọng nhất có tác dụng giúp bảo vệ tính mạng tính mạng người bị sốc phản vệ nặng là gì?**
- **Nguồn tham khảo:** Hướng dẫn Chẩn đoán & Xử trí Sốc phản vệ - Bộ Y tế

**Các lựa chọn:**
- **[A]** Thuốc giảm đau paracetamol 
- **[B]** Adrenaline (Epinephrine) tiêm bắp *(Đáp án đúng)*
- **[C]** Kháng sinh đường uống 
- **[D]** Vitamin C liều cao 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Adrenaline (Epinephrine) là thuốc thiết yếu cấp cứu sốc phản vệ giúp nâng huyết áp, giãn phế quản và chống phù nề đường thở khẩn cấp.

---

### Câu 17 [tp-17] - Sặc sữa ở trẻ sơ sinh rất nguy
- **Câu hỏi:** **Trẻ sơ sinh bị sặc sữa trào ra mũi miệng, cơ thể tím tái và khó thở. Động tác cấp cứu đúng là gì?**
- **Nguồn tham khảo:** Tư vấn Nhi sơ sinh - Bệnh viện Vinmec

**Các lựa chọn:**
- **[A]** Bế dựng trẻ lên và vỗ mạnh vào lưng theo hướng thẳng đứng 
- **[B]** Bế dốc ngược hai chân trẻ lắc mạnh 
- **[C]** Đặt trẻ nằm sấp dọc cánh tay người lớn (đầu thấp hơn thân), vỗ 5 cái dứt khoát vào giữa 2 bả vai kết hợp hút sạch dịch mũi miệng *(Đáp án đúng)*
- **[D]** Cho trẻ uống tiếp nước ấm để hòa tan sữa 

> [!TIP]
> **Đáp án đúng: [C]**  
> **Giải thích:** Đặt trẻ nằm sấp đầu thấp dốc xuống trên cẳng tay, dùng gót bàn tay vỗ 5 lần dứt khoát giữa 2 bả vai, lật ngửa ấn ngực 5 lần và làm sạch khoang miệng mũi.

---

### Câu 18 [tp-18] - Sơ cứu ong đốt
- **Câu hỏi:** **Cách lấy ngòi nọc độc của ong ra khỏi da an toàn và đúng kỹ thuật nhất là gì?**
- **Nguồn tham khảo:** Cấp cứu Độc chất & Dị ứng

**Các lựa chọn:**
- **[A]** Dùng nhíp bóp chặt vào túi nọc để nhổ thẳng lên 
- **[B]** Dùng mép thẻ nhựa cứng (hoặc móng tay) gạt nhẹ ngang sát bề mặt da *(Đáp án đúng)*
- **[C]** Dùng kim nhọn chọc thủng vết đốt 
- **[D]** Nặn thật mạnh xung quanh vết đốt cho ra hết nọc 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Dùng thẻ cứng gạt ngang giúp đẩy ngòi ra mà không bóp vỡ túi nọc. Nếu dùng nhíp bóp vào túi nọc sẽ vô tình bơm thêm nọc độc vào sâu trong da.

---

### Câu 19 [tp-19] - Sơ cấp cứu chấn thương đầu và tủy
- **Câu hỏi:** **Nạn nhân ngã từ trên cao nghi ngờ chấn thương cột sống cổ, nguyên tắc cố định bất động sống còn là:**
- **Nguồn tham khảo:** Hướng dẫn Cấp cứu Chấn thương Đầu & Tủy sống

**Các lựa chọn:**
- **[A]** Luôn giữ thẳng trục đầu - cổ - thân mình, không cúi gập hay xoay lắc đầu nạn nhân *(Đáp án đúng)*
- **[B]** Nâng đầu nạn nhân gối thật cao lên 
- **[C]** Cho nạn nhân ngồi dậy uống nước đường 
- **[D]** Xoay đầu nạn nhân sang hai bên để kiểm tra biên độ cổ 

> [!TIP]
> **Đáp án đúng: [A]**  
> **Giải thích:** Mọi cử động gập hoặc xoay cổ có thể khiến mảnh xương vỡ chèn ép cắt đứt tủy sống gây liệt toàn thân lâu dài hoặc tử vong ngay lập tức.

---

### Câu 20 [tp-20] - Bị bong gân cổ tay, cổ chân: Phải
- **Câu hỏi:** **Trong 48 giờ đầu sau khi bị bong gân cấp tính, hành động nào sau đây là SAI LẦM nghiêm trọng cần tránh?**
- **Nguồn tham khảo:** Phục hồi chức năng & Y học Thể thao

**Các lựa chọn:**
- **[A]** Nghỉ ngơi và hạn chế vận động khớp bị tổn thương 
- **[B]** Chườm túi lạnh hoặc bọc đá 15-20 phút 
- **[C]** Xoa bóp dầu nóng, cồn rượu thuốc hoặc ngâm nước nóng *(Đáp án đúng)*
- **[D]** Băng ép nhẹ bằng băng thun để giảm sưng 

> [!TIP]
> **Đáp án đúng: [C]**  
> **Giải thích:** Nhiệt nóng từ dầu gió, rượu thuốc làm giãn mạch máu khiến máu dồn về vùng tổn thương nhiều hơn, gây sưng phù nề và tụ máu nặng nề hơn (tuân thủ nguyên tắc R.I.C.E).

---

### Câu 21 [tp-21] - Xử lý hạ đường huyết ở người tiểu
- **Câu hỏi:** **Phát hiện bệnh nhân tiểu đường có biểu hiện hạ đường huyết (run rẩy, vã mồ hôi, hoa mắt) nhưng VẪN CÒN TỈNH TÁO, xử trí nhanh là:**
- **Nguồn tham khảo:** Hiệp hội Đái tháo đường Hoa Kỳ (ADA)

**Các lựa chọn:**
- **[A]** Cho uống ngay 1 ly nước đường, nước ngọt có ga hoặc ngậm vài viên kẹo ngọt *(Đáp án đúng)*
- **[B]** Tiêm thêm một liều insulin ngay lập tức 
- **[C]** Để nạn nhân nhịn ăn thêm 2 giờ để cơ thể tự cân bằng 
- **[D]** Bắt nạn nhân chạy bộ nhẹ để tăng tuần hoàn máu 

> [!TIP]
> **Đáp án đúng: [A]**  
> **Giải thích:** Cung cấp ngay 15g carbohydrate hấp thu nhanh (1/2 ly nước ngọt, nước đường, kẹo) giúp nâng đường huyết kịp thời tránh hôn mê hạ đường huyết.

---

### Câu 22 [tp-22] - Cách lấy dị vật trong mắt
- **Câu hỏi:** **Bụi hoặc hạt cát bay vào mắt gây xốn cộm chảy nước mắt, thao tác sơ cứu an toàn là gì?**
- **Nguồn tham khảo:** Nhãn khoa & Sơ cứu Chấn thương Mắt

**Các lựa chọn:**
- **[A]** Dùng tay dụi thật mạnh vào mí mắt 
- **[B]** Chớp mắt liên tục trong một chén nước sạch hoặc nhỏ nước muối sinh lý rửa trôi *(Đáp án đúng)*
- **[C]** Dùng móng tay cào vào giác mạc để gắp hạt bụi 
- **[D]** Nhỏ thuốc kháng sinh bừa bãi không theo đơn 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Dụi mắt khiến hạt bụi chà xát làm xước giác mạc và có thể dẫn đến loét giác mạc. Hãy chớp mắt trong nước sạch để dị vật tự trôi ra ngoài.

---

### Câu 23 [tp-23] - Những cách sơ cứu người bị ngất
- **Câu hỏi:** **Khi sơ cứu người vừa bị ngất xỉu (đã kiểm tra vẫn còn thở đều), tư thế nằm tốt nhất để hỗ trợ phục hồi là:**
- **Nguồn tham khảo:** Hướng dẫn Sơ cấp cứu Ban đầu

**Các lựa chọn:**
- **[A]** Ngồi thẳng lưng trên ghế 
- **[B]** Nằm ngửa trên mặt phẳng thoáng khí và nâng cao hai chân khoảng 20-30cm *(Đáp án đúng)*
- **[C]** Nằm sấp áp mặt xuống gối 
- **[D]** Đứng tựa vào tường 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Nâng cao hai chân hơn tim khoảng 20-30cm giúp hồi lưu máu tĩnh mạch về tim và não nhanh hơn, giúp nạn nhân sớm hồi phục tri giác.

---

### Câu 24 [tp-24] - Sơ cứu khi bị rắn cắn (rắn độc):
- **Câu hỏi:** **Khi bị rắn độc cắn vào cẳng chân, phương pháp sơ cứu nào sau đây được y học không nên làm?**
- **Nguồn tham khảo:** Trung tâm Chống độc - Bệnh viện Bạch Mai

**Các lựa chọn:**
- **[A]** Cố định bất động chi bị cắn và để thấp hơn tim 
- **[B]** Rửa sạch nhẹ nhàng bằng nước muối hoặc xà phòng 
- **[C]** Rạch vết cắn, cố dùng miệng hút nọc hoặc ga-rô siết nghẹt chi *(Đáp án đúng)*
- **[D]** Nhanh chóng chuyển nạn nhân đến bệnh viện có huyết thanh kháng nọc 

> [!TIP]
> **Đáp án đúng: [C]**  
> **Giải thích:** Rạch vết cắn hay hút nọc không loại bỏ được nọc độc mà còn gây nhiễm trùng nặng, hoại tử mô và nguy cơ ngộ độc cho người hút nọc.

---

### Câu 25 [tp-25] - Nhồi máu cơ tim
- **Câu hỏi:** **Nạn nhân xuất hiện cơn đau thắt ngực dữ dội đè nặng sau xương ức, vã mồ hôi nghi do nhồi máu cơ tim. Tư thế nghỉ ngơi phù hợp nhất là:**
- **Nguồn tham khảo:** Chuẩn Cấp cứu Tim mạch Hoa Kỳ (AHA)

**Các lựa chọn:**
- **[A]** Nằm sấp buông thõng hai tay 
- **[B]** Tư thế nửa nằm nửa ngồi (tựa lưng góc 45 độ), nới lỏng trang phục và nghỉ ngơi hoàn toàn *(Đáp án đúng)*
- **[C]** Đi bộ nhẹ nhàng xung quanh phòng 
- **[D]** Nằm dốc ngược chân lên cao 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Tư thế nửa nằm nửa ngồi giúp giảm áp lực máu dồn về tim, giảm gánh nặng co bóp cho cơ tim đang thiếu máu cục bộ và giúp phổi hô hấp dễ dàng hơn.

---

### Câu 26 [tp-26] - Chảy máu cam
- **Câu hỏi:** **Động tác chuẩn xác khi sơ cứu người bị chảy máu cam (chảy máu mũi) là:**
- **Nguồn tham khảo:** Tai Mũi Họng & Sơ cứu Cộng đồng

**Các lựa chọn:**
- **[A]** Ngửa cổ ra sau thật sâu và giơ hai tay lên cao 
- **[B]** Ngồi thẳng lưng, hơi cúi đầu nhẹ về phía trước và dùng ngón tay bóp chặt hai cánh mũi trong 10-15 phút *(Đáp án đúng)*
- **[C]** Nằm ngửa nhét khăn giấy sâu vào trong lỗ mũi 
- **[D]** Cúi gập người sát đất và thổi mạnh mũi 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Cúi nhẹ đầu về phía trước để máu chảy ra ngoài. Nếu ngửa cổ ra sau, máu sẽ chảy ngược xuống họng gây sặc vào khí quản hoặc nôn mửa dạ dày.

---

### Câu 27 [tp-27] - Chấn thương bụng
- **Câu hỏi:** **Trong tai nạn có vết thương thấu bụng khiến một đoạn ruột bị lòi ra ngoài ổ bụng, cách xử trí đúng là gì?**
- **Nguồn tham khảo:** Hướng dẫn Sơ cấp cứu Chấn thương - Bộ Y tế

**Các lựa chọn:**
- **[A]** Cố gắng dùng tay ấn đẩy phần ruột lòi vào lại trong ổ bụng 
- **[B]** Dùng gạc hoặc khăn sạch thấm ẩm nước muối vô trùng đắp nhẹ che phủ lên đoạn ruột rồi băng cố định lỏng *(Đáp án đúng)*
- **[C]** Rắc kháng sinh bột trực tiếp lên quai ruột 
- **[D]** Cho nạn nhân uống nước đá để giảm đau 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Tối đa không nên cố ấn nhét tạng trở lại vì gây nhiễm trùng phúc mạc toàn thể. Hãy bảo vệ bằng gạc ẩm vô khuẩn để giữ ruột không bị khô hoại tử.

---

### Câu 28 [tp-28] - Chấn thương bụng
- **Câu hỏi:** **Nạn nhân bị một thanh kim loại đâm xuyên cắm chặt vào ổ bụng tại hiện trường tai nạn, việc làm cần thiết là:**
- **Nguồn tham khảo:** Hướng dẫn Sơ cấp cứu Chấn thương - Bộ Y tế

**Các lựa chọn:**
- **[A]** Rút thanh kim loại ra ngay lập tức để khử trùng vết thương 
- **[B]** Giữ nguyên thanh kim loại tại chỗ, chèn gạc xung quanh để cố định dị vật rồi chuyển cấp cứu *(Đáp án đúng)*
- **[C]** Cố xoay thanh kim loại xem có găm vào xương không 
- **[D]** Cho nạn nhân ăn nhẹ trước khi di chuyển 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Dị vật đang có tác dụng nút cầm máu tạm thời. Rút dị vật ra tại hiện trường sẽ giải phóng áp lực gây chảy máu ồ ạt trong ổ bụng dẫn đến tử vong nhanh chóng.

---

### Câu 29 [tp-29] - Chi bị đứt lìa
- **Câu hỏi:** **Quy trình bảo quản phần chi thể bị đứt lìa (ngón tay, bàn tay) để vận chuyển đến bệnh viện vi phẫu đúng chuẩn là:**
- **Nguồn tham khảo:** Cấp cứu Ngoại khoa Vi phẫu & Ghép tạng

**Các lựa chọn:**
- **[A]** Thả trực tiếp phần chi thể ngập vào trong xô đá lạnh 
- **[B]** Rửa sạch nhẹ bằng nước muối, bọc trong gạc ẩm sạch, cho vào túi nilon buộc kín rồi mới đặt túi vào thùng nước đá mát *(Đáp án đúng)*
- **[C]** Ngâm chi thể vào dung dịch cồn 90 độ sát khuẩn 
- **[D]** Bỏ chi thể vào ngăn đá tủ lạnh đóng băng hoàn toàn 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Phải bảo quản lạnh gián tiếp (qua túi nilon kín). Nếu để chi thể tiếp xúc trực tiếp đá lạnh sẽ gây bỏng lạnh và làm chết tế bào thần kinh, mạch máu vi phẫu.

---

### Câu 30 [tp-30] - Bỏng ở trẻ em
- **Câu hỏi:** **Trẻ em bị bỏng nước sôi ở vùng đùi, tại sao khuyến cáo tránh dùng nước đá đóng băng để chườm?**
- **Nguồn tham khảo:** Chuẩn Bỏng Nhi khoa Quốc tế

**Các lựa chọn:**
- **[A]** Vì đá lạnh làm nước sôi bốc hơi nhanh hơn 
- **[B]** Vì diện tích da trẻ mỏng, chườm đá lạnh đột ngột dễ gây bỏng lạnh cục bộ và hạ thân nhiệt nguy hiểm *(Đáp án đúng)*
- **[C]** Vì đá lạnh làm vết bỏng liền da quá nhanh tạo sẹo co rút 
- **[D]** Vì làm loãng các enzym trên bề mặt da 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Trung tâm điều nhiệt của trẻ chưa hoàn thiện. Chườm đá lạnh trực tiếp gây co mạch đột ngột làm thiếu máu nuôi da và dễ dẫn đến hạ thân nhiệt toàn thân sốc bỏng.

---

### Câu 31 [tp-31] - Bỏng hóa chất
- **Câu hỏi:** **Khi nạn nhân bị hóa chất tẩy rửa công nghiệp bắn vào da hoặc mắt, bước sơ cứu đầu tiên cần làm liên tục là gì?**
- **Nguồn tham khảo:** Chuẩn Cấp cứu Độc chất & Hóa chất

**Các lựa chọn:**
- **[A]** Tìm hóa chất đối kháng (axit trung hòa kiềm hoặc ngược lại) 
- **[B]** Rửa xối liên tục dưới vòi nước sạch chảy nhẹ trong ít nhất 15-20 phút *(Đáp án đúng)*
- **[C]** Bôi dầu dừa hoặc mỡ trăn để phủ kín bề mặt da 
- **[D]** Băng kín lại ngay lập tức để cách ly không khí 

> [!TIP]
> **Đáp án đúng: [B]**  
> **Giải thích:** Rửa xối nước sạch liên tục giúp pha loãng và cuốn trôi hóa chất. không nên dùng chất trung hòa vì phản ứng tỏa nhiệt sẽ gây bỏng nhiệt sâu thêm.

---

### Câu 32 [tp-32] - Nguyên tắc sơ cấp cứu
- **Câu hỏi:** **Trước khi tiến lại gần tiếp cận nạn nhân tại một hiện trường tai nạn, hành động tiên quyết đầu tiên của người sơ cứu là:**
- **Nguồn tham khảo:** Nguyên tắc Cấp cứu Ban đầu - Chữ thập đỏ Quốc tế

**Các lựa chọn:**
- **[A]** Quan sát và đánh giá độ an toàn của hiện trường cho chính bản thân mình *(Đáp án đúng)*
- **[B]** Lao vào nâng nạn nhân dậy ngay lập tức 
- **[C]** Tìm kiếm điện thoại và ví tiền của nạn nhân 
- **[D]** Chỉ tập trung vào người chảy máu nhiều nhất bất kể môi trường 

> [!TIP]
> **Đáp án đúng: [A]**  
> **Giải thích:** Nguyên tắc bất di bất dịch của sơ cấp cứu: Đảm bảo hiện trường an toàn (tránh điện hở, khí độc, sập đổ, cháy nổ). Không biến người sơ cứu thành nạn nhân thứ hai.

---

## Phần VII: Thẻ ghi nhớ Flashcard 3D và bảng tra cứu nhanh

### 7.1. Cách học bằng thẻ Flashcard 3D
Thẻ Flashcard 3D có hai mặt để bạn tự kiểm tra trí nhớ:
- **Mặt trước:** Ghi tên tình huống và dấu hiệu nhận biết nguy hiểm.
- **Mặt sau:** Ghi ngắn gọn việc cần làm ngay và sai lầm phổ biến nên tránh.

### 7.2. Bảng tra cứu nhanh các tình huống khẩn cấp
| Tình huống | Dấu hiệu nhận biết | Việc cần làm ngay | Điều cần tránh |
| :--- | :--- | :--- | :--- |
| **Ngưng tim** | Bất tỉnh, ngừng thở hoặc thở ngáp | Gọi 115 và ép tim (CPR) ngay | Chờ xe cấp cứu mà không ép tim |
| **Hóc dị vật người lớn** | Ôm cổ, không nói, không ho được | Vỗ lưng 5 lần, ép bụng 5 lần | Móc họng mù quáng, cho uống nước |
| **Hóc dị vật trẻ < 1 tuổi** | Trẻ không khóc được, tím tái | Vỗ lưng 5 lần, ấn ngực 5 lần | Ép bụng Heimlich cho trẻ dưới 1 tuổi |
| **Đột quỵ** | Méo miệng, yếu tay, nói ngọng | Cho nằm yên, nhớ giờ khởi phát, gọi 115 | Cạo gió, chích máu đầu ngón tay |
| **Bỏng nhiệt** | Da đỏ rát, phồng rộp | Xối hoặc ngâm nước mát 15–20 phút | Bôi kem đánh răng, nước mắm, đá lạnh |
| **Chảy máu nhiều** | Máu phun tia hoặc chảy xối xả | Dùng gạc sạch ép chặt trực tiếp | Rắc bột thuốc lào, tháo gạc cũ ra xem |
| **Co giật, động kinh** | Co cứng, giật tay chân, sùi bọt mép | Kê đồ mềm dưới đầu, dọn đồ sắc nhọn | Nhét thìa/đũa vào miệng, giữ chặt tay chân |
| **Đuối nước** | Ngạt nước, bất tỉnh, ngừng thở | Đưa lên bờ, làm CPR ngay | Vác dốc ngược chạy quanh, lăn lu |
| **Rắn độc cắn** | Vết cắn sưng đau nhanh | Nằm yên, giữ chi thấp hơn tim, đi viện | Rạch vết thương, hút nọc bằng miệng |
| **Điện giật** | Dính nguồn điện, co cứng người | Ngắt cầu dao điện trước khi lại gần | Chạm tay trần vào người đang bị giật |
| **Say nắng, sốc nhiệt** | Sốt cao, da nóng, lơ mơ | Đưa vào chỗ mát, chườm mát, gọi 115 | Ép uống nước khi đang lơ mơ |
| **Đứt lìa chi thể** | Ngón tay hoặc chi bị tách rời | Băng cầm máu; bọc chi vào túi sạch rồi ướp đá gián tiếp | Ngâm trực tiếp phần chi đứt vào nước đá |

---

## Phần VIII: Cách gọi cấp cứu 115 và thông tin đóng góp

### 8.1. Cách cung cấp thông tin khi gọi Tổng đài 115
Khi gọi 115, bạn nên nói rõ 4 thông tin sau theo quy tắc **3W1H**:
1. **WHERE (Ở đâu):** Nói rõ địa chỉ (số nhà, tên đường, phường/xã) và các điểm mốc dễ thấy gần đó.
2. **WHAT (Chuyện gì):** Kể ngắn gọn chuyện vừa xảy ra (tai nạn xe, đuối nước, ngất xỉu...).
3. **WHO (Ai bị nạn):** Có bao nhiêu người bị thương, họ còn tỉnh hay đã ngất, có còn thở không.
4. **HOW (Đang làm gì):** Báo cho nhân viên y tế biết bạn đang sơ cứu thế nào. **Lưu ý: Nghe theo hướng dẫn của tổng đài viên và không cúp máy trước khi họ cho phép.**

### 8.2. Thông tin liên hệ và đóng góp
- **Nhóm thực hiện:** Sinh viên Trường Đại học Công nghệ Thông tin – ĐHQG-HCM (UIT), đồ án môn IE104.
- **Kênh góp ý:** Qua biểu mẫu tại trang [Liên hệ & Đóng góp](file:///f:/UIT_Document/HK5/IE104/project%20MedFA/contact.html). Nhóm luôn sẵn sàng tiếp nhận phản hồi để chỉnh sửa và cập nhật nội dung ngày càng chính xác hơn.

---
*Tài liệu nội dung dự án MedFA.*