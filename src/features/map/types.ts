import type { BasemapMode } from './config/mapConfig';
import type { Map as MapLibreMap, LngLatBoundsLike, LngLatLike } from "maplibre-gl";
import type { RefObject } from "react";

export interface GeoJSONPoint {
  type: "Point";
  coordinates: [number, number];
}

export interface GeoJSONFeature<G = GeoJSONPoint, P = Record<string, unknown>> {
  type: "Feature";
  geometry: G;
  properties: P;
}

export interface GeoJSONFeatureCollection<G = GeoJSONPoint, P = Record<string, unknown>> {
  type: "FeatureCollection";
  features: GeoJSONFeature<G, P>[];
}

/**
 * Properties for each administrative unit (province/city) in GeoJSON
 */
export interface ProvinceProperties {
  code: string;
  name: string;
  merged?: string;
  type?: string;
  areaKm2?: number;
  population?: number;
  isIsland?: boolean;
  parent?: string;
}

export interface LandmarkStorySection {
  readonly title: string;
  readonly content: string;
}

export interface LandmarkSubWork {
  readonly id: string;
  readonly code: string; // e.g. "4.1", "4.2", "4.3"
  readonly title: string;
  readonly shortDescription: string;
  readonly story?: string;
  readonly quote?: string;
}

export type Terrain = "mountain" | "plain" | "sea";

export interface DetailView {
  center: [number, number];
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export interface SubLandmark {
  id: string;
  name: string;
  type: "gate" | "building" | "monument" | "viewpoint" | "pier" | "road" | "other";
  coordinates: [number, number]; /* [lng, lat] */
  minZoom: 12 | 13 | 14 | 15 | 16;
  description: string;
  relativePosition?: string;
  confidence: "high" | "medium" | "low";
}

export type PositionType = "verified" | "approx" | "illustrative" | "area";

export interface LandmarkTheme {
  color: string;
  textOn: string;
}

/**
 * Definition for custom landmarks / literary milestones
 */
export interface Landmark {
  readonly id: string;
  readonly order: number;
  readonly terrain: Terrain;
  readonly title: string;
  readonly positionType: PositionType;
  readonly theme: LandmarkTheme;
  readonly needsReview?: boolean;
  readonly positionSource?: string;
  readonly hidden?: boolean;
  readonly name?: string;
  readonly province: string;
  readonly lngLat: readonly [number, number];
  readonly coordinates?: readonly [number, number]; // [longitude, latitude]
  readonly summary: string;
  readonly image: string;
  readonly zoom?: number;
  readonly area?: { polygon?: [number, number][]; radiusMeters?: number };
  readonly detailView?: DetailView;
  readonly subLandmarks?: SubLandmark[];
  readonly workName?: string;
  readonly subtitle?: string;
  readonly category?: string;
  readonly locationName?: string;
  readonly story?: string;
  readonly shortDescription?: string;
  readonly imageUrl?: string;
  readonly iconType?: "temple" | "mountain" | "field" | "harbor" | "house" | "sea";
  readonly color?: string;
  readonly stories?: readonly string[] | readonly { id: string; title: string; intro?: string }[];
  readonly subWorks?: readonly LandmarkSubWork[];
  readonly sections?: readonly LandmarkStorySection[];
  readonly quote?: string;
}

/**
 * Bounds padding configuration
 */
export interface MapBoundsPadding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Map configuration schema - No magic numbers in code
 */
export interface MapConfig {
  readonly geojsonUrl: string;
  readonly sourceId: string;
  readonly fillLayerId: string;
  readonly lineLayerId: string;
  readonly symbolLayerId: string;
  readonly bounds: LngLatBoundsLike;
  readonly maxBounds: LngLatBoundsLike;
  readonly defaultCenter: LngLatLike;
  readonly defaultZoom: number;
  readonly minZoom: number;
  readonly maxZoom: number;
  readonly landmarkZoom: number;
  readonly fitBoundsPadding: MapBoundsPadding;
  readonly animationDurationMs: number;
  readonly colors: {
    readonly seaBackground: string;
    readonly provinceFill: string;
    readonly provinceFillHover: string;
    readonly provinceStroke: string;
    readonly provinceStrokeHover: string;
    readonly labelText: string;
    readonly labelHalo: string;
  };
  readonly strokes: {
    readonly lineWidth: number;
    readonly lineWidthHover: number;
    readonly lineOpacity: number;
  };
  readonly label: {
    readonly minZoom: number;
    readonly fontSize: number;
    readonly haloWidth: number;
  };
}

export interface EditState {
  activeSlug: string;
  lngLat: [number, number];
  distanceToCoastMeters: number;
  provinceName: string;
  allCoordinates: Record<string, [number, number]>;
}

/**
 * Return interface for useVietnamMap custom hook
 */
export interface UseVietnamMapReturn {
  mapContainerRef: RefObject<HTMLDivElement | null>;
  mapInstance: MapLibreMap | null;
  basemapMode: BasemapMode;
  setBasemapMode: (mode: BasemapMode) => void;
  coordinateToast: string | null;
  isLoading: boolean;
  errorMessage: string | null;
  hoveredProvince: ProvinceProperties | null;
  selectedProvince: ProvinceProperties | null;
  landmarks: readonly Landmark[];
  selectedLandmark: Landmark | null;
  selectedId: string | null;
  isFlying: boolean;
  editState?: EditState | null;
  copyActiveCoordinate?: () => void;
  copyAllCoordinates?: () => void;
  focusLandmark: (id: string | null) => void;
  hoveredLandmarkId: string | null;
  scheduleHover: (id: string) => void;
  scheduleClose: () => void;
  cancelClose: () => void;
  clusterTooltip: { x: number; y: number; landmarkOrders: number[] } | null;
  resetView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetToVietnamView: () => void;
  flyToLandmark: (landmark: Landmark) => void;
  clearSelectedProvince: () => void;
  clearSelectedLandmark: () => void;
}
