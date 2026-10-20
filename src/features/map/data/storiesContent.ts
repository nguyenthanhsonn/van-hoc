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
    subtitle: 'Từ câu chuyện về một vị nữ thần, tìm hiểu cách con người hình dung về cội nguồn cuộc sống.',
    heroImage: '/images/landmarks/po-nagar-reference.png', readingMinutes: 2,
    sections: [
      { heading: 'Một thế giới được sắp đặt', paragraphs: [
        'Trong phần giới thiệu thần thoại, Po Nagar, còn được gọi là Mụ Dụ, là vị thần tối cao được sai xuống trần gian để tái lập trật tự vũ trụ. Câu chuyện đặt người đọc trước câu hỏi về sự hình thành và trật tự của thế giới.', // MOCK: thay bằng nội dung thật
        'Những hiện tượng tự nhiên được nhắc đến cùng với vai trò sáng tạo của nữ thần. Qua cách kể ấy, thế giới quanh con người hiện lên như một điều vừa gần gũi, vừa cần được lý giải.', // MOCK: thay bằng nội dung thật
      ] },
      { heading: 'Gắn với đời sống con người', paragraphs: [
        'Phần giới thiệu còn nhắc đến việc nữ thần khai sinh tôn giáo, truyền dạy nghề nông và văn hóa xã hội. Các chi tiết này nối câu chuyện về vũ trụ với những hoạt động của đời sống cộng đồng.', // MOCK: thay bằng nội dung thật
        'Po Nagar được người Chăm đời đời sùng kính. Khi đọc, em có thể chú ý những việc làm của nữ thần và suy nghĩ về lòng biết ơn dành cho người mang lại điều tốt đẹp cho cộng đồng.', // MOCK: thay bằng nội dung thật
      ] },
    ],
    keyFacts: [{ label: 'Nhân vật', value: 'Nữ thần Po Nagar (Mụ Dụ)' }, { label: 'Địa danh', value: 'Tháp Bà Po Nagar' }, { label: 'Thể loại', value: 'Thần thoại' }, { label: 'Mạch nội dung', value: 'Sáng tạo thế giới và truyền dạy nghề nông' }],
    glossary: [{ term: 'Thần thoại', meaning: 'Câu chuyện về các vị thần, thường gắn với cách lý giải thế giới và con người.' }, { term: 'Vũ trụ', meaning: 'Không gian rộng lớn bao gồm thế giới và các thiên thể.' }],
    quote: 'Từ một câu chuyện về cội nguồn, ta học cách trân trọng những điều nuôi dưỡng cuộc sống.',
  },
  'po-kuk': {
    subtitle: 'Theo dấu ánh sáng để lắng nghe câu hỏi về ngày và đêm.',
    readingMinutes: 2,
    sections: [
      { heading: 'Câu hỏi từ thiên nhiên', paragraphs: [
        'Thần thoại Po Kuk mở ra những sự việc huyền bí liên quan đến Po Kuk Parahimuk. Theo phần giới thiệu, ánh sáng và sự luân chuyển ngày đêm là những hình ảnh gắn với câu chuyện này.', // MOCK: thay bằng nội dung thật
        'Ngày và đêm là những điều quen thuộc trong cuộc sống. Khi đưa chúng vào thần thoại, câu chuyện gợi cho người đọc suy nghĩ về cách con người tìm lời giải thích cho các hiện tượng tự nhiên.', // MOCK: thay bằng nội dung thật
      ] },
      { heading: 'Đọc và đặt câu hỏi', paragraphs: [
        'Bên cạnh thiên nhiên, phần giới thiệu còn nhắc đến phong tục và tín ngưỡng của người Chăm. Người đọc có thể theo dõi mối liên hệ giữa những sự việc trong truyện và các nội dung được lý giải.', // MOCK: thay bằng nội dung thật
        'Em hãy ghi lại những điều mình muốn biết thêm về Po Kuk Parahimuk. Phần giới thiệu chưa cung cấp diễn biến cụ thể, vì vậy những câu hỏi ấy cần được đối chiếu với toàn văn tác phẩm khi có tư liệu.', // MOCK: thay bằng nội dung thật
      ] },
    ],
    keyFacts: [{ label: 'Nhân vật', value: 'Po Kuk Parahimuk' }, { label: 'Thể loại', value: 'Thần thoại' }, { label: 'Hình ảnh', value: 'Ánh sáng, ngày và đêm' }, { label: 'Nội dung', value: 'Lý giải hiện tượng tự nhiên, phong tục và tín ngưỡng' }],
    glossary: [{ term: 'Luân chuyển', meaning: 'Lần lượt thay đổi, tiếp nối nhau.' }, { term: 'Tín ngưỡng', meaning: 'Niềm tin và những cách bày tỏ niềm tin vào điều thiêng liêng.' }],
  },
  'yang-patao': {
    subtitle: 'Một cuộc đọ sức được kể lại cùng tên núi và ký ức về vùng đất.', readingMinutes: 2,
    sections: [
      { heading: 'Cuộc đọ sức trong lời kể', paragraphs: [
        'Phần giới thiệu truyền thuyết núi Yang Patao kể về cuộc đọ sức giữa Po Kei Glaong và Rak Bir Suer. Mục đích bảo vệ xứ Chăm khỏi ách cai trị là nội dung được nêu rõ trong lời giới thiệu.', // MOCK: thay bằng nội dung thật
        'Khi đọc câu chuyện, em có thể theo dõi hành động và mục đích của từng nhân vật. Đó là cách bước đầu nhận ra mâu thuẫn làm nên cuộc đọ sức trong truyền thuyết.', // MOCK: thay bằng nội dung thật
      ] },
      { heading: 'Tên núi và những điều được lý giải', paragraphs: [
        'Truyền thuyết gắn cuộc đọ sức với nguồn gốc tên núi Yang Patao và các địa danh gò bãi. Nhờ vậy, tên gọi của một nơi chốn trở thành điểm bắt đầu để tìm hiểu câu chuyện gắn với vùng đất ấy.', // MOCK: thay bằng nội dung thật
        'Các phong tục cúng tế truyền thống cũng được nhắc đến trong phần giới thiệu. Những chi tiết cụ thể về diễn biến và phong tục cần được tìm đọc trong tư liệu đầy đủ, thay vì suy đoán từ tên gọi.', // MOCK: thay bằng nội dung thật
      ] },
    ],
    keyFacts: [{ label: 'Nhân vật', value: 'Po Kei Glaong và Rak Bir Suer' }, { label: 'Địa danh', value: 'Núi Yang Patao' }, { label: 'Thể loại', value: 'Truyền thuyết' }, { label: 'Mạch nội dung', value: 'Bảo vệ xứ Chăm và lý giải tên núi, địa danh' }],
    glossary: [{ term: 'Truyền thuyết', meaning: 'Truyện dân gian gắn với nhân vật, sự việc hoặc địa danh, có thể mang yếu tố kỳ ảo.' }, { term: 'Địa danh', meaning: 'Tên gọi của một địa điểm hoặc vùng đất.' }],
  },
  'dewa-muno': {
    subtitle: 'Theo hành trình tìm cha của một hoàng tử trong thế giới sử thi kỳ ảo.', readingMinutes: 2,
    sections: [
      { heading: 'Một hành trình tìm cha', paragraphs: [
        'Dewa Muno được giới thiệu là một sử thi dân gian mang màu sắc kỳ ảo. Câu chuyện xoay quanh hành trình tìm cha của hoàng tử Dewa Muno, đưa người đọc bước vào một thế giới kể chuyện rộng lớn.', // MOCK: thay bằng nội dung thật
        'Những cuộc chiến với Xamurlaik cũng là một phần của lời giới thiệu. Khi có toàn văn, em có thể theo dõi cách hành trình tìm cha và các cuộc chiến được nối tiếp với nhau.', // MOCK: thay bằng nội dung thật
      ] },
      { heading: 'Những điều để cùng suy ngẫm', paragraphs: [
        'Tác phẩm được giới thiệu là phản ánh những quan niệm về gia đình, quyền lực, tín ngưỡng và đời sống văn hóa của người Chăm. Các chủ đề ấy gợi nhiều hướng đọc bên cạnh việc theo dõi những sự việc kỳ ảo.', // MOCK: thay bằng nội dung thật
        'Em thử bắt đầu bằng câu hỏi: vì sao hành trình tìm cha lại có ý nghĩa với nhân vật? Hãy giữ câu hỏi này trong khi đọc và tìm dẫn chứng từ tác phẩm để xây dựng câu trả lời của mình.', // MOCK: thay bằng nội dung thật
      ] },
    ],
    keyFacts: [{ label: 'Nhân vật', value: 'Hoàng tử Dewa Muno, Xamurlaik' }, { label: 'Thể loại', value: 'Sử thi dân gian' }, { label: 'Hành trình', value: 'Tìm cha và những cuộc chiến' }, { label: 'Chủ đề đọc', value: 'Gia đình, quyền lực và tín ngưỡng' }],
    glossary: [{ term: 'Sử thi', meaning: 'Tác phẩm tự sự có quy mô lớn, thường kể về hành trình và những sự việc có ý nghĩa với cộng đồng.' }, { term: 'Kỳ ảo', meaning: 'Có những yếu tố khác với thực tế thông thường, do trí tưởng tượng tạo nên.' }],
    quote: 'Một hành trình trong lời kể có thể mở ra nhiều câu hỏi về gia đình và cộng đồng.',
  },
  'hoang-tu-so-dua': {
    subtitle: 'Từ hình hài khác lạ đến cuộc đoàn tụ được nhắc trong truyện cổ.', readingMinutes: 2,
    sections: [
      { heading: 'Sự ra đời khác lạ', paragraphs: [
        'Sọ Dừa, có tên Chăm là Cei Balaok La-u, được giới thiệu là một đứa trẻ sinh ra tròn như gáo dừa. Sự ra đời kỳ lạ này gắn với việc người mẹ uống trũng nước mát trên đá.', // MOCK: thay bằng nội dung thật
        'Dù mang hình hài khác lạ, Sọ Dừa được nhắc đến với sự thông minh và tài trí. Chi tiết ấy gợi cho người đọc suy nghĩ về cách nhìn nhận một người qua phẩm chất, thay vì chỉ qua vẻ ngoài.', // MOCK: thay bằng nội dung thật
      ] },
      { heading: 'Tình cảm và cuộc đoàn tụ', paragraphs: [
        'Theo phần giới thiệu, Sọ Dừa được công chúa Út dành tình cảm và hai người nên duyên vợ chồng. Câu chuyện còn có những biến cố, nhưng phần giới thiệu chưa trình bày cụ thể các sự việc ấy.', // MOCK: thay bằng nội dung thật
        'Cuối mạch giới thiệu là cuộc đoàn tụ của công chúa Út với Sọ Dừa khi chàng lên ngôi vua và đưa đất nước đến thịnh vượng. Khi đọc toàn văn, em hãy tìm những chi tiết cho thấy vai trò của trí tuệ và tình cảm trong hành trình của nhân vật.', // MOCK: thay bằng nội dung thật
      ] },
    ],
    keyFacts: [{ label: 'Nhân vật', value: 'Sọ Dừa (Cei Balaok La-u), công chúa Út' }, { label: 'Hình ảnh', value: 'Đứa trẻ có hình hài tròn như gáo dừa' }, { label: 'Phẩm chất', value: 'Thông minh, tài trí' }, { label: 'Mạch truyện', value: 'Nên duyên, trải qua biến cố và đoàn tụ' }],
    glossary: [{ term: 'Nên duyên', meaning: 'Trở thành vợ chồng.' }, { term: 'Thịnh vượng', meaning: 'Phát triển tốt đẹp, có cuộc sống đủ đầy.' }],
    quote: 'Đừng để vẻ ngoài ngăn ta nhận ra trí tuệ và những điều tốt đẹp ở một người.',
  },
  'nang-cha-dieng': {
    subtitle: 'Hai loại bánh trong lời kể gợi nhớ tấm lòng dành cho cha mẹ.', readingMinutes: 2,
    sections: [
      { heading: 'Hình ảnh trời và đất', paragraphs: [
        'Phần giới thiệu truyện Nàng Cha-điêng nhắc đến hai loại bánh: Sa-ka-ya và Ta-pay nung. Câu chuyện lý giải nguồn gốc và ý nghĩa thiêng liêng của những hình ảnh này.', // MOCK: thay bằng nội dung thật
        'Sa-ka-ya được giới thiệu là tượng trưng cho trời cao, còn Ta-pay nung tượng trưng cho đất mẹ. Hai hình ảnh trời và đất tạo nên một điểm tựa để người đọc tìm hiểu ý nghĩa của lời kể.', // MOCK: thay bằng nội dung thật
      ] },
      { heading: 'Lời nhắc về lòng biết ơn', paragraphs: [
        'Theo phần giới thiệu, câu chuyện gửi gắm đạo lý uống nước nhớ nguồn và lòng biết ơn sâu nặng đối với công ơn sinh thành, dưỡng dục của cha mẹ. Đây là nội dung để em chú ý khi đọc tác phẩm.', // MOCK: thay bằng nội dung thật
        'Em có thể tự hỏi: những hình ảnh giản dị trong đời sống đã giúp câu chuyện nói về lòng biết ơn như thế nào? Hãy tìm câu trả lời trong các chi tiết của bản kể đầy đủ khi có tư liệu.', // MOCK: thay bằng nội dung thật
      ] },
    ],
    keyFacts: [{ label: 'Tác phẩm', value: 'Nàng Cha-điêng' }, { label: 'Hình ảnh', value: 'Bánh Sa-ka-ya và Ta-pay nung' }, { label: 'Biểu tượng', value: 'Trời cao và đất mẹ' }, { label: 'Ý nghĩa', value: 'Uống nước nhớ nguồn, biết ơn cha mẹ' }],
    glossary: [{ term: 'Uống nước nhớ nguồn', meaning: 'Biết ơn và ghi nhớ những người đã đem lại điều tốt đẹp cho mình.' }, { term: 'Dưỡng dục', meaning: 'Nuôi nấng và dạy dỗ.' }],
  },
  'po-riyak': {
    subtitle: 'Một lời kể từ cửa biển gợi những kết nối trong đời sống tinh thần.', readingMinutes: 2,
    sections: [
      { heading: 'Từ câu hỏi bên bờ biển', paragraphs: [
        'Phần giới thiệu Thần sóng Po Riyak mở đầu bằng một câu hỏi về mối liên hệ có thể có giữa tục thờ Cá Ông và một tín ngưỡng biển của người Chăm. Cách đặt câu hỏi gợi cho người đọc sự tò mò về đời sống ven biển.', // MOCK: thay bằng nội dung thật
        'Pô Riyak được giới thiệu là Thần Sóng, gắn với biển cả và đời sống tâm linh của cộng đồng Chăm. Đây là điểm chính để bắt đầu tìm hiểu câu chuyện.', // MOCK: thay bằng nội dung thật
      ] },
      { heading: 'Những kết nối cần tìm hiểu', paragraphs: [
        'Lời giới thiệu nhắc đến những dấu ấn của tín ngưỡng thờ Pô Riyak trong đời sống văn hóa Chăm. Đồng thời, tác phẩm gợi mở những kết nối giữa các cộng đồng cư dân miền Trung.', // MOCK: thay bằng nội dung thật
        'Mối liên hệ với tục thờ Cá Ông được đặt ra dưới dạng một khả năng, chưa phải một kết luận trong phần giới thiệu. Khi đọc và trao đổi, em nên giữ cách diễn đạt thận trọng ấy và tìm thêm tư liệu phù hợp.', // MOCK: thay bằng nội dung thật
      ] },
    ],
    keyFacts: [{ label: 'Nhân vật', value: 'Pô Riyak – Thần Sóng' }, { label: 'Không gian', value: 'Biển cả và cộng đồng cư dân ven biển' }, { label: 'Địa danh', value: 'Cửa biển Phan Rí' }, { label: 'Câu hỏi đọc', value: 'Những kết nối có thể có giữa các tín ngưỡng biển' }],
    glossary: [{ term: 'Tâm linh', meaning: 'Những niềm tin và cảm nhận của con người về điều thiêng liêng.' }, { term: 'Cư dân', meaning: 'Những người sinh sống tại một vùng đất.' }],
  },
  'bo-kapil': {
    subtitle: 'Từ tình anh em, cùng đọc những ý nghĩa được gửi gắm trong câu chuyện.', readingMinutes: 2,
    sections: [
      { heading: 'Tình anh em trong lời kể', paragraphs: [
        'Truyện Bò Kapil được giới thiệu qua tình anh em sâu nặng giữa Kapil và Kroong. Mối quan hệ này là điểm tựa đầu tiên để người đọc bước vào câu chuyện.', // MOCK: thay bằng nội dung thật
        'Khi có bản kể đầy đủ, em có thể tìm những lời nói và hành động thể hiện tình cảm giữa hai nhân vật. Phần giới thiệu hiện chưa nêu các diễn biến cụ thể, vì vậy không nên tự bổ sung những sự việc chưa có tư liệu.', // MOCK: thay bằng nội dung thật
      ] },
      { heading: 'Những điều câu chuyện lý giải', paragraphs: [
        'Bên cạnh tình anh em, lời giới thiệu cho biết truyện lý giải nguồn gốc tín ngưỡng thờ bò thần và những phong tục tang ma gắn với đời sống văn hóa của người Chăm Bàlamôn.', // MOCK: thay bằng nội dung thật
        'Khi đọc, em hãy phân biệt mạch truyện về nhân vật với những nội dung được tác phẩm lý giải. Cách đọc ấy giúp em đặt câu hỏi rõ ràng và tiếp cận những điều mình chưa biết bằng thái độ tôn trọng.', // MOCK: thay bằng nội dung thật
      ] },
    ],
    keyFacts: [{ label: 'Nhân vật', value: 'Kapil và Kroong' }, { label: 'Tình cảm', value: 'Tình anh em sâu nặng' }, { label: 'Nội dung lý giải', value: 'Tín ngưỡng thờ bò thần và phong tục tang ma' }, { label: 'Bối cảnh được nhắc', value: 'Đời sống văn hóa của người Chăm Bàlamôn' }],
    glossary: [{ term: 'Tang ma', meaning: 'Những việc và nghi thức liên quan đến người đã qua đời.' }, { term: 'Phong tục', meaning: 'Những cách sinh hoạt, ứng xử được duy trì trong một cộng đồng.' }],
  },
};

storiesContent['limo-kapil'] = storiesContent['bo-kapil'];
