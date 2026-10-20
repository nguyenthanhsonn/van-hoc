import type { Terrain, DetailView, SubLandmark, PositionType, LandmarkTheme } from '../types';

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
  positionType: PositionType;
  theme: LandmarkTheme;
  needsReview?: boolean;
  positionSource?: string;
  hidden?: boolean;
  province: string;
  lngLat: [number, number];
  zoom?: number;
  color?: string;
  iconType?: 'temple' | 'mountain' | 'house' | 'sea' | 'field';
  summary: string;
  image: string;
  stories: Story[];
  detailView?: DetailView;
  area?: { polygon?: [number, number][]; radiusMeters?: number };
  subLandmarks?: SubLandmark[];
};

export const landmarks: Landmark[] = [
  {
    id: 'thap-ba-po-nagar',
    order: 1,
    terrain: 'plain',
    title: 'Tháp Bà Po Nagar',
    positionType: 'verified',
    theme: { color: '#C8431F', textOn: '#FFFFFF' },
    positionSource: 'Wikipedia + ảnh Google Maps',
    province: 'Khánh Hòa',
    lngLat: [109.1956, 12.2653],
    zoom: 9,
    iconType: 'temple',
    summary: 'Nơi thờ nữ thần Po Nagar, vị thần tối cao được người Chăm đời đời sùng kính.',
    image: '/images/landmarks/po-nagar-reference.png',
    area: { radiusMeters: 250 },
    detailView: {
      center: [109.1956, 12.2653],
      zoom: 16,
    },
    stories: [
      {
        id: 'nu-than-po-nagar',
        title: 'Nữ thần Po Nagar',
        intro:
          'Thần thoại Nữ thần Po Nagar (Mụ Dụ) kể về vị thần tối cao được sai xuống trần gian để tái lập trật tự vũ trụ, sáng tạo ra các hiện tượng tự nhiên, khai sinh tôn giáo, truyền dạy nghề nông và văn hóa xã hội, được người Chăm đời đời sùng kính.',
      },
    ],
    subLandmarks: [],
  },
  {
    id: 'po-kuk',
    order: 2,
    terrain: 'mountain',
    title: 'Đường lên núi Đá Trắng',
    positionType: 'verified',
    theme: { color: '#7C4DCC', textOn: '#FFFFFF' },
    positionSource: 'số in trong ảnh Google Maps',
    province: 'Khánh Hòa',
    lngLat: [108.896455, 11.558092],
    zoom: 9.5,
    iconType: 'mountain',
    summary: 'Gắn với thần thoại Po Kuk Parahimuk về ánh sáng và sự luân chuyển ngày đêm.',
    image: '/images/landmarks/duong-nui-da-trang-reference.png',
    area: { radiusMeters: 250 },
    detailView: {
      center: [108.896455, 11.558092],
      zoom: 16,
    },
    stories: [
      {
        id: 'po-kuk',
        title: 'Po Kuk Parahimuk',
        intro:
          'Thần thoại Po Kuk kể về những sự việc huyền bí liên quan đến Po Kuk Parahimuk, về ánh sáng và sự luân chuyển ngày đêm, qua đó lý giải nguồn gốc một số hiện tượng tự nhiên và phong tục, tín ngưỡng của người Chăm.',
      },
    ],
    subLandmarks: [],
  },
  {
    id: 'nui-da-trang',
    order: 3,
    terrain: 'mountain',
    title: 'Cek Yang Patao – núi Đá Trắng',
    positionType: 'approx',
    theme: { color: '#0B7F70', textOn: '#FFFFFF' },
    positionSource: 'ước lượng từ ảnh, khớp bảng',
    province: 'Khánh Hòa',
    lngLat: [108.8963, 11.5579],
    zoom: 9.5,
    iconType: 'mountain',
    summary: 'Ngọn núi gắn với trận đọ sức giữa Po Kei Glaong và Rak Bir Suer để bảo vệ xứ Chăm.',
    image: '/images/landmarks/yang-patao-reference.png',
    area: { radiusMeters: 500 },
    detailView: {
      center: [108.8963, 11.5579],
      zoom: 16,
    },
    stories: [
      {
        id: 'yang-patao',
        title: 'Truyền thuyết núi Yang Patao',
        intro:
          'Truyền thuyết núi Yang Patao kể về trận chiến đọ sức giữa Po Kei Glaong và kẻ ngoại bang Rak Bir Suer để bảo vệ xứ Chăm khỏi ách cai trị, từ đó giải thích nguồn gốc tên núi Yang Patao, các địa danh gò bãi và phong tục cúng tế truyền thống.',
      },
    ],
    subLandmarks: [],
  },
  {
    id: 'nha-sinh-hoat-cham',
    order: 4,
    terrain: 'plain',
    title: 'Nhà sinh hoạt cộng đồng Chăm (Bàu Trúc)',
    positionType: 'approx',
    theme: { color: '#E9A21B', textOn: '#1F2937' },
    needsReview: true,
    positionSource: 'bảng người dùng',
    province: 'Khánh Hòa',
    lngLat: [108.9515, 11.5173],
    zoom: 9.5,
    iconType: 'house',
    summary: 'Nơi kể lại ba tác phẩm: sử thi Dewa Muno, Hoàng tử Sọ Dừa và Nàng Cha-điêng.',
    image: '/images/landmarks/nha-cong-dong-cham-reference.png',
    area: { radiusMeters: 300 },
    detailView: {
      center: [108.9515, 11.5173],
      zoom: 16,
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
    subLandmarks: [],
  },
  {
    id: 'cua-bien-phan-ri',
    order: 5,
    terrain: 'sea',
    title: 'Cửa biển Phan Rí',
    positionType: 'approx',
    theme: { color: '#1F6FC2', textOn: '#FFFFFF' },
    needsReview: true,
    positionSource: 'bảng người dùng',
    province: 'Lâm Đồng',
    lngLat: [108.5623, 11.1634],
    zoom: 9.5,
    iconType: 'sea',
    summary: 'Cửa biển gắn với tín ngưỡng thờ Pô Riyak, vị Thần Sóng của người Chăm.',
    image: '/images/landmarks/phan-ri-reference.png',
    area: { radiusMeters: 500 },
    detailView: {
      center: [108.5623, 11.1634],
      zoom: 16,
    },
    stories: [
      {
        id: 'po-riyak',
        title: 'Thần sóng Po Riyak',
        intro:
          'Bạn có biết, đằng sau tục thờ Cá Ông của cư dân ven biển miền Trung có thể là dấu ấn của một tín ngưỡng biển lâu đời của người Chăm? Đó là câu chuyện về Pô Riyak – Thần Sóng, vị thần gắn với biển cả và đời sống tâm linh của cộng đồng Chăm. Trải qua nhiều thế kỉ, tín ngưỡng thờ Pô Riyak vẫn lưu dấu trong đời sống văn hóa Chăm, đồng thời gợi mở những kết nối thú vị giữa các cộng đồng cư dân miền Trung.',
      },
    ],
    subLandmarks: [],
  },
  {
    id: 'nuong-ray-cham',
    order: 6,
    terrain: 'plain',
    title: 'Nương ngô',
    positionType: 'approx',
    theme: { color: '#D6336C', textOn: '#FFFFFF' },
    needsReview: true,
    positionSource: 'bảng người dùng',
    province: 'Khánh Hòa',
    lngLat: [108.9311, 11.5214],
    zoom: 9.5,
    iconType: 'field',
    summary: 'Nương ngô gắn với truyện Bò Kapil, tình anh em Kapil và Kroong.',
    image: '/images/landmarks/nuong-ngo-reference.png',
    area: { radiusMeters: 500 },
    detailView: {
      center: [108.9311, 11.5214],
      zoom: 16,
    },
    stories: [
      {
        id: 'bo-kapil',
        title: 'Bò Kapil',
        intro:
          'Truyện Bò Kapil kể về tình anh em sâu nặng giữa Kapil và Kroong, đồng thời lý giải nguồn gốc tín ngưỡng thờ bò thần và những phong tục tang ma gắn liền với đời sống văn hóa của người Chăm Bàlamôn.',
      },
    ],
    subLandmarks: [],
  },
  {
    id: 'duong-len-nui-da-trang',
    order: 7,
    hidden: true,
    terrain: 'mountain',
    title: 'Đường lên núi Đá Trắng',
    positionType: 'illustrative',
    theme: { color: '#7C4DCC', textOn: '#FFFFFF' },
    needsReview: true,
    province: 'Khánh Hòa',
    lngLat: [108.98, 11.55],
    zoom: 9.5,
    iconType: 'house',
    summary: 'Con đường lên núi Đá Trắng, gắn với thần thoại Po Kuk về ánh sáng và ngày đêm.',
    image: '/images/landmarks/duong-nui-da-trang-reference.png',
    area: { radiusMeters: 1500 },
    detailView: {
      center: [108.98, 11.55],
      zoom: 13,
    },
    stories: [
      {
        id: 'po-kuk',
        title: 'Po Kuk Parahimuk',
        intro:
          'Thần thoại Po Kuk kể về những sự việc huyền bí liên quan đến Po Kuk Parahimuk, về ánh sáng và sự luân chuyển ngày đêm, qua đó lý giải nguồn gốc một số hiện tượng tự nhiên và phong tục, tín ngưỡng của người Chăm.',
      },
    ],
    subLandmarks: [],
  },
  {
    id: 'nuong-ngo',
    order: 8,
    hidden: true,
    terrain: 'mountain',
    title: 'Nương ngô',
    positionType: 'illustrative',
    theme: { color: '#D6336C', textOn: '#FFFFFF' },
    needsReview: true,
    province: 'Khánh Hòa',
    lngLat: [108.95, 11.65],
    zoom: 9.5,
    iconType: 'field',
    summary: 'Nương ngô gắn với truyện Bò Kapil, tình anh em Kapil và Kroong.',
    image: '/images/landmarks/nuong-ngo-reference.png',
    area: { radiusMeters: 1500 },
    detailView: {
      center: [108.95, 11.65],
      zoom: 13,
    },
    stories: [
      {
        id: 'bo-kapil',
        title: 'Bò Kapil',
        intro:
          'Truyện Bò Kapil kể về tình anh em sâu nặng giữa Kapil và Kroong, đồng thời lý giải nguồn gốc tín ngưỡng thờ bò thần và những phong tục tang ma gắn liền với đời sống văn hóa của người Chăm Bàlamôn.',
      },
    ],
    subLandmarks: [],
  },
];

export const VIETNAM_LANDMARKS = landmarks;

/**
 * Thứ tự đọc các tác phẩm trong hành trình (theo van.docx).
 * Nữ thần Po Nagar → Po Kuk Parahimuk → Truyền thuyết núi Yang Patao → Sử thi Dewa Muno → Thần sóng Po Riyak → Hoàng tử Sọ Dừa → Nàng Cha-điêng → Bò thần Kapin.
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

