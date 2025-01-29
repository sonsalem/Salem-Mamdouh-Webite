"use client";
import { useEffect, useRef } from "react";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // Add mousemove event listener
    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        // Update cursor position
        cursor.style.top = `${e.pageY - window.scrollY}px`;
        cursor.style.left = `${e.pageX - window.scrollX}px`;
      }
    };

    // Attach event listener
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor w-[40px] h-[40px] border border-dark-gray-200 -translate-x-1/2 -translate-y-1/2 rounded-full fixed pointer-events-none z-[1000000000000000000000000] transition-all duration-100 ease-linear hidden sm:block"
    />
  );
};

export default Cursor;
