"use client";

import React, { useEffect, useRef, useState } from "react";
import { mapDestinations } from "@/data/map-destinations";
import { useDestinationHover } from "@/hooks/use-destination-hover";
import { DestinationHotspot } from "./destination-hotspot";
import { DestinationLabel } from "./destination-label";
import { DestinationDetailPanel } from "./destination-detail-panel";
import { MapLegend } from "./map-legend";
import styles from "./map.module.css";

function getIsMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 639px)").matches;
}

// ─── Actual pixel dimensions of public/images/coastal-map-ai-hd.jpg ─────────
// Verified via: sips → 2752×1536
const VIEW_W = 2752;
const VIEW_H = 1536;

interface InteractiveDestinationMapProps {
  /** Show debug polygon outlines + Shift+click coordinate logger */
  debug?: boolean;
}

export function InteractiveDestinationMap({
  debug = false,
}: InteractiveDestinationMapProps) {
  const {
    hoveredId,
    activeId,
    setHovered,
    setActive,
    handleKeyDown,
    handleTouchStart,
  } = useDestinationHover();
  const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Subscribe to viewport resize only (no setState on initial mount)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Shift+click anywhere on SVG → print viewBox coordinates
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!debug || !e.shiftKey) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = VIEW_W / rect.width;
    const scaleY = VIEW_H / rect.height;
    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);
    alert(`ViewBox toạ độ: ${x},${y}  (hệ ${VIEW_W}×${VIEW_H})`);
  };

  const hasHighlight = hoveredId !== null || activeId !== null;
  const activeDestination = activeId
    ? (mapDestinations.find((d) => d.id === activeId) ?? null)
    : null;

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", width: "100%", background: "#050810" }}
    >
      {/* ── SVG map canvas ─────────────────────────────────────────────── */}
      <div
        className={styles.mapIntroWrapper}
        style={{ width: "100%", lineHeight: 0 }}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: "auto", display: "block" }}
          aria-label="Bản đồ tương tác làng ven biển Phan Rí"
          role="img"
          onClick={handleSvgClick}
        >
          {/* ── defs: clipPaths only (no image in defs) ──────────────── */}
          <defs>
            {/* Single re-usable image symbol */}
            <image
              id="base"
              href="/images/coastal-map-ai-hd.jpg"
              style={{ imageRendering: "auto" }}
              width={VIEW_W}
              height={VIEW_H}
              preserveAspectRatio="xMidYMid meet"
            />
          </defs>

          {/* 1. Background image – rendered directly in SVG, not via <img> */}
          <use href="#base" x={0} y={0} width={VIEW_W} height={VIEW_H} />

          {/* 2. Darkening overlay – tăng độ tương phản khi hover địa danh */}
          <rect
            x={0}
            y={0}
            width={VIEW_W}
            height={VIEW_H}
            fill="#020617"
            style={{
              opacity: hasHighlight ? 0.65 : 0,
              transition: hasHighlight ? "opacity 350ms ease-out" : "none",
              pointerEvents: "none",
            }}
          />

          {/* 3. Hotspot pop layers (clipped image + borders per destination) */}
          {mapDestinations.map((dest) => (
            <DestinationHotspot
              key={dest.id}
              destination={dest}
              isHovered={hoveredId === dest.id || activeId === dest.id}
              isActive={activeId === dest.id}
              isDebug={debug}
              onMouseEnter={() => setHovered(dest.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActive(dest.id)}
              onKeyDown={(e) => handleKeyDown(e, dest.id)}
              onTouchEnd={() => handleTouchStart(dest.id)}
            />
          ))}

          {/* 4. Labels + info cards per destination */}
          {mapDestinations.map((dest, i) => (
            <DestinationLabel
              key={dest.id}
              destination={dest}
              isHovered={hoveredId === dest.id}
              isActive={activeId === dest.id}
              isAnyHovered={hoveredId !== null || activeId !== null}
              staggerIndex={i}
              onMouseEnter={() => setHovered(dest.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActive(dest.id)}
            />
          ))}
        </svg>
      </div>

      {/* ── Legend (chú giải góc trái) ─────────────────────────────── */}
      <MapLegend
        destinations={mapDestinations}
        hoveredId={hoveredId}
        activeId={activeId}
        onItemHover={setHovered}
      />

      {/* ── Detail panel ──────────────────────────────────────────────── */}
      {activeDestination && (
        <DestinationDetailPanel
          destination={activeDestination}
          onClose={() => setActive(null)}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}
