'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './LandmarkStory.module.css';

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const query = useSearchParams().toString();
  useEffect(() => {
    const bar = barRef.current;
    const viewport = bar?.closest<HTMLElement>('[data-reader-scroll]');
    if (!bar || !viewport) return;
    let frame = 0;
    const update = () => {
      const article = viewport.querySelector<HTMLElement>('[data-story-article]');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const top = viewport.getBoundingClientRect().top + 80;
      const distance = Math.max(1, rect.height - viewport.clientHeight + 80);
      const value = Math.max(0, Math.min(1, (top - rect.top) / distance));
      bar.style.setProperty('--read-progress', String(value));
      bar.setAttribute('aria-valuenow', String(Math.round(value * 100)));
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(viewport);
    const article = viewport.querySelector('[data-story-article]');
    if (article) observer.observe(article);
    viewport.addEventListener('scroll', schedule, { passive: true });
    schedule();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); viewport.removeEventListener('scroll', schedule); };
  }, [query]);
  return <div ref={barRef} className={styles.readingProgress} role="progressbar" aria-label="Tiến độ đọc truyện"
    aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}><span /></div>;
}
