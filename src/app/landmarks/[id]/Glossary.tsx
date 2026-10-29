'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './LandmarkStory.module.css';

export function Glossary({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 599px)');
    const resize = () => { if (ref.current) ref.current.open = !media.matches; };
    resize();
    media.addEventListener('change', resize);
    return () => media.removeEventListener('change', resize);
  }, []);

  return (
    <details ref={ref} className={styles.glossary} open>
      <summary className={styles.glossarySummary}>
        <span className={styles.glossarySummaryTitle}>📖 Điển tích & Thuật ngữ Chăm</span>
        <span className={styles.glossaryArrow} aria-hidden="true">⌄</span>
      </summary>
      {children}
    </details>
  );
}
