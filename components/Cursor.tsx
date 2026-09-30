"use client";

import { useEffect, useRef } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/lib/motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label";

/**
 * Small orange dot that trails the pointer. Over links and buttons it swells
 * into a ring; over anything with `data-cursor="Label"` it becomes a large
 * orange disc showing that label (the reference's "View" cursor).
 * Mouse / trackpad only — touch devices keep their native behaviour.
 */
const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || !hasFinePointer() || prefersReducedMotion()) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.45, ease: "power3.out" });
    let mode = "";
    let shown = false;

    const setMode = (next: string, label = "") => {
      if (next === mode && (next !== "label" || labelRef.current?.textContent === label)) return;
      mode = next;
      if (labelRef.current) labelRef.current.textContent = label;
      dot.dataset.mode = next;
      gsap.to(dot, {
        scale: next === "label" ? 1 : next === "hover" ? 0.45 : 0.14,
        duration: 0.5,
        ease: "expo.out",
      });
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        gsap.set(dot, { x: e.clientX, y: e.clientY });
        shown = true;
        setMode("idle");
      }
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as Element;
      const labelled = target.closest?.("[data-cursor]") as HTMLElement | null;
      const interactive = target.closest?.(INTERACTIVE) as HTMLElement | null;
      // A button inside a labelled area (e.g. gallery arrows inside "Drag")
      // gets the plain hover ring, so the big label never covers it.
      const nestedControl = interactive && labelled && interactive !== labelled && labelled.contains(interactive);
      if (labelled?.dataset.cursor && !nestedControl) setMode("label", labelled.dataset.cursor);
      else if (interactive) setMode("hover");
      else setMode("idle");
    };
    const leave = () => {
      shown = false;
      mode = "";
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="cursor fixed top-0 left-0 z-[150] pointer-events-none hidden [@media(hover:hover)_and_(pointer:fine)]:flex w-24 h-24 rounded-full items-center justify-center bg-main text-brand-navy transition-[background-color,border-color] duration-300 [&[data-mode=hover]]:bg-main/15 [&[data-mode=hover]]:border [&[data-mode=hover]]:border-main"
      style={{ transform: "scale(0)" }}
    >
      <span
        ref={labelRef}
        className="text-sm font-medium opacity-0 transition-opacity duration-300 [[data-mode=label]_&]:opacity-100"
      />
    </div>
  );
};

export default Cursor;
