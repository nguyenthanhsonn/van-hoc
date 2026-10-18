"use client";

import React from "react";
import Link from "next/link";
import { useVietnamMap } from "../hooks/useVietnamMap";
import type { Landmark } from "../types";
import {
  Plus,
  Minus,
  RotateCcw,
  ShieldCheck,
  X,
  MapPin,
  ArrowRight,
  Mountain,
  Landmark as LandmarkIcon,
  Wheat,
  Waves,
  Navigation,
} from "lucide-react";
import styles from "./VietnamMap.module.css";

/**
 * Returns matching icon for landmark category
 */
function getLandmarkCategoryIcon(type: Landmark["iconType"]) {
  switch (type) {
    case "mountain":
      return <Mountain size={20} color="#ffffff" />;
    case "field":
      return <Wheat size={20} color="#ffffff" />;
    case "harbor":
      return <Waves size={20} color="#ffffff" />;
    case "temple":
    default:
      return <LandmarkIcon size={20} color="#ffffff" />;
  }
}

/**
 * Production-ready Vietnam 2D Interactive Map Component.
 * Powered by MapLibre GL JS on Next.js 16, rendering local GeoJSON without third-party tiles,
 * complete with interactive literary/historical milestones displayed on the right side.
 */
export function VietnamMap(): React.JSX.Element {
  const {
    mapContainerRef,
    isLoading,
    errorMessage,
    hoveredProvince,
    selectedProvince,
    landmarks,
    selectedLandmark,
    zoomIn,
    zoomOut,
    resetToVietnamView,
    flyToLandmark,
    clearSelectedProvince,
    clearSelectedLandmark,
  } = useVietnamMap();

  const [activeSubWorkId, setActiveSubWorkId] = React.useState<string | null>(null);
  const activeProvince = selectedProvince ?? hoveredProvince;

  const currentSubWork =
    selectedLandmark?.subWorks?.find((sw) => sw.id === activeSubWorkId) ??
    selectedLandmark?.subWorks?.[0];

  const displayWorkName = currentSubWork?.title ?? selectedLandmark?.workName;
  const displayDescription = currentSubWork?.shortDescription ?? selectedLandmark?.shortDescription;

  return (
    <div className={styles.container}>
      {/* ── MapLibre GL Canvas Container ── */}
      <div ref={mapContainerRef} className={styles.map} />

      {/* ── Top Header Badge (Sovereignty & Metadata) ── */}
      <header className={`${styles.glassPanel} ${styles.headerBadge}`}>
        <div className={styles.flagIcon} aria-hidden="true">
          🇻🇳
        </div>
        <div className={styles.headerText}>
          <h1 className={styles.headerTitle}>
            Bản Đồ Việt Nam 2D
            <span className={styles.headerTag}>34 Tỉnh/Thành</span>
          </h1>
          <p className={styles.headerSubtitle}>
            Bao gồm Quần đảo Hoàng Sa (Đà Nẵng) & Trường Sa (Khánh Hòa)
          </p>
        </div>
      </header>

      {/* ── Quick Landmarks Navigation Bar ── */}
      <nav className={`${styles.glassPanel} ${styles.landmarksBar}`} aria-label="Các mốc địa danh">
        <div className={styles.landmarksBarHeader}>
          <MapPin size={14} className={styles.landmarksBarIcon} />
          <span className={styles.landmarksBarTitle}>Mốc địa danh</span>
        </div>
        <div className={styles.landmarksList}>
          {landmarks.map((lm) => {
            const isSelected = selectedLandmark?.id === lm.id;
            return (
              <button
                key={lm.id}
                type="button"
                onClick={() => flyToLandmark(lm)}
                className={`${styles.landmarkBtn} ${isSelected ? styles.landmarkBtnActive : ""}`}
                title={`Mốc ${lm.order}: ${lm.name} (${lm.province})`}
              >
                <span
                  className={styles.landmarkBtnBadge}
                  style={{ backgroundColor: lm.color }}
                >
                  {lm.order}
                </span>
                <span className={styles.landmarkBtnText}>{lm.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Floating Controls Toolbar ── */}
      <aside className={styles.controls} aria-label="Điều khiển bản đồ">
        {/* Reset to Fullscreen Vietnam View */}
        <button
          type="button"
          onClick={resetToVietnamView}
          className={`${styles.glassPanel} ${styles.resetBtn}`}
          title="Về toàn cảnh Việt Nam"
          aria-label="Về toàn cảnh Việt Nam"
        >
          <RotateCcw size={15} />
          <span>Toàn cảnh</span>
        </button>

        {/* Zoom In (+) */}
        <button
          type="button"
          onClick={zoomIn}
          className={`${styles.glassPanel} ${styles.controlBtn}`}
          title="Phóng to"
          aria-label="Phóng to"
        >
          <Plus size={18} />
        </button>

        {/* Zoom Out (-) */}
        <button
          type="button"
          onClick={zoomOut}
          className={`${styles.glassPanel} ${styles.controlBtn}`}
          title="Thu nhỏ"
          aria-label="Thu nhỏ"
        >
          <Minus size={18} />
        </button>
      </aside>

      {/* ── Right-Side Landmark Card (Requested Design) ── */}
      {selectedLandmark && (
        <aside
          className={styles.landmarkRightCard}
          aria-label={`Thông tin ${selectedLandmark.name}`}
        >
          {/* Top Hero Landscape Photo */}
          <div className={styles.cardImageContainer}>
            <img
              src={selectedLandmark.imageUrl}
              alt={selectedLandmark.name}
              className={styles.cardImage}
            />
          </div>

          {/* Header Row: Circle Avatar + Title + Subtitle + Close 'X' */}
          <div className={styles.cardHeaderRow}>
            <div className={styles.cardAvatar}>
              {getLandmarkCategoryIcon(selectedLandmark.iconType)}
            </div>
            <div className={styles.cardTitleBlock}>
              <h2 className={styles.cardTitle}>{selectedLandmark.name}</h2>
              {displayWorkName ? (
                <p className={styles.cardSubtitle}>
                  <span className={styles.cardWorkLabel}>Tác phẩm: </span>
                  <span className={styles.cardWorkValue}>{displayWorkName}</span>
                </p>
              ) : (
                selectedLandmark.subtitle && (
                  <p className={styles.cardSubtitle}>{selectedLandmark.subtitle}</p>
                )
              )}
            </div>
            <button
              type="button"
              onClick={clearSelectedLandmark}
              className={styles.cardCloseBtn}
              title="Đóng thẻ"
              aria-label="Đóng thẻ thông tin mốc địa danh"
            >
              <X size={16} />
            </button>
          </div>

          {/* Sub-Works Switcher Tabs (e.g. 4.1 Dewa Muno, 4.2 Sọ Dừa, 4.3 Nàng Cha-điêng) */}
          {selectedLandmark.subWorks && selectedLandmark.subWorks.length > 0 && (
            <div className={styles.subWorkTabs} aria-label="Danh sách tác phẩm">
              {selectedLandmark.subWorks.map((sw) => {
                const isActive = currentSubWork?.id === sw.id;
                return (
                  <button
                    key={sw.id}
                    type="button"
                    onClick={() => setActiveSubWorkId(sw.id)}
                    className={`${styles.subWorkTabBtn} ${
                      isActive ? styles.subWorkTabBtnActive : ""
                    }`}
                    title={sw.title}
                  >
                    <span className={styles.subWorkTabCode}>{sw.code}</span>
                    <span className={styles.subWorkTabTitle}>{sw.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Poetic description snippet */}
          <p className={styles.cardSnippet}>{displayDescription}</p>

          {/* Dark green pill button: "Xem câu chuyện →" (navigates to dedicated page) */}
          <div className={styles.cardActionRow}>
            <Link
              href={`/landmarks/${selectedLandmark.id}`}
              className={styles.cardStoryBtn}
            >
              <span>Xem câu chuyện</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </aside>
      )}

      {/* ── Selected / Hovered Province HUD Card (shown on bottom-left when hovering provinces) ── */}
      {!selectedLandmark && activeProvince && (
        <section
          className={`${styles.glassPanel} ${styles.detailCard}`}
          aria-label="Thông tin tỉnh thành"
        >
          <div className={styles.detailHeader}>
            <h2 className={styles.detailTitle}>{activeProvince.name}</h2>
            {selectedProvince && (
              <button
                type="button"
                onClick={clearSelectedProvince}
                className={styles.detailClose}
                title="Đóng thẻ thông tin"
                aria-label="Đóng thẻ thông tin"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Mã hành chính:</span>
            <span className={styles.detailValue}>{activeProvince.code}</span>
          </div>

          {activeProvince.type && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Loại đơn vị:</span>
              <span className={styles.detailValue}>{activeProvince.type}</span>
            </div>
          )}

          {activeProvince.merged && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Sáp nhập từ:</span>
              <span className={styles.detailValue}>{activeProvince.merged}</span>
            </div>
          )}

          {activeProvince.areaKm2 !== undefined && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Diện tích:</span>
              <span className={styles.detailValue}>
                {activeProvince.areaKm2.toLocaleString("vi-VN")} km²
              </span>
            </div>
          )}

          {activeProvince.population !== undefined && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Dân số:</span>
              <span className={styles.detailValue}>
                {activeProvince.population.toLocaleString("vi-VN")} người
              </span>
            </div>
          )}

          <div className={styles.sovereigntyBanner}>
            <ShieldCheck size={14} color="#059669" />
            <span>Lãnh thổ toàn vẹn của nước CHXHCN Việt Nam</span>
          </div>
        </section>
      )}

      {/* ── Loading Overlay ── */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
          <p style={{ fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>
            Đang tải dữ liệu bản đồ Việt Nam...
          </p>
        </div>
      )}

      {/* ── Error Notification ── */}
      {errorMessage && (
        <div className={styles.loadingOverlay}>
          <p style={{ color: "#dc2626", fontWeight: 700, margin: 0 }}>
            Lỗi tải bản đồ: {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
}
