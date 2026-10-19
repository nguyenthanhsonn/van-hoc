'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './LandmarkStory.module.css';

/** The parent always retains its terrain background and dimensions on image failure. */
export function StoryImage({ src, alt, hero = false }: { src?: string; alt: string; hero?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <span className={styles.imageFallback} role="img" aria-label={alt} />;
  return <Image src={src} alt={alt} fill sizes={hero ? '100vw' : '(max-width: 900px) 100vw, 680px'}
    preload={hero} className={styles.coverImage} onError={() => setFailed(true)} />;
}
