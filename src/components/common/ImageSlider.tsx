"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

const SWIPE_THRESHOLD = 40;

const formatIndex = (value: number) => String(value).padStart(2, "0");

interface ImageSliderProps {
  images: string[];
  alt: string;
  sizes?: string;
  aspect?: string;
}

export default function ImageSlider({
  images,
  alt,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw",
  aspect = "aspect-video",
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") nextSlide();
    if (event.key === "ArrowLeft") prevSlide();
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (deltaX < 0) nextSlide();
    else prevSlide();
  };

  const hasMultipleImages = images.length > 1;

  return (
    <div
      role="region"
      aria-roledescription="galerie"
      aria-label={alt}
      tabIndex={hasMultipleImages ? 0 : undefined}
      onKeyDown={hasMultipleImages ? handleKeyDown : undefined}
      onTouchStart={hasMultipleImages ? handleTouchStart : undefined}
      onTouchEnd={hasMultipleImages ? handleTouchEnd : undefined}
      className={`relative w-full overflow-hidden rounded-sm bg-neutral-200 ${aspect}`}
    >
      <Image
        src={images[currentIndex]}
        alt={`${alt} – fotografie ${currentIndex + 1}`}
        fill
        className="object-cover"
        sizes={sizes}
      />

      {hasMultipleImages && (
        <>
          <span className="absolute bottom-4 left-4 rounded-sm bg-ink/75 px-2.5 py-1 text-xs font-medium tabular-nums text-white">
            {formatIndex(currentIndex + 1)} / {formatIndex(images.length)}
          </span>

          <div className="absolute bottom-4 right-4 flex gap-1">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Předchozí fotografie"
              className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/90 text-ink transition-colors hover:bg-white"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M10 3 5 8l5 5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Další fotografie"
              className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/90 text-ink transition-colors hover:bg-white"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="m6 3 5 5-5 5" />
              </svg>
            </button>
          </div>

          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-0.5 bg-brand transition-[width] duration-300"
            style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
          />
        </>
      )}
    </div>
  );
}
