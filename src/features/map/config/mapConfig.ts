import type { LngLatBoundsLike } from 'maplibre-gl';
import type { Terrain, MapConfig } from '../types';

export type TerrainType = Terrain;

export const TERRAIN_COLORS = {
  mountain: '#2E7D4F',
  plain: '#E0A82E',
  sea: '#3B8FCB',
} as const;

export const LANDMARK_COLORS: Record<number, string> = {
  1: '#E26343', // Mốc 1: Tháp Bà Po Nagar (Cam gạch)
  2: '#8B5CF6', // Mốc 2: Đường lên núi Đá Trắng (Tím)
  3: '#0D9488', // Mốc 3: Cek Yang Patao - núi Đá Trắng (Xanh mòng két)
  4: '#E11D48', // Mốc 4: Nhà sinh hoạt cộng đồng Chăm (Đỏ hồng)
  5: '#0284C7', // Mốc 5: Cửa biển Phan Rí (Xanh dương biển)
  6: '#D97706', // Mốc 6: Nương rẫy của người Chăm (Vàng hổ phách)
  7: '#16A34A', // Mốc 7: Nương ngô (Xanh lá tươi)
};

export const ZOOM = {
  clusterMax: 9,
  showNames: 8,
  imageOverlayFrom: 11,
  imageOverlayFull: 13,
} as const;

export const SUB_ZOOM_LEVELS = [12, 13, 14, 15, 16] as const;

/**
 * TODO: chờ tọa độ 4 góc thật, đặt enabled = true khi đã căn đúng.
 * Tọa độ theo thứ tự: [trái-trên, phải-trên, phải-dưới, trái-dưới] (TL, TR, BR, BL)
 */
export const COASTAL_IMAGE = {
  url: '/images/coastal-map-ai-hd.jpg',
  coordinates: [
    [108.2, 12.6], // Trái - trên (TL)
    [109.6, 12.6], // Phải - trên (TR)
    [109.6, 11.0], // Phải - dưới (BR)
    [108.2, 11.0], // Trái - dưới (BL)
  ] as [[number, number], [number, number], [number, number], [number, number]],
  enabled: false,
};

export const GEOJSON_URL = '/data/vietnam-provinces.geojson';

// Bao gồm cả Hoàng Sa (~112°E) và Trường Sa (~115°E)
export const VIETNAM_BOUNDS: LngLatBoundsLike = [
  [102.0, 6.6],
  [118.2, 23.6],
];
export const MAX_BOUNDS: LngLatBoundsLike = [
  [92, -8],
  [130, 38],
];

export const MAP_COLORS = {
  sea: '#e3f1ec',
  provinceWithLandmark: '#2e7a4d', // xanh đậm: tỉnh có điểm mốc
  provinceWithoutLandmark: '#cfe8bd', // xanh nhạt: tỉnh không có điểm mốc
  provinceHover: '#a9d58f',
  border: '#ffffff',
  selectedOutline: '#12462a',
  island: '#2e7a4d',
};

// Màu nền cửa sổ thông tin theo địa hình (khớp yêu cầu đặc tả)
export const TERRAIN_STYLE: Record<
  Terrain,
  { label: string; background: string; border: string; badge: string }
> = {
  mountain: { label: 'Vùng núi', background: '#E6F2EA', border: TERRAIN_COLORS.mountain, badge: TERRAIN_COLORS.mountain },
  plain: { label: 'Đồng bằng', background: '#FBF3DC', border: TERRAIN_COLORS.plain, badge: TERRAIN_COLORS.plain },
  sea: { label: 'Biển, cửa biển', background: '#E3F0FA', border: TERRAIN_COLORS.sea, badge: TERRAIN_COLORS.sea },
};

/**
 * Hoàng Sa (thuộc TP. Đà Nẵng) và Trường Sa (thuộc tỉnh Khánh Hòa) sau sáp nhập.
 * Toạ độ gần đúng (WGS84). Hãy đối chiếu lại với nguồn chính thức của nhóm trước khi phát hành.
 */
