"use client";

import supabase from "@/config/supabaseClients";
import Description from "@/types/about";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGsap } from "@/lib/motion";
import Loader from "./Loader";
import Magnetic from "./motion/Magnetic";

const About = () => {
  const { locale } = useParams();
  const t = useTranslations("about");
  const rootRef = useRef<HTMLDivElement>(null);

  const { data: descriptions = [], isLoading: loadingAbout } = useQuery<Description[]>({
    queryKey: ["about"],
    queryFn: async () => {
      const { data } = await supabase.from("about").select("*").order("id");
      return data || [];
    },
    gcTime: 1000 * 60,
  });

  const texts = descriptions.map((desc) => (locale === "ar" ? desc.descriptions_ar : desc.descriptions_en).trim());
  const [statement, ...rest] = texts;

  useGsap(
    () => {
      const q = gsap.utils.selector(rootRef);

      // Statement: words brighten one by one as it scrolls through the viewport.
      gsap.fromTo(
        q("[data-word]"),
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: q("[data-statement]")[0], start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );

      // Supporting paragraphs + CV button rise in.
      gsap.from(q("[data-rise]"), {
        y: 40,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: { trigger: q("[data-rise]")[0], start: "top 88%" },
      });

      // Image: clip reveal from the bottom, then a slow parallax inside its frame.
      const frame = q("[data-frame]")[0];
      gsap.fromTo(
        frame,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: frame, start: "top 80%" } }
      );
      gsap.fromTo(
        q("[data-frame] img"),
        { yPercent: -8, scale: 1.18 },
        { yPercent: 8, scale: 1.08, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } }
      );
    },
    rootRef,
    [texts.length, locale]
  );

  return (
    <div ref={rootRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
      <div className="lg:col-span-7 flex flex-col gap-8">
        {loadingAbout ? (
          <Loader />
        ) : (
          <>
            {statement && (
              <p data-statement className="text-2xl sm:text-3xl lg:text-[2.6rem] leading-[1.25] font-medium tracking-tight">
                {statement.split(/\s+/).map((word, i) => (
                  <span key={i} data-word>
                    {word}{" "}
                  </span>
                ))}
              </p>
            )}
            <div className="grid sm:grid-cols-2 gap-6 text-muted leading-7">
              {rest.map((text, i) => (
                <p data-rise key={i}>
                  {text}
                </p>
              ))}
            </div>
          </>
        )}

        <div data-rise className="pt-2">
          <Magnetic>
            <a
              href="/Salem Mamdouh Salem CV.pdf"
              download
              data-cursor={t("cvCursor")}
              className="group relative inline-flex items-center justify-center w-36 h-36 md:w-40 md:h-40 rounded-full border border-ink/40 text-sm font-medium overflow-hidden"
            >
              <span className="absolute inset-0 bg-main translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-500 ease-expo rounded-full" />
              <span className="relative flex flex-col items-center gap-1 group-hover:text-brand-navy transition-colors">
                {t("cv")}
                <span aria-hidden="true" className="text-lg">
                  ↓
                </span>
              </span>
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="lg:col-span-5 lg:col-start-8">
        <div data-frame className="relative overflow-hidden aspect-[4/5] bg-surface">
          <Image
            src="/about.png"
            alt={t("imageAlt")}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-contain will-change-transform"
          />
        </div>
        <p className="label mt-3 text-muted flex justify-between">
          <span>({t("imageLabel")})</span>
          <span>{t("location")}</span>
        </p>
      </div>
    </div>
  );
};

export default About;
