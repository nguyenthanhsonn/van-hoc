export interface MapSpot {
  id: string;
  name: string;
  category: "culture" | "beach" | "nature" | "marina";
  categoryLabel: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  tag: string;
  description: string;
  votes: string;
  rating: number;
  image: string;
  features: string[];
}

export const MAP_SPOTS: MapSpot[] = [
  {
    id: "temple-peak",
    name: "Quần thể Đền Tháp Cổ",
    category: "culture",
    categoryLabel: "Di tích văn hoá",
    x: 44.5,
    y: 17.5,
    tag: "Di sản kiến trúc",
    description: "Khu đền tháp cổ kính tọa lạc trên đỉnh đồi lộng gió, bao quanh bởi rừng nguyên sinh và hướng tầm nhìn trọn vẹn ra vịnh biển.",
    votes: "45.290",
    rating: 4.9,
    image: "/images/coastal-map.jpg",
    features: ["Ngắm bình minh 360°", "Kiến trúc tháp gạch nung", "Không gian thanh tịnh"],
  },
  {
    id: "marina-pier",
    name: "Cầu Tàu & Bến Du Thuyền",
    category: "marina",
    categoryLabel: "Cửa ngõ biển",
    x: 69.5,
    y: 54.5,
    tag: "Trải nghiệm biển",
    description: "Điểm neo đậu của các thuyền buồm và tàu du lịch đưa du khách ra các hòn đảo lân cận, lặn ngắm san hô.",
    votes: "38.120",
    rating: 4.8,
    image: "/images/coastal-map.jpg",
    features: ["Tàu cao tốc tham quan", "Thuê thuyền buồm", "Điểm ngắm hoàng hôn"],
  },
  {
    id: "golden-beach",
    name: "Vịnh Biển Bãi Cát Vàng",
    category: "beach",
    categoryLabel: "Bãi biển",
    x: 61.5,
    y: 69.5,
    tag: "Thư giãn & Thể thao",
    description: "Bãi cát mịn thoai thoải trải dài theo bờ biển nước trong vắt màu ngọc bích, thích hợp cho các hoạt động tắm biển và chèo kayak.",
    votes: "52.840",
    rating: 4.9,
    image: "/images/coastal-map.jpg",
    features: ["Nước biển trong xanh", "Chèo SUP / Kayak", "Hải sản ven bờ"],
  },
  {
    id: "heritage-village",
    name: "Làng Di Sản & Nghề Truyền Thống",
    category: "culture",
    categoryLabel: "Làng văn hoá",
    x: 43.5,
    y: 50.5,
    tag: "Đời sống bản địa",
    description: "Khu làng ngói đỏ truyền thống gìn giữ nét văn hóa dân gian miền duyên hải, các nghề thủ công mỹ nghệ và ẩm thực đặc trưng.",
    votes: "31.760",
    rating: 4.7,
    image: "/images/coastal-map.jpg",
    features: ["Nhà cổ ngói đỏ", "Ẩm thực truyền thống", "Lễ hội dân gian"],
  },
  {
    id: "rocky-mountain",
    name: "Dãy Núi Đá & Cánh Đồng Mẫu",
    category: "nature",
    categoryLabel: "Cảnh quan thiên nhiên",
    x: 18.5,
    y: 35.5,
    tag: "Trekking & Sinh thái",
    description: "Những khối núi đá vôi hùng vĩ nằm kề bên thung lũng màu mỡ với các ô đồng xanh ngát tạo nên bức tranh thiên nhiên tuyệt mỹ.",
    votes: "27.430",
    rating: 4.8,
    image: "/images/coastal-map.jpg",
    features: ["Trekking đường mòn", "Điểm săn mây", "Khung cảnh hùng vĩ"],
  },
];
