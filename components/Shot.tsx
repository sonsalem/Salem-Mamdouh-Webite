"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A 16:9 window onto a screenshot shown at full width, never cropped sideways.
 * Long (full-page) shots start at the top and scroll to the bottom while the
 * nearest `group/shots` is hovered, at a steady reading speed; shorter ones
 * sit centred.
 */
const Shot = ({ src, alt, sizes, eager }: { src: string; alt: string; sizes: string; eager?: boolean }) => {
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
        sizes={sizes}
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        onLoad={measure}
        style={
          {
            "--shot-shift": `-${overflow}px`,
            "--shot-time": `${Math.max(3, overflow / 120)}s`,
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

export default Shot;
