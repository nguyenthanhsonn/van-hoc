'use client';

// src/features/map/components/LandmarkCallout.tsx
import { useEffect, useLayoutEffect, useRef, useState, useCallback, type CSSProperties, type RefObject } from 'react';
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

  const cardAnchorRef = useRef<HTMLDivElement | null>(null);
  const cardElementRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const hoverBridgeRef = useRef<SVGPathElement | null>(null);
  const rimDotRef = useRef<SVGCircleElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);

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

  const lockedDirRef = useRef<Direction | null>(null);

  useLayoutEffect(() => {
    lockedDirRef.current = null;
  }, [landmark.id]);

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

    const isTablet = containerRect.width < 1024;
    const cardWidth = isTablet ? 280 : 320;
    const estimatedCardHeight = cardElementRef.current?.offsetHeight || 320;
    const margin = 12;
    const gap = 64;

    // Calculate actual pixel radius of the landmark area circle on screen
    const meters = landmark.area?.radiusMeters ?? 250;
    const dLat = meters / 111320;
    const ptEdge = map.project([landmark.lngLat[0], landmark.lngLat[1] + dLat]);
    const areaRadiusPx = Math.hypot(cx - ptEdge.x, cy - ptEdge.y);
    const circleRadius = map.getZoom() >= 9 && areaRadiusPx > 15 ? Math.round(areaRadiusPx) : (isTablet ? 32 : 40);

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

    let chosenDir: Direction = lockedDirRef.current || 'right';
    let chosenCardLeft = 0;
    let chosenCardTop = 0;
    let foundValid = false;

    const candidateDirs = lockedDirRef.current
      ? [lockedDirRef.current, ...DIRECTIONS.filter((d) => d !== lockedDirRef.current)]
      : DIRECTIONS;

    for (const dir of candidateDirs) {
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
          cardTop = cy - estimatedCardHeight + 30;
          break;
        case 'left-top':
          cardLeft = cx - circleRadius - gap - cardWidth;
          cardTop = cy - estimatedCardHeight + 30;
          break;
        case 'right-bottom':
          cardLeft = cx + circleRadius + gap;
          cardTop = cy - 30;
          break;
        case 'left-bottom':
          cardLeft = cx - circleRadius - gap - cardWidth;
          cardTop = cy - 30;
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
        lockedDirRef.current = dir;
        chosenCardLeft = cardLeft;
        chosenCardTop = cardTop;
        foundValid = true;
        break;
      }
    }

    // Fallback: clamp inside container
    if (!foundValid) {
      chosenDir = lockedDirRef.current || (cx < containerRect.width / 2 ? 'right' : 'left');
      if (chosenDir.includes('right')) {
        chosenCardLeft = Math.min(
          containerRect.width - cardWidth - margin,
          Math.max(margin, cx + circleRadius + gap)
        );
      } else {
        chosenCardLeft = Math.max(margin, Math.min(containerRect.width - cardWidth - margin, cx - circleRadius - gap - cardWidth));
      }
      chosenCardTop = Math.max(margin, Math.min(containerRect.height - estimatedCardHeight - margin, cy - estimatedCardHeight / 2));
    }

    // Update Card position
    if (cardAnchorRef.current) {
      cardAnchorRef.current.style.transform = `translate3d(${chosenCardLeft}px, ${chosenCardTop}px, 0)`;
    }

    // Update SVG Line (from circle rim to card edge)
    const isRightSide = chosenCardLeft >= cx;
    const startX = isRightSide ? cx + circleRadius : cx - circleRadius;
    const startY = cy;

    // Contact point on card
    const targetX = isRightSide ? chosenCardLeft : chosenCardLeft + cardWidth;
    const targetY = Math.max(
      chosenCardTop + 24,
      Math.min(chosenCardTop + estimatedCardHeight - 24, cy)
    );

    // Elbow: diagonal 20px, then horizontal to target
    const diagSignX = isRightSide ? 1 : -1;
    const diagDeltaY = Math.sign(targetY - startY) * Math.min(20, Math.abs(targetY - startY));
    // Keep the elbow inside short, clamped branches instead of doubling back.
    const elbowX = startX + diagSignX * Math.min(20, Math.abs(targetX - startX) / 2);
    const elbowY = startY + diagDeltaY;

    const pathD = `M ${startX} ${startY} L ${elbowX} ${elbowY} L ${targetX} ${targetY}`;

    if (pathRef.current) {
      pathRef.current.setAttribute('d', pathD);
      if (hoverBridgeRef.current) {
        hoverBridgeRef.current.setAttribute('d', pathD);
      }
      // Update animation variable for slide direction
      if (cardElementRef.current) {
        const slideX = isRightSide ? '-8px' : '8px';
        cardElementRef.current.style.setProperty('--card-slide-from', `translate(${slideX}, 0)`);
      }
    }

    if (rimDotRef.current) {
      rimDotRef.current.setAttribute('cx', String(startX));
      rimDotRef.current.setAttribute('cy', String(startY));
    }

    if (dotRef.current) {
      dotRef.current.setAttribute('cx', String(targetX));
      dotRef.current.setAttribute('cy', String(targetY));
    }
  }, [map, landmark, containerRef, obstacleRefs]);

  // Synchronous position update on map camera movement (no RAF lag while dragging)
  useLayoutEffect(() => {
    if (!map) return;

    const onMapMove = () => {
      updateLayout();
    };

    map.on('move', onMapMove);
    map.on('zoom', onMapMove);
    map.on('resize', onMapMove);

    // Measure before the first paint so the branch grows from its final position.
    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    if (cardElementRef.current) observer.observe(cardElementRef.current);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      map.off('move', onMapMove);
      map.off('zoom', onMapMove);
      map.off('resize', onMapMove);
      observer.disconnect();
    };
  }, [map, updateLayout, containerRef]);

  const themeStyle = {
    '--c': landmark.theme.color,
    '--text-on': landmark.theme.textOn,
  } as CSSProperties;

  return (
    <div className={styles.overlay} style={themeStyle} aria-live="polite">
      {/* SVG Connecting Line branching from the rim of the circle */}
      <svg className={styles.svgLayer} aria-hidden="true">
        <path ref={pathRef} className={styles.svgPath} pathLength={1} />
        {/* Invisible wider stroke acting as mouse hover bridge between pin and card */}
        <path
          ref={hoverBridgeRef}
          d=""
          fill="none"
          stroke="transparent"
          strokeWidth={36}
          style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
          onMouseEnter={onCardMouseEnter}
          onMouseLeave={onCardMouseLeave}
        />
        <circle
          ref={rimDotRef}
          className={styles.svgRimDot}
          r={6}
          style={{ pointerEvents: 'all', cursor: 'pointer' }}
          onMouseEnter={onCardMouseEnter}
          onMouseLeave={onCardMouseLeave}
        />
        <circle ref={dotRef} className={styles.svgDot} r={3.5} />
      </svg>

      {/* THẺ THÔNG TIN CÂU CHUYỆN */}
      <div ref={cardAnchorRef} className={styles.cardAnchor}>
        <article
          ref={cardElementRef}
          className={`${styles.card} ${isClosing ? styles.cardClosing : ''}`}
          role={isPinned ? 'dialog' : 'tooltip'}
          aria-labelledby={`callout-title-${landmark.id}`}
          onMouseEnter={onCardMouseEnter}
          onMouseLeave={onCardMouseLeave}
        >
          {landmark.image && !imageError && (
            <div className={styles.cardImageCover}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={landmark.image}
                alt={landmark.title}
                className={styles.cardCoverImg}
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
              />
            </div>
          )}

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
