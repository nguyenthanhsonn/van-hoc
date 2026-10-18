import type { Landmark } from "../types";

/**
 * Danh sách các mốc địa danh văn học & lịch sử theo yêu cầu.
 * Tọa độ theo định dạng [kinh độ (longitude), vĩ độ (latitude)].
 */
export const VIETNAM_LANDMARKS: readonly Landmark[] = [
  {
    id: "moc-1-thap-ba-po-nagar",
    order: 1,
    name: "Tháp bà Po Nagar",
    workName: "Nữ thần Po Nagar",
    subtitle: "Vùng đất đền tháp Chăm Pa",
    category: "Di tích Lịch sử & Kiến trúc",
    locationName: "Đồi Cù Lao, P. Vĩnh Phước, TP. Nha Trang",
    province: "Khánh Hòa",
    coordinates: [109.1958, 12.2654],
    shortDescription:
      "Thần thoại Nữ thần Po Nagar (Mụ Dụ) kể về vị thần tối cao được sai xuống trần gian để tái lập trật tự vũ trụ, sáng tạo ra các hiện tượng tự nhiên, khai sinh tôn giáo, truyền dạy nghề nông và văn hóa xã hội, được người Chăm đời đời sùng kính.",
    story:
      "Thần thoại Nữ thần Po Nagar (Mụ Dụ) kể về vị thần tối cao được sai xuống trần gian để tái lập trật tự vũ trụ, sáng tạo ra các hiện tượng tự nhiên, khai sinh tôn giáo, truyền dạy nghề nông và văn hóa xã hội, được người Chăm đời đời sùng kính.",
    imageUrl: "/images/landmarks/thap-ba-po-nagar.jpg",
    iconType: "temple",
    color: "#f97316", // Màu cam gạch tháp Chăm
    quote: "“Gạch đỏ ngàn năm soi bóng nước / Tháp thiêng đứng đợi gió trùng khơi”",
    sections: [
      {
        title: "Huyền thoại Mẹ Xứ sở Po Nagar (Thiên Y A Na)",
        content:
          "Theo truyền tích dân gian lưu truyền qua nhiều thế kỷ, Nữ thần Po Nagar (sau này được người Việt tôn vinh là Thiên Y A Na Thánh Mẫu) giáng trần tại núi Đại An (Khánh Hòa). Bà là hiện thân của đất đai màu mỡ, hóa sinh ra lúa gạo, cây cỏ, dạy nhân dân khai hoang mở cõi, làm nghề dệt lụa và chữa lành tật bệnh cho muôn loài.",
      },
      {
        title: "Tuyệt tác kiến trúc gạch nung Chăm Pa",
        content:
          "Tọa lạc trên ngọn đồi Cù Lao cao hơn 10 mét so với mực nước biển, quần thể Tháp Bà soi bóng xuống dòng sông Cái thơ mộng. Kỹ thuật ghép nối những viên gạch nung đỏ rực khít khao không dùng mạch vữa lộ thiên đến nay vẫn là một kỳ quan kiến trúc khiến bao thế hệ thán phục.",
      },
      {
        title: "Không gian giao thoa văn hóa & Lễ hội Tháp Bà",
        content:
          "Hàng năm vào tháng 3 âm lịch, Lễ hội Tháp Bà Po Nagar được tổ chức trọng thể với các điệu múa Chăm uyển chuyển, tiếng trống Paranưng, tiếng kèn Saranai trầm bổng. Đây là biểu tượng mẫu mực của sự hòa quyện văn hóa tâm linh giữa đồng bào Chăm và người Việt.",
      },
    ],
  },
  {
    id: "moc-2-duong-len-nui-da-trang",
    order: 2,
    name: "Đường lên núi Đá Trắng",
    workName: "Po Kuk",
    subtitle: "Cung đường huyền thoại ánh sáng",
    category: "Thần thoại & Không gian Văn hóa",
    locationName: "Cung đường dẫn lên Yang Patao, Huyện Ninh Phước",
    province: "Ninh Thuận",
    coordinates: [108.905, 11.564],
    shortDescription:
      "Thần thoại Po Kuk kể về những sự việc huyền bí liên quan đến Po Kuk Parahimuk, về ánh sáng và sự luân chuyển ngày đêm, qua đó lý giải nguồn gốc một số hiện tượng tự nhiên và phong tục, tín ngưỡng của người Chăm.",
    story:
      "Thần thoại Po Kuk kể về những sự việc huyền bí liên quan đến Po Kuk Parahimuk, về ánh sáng và sự luân chuyển ngày đêm, qua đó lý giải nguồn gốc một số hiện tượng tự nhiên và phong tục, tín ngưỡng của người Chăm.",
    imageUrl: "/images/landmarks/duong-len-nui-da-trang.jpg",
    iconType: "mountain",
    color: "#eab308", // Sắc vàng rực rỡ của thần thoại ánh sáng
    quote: "“Ánh dương soi rạng ngàn lối / Ngày đêm luân chuyển huyền cơ đất trời”",
    sections: [
      {
        title: "Huyền tích Po Kuk Parahimuk và quy luật vũ trụ",
        content:
          "Trong tâm thức dân gian của người Chăm, Po Kuk Parahimuk là biểu tượng của trí tuệ và sự vận hành kỳ bí giữa ánh sáng và bóng tối. Truyền thuyết kể rằng ngài đã mở lối cho vầng nhật nguyệt soi sáng cõi nhân gian, xua tan bóng đêm hỗn mang thời khai thiên lập địa.",
      },
      {
        title: "Cung đường thiêng dẫn lối lên ngọn non cao",
        content:
          "Con đường quanh co uốn khúc giữa những sườn đồi đầy đá tảng và cây bụi gai góc của xứ nắng gió Ninh Thuận là lối mòn hành hương cổ xưa của các palei làng Chăm mỗi khi bước vào các mùa nghi lễ tạ ơn Yang trời đất.",
      },
      {
        title: "Tín ngưỡng và phong tục dân gian trường tồn",
        content:
          "Những câu chuyện truyền khẩu về Po Kuk không chỉ giải thích sự đổi thay thời tiết, mưa nắng thuận hòa mà còn đúc kết nên những bài học đạo lý về sự hòa hợp giữa con người với giới tự nhiên bao la.",
      },
    ],
  },
  {
    id: "moc-3-nui-da-trang",
    order: 3,
    name: "Cek Yang Patao - núi Đá Trắng",
    workName: "Truyền thuyết núi Yang Patao",
    subtitle: "Vùng núi huyền thoại Yang Patao",
    category: "Thắng cảnh Huyền thoại Sử thi",
    locationName: "Vùng núi Yang Patao, Huyện Ninh Phước",
    province: "Ninh Thuận",
    // Tọa độ người dùng chỉ định: 11.558092, 108.89645499999999
    coordinates: [108.896455, 11.558092],
    shortDescription:
      "Truyền thuyết núi Yang Patao kể về trận chiến đọ sức giữa Po Kei Glaong và kẻ ngoại bang Rak Bir Suer để bảo vệ xứ Chăm khỏi ách cai trị, từ đó giải thích nguồn gốc tên núi Yang Patao, các địa danh gò bãi và phong tục cúng tế truyền thống.",
    story:
      "Truyền thuyết núi Yang Patao kể về trận chiến đọ sức giữa Po Kei Glaong và kẻ ngoại bang Rak Bir Suer để bảo vệ xứ Chăm khỏi ách cai trị, từ đó giải thích nguồn gốc tên núi Yang Patao, các địa danh gò bãi và phong tục cúng tế truyền thống.",
    imageUrl: "/images/landmarks/nui-da-trang.jpg",
    iconType: "mountain",
    color: "#10b981", // Xanh ngọc lục bảo đá núi
    quote: "“Trời nắng chang chang non đá trắng / Gió ngàn ngân khúc hát trường ca”",
    sections: [
      {
        title: "Trận quyết chiến đọ sức giữa Po Kei Glaong và Rak Bir Suer",
        content:
          "Theo truyền tích cổ xứ Panduranga, để đập tan dã tâm cai trị của kẻ ngoại bang hung bạo Rak Bir Suer, người anh hùng dũng lược Po Kei Glaong đã đứng lên nghênh chiến. Trận thư hùng kinh thiên động địa diễn ra giữa chốn non cao hiểm trở đã ghi dấu ấn bất diệt trong tâm khảm của người Chăm qua bao thế hệ.",
      },
      {
        title: "Nguồn gốc tên núi Cek Yang Patao và các gò bãi",
        content:
          "Chiến thắng lẫy lừng của Po Kei Glaong đã bảo vệ trọn vẹn bờ cõi và sự tự do cho các palei làng Chăm. Từ đó, ngọn núi được tôn vinh là Cek Yang Patao (núi Vua Thần). Những dấu vết trong cuộc giao tranh cũng trở thành nguồn gốc lý giải cho các gò đồi, bãi đá hoa cương trắng kỳ vĩ phân bố quanh vùng.",
      },
      {
        title: "Phong tục cúng tế và tín ngưỡng truyền thống",
        content:
          "Hàng năm, người dân các làng Chăm lân cận tổ chức các nghi thức tế lễ hướng về đỉnh núi Cek Yang Patao để tưởng nhớ công đức tiền nhân, cầu mong sự che chở của Yang Patao cho mùa màng tươi tốt, xua đuổi tà khí và giữ vững bình yên cho xứ sở.",
      },
    ],
  },
  {
    id: "moc-4-nha-sinh-hoat-cong-dong-cham",
    order: 4,
    name: "Nhà sinh hoạt cộng đồng Chăm",
    workName: "Sử thi Dewa Muno",
    subtitle: "Không gian diễn xướng sử thi & truyện cổ",
    category: "Không gian Văn hóa Dân gian",
    locationName: "Nhà sinh hoạt cộng đồng các Palei Chăm, Huyện Ninh Phước",
    province: "Ninh Thuận",
    coordinates: [108.922, 11.545],
    shortDescription:
      "Dewa Muno là sử thi dân gian mang màu sắc kỳ ảo, kể về hành trình tìm cha của hoàng tử Dewa Muno và những cuộc chiến với Xamurlaik. Tác phẩm mở ra một thế giới sử thi kỳ vĩ, đồng thời phản ánh những quan niệm về gia đình, quyền lực, tín ngưỡng và đời sống văn hóa của người Chăm lúc bấy giờ.",
    story:
      "Nhà sinh hoạt cộng đồng Chăm là nơi quy tụ nhân dân các palei làng để truyền khẩu những pho sử thi bất hủ và truyện cổ tích dân gian. Nơi đây lưu truyền sử thi Dewa Muno kỳ vĩ, truyện cổ tích Hoàng tử Sọ Dừa và huyền tích Nàng Cha-điêng.",
    imageUrl: "/images/landmarks/nha-sinh-hoat-cham.jpg",
    iconType: "temple",
    color: "#a855f7", // Sắc tím huyền thoại sử thi & cổ tích
    quote: "“Dưới mái đình xưa nghe kể chuyện / Lời cổ ngàn năm vọng tiếng tơ”",
    subWorks: [
      {
        id: "4-1-dewa-muno",
        code: "4.1",
        title: "Sử thi Dewa Muno",
        shortDescription:
          "Dewa Muno là sử thi dân gian mang màu sắc kỳ ảo, kể về hành trình tìm cha của hoàng tử Dewa Muno và những cuộc chiến với Xamurlaik. Tác phẩm mở ra một thế giới sử thi kỳ vĩ, đồng thời phản ánh những quan niệm về gia đình, quyền lực, tín ngưỡng và đời sống văn hóa của người Chăm lúc bấy giờ.",
        story:
          "Sử thi Dewa Muno là một trong những kiệt tác sử thi đồ sộ nhất của văn học dân gian Chăm. Tác phẩm không chỉ phản ánh cuộc chiến cam go chống lại cái ác và các thế lực tà ác Xamurlaik, mà còn là khúc ca ca ngợi lòng hiếu thảo, tinh thần quả cảm và đức hy sinh vì cộng đồng.",
        quote: "“Gươm báu vung lên ngời chính nghĩa / Đường về cố quốc rạng vinh quang”",
      },
      {
        id: "4-2-hoang-tu-so-dua",
        code: "4.2",
        title: "Hoàng tử Sọ Dừa",
        shortDescription:
          "Truyện kể về sự ra đời kỳ lạ của Sọ Dừa (Cei Balaok La-u) – đứa trẻ sinh ra tròn như gáo dừa sau khi người mẹ uống trũng nước mát trên đá. Sọ Dừa thông minh, tài trí nên đã chiếm được tình cảm của công chúa Út và cùng nàng nên duyên vợ chồng. Trải qua nhiều biến cố, công chúa Út được đoàn tụ với Sọ Dừa, khi chàng lên ngôi vua đưa đất nước đến thịnh vượng.",
        story:
          "Hoàng tử Sọ Dừa trong truyện cổ tích Chăm (Cei Balaok La-u) mang nét tương đồng sâu sắc với mô-típ Sọ Dừa của người Việt, minh chứng cho sự giao thoa văn hóa dân gian lâu đời. Câu chuyện ca ngợi vẻ đẹp tâm hồn, trí tuệ vượt lên khiếm khuyết ngoại hình và ước mơ ngàn đời của nhân dân về công lý, hạnh phúc.",
        quote: "“Vỏ dừa che giấu dung nhan ngọc / Trí dũng hiền lương vẹn nghĩa tình”",
      },
      {
        id: "4-3-nang-cha-dieng",
        code: "4.3",
        title: "Nàng Cha - điêng",
        shortDescription:
          "Truyện Nàng Cha-điêng lí giải nguồn gốc và ý nghĩa thiêng liêng của hai loại bánh Sa-ka-ya tượng trưng cho trời cao, Ta-pay nung tượng trưng cho đất mẹ, qua đó gửi gắm đạo lí uống nước nhớ nguồn và lòng biết ơn sâu nặng đối với công ơn sinh thành, dưỡng dục của cha mẹ.",
        story:
          "Truyện cổ Nàng Cha-điêng gắn chặt với phong tục ẩm thực tâm linh trong các dịp lễ hội Katê và Ramưwan. Hai thứ bánh Sa-ka-ya và Ta-pay nung không đơn thuần là món ăn truyền thống, mà là biểu tượng thiêng liêng dâng lên tổ tiên thể hiện chữ hiếu vẹn tròn của con cháu đối với đấng sinh thành.",
        quote: "“Bánh đất bánh trời dâng tạ nghĩa / Ơn cha nghĩa mẹ sánh non cao”",
      },
    ],
    sections: [
      {
        title: "4.1. Sử thi Dewa Muno - Hành trình tìm cha và chiến đấu với Xamurlaik",
        content:
          "Dewa Muno là sử thi dân gian mang màu sắc kỳ ảo, kể về hành trình tìm cha của hoàng tử Dewa Muno và những cuộc chiến với Xamurlaik. Tác phẩm mở ra một thế giới sử thi kỳ vĩ, đồng thời phản ánh những quan niệm về gia đình, quyền lực, tín ngưỡng và đời sống văn hóa của người Chăm lúc bấy giờ.",
      },
      {
        title: "4.2. Hoàng tử Sọ Dừa (Cei Balaok La-u) - Vượt biến cố để vươn tới hạnh phúc",
        content:
          "Truyện kể về sự ra đời kỳ lạ của Sọ Dừa (Cei Balaok La-u) – đứa trẻ sinh ra tròn như gáo dừa sau khi người mẹ uống trũng nước mát trên đá. Sọ Dừa thông minh, tài trí nên đã chiếm được tình cảm của công chúa Út và cùng nàng nên duyên vợ chồng. Trải qua nhiều biến cố, công chúa Út được đoàn tụ với Sọ Dừa, khi chàng lên ngôi vua đưa đất nước đến thịnh vượng.",
      },
      {
        title: "4.3. Nàng Cha - điêng - Nguồn gốc bánh thiêng Sa-ka-ya và Ta-pay nung",
        content:
          "Truyện Nàng Cha-điêng lí giải nguồn gốc và ý nghĩa thiêng liêng của hai loại bánh Sa-ka-ya tượng trưng cho trời cao, Ta-pay nung tượng trưng cho đất mẹ, qua đó gửi gắm đạo lí uống nước nhớ nguồn và lòng biết ơn sâu nặng đối với công ơn sinh thành, dưỡng dục của cha mẹ.",
      },
    ],
  },
  {
    id: "moc-5-cua-bien-phan-ri",
    order: 5,
    name: "Cửa biển Phan Rí",
    workName: "Thần sóng Po Riyak",
    subtitle: "Cửa biển & tín ngưỡng Thần Sóng",
    category: "Tín ngưỡng Duyên hải & Hàng hải",
    locationName: "Cửa sông Lũy, TT. Phan Rí Cửa, H. Tuy Phong",
    province: "Bình Thuận",
    coordinates: [108.5528, 11.1764],
    shortDescription:
      "Bạn có biết, đằng sau tục thờ Cá Ông của cư dân ven biển miền Trung có thể là dấu ấn của một tín ngưỡng biển lâu đời của người Chăm? Đó là câu chuyện về Pô Riyak – Thần Sóng, vị thần gắn với biển cả và đời sống tâm linh của cộng đồng Chăm. Trải qua nhiều thế kỉ, tín ngưỡng thờ Pô Riyak vẫn lưu dấu trong đời sống văn hóa Chăm, đồng thời gợi mở những kết nối thú vị giữa các cộng đồng cư dân miền Trung.",
    story:
      "Bạn có biết, đằng sau tục thờ Cá Ông của cư dân ven biển miền Trung có thể là dấu ấn của một tín ngưỡng biển lâu đời của người Chăm? Đó là câu chuyện về Pô Riyak – Thần Sóng, vị thần gắn với biển cả và đời sống tâm linh của cộng đồng Chăm. Trải qua nhiều thế kỉ, tín ngưỡng thờ Pô Riyak vẫn lưu dấu trong đời sống văn hóa Chăm, đồng thời gợi mở những kết nối thú vị giữa các cộng đồng cư dân miền Trung.",
    imageUrl: "/images/landmarks/cua-bien-phan-ri.jpg",
    iconType: "harbor",
    color: "#0284c7", // Xanh lam biển cả
    quote: "“Buồm căng gió lộng khơi xa lại / Cửa biển nghìn trùng sóng vỗ ca”",
    sections: [
      {
        title: "Pô Riyak – Thần Sóng và tín ngưỡng biển cổ xưa của người Chăm",
        content:
          "Trong hệ thống thần linh của người Chăm, Pô Riyak là vị Thần cai quản sóng gió và sự bao la của đại dương. Ngư dân trước khi giong buồm ra khơi luôn làm lễ khấn nguyện Pô Riyak che chở sóng yên biển lặng, dẫn lối cho những mẻ cá đầy khoang trở về bờ an toàn.",
      },
      {
        title: "Dấu ấn giao thoa giữa tục thờ Pô Riyak và tục thờ Cá Ông của người Việt",
        content:
          "Nhiều nhà nghiên cứu văn hóa nhận định rằng, tục thờ Cá Ông (Nam Hải Đại Tướng Quân) rất phổ biến trong các làng chài ven biển miền Trung có mối liên hệ và tiếp biến sâu sắc từ tín ngưỡng thờ Thần Sóng Pô Riyak của người Chăm. Sự hòa quyện tín ngưỡng này minh chứng cho tình đoàn kết gắn bó và giao lưu văn hóa bền chặt giữa các cộng đồng cùng nương tựa vào biển cả.",
      },
      {
        title: "Cửa sông Lũy và nhịp sống thương cảng Phan Rí cổ xưa",
        content:
          "Nơi dòng sông Lũy đổ ra Biển Đông tại Phan Rí Cửa từng là cửa ngõ giao thương tấp nập của xứ Panduranga. Dấu tích văn hóa biển của người Chăm nơi đây vẫn hiện diện sinh động qua các nghi lễ cúng bến, phong tục đi biển và những huyền tích truyền miệng qua nhiều thế hệ.",
      },
    ],
  },
  {
    id: "moc-6-nuong-ngo",
    order: 6,
    name: "Nương ngô",
    workName: "Bò Kapil",
    subtitle: "Vùng đất nương ngô & tín ngưỡng Bò Kapil",
    category: "Truyện tích & Phong tục Dân gian",
    locationName: "Nương ngô lưu vực sông Dinh, Huyện Ninh Phước",
    province: "Ninh Thuận",
    coordinates: [108.918, 11.53],
    shortDescription:
      "Truyện Bò Kapil kể về tình anh em sâu nặng giữa Kapil và Kroong, đồng thời lý giải nguồn gốc tín ngưỡng thờ bò thần và những phong tục tang ma gắn liền với đời sống văn hóa của người Chăm Bàlamôn.",
    story:
      "Truyện Bò Kapil kể về tình anh em sâu nặng giữa Kapil và Kroong, đồng thời lý giải nguồn gốc tín ngưỡng thờ bò thần và những phong tục tang ma gắn liền với đời sống văn hóa của người Chăm Bàlamôn.",
    imageUrl: "/images/landmarks/nuong-ngo.jpg",
    iconType: "field",
    color: "#84cc16", // Xanh nương ngô trù phú
    quote: "“Ơn sâu nghĩa nặng tình huynh đệ / Bò thần dẫn lối cõi bình an”",
    sections: [
      {
        title: "Tình anh em sâu nặng giữa Kapil và Kroong",
        content:
          "Truyện Bò Kapil kể về mối tình cảm anh em gắn bó keo sơn giữa Kapil và Kroong nơi nương ngô bãi bồi. Trải qua những thăng trầm và thử thách cam go, lòng hiếu thảo, đức hy sinh và tình nghĩa ruột thịt giữa hai người đã trở thành biểu tượng đạo lý truyền thống cao đẹp của cộng đồng Chăm.",
      },
      {
        title: "Nguồn gốc tín ngưỡng thờ bò thần của người Chăm Bàlamôn",
        content:
          "Hình tượng Bò thần Kapil trong tâm thức người Chăm Bàlamôn gắn liền với sự linh thiêng và chở che. Không chỉ là người bạn gần gũi giúp cày xới nương ngô, Bò Kapil còn được tôn kính như một vị thần hộ mệnh mang lại no ấm, an lành cho xóm làng.",
      },
      {
        title: "Phong tục tang ma và quan niệm luân hồi",
        content:
          "Tác phẩm lý giải sâu sắc nguồn gốc các nghi thức tang ma truyền thống của người Chăm Bàlamôn. Hình ảnh bò thần dẫn lối linh hồn người đã khuất vượt qua sông suối về với miền cực lạc phản ánh nhân sinh quan hướng thiện và lòng thành kính sâu nặng của người còn sống đối với người đã khuất.",
      },
    ],
  },
] as const;

/**
 * Tìm kiếm Landmark theo ID
 */
export function getLandmarkById(id: string): Landmark | undefined {
  return VIETNAM_LANDMARKS.find((landmark) => landmark.id === id);
}
