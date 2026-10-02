"use client";

import supabase from "@/config/supabaseClients";
import Description from "@/types/about";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { CV_DOWNLOAD_NAME, CV_PATH } from "@/constants";
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
    },
    rootRef,
    [texts.length, locale]
  );

  return (
    <div ref={rootRef} className="flex flex-col gap-12 md:gap-16">
      {loadingAbout ? (
        <Loader />
      ) : (
        statement && (
          <p
            data-statement
            className="max-w-6xl text-3xl/[1.25] sm:text-4xl/[1.2] lg:text-[3.4rem]/[1.15] font-medium tracking-tight"
          >
            {statement.split(/\s+/).map((word, i) => (
              <span key={i} data-word>
                {word}{" "}
              </span>
            ))}
          </p>
        )
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 border-t border-line/20 pt-8 md:pt-10">
        <div className="lg:col-span-4 flex items-start justify-between gap-8 lg:flex-col lg:justify-start">
          <p data-rise className="label text-muted">
            ({t("basedLabel")})
            <span className="block mt-1 text-base font-medium text-ink">{t("location")}</span>
          </p>

          <div data-rise>
            <Magnetic>
              <a
                href={CV_PATH}
                download={CV_DOWNLOAD_NAME}
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

        {!loadingAbout && (
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6 lg:gap-10 text-muted leading-7 lg:text-lg lg:leading-8">
            {rest.map((text, i) => (
              <p data-rise key={i}>
                {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
