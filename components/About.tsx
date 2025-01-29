"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const About = () => {
  const t = useTranslations("about");

  return (
    <div className="flex justify-between items-center flex-col-reverse md:flex-row gap-4 overflow-x-hidden">
      {/* Text */}
      <div
        data-aos="fade-right"
        className=" flex flex-col gap-4 leading-7 md:w-1/2"
      >
        <span>{t("passionate")}</span>
        <span>{t("specialize")}</span>
        <span>{t("experience")}</span>
      </div>

      {/* Image */}
      <div data-aos="fade-left" className="images">
        <Image
          src={`/about.png`}
          alt="about Image"
          width={500}
          height={500}
          className="max-w-[100%]"
        />
      </div>
    </div>
  );
};

export default About;
