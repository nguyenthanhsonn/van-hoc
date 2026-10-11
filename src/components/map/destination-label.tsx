"use client";

import React from "react";
import type { MapDestination } from "@/types/map";
import styles from "./map.module.css";

interface DestinationLabelProps {
  destination: MapDestination;
  isHovered: boolean;
  isActive: boolean;
  isAnyHovered?: boolean;
  staggerIndex: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

// Kích thước thẻ – viewBox 2752×1536, hiển thị ~1100px → scale ≈ 0.4
// CARD_W=420vb → ~168px thực; font 20px vb → ~8px thực
const CARD_W   = 420;
const CARD_H   = 170;
const BADGE_R  = 20;
const BRANCH_H = 60; // đoạn ngang từ viền vòng tròn tới chân thẻ

export function DestinationLabel({
  destination,
  isHovered,
  isActive,
  isAnyHovered = false,
  staggerIndex,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: DestinationLabelProps) {
  const {
    order, name, subtitle, location, story,
    color, anchor, circle, side = 1,
  } = destination;
  const isHighlighted = isHovered || isActive;

  // ── Tọa độ local (gốc = anchor) ────────────────────────────────────────────
  const circX = circle.cx - anchor.x;
  const circY = circle.cy - anchor.y;
  const circR = circle.r ?? 100;

  // Điểm bắt đầu nhánh: mép viền vòng tròn theo chiều side
  const brX = circX + side * circR;
  const brY = circY;

  // Điểm góc chữ L (elbow)
  const elX = brX + side * BRANCH_H;
  const elY = brY;

  // Vị trí thẻ: nếu anchor gần đỉnh ảnh → mở xuống, ngược lại mở lên
  const goDown = anchor.y < 300;
  const cardY  = goDown ? elY + 16 : elY - CARD_H - 16;
  const cardX  = side === 1 ? elX : elX - CARD_W;

  // Điểm kết nối nhánh dọc với thẻ
  const neckY = goDown ? cardY : cardY + CARD_H;

  // Path nhánh L: viền circle → elbow → cạnh thẻ
  const branchPath = `M ${brX} ${brY} L ${elX} ${elY} L ${elX} ${neckY}`;

  // ── Opacity badge (ẩn khi highlight) ──────────────────────────────────────
  const badgeOpacity = isHighlighted ? 0 : isAnyHovered ? 0.4 : 1;

  return (
    <g
      transform={`translate(${anchor.x}, ${anchor.y})`}
      style={{
        ["--label-delay" as string]: `${staggerIndex * 90}ms`,
        ["--pulse-delay" as string]: `${staggerIndex * 340}ms`,
      }}
      className={styles.labelIntro}
    >
      {/* ── Badge số (ẩn khi hover) ──────────────────────────────────────── */}
      <g
        style={{
          opacity: badgeOpacity,
          transition: "opacity 280ms ease",
          pointerEvents: "none",
        }}
      >
        {!isHighlighted && (
          <circle
            cx={circX} cy={circY} r={BADGE_R + 4}
            fill="none" stroke={color} strokeWidth="2" opacity="0.55"
            className={styles.pulseRing}
          />
        )}
        <circle cx={circX} cy={circY} r={BADGE_R} fill={color} stroke="#fff" strokeWidth="2" />
        <text
          x={circX} y={circY + 5.5} textAnchor="middle" dominantBaseline="middle" fill="#fff"
          fontSize="14" fontWeight="800"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          {order}
        </text>
      </g>

      {/* Hit area:
          - Khi chưa highlight: chỉ bắt hover tại số (r = BADGE_R + 6) -> hover vô số mới hiện!
          - Khi đã highlight: mở rộng ra toàn bộ vòng tròn (r = circR) -> đưa chuột ra ngoài là mất!
      */}
      <circle
        cx={circX}
        cy={circY}
        r={isHighlighted ? circR : BADGE_R + 6}
        fill="transparent"
        style={{ pointerEvents: "all", cursor: "pointer" }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      />

      {/* ── Nhánh chữ L – line drawing animation qua strokeDashoffset ──────── */}
      {/*
        Dùng pathLength="1" + strokeDasharray="1" → normalize path.
        Transition strokeDashoffset: 1→0 khi hover (vẽ ra từ từ).
      */}
      <path
        d={branchPath}
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        style={{
          strokeDasharray: "1",
          strokeDashoffset: isHighlighted ? 0 : 1,
          transition: isHighlighted
            ? "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1)"
            : "none",
          filter: `drop-shadow(0 0 5px ${color}99)`,
          pointerEvents: "none",
        }}
      />

      {/* Chấm tròn tại điểm bắt đầu nhánh */}
      <circle
        cx={brX} cy={brY} r={5.5}
        fill={color} stroke="#fff" strokeWidth="1.8"
        style={{
          opacity: isHighlighted ? 1 : 0,
          transition: isHighlighted ? "opacity 200ms ease 0.3s" : "opacity 100ms ease",
          pointerEvents: "none",
        }}
      />

      {/* ── Thẻ thông tin ─────────────────────────────────────────────────── */}
      <g
        style={{
          opacity: isHighlighted ? 1 : 0,
          transition: isHighlighted
            ? "opacity 280ms ease 0.4s"   // xuất hiện SAU khi nhánh gần xong
            : "opacity 120ms ease",
          pointerEvents: "none",
        }}
        aria-hidden={!isHighlighted}
      >
        {/* Nền thẻ – solid, không trong suốt */}
        <rect
          x={cardX} y={cardY}
          width={CARD_W} height={CARD_H}
          rx={14} ry={14}
          fill="#fffdf5"
          fillOpacity={1}
          stroke={color}
          strokeWidth="2.5"
          style={{ filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.45))" }}
        />

        {/* Nội dung HTML qua foreignObject */}
        <foreignObject
          x={cardX + 14}
          y={cardY + 12}
          width={CARD_W - 28}
          height={CARD_H - 24}
          style={{ overflow: "hidden" }}
        >
          {/* @ts-ignore */}
          <div
            style={{
              fontFamily: "var(--font-geist-sans), 'Segoe UI', system-ui, sans-serif",
              width: `${CARD_W - 28}px`,
              height: `${CARD_H - 24}px`,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {/* Tiêu đề */}
            <div style={{ lineHeight: 1.25, flexShrink: 0 }}>
              <span style={{ fontSize: "20px", fontWeight: 700, color }}>
                {name}
              </span>
              {subtitle && (
                <span style={{ fontSize: "18px", fontWeight: 400, color: "#5a3e28" }}>
                  {" "}– {subtitle}
                </span>
              )}
            </div>

            {/* Vị trí */}
            <div style={{ fontSize: "15px", color: "#7a5c3a", lineHeight: 1.4, flexShrink: 0 }}>
              <span style={{ fontWeight: 700 }}>Vị trí:</span> {location}
            </div>

            {/* Câu chuyện */}
            <div
              style={{
                fontSize: "15px",
                color: "#5a3e28",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                flex: 1,
              }}
            >
              {story}
            </div>
          </div>
        </foreignObject>
      </g>
    </g>
  );
}
