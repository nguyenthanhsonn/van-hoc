'use client';

import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './LandmarkStory.module.css';

export function StoryTabs({ landmarkTitle, stories, panels }: {
  landmarkTitle: string;
  stories: { id: string; title: string }[];
  panels: ReactNode[];
}) {
  const query = useSearchParams();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const requested = stories.findIndex((story) => story.id === query.get('truyen'));
  const active = requested < 0 ? 0 : requested;
  useEffect(() => {
    if (stories[active]) document.title = `${landmarkTitle} · ${stories[active].title}`;
  }, [active, landmarkTitle, stories]);
  const select = (index: number) => {
    if (index === active) return;
    const url = new URL(window.location.href);
    url.searchParams.set('truyen', stories[index].id);
    // Next.js synchronizes its search params with native history, without a server request.
    window.history.pushState(null, '', url);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === 'ArrowRight' ? (index + 1) % stories.length
      : event.key === 'ArrowLeft' ? (index - 1 + stories.length) % stories.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? stories.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault();
    select(next);
    buttons.current[next]?.focus({ preventScroll: true });
    buttons.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  if (!stories.length) return null;
  return <>
    {stories.length > 1 && <nav className={styles.tabsNav} aria-label="Các tác phẩm tại điểm mốc">
      <div className={styles.tabsInner}>
        <span className={styles.tabsLabel}>Cùng một nơi, nhiều câu chuyện</span>
        <div className={styles.tabList} role="tablist" aria-label="Chọn truyện" aria-orientation="horizontal">
          {stories.map((story, index) => <button key={story.id} type="button" role="tab"
            id={`tab-${story.id}`} aria-controls={`panel-${story.id}`} aria-selected={index === active}
            tabIndex={index === active ? 0 : -1} className={styles.tab}
            ref={(node) => { buttons.current[index] = node; }}
            onClick={() => select(index)} onKeyDown={(event) => onKeyDown(event, index)}>
            {story.title}
          </button>)}
        </div>
      </div>
    </nav>}
    <div key={stories[active].id} className={styles.storyPanel} id={`panel-${stories[active].id}`}
      role={stories.length > 1 ? 'tabpanel' : undefined}
      aria-labelledby={stories.length > 1 ? `tab-${stories[active].id}` : undefined} tabIndex={stories.length > 1 ? 0 : undefined}>
      {panels[active]}
    </div>
  </>;
}
