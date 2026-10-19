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

const serif = localFont({ src: './fonts/NotoSerif.woff2', variable: '--font-story', display: 'swap', weight: '400 700' });
const sans = localFont({ src: [
  { path: './fonts/BeVietnamPro-Regular.woff2', weight: '400' },
  { path: './fonts/BeVietnamPro-SemiBold.woff2', weight: '600' },
], variable: '--font-heading', display: 'swap' });

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ truyen?: string | string[] }> };
const findLandmark = (id: string) => landmarks.find((landmark) => landmark.id === id);
const storyLink = (id: string) => {
  const landmark = landmarks.find((item) => item.stories.some((story) => story.id === id));
  const story = landmark?.stories.find((item) => item.id === id);
  return landmark && story ? { title: story.title, href: `/landmarks/${landmark.id}?truyen=${story.id}` } : undefined;
};

export function generateStaticParams() { return landmarks.map(({ id }) => ({ id })); }

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  const landmark = findLandmark(id);
  if (!landmark) return { title: 'Không tìm thấy điểm mốc này' };
  const { truyen } = await searchParams;
  const story = landmark.stories.find((item) => item.id === truyen) ?? landmark.stories[0];
  return { title: `${landmark.title} · ${story?.title ?? 'Câu chuyện dân gian Chăm'}`,
    description: story?.intro ?? landmark.summary };
}

function StoryArticle({ landmark, story }: { landmark: Landmark; story: Story }) {
  const supplied = storiesContent[story.id] as StoryContent | undefined;
  const content: StoryContent = supplied ?? { subtitle: '', readingMinutes: Math.max(1, Math.ceil(story.intro.split(/\s+/).length / 180)),
    sections: [{ paragraphs: [story.intro] }], keyFacts: [] };
  const index = STORY_ORDER.indexOf(story.id);
  const previous = index > 0 ? storyLink(STORY_ORDER[index - 1]) : undefined;
  const next = index >= 0 && index < STORY_ORDER.length - 1 ? storyLink(STORY_ORDER[index + 1]) : undefined;
  const [x, y] = miniMapPoint(landmark.lngLat);
  return <>
    <div className={styles.readingGrid}>
      <article className={styles.article} data-story-article aria-labelledby={`story-title-${story.id}`}>
        <header className={styles.articleHeader}>
          <p className={styles.eyebrow}>Tủ sách dân gian Chăm · {String(landmark.order).padStart(2, '0')}</p>
          <h2 id={`story-title-${story.id}`}>{story.title}</h2>
          {content.subtitle && <p className={styles.subtitle}>{content.subtitle}</p>}
          <div className={styles.readingMeta}><span>◷ Khoảng {content.readingMinutes} phút đọc</span><span>{supplied ? 'Bản đọc thử từ phần giới thiệu' : 'Giới thiệu tác phẩm'}</span></div>
        </header>
        <div className={styles.prose}>
          {content.sections.map((section, index) => <section key={index}>
            {section.heading && <h3>{section.heading}</h3>}
            {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
            {section.image && <figure className={styles.storyFigure}>
              <div className={styles.sectionImage}><StoryImage src={availableImage(section.image.src)} alt={section.image.alt} /></div>
              {section.image.caption && <figcaption>{section.image.caption}</figcaption>}
            </figure>}
          </section>)}
          {content.quote && <blockquote><span aria-hidden="true">“</span><p>{content.quote}</p><cite>Lời gợi mở dành cho người đọc</cite></blockquote>}
        </div>
        <p className={styles.readingEnd}><span aria-hidden="true">✦</span> Dừng một chút, nghĩ về điều em vừa đọc.</p>
      </article>
      <aside className={styles.sidebar} aria-label="Cùng tìm hiểu câu chuyện">
        {content.keyFacts.length > 0 && <section className={styles.sideCard}>
          <p className={styles.smallLabel}>Ghi nhớ sau khi đọc</p><h2>Ý chính</h2>
          <dl>{content.keyFacts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
        </section>}
        {!!content.glossary?.length && <Glossary>
          <dl>{content.glossary.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.meaning}</dd></div>)}</dl>
        </Glossary>}
        <section className={styles.locationCard}>
          <div><p className={styles.smallLabel}>Một điểm trên hành trình</p><h2>Vị trí điểm mốc</h2></div>
          <svg viewBox="0 0 260 270" className={styles.miniMap} role="img" aria-label={`Sơ đồ vị trí ${landmark.title} tại ${landmark.province}`}>
            <g fill="currentColor" stroke="#fffdf7" strokeWidth="0.6" fillRule="evenodd">{miniMapPaths().map((d, i) => <path key={i} d={d} />)}</g>
            <circle cx={x} cy={y} r="7" fill="var(--terrain-strong)" stroke="white" strokeWidth="3" />
            <circle cx={x} cy={y} r="12" fill="none" stroke="var(--terrain-strong)" strokeWidth="1" />
          </svg>
          <p className={styles.mapCaption}>{landmark.province} <span>· Sơ đồ vị trí tương đối</span></p>
          <Link href={`/?mo=${landmark.id}`} className={styles.mapLink}>Xem trên bản đồ <span aria-hidden="true">↗</span></Link>
        </section>
      </aside>
    </div>
    <footer className={styles.footer}>
      <p className={styles.smallLabel}>Tiếp nối những lời kể</p>
      <nav className={styles.storyNavigation} aria-label="Thứ tự đọc câu chuyện">
        {previous && <Link className={styles.previousStory} href={previous.href}><span>← Câu chuyện trước</span><strong>{previous.title}</strong></Link>}
        {next && <Link className={styles.nextStory} href={next.href}><span>Câu chuyện tiếp theo →</span><strong>{next.title}</strong></Link>}
      </nav>
      <nav className={styles.journey} aria-label="Hành trình 6 điểm mốc">
        <p>Hành trình qua {landmarks.length} điểm mốc</p>
        <ol>{landmarks.map((item) => <li key={item.id}><Link href={`/landmarks/${item.id}`} aria-current={item.id === landmark.id ? 'step' : undefined}
          aria-label={`Điểm mốc ${item.order}: ${item.title}`} title={item.title}>{item.order}</Link></li>)}</ol>
      </nav>
      <p className={styles.footerNote}>Đọc một câu chuyện. Hiểu thêm một vùng đất.</p>
    </footer>
  </>;
}

