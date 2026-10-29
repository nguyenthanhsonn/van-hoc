'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './LandmarkStory.module.css';

type StoryImageProps = {
  src?: string;
  alt: string;
  variant?: 'header' | 'figure';
  hero?: boolean;
};

export function StoryImage({ src, alt, variant = 'figure', hero }: StoryImageProps) {
  const [failed, setFailed] = useState(false);
  const isHeader = hero || variant === 'header';

  if (!src || failed) {
    return (
      <div className={styles.imageFallback} role="img" aria-label={alt}>
        <span className={styles.fallbackIcon}>📷</span>
        <span className={styles.fallbackText}>Hình ảnh đang cập nhật</span>
      </div>
    );
  }

  if (isHeader) {
    return (
      <div className={styles.headerImageWrapper}>
        <div
          className={styles.headerImageBlurBg}
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden="true"
        />
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 560px"
          className={styles.headerImageForeground}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={styles.figureImageWrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={styles.figureImg}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
