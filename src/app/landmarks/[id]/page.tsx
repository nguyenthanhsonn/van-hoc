import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  VIETNAM_LANDMARKS,
  getLandmarkById,
} from "@/features/map/data/landmarksData";
import {
  ArrowLeft,
  MapPin,
  Compass,
  Navigation,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import styles from "./LandmarkStory.module.css";

interface LandmarkPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate static params for pre-rendering all landmarks
 */
export function generateStaticParams() {
  return VIETNAM_LANDMARKS.map((landmark) => ({
    id: landmark.id,
  }));
}

/**
 * Dynamic metadata for SEO
 */
export async function generateMetadata({
  params,
}: LandmarkPageProps): Promise<Metadata> {
  const { id } = await params;
  const landmark = getLandmarkById(id);

  if (!landmark) {
    return {
      title: "Không tìm thấy địa danh | Bản đồ Việt Nam 2D",
    };
  }

  return {
    title: `${landmark.name} (${landmark.province}) - Câu chuyện & Huyền tích | Văn học Việt Nam`,
    description: landmark.shortDescription,
    openGraph: {
      title: `${landmark.name} - ${landmark.subtitle}`,
      description: landmark.shortDescription,
      images: [
        {
          url: landmark.imageUrl,
          width: 1200,
          height: 630,
          alt: landmark.name,
        },
      ],
    },
  };
}

/**
 * Dedicated story page for each literary & historical milestone.
 * Rendered at /landmarks/[id]
 */
export default async function LandmarkStoryPage({
  params,
}: LandmarkPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  const landmark = getLandmarkById(id);

  if (!landmark) {
    notFound();
  }

  const otherLandmarks = VIETNAM_LANDMARKS.filter((item) => item.id !== id);

  return (
    <div className={styles.pageContainer}>
      {/* ── Sticky Top Bar ── */}
      <nav className={styles.topBar} aria-label="Điều hướng trang câu chuyện">
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={16} />
          <span>Quay lại bản đồ</span>
        </Link>

        <div className={styles.siteBrand}>
          <span className={styles.brandDot} />
          <span>Văn Học & Địa Danh Việt Nam</span>
        </div>

        <div className={styles.quickNavGroup} aria-label="Chuyển mốc nhanh">
          <span className={styles.quickNavLabel}>Các mốc:</span>
          {VIETNAM_LANDMARKS.map((item) => (
            <Link
              key={item.id}
              href={`/landmarks/${item.id}`}
              className={`${styles.quickNavBtn} ${
                item.id === id ? styles.quickNavBtnActive : ""
              }`}
              style={{ backgroundColor: item.color }}
              title={`Mốc ${item.order}: ${item.name}`}
            >
              {item.order}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <header className={styles.heroSection}>
        <img
          src={landmark.imageUrl}
          alt={landmark.name}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <div className={styles.heroTagsRow}>
              <span
                className={styles.orderBadge}
                style={{ backgroundColor: landmark.color }}
              >
                Mốc {landmark.order}
              </span>
              <span className={styles.provinceTag}>{landmark.province}</span>
              <span className={styles.categoryTag}>{landmark.category}</span>
              {landmark.workName && (
                <span
                  className={styles.categoryTag}
                  style={{ background: "rgba(16, 185, 129, 0.35)", borderColor: "#6ee7b7" }}
                >
                  Tác phẩm: {landmark.workName}
                </span>
              )}
            </div>

            <h1 className={styles.heroTitle}>
              {landmark.name} ({landmark.province})
            </h1>

            {landmark.subtitle && (
              <p className={styles.heroSubtitle}>{landmark.subtitle}</p>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main className={styles.mainContainer}>
        {/* Quick Facts Strip */}
        <div className={styles.factsGrid}>
          {landmark.workName && (
            <div className={styles.factCard}>
              <div
                className={styles.factIconCircle}
                style={{ background: "#fef3c7", color: "#d97706" }}
              >
                <Sparkles size={20} />
              </div>
              <div className={styles.factMeta}>
                <span className={styles.factLabel}>Tác phẩm văn học</span>
                <span className={styles.factValue}>{landmark.workName}</span>
              </div>
            </div>
          )}

          <div className={styles.factCard}>
            <div className={styles.factIconCircle}>
              <MapPin size={20} />
            </div>
            <div className={styles.factMeta}>
              <span className={styles.factLabel}>Vị trí địa lý</span>
              <span className={styles.factValue}>{landmark.locationName}</span>
            </div>
          </div>

          <div className={styles.factCard}>
            <div className={styles.factIconCircle}>
              <Compass size={20} />
            </div>
            <div className={styles.factMeta}>
              <span className={styles.factLabel}>Tọa độ GPS</span>
              <span className={`${styles.factValue} ${styles.gpsCode}`}>
                {landmark.coordinates[1].toFixed(6)},{" "}
                {landmark.coordinates[0].toFixed(6)}
              </span>
            </div>
          </div>

          <div className={styles.factCard}>
            <div className={styles.factIconCircle}>
              <BookOpen size={20} />
            </div>
            <div className={styles.factMeta}>
              <span className={styles.factLabel}>Phân loại di sản</span>
              <span className={styles.factValue}>{landmark.category}</span>
            </div>
          </div>
        </div>

        {/* Poetic Quote Box */}
        {landmark.quote && (
          <blockquote className={styles.quoteBox}>
            <p className={styles.quoteText}>{landmark.quote}</p>
          </blockquote>
        )}

        {/* Overview Narrative */}
        <section className={styles.overviewSection}>
          <h2 className={styles.overviewHeading}>
            <Sparkles size={20} color="#059669" />
            <span>Tổng quan & Huyền tích cội nguồn</span>
          </h2>
          <p className={styles.overviewText}>{landmark.story}</p>
        </section>

        {/* Deep Historical & Cultural Story Sections */}
        {landmark.sections && landmark.sections.length > 0 && (
          <section
            className={styles.storySectionsList}
            aria-label="Các giai thoại văn hóa chi tiết"
          >
            {landmark.sections.map((section, idx) => (
              <article key={idx} className={styles.storyCard}>
                <h3 className={styles.storyCardTitle}>
                  <span className={styles.storyCardIndex}>{idx + 1}</span>
                  <span>{section.title}</span>
                </h3>
                <p className={styles.storyCardContent}>{section.content}</p>
              </article>
            ))}
          </section>
        )}

        {/* Interactive Map CTA Banner */}
        <aside className={styles.mapCtaCard}>
          <div className={styles.mapCtaLeft}>
            <h3 className={styles.mapCtaTitle}>
              Khám phá không gian thực địa trên bản đồ
            </h3>
            <p className={styles.mapCtaDesc}>
              Trở lại bản đồ tương tác để quan sát vị trí địa lý của{" "}
              <strong>{landmark.name}</strong> trong mối tương quan với 34 đơn vị
              hành chính và các mốc văn học khác.
            </p>
          </div>
          <Link href="/" className={styles.mapCtaBtn}>
            <Navigation size={18} />
            <span>Mở Bản Đồ Tương Tác</span>
          </Link>
        </aside>

        {/* Explore Other Landmarks */}
        <section className={styles.otherLandmarksSection}>
          <div className={styles.sectionHeadingRow}>
            <h2 className={styles.sectionHeading}>
              Khám phá các mốc địa danh khác
            </h2>
          </div>

          <div className={styles.landmarksGrid}>
            {otherLandmarks.map((other) => (
              <Link
                key={other.id}
                href={`/landmarks/${other.id}`}
                className={styles.landmarkItemCard}
              >
                <div className={styles.itemImageWrapper}>
                  <img
                    src={other.imageUrl}
                    alt={other.name}
                    className={styles.itemImage}
                  />
                </div>
                <div className={styles.itemBody}>
                  <div className={styles.itemHeader}>
                    <span
                      className={styles.itemOrderBadge}
                      style={{ backgroundColor: other.color }}
                    >
                      Mốc {other.order}
                    </span>
                    <span className={styles.itemProvince}>
                      {other.province}
                    </span>
                  </div>
                  <h3 className={styles.itemTitle}>{other.name}</h3>
                  <p className={styles.itemDesc}>{other.shortDescription}</p>
                  <span className={styles.itemLinkText}>
                    <span>Xem câu chuyện</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className={styles.pageFooter}>
        <p style={{ margin: 0 }}>
          Dự án Bản Đồ Địa Danh Văn Học & Lịch Sử Việt Nam © 2026.
        </p>
      </footer>
    </div>
  );
}