export default async function LandmarkStoryPage({ params, searchParams }: Props) {
  const { id } = await params;
  const landmark = findLandmark(id);
  if (!landmark) notFound();
  const { truyen } = await searchParams;
  const stories = landmark.stories.length ? landmark.stories : [{ id: landmark.id, title: landmark.title, intro: landmark.summary }];
  const initialStory = stories.find((story) => story.id === truyen) ?? stories[0];
  const terrain = TERRAIN_STYLE[landmark.terrain];
  // The map's light badges need darker ink for accessible reading-page text.
  const strong = landmark.terrain === 'plain' ? '#8a6a10' : landmark.terrain === 'sea' ? '#1f5f8a' : terrain.badge;
  const variables = { '--terrain-bg': terrain.background, '--terrain-accent': terrain.border, '--terrain-strong': strong } as CSSProperties;
  const hero = availableImage(storiesContent[landmark.stories[0]?.id]?.heroImage) ?? availableImage(landmark.image);
  return <div className={`${styles.readerViewport} ${serif.variable} ${sans.variable}`} style={variables} data-reader-scroll>
    <a href="#story-content" className={styles.skipLink}>Đến nội dung truyện</a>
    <header className={styles.topBar}>
      <Link href={`/?mo=${landmark.id}`} className={styles.backButton}><span aria-hidden="true">←</span> Về bản đồ</Link>
      <p className={styles.brand}><span aria-hidden="true">✦</span> Theo dấu lời kể Chăm</p>
      <span className={styles.milestone}>Điểm mốc {landmark.order}/{landmarks.length}</span>
      <Suspense><ReadingProgress /></Suspense>
    </header>
    <main>
      <header className={styles.hero}>
        <StoryImage key={hero} src={hero} alt={`Khung cảnh ${landmark.title}, ${landmark.province}`} hero />
        <div className={styles.heroShade} />
        <svg className={styles.ornament} viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
          {[0, 1, 2, 3].map((n) => <g key={n} transform={`translate(0 ${n * 58})`}><path d="M0 28 28 0 56 28 28 56ZM58 28 86 0 114 28 86 56ZM116 28 144 0 172 28 144 56Z" /><path d="m14 28 14-14 14 14-14 14Zm58 0 14-14 14 14-14 14Zm58 0 14-14 14 14-14 14Z" /></g>)}
        </svg>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Địa danh & những câu chuyện</p>
          <h1>{landmark.title}</h1>
          <div className={styles.heroDetails}><span>{landmark.province}</span><span className={styles.terrainBadge}>{terrain.label}</span></div>
        </div>
      </header>
      <div id="story-content" className={styles.storyContent}>
        <Suspense fallback={<StoryArticle landmark={landmark} story={initialStory} />}>
          <StoryTabs landmarkTitle={landmark.title} stories={stories}
            panels={stories.map((story) => <StoryArticle key={story.id} landmark={landmark} story={story} />)} />
        </Suspense>
      </div>
    </main>
  </div>;
}
