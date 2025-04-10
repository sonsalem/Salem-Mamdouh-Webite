"use client";

import { BRAND_NAME, BRAND_NAME_AR } from "@/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

const Footer = () => {
  const t = useTranslations("footer");
  const { locale } = useParams();
  return (
    <>
      <div className="container px-4 md:px-8 lg:px-16 xl:px-32 mx-auto overflow-x-hidden">
        <div className="border-t-2 border-[#0000001A] dark:border-[#FFFFFF1A] flex items-center justify-between py-10">
          <Link className="font-bold text-xl" href={`/${locale}`}>
            {locale == "en" ? BRAND_NAME : BRAND_NAME_AR}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="bg-light-200 text-dark-text px-4 py-[7px] rounded-md dark:bg-dark-100 dark:text-light-text"
          >
            {t("Contact Us")}
          </Link>
        </div>
      </div>
      <p className="bg-[#f9f9f9] dark:bg-dark-200 p-5 text-center px-4">
        {t("Crated")}
      </p>
    </>
  );
};

export default Footer;
