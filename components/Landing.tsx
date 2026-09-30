"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { EXPO, gsap, onIntroDone, useGsap } from "@/lib/motion";
import SplitText from "./motion/SplitText";

/**
 * Hero — a full-screen orange canvas with an editorial hairline grid and the
 * role set huge in mixed type (italic serif + outlined sans), after the
 * reference's "web design+ front end".
 */
const Landing = () => {
  const t = useTranslations("hero");
  const { locale } = useParams();
  const rootRef = useRef<HTMLElement>(null);

  useGsap(
    () => {
      const q = gsap.utils.selector(rootRef);
      const rtl = locale === "ar";

      // ---- Intro (waits for the loader) --------------------------------
      gsap.set(q("[data-rule-x]"), { scaleX: 0 });
      gsap.set(q("[data-rule-y]"), { scaleY: 0 });

      const intro = gsap.timeline({ paused: true, defaults: { ease: EXPO } });
      intro
        .to(q("[data-rule-x]"), { scaleX: 1, duration: 1.6, stagger: 0.12, ease: "expo.inOut" })
        .to(q("[data-rule-y]"), { scaleY: 1, duration: 1.6, ease: "expo.inOut" }, "<")
        .to(q(".hero-title .split-inner"), { y: 0, yPercent: 0, duration: 1.3, stagger: 0.035 }, "<0.25")
        .fromTo(
          q("[data-intro]"),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06, ease: "power3.out" },
          "<0.5"
        )
        .fromTo(q("[data-scroll-line]"), { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: "expo.inOut" }, "<0.2");

      const stopWaiting = onIntroDone(() => intro.play());

      // ---- Scroll: the two title lines drift apart, labels lift away ----
      const scrub = { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 0.8 };
      gsap.to(q("[data-drift='a']"), { xPercent: rtl ? 12 : -12, ease: "none", scrollTrigger: scrub });
      gsap.to(q("[data-drift='b']"), { xPercent: rtl ? -8 : 8, ease: "none", scrollTrigger: scrub });
      gsap.to(q("[data-lift]"), { yPercent: -60, ease: "none", scrollTrigger: scrub });
      gsap.to(q("[data-rail]"), { yPercent: -30, ease: "none", scrollTrigger: scrub });

      // Looping "scroll down" line.
      gsap.fromTo(
        q("[data-scroll-dot]"),
        { yPercent: -100 },
        { yPercent: 400, duration: 1.6, ease: "power2.inOut", repeat: -1, delay: 2 }
      );

      return stopWaiting;
    },
    rootRef,
    [locale]
  );

  const year = new Date().getFullYear();

  return (
    <section
      ref={rootRef}
      data-hero
      className="relative min-h-[100svh] bg-main text-brand-navy overflow-hidden flex flex-col"
    >
      {/* Vertical side rail (desktop) */}
      <div
        data-rail
        className="hidden lg:flex absolute start-0 inset-y-0 w-12 xl:w-14 flex-col items-center justify-center border-e border-brand-navy/30"
        aria-hidden="true"
      >
        <span className="label [writing-mode:vertical-rl] rotate-180 tracking-[0.3em] uppercase whitespace-nowrap">
          {t("rail")} — ©{year}
        </span>
      </div>

      {/* Vertical hairline (desktop) */}
      <span
        data-rule-y
        className="hidden md:block absolute top-0 bottom-0 end-[28%] w-px bg-brand-navy/25 origin-top"
      />

      <div className="relative flex-1 flex flex-col px-4 md:px-8 lg:ps-20 xl:ps-24 lg:pe-10 pt-24 md:pt-28 pb-16 md:pb-24">
        {/* Top labels — the rules live in the flow, so they can never cross text. */}
        <div data-lift>
          <div className="flex items-start justify-between gap-6 pb-5 md:pb-6">
            <p data-intro className="label max-w-[16rem] leading-relaxed">
              <span className="block">{t("hi")}</span>
              <span className="block font-medium text-sm sm:text-base">{t("name")}</span>
            </p>
            <p data-intro className="font-display-i text-2xl md:text-4xl">(©{year})</p>
          </div>
          <span data-rule-x className="rule-ink" />
        </div>

        {/* Title */}
        <h1 className="hero-title my-auto py-8 leading-[0.86] tracking-tight">
          <span className="sr-only">
            {t("name")} — {t("line1a")}
            {t("line1b")} {t("line2")}
          </span>
          <span aria-hidden="true" className="block" data-drift="a">
            <SplitText text={t("line1a")} className="font-display-i text-[25vw] md:text-[19vw] lg:text-[17vw]" />
            <SplitText
              text={t("line1b")}
              className="text-outline-ink font-medium text-[21vw] md:text-[16vw] lg:text-[14.5vw]"
            />
          </span>
          <span aria-hidden="true" className="flex items-end gap-4 md:gap-8 ps-[6vw] md:ps-[16vw]" data-drift="b">
            <SplitText text={t("line2")} className="font-medium text-[14vw] md:text-[11vw] lg:text-[10vw]" />
          </span>
        </h1>

        {/* Bottom index: role / stack / base, then the scroll cue */}
        <div>
          <span data-rule-x className="rule-ink" />
          <div className="pt-4 md:pt-5 flex items-end justify-between gap-6">
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 lg:gap-x-14 gap-y-3 flex-1 max-w-3xl">
              {([1, 2, 3] as const).map((n) => (
                <div key={n} data-intro className="flex sm:block items-baseline gap-3">
                  <dt className="label opacity-70 shrink-0 w-24 whitespace-nowrap sm:w-auto sm:mb-1">
                    (0{n}) {t(`metaLabel${n}`)}
                  </dt>
                  <dd className="text-sm md:text-base font-medium leading-snug">{t(`meta${n}`)}</dd>
                </div>
              ))}
            </dl>

            <Link
              href={`/${locale}#about`}
              data-cursor={t("scrollCursor")}
              className="group hidden sm:flex flex-col items-center gap-3 shrink-0"
              aria-label={t("scroll")}
            >
              <span data-intro className="label whitespace-nowrap">
                {t("scroll")}
              </span>
              <span data-scroll-line className="relative block w-px h-14 md:h-16 bg-brand-navy/30 overflow-hidden origin-top">
                <span data-scroll-dot className="absolute inset-x-0 top-0 h-1/4 bg-brand-navy" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
