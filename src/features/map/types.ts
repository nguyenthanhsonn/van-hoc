import type { Map as MapLibreMap, LngLatBoundsLike, LngLatLike } from "maplibre-gl";
import type { RefObject } from "react";

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

/**
 * Definition for custom landmarks / literary milestones
 */
export interface Landmark {
  readonly id: string;
  readonly order: number;
  readonly name: string;
  readonly workName?: string;
  readonly subtitle?: string;
  readonly category: string;
  readonly locationName: string;
  readonly province: string;
  readonly coordinates: readonly [number, number]; // [longitude, latitude]
  readonly story: string;
  readonly shortDescription: string;
  readonly imageUrl: string;
  readonly iconType: "temple" | "mountain" | "field" | "harbor";
  readonly color: string;
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

/**
 * Return interface for useVietnamMap custom hook
 */
export interface UseVietnamMapReturn {
  mapContainerRef: RefObject<HTMLDivElement | null>;
  mapInstance: MapLibreMap | null;
  isLoading: boolean;
  errorMessage: string | null;
  hoveredProvince: ProvinceProperties | null;
  selectedProvince: ProvinceProperties | null;
  landmarks: readonly Landmark[];
  selectedLandmark: Landmark | null;
  zoomIn: () => void;
  zoomOut: () => void;
  resetToVietnamView: () => void;
  flyToLandmark: (landmark: Landmark) => void;
  clearSelectedProvince: () => void;
  clearSelectedLandmark: () => void;
}

