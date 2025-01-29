"use client";

import { useTranslations } from "next-intl";
import { BRAND_NAME, NAV_LINKS } from "@/constants";
import { Globe, Menu } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import SmallMenu from "./SmallMenu";

const Navbar = () => {
  // Translation
  const t = useTranslations("navbar");

  // Change Language
  const pathName = usePathname();
  const { locale } = useParams();

  const router = useRouter();

  const changeLanguage = () => {
    if (pathName.startsWith("/en")) {
      const newPath = `/ar${pathName.slice(3)}`;
      router.replace(newPath);
    } else if (pathName.startsWith("/ar")) {
      const newPath = `/en${pathName.slice(3)}`;
      router.replace(newPath);
    }

    return null;
  };

  // Small Menu
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="p-4 fixed top-0 container z-50 left-1/2 -translate-x-1/2">
        <div className="p-6 flex items-center justify-between rounded-xl border border-[#0000001A] dark:border-[#FFFFFF1A] max-w-[1050px] mx-auto bg-[#f9f9f9b2] dark:bg-[#181b24b2] backdrop-blur-sm">
          {/* <div className="p-6 flex items-center justify-between rounded-xl border border-[#0000001A] dark:border-[#FFFFFF1A] max-w-[1050px] mx-auto bg-[#f9f9f9b2] dark:bg-[#1c1b1eF1] backdrop-blur-sm"> */}
          <div className="flex gap-6">
            <Link href={"/"} className="logo text-xl font-bold relative">
              {BRAND_NAME}
            </Link>

            <ul className="links lg:flex gap-6 hidden">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link href={`/${locale}/${link.href}`}>{t(link.label)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4 items-center">
            <div className="hidden md:flex gap-4 items-center">
              <div
                onClick={() => changeLanguage()}
                className="flex items-center gap-2 cursor-pointer"
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
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="lg:hidden cursor-pointer"
            >
              <Menu />
            </div>
          </div>
        </div>
      </div>
      <SmallMenu
        open={open}
        setOpen={setOpen}
        changeLanguage={changeLanguage}
      />
    </>
  );
};

export default Navbar;
