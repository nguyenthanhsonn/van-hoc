import { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import {
  circle,
  polygon,
  featureCollection,
  booleanPointInPolygon,
  polygonToLine,
  flatten,
  pointToLineDistance,
  point,
} from '@turf/turf';
import type {
  Map as MapLibreMap,
  MapLayerMouseEvent,
  StyleSpecification,
} from 'maplibre-gl';
import {
  MAP_CONFIG,
  BASEMAP_STYLE_URL,
  SATELLITE_TILES,
  TERRAIN_DEM,
  type BasemapMode,
  SEA_COLOR,
  PROVINCE_FILL_OPACITY,
  MAP_COLORS,
  TERRAIN_COLORS,
  ZOOM,
  SUB_ZOOM_LEVELS,
  VIETNAM_BOUNDS,
  MAX_BOUNDS,
  ISLANDS,
  ISLAND_LABELS,
  SEA_LABEL,
  GEOJSON_URL,
} from '../config/mapConfig';
import { landmarks } from '../data/landmarksData';

const activeLandmarks = landmarks.filter((l) => !l.hidden);
import type {
  ProvinceProperties,
  Landmark,
  UseVietnamMapReturn,
  EditState,
  GeoJSONPoint,
  GeoJSONFeature,
  GeoJSONFeatureCollection,
} from '../types';

function createDashedRingImage(): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = 34;
  canvas.height = 34;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new ImageData(34, 34);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.arc(17, 17, 14.5, 0, Math.PI * 2);
  ctx.stroke();
  return ctx.getImageData(0, 0, 34, 34);
}

// Configure MapLibre worker URL served from Next.js public directory
if (typeof window !== 'undefined') {
  try {
    maplibregl.setWorkerUrl('/maplibre-gl-worker.mjs');
  } catch {
    // fallback if worker URL method not supported
  }
}

const normalize = (s: string) =>
  s
    .replace(/[đĐ]/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/^(tinh|thanh pho|tp\.?)\s+/, '')
    .trim();

const guessName = (props: Record<string, unknown>, key?: string): string =>
  String(
    (key && props[key]) ??
      props.name ??
      props.Name ??
      props.NAME_1 ??
      props.ten_tinh ??
      props.Ten_Tinh ??
      props.ten ??
      props.ADM1_VI ??
      ''
  );

function prepareBasemapStyle(style: StyleSpecification): StyleSpecification {
  return {
    ...style,
    glyphs: `${window.location.origin}/data/fonts/{fontstack}/{range}.pbf`,
    layers: style.layers.map((layer) => {
      if (layer.type !== 'symbol') return layer;
      const usesName = JSON.stringify(layer.layout?.['text-field'] ?? '').includes('name');
      return { ...layer, layout: {
        ...layer.layout,
        'text-font': ['Noto Sans Regular'],
        ...(usesName ? { 'text-field': ['coalesce', ['get', 'name:latin'], ['get', 'name:en'], ''] as maplibregl.ExpressionSpecification } : {}),
        ...(/place|boundary|^label_(state|country)/i.test(layer.id) ? { visibility: 'none' as const } : {}),
      } };
    }),
  };
}

/** Keep the old overview palette, restoring exact original paint at zoom 9. */
export function applyBasemapTheme(map: MapLibreMap, originalLayers: StyleSpecification['layers'], overview: boolean) {
  for (const layer of originalLayers) {
    if (!map.getLayer(layer.id)) continue;
    if (layer.type === 'background') {
      map.setPaintProperty(layer.id, 'background-color', overview ? '#e0ecda' : layer.paint?.['background-color']);
    } else if (layer.type === 'fill' && /water/i.test(layer.id)) {
      map.setPaintProperty(layer.id, 'fill-color', overview ? SEA_COLOR : layer.paint?.['fill-color']);
    } else if (layer.type === 'fill' && /land|park/i.test(layer.id)) {
      map.setPaintProperty(layer.id, 'fill-color', overview ? '#dfebd6' : layer.paint?.['fill-color']);
    } else if (layer.type === 'line' && /road|highway|boundary/i.test(layer.id)) {
      map.setPaintProperty(layer.id, 'line-opacity', overview ? 0.45 : layer.paint?.['line-opacity']);
    } else if (layer.type === 'line' && /water/i.test(layer.id)) {
      map.setPaintProperty(layer.id, 'line-color', overview ? SEA_COLOR : layer.paint?.['line-color']);
    }
  }
}

function applyBasemapMode(map: MapLibreMap, mode: BasemapMode | null, selectedId: string | null) {
  const satellite = mode === null || mode === 'satellite';
  if (map.getLayer('satellite')) {
    map.setLayoutProperty('satellite', 'visibility', satellite ? 'visible' : 'none');
    map.setPaintProperty('satellite', 'raster-opacity', ['interpolate', ['linear'], ['zoom'], mode === 'satellite' ? 6 : 8, 0, 11, 1]);
  }
  if (map.getLayer('hillshade')) {
    // Hillshade has no hillshade-opacity property: alpha belongs in its colors.
    const alpha = mode === 'terrain' ? 0.6 : 0.35;
    map.setPaintProperty('hillshade', 'hillshade-exaggeration', 0.5);
    map.setPaintProperty('hillshade', 'hillshade-shadow-color', `rgba(0,0,0,${alpha})`);
    map.setPaintProperty('hillshade', 'hillshade-highlight-color', `rgba(255,255,255,${alpha})`);
    map.setPaintProperty('hillshade', 'hillshade-accent-color', `rgba(0,0,0,${alpha})`);
  }
  if (map.getLayer('landmark-area-fill')) {
    const selected: maplibregl.ExpressionSpecification = ['==', ['get', 'id'], selectedId ?? ''];
    map.setPaintProperty('landmark-area-fill', 'fill-opacity', satellite
      ? ['interpolate', ['linear'], ['zoom'], 8, ['case', selected, 0.28, 0.15], 11, ['case', selected, 0.18, 0.1]]
      : ['case', selected, 0.28, 0.15]);
    map.setPaintProperty('landmark-area-line', 'line-color', satellite
      ? ['interpolate', ['linear'], ['zoom'], 8, ['get', 'color'], 11, '#ffffff']
      : ['get', 'color']);
    map.setPaintProperty('landmark-area-line', 'line-width', ['case', selected, 3, 1.5]);
  }
}

