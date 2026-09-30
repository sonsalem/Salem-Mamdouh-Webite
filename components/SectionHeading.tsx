"use client";

import { useRef } from "react";
import { useGsap } from "@/lib/motion";
import { revealRules, revealSplit } from "./motion/reveals";
import SplitText from "./motion/SplitText";

/**
 * Editorial section header: a hairline that draws in, a "(01)" index and a
 * parenthetical label, then the title set huge in italic serif with its
 * letters sliding up from a mask.
 */
const SectionHeading = ({
  index,
  label,
  title,
  className = "",
  as = "h2",
}: {
  index: string;
  label: string;
  title: string;
  className?: string;
  as?: "h1" | "h2";
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      const root = rootRef.current!;
      revealRules(root.querySelectorAll(".rule"), root);
      revealSplit(root.querySelector(".split"), { trigger: root, start: "top 85%" });
    },
    rootRef,
    [title]
  );

  return (
    <div ref={rootRef} className={`mb-12 md:mb-20 ${className}`}>
      <span className="rule" />
      <div className="label flex justify-between pt-3 text-muted">
        <span>({index})</span>
        <span>({label})</span>
      </div>
      <SplitText
        as={as}
        text={title}
        className="block mt-4 md:mt-6 font-display-i text-[16vw] md:text-[11vw] lg:text-[9rem] leading-[0.9] tracking-tight"
      />
    </div>
  );
};

export default SectionHeading;
