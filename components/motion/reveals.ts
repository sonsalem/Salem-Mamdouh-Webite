"use client";

import { EXPO, gsap, ScrollTrigger } from "@/lib/motion";

// Shared reveal presets so every section moves with the same language.
// All of them are called from inside useGsap(), so they're skipped entirely
// when the visitor prefers reduced motion.

/** Masked letters / words slide up, staggered. */
export const revealSplit = (target: Element | null, opts: { delay?: number; stagger?: number; trigger?: Element | null; start?: string } = {}) => {
  if (!target) return;
  const inners = target.querySelectorAll(".split-inner");
  // GSAP reads the CSS translateY(110%) start state as a pixel `y`, so both
  // y and yPercent are reset.
  return gsap.to(inners, {
    y: 0,
    yPercent: 0,
    duration: 1.1,
    ease: EXPO,
    stagger: opts.stagger ?? 0.03,
    delay: opts.delay ?? 0,
    scrollTrigger: opts.trigger === null ? undefined : { trigger: opts.trigger ?? target, start: opts.start ?? "top 88%" },
  });
};

/** Hairline rules draw in from their start edge. */
export const revealRules = (targets: Element[] | NodeListOf<Element>, trigger?: Element) => {
  if (!targets.length) return;
  return gsap.fromTo(
    targets,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1.4,
      ease: "expo.inOut",
      stagger: 0.1,
      scrollTrigger: { trigger: trigger ?? targets[0], start: "top 92%" },
    }
  );
};

/** Blocks rise and fade in, batched so a row of items staggers together. */
export const revealBatch = (targets: string | Element[], opts: { y?: number; stagger?: number } = {}) => {
  gsap.set(targets, { autoAlpha: 0, y: opts.y ?? 48 });
  return ScrollTrigger.batch(targets, {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: opts.stagger ?? 0.08, overwrite: true }),
  });
};
