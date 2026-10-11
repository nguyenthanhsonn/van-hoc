"use client";

import React from "react";
import type { MapDestination } from "@/types/map";
import { X } from "lucide-react";
import styles from "./map.module.css";

interface DestinationDetailPanelProps {
  destination: MapDestination;
  onClose: () => void;
  isMobile: boolean;
}

export function DestinationDetailPanel({
  destination,
  onClose,
  isMobile,
}: DestinationDetailPanelProps) {
  const { order, name, subtitle, location, story, color } = destination;

  const panelClass = isMobile ? styles.panelSlideBottom : styles.panelSlideRight;

  return (
    <div
      className={panelClass}
      style={{
        position: "absolute",
        ...(isMobile
          ? { bottom: 0, left: 0, right: 0, zIndex: 40 }
          : { top: "50%", right: "1.5rem", transform: "translateY(-50%)", width: "22rem", zIndex: 40 }),
      }}
    >
      <div
        style={{
          background: "rgba(8, 10, 20, 0.92)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${color}55`,
          borderRadius: isMobile ? "1.5rem 1.5rem 0 0" : "1.5rem",
          padding: "1.5rem",
          color: "#fff",
          boxShadow: `0 0 40px ${color}30, 0 20px 60px rgba(0,0,0,0.6)`,
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Đóng chi tiết"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.375rem",
            cursor: "pointer",
            color: "#cbd5e1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={16} />
        </button>

        {/* Badge + name */}
        <div
          className={styles.panelItem}
          style={{ ["--item-delay" as string]: "0ms", display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1rem" }}
        >
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              background: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#fff",
              flexShrink: 0,
              boxShadow: `0 0 16px ${color}88`,
            }}
          >
            {order}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.3 }}>
              {name}
            </h2>
            {subtitle && (
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color, fontWeight: 500 }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Accent bar */}
        <div
          className={styles.panelItem}
          style={{
            ["--item-delay" as string]: "60ms",
            height: "2px",
            borderRadius: "2px",
            background: `linear-gradient(90deg, ${color}, transparent)`,
            marginBottom: "1rem",
          }}
        />

        {/* Location */}
        {location && (
          <p
            className={styles.panelItem}
            style={{
              ["--item-delay" as string]: "100ms",
              margin: "0 0 0.75rem",
              fontSize: "0.78rem",
              color: "#94a3b8",
            }}
          >
            <strong style={{ color: "#cbd5e1" }}>Vị trí:</strong> {location}
          </p>
        )}

        {/* Story */}
        <p
          className={styles.panelItem}
          style={{
            ["--item-delay" as string]: "160ms",
            margin: 0,
            fontSize: "0.8rem",
            lineHeight: 1.7,
            color: "#cbd5e1",
          }}
        >
          {story}
        </p>
      </div>
    </div>
  );
}
