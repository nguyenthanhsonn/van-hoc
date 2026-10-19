import { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import type {
  Map as MapLibreMap,
  MapMouseEvent,
  MapLayerMouseEvent,
  MapGeoJSONFeature,
  StyleSpecification,
} from 'maplibre-gl';
import {
  MAP_CONFIG,
  MAP_COLORS,
  TERRAIN_COLORS,
  ZOOM,
  SUB_ZOOM_LEVELS,
  COASTAL_IMAGE,
  VIETNAM_BOUNDS,
  MAX_BOUNDS,
  ISLANDS,
  ISLAND_LABELS,
  SEA_LABEL,
  GEOJSON_URL,
} from '../config/mapConfig';
import { landmarks } from '../data/landmarksData';
import type {
  ProvinceProperties,
  Landmark,
  UseVietnamMapReturn,
  GeoJSONPoint,
  GeoJSONFeature,
  GeoJSONFeatureCollection,
} from '../types';
import styles from '../components/VietnamMap.module.css';

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

/**
 * Custom hook to initialize and manage MapLibre GL map instance for Vietnam 2D map.
 * Supports clustering, sub-landmarks zoom reveal, 2-way legend interaction, and ?mo=<slug> sync.
 */
export function useVietnamMap(): UseVietnamMapReturn {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapInstance, setMapInstance] = useState<MapLibreMap | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceProperties | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedLandmark = landmarks.find((l) => l.id === selectedId) ?? null;

  // Ref tracking selectedId to safely use in event handlers without re-attaching
  const selectedIdRef = useRef<string | null>(null);
  selectedIdRef.current = selectedId;

  // Track currently hovered feature ID for feature-state
  const hoveredFeatureKeyRef = useRef<string | null>(null);

  /**
   * Focus a landmark by ID: updates layer filter, flies camera to detailView, updates state and URL query ?mo=<id>
   */
  const focusLandmark = useCallback((id: string | null) => {
    const map = mapRef.current;
    setSelectedId(id);

    if (!map) return;

    if (!id) {
      if (map.getLayer('landmark-selected')) {
        map.setFilter('landmark-selected', ['all', ['!has', 'point_count'], ['==', 'id', '']]);
      }
      if (map.getLayer('province-selected')) {
        map.setFilter('province-selected', ['==', ['get', '_key'], '']);
      }
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('mo');
        window.history.replaceState(null, '', url.pathname + (url.search ? url.search : ''));
      }
      return;
    }

    const lm = landmarks.find((l) => l.id === id);
    if (!lm) return;

    // Update active class on markers
    markersRef.current.forEach((marker) => {
      const el = marker.getElement();
      const markerId = el.getAttribute('data-id');
      if (id && markerId === id) {
        el.classList.add(styles.pinActive);
        el.style.zIndex = '50';
      } else {
        el.classList.remove(styles.pinActive);
        el.style.zIndex = '10';
      }
    });

    // Highlight selected landmark point circle
    if (map.getLayer('landmark-selected')) {
      map.setFilter('landmark-selected', ['all', ['!has', 'point_count'], ['==', 'id', id]]);
    }

    // Highlight selected province
    if (map.getLayer('province-selected')) {
      map.setFilter('province-selected', [
        'any',
        ['==', ['get', '_key'], normalize(lm.province)],
        ['in', lm.province, ['coalesce', ['get', 'merged'], '']],
      ]);
    }

    // Fly camera to landmark detailView
    const center = lm.detailView?.center ?? [lm.lngLat[0], lm.lngLat[1]];
    const zoom = lm.detailView?.zoom ?? lm.zoom ?? 13.5;
    map.flyTo({
      center,
      zoom,
      pitch: lm.detailView?.pitch ?? 0,
      bearing: lm.detailView?.bearing ?? 0,
      duration: 1800,
      essential: true,
      padding: { top: 60, bottom: 60, left: 60, right: 380 },
    });

    // Sync URL query ?mo=<slug>
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('mo', id);
      window.history.replaceState(null, '', url.pathname + url.search);
    }
  }, []);

  /**
   * Reset view back to full Vietnam bounds
   */
  const resetView = useCallback(() => {
    focusLandmark(null);
    markersRef.current.forEach((marker) => {
      const el = marker.getElement();
      el.classList.remove(styles.pinActive);
      el.style.zIndex = '10';
    });
    mapRef.current?.fitBounds(VIETNAM_BOUNDS, {
      padding: { top: 30, bottom: 30, left: 30, right: 30 },
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

    const offlineMapStyle: StyleSpecification = {
      version: 8,
      name: 'Vietnam-2D-Offline',
      glyphs: '/fonts/{fontstack}/{range}.pbf',
      sources: {},
      layers: [
        {
          id: 'sea',
          type: 'background',
          paint: {
            'background-color': MAP_COLORS.sea,
          },
        },
      ],
    };

    let map: MapLibreMap;

    try {
      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: offlineMapStyle,
        bounds: VIETNAM_BOUNDS,
        maxBounds: MAX_BOUNDS,
        minZoom: 0,
        maxZoom: 18,
        fadeDuration: 0,
        renderWorldCopies: false,
        canvasContextAttributes: { antialias: true },
        dragPan: { linearity: 0.25, deceleration: 2500, maxSpeed: 2200 },
        scrollZoom: true,
        doubleClickZoom: true,
        touchZoomRotate: true,
        touchPitch: false,
        maxPitch: 0,
        attributionControl: false,
        dragRotate: false,
        pitchWithRotate: false,
      });

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

    map.on('load', async () => {
      try {
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

        const withLandmark = new Set(landmarks.map((l) => normalize(l.province)));

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
            'line-width': ['interpolate', ['linear'], ['zoom'], 4, 0.6, 9, 1.6],
          },
        });

        map.addLayer({
          id: 'province-selected',
          type: 'line',
          source: 'provinces',
          filter: ['==', ['get', '_key'], ''],
          paint: {
            'line-color': MAP_COLORS.selectedOutline,
            'line-width': 2.6,
          },
        });

        // Hover for provinces
        map.on('mousemove', 'province-fill', (e: MapLayerMouseEvent) => {
          const key = e.features?.[0]?.properties?._key as string | undefined;
          if (!key || key === hoveredFeatureKeyRef.current) return;
          if (hoveredFeatureKeyRef.current) {
            map.setFeatureState({ source: 'provinces', id: hoveredFeatureKeyRef.current }, { hover: false });
          }
          hoveredFeatureKeyRef.current = key;
          map.setFeatureState({ source: 'provinces', id: key }, { hover: true });
        });

        map.on('mouseleave', 'province-fill', () => {
          if (hoveredFeatureKeyRef.current) {
            map.setFeatureState({ source: 'provinces', id: hoveredFeatureKeyRef.current }, { hover: false });
          }
          hoveredFeatureKeyRef.current = null;
        });

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
            'text-halo-width': 1.5,
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
            'text-halo-width': 1.5,
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

        // 5. Coastal AI Overlay Image (if enabled, placed below clusters)
        if (COASTAL_IMAGE.enabled) {
          map.addSource('coastal-ai-image', {
            type: 'image',
            url: COASTAL_IMAGE.url,
            coordinates: COASTAL_IMAGE.coordinates,
          });

          map.addLayer({
            id: 'coastal-ai-layer',
            type: 'raster',
            source: 'coastal-ai-image',
            paint: {
              'raster-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                ZOOM.imageOverlayFrom,
                0,
                ZOOM.imageOverlayFull,
                0.9,
              ],
            },
          });
        }

        // 6. Sub-Landmarks Source & Layers (Zoom levels 12-16)
        const subFeatures: GeoJSONFeature[] = [];
        landmarks.forEach((lm) => {
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
                color: TERRAIN_COLORS[lm.terrain],
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
              'text-halo-width': 1.6,
            },
          });
        });

        // 7. Remove any previous markers
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];

        // 8. Add individual colorful location pin icons (📍) for each landmark
        landmarks.forEach((lm) => {
          const color = lm.color ?? TERRAIN_COLORS[lm.terrain];
          const isSelected = lm.id === selectedIdRef.current;
          const el = document.createElement('button');
          el.className = `${styles.pin} ${isSelected ? styles.pinActive : ''}`;
          el.setAttribute('data-id', lm.id);
          el.setAttribute('title', `Mốc ${lm.order}: ${lm.title}`);
          el.setAttribute('aria-label', `Mốc ${lm.order}: ${lm.title}`);
          el.style.zIndex = isSelected ? '50' : '10';

          el.innerHTML = `
            <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 1C8.163 1 1 8.163 1 17C1 27.2 15.2 41.6 16.3 42.7C16.7 43.1 17.3 43.1 17.7 42.7C18.8 41.6 33 27.2 33 17C33 8.163 25.837 1 17 1Z" 
                    fill="${color}" 
                    stroke="#FFFFFF" 
                    stroke-width="2.5"
              />
              <circle cx="17" cy="17" r="10" fill="#FFFFFF"/>
              <text x="17" y="21.5" font-family="'Noto Sans Regular', Arial, sans-serif" font-weight="800" font-size="12" fill="${color}" text-anchor="middle">${lm.order}</text>
            </svg>
          `;

          el.addEventListener('click', (e) => {
            e.stopPropagation();
            focusLandmark(lm.id);
          });

          const marker = new maplibregl.Marker({
            element: el,
            anchor: 'bottom',
          })
            .setLngLat([lm.lngLat[0], lm.lngLat[1]])
            .addTo(map);

          markersRef.current.push(marker);
        });

        // 9. Landmarks Source & Names Label (minzoom 8)
        map.addSource('landmarks', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: landmarks.map((lm) => ({
              type: 'Feature',
              properties: {
                id: lm.id,
                order: lm.order,
                name: lm.title,
                color: lm.color ?? TERRAIN_COLORS[lm.terrain],
                terrain: lm.terrain,
              },
              geometry: {
                type: 'Point',
                coordinates: [lm.lngLat[0], lm.lngLat[1]],
              },
            })),
          },
        });

        // Landmark names label below pin
        map.addLayer({
          id: 'landmark-names',
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
    });

    return () => {
      cancelled = true;
      abort.abort();
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
      setMapInstance(null);
    };
  }, [focusLandmark]);

  return {
    mapContainerRef,
    mapInstance,
    isLoading,
    errorMessage,
    hoveredProvince: null,
    selectedProvince,
    landmarks,
    selectedLandmark,
    selectedId,
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
