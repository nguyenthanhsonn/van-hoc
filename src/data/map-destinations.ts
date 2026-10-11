import type { MapDestination } from "@/types/map";

// Coordinates are in the SVG viewBox system: 2752 × 1536
// Image: public/images/coastal-map-ai-hd.jpg (original, calibrated)

export const mapDestinations: MapDestination[] = [
  {
    id: "po-nagar",
    order: 1,
    name: "Tháp Bà Po Nagar",
    subtitle: "Nữ thần Po Nagar",
    location: "Phía bắc palei, trên gò đất cao",
    story: "Câu chuyện về nữ thần, sự hình thành thế giới và vai trò kiến tạo của bà.",
    color: "#e76f51",
    circle: { cx: 1365, cy: 370, r: 155 },
    anchor: { x: 1390, y: 195 },
    side: 1,
    polygon:
      "1260,370 1250,305 1280,285 1330,300 1370,265 1410,265 1445,340 1475,390 1445,455 1370,455 1315,440 1260,370",
  },
  {
    id: "elder-house",
    order: 2,
    name: "Nhà của già làng",
    subtitle: "Po Kuk Parahimuk",
    location: "Phía tây khu dân cư trung tâm",
    story: "Câu chuyện về truyền thuyết Po Kuk Parahimuk.",
    color: "#a855f7",
    circle: { cx: 875, cy: 615, r: 105 },
    anchor: { x: 860, y: 495 },
    side: 1,
    polygon:
      "805,605 850,570 915,580 945,615 930,655 865,660 815,640",
  },
  {
    id: "yang-patao",
    order: 3,
    name: "Núi Đá Trắng Yang Patao",
    location: "Góc tây bắc, phía sau khu dân cư",
    story: "Câu chuyện về truyền thuyết Núi Yang Patao.",
    color: "#10b981",
    circle: { cx: 320, cy: 350, r: 290 },
    anchor: { x: 260, y: 60 },
    side: 1,
    polygon:
      "30,380 40,230 100,180 180,180 270,185 370,230 460,270 550,320 580,380 480,450 410,470 310,450 200,410 90,420 30,380",
  },
  {
    id: "community-house",
    order: 4,
    name: "Nhà làng",
    subtitle: "Sử thi Dewa Muno",
    location: "Trung tâm palei, gần ngã đường làng",
    story: "Câu chuyện về sử thi Dewa Muno.",
    color: "#ef4444",
    circle: { cx: 1185, cy: 740, r: 105 },
    anchor: { x: 1185, y: 620 },
    side: 1,
    polygon:
      "1060,695 1105,650 1185,645 1250,680 1245,745 1195,765 1105,765 1060,725",
  },
  {
    id: "phan-ri-harbor",
    order: 5,
    name: "Cửa biển Phan Rí",
    subtitle: "Thần sóng Po Riyak",
    location: "Phía đông, giáp biển",
    story: "Câu chuyện về thần sóng Po Riyak.",
    color: "#0284c7",
    circle: { cx: 2080, cy: 840, r: 230 },
    anchor: { x: 1960, y: 590 },
    side: -1,
    polygon:
      "1860,710 1980,685 2150,715 2360,750 2360,780 2210,770 2160,820 2180,950 2100,970 2070,890 1960,890 1880,850 1860,780",
  },
  {
    id: "wedding-house",
    order: 6,
    name: "Nhà tổ chức lễ cưới",
    subtitle: "Hoàng tử Sọ Dừa",
    location: "Phía đông nam khu dân cư",
    story: "Câu chuyện về phong tục dùng trầu cau trong lễ cưới.",
    color: "#ec4899",
    circle: { cx: 1400, cy: 840, r: 150 },
    anchor: { x: 1400, y: 680 },
    side: 1,
    polygon:
      "1290,790 1340,750 1445,750 1480,790 1465,845 1375,855 1300,840",
  },
  {
    id: "festival-yard",
    order: 7,
    name: "Sân chuẩn bị lễ hội",
    subtitle: "Nàng Cha Điêng",
    location: "Phía nam palei, gần khu sinh hoạt cộng đồng",
    story:
      "Câu chuyện về bánh Sakaya và Tapei Nung, thường dùng trong lễ hội Rijar Nugar và Kate.",
    color: "#f59e0b",
    circle: { cx: 1160, cy: 1020, r: 200 },
    anchor: { x: 1160, y: 810 },
    side: 1,
    polygon:
      "1040,940 1080,880 1200,860 1330,880 1380,950 1370,1030 1250,1060 1120,1050 1050,1000",
  },
  {
    id: "terraced-field",
    order: 8,
    name: "Nương rẫy",
    subtitle: "Bò thần Kapin",
    location: "Phía tây nam, ngoài rìa khu dân cư",
    story: "Câu chuyện về bò thần Kapin.",
    color: "#059669",
    circle: { cx: 480, cy: 1090, r: 145 },
    anchor: { x: 440, y: 920 },
    side: 1,
    polygon:
      "40,880 180,760 380,750 510,790 530,940 440,1100 480,1280 340,1350 140,1320 30,1150 40,880",
  },
];