/**
 * Custom hook to initialize and manage MapLibre GL map instance for Vietnam 2D map.
 * Supports clustering, sub-landmarks zoom reveal, 2-way legend interaction, and ?mo=<slug> sync.
 */
export function useVietnamMap(): UseVietnamMapReturn {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  // null means the untouched default: blend map -> satellite with zoom.
  const modeRef = useRef<BasemapMode | null>(null);
  const selectedIdRef = useRef<string | null>(null);
  const [chosenBasemapMode, setChosenBasemapMode] = useState<BasemapMode | null>(null);
  const [satelliteZoom, setSatelliteZoom] = useState(false);
  const basemapMode = chosenBasemapMode ?? (satelliteZoom ? 'satellite' : 'map');
  const setBasemapMode = useCallback((mode: BasemapMode) => {
    modeRef.current = mode;
    setChosenBasemapMode(mode);
    if (mapRef.current) applyBasemapMode(mapRef.current, mode, selectedIdRef.current);
  }, []);

  const [mapInstance, setMapInstance] = useState<MapLibreMap | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceProperties | null>(null);
  const [coordinateToast, setCoordinateToast] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedLandmark = activeLandmarks.find((l) => l.id === selectedId) ?? null;

  const [isFlying, setIsFlying] = useState<boolean>(false);
  const isFlyingRef = useRef<boolean>(false);
  const flightTargetIdRef = useRef<string | null>(null);
  const flightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hoveredLandmarkId, setHoveredLandmarkId] = useState<string | null>(null);
  const hoveredLandmarkIdRef = useRef<string | null>(null);
  hoveredLandmarkIdRef.current = hoveredLandmarkId;

  const [clusterTooltip, setClusterTooltip] = useState<{
    x: number;
    y: number;
    landmarkOrders: number[];
  } | null>(null);

  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleHover = useCallback((id: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    // Instant switch when moving between different landmarks, snappy 50ms on first hover
    const delay = hoveredLandmarkIdRef.current && hoveredLandmarkIdRef.current !== id ? 0 : 50;
    hoverTimerRef.current = setTimeout(() => {
      setHoveredLandmarkId(id);
    }, delay);
  }, []);

  const scheduleClose = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setHoveredLandmarkId(null);
    }, 200);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleHoverRef = useRef(scheduleHover);
  scheduleHoverRef.current = scheduleHover;
  const scheduleCloseRef = useRef(scheduleClose);
  scheduleCloseRef.current = scheduleClose;
  const setClusterTooltipRef = useRef(setClusterTooltip);
  setClusterTooltipRef.current = setClusterTooltip;

  // Control hover layers: outer halo ring and z-index elevation for hovered landmark
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const updateHoverState = () => {
      const activeId = hoveredLandmarkId;
      const filter = activeId
        ? ['all', ['!', ['has', 'point_count']], ['==', ['get', 'id'], activeId]]
        : ['==', ['get', 'id'], ''];

      if (map.getLayer('landmark-hover-halo')) {
        map.setFilter('landmark-hover-halo', filter as any);
      }
      if (map.getLayer('landmark-hover-point')) {
        map.setFilter('landmark-hover-point', filter as any);
      }
      if (map.getLayer('landmark-hover-order')) {
        map.setFilter('landmark-hover-order', filter as any);
      }
      if (map.getLayer('landmark-hover-names')) {
        map.setFilter('landmark-hover-names', filter as any);
      }
    };
    if (map.isStyleLoaded()) {
      updateHoverState();
    } else {
      map.once('load', updateHoverState);
    }
  }, [hoveredLandmarkId]);

  const [editState, setEditState] = useState<EditState | null>(null);
  const allCoordinatesRef = useRef<Record<string, [number, number]>>(
    Object.fromEntries(activeLandmarks.map((l) => [l.id, [l.lngLat[0], l.lngLat[1]]]))
  );

  const copyActiveCoordinate = useCallback(() => {
    if (!editState) return;
    const text = `${editState.activeSlug}: [${editState.lngLat[0]}, ${editState.lngLat[1]}]`;
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(text);
    }
    setCoordinateToast(`Đã copy: ${text}`);
  }, [editState]);

  const copyAllCoordinates = useCallback(() => {
    const json = JSON.stringify(allCoordinatesRef.current, null, 2);
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(json);
    }
    setCoordinateToast('Đã copy tất cả tọa độ');
  }, []);

  // Track currently hovered feature ID for feature-state
  const hoveredFeatureKeyRef = useRef<string | null>(null);

  /**
   * Focus a landmark by ID: updates layer filter, flies camera to detailView, updates state and URL query ?mo=<id>
   */
  const focusLandmark = useCallback((id: string | null) => {
    const map = mapRef.current;
    if (id && !activeLandmarks.some((lm) => lm.id === id)) return;
    if (flightTimeoutRef.current) {
      clearTimeout(flightTimeoutRef.current);
      flightTimeoutRef.current = null;
    }

    selectedIdRef.current = id;
    setSelectedId(id);

    if (!map) return;

    applyBasemapMode(map, modeRef.current, id);
    if (!id) {
      flightTargetIdRef.current = null;
      isFlyingRef.current = false;
      setIsFlying(false);

      if (map.getLayer('province-selected')) {
        map.setFilter('province-selected', ['==', ['get', '_key'], '']);
      }
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('mo');
        window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
      }
      return;
    }

    const lm = activeLandmarks.find((l) => l.id === id);
    if (!lm) return;

    // Highlight selected province
    if (map.getLayer('province-selected')) {
      map.setFilter('province-selected', [
        'any',
        ['==', ['get', '_key'], normalize(lm.province)],
        ['in', lm.province, ['coalesce', ['get', 'merged'], '']],
      ]);
    }

    // Fly camera to landmark detailView with responsive padding
    const center = lm.detailView?.center ?? [lm.lngLat[0], lm.lngLat[1]];
    const zoom = lm.detailView?.zoom ?? 16;
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const isMobilePhone = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;
    const containerHeight = map.getContainer().clientHeight;

    flightTargetIdRef.current = id;

    const curCenter = map.getCenter();
    const curZoom = map.getZoom();
    const isAlreadyThere =
      Math.abs(curCenter.lng - center[0]) < 0.0001 &&
      Math.abs(curCenter.lat - center[1]) < 0.0001 &&
      Math.abs(curZoom - zoom) < 0.1;

    if (isAlreadyThere) {
      isFlyingRef.current = false;
      setIsFlying(false);
    } else {
      isFlyingRef.current = true;
      setIsFlying(true);

      const onMoveEnd = () => {
        if (flightTimeoutRef.current) {
          clearTimeout(flightTimeoutRef.current);
          flightTimeoutRef.current = null;
        }
        if (flightTargetIdRef.current === id) {
          isFlyingRef.current = false;
          setIsFlying(false);
        }
      };

      map.once('moveend', onMoveEnd);

      // Fallback timer if moveend does not fire
      flightTimeoutRef.current = setTimeout(() => {
        if (flightTargetIdRef.current === id) {
          isFlyingRef.current = false;
          setIsFlying(false);
        }
      }, 2100);

      map.flyTo({
        center,
        zoom,
        pitch: lm.detailView?.pitch ?? 0,
        bearing: lm.detailView?.bearing ?? 0,
        duration: 1800,
        essential: true,
        padding: isMobilePhone
          ? { top: 20, bottom: Math.round(containerHeight * 0.55), left: 20, right: 20 }
          : isTablet
          ? { top: 40, bottom: 40, left: 40, right: 320 }
          : { top: 40, bottom: 40, left: 40, right: 370 },
      });
    }

    // Sync URL query ?mo=<slug>
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('mo', id);
      window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    }
  }, []);

  /**
   * Reset view back to full Vietnam bounds
   */
  const resetView = useCallback(() => {
    focusLandmark(null);
    mapRef.current?.setPadding({ top: 0, bottom: 0, left: 0, right: 0 });
    mapRef.current?.fitBounds(VIETNAM_BOUNDS, {
      padding: { top: 30, bottom: 90, left: 30, right: 30 },
      duration: 1200,
    });
  }, [focusLandmark]);

  const zoomIn = useCallback(() => {
    mapRef.current?.zoomIn();
  }, []);

  const zoomOut = useCallback(() => {
    mapRef.current?.zoomOut();
  }, []);

  const resetToVietnamView = useCallback(() => {
    resetView();
  }, [resetView]);

  const flyToLandmark = useCallback(
    (landmark: Landmark) => {
      focusLandmark(landmark.id);
    },
    [focusLandmark]
  );

  const clearSelectedProvince = useCallback(() => {
    setSelectedProvince(null);
  }, []);

  const clearSelectedLandmark = useCallback(() => {
    focusLandmark(null);
  }, [focusLandmark]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    let cancelled = false;
    const abort = new AbortController();
    const cleanups: (() => void)[] = [];

    let map: MapLibreMap;

    try {
      map = new maplibregl.Map({
        container: mapContainerRef.current,
        bounds: VIETNAM_BOUNDS,
        maxBounds: MAX_BOUNDS,
        // Constrain the camera center rather than forcing the viewport inside
        // a 20° box: otherwise wide/tall screens crop Vietnam at overview zoom.
        transformConstrain: (center, zoom) => {
          const bounds = maplibregl.LngLatBounds.convert(MAX_BOUNDS);
          return {
            center: new maplibregl.LngLat(
              Math.max(bounds.getWest(), Math.min(bounds.getEast(), center.lng)),
              Math.max(bounds.getSouth(), Math.min(bounds.getNorth(), center.lat)),
            ),
            zoom: Math.max(MAP_CONFIG.minZoom, Math.min(MAP_CONFIG.maxZoom, zoom)),
          };
        },
        fitBoundsOptions: { padding: { top: 30, bottom: 80, left: 30, right: 30 } },
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        fadeDuration: 0,
        renderWorldCopies: false,
        canvasContextAttributes: { antialias: true },
        dragPan: { linearity: 0.25, deceleration: 2500, maxSpeed: 2200 },
        scrollZoom: true,
        doubleClickZoom: true,
        touchZoomRotate: true,
        touchPitch: false,
        maxPitch: 0,
        attributionControl: { compact: true },
        dragRotate: false,
        pitchWithRotate: false,
      });

      map.setStyle(BASEMAP_STYLE_URL, { transformStyle: (_previous, next) => prepareBasemapStyle(next) });
      map.scrollZoom.setWheelZoomRate(1 / 200);
      map.scrollZoom.setZoomRate(1 / 60);
      map.touchZoomRotate.disableRotation();

      mapRef.current = map;
      setMapInstance(map);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Không thể khởi tạo MapLibre GL';
      setErrorMessage(msg);
      setIsLoading(false);
      return;
    }

    if (process.env.NODE_ENV === 'development' && new URLSearchParams(window.location.search).get('pick') === '1') {
      let toastTimer: ReturnType<typeof setTimeout> | undefined;
      let pickSequence = 0;
      const onPick = (event: maplibregl.MapMouseEvent) => {
        const sequence = ++pickSequence;
        const coordinates = `${event.lngLat.lng.toFixed(6)}, ${event.lngLat.lat.toFixed(6)}`;
        console.log('[pick] lng, lat:', coordinates);
        if (toastTimer) clearTimeout(toastTimer);
        setCoordinateToast(`${coordinates} · Đang sao chép…`);
        const finish = (copied: boolean) => {
          if (cancelled || sequence !== pickSequence) return;
          setCoordinateToast(`${coordinates} · ${copied ? 'Đã copy' : 'Không thể copy; hãy sao chép tọa độ từ console'}`);
          toastTimer = setTimeout(() => setCoordinateToast(null), copied ? 5000 : 10000);
        };
        // Call immediately within the click gesture (required by Safari clipboard).
        if (navigator.clipboard?.writeText) {
          void navigator.clipboard.writeText(coordinates).then(() => finish(true), () => finish(false));
        } else {
          finish(false);
        }
      };
      map.on('click', onPick);
      cleanups.push(() => {
        map.off('click', onPick);
        if (toastTimer) clearTimeout(toastTimer);
      });
    }

    const onLoad = async () => {
      try {
        const originalLayers = map.getStyle().layers;
        let overview = map.getZoom() < 9;
        applyBasemapTheme(map, originalLayers, overview);
        const onZoom = () => {
          setSatelliteZoom(map.getZoom() >= 11);
          const nextOverview = map.getZoom() < 9;
          if (nextOverview !== overview) {
            overview = nextOverview;
            applyBasemapTheme(map, originalLayers, overview);
          }
        };
        map.on('zoom', onZoom);
        cleanups.push(() => map.off('zoom', onZoom));
        onZoom();
        map.addSource('satellite', SATELLITE_TILES);
        map.addLayer({ id: 'satellite', type: 'raster', source: 'satellite', paint: {
          'raster-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0, 11, 1],
        } });
        map.addSource('terrain-dem', TERRAIN_DEM);
        map.addLayer({ id: 'hillshade', type: 'hillshade', source: 'terrain-dem', minzoom: 7, paint: {
          'hillshade-exaggeration': 0.5,
          'hillshade-shadow-color': 'rgba(0,0,0,0.35)',
          'hillshade-highlight-color': 'rgba(255,255,255,0.35)',
          'hillshade-accent-color': 'rgba(0,0,0,0.35)',
        } });
        applyBasemapMode(map, modeRef.current, selectedIdRef.current);
        const res = await fetch(GEOJSON_URL, { signal: abort.signal });
        if (!res.ok) throw new Error(`Không tải được bản đồ (${res.status})`);
        const geo = (await res.json()) as {
          type: 'FeatureCollection';
          features: Array<{
            type: 'Feature';
            properties: Record<string, unknown>;
            geometry: { type: string; coordinates: unknown };
          }>;
        };

        if (cancelled || mapRef.current !== map) return;

        const withLandmark = new Set(activeLandmarks.map((l) => normalize(l.province)));

        // Filter valid polygons
        const validFeatures = geo.features.filter((f) => ['Polygon', 'MultiPolygon'].includes(f.geometry?.type));
        for (const f of validFeatures) {
          const name = guessName(f.properties ?? {});
          f.properties = {
            ...f.properties,
            _name: name,
            _key: normalize(name),
            _has: [name, ...((f.properties.merged as string) ?? '').split(',')].some((n) =>
              withLandmark.has(normalize(n))
            )
              ? 1
              : 0,
          };
        }
        geo.features = validFeatures;

        // 1. Provinces source & layers
        map.addSource('provinces', {
          type: 'geojson',
          data: geo as unknown as GeoJSONFeatureCollection,
          promoteId: '_key',
          tolerance: 0.375,
          buffer: 64,
        });

        map.addLayer({
          id: 'province-fill',
          type: 'fill',
          source: 'provinces',
          paint: {
            'fill-opacity': PROVINCE_FILL_OPACITY,
            'fill-color': [
              'case',
              ['==', ['get', '_has'], 1],
              MAP_COLORS.provinceWithLandmark,
              ['boolean', ['feature-state', 'hover'], false],
              MAP_COLORS.provinceHover,
              MAP_COLORS.provinceWithoutLandmark,
            ],
          },
        });

        map.addLayer({
          id: 'province-line',
          type: 'line',
          source: 'provinces',
          paint: {
            'line-color': MAP_COLORS.border,
            'line-width': ['interpolate', ['linear'], ['zoom'], 4, 0.6, 9, 1, 12, 0.6],
            'line-opacity': ['interpolate', ['linear'], ['zoom'], 6, 1, 12, 0.3],
          },
        });

        map.addLayer({
          id: 'province-selected',
          type: 'line',
          source: 'provinces',
          filter: ['==', ['get', '_key'], ''],
          paint: {
            'line-color': MAP_COLORS.selectedOutline,
            'line-width': 1.6,
            'line-opacity': ['interpolate', ['linear'], ['zoom'], 6, 1, 12, 0.35],
          },
        });

        map.addSource('vn-mask', { type: 'geojson', data: '/data/vietnam-mask.geojson' });
        map.addLayer({ id: 'vn-mask', type: 'fill', source: 'vn-mask', paint: { 'fill-color': SEA_COLOR, 'fill-opacity': ['interpolate', ['linear'], ['zoom'], 8, 1, 10, 0] } });

        // Hover for provinces
        const hoverSubscription = map.on('mousemove', 'province-fill', (e: MapLayerMouseEvent) => {
          const key = e.features?.[0]?.properties?._key as string | undefined;
          if (!key || key === hoveredFeatureKeyRef.current) return;
          if (hoveredFeatureKeyRef.current) {
            map.setFeatureState({ source: 'provinces', id: hoveredFeatureKeyRef.current }, { hover: false });
          }
          hoveredFeatureKeyRef.current = key;
          map.setFeatureState({ source: 'provinces', id: key }, { hover: true });
        });

        const leaveSubscription = map.on('mouseleave', 'province-fill', () => {
          if (hoveredFeatureKeyRef.current) {
            map.setFeatureState({ source: 'provinces', id: hoveredFeatureKeyRef.current }, { hover: false });
          }
          hoveredFeatureKeyRef.current = null;
        });

        cleanups.push(() => hoverSubscription.unsubscribe(), () => leaveSubscription.unsubscribe());

        // 2. Islands (Hoàng Sa & Trường Sa)
        map.addSource('islands', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: ISLANDS.map((i) => ({
              type: 'Feature',
              properties: { name: i.name, group: i.group },
              geometry: { type: 'Point', coordinates: i.lngLat },
            })),
          },
        });

        map.addLayer({
          id: 'island-dots',
          type: 'circle',
          source: 'islands',
          paint: {
            'circle-color': MAP_COLORS.island,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1,
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 2.2, 8, 4.5, 11, 7],
          },
        });

        // 3. Province Labels
        map.addSource('province-labels', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: validFeatures.map((f) => ({
              type: 'Feature',
              properties: {
                ...f.properties,
                priority:
                  -((f.properties._has as number) ?? 0) * 100000 - ((f.properties.areaKm2 as number) ?? 0),
              },
              geometry: { type: 'Point', coordinates: f.properties.labelPoint as [number, number] },
            })),
          },
        });

        map.addLayer({
          id: 'province-labels',
          type: 'symbol',
          source: 'province-labels',
          layout: {
            'text-field': ['get', '_name'],
            'text-font': ['Noto Sans Regular'],
            'text-size': ['interpolate', ['linear'], ['zoom'], 3, 9, 6, 12, 11, 17],
            'text-padding': 2,
            'text-allow-overlap': false,
            'text-max-width': 7,
            'symbol-sort-key': ['get', 'priority'],
          },
          paint: {
            'text-color': '#17482c',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
          },
        });

        // 4. Map Labels (Archipelagos and Sea)
        map.addSource('map-labels', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              ...ISLAND_LABELS.map((l) => ({
                type: 'Feature' as const,
                properties: { name: `${l.text}\n${l.sub}`, island: true },
                geometry: { type: 'Point' as const, coordinates: l.lngLat },
              })),
              {
                type: 'Feature' as const,
                properties: { name: SEA_LABEL.text, island: false },
                geometry: { type: 'Point' as const, coordinates: SEA_LABEL.lngLat },
              },
            ],
          },
        });

        map.addLayer({
          id: 'archipelago-labels',
          type: 'symbol',
          source: 'map-labels',
          filter: ['==', ['get', 'island'], true],
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Noto Sans Regular'],
            'text-size': ['interpolate', ['linear'], ['zoom'], 2, 10, 6, 13],
            'text-max-width': 24,
            'text-allow-overlap': true,
            'text-ignore-placement': false,
          },
          paint: {
            'text-color': '#17482c',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
          },
        });

        map.addLayer({
          id: 'sea-label',
          type: 'symbol',
          source: 'map-labels',
          filter: ['==', ['get', 'island'], false],
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Noto Sans Regular'],
            'text-size': 14,
            'text-letter-spacing': 0.3,
            'text-allow-overlap': false,
          },
          paint: { 'text-color': '#4f8aa8' },
        });

        const sortedLandmarksForAreas = [...activeLandmarks.filter((lm) => lm.area)].sort((a, b) => {
          const rA = a.area?.radiusMeters ?? 250;
          const rB = b.area?.radiusMeters ?? 250;
          return rB - rA; // Larger radius FIRST, smaller radius LAST (drawn on top)
        });

        map.addSource('landmark-areas', {
          type: 'geojson',
          data: featureCollection(sortedLandmarksForAreas.map((lm) => {
            const properties = {
              id: lm.id,
              color: lm.theme.color,
              radiusMeters: lm.area?.radiusMeters ?? 250,
            };
            const ring = lm.area?.polygon;
            if (ring && ring.length >= 3) {
              const closed = [...ring];
              const first = closed[0], last = closed[closed.length - 1];
              if (first[0] !== last[0] || first[1] !== last[1]) closed.push(first);
              return polygon([closed], properties);
            }
            return circle(lm.lngLat, lm.area?.radiusMeters ?? 250, { units: 'meters', steps: 64, properties });
          })),
        });
        map.addLayer({ id: 'landmark-area-fill', type: 'fill', source: 'landmark-areas',
          minzoom: ZOOM.areaFrom, paint: { 'fill-color': ['get', 'color'], 'fill-opacity': 0.12 } });
        map.addLayer({ id: 'landmark-area-line', type: 'line', source: 'landmark-areas',
          minzoom: ZOOM.areaFrom, paint: { 'line-color': ['get', 'color'], 'line-width': 1.5, 'line-dasharray': [3, 2] } });
        map.addLayer({ id: 'landmark-area-line-hover', type: 'line', source: 'landmark-areas',
          minzoom: ZOOM.areaFrom, filter: ['==', ['get', 'id'], ''], paint: { 'line-color': '#ffffff', 'line-width': 2.5, 'line-dasharray': [3, 2] } });

        // 6. Sub-Landmarks Source & Layers (Zoom levels 12-16)
        const subFeatures: GeoJSONFeature[] = [];
        activeLandmarks.forEach((lm) => {
          (lm.subLandmarks ?? []).forEach((sub) => {
            subFeatures.push({
              type: 'Feature',
              properties: {
                id: sub.id,
                landmarkId: lm.id,
                name: sub.name,
                minZoom: sub.minZoom,
                type: sub.type,
                description: sub.description,
                confidence: sub.confidence,
                relativePosition: sub.relativePosition ?? '',
                color: lm.theme.color,
              },
              geometry: {
                type: 'Point',
                coordinates: sub.coordinates,
              },
            });
          });
        });

        map.addSource('sub-landmarks', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: subFeatures,
          },
        });

        // For each zoom level in SUB_ZOOM_LEVELS create dot and label layers with minzoom: z
        SUB_ZOOM_LEVELS.forEach((z) => {
          map.addLayer({
            id: `sub-dot-${z}`,
            type: 'circle',
            source: 'sub-landmarks',
            minzoom: z,
            filter: ['==', ['get', 'minZoom'], z],
            paint: {
              'circle-radius': 4.5,
              'circle-color': ['get', 'color'],
              'circle-stroke-width': 1.5,
              'circle-stroke-color': '#ffffff',
            },
          });

          map.addLayer({
            id: `sub-label-${z}`,
            type: 'symbol',
            source: 'sub-landmarks',
            minzoom: z,
            filter: ['==', ['get', 'minZoom'], z],
            layout: {
              'text-field': ['get', 'name'],
              'text-font': ['Noto Sans Regular'],
              'text-size': 11,
              'text-offset': [0, 0.8],
              'text-anchor': 'top',
              'text-max-width': 10,
              'text-allow-overlap': false,
            },
            paint: {
              'text-color': '#2d3748',
              'text-halo-color': '#ffffff',
              'text-halo-width': 2,
            },
          });
        });

        map.addSource('landmarks', {
          type: 'geojson',
          cluster: true,
          clusterMaxZoom: ZOOM.clusterMax,
          clusterRadius: 40,
          data: {
            type: 'FeatureCollection',
            features: activeLandmarks.map((lm) => ({
              type: 'Feature',
              properties: {
                id: lm.id,
                order: lm.order,
                name: lm.title,
                color: lm.theme.color,
                textOn: lm.theme.textOn,
                terrain: lm.terrain,
                positionType: lm.positionType,
                needsReview: Boolean(lm.needsReview),
              },
              geometry: {
                type: 'Point',
                coordinates: [lm.lngLat[0], lm.lngLat[1]],
              },
            })),
          },
        });

        map.addLayer({ id: 'clusters', type: 'circle', source: 'landmarks',
          filter: ['has', 'point_count'], paint: {
            'circle-color': '#1F3A2C', 'circle-radius': 20,
            'circle-stroke-color': '#ffffff', 'circle-stroke-width': 3,
          } });
        map.addLayer({ id: 'cluster-count', type: 'symbol', source: 'landmarks',
          filter: ['has', 'point_count'], layout: {
            'text-field': ['get', 'point_count_abbreviated'], 'text-font': ['Noto Sans Regular'],
            'text-size': 13, 'text-allow-overlap': true,
          }, paint: { 'text-color': '#ffffff' } });
        map.addLayer({
          id: 'landmark-points-shadow',
          type: 'circle',
          source: 'landmarks',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': 'rgba(0, 0, 0, 0.45)',
            'circle-radius': 15,
            'circle-blur': 0.7,
            'circle-translate': [0, 2],
          },
        });
        map.addLayer({ id: 'landmark-points', type: 'circle', source: 'landmarks',
          filter: ['!', ['has', 'point_count']], paint: {
            'circle-color': ['get', 'color'], 'circle-radius': 13,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 3,
          } });
        map.addLayer({ id: 'landmark-order', type: 'symbol', source: 'landmarks',
          filter: ['!', ['has', 'point_count']], layout: {
            'text-field': ['to-string', ['get', 'order']], 'text-font': ['Noto Sans Regular'],
            'text-size': 13, 'text-allow-overlap': true, 'text-ignore-placement': true,
          }, paint: { 'text-color': ['get', 'textOn'] } });

        // Landmark names label below pin
        map.addLayer({
          id: 'landmark-names',
          filter: ['!', ['has', 'point_count']],
          type: 'symbol',
          source: 'landmarks',
          minzoom: ZOOM.showNames,
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Noto Sans Regular'],
            'text-size': 11.5,
            'text-offset': [0, 0.8],
            'text-anchor': 'top',
            'text-max-width': 8,
            'text-allow-overlap': false,
          },
          paint: {
            'text-color': '#1b4332',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
          },
        });

        // Hovered landmark top-layer (highest z-index so hovered pin & ring is on top of adjacent pins)
        map.addLayer({
          id: 'landmark-hover-halo',
          type: 'circle',
          source: 'landmarks',
          filter: ['==', ['get', 'id'], ''],
          paint: {
            'circle-color': 'rgba(0,0,0,0)',
            'circle-radius': 19,
            'circle-stroke-color': ['get', 'color'],
            'circle-stroke-width': 4,
          },
        });

        map.addLayer({
          id: 'landmark-hover-point',
          type: 'circle',
          source: 'landmarks',
          filter: ['==', ['get', 'id'], ''],
          paint: {
            'circle-color': ['get', 'color'],
            'circle-radius': 13,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 3,
          },
        });

        map.addLayer({
          id: 'landmark-hover-order',
          type: 'symbol',
          source: 'landmarks',
          filter: ['==', ['get', 'id'], ''],
          layout: {
            'text-field': ['to-string', ['get', 'order']],
            'text-font': ['Noto Sans Regular'],
            'text-size': 13,
            'text-allow-overlap': true,
            'text-ignore-placement': true,
          },
          paint: {
            'text-color': ['get', 'textOn'],
          },
        });

        map.addLayer({
          id: 'landmark-hover-names',
          type: 'symbol',
          source: 'landmarks',
          filter: ['==', ['get', 'id'], ''],
          minzoom: ZOOM.showNames,
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Noto Sans Regular'],
            'text-size': 11.5,
            'text-offset': [0, 0.8],
            'text-anchor': 'top',
            'text-max-width': 8,
            'text-allow-overlap': true,
            'text-ignore-placement': true,
          },
          paint: {
            'text-color': '#1b4332',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
          },
        });

        const applyHoverFilter = (id: string | null) => {
          const filter = id
            ? ['all', ['!', ['has', 'point_count']], ['==', ['get', 'id'], id]]
            : ['==', ['get', 'id'], ''];

          if (map.getLayer('landmark-hover-halo')) {
            map.setFilter('landmark-hover-halo', filter as any);
          }
          if (map.getLayer('landmark-hover-point')) {
            map.setFilter('landmark-hover-point', filter as any);
          }
          if (map.getLayer('landmark-hover-order')) {
            map.setFilter('landmark-hover-order', filter as any);
          }
          if (map.getLayer('landmark-hover-names')) {
            map.setFilter('landmark-hover-names', filter as any);
          }
          if (map.getLayer('landmark-area-line-hover')) {
            map.setFilter('landmark-area-line-hover', ['==', ['get', 'id'], id ?? '']);
          }
        };

        const resolveHoveredLandmarkId = (event: MapLayerMouseEvent): string | null => {
          // 1. Give highest priority to whichever landmark pin center is closest to the cursor
          const cursorPt = event.point;
          let closestPinId: string | null = null;
          let minPinDist = 22; // within 22px of pin center

          for (const lm of activeLandmarks) {
            const screenPt = map.project([lm.lngLat[0], lm.lngLat[1]]);
            const dist = Math.hypot(cursorPt.x - screenPt.x, cursorPt.y - screenPt.y);
            if (dist < minPinDist) {
              minPinDist = dist;
              closestPinId = lm.id;
            }
          }

          if (closestPinId) {
            return closestPinId;
          }

          // 2. If not directly over a pin, check landmark area under cursor
          const features = map.queryRenderedFeatures(event.point, {
            layers: ['landmark-area-fill'],
          });
          if (!features || features.length === 0) return null;

          if (features.length === 1) {
            return String(features[0].properties?.id ?? '');
          }

          // Sort by radius ascending so inner/smaller circle (e.g. 250m purple) wins over outer (500m green)
          const sorted = [...features].sort((a, b) => {
            const rA = Number(a.properties?.radiusMeters ?? 250);
            const rB = Number(b.properties?.radiusMeters ?? 250);
            return rA - rB;
          });
          return String(sorted[0].properties?.id ?? '');
        };

        const onLandmarkHover = (event: MapLayerMouseEvent) => {
          if (isFlyingRef.current) return;
          const targetId = resolveHoveredLandmarkId(event);
          if (targetId) {
            map.getCanvas().style.cursor = 'pointer';
            applyHoverFilter(targetId);
            if (closeTimerRef.current) {
              clearTimeout(closeTimerRef.current);
              closeTimerRef.current = null;
            }
            scheduleHoverRef.current(targetId);
          } else {
            onLandmarkLeave();
          }
        };

        const onLandmarkLeave = () => {
          map.getCanvas().style.cursor = '';
          applyHoverFilter(null);
          scheduleCloseRef.current();
        };

        const onLandmarkClick = (event: MapLayerMouseEvent) => {
          const id = resolveHoveredLandmarkId(event);
          if (id) focusLandmark(id);
        };

        const onClusterClick = async (event: MapLayerMouseEvent) => {
          const feature = event.features?.[0];
          if (!feature || feature.geometry.type !== 'Point') return;
          const source = map.getSource('landmarks');
          if (!(source instanceof maplibregl.GeoJSONSource)) return;
          try {
            const zoom = await source.getClusterExpansionZoom(Number(feature.properties.cluster_id));
            if (!cancelled) map.easeTo({ center: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]], zoom });
          } catch (error) {
            if (!cancelled) setErrorMessage(error instanceof Error ? error.message : 'Không mở được cụm mốc');
          }
        };
        const onClusterEnter = async (event: MapLayerMouseEvent) => {
          map.getCanvas().style.cursor = 'pointer';
          const feature = event.features?.[0];
          if (!feature || feature.geometry.type !== 'Point') return;
          const coords = feature.geometry.coordinates;
          const source = map.getSource('landmarks');
          if (!(source instanceof maplibregl.GeoJSONSource)) return;
          const clusterId = Number(feature.properties?.cluster_id);
          try {
            const leaves = await source.getClusterLeaves(clusterId, 50, 0);
            if (!leaves || cancelled) return;
            const orders: number[] = leaves
              .map((l) => Number(l.properties?.order))
              .filter((n) => !isNaN(n))
              .sort((a: number, b: number) => a - b);
            const pt = map.project([coords[0], coords[1]]);
            setClusterTooltipRef.current({ x: pt.x, y: pt.y, landmarkOrders: orders });
          } catch {
            // ignore
          }
        };
        const onClusterLeave = () => {
          map.getCanvas().style.cursor = '';
          setClusterTooltipRef.current(null);
        };

        const onMoveStart = () => {
          setClusterTooltipRef.current(null);
        };
        map.on('movestart', onMoveStart);

        const landmarkInteractiveLayers = [
          'landmark-points',
          'landmark-order',
          'landmark-names',
          'landmark-hover-halo',
          'landmark-hover-point',
          'landmark-hover-order',
          'landmark-hover-names',
          'landmark-area-fill',
          'landmark-area-line',
        ];
        landmarkInteractiveLayers.forEach((layerId) => {
          map.on('mouseenter', layerId, onLandmarkHover);
          map.on('mousemove', layerId, onLandmarkHover);
          map.on('mouseleave', layerId, onLandmarkLeave);
          map.on('click', layerId, onLandmarkClick);
        });

        map.on('mouseenter', 'clusters', onClusterEnter);
        map.on('mouseleave', 'clusters', onClusterLeave);
        map.on('click', 'clusters', onClusterClick);

        const onMapClick = (e: MapLayerMouseEvent) => {
          const features = map.queryRenderedFeatures(e.point, { layers: ['landmark-points', 'landmark-order', 'clusters', 'landmark-area-fill'] });
          if (!features || features.length === 0) {
            focusLandmark(null);
          }
        };
        map.on('click', onMapClick);

        cleanups.push(() => {
          landmarkInteractiveLayers.forEach((layerId) => {
            map.off('mouseenter', layerId, onLandmarkHover);
            map.off('mousemove', layerId, onLandmarkHover);
            map.off('mouseleave', layerId, onLandmarkLeave);
            map.off('click', layerId, onLandmarkClick);
          });

          map.off('mouseenter', 'clusters', onClusterEnter);
          map.off('mouseleave', 'clusters', onClusterLeave);
          map.off('click', 'clusters', onClusterClick);

          map.off('movestart', onMoveStart);
          map.off('click', onMapClick);
        });

        for (const layer of ['island-dots', 'province-labels', 'archipelago-labels', 'sea-label']) map.moveLayer(layer);
        applyBasemapMode(map, modeRef.current, selectedIdRef.current);

        // Chế độ ?edit=1 (chỉ dev): kéo thả pin, hiện "slug: [lng, lat]", nút Copy và "Copy tất cả"
        if (process.env.NODE_ENV === 'development' && new URLSearchParams(window.location.search).get('edit') === '1') {
          const editMarkers: maplibregl.Marker[] = [];
          activeLandmarks.forEach((lm) => {
            const el = document.createElement('div');
            el.style.width = '26px';
            el.style.height = '26px';
            el.style.borderRadius = '50%';
            el.style.backgroundColor = TERRAIN_COLORS[lm.terrain];
            el.style.border = lm.positionType === 'verified' ? '3px solid #ffffff' : '3px dashed #ffffff';
            el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.5)';
            el.style.cursor = 'grab';
            el.title = `Kéo thả: ${lm.title} (${lm.id})`;

            const marker = new maplibregl.Marker({ element: el, draggable: true })
              .setLngLat(lm.lngLat)
              .addTo(map);

            const onDragEnd = () => {
              const pos = marker.getLngLat();
              const coords: [number, number] = [
                Number(pos.lng.toFixed(6)),
                Number(pos.lat.toFixed(6)),
              ];
              allCoordinatesRef.current[lm.id] = coords;

              const pt = point(coords);
              let prov = 'Ngoài ranh giới';
              for (const f of validFeatures) {
                if (booleanPointInPolygon(pt, f as unknown as Parameters<typeof booleanPointInPolygon>[1])) {
                  prov = String(f.properties._name ?? f.properties.name ?? '');
                  break;
                }
              }

              let minDistKm = Infinity;
              for (const f of validFeatures) {
                const line = polygonToLine(f as unknown as Parameters<typeof polygonToLine>[0]);
                const flat = flatten(line);
                for (const lf of flat.features) {
                  const d = pointToLineDistance(pt, lf, { units: 'kilometers' });
                  if (d < minDistKm) minDistKm = d;
                }
              }
              const distToCoast = Math.round(minDistKm * 1000);

              const nextState: EditState = {
                activeSlug: lm.id,
                lngLat: coords,
                distanceToCoastMeters: distToCoast,
                provinceName: prov,
                allCoordinates: { ...allCoordinatesRef.current },
              };
              setEditState(nextState);
              setCoordinateToast(`${lm.id}: [${coords[0]}, ${coords[1]}] · Bờ biển: ${distToCoast}m · Tỉnh: ${prov}`);
            };

            marker.on('dragend', onDragEnd);
            editMarkers.push(marker);
          });
          cleanups.push(() => {
            editMarkers.forEach((m) => m.remove());
          });
        }

        setIsLoading(false);

        // Check URL query ?mo=<slug> on startup
        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search);
          const initialMo = urlParams.get('mo');
          if (initialMo) {
            focusLandmark(initialMo);
          }
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error instanceof Error ? error.message : 'Không tải được bản đồ');
          setIsLoading(false);
        }
      }
    };
    map.on('load', onLoad);
    const onError = (event: maplibregl.ErrorEvent) => {
      if (!cancelled) {
        setErrorMessage(event.error.message);
        setIsLoading(false);
      }
    };
    map.on('error', onError);

    return () => {
      cancelled = true;
      abort.abort();
      if (flightTimeoutRef.current) {
        clearTimeout(flightTimeoutRef.current);
        flightTimeoutRef.current = null;
      }
      hoveredFeatureKeyRef.current = null;
      cleanups.forEach((cleanup) => cleanup());
      map.off('load', onLoad);
      map.off('error', onError);
      map.remove();
      mapRef.current = null;
      setMapInstance(null);
    };
  }, [focusLandmark]);

  return {
    mapContainerRef,
    basemapMode,
    setBasemapMode,
    mapInstance,
    coordinateToast,
    isLoading,
    errorMessage,
    hoveredProvince: null,
    selectedProvince,
    landmarks: activeLandmarks,
    selectedLandmark,
    selectedId,
    isFlying,
    hoveredLandmarkId,
    scheduleHover,
    scheduleClose,
    cancelClose,
    clusterTooltip,
    editState,
    copyActiveCoordinate,
    copyAllCoordinates,
    focusLandmark,
    resetView,
    zoomIn,
    zoomOut,
    resetToVietnamView,
    flyToLandmark,
    clearSelectedProvince,
    clearSelectedLandmark,
  };
}
