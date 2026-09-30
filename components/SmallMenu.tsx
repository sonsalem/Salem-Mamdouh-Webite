"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Full-screen mobile menu on the orange canvas. Big links slide up from their
 * masks when it opens; Escape or the close button dismisses it.
 */
const SmallMenu = ({
  open,
  setOpen,
  changeLanguage,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  changeLanguage: () => void;
}) => {
  // Translation
  const t = useTranslations("navbar");

  const { locale } = useParams();
  const pathName = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const links = panel.querySelectorAll("[data-menu-link]");
    const extras = panel.querySelectorAll("[data-menu-extra]");

    if (prefersReducedMotion()) {
      gsap.set(panel, { autoAlpha: open ? 1 : 0, yPercent: 0 });
      gsap.set([links, extras], { yPercent: 0, autoAlpha: 1 });
      return;
    }

    if (open) {
      gsap
        .timeline()
        .set(panel, { autoAlpha: 1 })
        .fromTo(panel, { yPercent: -100 }, { yPercent: 0, duration: 0.8, ease: "expo.inOut" })
        .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: "expo.out" }, "<0.45")
        .fromTo(extras, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 }, "<0.2");
    } else {
      gsap.to(panel, { yPercent: -100, duration: 0.6, ease: "expo.inOut", onComplete: () => void gsap.set(panel, { autoAlpha: 0 }) });
    }
  }, [open]);

  // Lock page scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t("Menu")}
      aria-hidden={!open}
      className="fixed inset-0 z-[130] bg-main text-brand-navy flex flex-col px-4 md:px-8 pt-5 pb-8 lg:hidden"
      style={{ visibility: "hidden" }}
    >
      <div className="flex justify-between items-center h-11">
        <span className="label">({t("Menu")})</span>
        <button type="button" onClick={() => setOpen(false)} className="text-sm font-medium uppercase tracking-wide h-9">
          {t("Close")}
        </button>
      </div>

      <span className="rule-ink mt-4" />

      <ul className="flex flex-col mt-6">
        {NAV_LINKS.map((link, i) => {
          const href = link.href === "/" ? `/${locale}` : `/${locale}/${link.href}`;
          return (
            <li key={link.key} className="overflow-hidden border-b border-brand-navy/30">
              <Link
                data-menu-link
                onClick={() => setOpen(false)}
                href={href}
                aria-current={pathName === href ? "page" : undefined}
                className="flex items-baseline gap-3 py-3 font-display-i text-[13vw] sm:text-7xl leading-none"
              >
                <span className="label not-italic font-sans">0{i + 1}</span>
                {t(link.label)}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-4">
        <button data-menu-extra type="button" onClick={() => changeLanguage()} className="text-sm font-medium underline underline-offset-4">
          {t("Arabic")}
        </button>
        <Link
          data-menu-extra
          onClick={() => setOpen(false)}
          href={`/${locale}/contact`}
          className="bg-brand-navy text-brand-paper px-6 h-12 inline-flex items-center rounded-full text-sm font-medium"
        >
          {t("Contact Us")}
        </Link>
      </div>
    </div>
  );
};

export default SmallMenu;
