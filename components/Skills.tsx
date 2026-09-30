"use client";

import supabase from "@/config/supabaseClients";
import type Skills from "@/types/skills";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGsap } from "@/lib/motion";
import Loader from "./Loader";
import { revealBatch } from "./motion/reveals";

/** Skills as an editorial hairline grid; each cell floods orange on hover. */
const Skills = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  const { data: skills = [], isLoading } = useQuery<Skills[]>({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await supabase.from("skills").select("*").order("id");
      return data || [];
    },
    gcTime: 1000 * 60,
  });

  useGsap(
    () => {
      revealBatch(gsap.utils.toArray<Element>("[data-skill]", rootRef.current), { y: 40, stagger: 0.05 });
    },
    rootRef,
    [skills.length]
  );

  if (isLoading) return <Loader />;

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 border-t border-s border-line/20"
    >
      {skills.map((skill, i) => (
        <div
          key={skill.id}
          data-skill
          className="group relative aspect-square border-e border-b border-line/20 flex flex-col items-center justify-center gap-3 overflow-hidden"
        >
          <span className="absolute inset-0 bg-main translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
          <span className="label absolute top-2 start-2 text-muted group-hover:text-brand-navy transition-colors">
            ({String(i + 1).padStart(2, "0")})
          </span>
          <Image
            src={skill.img}
            alt={skill.title}
            width={64}
            height={64}
            className="relative w-10 h-10 md:w-14 md:h-14 object-contain transition-transform duration-500 ease-expo group-hover:scale-110 group-hover:-rotate-6"
          />
          <span className="relative label text-center px-1 group-hover:text-brand-navy transition-colors">
            {skill.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Skills;
