"use client";

import { useRef } from "react";
import { gsap, isIntroDone, useGsap } from "@/lib/motion";

/**
 * Route transition. Next re-mounts a template on every navigation, so each
 * new page lifts an orange curtain off itself. Skipped on the very first load,
 * where the intro loader already plays.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      if (!isIntroDone()) {
        gsap.set(curtainRef.current, { display: "none" });
        return;
      }
      gsap
        .timeline()
        .set(curtainRef.current, { display: "block", yPercent: 0 })
        .to(curtainRef.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" })
        .from(rootRef.current!.querySelector("[data-page]"), { y: 60, duration: 1, ease: "expo.out", clearProps: "transform" }, "<0.3")
        .set(curtainRef.current, { display: "none" });
    },
    rootRef,
    []
  );

  return (
    <div ref={rootRef}>
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="fixed inset-0 z-[110] bg-main pointer-events-none"
        style={{ display: "none" }}
      />
      <div data-page>{children}</div>
    </div>
  );
}
