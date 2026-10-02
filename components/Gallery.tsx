"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

/** Thin line arrow with a small head, like the reference's "View →". */
const LineArrow = ({ flip = false }: { flip?: boolean }) => (
  <svg
    viewBox="0 0 32 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    className={`w-6 h-3 transition-transform duration-500 ease-expo ${
      flip ? "rotate-180 group-hover/btn:-translate-x-1" : "group-hover/btn:translate-x-1"
    }`}
    aria-hidden="true"
  >
    <path d="M0 6h30M25 1l5 5-5 5" />
  </svg>
);

const Slide = ({ href, name, children }: { href?: string; name: string; children: React.ReactNode }) =>
  href ? (
    <Link href={href} aria-label={name} className="block" draggable={false}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );

/**
 * A 16:9 window onto a screenshot shown at full width, never cropped sideways.
 * Long (full-page) shots start at the top and scroll to the bottom while the
 * gallery is hovered, at a steady reading speed; shorter ones sit centred.
 */
const Shot = ({ src, alt }: { src: string; alt: string }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [overflow, setOverflow] = useState(0);

  const measure = () => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img || !img.complete) return;
    setOverflow(Math.max(0, img.offsetHeight - frame.offsetHeight));
  };

  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (frameRef.current) ro.observe(frameRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="relative w-full aspect-video overflow-hidden flex items-center">
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={1600}
        height={900}
        sizes="(min-width: 1024px) 64vw, 100vw"
        onLoad={measure}
        style={
          {
            "--shot-shift": `-${overflow}px`,
            "--shot-time": `${Math.max(1.2, overflow / 300)}s`,
          } as React.CSSProperties
        }
        className={`w-full h-auto shrink-0 ${
          overflow
            ? "self-start transition-transform duration-700 ease-expo group-hover/shots:[transform:translateY(var(--shot-shift))] group-hover/shots:[transition-duration:var(--shot-time)] group-hover/shots:ease-linear"
            : ""
        }`}
      />
    </div>
  );
};

/**
 * Project image carousel. Its controls sit on the frame itself: two
 * hairline circles that flood orange on hover, and a "(01 / 06)" counter.
 */
const Gallery = ({
  images,
  name,
  href,
  labels,
}: {
  images: string[];
  name: string;
  /** When set, clicking an image opens this page (drags still just swipe). */
  href?: string;
  labels: { prev: string; next: string; cursor?: string };
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [index, setIndex] = useState(0);
  const many = images.length > 1;
  const pad = (n: number) => String(n).padStart(2, "0");

  const button =
    "group/btn relative w-11 h-11 md:w-12 md:h-12 rounded-full border border-brand-navy/30 bg-brand-paper/90 text-brand-navy backdrop-blur-sm flex items-center justify-center overflow-hidden transition-colors duration-300 hover:border-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-main";

  return (
    <div className="gallery group/shots relative min-w-0 overflow-hidden bg-surface" dir="ltr" data-cursor={labels.cursor}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={many}
        onSwiper={setSwiper}
        onSlideChange={(s) => setIndex(s.realIndex)}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <Slide href={href} name={name}>
              <Shot src={img} alt={`${name} — ${i + 1}`} />
            </Slide>
          </SwiperSlide>
        ))}
      </Swiper>

      {many && (
        <div className="absolute z-10 bottom-3 right-3 md:bottom-4 md:right-4 flex items-center gap-2">
          <span className="label me-1 px-2 py-1 bg-brand-paper/90 text-brand-navy tabular-nums backdrop-blur-sm">
            ({pad(index + 1)} / {pad(images.length)})
          </span>
          <button type="button" aria-label={labels.prev} onClick={() => swiper?.slidePrev()} className={button}>
            <span className="absolute inset-0 rounded-full bg-main scale-0 group-hover/btn:scale-100 transition-transform duration-500 ease-expo" />
            <span className="relative">
              <LineArrow flip />
            </span>
          </button>
          <button type="button" aria-label={labels.next} onClick={() => swiper?.slideNext()} className={button}>
            <span className="absolute inset-0 rounded-full bg-main scale-0 group-hover/btn:scale-100 transition-transform duration-500 ease-expo" />
            <span className="relative">
              <LineArrow />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
