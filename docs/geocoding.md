# Tra và duyệt tọa độ địa danh

## Cách dùng

- `pnpm geocode`: chạy thủ công; chỉ gọi các truy vấn chưa có cache. Kết quả nằm ở `scripts/output/geocode-candidates.json`, gồm truy vấn, URL nguồn, thời điểm, tên/loại/display_name, lat/lng, boundingbox theo thứ tự south/north/west/east, OSM id/type và attribution. Chưa duyệt: approvedCoordinates null. Script không đọc/ghi dữ liệu mốc của ứng dụng.
- Cache lưu cả kết quả rỗng và lỗi; không tự retry. Nếu sửa xong kết nối, chạy **thủ công một lượt** `pnpm geocode --retry-errors` để thử lại riêng các truy vấn lỗi. Không bật lịch chạy. Không sửa User-Agent thành giá trị mặc định của thư viện. Có khóa file ngăn chạy song song; chỉ xóa geocode.lock nếu chắc chắn không còn tiến trình chạy.
- Tuân thủ [Nominatim policy](https://operations.osmfoundation.org/policies/nominatim/): một luồng/một máy, User-Agent `van-hoc-map/1.0 (manual landmark coordinate review)`, nghỉ ít nhất 1,1 giây sau mỗi response/lỗi, lưu cache; dừng khi HTTP 403/429. Không gọi dịch vụ từ trình duyệt người dùng. Có thể thay endpoint tìm kiếm qua biến NOMINATIM_SEARCH_URL nếu đổi nhà cung cấp tương thích; không dùng để né giới hạn dịch vụ.
- Dev: mở `/?pick=1`, phóng đến vùng cần chọn, click bản đồ. Console/toast ghi `lng, lat` với 6 chữ số thập phân; clipboard nhận cùng chuỗi. Nếu browser từ chối clipboard hoặc không có secure context, toast báo rõ không copy được. Không có pick handler ở production hoặc khi URL không có pick=1. Chế độ này vẫn giữ tương tác pin/cụm thông thường.
- Gửi lại `slug: lng, lat` đã duyệt. Sau đó mới cập nhật vị trí chính và detailView zoom 14–15. Hiện giữ nguyên toàn bộ lngLat/detailView cũ. Các subLandmarks hiện rỗng vì chưa có điểm con geocoded hoặc đặt tay được duyệt; số điểm con không có tối thiểu.

## Kết quả lượt chạy hiện tại

Đã chạy một lượt ba truy vấn duy nhất. Cả ba fetch đều lỗi kết nối; DNS trong môi trường chạy trả 127.0.0.1 cho nominatim.openstreetmap.org, HTTPS tới host bị connection refused. Không thay đổi DNS hay cấu hình mạng. JSON ghi status error, candidates rỗng. **Đây không phải kết quả “Nominatim không tìm thấy”.** Không có display_name hoặc tọa độ để báo lại hay để duyệt.

| Mốc | Truy vấn / cách chọn | Ứng viên / display_name |
| --- | --- | --- |
| 1. Tháp Bà Po Nagar | Tháp Bà Ponagar, Nha Trang, Khánh Hòa | Chưa lấy được do lỗi kết nối |
| 2. Đường lên núi Đá Trắng | Đặt tay trên đường, tham khảo kết quả núi của mốc 3 | Không tự dùng tâm núi làm điểm đường |
| 3. Cek Yang Patao - núi Đá Trắng | Núi Đá Trắng, Việt Nam | Chưa lấy được do lỗi kết nối |
| 4. Nhà sinh hoạt cộng đồng Chăm | Đặt tay, cần tên làng | Chưa có |
| 5. Cửa biển Phan Rí | Cửa Phan Rí, Tuy Phong | Chưa lấy được do lỗi kết nối |
| 6. Nương rẫy của người Chăm | Đặt tay | Chưa có |
| 7. Nương ngô | Đặt tay | Chưa có |

Các mốc 2/4/6/7 cần đặt tay theo yêu cầu; các mốc 1/3/5 cần tra lại sau khi kết nối hoạt động hoặc chọn tay nếu muốn. Không có điểm nào được coi là duyệt. Phần Overpass tùy chọn chưa triển khai/chưa chạy vì chưa có tọa độ đã duyệt.

## File thay đổi của đợt này

- `scripts/geocode-landmarks.ts`: batch Node fetch, kiểm tra schema phản hồi, throttle, cache, khóa chạy song song, bảng console; không ghi mốc.
- `scripts/output/geocode-candidates.json`: kết quả và lỗi đã lưu; không commit.
- `package.json`: script geocode; không thêm thư viện.
- `.gitignore`: scripts/output/.
- `src/features/map/hooks/useVietnamMap.ts`: picker dev, log/copy/toast, cleanup timer/listener, gỡ source/layer ảnh.
- `src/features/map/types.ts`: field coordinateToast cho hook.
- `src/features/map/components/VietnamMap.tsx`, `VietnamMap.module.css`: toast nhỏ, aria-live, không chặn click bản đồ.
- `src/features/map/config/mapConfig.ts`: gỡ cấu hình ảnh và các ngưỡng zoom ảnh không còn dùng.
- `src/features/map/data/landmarksData.ts`: bỏ ba điểm con chỉ sao chép tọa độ mốc; giữ nguyên các tọa độ chính, detailView và bán kính 250/1000/1500/250/500/1000/1000 m (theo thứ tự 1–7).
- `README.md`, `docs/map-implementation.md`, `docs/geocoding.md`: cập nhật luồng duyệt tọa độ, thay yêu cầu cũ chờ văn bản/ảnh.

## Kiểm tra

- pnpm geocode tạo JSON; exit code 1 vì lỗi kết nối dịch vụ (đã lưu từng lỗi, không giả kết quả thành công).
- Dev picker: đã click bản đồ, toast “Đã copy”, console đủ 6 chữ số; đọc lại clipboard khớp chuỗi vừa chọn. Các tọa độ click thử này không được ghi vào landmarksData.ts và không phải tọa độ duyệt.
- pnpm lint và pnpm build cuối thành công sau toàn bộ sửa đổi; git diff --check sạch. Lần kiểm tra đọc cache không gửi thêm request (không có dòng Searching).
- Không còn tham chiếu cấu hình/source/layer ảnh trong src hay scripts; file ảnh được giữ. Chế độ thường đã kiểm tra không xuất hiện toast khi click; console không có error/warn trong lượt kiểm tra.
