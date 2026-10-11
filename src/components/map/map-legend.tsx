"use client";

import React from "react";
import type { MapDestination } from "@/types/map";

// SVG icons keyed by destination id
const ICONS: Record<string, React.ReactNode> = {
  "po-nagar": (
    // Temple / pagoda
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M12 2l2 4h-4l2-4z" fill="white" stroke="none"/>
      <rect x="9" y="6" width="6" height="3" fill="white" stroke="none"/>
      <path d="M7 9l1 3H6l6-1 6 1h-2l1-3" fill="white" stroke="none"/>
      <rect x="5" y="12" width="14" height="2" fill="white" stroke="none"/>
      <rect x="10" y="14" width="4" height="6" fill="white" stroke="none"/>
      <rect x="4" y="20" width="16" height="2" fill="white" stroke="none"/>
    </svg>
  ),
  "elder-house": (
    // House
    <svg viewBox="0 0 24 24" fill="white" width="100%" height="100%">
      <path d="M3 12L12 4l9 8v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-8z"/>
      <rect x="9" y="15" width="6" height="5" fill="rgba(0,0,0,0.25)" rx="1"/>
    </svg>
  ),
  "yang-patao": (
    // Mountain
    <svg viewBox="0 0 24 24" fill="white" width="100%" height="100%">
      <path d="M3 20l6-10 3 5 2-3 7 8H3z"/>
      <circle cx="17" cy="6" r="2" fill="white"/>
    </svg>
  ),
  "community-house": (
    // Traditional house / klaang
    <svg viewBox="0 0 24 24" fill="white" width="100%" height="100%">
      <path d="M2 20h20v-2H2v2z"/>
      <path d="M4 18V12l8-8 8 8v6H4z"/>
      <path d="M10 18v-5h4v5h-4z" fill="rgba(0,0,0,0.25)"/>
      <path d="M3 12l9-9 9 9" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
    </svg>
  ),
  "phan-ri-harbor": (
    // Wave / sea
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" width="100%" height="100%">
      <path d="M2 12c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0 3 3 4.5 0"/>
      <path d="M2 17c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0 3 3 4.5 0"/>
      <path d="M2 7c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0 3 3 4.5 0"/>
    </svg>
  ),
  "wedding-house": (
    // Ring / wedding
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="100%" height="100%">
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="3" fill="white" stroke="none" opacity="0.3"/>
      <path d="M9 6l-2-3h10l-2 3" stroke="white" strokeWidth="1.5"/>
    </svg>
  ),
  "festival-yard": (
    // Festival / drum & music
    <svg viewBox="0 0 24 24" fill="white" width="100%" height="100%">
      <path d="M8 3h8l2 4H6L8 3z"/>
      <rect x="5" y="7" width="14" height="8" rx="2"/>
      <rect x="10" y="15" width="4" height="4"/>
      <rect x="7" y="19" width="10" height="2" rx="1"/>
    </svg>
  ),
  "terraced-field": (
    // Farming / terraced field
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" width="100%" height="100%">
      <path d="M3 18h18"/>
      <path d="M5 14h14"/>
      <path d="M7 10h10"/>
      <path d="M9 6h6"/>
      <path d="M12 6v12" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
};

interface MapLegendProps {
  destinations: MapDestination[];
  hoveredId: string | null;
  activeId: string | null;
  isMobile?: boolean;
  onItemHover: (id: string | null) => void;
  onItemClick?: (id: string) => void;
}

export function MapLegend({
  destinations,
  hoveredId,
  activeId,
  isMobile = false,
  onItemHover,
  onItemClick,
}: MapLegendProps) {
  const [collapsedByUser, setCollapsedByUser] = React.useState<boolean | null>(null);
  const isCollapsed = collapsedByUser !== null ? collapsedByUser : isMobile;
  const setIsCollapsed = (val: boolean) => setCollapsedByUser(val);

  if (isCollapsed) {
    return (
      <div
        style={{
          position: "absolute",
          ...(isMobile
            ? { top: "1rem", right: "1rem", zIndex: 35 }
            : { bottom: "1.5rem", right: "1.5rem", zIndex: 30 }),
        }}
      >
        <button
          onClick={() => setIsCollapsed(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            background: "rgba(245, 222, 179, 0.92)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(180, 140, 80, 0.5)",
            borderRadius: "999px",
            padding: isMobile ? "0.45rem 0.85rem" : "0.4rem 0.75rem",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
            color: "#8B6914",
            fontWeight: 700,
            fontSize: isMobile ? "0.8rem" : "0.75rem",
            cursor: "pointer",
            touchAction: "manipulation",
          }}
        >
          <span>🧭 Chú giải</span>
          <span
            style={{
              fontSize: "0.65rem",
              background: "#8B6914",
              color: "#fff",
              borderRadius: "999px",
              padding: "0.1rem 0.4rem",
            }}
          >
            {destinations.length}
          </span>
        </button>
      </div>
    );
  }

  // Mobile expanded: centered modal with dark backdrop
  if (isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(6px)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
        onClick={() => setIsCollapsed(true)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "rgba(245, 222, 179, 0.96)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(180, 140, 80, 0.5)",
            borderRadius: "1.25rem",
            padding: "1.25rem",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            width: "100%",
            maxWidth: "340px",
            maxHeight: "80dvh",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#8B6914",
              }}
            >
              Chú giải ({destinations.length} điểm)
            </p>
            <button
              onClick={() => setIsCollapsed(true)}
              style={{
                background: "rgba(139, 105, 20, 0.15)",
                border: "none",
                borderRadius: "50%",
                width: "1.75rem",
                height: "1.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#8B6914",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "0.85rem",
              }}
            >
              ✕
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "0.5rem",
            }}
          >
            {destinations.map((dest) => {
              const isActive = hoveredId === dest.id || activeId === dest.id;
              return (
                <div
                  key={dest.id}
                  onClick={() => {
                    onItemClick?.(dest.id);
                    setIsCollapsed(true);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    background: isActive ? `${dest.color}25` : "rgba(255, 255, 255, 0.5)",
                    border: `1px solid ${isActive ? dest.color : "rgba(180, 140, 80, 0.25)"}`,
                    borderRadius: "0.6rem",
                    padding: "0.45rem 0.6rem",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      width: "1.8rem",
                      height: "1.8rem",
                      borderRadius: "50%",
                      background: dest.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.25rem",
                      flexShrink: 0,
                      boxShadow: `0 0 6px ${dest.color}88`,
                    }}
                  >
                    {ICONS[dest.id] ?? (
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#fff" }}>
                        {dest.order}
                      </span>
                    )}
                  </span>
                  <div>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#2C1810",
                        display: "block",
                        lineHeight: 1.2,
                      }}
                    >
                      {dest.order}. {dest.name}
                    </span>
                    {dest.subtitle && (
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#7A5028",
                          display: "block",
                          marginTop: "0.15rem",
                        }}
                      >
                        {dest.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Desktop expanded legend
  return (
    <div
      style={{
        position: "absolute",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 30,
        background: "rgba(245, 222, 179, 0.88)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(180, 140, 80, 0.45)",
        borderRadius: "1rem",
        padding: "0.75rem 0.875rem",
        boxShadow: "0 4px 24px rgba(120, 80, 20, 0.25)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 0 0.5rem 0",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#8B6914",
          }}
        >
          Chú giải ({destinations.length} điểm)
        </p>
        <button
          onClick={() => setIsCollapsed(true)}
          title="Thu gọn"
          style={{
            background: "transparent",
            border: "none",
            color: "#8B6914",
            cursor: "pointer",
            fontSize: "0.75rem",
            padding: "0 0.25rem",
            opacity: 0.75,
            fontWeight: 700,
          }}
        >
          ✕
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.3rem 0.75rem",
        }}
      >
        {destinations.map((dest) => {
          const isActive = hoveredId === dest.id || activeId === dest.id;
          return (
            <div
              key={dest.id}
              onMouseEnter={() => onItemHover(dest.id)}
              onMouseLeave={() => onItemHover(null)}
              onClick={() => onItemClick?.(dest.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                background: isActive ? `${dest.color}30` : "transparent",
                border: `1px solid ${isActive ? dest.color + "66" : "transparent"}`,
                borderRadius: "0.5rem",
                padding: "0.25rem 0.4rem",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 200ms, border-color 200ms",
                whiteSpace: "nowrap",
              }}
            >
              {/* Colored circle with icon */}
              <span
                style={{
                  width: "1.6rem",
                  height: "1.6rem",
                  borderRadius: "50%",
                  background: dest.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.25rem",
                  flexShrink: 0,
                  boxShadow: isActive ? `0 0 0 2px ${dest.color}66` : "none",
                  transition: "box-shadow 200ms",
                }}
              >
                {ICONS[dest.id] ?? (
                  <span style={{ fontSize: "0.55rem", fontWeight: 700, color: "#fff" }}>
                    {dest.order}
                  </span>
                )}
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 500,
                  color: isActive ? "#3d2b1f" : "#6b4f30",
                  lineHeight: 1.3,
                  transition: "color 200ms",
                }}
              >
                {dest.name}
                {dest.subtitle && (
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.6rem",
                      color: isActive ? dest.color : "#9a7a55",
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    {dest.subtitle}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
