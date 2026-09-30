"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGsap } from "@/lib/motion";

/**
 * A tilted navy "tape" band (the reference's obi) whose text loops endlessly.
 * Scrolling speeds it up and flips its direction with the scroll direction.
 * With reduced motion it's a static band.
 */
const Marquee = ({ items, reverse = false, className = "" }: { items: string[]; reverse?: boolean; className?: string }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // The track holds two identical halves, so looping xPercent across
      // -50%..0 is seamless.
      const wrap = gsap.utils.wrap(-50, 0);
      const setX = gsap.quickSetter(track, "xPercent");
      let x = 0;
      let direction = reverse ? 1 : -1;
      let boost = 0;
      let visible = false;

      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (visible = self.isActive),
        onUpdate: (self) => {
          direction = (self.direction === 1 ? -1 : 1) * (reverse ? -1 : 1);
          boost = Math.min(Math.abs(self.getVelocity()) / 400, 6);
        },
      });

      const tick = (_time: number, delta: number) => {
        if (!visible) return;
        boost *= 0.92;
        x = wrap(x + direction * (0.012 + boost * 0.01) * (delta / 16.7) * 2);
        setX(x);
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    rootRef,
    [reverse]
  );

  const half = (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: 4 }).flatMap((_, r) =>
        items.map((item, i) => (
          <span key={`${r}-${i}`} className="flex items-center">
            <span className="px-5 md:px-8">{item}</span>
            <span className="text-main" aria-hidden="true">
              ✦
            </span>
          </span>
        ))
      )}
    </div>
  );

  return (
    <div ref={rootRef} className={`relative overflow-hidden py-6 md:py-10 ${className}`} aria-hidden="true">
      <div className="-rotate-2 -mx-[5%] bg-brand-navy text-brand-paper border-y border-main/40">
        <div ref={trackRef} dir="ltr" className="marquee-track flex w-max py-3 md:py-4 text-lg md:text-2xl font-medium uppercase tracking-wide whitespace-nowrap">
          {half}
          {half}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
