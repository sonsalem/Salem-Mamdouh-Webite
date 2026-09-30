"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";

/**
 * Thin orange reading-progress bar across the top of the viewport (the
 * reference's progress bar). It also keeps every ScrollTrigger accurate:
 * content here loads asynchronously from Supabase, so whenever the page height
 * changes the trigger positions are recalculated.
 */
const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const setScale = gsap.quickSetter(bar, "scaleX");
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setScale(self.progress),
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    let lastHeight = document.body.scrollHeight;
    let timer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    observer.observe(document.body);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  // New route: recalculate once its content has laid out.
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[3px] bg-main z-[120] origin-left rtl:origin-right pointer-events-none"
      style={{ transform: "scaleX(0)" }}
    />
  );
};

export default ScrollProgress;
