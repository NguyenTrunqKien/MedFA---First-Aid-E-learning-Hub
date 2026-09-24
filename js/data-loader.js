/**
 * MedFA Data Loader Module
 * Responsible for fetching and parsing JSON datasets (topics)
 * Supports memory caching and graceful fallback if running via local file:// protocol
 */

const DataLoader = (() => {
  // In-memory cache
  let topicsCache = null;

  // Embedded Fallback Data (ensures site works even if opened directly via file://)
  const FALLBACK_TOPICS = [
    {
      id: "hoc-di-vat",
      title: "Hóc dị vật (Nghẹn)",
      fullTitle: "Hóc dị vật (Nghẹn & Tắc đường thở)",
      category: "tre-em",
      categoryLabel: "Trẻ em",
      badgeType: "Khẩn cấp",
      badgeClass: "bg-error-container text-on-error-container",
      criticalLevel: "high",
      readTime: "2 phút",
      standard: "Chuẩn ERC & AHA 2025",
      iconSvg: '<svg aria-hidden="true" class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\"></polyline></svg>',
      shortDesc: "Cách thực hiện nghiệm pháp Heimlich để tống dị vật ra khỏi đường thở cho người lớn và trẻ nhỏ.",
      lead: "Dị vật xâm nhập gây cản trở đường thở cấp tính. Não bộ sẽ bắt đầu tổn thương không thể phục hồi chỉ sau 4 phút thiếu oxy nếu không được can thiệp đúng phương pháp ngay tại hiện trường.",
      emergencyAlert: "GỌI 115 NGAY LẬP TỨC nếu nạn nhân bất tỉnh, tím tái môi đầu chi hoặc không còn phát ra tiếng thở.",
      timeline: [
        { time: "0 - 1 phút", status: "Khó thở, hoảng loạn, ôm cổ họng", level: "safe" },
        { time: "1 - 2 phút", status: "Tím tái môi, mất dần phản xạ ho", level: "warning" },
        { time: "2 - 4 phút", status: "Ngất lịm, mất tri giác, ngừng thở", level: "danger" },
        { time: "> 4 phút", status: "Tổn thương não vĩnh viễn hoặc tử vong", level: "critical" }
      ],
      steps: [
        { stepNumber: 1, title: "Đánh giá mức độ tắc nghẽn", desc: "Hỏi nạn nhân 'Bạn có bị nghẹn không?'. Nếu nạn nhân vẫn nói, khóc hoặc ho mạnh được: KHUYẾN KHÍCH HO MẠNH, tuyệt đối KHÔNG can thiệp thô bạo." },
        { stepNumber: 2, title: "5 vỗ lưng dứt khoát (Back Blows)", desc: "Đỡ ngực nạn nhân nghiêng người về phía trước. Dùng gót bàn tay vỗ mạnh dứt khoát 5 lần vào khoảng giữa 2 xương bả vai." },
        { stepNumber: 3, title: "5 lần ép bụng Heimlich (Abdominal Thrusts)", desc: "Vòng hai tay quanh eo nạn nhân. Đặt nắm đấm vào vùng thượng vị (trên rốn, dưới mũi ức), giật mạnh VÀO TRONG VÀ LÊN TRÊN." },
        { stepNumber: 4, title: "Lặp lại chu kỳ 5 vỗ lưng : 5 ép bụng", desc: "Tiếp tục luân phiên cho đến khi dị vật bật ra hoặc nạn nhân thở lại bình thường." },
        { stepNumber: 5, title: "Nếu bất tỉnh: Chuyển sang CPR", desc: "Đặt nạn nhân nằm ngửa trên mặt sàn phẳng cứng, gọi 115 và bắt đầu ép tim ngoài lồng ngực." }
      ],
      dos: [
        "Khuyến khích nạn nhân tiếp tục ho mạnh nếu họ còn ho được.",
        "Cúi người nạn nhân về phía trước khi vỗ lưng.",
        "Đối với trẻ sơ sinh (<1 tuổi): Dùng 5 vỗ lưng và 5 ấn ngực bằng 2 ngón tay."
      ],
      donts: [
        "KHÔNG móc họng mù quáng khi không nhìn thấy rõ dị vật.",
        "KHÔNG cho uống nước hay nuốt cơm để cố đẩy dị vật xuống.",
        "KHÔNG ép bụng cho phụ nữ mang thai tháng cuối (chuyển sang ép ngực)."
      ]
    },
    {
      id: "bong-cap-do-1-2",
      title: "Bỏng cấp độ 1 & 2",
      fullTitle: "Sơ cứu Bỏng nhiệt cấp độ 1 & 2 (Nước sôi, Lửa, Bô xe)",
      category: "sinh-hoat",
      categoryLabel: "Sinh hoạt",
      badgeType: "Sinh hoạt",
      badgeClass: "bg-surface-container-high text-on-surface-variant",
      criticalLevel: "medium",
      readTime: "3 phút",
      standard: "Chuẩn Hội Bỏng Quốc tế (ISBI)",
      iconSvg: '<svg aria-hidden="true" class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"></path></svg>',
      shortDesc: "Các bước làm mát vết bỏng, sơ cứu chống nhiễm trùng và những điều tuyệt đối không được làm.",
      lead: "Tổn thương da do nhiệt độ cao gây đau đớn dữ dội và nguy cơ nhiễm trùng. Việc ngâm rửa đúng cách trong 15-20 phút đầu quyết định 80% mức độ để lại sẹo.",
      emergencyAlert: "Đưa đến cơ sở y tế ngay nếu diện tích bỏng lớn hơn 1 bàn tay, bỏng ở mặt, khớp, bàn tay hoặc vùng kín.",
      timeline: [
        { time: "0 - 20 phút", status: "Thời gian vàng ngâm xả nước mát làm dịu", level: "safe" },
        { time: "20 - 60 phút", status: "Bảo vệ màng bóng nước, băng gạc vô khuẩn", level: "warning" },
        { time: "> 1 giờ", status: "Nguy cơ thoát dịch và nhiễm trùng mô tế bào", level: "danger" }
      ],
      steps: [
        { stepNumber: 1, title: "Loại bỏ nguồn nhiệt và dị vật", desc: "Nhanh chóng đưa nạn nhân rời khỏi vùng nguy hiểm. Cởi bỏ nhẹ nhàng trang sức, quần áo dính chất nóng trước khi vết bỏng sưng phù." },
        { stepNumber: 2, title: "Làm mát bằng nước sạch 15-20 phút", desc: "Xả nước mát sạch (15-25°C) liên tục lên vùng bỏng ít nhất 15-20 phút cho đến khi dịu đau. Tuyệt đối KHÔNG dùng đá lạnh." },
        { stepNumber: 3, title: "Che phủ gạc sạch vô khuẩn", desc: "Dùng gạc y tế vô khuẩn hoặc màng bọc thực phẩm sạch che phủ lỏng lẻo lên vết bỏng. Không băng siết chặt." },
        { stepNumber: 4, title: "Bù nước và chuyển tuyến y tế", desc: "Cho nạn nhân uống nước điện giải hoặc nước ấm nếu tỉnh táo. Đưa đến cơ sở y tế nếu diện tích bỏng rộng." }
      ],
      dos: [
        "Ngâm hoặc xả nước sạch liên tục 15-20 phút ngay sau khi bị bỏng.",
        "Giữ nguyên các bọng nước tự nhiên, tuyệt đối không chọc vỡ.",
        "Che phủ vết bỏng bằng gạc ẩm vô khuẩn hoặc màng bọc thực phẩm sạch."
      ],
      donts: [
        "KHÔNG bôi kem đánh răng, nước mắm, mỡ trăn, trứng gà lên vết bỏng.",
        "KHÔNG chườm đá lạnh trực tiếp (gây bỏng lạnh và hoại tử mô).",
        "KHÔNG tự ý chọc thủng bóng nước."
      ]
    },
    {
      id: "chay-mau-nghiem-trong",
      title: "Chảy máu nghiêm trọng",
      fullTitle: "Sơ cứu Vết thương Chảy máu Nghiêm trọng & Sử dụng Ga-rô",
      category: "sinh-hoat",
      categoryLabel: "Chấn thương",
      badgeType: "Chấn thương",
      badgeClass: "bg-primary-fixed text-primary",
      criticalLevel: "high",
      readTime: "4 phút",
      standard: "Khuyến nghị Stop the Bleed & Red Cross",
      iconSvg: '<svg aria-hidden="true" class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z\"></path><path d=\"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97\"></path></svg>',
      shortDesc: "Kỹ thuật băng ép trực tiếp cầm máu và cách sử dụng ga-rô trong tình huống khẩn cấp.",
      lead: "Chảy máu động mạch có thể dẫn đến sốc mất máu tử vong chỉ trong vài phút. Ép trực tiếp tại chỗ là kỹ năng cứu mạng đầu tiên.",
      emergencyAlert: "GỌI 115 NGAY LẬP TỨC khi máu phun thành tia, thấm đẫm nhiều lớp vải hoặc nạn nhân có dấu hiệu vã mồ hôi, da tái lạnh.",
      timeline: [
        { time: "0 - 3 phút", status: "Mất máu cấp, nhịp tim tăng nhanh", level: "warning" },
        { time: "3 - 5 phút", status: "Tụt huyết áp, sốc mất máu, ngất", level: "danger" },
        { time: "> 5 phút", status: "Trụy mạch tuần hoàn, nguy cơ tử vong", level: "critical" }
      ],
      steps: [
        { stepNumber: 1, title: "Bảo hộ và đè ép trực tiếp", desc: "Dùng gạc sạch đè thật chặt trực tiếp lên miệng vết thương đang chảy máu ít nhất 5-10 phút liên tục." },
        { stepNumber: 2, title: "Băng ép cố định và nâng cao chi", desc: "Quấn băng thun quanh vết thương để giữ áp lực ép. Nâng cao chi bị thương hơn tầm tim nếu không gãy xương." },
        { stepNumber: 3, title: "Thêm lớp mới nếu máu vẫn thấm qua", desc: "Tuyệt đối không gỡ lớp gạc cũ ra, đè thêm gạc mới lên trên và siết chặt hơn." },
        { stepNumber: 4, title: "Dùng Ga-rô nếu máu phun tia ở tay chân", desc: "Đặt ga-rô cách vết thương 5-7cm về phía gốc chi, siết chặt đến khi máu ngừng chảy và ghi rõ giờ đặt ga-rô." }
      ],
      dos: [
        "Ép chặt tay liên tục lên vị trí vết thương ít nhất 5 phút.",
        "Ghi rõ thời gian đặt ga-rô (giờ:phút) để báo cho bác sĩ cấp cứu.",
        "Giữ ấm cho nạn nhân để phòng tránh sốc hạ thân nhiệt."
      ],
      donts: [
        "KHÔNG tháo băng cũ ra kiểm tra khi máu đang cầm.",
        "KHÔNG đặt ga-rô trực tiếp lên khớp khuỷu tay hoặc đầu gối.",
        "KHÔNG tự ý nới lỏng ga-rô khi chưa có nhân viên y tế hỗ trợ."
      ]
    },
    {
      id: "ngung-tuan-hoan-cpr",
      title: "Ngừng tuần hoàn (Ép tim CPR)",
      fullTitle: "Hồi sinh Tim Phổi (CPR) & Sử dụng Máy sốc điện tự động AED",
      category: "benh-ly",
      categoryLabel: "Bệnh lý",
      badgeType: "Sinh tử",
      badgeClass: "bg-tertiary-fixed text-tertiary font-bold",
      criticalLevel: "critical",
      readTime: "5 phút",
      standard: "Phác đồ Quốc tế AHA & ERC 2025",
      iconSvg: '<svg aria-hidden="true" class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"></path><path d=\"M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27\"></path></svg>',
      shortDesc: "Hướng dẫn thực hiện hồi sinh tim phổi (CPR) kết hợp hơi thở nhân tạo đúng nhịp độ.",
      lead: "Khi tim ngừng đập, dòng máu nuôi dưỡng não ngưng trệ ngay. Mỗi phút trôi qua không có CPR làm giảm 10% cơ hội sống sót của nạn nhân.",
      emergencyAlert: "HÔ TO GỌI NGƯỜI HỖ TRỢ, GỌI 115 VÀ TÌM MÁY AED NGAY LẬP TỨC. Bắt đầu ép tim ngay không được chậm trễ.",
      timeline: [
        { time: "0 - 4 phút", status: "Thời gian vàng phục hồi não tối ưu", level: "safe" },
        { time: "4 - 6 phút", status: "Bắt đầu tổn thương tế bào não", level: "warning" },
        { time: "6 - 10 phút", status: "Tổn thương não diện rộng không hồi phục", level: "danger" },
        { time: "> 10 phút", status: "Chết não lâm sàng, tử vong", level: "critical" }
      ],
      steps: [
        { stepNumber: 1, title: "Kiểm tra an toàn và phản xạ nạn nhân", desc: "Đảm bảo hiện trường an toàn. Vỗ vai và gọi to để kiểm tra ý thức nạn nhân. Quan sát lồng ngực xem có thở bình thường không." },
        { stepNumber: 2, title: "Gọi 115 và tìm máy AED", desc: "Chỉ định rõ một người xung quanh gọi cấp cứu 115 và tìm máy AED ngay." },
        { stepNumber: 3, title: "Ép tim nhịp 100-120 lần/phút", desc: "Đặt gót bàn tay ở giữa ngực. Ép lún sâu 5-6 cm với tần số 100-120 nhịp/phút, để ngực nở hoàn toàn sau mỗi lần ép." },
        { stepNumber: 4, title: "Thổi ngạt 30:2 hoặc ép tim liên tục", desc: "Thực hiện 30 lần ép tim kèm 2 lần thổi ngạt. Nếu không thổi ngạt được, tiếp tục ép tim liên tục không ngừng." },
        { stepNumber: 5, title: "Dán máy AED ngay khi có", desc: "Mở máy và làm theo hướng dẫn giọng nói từ AED. Đảm bảo không ai chạm vào nạn nhân khi phóng điện." }
      ],
      dos: [
        "Ép tim nhanh và mạnh: tần số 100 - 120 nhịp/phút.",
        "Ép đủ độ sâu (5 - 6 cm đối với người lớn) và để ngực nở lại hoàn toàn.",
        "Đổi người ép tim mỗi 2 phút để duy trì chất lượng lực ép."
      ],
      donts: [
        "KHÔNG tì đè liên tục lên ngực mà không để lồng ngực nở về vị trí cũ.",
        "KHÔNG dừng ép tim quá 10 giây giữa các chu kỳ.",
        "KHÔNG chạm vào nạn nhân khi máy AED đang phóng điện sốc tim."
      ]
    },
    {
      id: "soc-nhiet-say-nang",
      title: "Sốc nhiệt & Say nắng",
      fullTitle: "Sơ cứu Sốc nhiệt Thân nhiệt cao (Heatstroke) & Say nắng",
      category: "ngoai-troi",
      categoryLabel: "Ngoài trời",
      badgeType: "Ngoài trời",
      badgeClass: "bg-secondary-container text-on-secondary-container",
      criticalLevel: "medium",
      readTime: "3 phút",
      standard: "Hướng dẫn Y học Lao động & Thể thao",
      iconSvg: '<svg aria-hidden="true" class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M12 9a4 4 0 0 0-2 7.5\"></path><path d=\"M12 3v2\"></path><path d=\"m6.6 18.4-1.4 1.4\"></path><path d=\"M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z\"></path><path d=\"M4 13H2\"></path><path d=\"M6.34 7.34 4.93 5.93\"></path></svg>',
      shortDesc: "Nhận diện dấu hiệu đột quỵ nhiệt và các bước hạ thân nhiệt cấp tốc an toàn.",
      lead: "Sốc nhiệt xảy ra khi cơ thể quá nóng vượt quá 40°C gây tổn thương não và nội tạng. Hạ nhiệt tại chỗ ngay lập tức là ưu tiên số một.",
      emergencyAlert: "GỌI 115 NGAY LẬP TỨC nếu nạn nhân lú lẫn, nói nhảm, co giật hoặc hôn mê do nhiệt độ cao.",
      timeline: [
        { time: "Giai đoạn 1", status: "Chuột rút nhiệt, mệt mỏi, vã mồ hôi nhiều", level: "safe" },
        { time: "Giai đoạn 2", status: "Kiệt sức vì nhiệt, chóng mặt, buồn nôn", level: "warning" },
        { time: "Giai đoạn 3", status: "Sốc nhiệt (>40°C), da khô nóng, mê sảng", level: "critical" }
      ],
      steps: [
        { stepNumber: 1, title: "Di chuyển vào nơi râm mát", desc: "Đưa ngay nạn nhân vào chỗ râm mát, phòng có điều hòa, cởi bớt quần áo dày." },
        { stepNumber: 2, title: "Hạ nhiệt cấp tốc", desc: "Lau nước mát khắp người kết hợp quạt mát. Chườm mát vào cổ, nách và bẹn." },
        { stepNumber: 3, title: "Bù nước nếu tỉnh táo", desc: "Cho uống từng ngụm nhỏ nước mát hoặc oresol nếu nạn nhân nuốt tốt." },
        { stepNumber: 4, title: "Theo dõi sát tri giác", desc: "Liên tục theo dõi nhịp thở. Đưa đi cấp cứu nếu nạn nhân lơ mơ hoặc thân nhiệt không giảm." }
      ],
      dos: [
        "Hạ nhiệt tích cực bằng nước mát và quạt gió ngay tại hiện trường.",
        "Đặt túi chườm vào các vùng có mạch máu lớn: cổ, nách, bẹn.",
        "Gọi hỗ trợ y tế 115 khi nạn nhân có biểu hiện rối loạn ý thức."
      ],
      donts: [
        "KHÔNG cho nạn nhân uống thuốc hạ sốt Paracetamol/Aspirin (không hiệu quả trong sốc nhiệt).",
        "KHÔNG cho uống nước ngọt có ga hoặc đồ uống có cồn, caffeine.",
        "KHÔNG ngâm nạn nhân lơ mơ vào bồn nước đá sâu."
      ]
    },
    {
      id: "co-giat-dong-kinh",
      title: "Co giật & Động kinh",
      fullTitle: "Xử trí Cơn Co Giật & Cơn Động Kinh Cấp Tính",
      category: "benh-ly",
      categoryLabel: "Bệnh lý",
      badgeType: "Bệnh lý",
      badgeClass: "bg-surface-container-high text-on-surface-variant",
      criticalLevel: "medium",
      readTime: "4 phút",
      standard: "Hiệp hội Động kinh Quốc tế (ILAE)",
      iconSvg: '<svg aria-hidden="true" class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3\"></path><path d=\"M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4\"></path><circle cx=\"20\" cy=\"10\" r=\"2\"></circle></svg>',
      shortDesc: "Bảo vệ nạn nhân khỏi chấn thương trong cơn co giật, tư thế phục hồi sau khi tỉnh.",
      lead: "Co giật thường tự dứt sau 1-3 phút. Vai trò then chốt của người sơ cứu là BẢO VỆ NẠN NHÂN KHỎI VA ĐẬP VÀ CHẤN THƯƠNG.",
      emergencyAlert: "GỌI 115 NGAY LẬP TỨC nếu cơn co giật kéo dài trên 5 phút, hoặc co giật tái diễn liên tiếp.",
      timeline: [
        { time: "0 - 1 phút", status: "Giai đoạn co cứng toàn thân, có thể tím môi", level: "warning" },
        { time: "1 - 3 phút", status: "Giai đoạn co giật nhịp nhàng các cơ, sùi bọt mép", level: "danger" },
        { time: "Sau cơn giật", status: "Giai đoạn lú lẫn, thở sâu, buồn ngủ phục hồi", level: "safe" }
      ],
      steps: [
        { stepNumber: 1, title: "Bảo vệ đầu nạn nhân", desc: "Đỡ nạn nhân nằm xuống sàn, kê gối hoặc áo mềm dưới đầu, dẹp các vật sắc nhọn ra xa." },
        { stepNumber: 2, title: "Nới lỏng trang phục và bấm giờ", desc: "Nới cúc áo cổ, thắt lưng và quan sát đồng hồ bấm thời gian cơn giật." },
        { stepNumber: 3, title: "KHÔNG nhét đồ vật vào miệng", desc: "Tuyệt đối không nhét đũa, ngón tay, khăn vào miệng nạn nhân. Không ghì giữ chân tay." },
        { stepNumber: 4, title: "Nằm nghiêng an toàn sau cơn giật", desc: "Khi hết co giật, xoay người nạn nhân nằm nghiêng an toàn để thông thoáng đường thở." }
      ],
      dos: [
        "Kê vật mềm dưới đầu để tránh va đập sọ não.",
        "Ghi nhận chính xác thời gian bắt đầu và kết thúc cơn co giật.",
        "Xoay nạn nhân nằm nghiêng an toàn ngay khi cơn giật kết thúc."
      ],
      donts: [
        "TUYỆT ĐỐI KHÔNG nhét bất cứ vật gì (đũa, muỗng, chanh, ngón tay) vào miệng nạn nhân.",
        "KHÔNG ghì chặt hoặc cố định chân tay nạn nhân khi đang co giật.",
        "KHÔNG cho ăn, uống bất kỳ thứ gì cho đến khi nạn nhân hoàn toàn tỉnh táo."
      ]
    }
  ];

  /**
   * Load all first aid topics from data/topics.json
   * @returns {Promise<Array>} Array of topic objects
   */
  async function loadTopics() {
    if (topicsCache && topicsCache.length > 0) {
      return topicsCache;
    }

    try {
      const response = await fetch('data/topics.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      topicsCache = await response.json();
      return topicsCache;
    } catch (err) {
      console.warn('[DataLoader] Fetch data/topics.json failed, falling back to embedded dataset:', err);
      topicsCache = FALLBACK_TOPICS;
      return topicsCache;
    }
  }

  /**
   * Get a single topic by ID
   * @param {string} id - The topic ID (e.g. 'hoc-di-vat')
   * @returns {Promise<Object|null>}
   */
  async function getTopicById(id) {
    const topics = await loadTopics();
    if (!id) return topics[0] || null;
    return topics.find(t => t.id === id) || topics[0] || null;
  }

  /**
   * Filter topics by category
   * @param {string} category - 'all' or specific category code
   * @returns {Promise<Array>}
   */
  async function getTopicsByCategory(category) {
    const topics = await loadTopics();
    if (!category || category === 'all') {
      return topics;
    }
    return topics.filter(t => t.category === category);
  }

  /**
   * Search topics by query string
   * @param {string} query - Keyword to search
   * @returns {Promise<Array>}
   */
  async function searchTopics(query) {
    const topics = await loadTopics();
    if (!query || !query.trim()) {
      return topics;
    }

    const q = query.trim().toLowerCase();
    return topics.filter(t => {
      const titleMatch = t.title.toLowerCase().includes(q) || (t.fullTitle && t.fullTitle.toLowerCase().includes(q));
      const descMatch = t.shortDesc.toLowerCase().includes(q);
      const categoryMatch = t.category.toLowerCase().includes(q) || (t.categoryLabel && t.categoryLabel.toLowerCase().includes(q));
      return titleMatch || descMatch || categoryMatch;
    });
  }
  return {
    loadTopics,
    getTopicById,
    getTopicsByCategory,
    searchTopics,
    FALLBACK_TOPICS
  };
})();

// Export globally for browser use
if (typeof window !== 'undefined') {
  window.DataLoader = DataLoader;
}
