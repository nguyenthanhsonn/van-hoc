# Nền vệ tinh và địa hình

## File thay đổi

- `src/features/map/config/mapConfig.ts`: BasemapMode, source Esri World Imagery (256 px, maxzoom 18), Terrarium Mapzen/AWS (256 px, maxzoom 15), opacity tỉnh 0.9 ở z6 → 0.3 ở z10 → 0 ở z12.
- `src/features/map/hooks/useVietnamMap.ts`: thêm sources/layers satellite và hillshade; chuyển mode bằng visibility/paint, không setStyle lại; khôi phục màu/opacity gốc Positron từ z9, mask tan hết ở z10; viền tỉnh mảnh/mờ; halo nhãn 2 px; vùng mốc viền trắng, fill nhẹ khi vệ tinh hiện lên. Giữ pin/cụm/số/legend/URL/popup/picker.
- `src/features/map/types.ts`: hook trả basemapMode và setBasemapMode.
- `src/features/map/components/VietnamMap.tsx`: nhóm nút Bản đồ / Vệ tinh / Địa hình, aria-pressed và thao tác bàn phím bằng button native.
- `src/features/map/components/VietnamMap.module.css`: bố trí nút cạnh zoom, trên màn hình hẹp đặt thành hàng phía trên; dành chỗ cho attribution, dời attribution lên trên popup khi mở chi tiết.
- `docs/satellite-basemaps.md`: báo cáo này.

Không thêm thư viện; không thay tọa độ hoặc nội dung các mốc.

## Cách chọn và các giả định giao diện

- Khi chưa chọn thủ công, satellite blend 0 tại z8 → 1 tại z11. UI chỉ hiển thị chế độ hiệu lực: Bản đồ khi z<11, Vệ tinh khi z≥11. Zoom không ghi vào lựa chọn thủ công.
- Chọn Bản đồ hoặc Địa hình: satellite ẩn. Chọn Vệ tinh: blend từ z6 đến z11. Lựa chọn thủ công giữ nguyên khi zoom/bay/reset toàn cảnh; tải lại trang trở về mặc định blend.
- Giữ Positron, không thử đổi Liberty để tránh thay toàn bộ phong cách/nguồn nhãn. Theme màu xanh chỉ ở z<9; từ z9 khôi phục đúng paint gốc, kể cả expression gốc của style. Nhãn hành chính được ẩn và font Latin/Noto nội bộ giữ như trước.
- Hillshade bắt đầu z7 để toàn cảnh z4–6 giữ giao diện cũ. Exaggeration 0.5, alpha màu bóng/sáng 0.35 cho map/satellite, 0.6 cho terrain. Đây là các lựa chọn thẩm mỹ cần duyệt bằng mắt. Hillshade không có paint hillshade-opacity: dùng alpha trong shadow/highlight/accent theo [MapLibre style spec](https://maplibre.org/maplibre-style-spec/layers/#hillshade).
- Vùng mốc trên vệ tinh: viền trắng đứt, fill 0.1; mốc chọn fill 0.18, line 3 px. Trên map/terrain: màu terrain cũ, fill 0.15/0.28. Màu viền và fill chuyển dần cùng zoom để không nhảy đột ngột.
- Nhãn mốc/tỉnh/chi tiết/đảo dùng chữ tối với halo trắng 2 px. Phạm vi mặt nạ chỉ có ý nghĩa ở toàn cảnh: z8 opacity 1 → z10 opacity 0; ở zoom sâu có thể thấy cả khu vực lân cận ngoài Việt Nam nếu pan tới đó.
- Chỉnh bố trí footer/legend ở mobile để attribution mở rộng không bị che bởi popup hoặc nút điều khiển; legend vẫn cuộn được.

## Layer/source IDs

Thêm nguồn `satellite`, `terrain-dem`; layer `satellite`, `hillshade`.

Sửa paint: `province-fill`, `province-line`, `province-selected`, `vn-mask`, `landmark-area-fill`, `landmark-area-line`, `province-labels`, `archipelago-labels`, `sub-label-12` đến `sub-label-16`. `landmark-names` đã có halo trắng 2 px, giữ nguyên.

Thứ tự: nền OpenFreeMap → satellite → hillshade → tô/viền tỉnh → mask → vùng mốc → chi tiết con → cụm/pin/số/nhãn → chấm đảo, nhãn tỉnh/đảo/biển. Attribution do MapLibre quản lý, hiển thị các nguồn đang dùng; không tắt control.

Những ID nền đổi theme ở toàn cảnh và khôi phục paint gốc ở zoom sâu: `background`, `park`, `water`, `landcover_ice_shelf`, `landcover_glacier`, `landuse_residential`, `landcover_wood`, `waterway`, `road_pier`, `highway_path`, `highway_minor`, `highway_major_casing`, `highway_major_inner`, `highway_major_subtle`, `highway_motorway_casing`, `highway_motorway_inner`, `highway_motorway_subtle`, `highway_motorway_bridge_casing`, `highway_motorway_bridge_inner`, `boundary_3`, `boundary_2`, `boundary_disputed`.

## Kiểm chứng và Issues

- pnpm lint, pnpm build cuối và git diff --check: thành công.
- Mở trực tiếp mo=cua-bien-phan-ri: mặc định vệ tinh ở zoom chi tiết; thấy ảnh đất thật, pin/legend/popup và viền vùng trắng. Chuyển map/terrain/satellite giữ mốc và query.
- Bay sang Tháp Bà trong lúc chọn terrain: mode giữ nguyên. Chuyển vệ tinh thấy sông, ven biển/ngoài khơi không còn phủ mask màu biển; halo giữ nhãn đọc được.
- Kiểm tra trên màn hình hẹp: attribution Esri, OpenFreeMap/OpenMapTiles/OSM, Mapzen/AWS đọc được phía trên popup.
- Console IAB trong lượt kiểm tra không có error/warn bản đồ, không thấy badge Issue. Dev log tồn tại lỗi TypeError “Cannot read properties of undefined (reading 'M_ID')”, stack nằm tại chrome-extension://eppiocemhmnlbhjplcgkofciiegomcon/executors/200.js (hàm Y và E), không trỏ src/features/map. Không thay đổi cấu hình extension hoặc ẩn lỗi. Chưa xác nhận số badge 2 Issues có đúng cùng lỗi này trên trình duyệt người dùng hay không.

- Một tab IAB đã báo “page crashed” sau lượt đổi chế độ/reset khi nhiều tab kiểm tra bản đồ đang mở. Đã đóng các tab kiểm tra cũ và mở lại để kiểm tra toàn cảnh → vệ tinh → reset. Lượt toàn cảnh → vệ tinh → reset trong tab mới hoàn tất bình thường, không tái hiện crash và console không có error/warn. Chưa xác định nguyên nhân của lần crash; không có lỗi JavaScript bản đồ được ghi trước đó.
