"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";

const RADIUS = 25;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Back-to-top button: a hairline circle whose thin orange stroke traces the
 * reading progress, with a line arrow that floods orange on hover. Appears
 * once the page has been scrolled a little.
 */
const ScrollToTop = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const ring = ringRef.current;
    if (!button || !ring) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - self.progress));
        button.classList.toggle("show", self.scroll() > 450);
      },
    });
    return () => st.kill();
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="totop group fixed end-5 bottom-5 md:end-8 md:bottom-8 w-[54px] h-[54px] rounded-full bg-canvas/90 backdrop-blur-sm text-ink flex items-center justify-center"
    >
      {/* Orange flood on hover */}
      <span className="absolute inset-[3px] rounded-full bg-main scale-0 group-hover:scale-100 group-focus-visible:scale-100 transition-transform duration-500 ease-expo" />

      {/* Track + progress */}
      <svg viewBox="0 0 54 54" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="27" cy="27" r={RADIUS} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
        <circle
          ref={ringRef}
          cx="27"
          cy="27"
          r={RADIUS}
          fill="none"
          stroke="#FF6500"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>

      {/* Line arrow */}
      <svg
        viewBox="0 0 12 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className="relative w-3 h-[18px] transition-[transform,color] duration-500 ease-expo group-hover:-translate-y-1 group-hover:text-brand-navy"
        aria-hidden="true"
      >
        <path d="M6 22V1M1 6l5-5 5 5" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
