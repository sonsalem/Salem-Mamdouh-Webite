"use client";

import supabase from "@/config/supabaseClients";
import type Experience from "@/types/experience";
import type { Position } from "@/types/experience";
import { useQuery } from "@tanstack/react-query";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGsap } from "@/lib/motion";
import Loader from "./Loader";

// Months are stored as "YYYY-MM" strings (same format as the dashboard).
const currentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

const monthsBetween = (start: string, end: string) => {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end.split("-").map(Number);
  return Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
};

/** Ongoing roles first, then by end, then by start. */
const sortPositions = (positions: Position[]) =>
  [...positions].sort(
    (a, b) => (b.end ?? "9999-99").localeCompare(a.end ?? "9999-99") || b.start.localeCompare(a.start)
  );

const latestMonth = (experience: Experience) =>
  experience.positions.reduce((max, p) => ((p.end ?? "9999-99") > max ? p.end ?? "9999-99" : max), "");

/** Earliest start → latest end (null while any role is ongoing). */
const experienceSpan = (positions: Position[]) => {
  if (!positions.length) return null;
  const start = positions.reduce((min, p) => (p.start < min ? p.start : min), positions[0].start);
  const current = positions.some((p) => p.end === null);
  const end = current ? null : positions.reduce((max, p) => ((p.end ?? "") > max ? p.end! : max), "");
  return { start, end };
};

/**
 * One connected timeline through every company. The line fills with orange as
 * you scroll (scrubbed), and each logo / position node lights up as the fill
 * reaches it.
 */
const Experiences = () => {
  const t = useTranslations("experiences");
  const format = useFormatter();
  const rootRef = useRef<HTMLDivElement>(null);

  const { data: experiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data, error } = await supabase.from("experiences").select("*");

      if (error) {
        console.error("Error fetching experiences:", error.message);
        return [];
      }

      return (data || [])
        .map((row) => ({
          ...row,
          positions: sortPositions(Array.isArray(row.positions) ? row.positions : []),
        }))
        .sort((a, b) => latestMonth(b).localeCompare(latestMonth(a)));
    },
    gcTime: 1000 * 60,
  });

  useGsap(
    () => {
      const q = gsap.utils.selector(rootRef);
      const line = q("[data-line]")[0];
      if (!line) return;

      gsap.fromTo(
        line,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: line, start: "top 60%", end: "bottom 60%", scrub: 0.6 } }
      );

      q("[data-node]").forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "center 60%",
          toggleClass: { targets: node, className: "is-lit" },
        });
      });

      // Rows slide in from the line.
      q("[data-row]").forEach((row) => {
        gsap.from(row, {
          x: document.dir === "rtl" ? -40 : 40,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        });
      });
    },
    rootRef,
    [experiences.length]
  );

  const month = (value: string) =>
    format.dateTime(new Date(`${value}-01T00:00:00Z`), { month: "short", year: "numeric", timeZone: "UTC" });

  const period = (start: string, end: string | null) => `${month(start)} – ${end ? month(end) : t("Present")}`;

  const duration = (start: string, end: string | null) => {
    const total = monthsBetween(start, end ?? currentMonth());
    const years = Math.floor(total / 12);
    const months = total % 12;
    return [years && t("years", { count: years }), months && t("months", { count: months })].filter(Boolean).join(" ");
  };

  if (isLoading) return <Loader />;

  return (
    // overflow-x-clip: rows start offset sideways before they reveal, and that
    // must not widen the page on mobile.
    <div ref={rootRef} className="relative overflow-x-clip">
      {/* Track + scrubbed fill. Centred on the 56px node column. */}
      <div className="absolute start-[27px] top-7 bottom-10 w-px bg-line/20" />
      <div data-line className="absolute start-[27px] top-7 bottom-10 w-px bg-main origin-top" />

      <div className="flex flex-col gap-16 md:gap-24">
        {experiences.map((experience, e) => {
          const span = experienceSpan(experience.positions);

          return (
            <section key={experience.id}>
              {/* Company */}
              <div data-row className="grid grid-cols-[56px_1fr] gap-x-5 md:gap-x-8 items-center">
                <div
                  data-node
                  className="relative z-10 w-14 h-14 rounded-full p-2 bg-surface border border-line/20 transition-[border-color,transform] duration-500 [&.is-lit]:border-main [&.is-lit]:scale-110"
                >
                  <Image
                    src={experience.logo}
                    alt={experience.company}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                  <div>
                    <span className="label text-muted">({String(e + 1).padStart(2, "0")})</span>
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium uppercase tracking-tight leading-none">
                      {experience.company}
                    </h3>
                  </div>
                  {span && (
                    <span className="font-display-i text-xl md:text-2xl text-muted">
                      ({duration(span.start, span.end)})
                    </span>
                  )}
                </div>
              </div>
              {experience.description && (
                <p data-row className="ms-[76px] md:ms-[88px] mt-3 text-muted max-w-2xl">
                  {experience.description}
                </p>
              )}

              {/* Positions, on the same line */}
              <div className="mt-6 md:mt-8 flex flex-col">
                {experience.positions.map((position) => {
                  const current = position.end === null;

                  return (
                    <div key={position.id} data-row className="grid grid-cols-[56px_1fr] gap-x-5 md:gap-x-8">
                      <div className="relative flex justify-center pt-7">
                        <span
                          data-node
                          className={`relative z-10 w-3 h-3 rounded-full ring-4 ring-canvas transition-colors duration-500 [&.is-lit]:bg-main ${
                            current ? "bg-main" : "bg-line/30"
                          }`}
                        >
                          {current && <span className="absolute inset-0 rounded-full bg-main animate-ping opacity-60" />}
                        </span>
                      </div>

                      <div className="group border-t border-line/20 py-6 grid md:grid-cols-12 gap-x-6 gap-y-2">
                        <div className="md:col-span-5">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-lg font-medium transition-colors duration-300 group-hover:text-main">
                              {position.title}
                            </span>
                            {current && (
                              <span className="label px-2 py-0.5 bg-main text-brand-navy">{t("Current")}</span>
                            )}
                          </div>
                          <div className="label mt-1 text-muted">
                            <span dir="ltr">{period(position.start, position.end)}</span>
                            {" · "}
                            {duration(position.start, position.end)}
                          </div>
                        </div>
                        {position.description && (
                          <p className="md:col-span-7 text-sm leading-6 text-muted">{position.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Experiences;
