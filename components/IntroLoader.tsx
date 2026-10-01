"use client";

import { gsap, markIntroDone, prefersReducedMotion } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";

/**
 * First-load intro: a navy band sweeps across the bottom of an orange screen
 * while a "(0)" → "(100)" counter runs, then the band floods the screen and
 * the whole curtain lifts to reveal the hero.
 *
 * It's only visible when <html> has the `motion` class (set before paint), so
 * reduced-motion visitors never see it. It lives in the layout, so it runs once
 * per full page load and never on client-side navigation.
 */
const IntroLoader = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const mountedRef = useRef(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const html = document.documentElement;

    if (!root || prefersReducedMotion() || !html.classList.contains("motion")) {
      markIntroDone();
      setGone(true);
      return;
    }

    html.classList.add("intro-lock");
    const counter = { value: 0 };

    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onComplete: () => {
        html.classList.remove("intro-lock");
        setGone(true);
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        const value = Math.round(counter.value);
        if (countRef.current) countRef.current.textContent = `(${value})`;
        if (bandRef.current) bandRef.current.style.transform = `scaleX(${value / 100}) scaleY(0.14)`;
      },
    })
      .to(countRef.current, { yPercent: -120, autoAlpha: 0, duration: 0.5, ease: "power3.in" }, "+=0.1")
      .to(bandRef.current, { scaleY: 1, duration: 0.9 }, "<0.1")
      // Let the hero start revealing as the curtain lifts.
      .add(() => {
        html.classList.remove("intro-lock");
        markIntroDone();
      }, "+=0.05")
      .to(root, { yPercent: -100, duration: 1.1 }, "<");

    mountedRef.current = true;

    return () => {
      tl.kill();
      html.classList.remove("intro-lock");
      // Strict Mode unmounts and immediately remounts in dev; opening the gate
      // here would play the hero intro behind the loader. Only do it if the
      // loader really went away.
      mountedRef.current = false;
      setTimeout(() => {
        if (!mountedRef.current) markIntroDone();
      }, 0);
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className="intro-loader fixed inset-0 z-[200] bg-main overflow-hidden" aria-hidden="true">
      <div
        ref={bandRef}
        className="absolute inset-0 bg-brand-navy origin-bottom-left rtl:origin-bottom-right"
        style={{ transform: "scaleX(0) scaleY(0.14)" }}
      />
      <span
        ref={countRef}
        className="absolute start-3 md:start-6 bottom-[15vh] font-sans font-medium text-brand-navy text-[12vw] md:text-[6vw] leading-none tabular-nums"
      >
        (0)
      </span>
    </div>
  );
};

export default IntroLoader;
