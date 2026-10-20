'use client';

// src/features/map/components/VietnamMap.tsx
import { useMemo, useState, useEffect, useRef, type CSSProperties } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MAP_COLORS } from '../config/mapConfig';
import { useVietnamMap } from '../hooks/useVietnamMap';
import type { Landmark } from '../types';
import { LandmarkCallout } from './LandmarkCallout';
import { MobileBottomSheet } from './MobileBottomSheet';
import styles from './VietnamMap.module.css';

export type MapLandmark = Landmark;

export function VietnamMap() {
  const {
    mapContainerRef,
    basemapMode,
    setBasemapMode,
    coordinateToast,
    focusLandmark,
    selectedId,
    selectedLandmark,
    isFlying,
    resetView,
    zoomIn,
    zoomOut,
    isLoading,
    errorMessage,
    landmarks,
    hoveredLandmarkId,
    scheduleClose,
    cancelClose,
    clusterTooltip,
    editState,
    copyActiveCoordinate,
    copyAllCoordinates,
    mapInstance,
  } = useVietnamMap();

  const [isMobile, setIsMobile] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const legendRef = useRef<HTMLElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const basemapRef = useRef<HTMLDivElement | null>(null);
  const miniRef = useRef<HTMLButtonElement | null>(null);
  const editRef = useRef<HTMLElement | null>(null);
  const calloutObstacles = useMemo(() => [legendRef, controlsRef, basemapRef, miniRef, editRef], []);

  // Responsive device check: mobile is strictly < 640px (smartphones)
  // Tablets (640px - 1023px) and Desktops enjoy rich callout branches and tablet-optimized sidebar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sortedLandmarks = useMemo(
    () => [...landmarks].sort((a, b) => a.order - b.order),
    [landmarks]
  );

  // Active landmark for Desktop/Tablet Callout - ONLY when hovering
  const calloutLandmark = useMemo(() => {
    // Only display callout AFTER the camera has arrived at the destination
    if (isFlying) return null;

    // Callout ONLY appears on hover ("chỉ khi hover vô nó mới cho hiện cái nhánh câu chuyện")
    if (hoveredLandmarkId) {
      return landmarks.find((l) => l.id === hoveredLandmarkId) ?? null;
    }
    return null;
  }, [isFlying, hoveredLandmarkId, landmarks]);

  return (
    <div className={styles.root} data-detail={Boolean(selectedLandmark)}>
      {errorMessage && (
        <div className={styles.loadError} role="alert">
          {errorMessage}
        </div>
      )}
      {isLoading && (
        <div className={styles.loadError} role="status">
          Đang tải dữ liệu bản đồ Việt Nam...
        </div>
      )}

      <div ref={mapContainerRef} className={styles.map} />

      {/* CALLOUT (Desktop & Tablet) - Only appears on hover */}
      {calloutLandmark && (
        <LandmarkCallout
          key={calloutLandmark.id}
          landmark={calloutLandmark}
          map={mapInstance}
          containerRef={mapContainerRef}
          isPinned={false}
          onClose={scheduleClose}
          obstacleRefs={calloutObstacles}
          onCardMouseEnter={cancelClose}
          onCardMouseLeave={scheduleClose}
        />
      )}

      {/* MOBILE BOTTOM SHEET (Touch & < 640px) */}
      {!isFlying && isMobile && selectedLandmark && (
        <MobileBottomSheet
          landmark={selectedLandmark}
          onClose={() => focusLandmark(null)}
        />
      )}

      {/* CLUSTER HOVER TOOLTIP */}
      {clusterTooltip && (
        <div
          className={styles.clusterTooltip}
          style={{
            left: `${clusterTooltip.x}px`,
            top: `${clusterTooltip.y}px`,
          }}
          role="tooltip"
        >
          <div className={styles.clusterBadges}>
            {clusterTooltip.landmarkOrders.map((order: number) => {
              const lm = landmarks.find((l) => l.order === order);
              return (
                <span
                  key={order}
                  className={styles.clusterBadgeItem}
                  style={{
                    backgroundColor: lm?.theme.color ?? '#1F3A2C',
                    color: lm?.theme.textOn ?? '#ffffff',
                  }}
                >
                  {order}
                </span>
              );
            })}
          </div>
          <span className={styles.clusterHint}>Bấm để phóng to</span>
        </div>
      )}

      {coordinateToast && (
        <div className={styles.coordinateToast} role="status" aria-live="polite">
          {coordinateToast}
        </div>
      )}

      {/* Chế độ ?edit=1 (chỉ dev) */}
      {editState && (
        <aside
          ref={editRef}
          className={styles.editPanel}
          role="region"
          aria-label="Bảng chỉnh sửa tọa độ mốc"
        >
          <div className={styles.editHeader}>
            <span>Chỉnh sửa mốc (?edit=1)</span>
            <span className={styles.editBadge}>{editState.activeSlug}</span>
          </div>
          <div className={styles.editInfo}>
            {editState.activeSlug}: [{editState.lngLat[0]}, {editState.lngLat[1]}]
          </div>
          <div className={styles.editMeta}>
            Khoảng cách tới bờ biển: {editState.distanceToCoastMeters} m · Tỉnh: {editState.provinceName}
          </div>
          <div className={styles.editActions}>
            <button type="button" className={styles.editBtn} onClick={copyActiveCoordinate}>
              Copy mốc này
            </button>
            <button type="button" className={styles.editBtn} onClick={copyAllCoordinates}>
              Copy tất cả
            </button>
          </div>
        </aside>
      )}

      {/* Mobile Legend Chip (< 640px) */}
      <button
        type="button"
        className={styles.mobileLegendChip}
        onClick={() => setMobileDrawerOpen(true)}
        aria-label="Mở danh sách mốc"
      >
        <span>📍 Danh sách mốc ({sortedLandmarks.length})</span>
      </button>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <>
          <div
            className={styles.mobileDrawerBackdrop}
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />
          <aside className={styles.mobileDrawer} role="dialog" aria-label="Danh sách điểm mốc">
            <div className={styles.mobileDrawerHeader}>
              <h3>Danh sách điểm mốc ({sortedLandmarks.length})</h3>
              <button
                type="button"
                className={styles.mobileDrawerClose}
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Đóng"
              >
                ×
              </button>
            </div>
            <ul className={styles.landmarkList}>
              {sortedLandmarks.map((lm) => {
                const isSelected = lm.id === selectedId;
                const storyTitles = (lm.stories ?? [])
                  .map((s) => (typeof s === 'string' ? s : s.title))
                  .join(' · ');
                return (
                  <li
                    key={lm.id}
                    role="button"
                    tabIndex={0}
                    className={`${styles.landmarkListItem} ${isSelected ? styles.active : ''}`}
                    style={
                      {
                        '--c': lm.theme.color,
                        '--text-on': lm.theme.textOn,
                      } as CSSProperties
                    }
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      focusLandmark(lm.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setMobileDrawerOpen(false);
                        focusLandmark(lm.id);
                      }
                    }}
                  >
                    <span
                      className={styles.badge}
                      style={{
                        backgroundColor: lm.theme.color,
                        color: lm.theme.textOn,
                      }}
                    >
                      {lm.order}
                    </span>
                    <div className={styles.landmarkTextCol}>
                      <span className={styles.landmarkItemName}>{lm.title}</span>
                      {storyTitles && (
                        <span className={styles.landmarkStoriesSummary}>{storyTitles}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>
        </>
      )}

      {/* Chú thích & Danh sách mốc (Desktop & Tablet) */}
      <aside
        ref={legendRef}
        className={styles.legend}
        aria-label="Chú thích màu sắc và danh sách mốc"
      >
        <h3>Chú thích màu sắc</h3>
        <p>
          <i className={styles.swatch} style={{ background: MAP_COLORS.provinceWithLandmark }} />
          Tỉnh/thành có điểm mốc
        </p>
        <p>
          <i className={styles.swatch} style={{ background: MAP_COLORS.provinceWithoutLandmark }} />
          Tỉnh/thành không có điểm mốc
        </p>

        <h4>Danh sách mốc</h4>
        <ul className={styles.landmarkList}>
          {sortedLandmarks.map((lm) => {
            const isSelected = lm.id === selectedId;
            const storyTitles = (lm.stories ?? [])
              .map((s) => (typeof s === 'string' ? s : s.title))
              .join(' · ');

            return (
              <li
                key={lm.id}
                role="button"
                aria-pressed={isSelected}
                tabIndex={0}
                className={`${styles.landmarkListItem} ${isSelected ? styles.active : ''}`}
                style={
                  {
                    '--c': lm.theme.color,
                    '--text-on': lm.theme.textOn,
                  } as CSSProperties
                }
                onClick={() => focusLandmark(lm.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    focusLandmark(lm.id);
                  }
                }}
                title={`Mốc ${lm.order}: ${lm.title}`}
              >
                <span
                  className={styles.badge}
                  style={{
                    backgroundColor: lm.theme.color,
                    color: lm.theme.textOn,
                  }}
                >
                  {lm.order}
                </span>
                <div className={styles.landmarkTextCol}>
                  <span className={styles.landmarkItemName}>{lm.title}</span>
                  {storyTitles && (
                    <span className={styles.landmarkStoriesSummary}>{storyTitles}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Nhóm chọn kiểu bản đồ */}
      <div
        ref={basemapRef}
        className={styles.basemapControl}
        role="group"
        aria-label="Kiểu bản đồ"
      >
        {([
          ['map', 'Bản đồ'],
          ['satellite', 'Vệ tinh'],
          ['terrain', 'Địa hình'],
        ] as const).map(([mode, label]) => (
          <button
            key={mode}
            type="button"
            aria-pressed={basemapMode === mode}
            onClick={() => setBasemapMode(mode)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Điều khiển phóng to / thu nhỏ */}
      <div ref={controlsRef} className={styles.controls}>
        <button onClick={zoomIn} aria-label="Phóng to">
          +
        </button>
        <button onClick={zoomOut} aria-label="Thu nhỏ">
          −
        </button>
        <button onClick={resetView} aria-label="Về toàn cảnh">
          ◎
        </button>
      </div>

      {/* Nút Toàn cảnh Việt Nam */}
      <button ref={miniRef} className={styles.mini} onClick={resetView}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/vietnam.svg" alt="" />
        <span>Toàn cảnh Việt Nam</span>
      </button>
    </div>
  );
}

export default VietnamMap;
