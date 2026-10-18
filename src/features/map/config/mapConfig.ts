import type { MapConfig } from "../types";

/**
 * Production map configuration for Vietnam 2D Map.
 * All constants, coordinates, bounds, colors, and styles are centralized here.
 * Absolutely NO magic numbers elsewhere in the codebase.
 */
export const MAP_CONFIG: MapConfig = {
  // GeoJSON file path located in public/data/
  geojsonUrl: "/data/vietnam-provinces.geojson",

  // Unique Layer & Source IDs
  sourceId: "vietnam-provinces-source",
  fillLayerId: "vietnam-provinces-fill",
  lineLayerId: "vietnam-provinces-line",
  symbolLayerId: "vietnam-provinces-symbol",

  // Bounding box strictly encompassing Vietnam territory (including Hoàng Sa & Trường Sa)
  // Southwest: [lng 101.5, lat 6.5], Northeast: [lng 117.8, lat 23.8]
  bounds: [
    [101.5, 6.5],
    [117.8, 23.8],
  ],

  // Hard pan boundaries to prevent dragging map into unrelated world areas
  maxBounds: [
    [98.0, 5.0],
    [122.0, 26.0],
  ],

  // Initial camera settings
  defaultCenter: [108.2, 15.6],
  defaultZoom: 5.2,
  minZoom: 4.5,
  maxZoom: 12.0,
  landmarkZoom: 10.5,

  // Camera animation and padding
  fitBoundsPadding: {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  },
  animationDurationMs: 1200,

  // Color palette (Light fresh sea, soft pastel province fills, white borders)
  colors: {
    seaBackground: "#e8f4f8",       // Nền biển màu xanh dương rất nhạt
    provinceFill: "#dcfce7",        // Nền tỉnh xanh ngọc/bạc hà tươi sáng
    provinceFillHover: "#86efac",   // Highlight khi hover chuột
    provinceStroke: "#ffffff",      // Viền mảnh màu trắng/xám nhạt
    provinceStrokeHover: "#059669", // Viền khi hover
    labelText: "#064e3b",           // Chữ đậm nét dễ đọc
    labelHalo: "#ffffff",           // Viền chữ trắng chống chìm màu
  },

  // Line layer properties
  strokes: {
    lineWidth: 1.0,
    lineWidthHover: 2.0,
    lineOpacity: 0.95,
  },

  // Symbol layer properties for province name labels
  label: {
    minZoom: 5.2, // Ẩn bớt nhãn khi zoom thấp để tránh chồng chéo
    fontSize: 11.5,
    haloWidth: 2.0,
  },
} as const;
