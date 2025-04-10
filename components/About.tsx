"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
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
        <Link
          href="Salem Mamdouh Salem CV.pdf"
          download
          className="rounded-lg w-fit px-4  py-2 border-[1px] border-light-gray-200 block transition-all duration-300 hover:bg-dark-200 hover:text-white
          dark:hover:bg-white dark:hover:text-dark-200"
        >
          {t("download")}
        </Link>
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
