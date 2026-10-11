"use client";

import React from "react";
import type { MapDestination } from "@/types/map";
import styles from "./map.module.css";

interface DestinationHotspotProps {
  destination: MapDestination;
  isHovered: boolean;
  isActive: boolean;
  isDebug?: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onTouchEnd: () => void;
}

export function DestinationHotspot({
  destination,
  isHovered,
  isActive,
  isDebug = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
  onTouchEnd,
}: DestinationHotspotProps) {
  const { name, color, circle, polygon } = destination;
  const isHighlighted = isHovered || isActive;

  const cx = circle.cx;
  const cy = circle.cy;
  const r  = circle.r ?? 100;

  return (
    <g>
      {/* Debug polygon outline */}
      {isDebug && polygon && (
        <polygon
          points={polygon}
          fill={`${color}22`}
          stroke={color}
          strokeWidth="2"
          strokeDasharray="6 4"
        />
      )}

      {/* Clipped image pop – chỉ hiện khi hover */}
      {isHighlighted && (
        <g style={{ pointerEvents: "none" }}>
          <defs>
            <clipPath id={`clip-${destination.id}`}>
              {circle.r !== undefined ? (
                <circle cx={cx} cy={cy} r={r} />
              ) : (
                <ellipse cx={cx} cy={cy} rx={circle.rx ?? 100} ry={circle.ry ?? 100} />
              )}
            </clipPath>
          </defs>

          {/* Ảnh được clip */}
          <image
            href="/images/coastal-map-ai-hd.jpg"
            x={0} y={0}
            width={2752} height={1536}
            clipPath={`url(#clip-${destination.id})`}
            preserveAspectRatio="xMidYMid meet"
            style={{ filter: "brightness(1.1) saturate(1.2)" }}
          />

          {/* Viền vòng tròn nét đứt */}
          {circle.r !== undefined ? (
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeDasharray="18 10"
              className={styles.marchingStroke}
            />
          ) : (
            <ellipse
              cx={cx} cy={cy}
              rx={circle.rx ?? 100}
              ry={circle.ry ?? 100}
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeDasharray="18 10"
              className={styles.marchingStroke}
            />
          )}

          {/* Vòng hào quang ngoài */}
          {circle.r !== undefined ? (
            <circle
              cx={cx} cy={cy} r={r + 6}
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity="0.4"
            />
          ) : (
            <ellipse
              cx={cx} cy={cy}
              rx={(circle.rx ?? 100) + 6}
              ry={(circle.ry ?? 100) + 6}
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity="0.4"
            />
          )}
        </g>
      )}

      {/* Hit area đã chuyển về DestinationLabel */}
    </g>
  );
}
