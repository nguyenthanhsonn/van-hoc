# Bản Đồ Việt Nam 2D Tương Tác (Next.js & MapLibre GL JS)

Dự án bản đồ 2D Việt Nam tương tác production-ready trên nền **Next.js (App Router)**, hoàn toàn độc lập không sử dụng basemap/tile online từ bên thứ ba (render trực tiếp dữ liệu GeoJSON nội bộ).

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack) + React 19 + TypeScript (strict mode)
- **Mapping Engine:** MapLibre GL JS (offline vector style, 2D thuần, không phụ thuộc map server)
- **Styling:** CSS Modules & globals.css (không magic numbers, tập trung tại `mapConfig.ts`)
- **Dữ liệu:** GeoJSON ranh giới hành chính 34 đơn vị sau sáp nhập + đầy đủ Quần đảo Hoàng Sa & Trường Sa + Các mốc địa danh văn học & lịch sử.

---

## 📁 Cấu trúc thư mục

```text
src/
  app/
    layout.tsx                  # Root layout Next.js (Metadata, viewport, imports)
    page.tsx                    # Trang chủ (Client Component load động VietnamMap)
    globals.css                 # Reset CSS full-screen & marker animations
  features/map/
    components/
      VietnamMap.tsx            # Component giao diện bản đồ, toolbar & HUD card
      VietnamMap.module.css     # CSS Modules giao diện kính mờ và layout full-screen
    hooks/
      useVietnamMap.ts          # Custom hook khởi tạo MapLibre, quản lý source/layer/events
    config/
      mapConfig.ts              # Quản lý toàn bộ thông số bounds, zoom, màu sắc, layer ID
    data/
      landmarksData.ts          # Dữ liệu các mốc địa danh văn học & lịch sử
    types.ts                    # TypeScript types (zero `any`, strict type-safety)
public/
  maplibre-gl-worker.mjs        # Web worker offline của MapLibre GL
  data/
    vietnam-provinces.geojson   # File dữ liệu ranh giới 34 tỉnh/thành + Hoàng Sa & Trường Sa
```


---

## 🛠 Hướng dẫn cài đặt & khởi chạy

### 1. Cài đặt dependencies:
```bash
pnpm install
# hoặc: npm install / yarn
```

### 2. Khởi chạy môi trường phát triển (Dev Server):
```bash
pnpm run dev
# hoặc: npm run dev
```
Mở trình duyệt tại địa chỉ hiển thị trên terminal (mặc định: `http://localhost:3000`).

### 3. Build production:
```bash
pnpm run build
```

---

## 🗺 Hướng dẫn thay thế file GeoJSON (`vietnam-provinces.geojson`)

Dữ liệu bản đồ được nạp động từ file:
`public/data/vietnam-provinces.geojson`

### 1. Yêu cầu Schema tối thiểu của mỗi Feature:
Mỗi feature đại diện cho một tỉnh/thành phải có cấu trúc GeoJSON chuẩn:
```json
{
  "type": "Feature",
  "id": "21",
  "properties": {
    "code": "21",
    "name": "Đà Nẵng",
    "merged": "Đà Nẵng, Quảng Nam",
    "type": "Thành phố",
    "areaKm2": 11913.2,
    "population": 3122915.0
  },
  "geometry": {
    "type": "MultiPolygon",
    "coordinates": [ ... ]
  }
}
```

- **`code`** *(bắt buộc)*: Mã định danh hoặc mã hành chính của đơn vị (string hoặc number).
- **`name`** *(bắt buộc)*: Tên tỉnh/thành hiển thị trên nhãn (string).
- Các trường tuỳ chọn: `merged` (thông tin sáp nhập), `areaKm2`, `population`.

### 2. Yêu cầu về Biển Đảo Chủ Quyền:
- **Quần đảo Hoàng Sa**: Thuộc đơn vị hành chính TP. Đà Nẵng.
- **Quần đảo Trường Sa**: Thuộc đơn vị hành chính Tỉnh Khánh Hòa.
- Đã có sẵn 2 điểm nhãn toạ độ (`Point`) để hiển thị nhãn chữ rõ nét ở mức zoom toàn quốc:
  - Hoàng Sa: toạ độ `[112.0, 16.5]`
  - Trường Sa: toạ độ `[114.5, 9.5]`

### 3. Cách cập nhật toạ độ mới:
1. Xuất file ranh giới hành chính của bạn dưới định dạng `.geojson` (hệ toạ độ WGS84 - EPSG:4326).
2. Đổi tên file thành `vietnam-provinces.geojson`.
3. Ghi đè file vào thư mục `public/data/vietnam-provinces.geojson`.
4. Bản đồ sẽ tự động nạp dữ liệu mới khi tải trang mà không cần sửa bất kỳ dòng code nào.

---

## ⚙️ Tuỳ biến cấu hình bản đồ (`mapConfig.ts`)

Mọi thông số về thẩm mỹ, màu sắc, khung nhìn toạ độ đều được gom tại `src/features/map/config/mapConfig.ts`:
- **Nền biển:** `colors.seaBackground` (mặc định: `#e8f4f8` - xanh dương nhạt).
- **Màu tô tỉnh:** `colors.provinceFill` (`#dcfce7`) và `colors.provinceFillHover` (`#86efac`).
- **Viền ranh giới:** `colors.provinceStroke` (màu trắng `#ffffff`, viền mảnh `1.0px`).
- **Ẩn bớt nhãn khi zoom thấp:** `label.minZoom` (ngưỡng zoom hiển thị nhãn tránh đè chữ).
- **Khung nhìn:** `bounds` và `maxBounds` giới hạn phạm vi di chuyển quanh lãnh thổ Việt Nam.

---

## 📍 Các mốc địa danh văn học & lịch sử (`landmarksData.ts`)

Các điểm mốc di tích và văn hóa được cấu hình tại:
`src/features/map/data/landmarksData.ts`

Bao gồm các mốc:
1. **Mốc 1: Tháp bà Po Nagar** — Tọa độ: `[109.1958, 12.2654]` (Nha Trang, Khánh Hòa)
2. **Mốc 3: Núi Đá Trắng (Yang Patao)** — Tọa độ: `[108.896455, 11.558092]` (Ninh Phước, Ninh Thuận)
3. **Mốc 5: Nương rẫy / Cánh đồng của người Chăm** — Tọa độ: `[108.9180, 11.5300]` (Ninh Thuận)
4. **Mốc 6: Cửa biển Phan Rí** — Tọa độ: `[108.5528, 11.1764]` (Tuy Phong, Bình Thuận)

Mỗi mốc có:
- Tọa độ GPS chính xác `[kinh độ, vĩ độ]`.
- Marker tương tác với vòng hiệu ứng xung nhịp (pulse animation), số thứ tự và nhãn tên.
- Thẻ HUD chi tiết hiển thị giai thoại văn học / văn hóa, vị trí và nút bay (`flyTo`) đến tâm điểm.
