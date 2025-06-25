"use client";

import supabase from "@/config/supabaseClients";
import type Skills from "@/types/skills";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import Loader from "./Loader";

const Skills = () => {
  const [skills, setSkills] = useState<Skills[]>([]);

  const { isLoading } = useQuery({
    queryFn: async (): Promise<Skills[]> => {
      const { data } = await supabase.from("skills").select("*").order("id");
      setSkills(data || []);
      return data || [];
    },
    queryKey: ["Skills"],
    gcTime: 1000 * 60,
  });

  return (
    <div className="flex items-center justify-center gap-4 md:gap-10 flex-wrap overflow-x-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        skills.map((skill) => (
          <div className="box disAos" data-aos="zoom-in" key={skill.id}>
            <Image src={skill.img} alt={skill.title} width={80} height={80} />
          </div>
        ))
      )}
    </div>
  );
};

export default Skills;
