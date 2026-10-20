'use client';

// src/features/map/components/LandmarkCallout.tsx
import { useEffect, useRef, useState, useCallback, type CSSProperties, type RefObject } from 'react';
import Link from 'next/link';
import type { Map as MapLibreMap } from 'maplibre-gl';
import type { Landmark } from '../types';
import { TERRAIN_LABELS } from '../config/mapConfig';
import styles from './LandmarkCallout.module.css';

type Direction = 'right' | 'left' | 'right-top' | 'left-top' | 'right-bottom' | 'left-bottom';

interface ObstacleBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface LandmarkCalloutProps {
  landmark: Landmark;
  map: MapLibreMap | null;
  containerRef: RefObject<HTMLDivElement | null>;
  isPinned: boolean;
  onClose: () => void;
  obstacleRefs?: Array<RefObject<HTMLElement | null>>;
  onCardMouseEnter?: () => void;
  onCardMouseLeave?: () => void;
}

const DIRECTIONS: Direction[] = ['right', 'left', 'right-top', 'left-top', 'right-bottom', 'left-bottom'];

export function LandmarkCallout({
  landmark,
  map,
  containerRef,
  isPinned,
  onClose,
  obstacleRefs = [],
  onCardMouseEnter,
  onCardMouseLeave,
}: LandmarkCalloutProps) {
  const [imageError, setImageError] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const circleAnchorRef = useRef<HTMLDivElement | null>(null);
  const cardAnchorRef = useRef<HTMLDivElement | null>(null);
  const cardElementRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 150);
  }, [onClose]);

  // Keyboard Esc handling
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  // Position calculation & direct DOM updates (0 React re-renders on map pan/zoom)
  const updateLayout = useCallback(() => {
    if (!map || !containerRef.current) return;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    if (containerRect.width <= 0 || containerRect.height <= 0) return;

    // Projected point on map container
    const pt = map.project([landmark.lngLat[0], landmark.lngLat[1]]);
    const cx = pt.x;
    const cy = pt.y;

    // Check circle diameter: 96px (>=1024), 80px (640-1023)
    const isTablet = containerRect.width < 1024;
    const circleRadius = isTablet ? 40 : 48;
    const cardWidth = isTablet ? 280 : 320;
    const estimatedCardHeight = cardElementRef.current?.offsetHeight || 280;
    const margin = 12;
    const gap = 56;

    // Get obstacle boxes relative to container
    const obstacles: ObstacleBox[] = [];
    for (const ref of obstacleRefs) {
      const el = ref.current;
      if (!el) continue;
      const r = el.getBoundingClientRect();
      obstacles.push({
        left: r.left - containerRect.left,
        top: r.top - containerRect.top,
        right: r.right - containerRect.left,
        bottom: r.bottom - containerRect.top,
      });
    }

    const testIntersection = (box: ObstacleBox, obs: ObstacleBox) => {
      return !(
        box.right <= obs.left ||
        box.left >= obs.right ||
        box.bottom <= obs.top ||
        box.top >= obs.bottom
      );
    };

    let chosenDir: Direction = 'right';
    let chosenCardLeft = 0;
    let chosenCardTop = 0;
    let foundValid = false;

    for (const dir of DIRECTIONS) {
      let cardLeft = 0;
      let cardTop = 0;

      switch (dir) {
        case 'right':
          cardLeft = cx + circleRadius + gap;
          cardTop = cy - estimatedCardHeight / 2;
          break;
        case 'left':
          cardLeft = cx - circleRadius - gap - cardWidth;
          cardTop = cy - estimatedCardHeight / 2;
          break;
        case 'right-top':
          cardLeft = cx + circleRadius + gap;
          cardTop = cy - estimatedCardHeight + 20;
          break;
        case 'left-top':
          cardLeft = cx - circleRadius - gap - cardWidth;
          cardTop = cy - estimatedCardHeight + 20;
          break;
        case 'right-bottom':
          cardLeft = cx + circleRadius + gap;
          cardTop = cy - 20;
          break;
        case 'left-bottom':
          cardLeft = cx - circleRadius - gap - cardWidth;
          cardTop = cy - 20;
          break;
      }

      const box: ObstacleBox = {
        left: cardLeft,
        top: cardTop,
        right: cardLeft + cardWidth,
        bottom: cardTop + estimatedCardHeight,
      };

      // Check within container
      const inside =
        box.left >= margin &&
        box.top >= margin &&
        box.right <= containerRect.width - margin &&
        box.bottom <= containerRect.height - margin;

      if (!inside) continue;

      // Check obstacle collisions
      const collides = obstacles.some((obs) => testIntersection(box, obs));
      if (!collides) {
        chosenDir = dir;
        chosenCardLeft = cardLeft;
        chosenCardTop = cardTop;
        foundValid = true;
        break;
      }
    }

    // Fallback: clamp inside container
    if (!foundValid) {
      chosenDir = cx < containerRect.width / 2 ? 'right' : 'left';
      if (chosenDir === 'right') {
        chosenCardLeft = Math.min(
          containerRect.width - cardWidth - margin,
          Math.max(margin, cx + circleRadius + 24)
        );
      } else {
        chosenCardLeft = Math.max(margin, Math.min(containerRect.width - cardWidth - margin, cx - circleRadius - 24 - cardWidth));
      }
      chosenCardTop = Math.max(margin, Math.min(containerRect.height - estimatedCardHeight - margin, cy - estimatedCardHeight / 2));
    }

    // Update Circle position
    if (circleAnchorRef.current) {
      circleAnchorRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    }

    // Update Card position
    if (cardAnchorRef.current) {
      cardAnchorRef.current.style.transform = `translate3d(${chosenCardLeft}px, ${chosenCardTop}px, 0)`;
    }

    // Update SVG Line (from circle edge to card edge)
    const isRightSide = chosenDir.includes('right') || chosenCardLeft >= cx;
    const startX = isRightSide ? cx + circleRadius : cx - circleRadius;
    const startY = cy;

    // Contact point on card
    const targetX = isRightSide ? chosenCardLeft : chosenCardLeft + cardWidth;
    const targetY = Math.max(
      chosenCardTop + 24,
      Math.min(chosenCardTop + estimatedCardHeight - 24, cy)
    );

    // Elbow: diagonal 24px, then horizontal to target
    const diagSignX = isRightSide ? 1 : -1;
    const diagDeltaY = Math.sign(targetY - startY) * Math.min(16, Math.abs(targetY - startY));
    const elbowX = startX + diagSignX * 18;
    const elbowY = startY + diagDeltaY;

    const pathD = `M ${startX} ${startY} L ${elbowX} ${elbowY} L ${targetX} ${targetY}`;

    if (pathRef.current) {
      pathRef.current.setAttribute('d', pathD);
      // Update animation variable for slide direction
      if (cardElementRef.current) {
        const slideX = isRightSide ? '-8px' : '8px';
        cardElementRef.current.style.setProperty('--card-slide-from', `translate(${slideX}, 0)`);
      }
    }

    if (dotRef.current) {
      dotRef.current.setAttribute('cx', String(targetX));
      dotRef.current.setAttribute('cy', String(targetY));
    }
  }, [map, landmark, containerRef, obstacleRefs]);

  // Request Animation Frame on map camera movement
  useEffect(() => {
    if (!map) return;

    const onMapMove = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(updateLayout);
    };

    map.on('move', onMapMove);
    map.on('zoom', onMapMove);
    map.on('resize', onMapMove);

    updateLayout();
    const t1 = setTimeout(updateLayout, 16);
    const t2 = setTimeout(updateLayout, 80);

    return () => {
      map.off('move', onMapMove);
      map.off('zoom', onMapMove);
      map.off('resize', onMapMove);
      clearTimeout(t1);
      clearTimeout(t2);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [map, updateLayout]);

  const themeStyle = {
    '--c': landmark.theme.color,
    '--text-on': landmark.theme.textOn,
  } as CSSProperties;

  return (
    <div className={styles.overlay} style={themeStyle} aria-live="polite">
      {/* SVG Connecting Line */}
      <svg className={styles.svgLayer} aria-hidden="true">
        <path ref={pathRef} className={styles.svgPath} pathLength={1} />
        <circle ref={dotRef} className={styles.svgDot} r={3} />
      </svg>

      {/* 1) VÒNG TRÒN ẢNH */}
      <div ref={circleAnchorRef} className={styles.circleAnchor}>
        <div
          className={styles.circleWrapper}
          onClick={isPinned ? undefined : () => map?.flyTo({ center: [landmark.lngLat[0], landmark.lngLat[1]], zoom: 16, essential: true })}
          onMouseEnter={onCardMouseEnter}
          onMouseLeave={onCardMouseLeave}
          title={`Mốc ${landmark.order}: ${landmark.title}`}
        >
          {landmark.image && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={landmark.image}
              alt={landmark.title}
              className={styles.circleImg}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={styles.circleGradientFallback}>
              <span>{landmark.order}</span>
            </div>
          )}
          <div className={styles.rotatingRing} aria-hidden="true" />
          <div className={styles.circleBadge} aria-hidden="true">
            {landmark.order}
          </div>
        </div>
      </div>

      {/* 2) THẺ THÔNG TIN */}
      <div ref={cardAnchorRef} className={styles.cardAnchor}>
        <article
          ref={cardElementRef}
          className={`${styles.card} ${isClosing ? styles.cardClosing : ''}`}
          role={isPinned ? 'dialog' : 'tooltip'}
          aria-labelledby={`callout-title-${landmark.id}`}
          onMouseEnter={onCardMouseEnter}
          onMouseLeave={onCardMouseLeave}
        >
          <div className={styles.cardHeader}>
            <span className={styles.terrainTag}>
              {TERRAIN_LABELS[landmark.terrain] ?? landmark.terrain}
            </span>
            {isPinned && (
              <button
                type="button"
                className={styles.closeBtn}
                onClick={handleClose}
                aria-label="Đóng thẻ thông tin"
              >
                ×
              </button>
            )}
          </div>

          <h3 id={`callout-title-${landmark.id}`} className={styles.cardTitle}>
            {landmark.title}
          </h3>
          <p className={styles.cardProvince}>{landmark.province}</p>
          <p className={styles.cardSummary}>{landmark.summary}</p>

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
        </article>
      </div>
    </div>
  );
}
export default LandmarkCallout;