export const ISLANDS: { name: string; group: 'hoang-sa' | 'truong-sa'; lngLat: [number, number] }[] = [
  // Hoàng Sa
  { name: 'Đảo Hoàng Sa', group: 'hoang-sa', lngLat: [111.6, 16.54] },
  { name: 'Đảo Phú Lâm', group: 'hoang-sa', lngLat: [112.33, 16.83] },
  { name: 'Đảo Linh Côn', group: 'hoang-sa', lngLat: [112.73, 16.67] },
  { name: 'Đảo Tri Tôn', group: 'hoang-sa', lngLat: [111.2, 15.78] },
  { name: 'Đá Bắc', group: 'hoang-sa', lngLat: [111.52, 17.08] },
  { name: 'Đảo Hữu Nhật', group: 'hoang-sa', lngLat: [111.7, 16.45] },
  // Trường Sa
  { name: 'Song Tử Tây', group: 'truong-sa', lngLat: [114.33, 11.43] },
  { name: 'Thị Tứ', group: 'truong-sa', lngLat: [114.28, 11.05] },
  { name: 'Sơn Ca', group: 'truong-sa', lngLat: [114.48, 10.38] },
  { name: 'Nam Yết', group: 'truong-sa', lngLat: [114.37, 10.18] },
  { name: 'Sinh Tồn', group: 'truong-sa', lngLat: [114.33, 9.88] },
  { name: 'Đá Tây', group: 'truong-sa', lngLat: [112.2, 8.86] },
  { name: 'Đảo Trường Sa', group: 'truong-sa', lngLat: [111.92, 8.65] },
  { name: 'An Bang', group: 'truong-sa', lngLat: [112.92, 7.88] },
  { name: 'Đá Lát', group: 'truong-sa', lngLat: [111.68, 8.68] },
  { name: 'Phan Vinh', group: 'truong-sa', lngLat: [113.88, 9.78] },
];

export const ISLAND_LABELS = [
  { text: 'Quần đảo Hoàng Sa', sub: '(TP. Đà Nẵng, Việt Nam)', lngLat: [112.2, 17.5] as [number, number], anchor: 'bottom' as const },
  { text: 'Quần đảo Trường Sa', sub: '(Khánh Hòa, Việt Nam)', lngLat: [115.1, 9.9] as [number, number], anchor: 'left' as const },
];

export const SEA_LABEL = { text: 'BIỂN ĐÔNG', lngLat: [112.8, 13.4] as [number, number] };

export const MAP_CONFIG: MapConfig = {
  geojsonUrl: GEOJSON_URL,
  sourceId: 'vietnam-provinces-source',
  fillLayerId: 'vietnam-provinces-fill',
  lineLayerId: 'vietnam-provinces-line',
  symbolLayerId: 'vietnam-provinces-symbol',
  bounds: VIETNAM_BOUNDS,
  maxBounds: MAX_BOUNDS,
  defaultCenter: [108.2, 15.6],
  defaultZoom: 5.2,
  minZoom: 4.5,
  maxZoom: 12.0,
  landmarkZoom: 10.5,
  fitBoundsPadding: {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  },
  animationDurationMs: 1800,
  colors: {
    seaBackground: MAP_COLORS.sea,
    provinceFill: MAP_COLORS.provinceWithoutLandmark,
    provinceFillHover: MAP_COLORS.provinceHover,
    provinceStroke: MAP_COLORS.border,
    provinceStrokeHover: MAP_COLORS.selectedOutline,
    labelText: '#064e3b',
    labelHalo: '#ffffff',
  },
  strokes: {
    lineWidth: 1.0,
    lineWidthHover: 2.0,
    lineOpacity: 0.9,
  },
  label: {
    minZoom: 6.0,
    fontSize: 10.5,
    haloWidth: 1.5,
  },
};