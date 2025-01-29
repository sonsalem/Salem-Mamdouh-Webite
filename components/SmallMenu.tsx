"use client";
import { useParams } from "next/navigation";
import { Globe, X } from "lucide-react";
import React from "react";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import { useTranslations } from "next-intl";

const SmallMenu = ({
  open,
  setOpen,
  changeLanguage,
}: {
  open: boolean;
  setOpen: any;
  changeLanguage: any;
}) => {
  // Translation
  const t = useTranslations("navbar");

  const { locale } = useParams();

  const WIDTH_MENU = 280;
  const degree = open ? "0" : `-${WIDTH_MENU}px`;

  return (
    <>
      <div
        className={`bg-[#000000A1] w-full h-full fixed top-0 left-0 transition-all duration-100 ${
          open ? "z-50" : "-z-[100] opacity-0"
        }`}
      ></div>
      <div
        className={`fixed top-0 bg-[#f9f9f9] pt-16 px-3 dark:bg-dark-200 h-[100vh] z-50 transition-all duration-300`}
        style={{
          [locale === "en" ? "right" : "left"]: degree,
          width: `${WIDTH_MENU}px`,
        }}
      >
        <X
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <ul className="flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link
                href={`/${locale}/${link.href}`}
                className="bg-white dark:bg-dark-300 block px-4 py-3 rounded-md"
              >
                {t(link.label)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="h-[1px] bg-gray-500 my-5"></div>
        <div className="flex flex-col gap-3">
          <div
            onClick={() => changeLanguage()}
            className="flex items-center gap-2 cursor-pointer bg-white dark:bg-dark-300 px-4 py-3 rounded-md"
          >
            <Globe size={18} className="relative" />
            {t("Arabic")}
          </div>
          <Link
            href={`/${locale}/contact`}
            className="bg-light-200 text-dark-text px-4 py-[7px] rounded-md dark:bg-dark-100 dark:text-light-text"
          >
            {t("Contact Us")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default SmallMenu;
