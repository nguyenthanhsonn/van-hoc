export interface MapCircle {
  cx: number;
  cy: number;
  r?: number;
  rx?: number;
  ry?: number;
}

export interface MapPoint {
  x: number;
  y: number;
}

export type MapDestination = {
  id: string;
  order: number;
  name: string;
  subtitle?: string;
  location: string;
  story: string;
  color: string;
  circle: MapCircle;
  anchor: MapPoint;
  /** 1 = thẻ mở sang phải, -1 = sang trái */
  side?: 1 | -1;
  /** Chuỗi polygon SVG points cho debug */
  polygon?: string;
};
