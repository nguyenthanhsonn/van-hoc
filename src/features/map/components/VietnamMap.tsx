'use client';

// src/features/map/components/VietnamMap.tsx
import { useMemo } from 'react';
import Link from 'next/link';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  MAP_COLORS,
  TERRAIN_STYLE,
  TERRAIN_COLORS,
  type TerrainType,
} from '../config/mapConfig';
import { useVietnamMap } from '../hooks/useVietnamMap';
import type { Landmark } from '../types';
import styles from './VietnamMap.module.css';

export type MapLandmark = Landmark;

export function VietnamMap() {
  const {
    mapContainerRef,
    focusLandmark,
    selectedId,
    selectedLandmark,
    resetView,
    zoomIn,
    zoomOut,
    isLoading,
    errorMessage,
    landmarks,
  } = useVietnamMap();

  const sortedLandmarks = useMemo(
    () => [...landmarks].sort((a, b) => a.order - b.order),
    [landmarks]
  );

  const terrain = selectedLandmark ? TERRAIN_STYLE[selectedLandmark.terrain] : null;

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

      {/* Chú thích & Danh sách mốc */}
      <aside className={styles.legend} aria-label="Chú thích màu sắc và danh sách mốc">
        <h3>Chú thích màu sắc</h3>
        <p>
          <i className={styles.swatch} style={{ background: MAP_COLORS.provinceWithLandmark }} />
          Tỉnh/thành có điểm mốc
        </p>
        <p>
          <i className={styles.swatch} style={{ background: MAP_COLORS.provinceWithoutLandmark }} />
          Tỉnh/thành không có điểm mốc
        </p>

        <h4>Màu nền cửa sổ thông tin</h4>
        {(Object.keys(TERRAIN_STYLE) as TerrainType[]).map((k) => (
          <p key={k}>
            <i className={styles.dot} style={{ background: TERRAIN_STYLE[k].badge }} />
            {TERRAIN_STYLE[k].label}
          </p>
        ))}

        {/* Khối thứ 3: Danh sách mốc */}
        <h4>Danh sách mốc</h4>
        <ul className={styles.landmarkList}>
          {sortedLandmarks.map((lm) => {
            const isSelected = lm.id === selectedId;
            const badgeColor = lm.color ?? TERRAIN_COLORS[lm.terrain];
            return (
              <li
                key={lm.id}
                role="button"
                tabIndex={0}
                className={`${styles.landmarkListItem} ${isSelected ? styles.active : ''}`}
                onClick={() => focusLandmark(isSelected ? null : lm.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    focusLandmark(isSelected ? null : lm.id);
                  }
                }}
                title={`Mốc ${lm.order}: ${lm.title}`}
              >
                <span className={styles.badge} style={{ backgroundColor: badgeColor }}>
                  {lm.order}
                </span>
                <span className={styles.landmarkItemName}>{lm.title}</span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Cửa sổ thông tin */}
      {selectedLandmark && terrain && (
        <article
          className={styles.card}
          style={{ background: terrain.background, borderColor: terrain.border }}
          aria-live="polite"
        >
          <button
            className={styles.close}
            onClick={() => focusLandmark(null)}
            aria-label="Đóng"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.cardImg}
            src={selectedLandmark.image}
            alt={selectedLandmark.title}
          />
          <div className={styles.cardBody}>
            <span className={styles.badge} style={{ background: terrain.badge }}>
              {terrain.label}
            </span>
            <h2>{selectedLandmark.title}</h2>
            <p className={styles.cardProvince}>{selectedLandmark.province}</p>
            <p>{selectedLandmark.summary}</p>
            <Link
              href={`/landmarks/${selectedLandmark.id}`}
              className={styles.cta}
              style={{ background: terrain.border }}
            >
              Xem câu chuyện
            </Link>
          </div>
        </article>
      )}

      {/* Điều khiển */}
      <div className={styles.controls}>
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

      <button className={styles.mini} onClick={resetView}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/vietnam.svg" alt="" />
        <span>Toàn cảnh Việt Nam</span>
      </button>
    </div>
  );
}

export default VietnamMap;
