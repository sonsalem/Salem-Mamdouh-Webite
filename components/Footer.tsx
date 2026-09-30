"use client";

import { BRAND_NAME, BRAND_NAME_AR, NAV_LINKS } from "@/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

const Footer = () => {
  const t = useTranslations("footer");
  const tn = useTranslations("navbar");
  const { locale } = useParams();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-brand-paper">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-12 items-end">
          <Link
            className="md:col-span-7 font-display-i text-[22vw] md:text-[12vw] leading-[0.8] tracking-tight hover:text-main transition-colors duration-500"
            href={`/${locale}`}
          >
            {locale == "en" ? BRAND_NAME.toLowerCase() : BRAND_NAME_AR}
          </Link>
          <ul className="md:col-span-5 grid grid-cols-2 gap-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link href={link.href === "/" ? `/${locale}` : `/${locale}/${link.href}`} className="roll">
                  <span>{tn(link.label)}</span>
                  <span className="text-main">{tn(link.label)}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/${locale}/contact`} className="roll">
                <span>{t("Contact Us")}</span>
                <span className="text-main">{t("Contact Us")}</span>
              </Link>
            </li>
          </ul>
        </div>

        <span className="block h-px bg-brand-paper/20 mt-10" />
        <div className="label flex flex-wrap justify-between gap-3 pt-4 text-brand-paper/70">
          <span>{t("Crated")}</span>
          <span>(©{year})</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
