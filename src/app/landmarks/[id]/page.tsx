import { Suspense, type CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { landmarks, STORY_ORDER, type Landmark, type Story } from '@/features/map/data/landmarksData';
import { storiesContent, type StoryContent } from '@/features/map/data/storiesContent';
import { TERRAIN_STYLE } from '@/features/map/config/mapConfig';
import { StoryTabs } from './StoryTabs';
import { ReadingProgress } from './ReadingProgress';
import { Glossary } from './Glossary';
import { StoryImage } from './StoryImage';
import { availableImage, miniMapPaths, miniMapPoint } from './storyAssets';
import styles from './LandmarkStory.module.css';

const serif = localFont({
  src: './fonts/NotoSerif.woff2',
  variable: '--font-story',
  display: 'swap',
  weight: '400 700',
});

const sans = localFont({
  src: [
    { path: './fonts/BeVietnamPro-Regular.woff2', weight: '400' },
    { path: './fonts/BeVietnamPro-SemiBold.woff2', weight: '600' },
  ],
  variable: '--font-heading',
  display: 'swap',
});

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ truyen?: string | string[] }>;
};

const findLandmark = (id: string) => landmarks.find((landmark) => landmark.id === id);

const storyLink = (id: string) => {
  const landmark = landmarks.find((item) => item.stories.some((story) => story.id === id));
  const story = landmark?.stories.find((item) => item.id === id);
  return landmark && story ? { title: story.title, href: `/landmarks/${landmark.id}?truyen=${story.id}` } : undefined;
};

export function generateStaticParams() {
  return landmarks.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  const landmark = findLandmark(id);
  if (!landmark) return { title: 'Không tìm thấy điểm mốc này' };
  const { truyen } = await searchParams;
  const story = landmark.stories.find((item) => item.id === truyen) ?? landmark.stories[0];
  return {
    title: `${landmark.title} · ${story?.title ?? 'Câu chuyện dân gian Chăm'}`,
    description: story?.intro ?? landmark.summary,
  };
}

