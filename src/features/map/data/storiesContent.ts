export type StoryContent = {
  subtitle: string;
  heroImage?: string;
  readingMinutes: number;
  sections: { heading?: string; paragraphs: string[]; image?: { src: string; alt: string; caption?: string } }[];
  keyFacts: { label: string; value: string }[];
  glossary?: { term: string; meaning: string }[];
  quote?: string;
};

/** Nội dung biên soạn thử từ intro; chưa phải bản kể hay bản dịch tác phẩm. */
export const storiesContent: Record<string, StoryContent> = {
  'nu-than-po-nagar': {
    subtitle: 'Thần thoại về sự khởi đầu vũ trụ và hành trình kiến tạo văn minh, che chở muôn dân của Mẹ xứ sở Chămpa.',
    heroImage: '/images/landmarks/po-nagar-reference.png',
    readingMinutes: 3,
    sections: [
      {
        heading: 'Khai thiên lập địa và sứ mệnh giáng thế',
        paragraphs: [
          'Tác phẩm kể về sự khởi đầu của vũ trụ và hành trình kiến tạo thế giới, văn minh của Nữ thần Pô Naga cùng các vị thần linh theo thần thoại Chăm. Ban đầu, vũ trụ lâm vào cảnh hỗn mang, tối tăm khi 12 mặt trời bị bắn hạ; trải qua các thế hệ thần linh sáng tạo, ông Cú (Auloahú) đã tái sinh để khai quang nhật nguyệt và tạo ra vạn vật.',
          'Đến năm con Dê, ông Cú sai con gái là Mụ Dụ (chính là bà Naga) xuống trần gian thay ông cai quản thế giới. Giáng thế cùng các vị thánh trợ thủ như Au Lóa, Gia Mư và Tapatathor, bà Naga lập nên các xóm làng, đền đài ở Tuy Hòa, Phan Rang, Diên Khánh và dùng chiếc cân để sắp xếp lại trật tự vũ trụ, thiên thể.',
        ],
        image: {
          src: '/images/landmarks/po-nagar-reference.png',
          alt: 'Tháp Bà Ponagar trên đồi Cù Lao bên dòng sông Cái, Nha Trang',
          caption: 'Tháp Bà Ponagar (Thiên Y tháp cổ) nằm trên đồi Cù Lao, bên dòng sông Cái của thành phố biển Nha Trang. Tháp Bà được Vương quốc cổ Chămpa cho xây dựng trong khoảng từ thế kỉ thứ 8 đến thế kỉ thứ 13. Thời điểm xây dựng tháp cũng là thời kỳ đạo Hindu (Ấn Độ giáo) hưng thịnh nhất ở Chămpa.',
        },
      },
      {
        heading: 'Kiến thiết đời sống và khai sinh nền văn minh',
        paragraphs: [
          'Tiếp đó, bà cùng các vị thần phân công công việc để kiến thiết đời sống con người: tạo ra các hướng gió, sáng lập đạo Islam và đạo Acaphiar (Bà-la-môn), đặt ra lịch pháp, tục hỏa táng, đồng thời thổi sức sống cho loài người sinh nở, dạy dân trồng lúa, làm nông, chữa bệnh và trừng trị ma quỷ.',
        ],
      },
      {
        heading: 'Thăng trầm trị vì và lòng tôn kính muôn đời',
        paragraphs: [
          'Về sau, do bất hòa giữa bà Naga và ông Gia Mư khiến vận mệnh đất nước bị thắt nút suy vong, các vị thần lần lượt rời đi, bà Naga trực tiếp lên ngôi trị vì. Bà hết lòng chăm lo cho đời sống nhân dân, dạy đóng cày, cày ruộng, dùng xe trâu và xây dựng thuần phong mỹ tục.',
          'Tuy nhiên, vì là tiên lại lấy chồng trần tục nên bà phải chịu sự đọa đày khiến nhân dân gặp nhiều thiên tai, dịch bệnh, buộc ông Cú phải sai bốn vị thái tử xuống thay bà cai quản. Dù trải qua 90 năm làm vua đầy tai ương nhưng công ơn chăm lo cho dân chúng của bà Naga vẫn được người Chăm đời đời sùng kính, thờ phụng và dâng lễ cúng trọng thể vào các dịp lễ Păng Catê và Pangchabul hằng năm.',
        ],
      },
    ],
    keyFacts: [
      { label: 'Nhân vật chính', value: 'Nữ thần Po Inư Nưgar (Po Nagar / Mụ Dụ)' },
      { label: 'Địa danh', value: 'Tháp Bà Ponagar (đồi Cù Lao, sông Cái, Nha Trang)' },
      { label: 'Thời gian xây tháp', value: 'Khoảng thế kỷ thứ 8 đến thế kỷ thứ 13' },
      { label: 'Thể loại', value: 'Thần thoại dân gian Chăm' },
      { label: 'Lễ hội tưởng nhớ', value: 'Lễ hội Păng Catê và Pangchabul hàng năm' },
    ],
    glossary: [
      { term: 'Po Inư Nưgar', meaning: 'Trong tiếng Chăm nghĩa là "Mẹ của xứ sở" hay "Bà Chúa Xứ", vị thần tối cao được người Chăm tôn kính.' },
      { term: 'Auloahú (Ông Cú)', meaning: 'Đấng thần linh tối cao trong thần thoại Chăm, người đã khai quang nhật nguyệt và tạo ra vạn vật.' },
      { term: 'Đạo Acaphiar', meaning: 'Cách gọi chỉ đạo Bà-la-môn (Ấn Độ giáo) trong truyền thống Chăm.' },
      { term: 'Lễ Păng Catê & Pangchabul', meaning: 'Các dịp lễ hội trọng thể hằng năm của người Chăm để dâng lễ cúng, tưởng nhớ tổ tiên và các vị thần che chở xứ sở.' },
    ],
    quote: 'Giá trị của một vị thần không chỉ nằm ở quyền năng kiến tạo thế giới, mà còn ở những điều tốt đẹp họ để lại trong lòng nhân dân qua muôn đời. Và đó cũng chính là điều mà vị nữ thần Po Nagar đã làm…',
  },
  'po-kuk': {
    subtitle: 'Vị thần chúa tể thượng giới, đấng khôi phục ánh sáng mặt trời và mặt trăng, tái lập trật tự vũ trụ trong thần thoại Chăm.',
    heroImage: '/images/landmarks/po-kuk-reference.png',
    readingMinutes: 3,
    sections: [
      {
        heading: 'Thuở sơ khai và tai họa từ chúa quỷ Sa tăng',
        paragraphs: [
          'Tác phẩm kể về thuở sơ khai khi trái đất còn rất mềm và chịu cảnh nóng bức gay gắt do mười hai mặt trời cùng mười hai mặt trăng chiếu rọi. Để cai quản trần gian, vị thánh chúa tể Pô Kuk Brahimưk đã sai các vị thánh giáng trần để sắp xếp, cai quản, đồng thời đọc kinh, luyện tập.',
          'Tuy nhiên, trong một lần các vị thánh ngủ say vì quá mệt và quá chén, chúa quỷ Sa tăng Muruurmas Sibai Kayông đã lén đột nhập, nhổ các cột chính của thánh đường vứt xuống biển sâu, đồng thời lấy trộm nỏ thần và tên vàng của Pô Kuk bắn tan mười một mặt trời cùng mười một mặt trăng.',
        ],
        image: {
          src: '/images/landmarks/po-kuk-reference.png',
          alt: 'Vị thần Po Kuk Brahimur cùng nhật nguyệt, ngọn nến thiêng, gà trống và vợ chồng vịt',
          caption: 'Po Kuk Brahimur (Parahimuk) - vị thần chúa tể ở thượng giới, đấng sáng tạo muôn loài, người khôi phục ánh sáng mặt trời và mặt trăng với sự giúp sức của gà trống và vợ chồng vịt, tái lập trật tự vũ trụ và bảo vệ cuộc sống bình yên cho con người.',
        },
      },
      {
        heading: 'Bóng tối bao trùm và hành trình tìm lại ánh sáng',
        paragraphs: [
          'Điều đó khiến một mặt trời và một mặt trăng còn lại hoảng sợ bỏ chạy trốn, đẩy trần gian vào cảnh tối tăm, lạnh lẽo và hỗn loạn. Trước tình cảnh muôn loài kêu la thảm thiết và ma quỷ hoành hành, Pô Kuk Brahimưk đã làm phép hóa ra được ngọn nến, bấm quẻ tìm ra nguyên nhân và triệu tập muôn loài để tìm cách giải cứu thế giới.',
          'Trong khi các loài khác đều lắc đầu bất lực, vợ chồng Vịt và Gà trống đã tình nguyện nhận nhiệm vụ vượt biển sang xứ Mukah để tìm lại ánh sáng, đồng thời Gà mái nhận ở nhà ấp trứng thay cho Vịt.',
        ],
      },
      {
        heading: 'Tiếng gáy gọi mặt trời và sự luân chuyển bốn mùa',
        paragraphs: [
          'Nhờ Vịt bơi đưa Gà trống sang đại dương, Pô Kuk Brahimưk đã phát hiện mặt trời và mặt trăng đang ẩn trốn trong con ngươi của thần Rătnôlăk. Sau khi được giải thoát và nghe tiếng gáy tha thiết của Gà trống, mặt trời cùng mặt trăng đã đồng ý trở lại chiếu sáng, trời đất dịu mát hơn, từ đó tạo ra bốn mùa xuân, hạ, thu, đông và sự luân chuyển giữa ngày và đêm.',
        ],
      },
      {
        heading: 'Thiết lập trật tự và bài học tri ân cứu thế',
        paragraphs: [
          'Sau khi khôi phục lại trật tự vũ trụ, Pô Kuk Brahimưk giao cho loài người quyền làm chủ muôn loài và răn dạy họ phải tu hành. Để ghi nhớ công ơn cứu thế, ngài cấm con người dùng thịt Vịt để làm cúng thần, đồng thời giao nhiệm vụ cho Gà trống tiếp tục cất tiếng gáy gọi mặt trời hằng ngày và cho phép loài người dùng gà làm vật tế lễ.',
        ],
      },
    ],
    keyFacts: [
      { label: 'Nhân vật chính', value: 'Pô Kuk Brahimưk (Po Kuk Parahimuk)' },
      { label: 'Nhân vật cứu thế trợ thủ', value: 'Vợ chồng Vịt, Gà trống và Gà mái' },
      { label: 'Kẻ gây tai họa', value: 'Chúa quỷ Sa tăng Muruurmas Sibai Kayông' },
      { label: 'Thể loại', value: 'Thần thoại dân gian Chăm' },
      { label: 'Nguồn gốc được lý giải', value: 'Bốn mùa xuân - hạ - thu - đông, ngày đêm và tục kiêng cúng thịt vịt' },
    ],
    glossary: [
      { term: 'Pô Kuk Brahimưk', meaning: 'Vị thần chúa tể ở thượng giới trong thần thoại Chăm, đấng sáng tạo muôn loài và duy trì trật tự cõi vũ trụ.' },
      { term: 'Xứ Mukah', meaning: 'Vùng đất thiêng bên kia đại dương xa xôi trong vũ trụ quan cổ xưa của người Chăm.' },
      { term: 'Thần Rătnôlăk', meaning: 'Vị thần nơi mặt trời và mặt trăng cuối cùng sợ hãi tìm đến nấp kín trong con ngươi mắt.' },
      { term: 'Tục kiêng cúng thịt Vịt', meaning: 'Điều răn trong tín ngưỡng Chăm không dùng thịt vịt làm vật tế cúng thần để tri ân loài vịt đã chở gà trống vượt đại dương cứu lấy ánh sáng thế gian.' },
    ],
    quote: 'Tinh thần đoàn kết và sự đồng lòng chính là chìa khóa khôi phục trật tự, mang lại sức mạnh giúp con người vượt qua mọi nghịch cảnh và xây dựng một cuộc sống tốt đẹp hơn.',
  },
  'yang-patao': {
    subtitle: 'Hành trình quả cảm bảo vệ xứ tộc và nghĩa cử hóa giải oán hận gắn với ngọn núi thạch anh linh thiêng.',
    heroImage: '/images/landmarks/yang-patao-reference.png',
    readingMinutes: 3,
    sections: [
      {
        heading: 'Lời thách đấu bảo vệ xứ tộc trên bia Yang Tikuh',
        paragraphs: [
          'Thời xửa thời xưa, đất Chăm chưa có ai đứng ra làm vua. Vua Rak Bir Suer từ đảo Déwa xa xôi tìm đến đòi cai trị và bắt dân Chăm mỗi năm phải nộp thuế một người. Ông Po Kei Glaong không chấp nhận điều này nên đã đứng ra thách đấu với Rak Bir Suer: nếu Kei Glaong thua sẽ chấp nhận điều kiện nộp thuế, còn nếu Rak Bir Suer thua thì phải trở về lại đảo Déwa. Lời thách đấu được khắc ghi trên tấm bia Yang Tikuh (Thần Chuột).',
          'Hai bên hẹn ngày thi đấu và dùng chiêng bằng đá thật to để làm hiệu lệnh. Trận đấu diễn ra vô cùng quyết liệt, kéo dài suốt ba ngày ba đêm mà vẫn không phân thắng bại vì cả hai đều khỏe như nhau.',
        ],
        image: {
          src: '/images/landmarks/yang-patao-reference.png',
          alt: 'Núi Cek Yang Patao (Núi Đá Trắng) với những khối thạch anh trắng sừng sững',
          caption: 'Núi Cek Yang Patao (hay còn gọi là Núi Đá Trắng) là di tích tâm linh và danh thắng mang đậm giá trị văn hóa truyền thống của đồng bào Chăm. Ngọn núi gây ấn tượng mạnh mẽ bởi địa hình đặc trưng cấu thành từ những khối đá thạch anh trắng tinh khiết, sừng sững nổi bật giữa thiên nhiên hoang sơ.',
        },
      },
      {
        heading: 'Giao ước trước trận vật định mệnh',
        paragraphs: [
          'Đến lượt thi vật, Kei Glaong ra điều kiện: nếu Rak Bir Suer thua mà chưa chết hẳn thì tính sao? Rak Bir Suer đáp: nếu còn sống thì sẽ về lại đảo Déwa; nếu chết thì xin được ghi dấu tích tại đây dưới tên Yang Patao, đồng thời nhờ dân làng cứ 7 năm một lần làm lễ cúng Padhi cho ông bằng một con trâu trắng, bánh trái và rượu cần (lễ cúng do bà Pajau và thầy Kadhar thực hiện).',
        ],
      },
      {
        heading: 'Trận đọ sức và sự ra đời của các địa danh',
        paragraphs: [
          'Vào trận vật, Po Kei Glaong dùng hết sức vật Rak Bir Suer lún sâu xuống đất, chỉ còn cái đầu ngoi lên. Kei Glaong đè lên đầu đối thủ cho đến khi Rak Bir Suer chết hẳn. Dân làng mang trâu trắng và các lễ vật đến gò Tathak để làm lễ hiến tế. Do biến cố dữ dội lúc Rak Bir Suer thét lên rồi trút hơi thở cuối cùng khiến nồi trã, chén bát bị bể hết, từ đó nơi này được dân làng đặt các tên gọi: Gò Bể (Tambok Pacah): Nơi nồi trã, chén bát bị bể; Gò Mâm (Mbuen Salao): Nơi nấu cơm, làm bánh trái, dọn mâm cúng tế.',
          'Sau đó, Po Kei Glaong cùng dân làng và thầy Kadhar, Pajau, ông Pariya chính thức làm lễ tế, tiễn đưa linh hồn Rak Bir Suer.',
        ],
      },
    ],
    keyFacts: [
      { label: 'Nhân vật chính', value: 'Po Kei Glaong và Rak Bir Suer (đến từ đảo Déwa)' },
      { label: 'Địa danh', value: 'Cek Yang Patao (Núi Đá Trắng), Gò Bể (Tambok Pacah), Gò Mâm (Mbuen Salao)' },
      { label: 'Thể loại', value: 'Truyền thuyết dân gian Chăm' },
      { label: 'Lễ thức truyền thống', value: 'Lễ cúng Padhi 7 năm một lần với trâu trắng, bánh trái, rượu cần' },
      { label: 'Người hành lễ', value: 'Bà Pajau, thầy Kadhar và ông Pariya' },
    ],
    glossary: [
      { term: 'Cek Yang Patao', meaning: 'Núi Đá Trắng, mang dấu tích của Rak Bir Suer sau lời ước hẹn với Po Kei Glaong.' },
      { term: 'Bia Yang Tikuh', meaning: 'Tấm bia Thần Chuột, nơi khắc ghi lời thách đấu quyết tử để bảo vệ người dân xứ Chăm.' },
      { term: 'Lễ cúng Padhi', meaning: 'Đại lễ cúng tế truyền thống cứ 7 năm một lần bằng một con trâu trắng, bánh trái và rượu cần.' },
      { term: 'Tambok Pacah & Mbuen Salao', meaning: 'Gò Bể (nơi nồi trã bát đĩa vỡ khi Rak Bir Suer trút hơi thở cuối cùng) và Gò Mâm (nơi chuẩn bị mâm lễ vật).' },
      { term: 'Pajau, Kadhar, Pariya', meaning: 'Những chức sắc tôn giáo, thầy cúng và nhạc công chủ trì các nghi thức cúng tế linh thiêng của người Chăm.' },
    ],
    quote: 'Dùng lòng quả cảm để bảo vệ lẽ phải, dùng sự tử tế để hóa giải vạn niềm đau.',
  },
  'dewa-muno': {
    subtitle: 'Kiệt tác sử thi Chăm về khát vọng tìm cha, lòng trung trinh huynh đệ và những trận đại chiến xuyên cõi trời đất.',
    heroImage: '/images/landmarks/dewa-muno-reference.png',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Điềm báo từ voi quý và khát vọng tìm cha',
        paragraphs: [
          'Vua Kurama Raja xứ Gan Xrik Inra vĩ đại được vua các nước chư hầu xung quanh thần phục, hằng năm mang lễ vật đến triều cống. Vương quốc hùng mạnh, nhân dân yên ổn làm ăn. Bỗng dưng, một ngày kia, con voi quý trong vườn nhà vua khóc rống thảm thiết. Một điềm gở được báo trước. Vua cho vời ngay quan đại thần và nhà chiêm tinh Lakxamana đến hỏi sự tình. Nguyên nhân được tỏ bày: nhà vua không có con trai nối ngôi cha trị vì đất nước. Nhà chiêm tinh nói thêm: vua cha có thể cải mệnh bằng cách tự hi sinh thân mình. Y lời vị chiêm tinh, nhà vua ban ân phước cho thần dân, rồi sau khi trăng trối với hoàng hậu Runna Runga Cahya, vua hóa thân về trời để tròn một năm sau hoàng hậu hạ sinh một đứa con trai kháu khỉnh: hoàng tử Dewa Muno.',
          'Dewa Muno kết nghĩa anh em với Ưngkar Dewa là con trai của quan đại thần Binara. Khi hai anh em trưởng thành, họ đều không thấy cha đâu, hỏi ra mới biết có sự. Và họ quyết đi tìm cha, bất kể bao lời can ngăn, mong được nhìn thấy mặt cha một lần thôi để thỏa lòng khao khát.',
        ],
        image: {
          src: '/images/landmarks/dewa-muno-reference.png',
          alt: 'Cặp tượng voi thành Đồ Bàn thời Champa điêu khắc từ sa thạch',
          caption: 'Trong văn hóa Chăm, voi được xem là biểu tượng của sức mạnh hoàng gia, gắn liền với quyền lực tối cao và bảo vệ vương quốc. Cặp tượng voi thành Đồ Bàn (Khu di tích quốc gia thành Hoàng Đế, Bình Định) điêu khắc từ sa thạch là tác phẩm tượng voi lớn và sinh động bậc nhất trong lịch sử nghệ thuật điêu khắc Champa.',
        },
      },
      {
        heading: 'Nàng công chúa hóa voi trắng và ngọn nguồn ân oán',
        paragraphs: [
          'Cùng thời, bên xứ Birung Longdara có một nàng công chúa nết na thùy mị, với sắc đẹp chim sa cá lặn tên là Ratna Xribiyong được Rija Dewa Xamurlaik - một hoàng tử tài ba có đủ phép thần thông mới nối ngôi vua cha vừa băng hà ở xứ bên cạnh - để ý và xin đến làm rể, nhưng công chúa Ratna không thuận. Cùng lúc, vua Intan ở xứ Sumut Didin Didan vượt đại dương mang vàng bạc châu báu đến hỏi cưới công chúa. Hai bên ưng thuận trao đổi lễ vật. Dewa Xamurlaik cảm thấy bị sỉ nhục, ngay tức khắc hóa phép biến công chúa Ratna thành con voi trắng, gầm lên một tiếng thất thanh rồi chạy biến vào rừng. Vua Intan, tận mắt nhìn thấy phép thần thông của Dewa Xamurlaik, sợ nguy đến tính mạng, tập hợp đoàn tùy tùng, vội vã lên tàu về nước.',
          'Trong khi đó, trên cuộc hành trình đi tìm cha, tình cờ hai anh em Dewa Muno gặp con voi trắng đang đứng rũ buồn dưới gốc cây lớn. Chàng đến bên hỏi và nàng kể lể sự tình. Động lòng trước cảnh trái ngang, Dewa Muno hóa phép biến con voi trắng thành nàng công chúa, xinh đẹp lại càng xinh đẹp hơn xưa. Nhưng đây là Vương quốc của Dewa Xamurlaik. Rak đang bay đến hái trái kuramu cho chúa mình. Nhìn thấy Muno, Rak lên tiếng khiêu khích. Nhớ đến tâm địa nhỏ nhen của Xamurlaik đối với công chúa Ratna khi xưa, và khi nghe mấy lời khiêu khích của Rak, Dewa Muno nổi giận chém Rak trọng thương rồi dùng mũi tên thần bắn Rak bay đi với lời nhắn gởi đến Xamurlaik: công chúa Ratna đã là vợ của Dewa Muno.',
          'Rak bay đi rớt ngay trước mặt Xamurlaik, trăn trối rồi chết. Xamurlaik đùng đùng nổi giận. Thế là các cuộc chiến bắt đầu nối đuôi nhau tiếp diễn. Ngay trong cuộc giao chiến đầu tiên, Dewa Muno giết chết vua Rak rồi đường hoàng đưa công chúa Ratna trở về quê hương nàng. Ở đây, hôn nhân giữa Dewa Muno và công chúa Ratna được chính thức công nhận. Bên cạnh đó, để thưởng công chàng, vua Lang Dara còn gả cháu gái của mình là Cahya cho Dewa Muno.',
        ],
      },
      {
        heading: 'Biến cố đại dương, cạm bẫy và sự trợ giúp thần kỳ',
        paragraphs: [
          'Về phần Xamurlaik, uất ức vì bị mất mặt trước Dewa Muno, chàng cùng chú là Arakix Kaphwari bỏ xứ lên núi tu luyện trong bảy năm. Hai chú cháu cùng đến gặp các tù trưởng thổ dân yêu cầu giúp sức. Nhưng cả các tù trưởng này cũng bị Ưngkar Dewa đánh bại trong một cuộc giao tranh. Trên đường kéo quân trở về, anh em Dewa Muno bị Xamurlaik bắn lén. Mũi tên vàng của Xamurlaik mang hai anh em bay rớt vào giữa lòng đại dương, lưu lạc bảy ngày đêm mới gặp lại mặt nhau trong một dòng nước xoáy. Nhớ lại bùa thiêng của Xonggi khi xưa, Ưngkar Dewa nhắc tên và Jin Xonggi - người xưa kia được Ưngkar Dewa cứu sống - xuất hiện vớt hai anh em Dewa Muno chở về xứ sở của một vị vua. Ở xứ này, Ưngkar Dewa lấy công chúa Twon Ramai và Dewa Muno lấy công chúa Lima Girakxa.',
          'Sau một năm chung sống với công chúa Lima và có được một cậu con trai, Dewa Muno được tin báo Xamurlaik đang bao vây xứ Longdara và đòi lấy cho bằng được công chúa Ratna mặc dù nàng cương quyết từ chối. Chàng cùng em tức tốc lên đường. Tưởng rằng cuộc chiến mới sẽ xảy ra ác liệt hơn. Nhưng không, một cạm bẫy khác đã được giăng ra, và hai anh em Dewa Muno thật thà đã bị trúng thuốc độc. Xamurlaik sai các binh lính hầu cận mang gươm tới, quyết băm nát xác hai anh em Dewa Muno. Thế nhưng những nhát gươm bổ xuống đã không làm hề hấn gì hai thi thể đã bất động này.',
          'Tin xác hai anh em Dewa Muno đang được quân Rak canh giữ cẩn mật đồn lan sang xứ sở bên cạnh, công chúa Jotna xứ Hàm Rồng cho người tìm cách mang xác họ về, làm phép giải độc cho Dewa Muno, đồng thời yểm bùa cho chàng quên quê hương cùng vợ con để chung sống với mình. May mắn cho Dewa Muno, Ưngkar Dewa khi tỉnh ngộ đã gọi Jin Xonggi tới cứu cả ba người thoát khỏi xứ Hàm Rồng bí hiểm kia.',
        ],
      },
      {
        heading: 'Đại chiến xuyên tam giới và giải hòa từ Thượng Đế',
        paragraphs: [
          'Trong khi đó, ở Vương quốc Ilong Xongkata, Xamurlaik sau một tháng ròng chờ đợi (thời gian mà Xapatan - em gái út chàng, lúc này cũng là vợ của Dewa Muno - đề nghị với anh cho các công chúa được để tang chồng), đã vội vã lên đường mong được hội ngộ với công chúa Ratna. Không ngờ, khi tới nơi, nhìn thấy Dewa Muno đường hoàng ngự trên ngai vàng, chàng vô cùng giận dữ. Cuộc chiến tái diễn, khốc liệt hơn bao giờ, vì hai bên đưa ra toàn bộ lực lượng quyết một trận sống mái. Quân Rak và Jio Wanna bị Jin Xonggi đánh bại và Arakix cũng bị Ưngkar Dewa hạ một cách nhanh chóng.',
          'Xamurlaik dàn quân và Dewa Muno đi ứng chiến, bay đi cùng với sáu nàng công chúa một lòng cùng sống chết với chồng, quyết không để bị Xamurlaik bắt nữa. Hai bên chiến đấu liên tục trong nhiều ngày đêm, đi qua nhiều hành tinh xa lạ, đánh nhau giữa không trung, trong biển cả, trên đất liền không ngừng nghỉ. Đến thời điểm quyết định, Xamurlaik bắn mũi tên vàng của chàng. Mũi tên bị Dewa Muno bẻ gãy. Ngay lập tức Dewa Muno phản công, sử dụng đến ngón tuyệt chiêu: gươm kuraba kết liễu mạng sống của Xamurlaik.',
          'Cuộc chiến dưới trần gian vang động đến nhà Trời. Thương tình cho anh chàng Xamurlaik si tình tội nghiệp, đồng thời để cứu vãn danh dự cho chàng, Đấng Thượng Đế Chí Tôn phái thiên sứ xuống mở nấm mộ và ban hồn cho chàng sống dậy. Hai bên lại tiếp tục chiến đấu. Khi cuộc chiến kéo dài quá lâu vẫn bất phân thắng bại, lúc đó, Ngài mới giáng thế giải hòa cho hai người khổng lồ ngang sức ngang tài, chính thức tuyên bố công chúa Ratna là vợ của Dewa Muno và cho Xamurlaik cưới bóng của nàng (ôi! Cái khôn khéo của Đấng Chí tôn Chí đại). Dewa Muno, Ưngkar Dewa, Jin Xonggi và sáu công chúa khải hoàn, trở về quê hương trong sự đón tiếp tưng bừng của thần dân cùng vua các nước chư hầu. Dewa Muno được tôn ngôi vương, Ưngkar Dewa làm quan đại thần. Xonggi từ giã mọi người trở về cố quân.',
        ],
      },
    ],
    keyFacts: [
      { label: 'Nhân vật chính', value: 'Hoàng tử Dewa Muno & hiền đệ Ưngkar Dewa' },
      { label: 'Đối thủ định mệnh', value: 'Rija Dewa Xamurlaik (si tình, nhiều phép thần thông)' },
      { label: 'Công chúa xứ Longdara', value: 'Ratna Xribiyong (bị hóa voi trắng, được giải thoát)' },
      { label: 'Thần linh cứu trợ', value: 'Thần Jin Xonggi & Đấng Thượng Đế Chí Tôn' },
      { label: 'Thể loại', value: 'Sử thi dân gian Chăm' },
      { label: 'Hình tượng văn hóa', value: 'Tượng voi sa thạch (Thành Đồ Bàn / Thành Hoàng Đế, Bình Định)' },
    ],
    glossary: [
      { term: 'Sử thi Dewa Muno', meaning: 'Kiệt tác sử thi truyền miệng đồ sộ của người Chăm, phản ánh lòng dũng cảm, tình mẫu tử, phụ tử và trật tự công lý.' },
      { term: 'Tượng voi sa thạch Đồ Bàn', meaning: 'Biểu tượng của quyền lực hoàng gia và linh vật bảo vệ vương quốc trước thế lực tà ác trong nghệ thuật kiến trúc Champa.' },
      { term: 'Jin Xonggi', meaning: 'Vị thần mang ơn cứu mạng, luôn kịp thời xuất hiện giải cứu anh em Dewa Muno giữa sóng gió đại dương và ma thuật.' },
      { term: 'Gươm Kuraba', meaning: 'Thần kiếm tuyệt kỹ của hoàng tử Dewa Muno dùng trong những trận đấu quyết định.' },
      { term: 'Cưới bóng công chúa', meaning: 'Quyết định giải hòa thần diệu của Thượng Đế để vừa vỗ về chàng Xamurlaik si tình vừa giữ trọn hạnh phúc cho Dewa Muno và Ratna.' },
    ],
    quote: 'Dù phải đối mặt với bao hiểm nguy, con người vẫn luôn mang trong mình khát vọng tìm về cội nguồn và đoàn tụ với những người thân yêu, như Dewa Muno và Ưngkar Dewa đã bất chấp mọi lời can ngăn, quyết lên đường tìm cha để được một lần gặp mặt, thỏa nỗi khắc khoải về tình phụ tử.',
  },
  'hoang-tu-so-dua': {
    subtitle: 'Truyện cổ tích Chăm ca ngợi vẻ đẹp tâm hồn, trí tuệ và tình yêu thủy chung vượt lên mọi định kiến và gian truân.',
    heroImage: '/images/landmarks/so-dua-reference.png',
    readingMinutes: 3,
    sections: [
      {
        heading: 'Sự ra đời kỳ lạ và mối duyên trầu cau trăm ngày',
        paragraphs: [
          'Truyện kể về sự ra đời kỳ lạ của Sọ Dừa (Cei Balaok La-u) – đứa trẻ sinh ra tròn như gáo dừa sau khi người mẹ trẻ uống trũng nước mát trên đá. Sọ Dừa rất thông minh, khôn ngoan và có tài chăn giữ thành công đàn trâu lớn của nhà vua mà không hề làm thất lạc.',
          'Trong những lần mang cơm, công chúa Út vô tình phát hiện ra Sọ Dừa là một hoàng tử tuấn tú, tài hoa. Cảm phục và yêu mến chàng, nàng chủ động dâng trầu cau tỏ lòng, mối duyên lành được nhà vua chấp thuận và cử hành bằng một đại lễ cưới bình đẳng, linh đình suốt một trăm ngày đêm.',
        ],
        image: {
          src: '/images/landmarks/so-dua-reference.png',
          alt: 'Bức tranh minh họa truyện cổ Chăm - Hoàng tử Sọ Dừa (Cei Balaok La-u)',
          caption: 'Bức tranh minh họa truyện cổ Chăm - Hoàng tử Sọ Dừa (Cei Balaok La-u). Dù mang hình hài khác thường, Sọ Dừa vẫn bộc lộ tài năng, phẩm chất tốt đẹp và nên duyên cùng công chúa Út với tình yêu chân thành. Trải qua những âm mưu và thử thách, hai người đoàn tụ và cùng nhau cai trị đất nước thái bình, thịnh vượng.',
        },
      },
      {
        heading: 'Âm mưu hiểm độc và sự sống sót kỳ diệu trong vỏ sò sa cừ',
        paragraphs: [
          'Thấy em gái lấy được người chồng tài giỏi, hai người chị ghen tức, nảy sinh ý định cướp chồng nên đã lừa ném chiếc nhẫn thần xuống biển khiến công chúa Út phải gieo mình theo cùng. Nàng thoát chết nhờ ẩn mình trong vỏ sò “sa cừ”, trôi dạt vào bờ và được hai vợ chồng lão nông nghèo mang về chăm sóc.',
        ],
      },
      {
        heading: 'Tấm chăn dằn đoàn tụ và ngày khải hoàn thái bình',
        paragraphs: [
          'Để trả ơn, nàng âm thầm dọn dẹp nhà cửa, dệt tấm “chăn dằn” và nhờ bà cụ mang bán cho nhà vua. Nhờ nhận ra hoa văn trên chăn cùng chiếc nhẫn hạt cườm quen thuộc, Sọ Dừa đã tìm lại được người vợ yêu quý.',
          'Sau sự kiện ấy, hai người chị xấu hổ lẩn tránh, vợ chồng cụ già được ban thưởng hậu tạ, còn Sọ Dừa được nhà vua tin tưởng nhường ngôi, cùng công chúa Út trị vì đất nước ngày càng an bình và thịnh vượng.',
        ],
      },
    ],
    keyFacts: [
      { label: 'Nhân vật chính', value: 'Sọ Dừa (Cei Balaok La-u) & công chúa Út' },
      { label: 'Thể loại', value: 'Truyện cổ tích dân gian Chăm' },
      { label: 'Vật phẩm kỳ diệu', value: 'Chiếc nhẫn thần, vỏ sò sa cừ, tấm chăn dằn dệt hoa văn' },
      { label: 'Đại lễ hôn phối', value: 'Lễ cưới bình đẳng, linh đình suốt 100 ngày đêm' },
      { label: 'Hậu vận', value: 'Sọ Dừa lên ngôi vua, đất nước thái bình thịnh trị' },
    ],
    glossary: [
      { term: 'Cei Balaok La-u', meaning: 'Cách gọi tiếng Chăm của Hoàng tử Sọ Dừa (Balaok La-u mang nghĩa gáo dừa).' },
      { term: 'Vỏ sò sa cừ', meaning: 'Nơi trú ẩn thần diệu che chở công chúa Út trôi dạt bình an vào bờ khi bị hãm hại gieo mình xuống biển.' },
      { term: 'Chăn dằn', meaning: 'Tấm chăn thổ cẩm dệt tay truyền thống của người Chăm với đường nét hoa văn tinh xảo, làm tín vật đoàn tụ vợ chồng.' },
      { term: 'Dâng trầu cau tỏ lòng', meaning: 'Nghi thức dũng cảm, chủ động bày tỏ tình yêu trong sáng của nàng công chúa Út vượt lên mọi dị nghị ngoại hình.' },
    ],
    quote: 'Giá trị của con người không nằm ở vẻ bề ngoài mà được thể hiện qua tài năng, phẩm chất và cách đối nhân xử thế. Tình yêu chân thành, lòng thủy chung và sự tin tưởng lẫn nhau sẽ giúp con người vượt qua những thử thách trong cuộc sống, khẳng định rằng cái thiện cuối cùng luôn chiến thắng cái ác.',
  },
  'nang-cha-dieng': {
    subtitle: 'Huyền tích Chăm về hai thức bánh Sa-ka-ya và Ta-pay nung biểu trưng cho Trời Đất và tấm lòng hiếu nghĩa với cha mẹ.',
    heroImage: '/images/landmarks/nang-cha-dieng-reference.png',
    readingMinutes: 4,
    sections: [
      {
        heading: 'Sự ra đời kỳ lạ và túp lều bên rẫy dưa rừng',
        paragraphs: [
          'Ngày xưa, có hai vợ chồng tuổi đã cao nhưng vẫn chưa có con. Hai người tìm thầy thuốc và cầu xin thần linh phù hộ. Một thời gian sau, người vợ mang thai nhưng phải ba năm sau mới sinh một bé gái nhỏ bằng bàn tay. Điều kì lạ là ngay khi vừa chào đời, cô bé đã biết nói, biết đi. Hai vợ chồng đặt tên con là Cha-điêng.',
          'Mười năm trôi qua, Cha-điêng vẫn không lớn thêm chút nào. Vì xấu hổ với người đời, hai vợ chồng quyết định đưa con vào rừng. Thương con, người cha dựng cho nàng một túp lều, phát đất thành rẫy để trồng dưa hấu và một số loại cây khác rồi mới trở về làng. Cha-điêng sống một mình trong rừng, bên túp lều và rẫy dưa. Một ngày nọ, nàng bỗng biến thành một cô gái xinh đẹp như tiên sa.',
        ],
      },
      {
        heading: 'Duyên kỳ ngộ với hoàng tử và tình mẫu tử thảo thơm',
        paragraphs: [
          'Một hôm, một hoàng tử say mê săn bắn bị lạc trong rừng. Chàng tìm thấy túp lều và rẫy dưa hấu, bèn hái một quả chín ăn một nửa rồi bỏ lại phần còn lại trước khi dẫn quân lính tìm đường về kinh thành. Cha-điêng trở về, thấy nửa quả dưa bị bỏ lại nên nhặt lên ăn. Không ngờ, sau đó nàng mang thai và chín tháng sau sinh một cậu bé khôi ngô, tuấn tú.',
          'Thời gian trôi qua, hoàng tử lại dẫn quân lính đi săn ngang qua rẫy dưa. Nghe tiếng hát thảm sầu vọng ra từ túp lều, chàng nhẹ nhàng bước tới. Khi nghe thấy tiếng động, Cha-điêng biến mất, chỉ để lại cậu bé có gương mặt giống hoàng tử như đúc. Xúc động trước vẻ đáng yêu của đứa trẻ, hoàng tử cúi xuống trò chuyện với cậu bé. Cảm động trước tình cảm của chàng, Cha-điêng hiện ra nguyên hình. Sau đó, hoàng tử trở về triều, thưa với vua cha về nàng và đứa trẻ. Chàng nhận ra mình không thể sống xa Cha-điêng và con.',
        ],
      },
      {
        heading: 'Thử thách chọn người kế vị và hai thức bánh dâng cha mẹ',
        paragraphs: [
          'Nhà vua có ba người con trai và muốn tìm người xứng đáng kế vị ngai vàng. Ông tuyên bố rằng người vợ nào làm được món bánh ngon nhất dâng lên vua và hoàng hậu trong vòng bảy ngày thì chồng nàng sẽ được truyền ngôi. Hai hoàng tử lớn vui mừng vì tin rằng mình có đủ điều kiện để giành chiến thắng. Trong khi đó, hoàng tử út lo lắng vì vợ chồng chàng nghèo khó, chỉ có túp lều và rẫy dưa hấu. Biết được nỗi lòng của chồng, Cha-điêng mỉm cười trấn an và nhận lời lo liệu mọi việc.',
          'Đến ngày thứ bảy, ba hoàng tử cùng vợ vào triều dâng bánh. Hai người chị dâu lần lượt dâng những chiếc bánh quy được đựng trong quả, bên ngoài phủ màu hồng xen vàng óng ánh, nhưng không khiến nhà vua hài lòng. Đến lượt mình, Cha-điêng dâng hai loại bánh được đặt trong một chiếc chiết vẽ hoa rực rỡ. Bánh Sa-ka-ya có hình tròn, màu xám, được làm từ lòng đỏ trứng gà hòa với đường và nước gừng, tượng trưng cho trời cao, quyền cao chức trọng của vua cha. Bánh Ta-pay nung có hình vuông và dài, làm từ gạo nếp, có nhân đậu, bọc bên ngoài bằng lá chuối, tượng trưng cho đất rộng và công lao bao bọc, nuôi dưỡng con cháu của hoàng hậu. Qua hai loại bánh, Cha-điêng bày tỏ lòng biết ơn và sự thành kính của vợ chồng nàng đối với công lao sinh thành, nuôi dạy con cái của cha mẹ.',
        ],
        image: {
          src: '/images/landmarks/nang-cha-dieng-reference.png',
          alt: 'Nàng Cha-điêng cùng hoàng tử út dâng bánh Sa-ka-ya và Ta-pay nung lên vua cha và hoàng hậu',
          caption: 'Nàng Cha-điêng cùng hoàng tử út dâng lên vua cha và hoàng hậu hai loại bánh Sa-ka-ya tượng trưng cho trời cao, sự quyền quý và Ta-pay nung tượng trưng cho đất rộng, sự bao bọc nuôi dưỡng, qua đó thể hiện lòng hiếu thảo và biết ơn công sinh thành dưỡng dục.',
        },
      },
      {
        heading: 'Ngôi vị truyền thừa và câu tục ngữ ngàn đời',
        paragraphs: [
          'Cảm động trước sự thông minh, khéo léo và lòng hiếu thảo của Cha-điêng cùng hoàng tử út, nhà vua quyết định truyền ngôi cho hoàng tử út. Các quan cận thần đều đồng tình với quyết định ấy.',
          'Từ câu chuyện về hai loại bánh do Cha-điêng làm, người Chăm lưu truyền câu tục ngữ “Ta-pay nung a-la, sa-ka-ya ngok”, nghĩa là “Bánh tét ở dưới, bánh sa-ka-ya ở trên”. Cho đến ngày nay, người Chăm vẫn làm hai loại bánh này để dâng lên ông bà, tổ tiên trong các dịp lễ Ka-tê, Cha-bul, Ra-mu-wan, đồng thời mang đến tạ ơn các vị chức sắc và những người góp sức trong tang lễ theo phong tục truyền thống.',
        ],
      },
    ],
    keyFacts: [
      { label: 'Nhân vật chính', value: 'Nàng Cha-điêng & Hoàng tử út' },
      { label: 'Hai loại bánh thiêng', value: 'Bánh Sa-ka-ya (Trời cao) & Bánh Ta-pay nung (Đất mẹ)' },
      { label: 'Tục ngữ Chăm', value: '“Ta-pay nung a-la, sa-ka-ya ngok” (Bánh tét ở dưới, bánh sa-ka-ya ở trên)' },
      { label: 'Dịp lễ dâng bánh', value: 'Lễ hội Ka-tê, Cha-bul, Ra-mu-wan và nghi thức tạ ơn truyền thống' },
      { label: 'Thể loại', value: 'Truyện cổ tích & huyền tích ẩm thực Chăm' },
    ],
    glossary: [
      { term: 'Bánh Sa-ka-ya', meaning: 'Bánh ngọt tròn nướng từ lòng đỏ trứng gà, đường và nước gừng, biểu trưng cho trời cao và sự quyền quý của người cha.' },
      { term: 'Bánh Ta-pay nung', meaning: 'Đòn bánh tét nếp nhân đậu gói lá chuối, biểu trưng cho đất mẹ bao la, che chở và dưỡng nuôi thế hệ sau.' },
      { term: 'Ta-pay nung a-la, sa-ka-ya ngok', meaning: 'Quy tắc cúng lễ cổ truyền Chăm: bánh tét xếp ở lớp đáy làm nền đất, đĩa bánh sa-ka-ya đặt lên trên biểu trưng cho trời che.' },
      { term: 'Lễ Ka-tê, Cha-bul, Ra-mu-wan', meaning: 'Các dịp đại lễ thiêng liêng hằng năm của cộng đồng Chăm nhằm tri ân tổ tiên và các bậc tiền nhân.' },
    ],
    quote: 'Người con hiếu thảo, khôn ngoan không được đo bằng giàu sang, mà được thể hiện qua tấm lòng biết ơn và đạo nghĩa với đấng sinh thành.',
  },
  'po-riyak': {
    subtitle: 'Văn hóa biển Chăm và huyền tích vị Thần Sóng hóa thân thành cá Ông che chở người đi biển qua muôn trùng sóng gió.',
    heroImage: '/images/landmarks/phan-ri-reference.png',
    readingMinutes: 3,
    sections: [
      {
        heading: 'Mảnh ghép văn hóa biển và hoài bão cứu dân',
        paragraphs: [
          'Hằng năm, sau lễ Rija Nưgar (Lễ Xứ Sở) diễn ra vào đầu năm lịch Chăm (khoảng tháng 4 Dương lịch), bà con Chăm ở các vùng thuộc hai tỉnh Ninh Thuận và Bình Thuận đều làm lễ thờ cúng Po Riyak, tức Thần Sóng. Lễ thờ cúng Po Riyak là một mảnh văn hóa biển vô cùng quan trọng của người Chăm.',
          'Truyền thuyết kể rằng, Po Riyak sinh ra tại làng Aia Dak (thuộc tỉnh Bình Thuận hiện nay). Thuở bé thông minh, dĩnh ngộ, có đạo đức, nhưng ít chú tâm đến chuyện gia đình mà chỉ lo công tác xã hội. Lớn lên, thấy đất nước bị lâm nguy, dân lành đau khổ, người đến vùng thánh địa Ả Rập (Makah) để tìm thầy học đạo, học bùa để cứu giúp dân làng. Ngài tâm sự hết với thầy hoài bão của mình và được thầy thương tình truyền dạy cho mọi bùa phép thần thông.',
        ],
        image: {
          src: '/images/landmarks/phan-ri-reference.png',
          alt: 'Nghi lễ thờ cúng Po Riyak (Thần Sóng) của người Chăm',
          caption: 'Hằng năm, sau lễ Rija Nưgar vào đầu năm lịch Chăm (tháng 4 Dương lịch), bà con Chăm ở Ninh Thuận và Bình Thuận đều làm lễ thờ cúng Po Riyak (Thần Sóng) - nét văn hóa biển thiêng liêng và quan trọng bậc nhất.',
        },
      },
      {
        heading: 'Cơn bão biển, lời nguyền và sự hóa thân vào Cá Ông',
        paragraphs: [
          'Sau khi học thành tài, mặc dù nhiều lần thầy can ngăn vì gặp năm kỵ tuổi, ngài vẫn lén thầy lên thuyền trở về quê hương. Đúng như lời nguyền của sư tổ, khi gần đến bờ biển quê hương, biển động dữ dội khiến chiếc thuyền của ngài bị một cơn sóng lớn đánh chìm. Ngài bị cá Ông đớp đứt làm hai, hồn ngài hóa thân vào cá Ông rồi bơi vào địa phận Phan Rí.',
          'Dân làng nơi đây lập đền thờ tại đồi cát đó. Các làng Chăm khi nghe tin đều hướng về thờ cúng, ghi lại công lao, tiểu sử và sự nghiệp cứu nhân độ thế của Ngài.',
        ],
        image: {
          src: '/images/landmarks/po-riyak-ritual.png',
          alt: 'Tư liệu các nghi lễ cúng Po Riyak tại vùng biển Chăm',
          caption: 'Không gian nghi lễ cúng Po Riyak: dâng lễ cúng tại Po Ong, Po Muk; điệu múa thiêng của các thiếu nữ và nghi thức cầm cây mía đỏ tượng trưng cho mái chèo của ông Ka-ing.',
        },
      },
      {
        heading: 'Chu du trần thế, trở thành Yang Biruw và hộ trì ngư dân',
        paragraphs: [
          'Sau đó, Ngài chu du đi khắp xứ sở để tường tận thế gian và giúp đỡ mọi người. Cuối cùng, Ngài quay về lại quê hương, rồi lấy vợ ở làng Pat xứ sở Pacem và sinh được hai người con trai. Về sau, Ngài hóa thành yang, được tôn vào hàng thần yang mới (yang biruw) lấy tên là Poriyak.',
          'Hồn của Ngài hay hóa thân vào con cá voi (cá Ông) để cứu giúp những người đi biển mỗi khi gặp sóng to gió lớn bão bùng.',
        ],
      },
    ],
    keyFacts: [
      { label: 'Nhân vật chính', value: 'Po Riyak (Thần Sóng / Hóa thân Cá Ông)' },
      { label: 'Quê hương & Đền thờ', value: 'Làng Aia Dak và đồi cát cửa biển Phan Rí (Bình Thuận)' },
      { label: 'Thời gian tổ chức lễ', value: 'Sau lễ Rija Nưgar (tháng 4 Dương lịch hằng năm)' },
      { label: 'Ý nghĩa tín ngưỡng', value: 'Văn hóa biển Chăm, gắn kết mật thiết với tục thờ Cá Ông miền Trung' },
      { label: 'Hàng vị thần linh', value: 'Yang Biruw (Thần mới) bảo trợ ngư dân vượt sóng gió' },
    ],
    glossary: [
      { term: 'Po Riyak', meaning: 'Trong tiếng Chăm nghĩa là "Thần Sóng", vị thần cai quản sóng gió biển cả và hộ mệnh cho người đi biển.' },
      { term: 'Lễ Rija Nưgar', meaning: 'Lễ hội Xứ Sở đầu năm mới của người Chăm nhằm tẩy uế, trừ tà và cầu cho quốc thái dân an, phong điều vũ thuận.' },
      { term: 'Yang Biruw', meaning: 'Hàng "Thần Mới" trong hệ thống tín ngưỡng Chăm, tôn vinh những danh nhân tiền hiền có công lớn hóa thần.' },
      { term: 'Thánh địa Makah', meaning: 'Vùng đất Ả Rập linh thiêng mà Po Riyak đã vượt ngàn trùng dương tìm đến học đạo và bùa phép cứu dân.' },
      { term: 'Tục thờ Cá Ông', meaning: 'Tín ngưỡng thiêng liêng chung giữa người Chăm và cư dân miền duyên hải, xem cá voi là ân nhân cứu nạn trên biển.' },
    ],
    quote: 'Lòng từ bi có thể hóa thành sức mạnh cứu rỗi. Như Po Riyak hóa thân thành cá voi giữa biển cả giông bão, tình yêu thương và sự chở che sẽ luôn là ngọn sóng nâng đỡ con người vượt qua những thời khắc gian nan nhất.',
  },
  'bo-kapil': {
    subtitle: 'Nghĩa tình anh em sâu nặng giữa bò thần Kapil và chàng Kroong, khởi nguồn tín ngưỡng thờ linh vật Nandin và phong tục hỏa táng Chăm.',
    heroImage: '/images/landmarks/bo-kapil-reference.png',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Sự ra đời dưới bóng cây xoài và tình anh em khác giống',
        paragraphs: [
          'Thời xa xưa, ở một vùng đất nọ, hai vợ chồng nghèo là ông Bir Thor và bà Liêng sống trong cảnh túng thiếu và u buồn vì nửa đời người vẫn chưa có con. Lời than phiền của họ động đến thần Auloah và đấng Sapajăn (sáng tạo). Một ngày nọ, khi đang làm rẫy, bà Liêng khát nước nên đã đi tìm nước uống. Bà nào biết rằng giọt nước bà uống đã có thần phép của thánh Auloah thổi nhập vào. Không lâu sau, bà mang thai. Một hôm, bà đến giếng múc nước, gần đó có một cây xoài lớn, sum suê đầy quả chín vàng. Bà múc nước xong, quá mệt vội ngồi nghĩ tạm dưới gốc cây xoài. Lúc đó, bà bỗng thấy thèm chua lạ thường nên đã leo lấy hái nhưng lúc bà chồm với hái vài quả bỗng đôi mắt bà tối mờ, thấy trời đất như đang nghiêng ngả, lại vừa kiệt sức nên bà té xuống, vừa đẻ ra một con bê và một thằng bé, rồi bà chết ngay tại đó.',
          'Trong lúc đó ông Bir Thor không thấy vợ nên đã chạy đi tìm bà. Trong lúc ngồi nghĩ cách tìm vợ, ông nghe thấy tiếng trẻ khóc rồi gợi ơi ới vọng la. Con bò cất tiếng người, nhận ông làm cha, Kroong làm em. Sau đó, ông Bir Thor chôn vợ gần gốc cây xoài rồi ba cha con bồng bế nhau về lại chòi. Thấm thoát được 10 năm, Kapil lớn lên khỏe mạnh, kéo cày, kéo gỗ không bò nào bằng. Còn Kroong càng lớn càng khôi ngô sáng lạn.',
          'Nhưng mười hai năm sau, ông Bir Thor lại nghĩ khác, ông thấy bổn phận của mình đến đó là đủ rồi nên muốn tìm một bà vợ vì thấy trong nhà không có đàn bà chẳng khác nào “cái bếp mà không có lửa”. Và rồi ông Bir Thor đi bước nữa với một người phụ nữ giàu có nhưng tâm địa vô cùng ác độc. Vào nhà dì ghẻ, ba cha con bị đối xử khắc nghiệt: ông Bir Thor phải ra rẫy làm việc, còn hai anh em Kapil bị bắt đi chăn cả đàn trâu.',
        ],
        image: {
          src: '/images/landmarks/bo-kapil-reference.png',
          alt: 'Tượng Bò thần Nandin (Limoaw Kapil) bằng sa thạch điêu khắc Champa',
          caption: 'Bò thần Nandin (Limoaw Kapil) là linh vật gắn liền với thần Shiva trong Hindu giáo, giữ vai trò là vật cưỡi trung thành, tùy tùng tận tụy và bảo vệ đền tháp. Trong văn hóa Chăm Ahiér (Chăm Bàlamôn), Nandin còn gắn với truyện cổ dân gian và các nghi lễ tang ma truyền thống.',
        },
      },
      {
        heading: 'Dì ghẻ hãm hại và chuyến bay thần kỳ vút lên trời',
        paragraphs: [
          'Khi chăn trâu, Kapil luôn dặn đàn trâu không được ăn lúa của người khác. Một hôm, có con trâu phạm lỗi giậm phá ruộng lúa, ông sư trông ruộng bắt trói trâu lại và đánh Kroong ba roi. Sau đó, nghe Kroong kể hoàn cảnh mồ côi, ông sư thương tình trả trâu. Kapil gọi cả đàn trâu lại trách mắng, con trâu hứa không tái phạm.',
          'Một lần khác, nghe tiếng kèn trống đám tang bên kia đồi, Kroong ước được đến nghe. Kapil dặn đàn trâu ở lại đồng cỏ, rồi cõng em trên lưng. Đến bìa rừng, Kapil ú lên một tiếng khiến khu rừng tự tách làm đôi mở đường đi. Tại đám lễ, bà chủ nhà tốt bụng thấy hai anh em rách rưới nên cho ăn uống no nê và tặng Kroong bộ quần áo mới. Chiều về, bà dì ghẻ thấy Kroong có áo mới liền nghi ngờ trộm trâu bán, chửi mắng, lột sạch quần áo và bỏ đói hai đứa. Hôm sau, hai anh em tiếp tục đi xem lễ, bà dì ghẻ lén theo dõi. Thấy bà chủ lễ lại cho Kroong quần áo và đồ ăn, bà dì ghẻ đem lòng ganh ghét. Bà ta đút lót cho thầy bói trong làng rồi giả bệnh, ép chồng đi xem bói. Thầy bói đều phán phải hiến tế con bò trong nhà thì vợ mới khỏi bệnh.',
          'Biết ý đồ độc ác của dì ghẻ nhưng vì thương cha và em, Kapil chấp nhận hy sinh với điều kiện: được chết gần gốc cây xoài (nơi mẹ sinh ra) và trước khi hành lễ, em Kroong được chạy quanh đó ba vòng. Đến ngày lễ, Kroong chạy ba vòng rồi nhảy lên ôm đuôi và lưng Kapil; con bò rùng mình vọt bay thẳng lên trời, mang theo Kroong và cả cây xoài.',
        ],
      },
      {
        heading: 'Trận đấu bò sinh tử ở xứ người và sự hy sinh của Kapil',
        paragraphs: [
          'Kapil bay đến một xứ sở xa lạ và dừng lại bên giếng nước cấm. Cây xoài to lớn mọc ngay bên giếng khiến các tì nữ mải nhìn mà quên lấy nước về cho hoàng hậu. Sự việc đến tai nhà vua. Nghe Kroong kể lại gia cảnh, vua tuy thương hại nhưng lo sợ hai anh em chiếm ngôi nên tìm cách đuổi đi. Vua thách đấu bò: nếu bò của Kroong thắng sẽ chia nửa sơn hà, nếu thua phải rời đi. Kapil dặn em dù cuộc đấu ra sao cũng phải vui vẻ động viên thì mình mới có sức mạnh.',
          'Kapil dũng cảm hạ gục 36 con bò sung sức của vua. Đến trận cuối gặp con bò đầu đàn to lớn hung dữ, Kapil dù kiệt sức và đầy vết thương vẫn kiên cường chiến đấu. Tuy nhiên, Kroong vì quá thương anh nên bật khóc than thở, quên mất lời dặn động viên, khiến Kapil mất sức và ngã xuống. Trước khi chết, Kapil trăn trối bảo em lột da làm chiếu nằm, còn thịt và xương ném xuống biển.',
        ],
      },
      {
        heading: 'Chiếc cầu thần qua biển và trừng trị kẻ bạo tàn',
        paragraphs: [
          'Sau khi Kapil chết, nhà vua vẫn chưa hết lo ngại Kroong trả thù nên tiếp tục bắt bớ. Vua bắt Kroong nhổ cây xoài mang trồng trước dinh, nếu không sẽ bị phạt. Trong giấc mơ, Kapil hiện về chỉ cách. Sáng hôm sau, Kroong vác cây xoài đặt trước dinh vua một cách nhẹ nhàng. Vua lại tiếp tục ra lệnh cho Kroong phải bắc một cây cầu qua biển trong vòng 7 ngày. Kapil lại hiện về báo mộng bảo em yên tâm, nhưng dặn tuyệt đối không được bước lên cầu trước.',
          'Đến sáng ngày thứ tư (hary but), một chiếc cầu hoành tráng xuất hiện trên biển. Vua cùng các quan quân bước lên cầu thưởng lãm. Khi mọi người ra đến giữa cầu, mây trời vần vũ, sóng gió nổi lên dữ dội đập tan chiếc cầu, cuốn trôi nhà vua độc ác cùng toàn bộ triều thần xuống biển sâu.',
        ],
      },
      {
        heading: 'Kroong lên ngôi vua và phong tục hỏa táng ngàn đời',
        paragraphs: [
          'Mấy năm sau, Kroong lớn lên khỏe mạnh, tuấn tú và đức độ nên được dân chúng tôn làm vua. Để ghi nhớ công ơn người mẹ và anh trai, Kroong tổ chức đám tang trọng thể cho mẹ và vẽ hình con bò Kapil nhiều màu sắc trên đòn khiêng bằng gỗ xoài như để hoài niệm suốt đời ơn tình sâu nặng đó.',
          'Từ đó, mọi đám hỏa táng đều lưu truyền hình ảnh gia đình độc nhất vô nhị đó của chàng Kroong theo cách nghĩ của dân gian Chăm: “Thật ra Kroong là bậc thấp nhất trong gia đình nhưng vì chàng là vua nên được tôn vinh trên hết” (Biak nao, Kroong bier ti bih talam thang, min kadua ngak patao hu pôk chek mưngok).',
          'Cũng từ thần tích này, người Chăm Bàlamôn truyền cấm giết và ăn thịt bò, khắc họa hình ảnh bò Kapil trên cửa chính đền tháp để phụng thờ, đồng thời lưu truyền các phong tục trong nghi lễ hỏa táng. Riêng về hình ảnh cây xoài, trước kia người Chăm dùng gỗ xoài làm đòn khiêng. Ngày nay không còn thấy nữa, có chăng chỉ dùng ba bó nhánh nhỏ xoài khô để mồi lửa khi hỏa táng.',
        ],
      },
    ],
    keyFacts: [
      { label: 'Nhân vật chính', value: 'Bò thần Kapil (Limoaw Kapil) & em trai Kroong' },
      { label: 'Đấng ban sinh', value: 'Thánh Auloah & đấng sáng tạo Sapajăn' },
      { label: 'Hình tượng linh vật', value: 'Bò thần Nandin trong điêu khắc Champa' },
      { label: 'Tín ngưỡng kiêng cữ', value: 'Người Chăm Bàlamôn cấm giết và ăn thịt bò' },
      { label: 'Nghi thức tang lễ', value: 'Đòn khiêng vẽ hình bò Kapil, ba bó nhánh xoài mồi lửa hỏa táng' },
    ],
    glossary: [
      { term: 'Limoaw Kapil (Bò Nandin)', meaning: 'Bò thần linh vật trong Ấn Độ giáo và tín ngưỡng Chăm Ahiér, tượng trưng cho đức trung trinh và sức mạnh bảo vệ.' },
      { term: 'Hary but', meaning: 'Ngày thứ tư theo lịch Chăm, thời điểm chiếc cầu kỳ diệu xuất hiện trừng trị hôn quân bạo tàn.' },
      { term: 'Cây xoài thiêng', meaning: 'Nơi người mẹ hạ sinh Kapil và Kroong, gắn liền với đòn khiêng và ba bó củi xoài mồi lửa trong nghi lễ hỏa táng cổ truyền.' },
      { term: 'Biak nao, Kroong bier ti bih...', meaning: 'Thành ngữ Chăm đúc kết về thứ bậc gia đình và vương quyền: người em út nhỏ nhất nhà nhưng vì có đức làm vua nên được tôn vinh trên hết.' },
    ],
    quote: 'Cây vươn cao nhờ đất lành nuôi rễ, người đi xa nhờ ân tình nâng bước. Dẫu tháng năm đổi dời, xin người đừng quên những yêu thương đã âm thầm chở che ta qua giông bão cuộc đời.',
  },
};

storiesContent['limo-kapil'] = storiesContent['bo-kapil'];
