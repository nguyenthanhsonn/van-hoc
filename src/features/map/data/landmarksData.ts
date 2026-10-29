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
    summary:
      'Tháp Bà Ponagar (Thiên Y tháp cổ) nằm trên đồi Cù Lao bên dòng sông Cái, Nha Trang. Nơi thờ Nữ thần Po Inư Nưgar – Mẹ của xứ sở.',
    image: '/images/landmarks/po-nagar-reference.png',
    area: { radiusMeters: 250 },
    detailView: {
      center: [109.1956, 12.2653],
      zoom: 16,
    },
    stories: [
      {
        id: 'nu-than-po-nagar',
        title: 'Po Inư Nưgar - Mẹ của xứ sở hay Bà Chúa Xứ',
        intro:
          'Kể về sự khởi đầu của vũ trụ và hành trình kiến tạo thế giới, văn minh của Nữ thần Pô Naga cùng các vị thần linh theo thần thoại Chăm.',
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
    summary:
      'Gắn với thần thoại Po Kuk Parahimuk – vị thần chúa tể khôi phục ánh sáng mặt trời, mặt trăng và tái lập trật tự vũ trụ.',
    image: '/images/landmarks/po-kuk-reference.png',
    area: { radiusMeters: 250 },
    detailView: {
      center: [108.896455, 11.558092],
      zoom: 16,
    },
    stories: [
      {
        id: 'po-kuk',
        title: 'Po Kuk Parahimuk (Đấng sáng tạo ra vũ trụ và mọi vật trong trời đất)',
        intro:
          'Kể về đấng sáng tạo muôn loài Pô Kuk Brahimưk, người khôi phục ánh sáng nhật nguyệt và sự luân chuyển ngày đêm với sự giúp sức của gà trống và loài vịt.',
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
    summary:
      'Di tích tâm linh với những khối đá thạch anh trắng tinh khiết, gắn liền với cuộc đọ sức bảo vệ xứ Chăm giữa Po Kei Glaong và Rak Bir Suer.',
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
          'Kể về cuộc đọ sức bảo vệ dân tộc giữa Po Kei Glaong và Rak Bir Suer, từ đó lý giải nguồn gốc tên núi Yang Patao, các địa danh Gò Bể, Gò Mâm và lễ cúng Padhi truyền thống.',
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
          'Sử thi đồ sộ mang màu sắc kỳ ảo kể về hành trình tìm cha của hoàng tử Dewa Muno, tình nghĩa huynh đệ, mối tình với công chúa hóa voi trắng Ratna và những trận đại chiến kinh thiên động địa với Xamurlaik.',
      },
      {
        id: 'hoang-tu-so-dua',
        title: 'Cei Balaok La-u (Hoàng tử Sọ Dừa)',
        intro:
          'Truyện cổ Chăm kể về Cei Balaok La-u sinh ra tròn như gáo dừa nhưng tài hoa, khôn ngoan, cùng công chúa Út vượt qua lòng ghen ghét của hai người chị để đoàn tụ và cai trị đất nước thái bình, thịnh vượng.',
      },
      {
        id: 'nang-cha-dieng',
        title: 'Nàng Cha-điêng',
        intro:
          'Truyện cổ Chăm kể về nàng Cha-điêng cùng hoàng tử út sáng tạo nên hai loại bánh Sa-ka-ya và Ta-pay nung tượng trưng cho Trời và Đất, gửi gắm tấm lòng thảo thơm và đạo nghĩa tri ân cha mẹ.',
      },
    ],
    subLandmarks: [],
  },
  {
    id: 'cua-bien-phan-ri',
    order: 5,
    terrain: 'sea',
    title: 'Cửa biển Phan Rí',
    positionType: 'verified',
    theme: { color: '#1F6FC2', textOn: '#FFFFFF' },
    positionSource: 'bảng người dùng',
    province: 'Bình Thuận',
    lngLat: [108.5623, 11.1634],
    zoom: 9.5,
    iconType: 'sea',
    summary:
      'Cửa biển và đồi cát Phan Rí gắn với truyền thuyết Po Riyak (Thần Sóng) – mảnh ghép văn hóa biển và tín ngưỡng thờ Cá Ông linh thiêng của người Chăm.',
    image: '/images/landmarks/phan-ri-reference.png',
    area: { radiusMeters: 500 },
    detailView: {
      center: [108.5623, 11.1634],
      zoom: 16,
    },
    stories: [
      {
        id: 'po-riyak',
        title: 'Po Riyak - Thần Sóng',
        intro:
          'Kể về truyền thuyết Po Riyak, vị anh hùng sinh tại làng Aia Dak, vượt biển tìm đạo rồi hóa thân vào cá Ông bảo bọc người đi biển, khởi nguồn cho lễ cúng Thần Sóng hằng năm sau dịp Rija Nưgar.',
      },
    ],
    subLandmarks: [],
  },
  {
    id: 'nuong-ray-cham',
    order: 6,
    terrain: 'plain',
    title: 'Nương rẫy Chăm',
    positionType: 'verified',
    theme: { color: '#D6336C', textOn: '#FFFFFF' },
    positionSource: 'bảng người dùng',
    province: 'Ninh Thuận',
    lngLat: [108.9311, 11.5214],
    zoom: 9.5,
    iconType: 'field',
    summary:
      'Gắn với Sự tích con bò thần Kapin (Limoaw Kapil), câu chuyện tình anh em nghĩa nặng và nguồn gốc phong tục tín ngưỡng Chăm Bàlamôn.',
    image: '/images/landmarks/bo-kapil-reference.png',
    area: { radiusMeters: 500 },
    detailView: {
      center: [108.9311, 11.5214],
      zoom: 16,
    },
    stories: [
      {
        id: 'bo-kapil',
        title: 'Sự tích con bò thần Kapin',
        intro:
          'Kể về tình anh em thiêng liêng giữa con bò biết nói Kapil và chàng Kroong, cùng nguồn gốc tín ngưỡng thờ bò thần Nandin và nghi thức hỏa táng truyền thống của người Chăm Bàlamôn.',
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

