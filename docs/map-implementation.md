# Báo cáo bản đồ OpenFreeMap

> Bản ghi triển khai ban đầu. Luồng dữ liệu hiện hành đã chuyển sang geocoding và đặt tay có duyệt; không chờ toàn văn hay 4 góc ảnh, không yêu cầu 3–8 điểm con. Lớp ảnh coastal và ba điểm con chưa xác thực đã được gỡ. Xem [cập nhật geocoding](geocoding.md).

## Kết quả và file

- `scripts/make-mask.ts`: union Turf v7, thử cleanCoords/buffer(0) khi lỗi, kiểm tra phần mất bằng difference (sai số <1 m²), tạo mask. 245 polygon đầu vào → 212 polygon sau union → 212 lỗ mask, không mất thành phần.
- `public/data/vietnam-mask.geojson`: mặt nạ ngoài lãnh thổ (khoảng 58 KB). Bảo toàn mọi polygon nguồn. Các chấm/nhãn Hoàng Sa, Trường Sa có sẵn ở cấu hình vẫn được vẽ riêng; không bổ sung polygon đảo giả.
- `package.json`: thêm `make-mask`; giữ dependency và thiết lập build có sẵn của người dùng. Không sửa pnpm-workspace.yaml hay pnpm-lock.yaml trong tác vụ này.
- `src/features/map/config/mapConfig.ts`: Positron, màu biển hiện tại, zoom 4–18, bounds, opacity tỉnh, màu địa hình/popup, ngưỡng vùng và chi tiết. Coastal tắt, coordinates null chờ dữ liệu thật.
- `src/features/map/hooks/useVietnamMap.ts`: theme nền, font nội bộ trước khi tải style, mask; cluster và các layer pin/số/nhãn/vòng chọn; tương tác chung với legend và URL; vùng tròn và layer chi tiết riêng từng minzoom; cleanup listener và map. Giữ thẻ nội dung React làm cửa sổ thông tin hiện tại khi click layer.
- `src/features/map/types.ts`: thêm area; giữ Terrain, DetailView, SubLandmark và field cũ.
- `src/features/map/data/landmarksData.ts`: giữ nguyên 7 id/tên/thứ tự và toàn bộ tọa độ chính; thêm vùng và detailView 13–14; loại chi tiết không được văn bản xác nhận.
- `src/features/map/components/VietnamMap.tsx`: badge màu địa hình; Enter/Space/click chọn cùng hàm; aria-pressed.
- `src/features/map/components/VietnamMap.module.css`: legend cuộn, dưới 45dvh trên màn hình hẹp; thẻ nội dung đặt góc trái trên ở desktop để không phủ danh sách mốc.
- `README.md`, `docs/map-implementation.md`: hướng dẫn tạo mask và các giới hạn dữ liệu.

## Layer nền đã xử lý

Style: https://tiles.openfreemap.org/styles/positron

Ẩn: `label_state`, `label_country_3`, `label_country_2`, `label_country_1`.
Cũng tự động ẩn symbol có id chứa `place`/`boundary` nếu style thêm các ID này.

Đổi màu nền: `background` → #e0ecda.
Đất/công viên: `park`, `landcover_ice_shelf`, `landcover_glacier`, `landuse_residential`, `landcover_wood` → #dfebd6.
Nước: `water`, `waterway` → #e3f1ec.
Giảm opacity 0.45: `road_pier`, `highway_path`, `highway_minor`, `highway_major_casing`, `highway_major_inner`, `highway_major_subtle`, `highway_motorway_casing`, `highway_motorway_inner`, `highway_motorway_subtle`, `highway_motorway_bridge_casing`, `highway_motorway_bridge_inner`, `boundary_3`, `boundary_2`, `boundary_disputed`.

Mọi symbol dùng Noto Sans Regular. Nhãn tên nền dùng name:latin/name:en để không yêu cầu dải glyph Thái/Lào/Hán chưa có trong bộ font. Nhãn Việt Nam tự vẽ giữ nội dung tiếng Việt.

## Những quyết định cần xem bằng mắt

- Biển lấy đúng #e3f1ec đang có; màu đất xanh nhạt và opacity đường 0.45 là lựa chọn thẩm mỹ.
- Giữ phân loại terrain đã có: mốc 1/4 plain, 5 sea, 2/3/6/7 mountain. Đây chưa phải phân loại địa hình khảo sát.
- Bán kính minh họa theo thứ tự mốc: 250, 1000, 1500, 250, 500, 1000, 1000 mét. Zoom 14 cho 1/4; zoom 13 cho các mốc còn lại. Không coi vòng tròn là địa giới thực.
- Thứ tự: nền → tô/viền tỉnh → mask → coastal (nếu bật) → vùng → chi tiết → pin/cụm/số/tên → chấm đảo, nhãn tỉnh/đảo/biển.
- MAX_BOUNDS vẫn là [[100,5],[120,25]]. transformConstrain giới hạn **tâm camera** trong bounds và zoom 4–18; viewport được phép nhìn ra biển ngoài bounds ở toàn cảnh. Giới hạn toàn viewport theo mặc định MapLibre sẽ tự tăng zoom, cắt miền Bắc hoặc miền Tây trên các tỷ lệ màn hình rộng/hẹp. Reset xóa padding cũ trước khi fitBounds.

## Phần D bị giới hạn bởi tư liệu

`storiesContent.ts` tự ghi là nội dung biên soạn thử từ intro, chưa phải toàn văn. Không đủ căn cứ để tạo 3–8 công trình con cho mỗi mốc. Các chi tiết như bái đường, cửa sông Cái, dốc đá, miếu, bến ghe, lều, đàn tế và bãi nghỉ bò trong dữ liệu cũ đã bị bỏ vì không có trong văn bản.

Chỉ giữ ba điểm neo văn bản: Tháp Bà Po Nagar, núi Yang Patao, cửa biển Phan Rí. Tất cả confidence low, dùng đúng tâm mốc gốc, relativePosition ghi rõ chưa khảo sát riêng. Không tạo tọa độ mới. Mỗi mốc hiện có tối đa một điểm con, vì vậy quy tắc cách nhau 20 m chưa phát sinh. Chúng hiện từ zoom 12; các layer 13–16 đã sẵn sàng nhưng chưa có điểm được xác thực để điền. Các mốc 2/4/6/7 để subLandmarks rỗng.

Cần bổ sung:

1. Toàn văn/đoạn trích có các địa điểm con và tọa độ hoặc hướng/khoảng cách có căn cứ để đáp ứng 3–8 điểm mỗi mốc, rải mức 12–16.
2. Bốn góc tọa độ TL/TR/BR/BL thật cho coastal-map-ai-hd.jpg. Hiện ảnh tắt và không dùng tọa độ ước lượng.
3. Duyệt trực quan phạm vi vòng tròn và phân loại địa hình.

## Kiểm chứng

- pnpm make-mask: thành công, không mất polygon nguồn.
- pnpm lint: chạy sau A, B, C, D thành công sau sửa lỗi kiểu.
- pnpm lint và pnpm build cuối: thành công sau toàn bộ sửa đổi. git diff --check sạch.
- Trình duyệt: mask che nền ngoài Việt Nam, đủ nhãn biển/đảo, nền đường/sông khi zoom sâu; click cụm 7 tách thành cụm 6 và pin 5; click pin 5 đổi URL và highlight legend; click legend mốc 2 và mở trực tiếp query mo đều chọn đúng mốc, thẻ nội dung và liên kết cũ. Console sau sửa font không có warning/error; không thấy badge Issue trong lượt kiểm tra.
