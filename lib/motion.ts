"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type DependencyList, type RefObject, useEffect, useLayoutEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  // Sections set up their animations before their Supabase data arrives, so
  // empty selections are expected — they re-run once the content renders.
  gsap.config({ nullTargetWarn: false });
}

export { gsap, ScrollTrigger };

/** The reference's signature curve, used for every masked text reveal. */
export const EXPO = "expo.out";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Runs GSAP setup scoped to `scope`, and reverts every tween / ScrollTrigger it
 * created when the component unmounts or `deps` change. The setup only runs
 * when the visitor allows motion, so with reduced motion nothing is ever
 * hidden or moved — content simply stays in its natural state.
 */
export function useGsap(
  setup: () => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  deps: DependencyList = []
) {
  useIsoLayoutEffect(() => {
    if (!scope.current || prefersReducedMotion()) return;
    const ctx = gsap.context(setup, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ---------------------------------------------------------------- Intro gate
// The hero waits for the loader to finish. On client-side navigation (or with
// reduced motion) the loader never runs, so the gate is already open.

let introDone = false;
const introListeners = new Set<() => void>();

export const markIntroDone = () => {
  introDone = true;
  introListeners.forEach((listener) => listener());
  introListeners.clear();
};

export const isIntroDone = () => introDone;

export const onIntroDone = (listener: () => void) => {
  if (introDone) {
    listener();
    return () => {};
  }
  introListeners.add(listener);
  return () => void introListeners.delete(listener);
};
