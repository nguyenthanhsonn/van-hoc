// src/features/map/data/landmarksData.ts
import type { Terrain, DetailView, SubLandmark } from '../types';

export type Story = {
  id: string;
  title: string; // Tên tác phẩm
  intro: string; // Thông tin giới thiệu
};

export type Landmark = {
  id: string;
  order: number;
  terrain: Terrain;
  title: string;
  province: string;
  lngLat: [number, number];
  zoom?: number;
  color?: string;
  iconType?: 'temple' | 'mountain' | 'house' | 'sea' | 'field';
  summary: string;
  image: string;
  stories: Story[];
  detailView?: DetailView;
  subLandmarks?: SubLandmark[];
};

export const landmarks: Landmark[] = [
  {
    id: 'thap-ba-po-nagar',
    order: 1,
    terrain: 'plain',
    title: 'Tháp Bà Po Nagar',
    province: 'Khánh Hòa',
    lngLat: [109.1957, 12.2652],
    zoom: 9,
    color: '#E26343',
    iconType: 'temple',
    summary: 'Nơi thờ nữ thần Po Nagar, vị thần tối cao được người Chăm đời đời sùng kính.',
    image: '/images/landmarks/thap-ba-po-nagar.jpg',
    detailView: {
      center: [109.1957, 12.2652],
      zoom: 14,
    },
    stories: [
      {
        id: 'nu-than-po-nagar',
        title: 'Nữ thần Po Nagar',
        intro:
          'Thần thoại Nữ thần Po Nagar (Mụ Dụ) kể về vị thần tối cao được sai xuống trần gian để tái lập trật tự vũ trụ, sáng tạo ra các hiện tượng tự nhiên, khai sinh tôn giáo, truyền dạy nghề nông và văn hóa xã hội, được người Chăm đời đời sùng kính.',
      },
    ],
    subLandmarks: [
      {
        id: 'thap-chinh-po-nagar',
        name: 'Tháp chính thờ Nữ thần Po Nagar',
        type: 'building',
        coordinates: [109.1957, 12.2652],
        minZoom: 12,
        description: 'Ngôi tháp trung tâm thờ Mụ Dụ - vị thần tối cao tái lập trật tự vũ trụ.',
        relativePosition: 'Tâm cụm tháp',
        confidence: 'high',
      },
      {
        id: 'khu-vuc-khai-sinh-ton-giao',
        name: 'Khu bái đường khai sinh tôn giáo',
        type: 'monument',
        coordinates: [109.196, 12.2649],
        minZoom: 13,
        description: 'Khu vực gắn với truyền tích nữ thần đặt nền móng tín ngưỡng và tôn giáo.',
        relativePosition: '~40m phía Đông Nam',
        confidence: 'low',
      },
      {
        id: 'bai-dat-day-nghe-nong',
        name: 'Khu vực truyền dạy nghề nông',
        type: 'other',
        coordinates: [109.1953, 12.2653],
        minZoom: 14,
        description: 'Nơi nữ thần truyền dạy nhân dân nghề nông và tổ chức xã hội.',
        relativePosition: '~45m phía Tây',
        confidence: 'low',
      },
      {
        id: 'vong-canh-song-cai',
        name: 'Điểm vọng cảnh cửa sông Cái',
        type: 'viewpoint',
        coordinates: [109.1962, 12.2655],
        minZoom: 15,
        description: 'Điểm nhìn ra cửa sông Cái, nơi mở ra các hiện tượng tự nhiên được lý giải.',
        relativePosition: '~60m phía Đông Bắc',
        confidence: 'medium',
      },
    ],
  },
  {
    id: 'duong-len-nui-da-trang',
    order: 2,
    terrain: 'mountain',
    title: 'Đường lên núi Đá Trắng',
    province: 'Khánh Hòa',
    lngLat: [108.98, 11.55],
    zoom: 9.5,
    color: '#8B5CF6',
    iconType: 'house',
    summary: 'Con đường lên núi Đá Trắng, gắn với thần thoại Po Kuk về ánh sáng và ngày đêm.',
    image: '/images/landmarks/duong-len-nui-da-trang.jpg',
    detailView: {
      center: [108.98, 11.55],
      zoom: 14,
    },
    stories: [
      {
        id: 'po-kuk',
        title: 'Po Kuk Parahimuk',
        intro:
          'Thần thoại Po Kuk kể về những sự việc huyền bí liên quan đến Po Kuk Parahimuk, về ánh sáng và sự luân chuyển ngày đêm, qua đó lý giải nguồn gốc một số hiện tượng tự nhiên và phong tục, tín ngưỡng của người Chăm.',
      },
    ],
    subLandmarks: [
      {
        id: 'con-duong-len-nui',
        name: 'Đường mòn lên núi Đá Trắng',
        type: 'road',
        coordinates: [108.98, 11.55],
        minZoom: 12,
        description: 'Lối mòn quanh co dẫn lên sườn núi huyền bí của Po Kuk Parahimuk.',
        relativePosition: 'Trục đường chính',
        confidence: 'high',
      },
      {
        id: 'vong-canh-anh-sang',
        name: 'Vọng cảnh ánh sáng và ngày đêm',
        type: 'viewpoint',
        coordinates: [108.9804, 11.5503],
        minZoom: 13,
        description: 'Điểm ngắm sự luân chuyển kỳ bí giữa ánh sáng và bóng đêm thiên nhiên.',
        relativePosition: '~45m phía Đông Bắc',
        confidence: 'low',
      },
      {
        id: 'doc-da-huyen-bi',
        name: 'Dốc đá sườn non huyền thoại',
        type: 'road',
        coordinates: [108.9796, 11.5497],
        minZoom: 14,
        description: 'Đoạn dốc đá gập ghềnh gắn với những sự việc huyền bí thời khai thiên.',
        relativePosition: '~55m phía Tây Nam',
        confidence: 'low',
      },
      {
        id: 'diem-tin-nguong-po-kuk',
        name: 'Điểm thực hành phong tục tín ngưỡng',
        type: 'monument',
        coordinates: [108.9803, 11.5495],
        minZoom: 15,
        description: 'Không gian ghi dấu tín ngưỡng dân gian của người Chăm quanh tích Po Kuk.',
        relativePosition: '~60m phía Đông Nam',
        confidence: 'low',
      },
    ],
  },
  {
    id: 'nui-da-trang',
    order: 3,
    terrain: 'mountain',
    title: 'Cek Yang Patao - núi Đá Trắng',
    province: 'Khánh Hòa',
    lngLat: [109.0, 11.5],
    zoom: 9.5,
    color: '#0D9488',
    iconType: 'mountain',
    summary: 'Ngọn núi gắn với trận đọ sức giữa Po Kei Glaong và Rak Bir Suer để bảo vệ xứ Chăm.',
    image: '/images/landmarks/nui-da-trang.jpg',
    detailView: {
      center: [109.0, 11.5],
      zoom: 14,
    },
    stories: [
      {
        id: 'yang-patao',
        title: 'Truyền thuyết núi Yang Patao',
        intro:
          'Truyền thuyết núi Yang Patao kể về trận chiến đọ sức giữa Po Kei Glaong và kẻ ngoại bang Rak Bir Suer để bảo vệ xứ Chăm khỏi ách cai trị, từ đó giải thích nguồn gốc tên núi Yang Patao, các địa danh gò bãi và phong tục cúng tế truyền thống.',
      },
    ],
    subLandmarks: [
      {
        id: 'dinh-nui-yang-patao',
        name: 'Đỉnh núi Cek Yang Patao',
        type: 'viewpoint',
        coordinates: [109.0, 11.5],
        minZoom: 12,
        description: 'Ngọn núi thiêng ghi dấu tên tuổi vị Vua Thần bảo vệ xứ sở.',
        relativePosition: 'Đỉnh núi trung tâm',
        confidence: 'high',
      },
      {
        id: 'bai-quyet-chien',
        name: 'Bãi đọ sức Po Kei Glaong - Rak Bir Suer',
        type: 'monument',
        coordinates: [109.0004, 11.5003],
        minZoom: 13,
        description: 'Chiến trường quyết liệt đánh đuổi kẻ ngoại bang bảo vệ tự do cho xứ Chăm.',
        relativePosition: '~45m phía Đông Bắc',
        confidence: 'low',
      },
      {
        id: 'go-da-trang',
        name: 'Gò bãi đá hoa cương',
        type: 'viewpoint',
        coordinates: [108.9995, 11.5004],
        minZoom: 14,
        description: 'Địa danh gò bãi được giải thích hình thành từ cuộc giao tranh oanh liệt.',
        relativePosition: '~65m phía Tây Bắc',
        confidence: 'low',
      },
      {
        id: 'dan-cung-te-yang-patao',
        name: 'Đàn cúng tế truyền thống',
        type: 'monument',
        coordinates: [109.0002, 11.4995],
        minZoom: 15,
        description: 'Nơi nhân dân duy trì phong tục cúng tế tạ ơn thần núi Yang Patao.',
        relativePosition: '~60m phía Đông Nam',
        confidence: 'low',
      },
    ],
  },
  {
    id: 'nha-sinh-hoat-cham',
    order: 4,
    terrain: 'plain',
    title: 'Nhà sinh hoạt cộng đồng Chăm',
    province: 'Khánh Hòa',
    lngLat: [109.0, 11.6],
    zoom: 9.5,
    color: '#E11D48',
    iconType: 'house',
    summary: 'Nơi kể lại ba tác phẩm: sử thi Dewa Muno, Hoàng tử Sọ Dừa và Nàng Cha-điêng.',
    image: '/images/landmarks/nha-sinh-hoat-cham.jpg',
    detailView: {
      center: [109.0, 11.6],
      zoom: 14,
    },
    stories: [
      {
        id: 'dewa-muno',
        title: 'Sử thi Dewa Muno',
        intro:
          'Dewa Muno là sử thi dân gian mang màu sắc kỳ ảo, kể về hành trình tìm cha của hoàng tử Dewa Muno và những cuộc chiến với Xamurlaik. Tác phẩm mở ra một thế giới sử thi kỳ vĩ, đồng thời phản ánh những quan niệm về gia đình, quyền lực, tín ngưỡng và đời sống văn hóa của người Chăm lúc bấy giờ.',
      },
      {
        id: 'hoang-tu-so-dua',
        title: 'Hoàng tử Sọ Dừa',
        intro:
          'Truyện kể về sự ra đời kỳ lạ của Sọ Dừa (Cei Balaok La-u), đứa trẻ sinh ra tròn như gáo dừa sau khi người mẹ uống trũng nước mát trên đá. Sọ Dừa thông minh, tài trí nên đã chiếm được tình cảm của công chúa Út và cùng nàng nên duyên vợ chồng. Trải qua nhiều biến cố, công chúa Út được đoàn tụ với Sọ Dừa, khi chàng lên ngôi vua đưa đất nước đến thịnh vượng.',
      },
      {
        id: 'nang-cha-dieng',
        title: 'Nàng Cha-điêng',
        intro:
          'Truyện Nàng Cha-điêng lí giải nguồn gốc và ý nghĩa thiêng liêng của hai loại bánh: Sa-ka-ya tượng trưng cho trời cao, Ta-pay nung tượng trưng cho đất mẹ, qua đó gửi gắm đạo lí uống nước nhớ nguồn và lòng biết ơn sâu nặng đối với công ơn sinh thành, dưỡng dục của cha mẹ.',
      },
    ],
    subLandmarks: [
      {
        id: 'gian-nha-sinh-hoat-chinh',
        name: 'Nhà sinh hoạt cộng đồng Palei',
        type: 'building',
        coordinates: [109.0, 11.6],
        minZoom: 12,
        description: 'Nơi cộng đồng Chăm tụ họp diễn xướng các pho sử thi và truyện cổ lưu truyền.',
        relativePosition: 'Tòa nhà trung tâm',
        confidence: 'high',
      },
      {
        id: 'gian-dien-xuong-dewa-muno',
        name: 'Gian diễn xướng sử thi Dewa Muno',
        type: 'building',
        coordinates: [109.0004, 11.6002],
        minZoom: 13,
        description: 'Không gian kể hành trình tìm cha kỳ vĩ và những trận chiến với Xamurlaik.',
        relativePosition: '~45m phía Đông',
        confidence: 'low',
      },
      {
        id: 'trung-nuoc-so-dua',
        name: 'Phiến đá trũng nước mát tích Sọ Dừa',
        type: 'monument',
        coordinates: [108.9996, 11.6003],
        minZoom: 14,
        description: 'Dấu ấn truyện Cei Balaok La-u sinh ra từ vũng nước mát trên đá.',
        relativePosition: '~55m phía Tây Bắc',
        confidence: 'low',
      },
      {
        id: 'bep-banh-sakaya',
        name: 'Gian bánh thiêng Sa-ka-ya và Ta-pay nung',
        type: 'other',
        coordinates: [108.9997, 11.5995],
        minZoom: 15,
        description: 'Nơi chuẩn bị bánh tượng trưng cho trời cao và đất mẹ tri ân công ơn dưỡng dục.',
        relativePosition: '~60m phía Tây Nam',
        confidence: 'low',
      },
    ],
  },
  {
    id: 'cua-bien-phan-ri',
    order: 5,
    terrain: 'sea',
    title: 'Cửa biển Phan Rí',
    province: 'Lâm Đồng',
    lngLat: [108.53, 11.23],
    zoom: 9.5,
    color: '#0284C7',
    iconType: 'sea',
    summary: 'Cửa biển gắn với tín ngưỡng thờ Pô Riyak, vị Thần Sóng của người Chăm.',
    image: '/images/landmarks/cua-bien-phan-ri.jpg',
    detailView: {
      center: [108.53, 11.23],
      zoom: 14,
    },
    stories: [
      {
        id: 'po-riyak',
        title: 'Thần sóng Po Riyak',
        intro:
          'Bạn có biết, đằng sau tục thờ Cá Ông của cư dân ven biển miền Trung có thể là dấu ấn của một tín ngưỡng biển lâu đời của người Chăm? Đó là câu chuyện về Pô Riyak – Thần Sóng, vị thần gắn với biển cả và đời sống tâm linh của cộng đồng Chăm. Trải qua nhiều thế kỉ, tín ngưỡng thờ Pô Riyak vẫn lưu dấu trong đời sống văn hóa Chăm, đồng thời gợi mở những kết nối thú vị giữa các cộng đồng cư dân miền Trung.',
      },
    ],
    subLandmarks: [
      {
        id: 'cua-bien-phan-ri-point',
        name: 'Cửa biển Phan Rí',
        type: 'pier',
        coordinates: [108.53, 11.23],
        minZoom: 12,
        description: 'Cửa biển nghìn trùng sóng vỗ, nơi ghe thuyền Chăm ra khơi.',
        relativePosition: 'Cửa biển trung tâm',
        confidence: 'high',
      },
      {
        id: 'mieu-than-song-po-riyak',
        name: 'Miếu khấn Thần Sóng Pô Riyak',
        type: 'monument',
        coordinates: [108.5305, 11.2304],
        minZoom: 13,
        description: 'Nơi ngư dân khấn cầu Thần Sóng che chở sóng yên biển lặng trước khi ra khơi.',
        relativePosition: '~60m bờ Bắc cửa sông',
        confidence: 'low',
      },
      {
        id: 'ben-ghe-thuyen',
        name: 'Bến neo đậu ghe thuyền',
        type: 'pier',
        coordinates: [108.5295, 11.2298],
        minZoom: 14,
        description: 'Bến thuyền tấp nập của cư dân ven biển miền Trung tự bao đời.',
        relativePosition: '~60m phía Tây bến sông',
        confidence: 'low',
      },
      {
        id: 'diem-giao-thoa-ca-ong',
        name: 'Điểm giao thoa tín ngưỡng Cá Ông',
        type: 'viewpoint',
        coordinates: [108.5303, 11.2294],
        minZoom: 15,
        description: 'Không gian gợi mở sự kết nối giữa tín ngưỡng Thần Sóng và tục thờ Cá Ông.',
        relativePosition: '~70m mép bờ biển',
        confidence: 'low',
      },
    ],
  },
  {
    id: 'nuong-ray-cham',
    order: 6,
    terrain: 'mountain',
    title: 'Nương rẫy của người Chăm',
    province: 'Khánh Hòa',
    lngLat: [108.92, 11.58],
    zoom: 9.5,
    color: '#D97706',
    iconType: 'field',
    summary: 'Nương rẫy và cánh đồng gắn với truyện Limo Kapil, Bò thần Kapin.',
    image: '/images/landmarks/nuong-ray-cham.jpg',
    detailView: {
      center: [108.92, 11.58],
      zoom: 14,
    },
    stories: [
      {
        id: 'limo-kapil',
        title: 'Limo Kapil (Bò thần Kapin)',
        intro:
          'Truyện Limo Kapil kể về hình tượng Bò thần Kapin che chở mùa màng, giúp cày xới nương rẫy và gắn liền với tín ngưỡng tâm linh của người Chăm.',
      },
    ],
    subLandmarks: [
      {
        id: 'khu-nuong-ray-canh-tac',
        name: 'Khu nương rẫy canh tác',
        type: 'other',
        coordinates: [108.92, 11.58],
        minZoom: 12,
        description: 'Những mảnh nương rẫy xanh tươi gắn với đời sống lao động cần cù của người Chăm.',
        relativePosition: 'Khu vực nương trung tâm',
        confidence: 'high',
      },
      {
        id: 'duong-mon-dong-ruong',
        name: 'Đường mòn nương rẫy',
        type: 'road',
        coordinates: [108.9204, 11.5803],
        minZoom: 13,
        description: 'Con đường mòn nối các sườn nương với bờ bãi màu mỡ.',
        relativePosition: '~45m phía Đông Bắc',
        confidence: 'low',
      },
      {
        id: 'bai-nghi-chan-bo-kapin',
        name: 'Bãi cỏ tích Bò thần Kapin',
        type: 'other',
        coordinates: [108.9195, 11.5796],
        minZoom: 14,
        description: 'Nơi gắn với tích Bò thần Kapin nghỉ ngơi che chở vụ mùa no ấm.',
        relativePosition: '~65m phía Tây Nam',
        confidence: 'low',
      },
      {
        id: 'diem-ta-on-mua-mang',
        name: 'Điểm cúng tế tạ ơn đất trời',
        type: 'monument',
        coordinates: [108.9205, 11.5794],
        minZoom: 15,
        description: 'Nơi dâng lễ tạ ơn sau mùa thu hoạch hoa màu.',
        relativePosition: '~70m phía Đông Nam',
        confidence: 'low',
      },
    ],
  },
  {
    id: 'nuong-ngo',
    order: 7,
    terrain: 'mountain',
    title: 'Nương ngô',
    province: 'Khánh Hòa',
    lngLat: [108.95, 11.65],
    zoom: 9.5,
    color: '#16A34A',
    iconType: 'field',
    summary: 'Nương ngô gắn với truyện Bò Kapil, tình anh em Kapil và Kroong.',
    image: '/images/landmarks/nuong-ngo.jpg',
    detailView: {
      center: [108.95, 11.65],
      zoom: 14,
    },
    stories: [
      {
        id: 'bo-kapil',
        title: 'Bò Kapil',
        intro:
          'Truyện Bò Kapil kể về tình anh em sâu nặng giữa Kapil và Kroong, đồng thời lý giải nguồn gốc tín ngưỡng thờ bò thần và những phong tục tang ma gắn liền với đời sống văn hóa của người Chăm Bàlamôn.',
      },
    ],
    subLandmarks: [
      {
        id: 'khu-nuong-ngo-sao-xac',
        name: 'Bãi nương ngô Kapil và Kroong',
        type: 'other',
        coordinates: [108.95, 11.65],
        minZoom: 12,
        description: 'Vùng bãi nương ngô ghi dấu tình cảm anh em keo sơn sâu nặng.',
        relativePosition: 'Trung tâm nương ngô',
        confidence: 'high',
      },
      {
        id: 'tup-leu-canh-nuong',
        name: 'Túp lều canh nương',
        type: 'building',
        coordinates: [108.9504, 11.6503],
        minZoom: 13,
        description: 'Túp lều nương nơi hai anh em cùng đùm bọc qua ngày tháng gian nan.',
        relativePosition: '~45m phía Đông Bắc',
        confidence: 'low',
      },
      {
        id: 'go-tho-bo-than',
        name: 'Gò đất thờ Bò thần hộ mệnh',
        type: 'monument',
        coordinates: [108.9495, 11.6497],
        minZoom: 14,
        description: 'Nơi gửi gắm niềm tin vào sự chở che của Bò thần linh thiêng.',
        relativePosition: '~65m phía Tây Nam',
        confidence: 'low',
      },
      {
        id: 'ben-song-tang-ma',
        name: 'Bờ sông bến bãi phong tục tang ma',
        type: 'viewpoint',
        coordinates: [108.9503, 11.6494],
        minZoom: 15,
        description: 'Điểm gắn với phong tục tang ma và quan niệm bò thần dẫn lối linh hồn.',
        relativePosition: '~70m phía Đông Nam',
        confidence: 'low',
      },
    ],
  },
];

export const VIETNAM_LANDMARKS = landmarks;

/**
 * Thứ tự đọc các tác phẩm trong hành trình (theo van.docx).
 * Lưu ý: khác với thứ tự mốc trên bản đồ, vì Mốc 4 có 3 tác phẩm đọc xen kẽ với Mốc 5.
 */
export const STORY_ORDER = [
  'nu-than-po-nagar',
  'po-kuk',
  'yang-patao',
  'dewa-muno',
  'po-riyak',
  'hoang-tu-so-dua',
  'nang-cha-dieng',
  'bo-kapil',
];
