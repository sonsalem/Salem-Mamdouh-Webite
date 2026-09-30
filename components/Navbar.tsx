"use client";

import { useTranslations } from "next-intl";
import { BRAND_NAME, BRAND_NAME_AR, NAV_LINKS } from "@/constants";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, onIntroDone, ScrollTrigger, useGsap } from "@/lib/motion";
import SmallMenu from "./SmallMenu";
import ThemeSwitch from "./ThemeSwitch";

/** Text that rolls up to a copy of itself on hover. */
const Roll = ({ children }: { children: string }) => (
  <span className="roll">
    <span>{children}</span>
    <span aria-hidden="true">{children}</span>
  </span>
);

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

    setOpen(false);

    return null;
  };

  // Small Menu
  const [open, setOpen] = useState<boolean>(false);

  // Over the orange hero until the page is scrolled.
  const onHome = pathName === `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 40,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => st.kill();
  }, []);

  useGsap(
    () => {
      const bar = barRef.current!;
      // Intro: nav items drop in once the loader has lifted.
      const items = bar.querySelectorAll("[data-nav-item]");
      gsap.set(items, { yPercent: -120, autoAlpha: 0 });
      const stop = onIntroDone(() =>
        gsap.to(items, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.06, ease: "expo.out", delay: 0.5 })
      );

      // Hide while scrolling down, reveal on the way back up.
      const show = gsap.quickTo(bar, "yPercent", { duration: 0.5, ease: "power3.out" });
      const st = ScrollTrigger.create({
        start: 120,
        end: "max",
        onUpdate: (self) => show(self.direction === 1 ? -110 : 0),
        onLeaveBack: () => show(0),
      });

      return () => {
        stop();
        st.kill();
      };
    },
    barRef,
    []
  );

  const solid = scrolled || !onHome;

  return (
    <>
      <header
        ref={barRef}
        className={`fixed top-0 inset-x-0 z-[100] transition-[background-color,color,border-color] duration-500 border-b ${
          solid ? "bg-canvas/85 backdrop-blur-md text-ink border-line/15" : "bg-transparent text-brand-navy border-transparent"
        }`}
      >
        <nav className="flex items-center justify-between gap-6 h-16 md:h-20 px-4 md:px-8 lg:px-16 xl:px-24">
          <Link data-nav-item href={`/${locale}`} className="text-lg md:text-xl font-semibold tracking-tight">
            <Roll>{locale == "en" ? BRAND_NAME : BRAND_NAME_AR}</Roll>
          </Link>

          <ul className="hidden lg:flex items-center gap-8 text-sm">
            {NAV_LINKS.map((link, i) => {
              const href = link.href === "/" ? `/${locale}` : `/${locale}/${link.href}`;
              const active = pathName === href;
              return (
                <li key={link.key} data-nav-item>
                  <Link href={href} className="flex items-baseline gap-1" aria-current={active ? "page" : undefined}>
                    <span className={`label ${active ? "" : "opacity-60"}`}>{active ? "●" : `0${i + 1}`}</span>
                    <Roll>{t(link.label)}</Roll>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex gap-1 md:gap-3 items-center">
            <div data-nav-item>
              <ThemeSwitch />
            </div>
            <button
              data-nav-item
              type="button"
              onClick={() => changeLanguage()}
              className="hidden md:inline-flex h-9 px-3 items-center text-sm"
            >
              <Roll>{t("Arabic")}</Roll>
            </button>
            <Link
              data-nav-item
              href={`/${locale}/contact`}
              className={`hidden md:inline-flex h-10 px-5 items-center rounded-full text-sm font-medium transition-colors duration-300 ${
                solid ? "bg-main text-brand-navy hover:bg-ink hover:text-canvas" : "bg-brand-navy text-brand-paper hover:bg-brand-paper hover:text-brand-navy"
              }`}
            >
              <Roll>{t("Contact Us")}</Roll>
            </Link>
            <button
              data-nav-item
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="lg:hidden h-9 px-2 text-sm font-medium uppercase tracking-wide"
            >
              {t("Menu")}
            </button>
          </div>
        </nav>
      </header>
      <SmallMenu open={open} setOpen={setOpen} changeLanguage={changeLanguage} />
    </>
  );
};

export default Navbar;
