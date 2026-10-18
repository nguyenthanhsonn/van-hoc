import { useEffect, useRef, useState, useCallback } from "react";
import * as maplibregl from "maplibre-gl";
import type {
  Map as MapLibreMap,
  MapMouseEvent,
  MapGeoJSONFeature,
  StyleSpecification,
} from "maplibre-gl";
import { MAP_CONFIG } from "../config/mapConfig";
import { VIETNAM_LANDMARKS } from "../data/landmarksData";
import type { ProvinceProperties, Landmark, UseVietnamMapReturn } from "../types";

// Configure MapLibre worker URL served from Next.js public directory
if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
}


/**
 * Custom hook to initialize and manage MapLibre GL map instance for Vietnam 2D map.
 * Strictly 2D, zero online basemap/tiles, renders offline GeoJSON with fill, line, and symbol layers.
 */
export function useVietnamMap(): UseVietnamMapReturn {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapInstance, setMapInstance] = useState<MapLibreMap | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceProperties | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceProperties | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);

  // Track currently hovered feature ID for feature-state
  const hoveredFeatureIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (mapRef.current || !mapContainerRef.current) return;

    // Offline style specification: pure solid sea background, no online basemap tiles
    const offlineMapStyle: StyleSpecification = {
      version: 8,
      name: "Vietnam-2D-Offline",
      // Official public open-source font glyphs for MapLibre symbol layers
      glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
      sources: {},
      layers: [
        {
          id: "sea-background",
          type: "background",
          paint: {
            "background-color": MAP_CONFIG.colors.seaBackground,
          },
        },
      ],
    };

    let map: MapLibreMap;

    try {
      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: offlineMapStyle,
        center: MAP_CONFIG.defaultCenter,
        zoom: MAP_CONFIG.defaultZoom,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        maxBounds: MAP_CONFIG.maxBounds,
        // Enforce pure 2D: disable all pitch and rotation
        dragRotate: false,
        touchPitch: false,
        pitchWithRotate: false,
        maxPitch: 0,
        minPitch: 0,
        bearing: 0,
        attributionControl: false,
      });

      mapRef.current = map;
      setMapInstance(map);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Không thể khởi tạo MapLibre GL";
      setErrorMessage(msg);
      setIsLoading(false);
      return;
    }

    // Fit to entire Vietnam bounds on startup
    map.fitBounds(MAP_CONFIG.bounds, {
      padding: MAP_CONFIG.fitBoundsPadding,
      duration: 0,
    });

    map.on("load", () => {
      // 1. Add GeoJSON source containing post-merger Vietnam provinces + archipelagos
      map.addSource(MAP_CONFIG.sourceId, {
        type: "geojson",
        data: MAP_CONFIG.geojsonUrl,
        generateId: true,
      });

      // 2. Add Fill Layer (render provinces polygons)
      map.addLayer({
        id: MAP_CONFIG.fillLayerId,
        type: "fill",
        source: MAP_CONFIG.sourceId,
        filter: ["==", "$type", "Polygon"],
        paint: {
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            MAP_CONFIG.colors.provinceFillHover,
            MAP_CONFIG.colors.provinceFill,
          ],
          "fill-opacity": 0.95,
        },
      });

      // 3. Add Line Layer (thin white/light-gray borders)
      map.addLayer({
        id: MAP_CONFIG.lineLayerId,
        type: "line",
        source: MAP_CONFIG.sourceId,
        filter: ["==", "$type", "Polygon"],
        paint: {
          "line-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            MAP_CONFIG.colors.provinceStrokeHover,
            MAP_CONFIG.colors.provinceStroke,
          ],
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            MAP_CONFIG.strokes.lineWidthHover,
            MAP_CONFIG.strokes.lineWidth,
          ],
          "line-opacity": MAP_CONFIG.strokes.lineOpacity,
        },
      });

      // 4. Add Symbol Layer (province name labels, hidden at low zoom to avoid clutter)
      map.addLayer({
        id: MAP_CONFIG.symbolLayerId,
        type: "symbol",
        source: MAP_CONFIG.sourceId,
        filter: ["==", "$type", "Point"],
        minzoom: MAP_CONFIG.label.minZoom,
        layout: {
          "text-field": ["get", "name"],
          "text-size": MAP_CONFIG.label.fontSize,
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-anchor": "center",
          "text-justify": "center",
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "text-max-width": 8,
        },
        paint: {
          "text-color": MAP_CONFIG.colors.labelText,
          "text-halo-color": MAP_CONFIG.colors.labelHalo,
          "text-halo-width": MAP_CONFIG.label.haloWidth,
        },
      });

      // 5. Add Custom Landmark Markers (Mốc 1, 3, 5, 6)
      VIETNAM_LANDMARKS.forEach((landmark) => {
        const el = document.createElement("div");
        el.className = "landmark-map-pin";
        el.setAttribute("data-landmark-id", landmark.id);
        el.setAttribute("title", `${landmark.name} (${landmark.province})`);
        el.innerHTML = `
          <div class="landmark-pin-inner" style="background-color: ${landmark.color};">
            <span class="landmark-pin-order">${landmark.order}</span>
          </div>
          <div class="landmark-pin-badge">Mốc ${landmark.order}: ${landmark.name}</div>
          <div class="landmark-pin-pulse" style="color: ${landmark.color};"></div>
        `;

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          setSelectedProvince(null);
          setSelectedLandmark(landmark);
          map.flyTo({
            center: [landmark.coordinates[0], landmark.coordinates[1]],
            zoom: MAP_CONFIG.landmarkZoom,
            duration: MAP_CONFIG.animationDurationMs,
          });
        });

        const marker = new maplibregl.Marker({
          element: el,
          anchor: "bottom",
        })
          .setLngLat([landmark.coordinates[0], landmark.coordinates[1]])
          .addTo(map);

        markersRef.current.push(marker);
      });

      setIsLoading(false);
    });

    // Handle hover states on provinces fill layer
    const onMouseMove = (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
      if (!e.features || e.features.length === 0) return;

      map.getCanvas().style.cursor = "pointer";
      const feature = e.features[0];
      const props = feature.properties as unknown as ProvinceProperties;

      setHoveredProvince(props);

      if (feature.id !== undefined) {
        // Reset previously hovered feature
        if (hoveredFeatureIdRef.current !== null && hoveredFeatureIdRef.current !== feature.id) {
          map.setFeatureState(
            { source: MAP_CONFIG.sourceId, id: hoveredFeatureIdRef.current },
            { hover: false }
          );
        }

        // Highlight newly hovered feature
        hoveredFeatureIdRef.current = feature.id;
        map.setFeatureState(
          { source: MAP_CONFIG.sourceId, id: feature.id },
          { hover: true }
        );
      }
    };

    const onMouseLeave = () => {
      map.getCanvas().style.cursor = "";
      setHoveredProvince(null);

      if (hoveredFeatureIdRef.current !== null) {
        map.setFeatureState(
          { source: MAP_CONFIG.sourceId, id: hoveredFeatureIdRef.current },
          { hover: false }
        );
        hoveredFeatureIdRef.current = null;
      }
    };

    // Handle click to inspect province
    const onClick = (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
      if (!e.features || e.features.length === 0) return;
      const feature = e.features[0];
      const props = feature.properties as unknown as ProvinceProperties;
      setSelectedLandmark(null);
      setSelectedProvince(props);
    };

    map.on("mousemove", MAP_CONFIG.fillLayerId, onMouseMove);
    map.on("mouseleave", MAP_CONFIG.fillLayerId, onMouseLeave);
    map.on("click", MAP_CONFIG.fillLayerId, onClick);

    // Map error listener
    map.on("error", (e) => {
      // Ignore abort errors from map removal
      if (e.error?.message?.includes("abort")) return;
      console.warn("MapLibre GL Event:", e);
    });

    // Cleanup on unmount to avoid memory leaks
    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.off("mousemove", MAP_CONFIG.fillLayerId, onMouseMove);
      map.off("mouseleave", MAP_CONFIG.fillLayerId, onMouseLeave);
      map.off("click", MAP_CONFIG.fillLayerId, onClick);
      map.remove();
      mapRef.current = null;
      setMapInstance(null);
    };
  }, []);

  // Controls API
  const zoomIn = useCallback(() => {
    mapRef.current?.zoomIn();
  }, []);

  const zoomOut = useCallback(() => {
    mapRef.current?.zoomOut();
  }, []);

  const resetToVietnamView = useCallback(() => {
    setSelectedLandmark(null);
    mapRef.current?.fitBounds(MAP_CONFIG.bounds, {
      padding: MAP_CONFIG.fitBoundsPadding,
      duration: MAP_CONFIG.animationDurationMs,
    });
  }, []);

  const flyToLandmark = useCallback((landmark: Landmark) => {
    setSelectedProvince(null);
    setSelectedLandmark(landmark);
    mapRef.current?.flyTo({
      center: [landmark.coordinates[0], landmark.coordinates[1]],
      zoom: MAP_CONFIG.landmarkZoom,
      duration: MAP_CONFIG.animationDurationMs,
    });
  }, []);

  const clearSelectedProvince = useCallback(() => {
    setSelectedProvince(null);
  }, []);

  const clearSelectedLandmark = useCallback(() => {
    setSelectedLandmark(null);
  }, []);

  return {
    mapContainerRef,
    mapInstance,
    isLoading,
    errorMessage,
    hoveredProvince,
    selectedProvince,
    landmarks: VIETNAM_LANDMARKS,
    selectedLandmark,
    zoomIn,
    zoomOut,
    resetToVietnamView,
    flyToLandmark,
    clearSelectedProvince,
    clearSelectedLandmark,
  };
}

