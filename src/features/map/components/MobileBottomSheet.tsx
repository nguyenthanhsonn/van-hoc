'use client';

// src/features/map/components/MobileBottomSheet.tsx
import { useState, useRef, type CSSProperties, type TouchEvent } from 'react';
import Link from 'next/link';
import type { Landmark } from '../types';
import { TERRAIN_LABELS } from '../config/mapConfig';
import styles from './MobileBottomSheet.module.css';

interface MobileBottomSheetProps {
  landmark: Landmark;
  onClose: () => void;
}

export function MobileBottomSheet({ landmark, onClose }: MobileBottomSheetProps) {
  const [imageError, setImageError] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const startYRef = useRef<number>(0);
  const currentTranslateYRef = useRef<number>(0);

  const onTouchStart = (e: TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const onTouchMove = (e: TouchEvent) => {
    const deltaY = e.touches[0].clientY - startYRef.current;
    if (deltaY > 0 && sheetRef.current) {
      currentTranslateYRef.current = deltaY;
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const onTouchEnd = () => {
    if (currentTranslateYRef.current > 75) {
      onClose();
    } else if (sheetRef.current) {
      sheetRef.current.style.transform = '';
    }
    currentTranslateYRef.current = 0;
  };

  const themeStyle = {
    '--c': landmark.theme.color,
    '--text-on': landmark.theme.textOn,
  } as CSSProperties;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div
        ref={sheetRef}
        className={styles.sheet}
        style={themeStyle}
        role="dialog"
        aria-labelledby={`mobile-sheet-title-${landmark.id}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.dragHandleArea}>
          <div className={styles.dragPill} />
        </div>

        <div className={styles.imageWrapper}>
          {landmark.image && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={landmark.image}
              alt={landmark.title}
              className={styles.headerImg}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={styles.headerGradientFallback}>
              <span>{landmark.order}</span>
            </div>
          )}
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Đóng"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.tagRow}>
            <span className={styles.orderBadge}>{landmark.order}</span>
            <span className={styles.terrainTag}>
              {TERRAIN_LABELS[landmark.terrain] ?? landmark.terrain}
            </span>
          </div>

          <h3 id={`mobile-sheet-title-${landmark.id}`} className={styles.title}>
            {landmark.title}
          </h3>
          <p className={styles.province}>{landmark.province}</p>
          <p className={styles.summary}>{landmark.summary}</p>

          {landmark.stories && landmark.stories.length > 0 && (
            <div className={styles.storiesBlock}>
              <span className={styles.storiesLabel}>Câu chuyện gắn với mốc:</span>
              <ul className={styles.storiesList}>
                {landmark.stories.map((story) => {
                  const sId = typeof story === 'string' ? story : story.id;
                  const sTitle = typeof story === 'string' ? story : story.title;
                  return (
                    <li key={sId}>
                      <Link href={`/landmarks/${landmark.id}?truyen=${sId}`} className={styles.storyLink}>
                        {sTitle}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <Link href={`/landmarks/${landmark.id}`} className={styles.ctaBtn}>
            Xem câu chuyện
          </Link>
        </div>
      </div>
    </>
  );
}

export default MobileBottomSheet;