function StoryArticle({ landmark, story }: { landmark: Landmark; story: Story }) {
  const supplied = storiesContent[story.id] as StoryContent | undefined;
  const content: StoryContent = supplied ?? {
    subtitle: '',
    readingMinutes: Math.max(1, Math.ceil(story.intro.split(/\s+/).length / 180)),
    sections: [{ paragraphs: [story.intro] }],
    keyFacts: [],
  };
  const index = STORY_ORDER.indexOf(story.id);
  const previous = index > 0 ? storyLink(STORY_ORDER[index - 1]) : undefined;
  const next = index >= 0 && index < STORY_ORDER.length - 1 ? storyLink(STORY_ORDER[index + 1]) : undefined;
  const [x, y] = miniMapPoint(landmark.lngLat);

  return (
    <>
      <div className={styles.readingGrid}>
        <article className={styles.article} data-story-article aria-labelledby={`story-title-${story.id}`}>
          <header className={styles.articleHeader}>
            <div className={styles.articleMetaBadgeRow}>
              <span className={styles.eyebrow}>Tủ sách Dân gian Chăm</span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.storyOrderTag}>Tác phẩm số {String(index >= 0 ? index + 1 : landmark.order).padStart(2, '0')}</span>
            </div>
            <h2 id={`story-title-${story.id}`} className={styles.storyArticleTitle}>{story.title}</h2>
            {content.subtitle && <p className={styles.subtitle}>{content.subtitle}</p>}
            <div className={styles.readingMeta}>
              <span className={styles.readingMetaItem}>⏱️ Khoảng {content.readingMinutes} phút đọc</span>
              <span className={styles.readingMetaItem}>📜 {supplied ? 'Bản tóm lược nội dung tác phẩm' : 'Giới thiệu tác phẩm'}</span>
              <span className={styles.readingMetaItem}>🏛️ Lưu truyền dân gian Chăm</span>
            </div>
          </header>

          <div className={styles.prose}>
            {content.sections.map((section, sIdx) => (
              <section key={sIdx} className={styles.proseSection}>
                {section.heading && (
                  <h3 className={styles.sectionHeading}>
                    <span className={styles.headingDecor} aria-hidden="true">◆</span>
                    {section.heading}
                  </h3>
                )}
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
                {section.image && (
                  <figure className={styles.storyFigure}>
                    <div className={styles.figureMediaWrapper}>
                      <StoryImage
                        src={availableImage(section.image.src)}
                        alt={section.image.alt}
                        variant="figure"
                      />
                    </div>
                    {section.image.caption && (
                      <figcaption className={styles.figureCaptionBox}>
                        <div className={styles.captionHeader}>
                          <span className={styles.captionBadge}>🏷️ THÔNG TIN HÌNH ẢNH / TƯ LIỆU MINH HỌA</span>
                          <span className={styles.captionHint}>Tác phẩm & Di sản văn hóa</span>
                        </div>
                        <p className={styles.captionContent}>{section.image.caption}</p>
                      </figcaption>
                    )}
                  </figure>
                )}
              </section>
            ))}

            {content.quote && (
              <blockquote className={styles.goldenQuoteCard}>
                <span className={styles.quoteMark} aria-hidden="true">“</span>
                <p className={styles.quoteText}>{content.quote}</p>
                <cite className={styles.quoteCite}>✦ Lời gợi mở & Giá trị nhân văn sâu sắc</cite>
              </blockquote>
            )}
          </div>

          <div className={styles.readingEnd}>
            <span className={styles.readingEndStar} aria-hidden="true">✦</span>
            <span>Dừng lại một chút, nghĩ về những giá trị văn hóa và bài học nhân sinh em vừa khám phá.</span>
          </div>
        </article>

        {/* Sidebar Dossier */}
        <aside className={styles.sidebar} aria-label="Hồ sơ câu chuyện & di sản">
          {content.keyFacts.length > 0 && (
            <section className={styles.sideCard}>
              <div className={styles.sideCardHeader}>
                <span className={styles.sideCardTag}>GHI NHỚ SAU KHI ĐỌC</span>
                <h3 className={styles.sideCardTitle}>📋 Hồ sơ tác phẩm</h3>
              </div>
              <dl className={styles.factList}>
                {content.keyFacts.map((fact) => (
                  <div key={fact.label} className={styles.factRow}>
                    <dt className={styles.factLabel}>{fact.label}</dt>
                    <dd className={styles.factValue}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {!!content.glossary?.length && (
            <section className={styles.glossaryCard}>
              <Glossary>
                <dl className={styles.glossaryList}>
                  {content.glossary.map((item) => (
                    <div key={item.term} className={styles.glossaryRow}>
                      <dt className={styles.glossaryTerm}>{item.term}</dt>
                      <dd className={styles.glossaryMeaning}>{item.meaning}</dd>
                    </div>
                  ))}
                </dl>
              </Glossary>
            </section>
          )}

          <section className={styles.locationCard}>
            <div className={styles.locationCardHeader}>
              <span className={styles.sideCardTag}>ĐỊA LÝ & DI TÍCH</span>
              <h3 className={styles.sideCardTitle}>🗺️ Vị trí điểm mốc</h3>
            </div>
            <svg
              viewBox="0 0 260 270"
              className={styles.miniMap}
              role="img"
              aria-label={`Sơ đồ vị trí ${landmark.title} tại ${landmark.province}`}
            >
              <g fill="currentColor" stroke="#fffdf7" strokeWidth="0.6" fillRule="evenodd">
                {miniMapPaths().map((d, i) => <path key={i} d={d} />)}
              </g>
              <circle cx={x} cy={y} r="7" fill="var(--terrain-strong)" stroke="white" strokeWidth="3" />
              <circle cx={x} cy={y} r="14" fill="none" stroke="var(--terrain-strong)" strokeWidth="1.5" opacity="0.6" />
            </svg>
            <div className={styles.locationMeta}>
              <strong className={styles.mapProvince}>{landmark.province}</strong>
              <span className={styles.mapCoords}>{landmark.lngLat[1].toFixed(4)}° B, {landmark.lngLat[0].toFixed(4)}° Đ</span>
            </div>
            <Link href={`/?mo=${landmark.id}`} className={styles.mapLink}>
              <span>Xem trực tiếp trên bản đồ số</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </section>
        </aside>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerEyebrow}>TIẾP NỐI NHỮNG LỜI KỂ DÂN GIAN</p>
        <nav className={styles.storyNavigation} aria-label="Thứ tự đọc câu chuyện">
          {previous ? (
            <Link className={styles.previousStory} href={previous.href}>
              <span className={styles.navDirection}>← Câu chuyện trước</span>
              <strong className={styles.navTitle}>{previous.title}</strong>
            </Link>
          ) : <div />}
          {next && (
            <Link className={styles.nextStory} href={next.href}>
              <span className={styles.navDirection}>Câu chuyện tiếp theo →</span>
              <strong className={styles.navTitle}>{next.title}</strong>
            </Link>
          )}
        </nav>
        <nav className={styles.journey} aria-label="Hành trình các điểm mốc">
          <p className={styles.journeyHeading}>Hành trình qua {landmarks.length} điểm mốc di sản Chăm</p>
          <ol className={styles.journeySteps}>
            {landmarks.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/landmarks/${item.id}`}
                  aria-current={item.id === landmark.id ? 'step' : undefined}
                  aria-label={`Điểm mốc ${item.order}: ${item.title}`}
                  title={`${item.order}. ${item.title} (${item.province})`}
                >
                  {item.order}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <p className={styles.footerNote}>Đọc một câu chuyện · Thấu hiểu một vùng đất · Gìn giữ hồn di sản Chămpa</p>
      </footer>
    </>
  );
}

export default async function LandmarkStoryPage({ params, searchParams }: Props) {
  const { id } = await params;
  const landmark = findLandmark(id);
  if (!landmark) notFound();
  const { truyen } = await searchParams;
  const stories = landmark.stories.length ? landmark.stories : [{ id: landmark.id, title: landmark.title, intro: landmark.summary }];
  const initialStory = stories.find((story) => story.id === truyen) ?? stories[0];
  const terrain = TERRAIN_STYLE[landmark.terrain];
  // Darker ink for accessible reading-page text
  const strong = landmark.terrain === 'plain' ? '#8a6a10' : landmark.terrain === 'sea' ? '#1f5f8a' : terrain.badge;
  const variables = {
    '--terrain-bg': terrain.background,
    '--terrain-accent': terrain.border,
    '--terrain-strong': strong,
  } as CSSProperties;
  const hero = availableImage(storiesContent[landmark.stories[0]?.id]?.heroImage) ?? availableImage(landmark.image);

  return (
    <div className={`${styles.readerViewport} ${serif.variable} ${sans.variable}`} style={variables} data-reader-scroll>
      <a href="#story-content" className={styles.skipLink}>Đến nội dung truyện</a>

      {/* Top Bar Navigation */}
      <header className={styles.topBar}>
        <Link href={`/?mo=${landmark.id}`} className={styles.backButton}>
          <span aria-hidden="true">←</span> Về bản đồ số
        </Link>
        <div className={styles.brand}>
          <span aria-hidden="true">✦</span>
          <strong>Hồ sơ Văn hóa & Lời kể Dân gian Chăm</strong>
        </div>
        <div className={styles.milestone}>
          <span>Điểm mốc {String(landmark.order).padStart(2, '0')}/{String(landmarks.length).padStart(2, '0')}</span>
        </div>
        <Suspense><ReadingProgress /></Suspense>
      </header>

      <main>
        {/* Editorial Profile Header - 2-Column Showcase */}
        <section className={styles.editorialHeader} aria-labelledby="landmark-main-title">
          <div className={styles.editorialContainer}>
            {/* Left Column: Landmark Information */}
            <div className={styles.landmarkInfoCol}>
              <div className={styles.badgeRow}>
                <span className={styles.milestoneBadge}>Điểm mốc {String(landmark.order).padStart(2, '0')}</span>
                <span className={styles.terrainBadge}>{terrain.label}</span>
                <span className={styles.provinceBadge}>📍 {landmark.province}</span>
                {landmark.positionType === 'verified' && (
                  <span className={styles.verifiedBadge}>✓ Đã xác thực thực địa</span>
                )}
              </div>

              <h1 id="landmark-main-title" className={styles.landmarkTitle}>
                {landmark.title}
              </h1>

              <p className={styles.landmarkSummary}>
                {landmark.summary}
              </p>

              {/* Quick Fact Grid */}
              <div className={styles.quickFacts}>
                <div className={styles.quickFactItem}>
                  <span className={styles.quickFactLabel}>Tọa độ địa lý</span>
                  <span className={styles.quickFactValue}>{landmark.lngLat[1].toFixed(4)}° B, {landmark.lngLat[0].toFixed(4)}° Đ</span>
                </div>
                <div className={styles.quickFactItem}>
                  <span className={styles.quickFactLabel}>Tác phẩm lưu truyền</span>
                  <span className={styles.quickFactValue}>{stories.length} câu chuyện dân gian</span>
                </div>
                <div className={styles.quickFactItem}>
                  <span className={styles.quickFactLabel}>Địa mạo đặc trưng</span>
                  <span className={styles.quickFactValue}>{terrain.label}</span>
                </div>
              </div>

              <div className={styles.actionButtons}>
                <a href="#story-content" className={styles.primaryActionBtn}>
                  <span>📖 Đọc câu chuyện dân gian</span>
                  <span aria-hidden="true">↓</span>
                </a>
                <Link href={`/?mo=${landmark.id}`} className={styles.secondaryActionBtn}>
                  <span>🗺️ Mở trên bản đồ số</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Featured Landmark Photo Showcase */}
            <div className={styles.landmarkPhotoCol}>
              <div className={styles.photoShowcaseCard}>
                <div className={styles.photoFrame}>
                  <StoryImage
                    src={hero}
                    alt={`Ảnh tư liệu ${landmark.title}, ${landmark.province}`}
                    variant="header"
                  />
                  <span className={styles.photoTag}>📷 Ảnh tư liệu di tích</span>
                </div>
                <div className={styles.photoFooter}>
                  <strong className={styles.photoCaptionTitle}>{landmark.title}</strong>
                  <span className={styles.photoCaptionSub}>{landmark.province} · Không gian di sản & bối cảnh truyền thuyết</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Content Area */}
        <div id="story-content" className={styles.storyContent}>
          <Suspense fallback={<StoryArticle landmark={landmark} story={initialStory} />}>
            <StoryTabs
              landmarkTitle={landmark.title}
              stories={stories}
              panels={stories.map((story) => (
                <StoryArticle key={story.id} landmark={landmark} story={story} />
              ))}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
