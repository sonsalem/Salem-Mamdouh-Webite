import { skillsImgs } from "@/constants";
import Image from "next/image";
import React from "react";

const Skills = () => {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-10 flex-wrap">
      {skillsImgs.map((skill) => (
        <div className="box disAos" data-aos="zoom-in">
          <Image src={skill.src} alt={skill.src} width={80} height={80} />
        </div>
      ))}
    </div>
  );
};

export default Skills;
