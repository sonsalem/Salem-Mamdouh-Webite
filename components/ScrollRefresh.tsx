"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/motion";

/**
 * Keeps every ScrollTrigger accurate: content here loads asynchronously from
 * Supabase, so whenever the page height changes the trigger positions are
 * recalculated.
 */
const ScrollRefresh = () => {
  const pathname = usePathname();

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

  return null;
};

export default ScrollRefresh;
