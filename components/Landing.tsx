"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

const Landing = () => {
  // Translation
  const t = useTranslations("landing");

  // ANimating Text
  const originalText = t(`I'm Front End Developer`);

  const [displayText, setDisplayText] = useState<string>("");
  const [index, setIndex] = useState<number>(originalText.length - 1);
  const [removing, setRemoving] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (removing) {
        if (index >= 3) {
          setDisplayText(originalText.slice(0, index));
          setIndex((prev) => prev - 1);
        } else {
          setRemoving(false);
          setIndex(3);
        }
      } else {
        if (index <= originalText.length) {
          setDisplayText(originalText.slice(0, index));
          setIndex((prev) => prev + 1);
        } else {
          setRemoving(true);
          setIndex(originalText.length - 1);
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, [index, removing]);

  return (
    <div className="box flex flex-col justify-center items-center overflow-x-hidden">
      {/* TEXTS */}
      <div className="texts text-center mx-auto w-full mb-4" data-aos="zoom-in">
        <div className="text-light-gray-200 dark:text-dark-gray-200 mb-2">
          {t("Hi I'm")}
        </div>
        <div className="text-2xl text-light-gray-200 dark:text-dark-gray-200 mb-2">
          {t("Salem Mamdouh Salem")}
        </div>
        <div
          className={`relative text-5xl md:text-7xl mx-auto py-3 max-w-[640px] min-h-[180px] font-bold bg-gradient-to-br from-light-text dark:from-dark-text to-light-gray-200 dark:to-dark-gray-200 bg-clip-text text-transparent`}
        >
          <span>{displayText}</span>
          <span className="CurrserText ms-2 h-14 w-2 bg-light-gray-200 dark:bg-dark-gray-200 inline-block"></span>
        </div>
      </div>
      {/* Mouse */}
      <Link
        href="#about"
        className="block w-[30px] h-[50px] border-2 border-light-gray-200 rounded-full relative cursor-pointer"
      >
        <div className="dash w-1 h-4 bg-light-gray-200 absolute left-1/2 -translate-x-1/2 rounded-full cursor-animation"></div>
      </Link>
    </div>
  );
};

export default Landing;
