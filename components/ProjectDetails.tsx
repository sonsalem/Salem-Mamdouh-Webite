"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { EXPO, gsap, useGsap } from "@/lib/motion";
import { projectHref, useProjects } from "@/lib/projects";
import Loader from "./Loader";
import Magnetic from "./motion/Magnetic";
import { revealSplit } from "./motion/reveals";
import SplitText from "./motion/SplitText";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A single project: huge title, an overview + facts index, the cover image,
 * the rest of the screenshots in an editorial grid (each clip-revealed with a
 * slow parallax), and a big orange "next project" link to keep browsing.
 */
const ProjectDetails = ({ id }: { id: number }) => {
  const t = useTranslations("project");
  const tp = useTranslations("projects");
  const { locale } = useParams();
  const loc = String(locale);
  const arrow = loc === "ar" ? "←" : "→";
  const rootRef = useRef<HTMLDivElement>(null);

  const { data: projects = [], isLoading } = useProjects();
  const index = projects.findIndex((p) => p.id === id);
  const project = index >= 0 ? projects[index] : undefined;
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;

  useGsap(
    () => {
      const q = gsap.utils.selector(rootRef);

      // Title letters rise on arrival (no scroll needed), then the facts.
      revealSplit(q("[data-title]")[0], { trigger: null, delay: 0.35, stagger: 0.025 });
      gsap.from(q("[data-fade]"), { y: 30, autoAlpha: 0, duration: 1, stagger: 0.08, delay: 0.6, ease: "power3.out" });
      gsap.fromTo(q("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut", stagger: 0.1, delay: 0.3 });

      // Every screenshot: clip reveal from the bottom + parallax inside the frame.
      q("[data-shot]").forEach((shot) => {
        gsap.fromTo(
          shot,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: { trigger: shot, start: "top 85%" } }
        );
        gsap.fromTo(
          shot.querySelector("img"),
          { yPercent: -6, scale: 1.14 },
          { yPercent: 6, scale: 1.04, ease: "none", scrollTrigger: { trigger: shot, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });

      // Next project: title letters rise, then drift with the scroll.
      const nextEl = q("[data-next]")[0];
      if (nextEl) {
        revealSplit(nextEl.querySelector(".split"), { trigger: nextEl, start: "top 75%" });
        gsap.fromTo(
          nextEl.querySelector("[data-drift]"),
          { xPercent: loc === "ar" ? -5 : 5 },
          {
            xPercent: loc === "ar" ? 5 : -5,
            ease: "none",
            scrollTrigger: { trigger: nextEl, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
    },
    rootRef,
    [project?.id, loc]
  );

  if (isLoading) {
    return (
      <div className="pt-40 pb-40">
        <Loader />
      </div>
    );
  }

  if (!project) {
    return (
      <section className="px-4 md:px-8 lg:px-16 xl:px-24 pt-40 pb-40 min-h-[70svh]">
        <p className="label text-muted">(404)</p>
        <h1 className="font-display-i text-6xl md:text-8xl mt-4">{t("notFound")}</h1>
        <Link href={`/${loc}/projects`} className="roll mt-10 text-main font-medium">
          <span>{t("back")}</span>
          <span>{t("back")}</span>
        </Link>
      </section>
    );
  }

  const [cover, ...shots] = project.images;

  return (
    <div ref={rootRef}>
      {/* ------------------------------------------------------------ Head */}
      <header className="px-4 md:px-8 lg:px-16 xl:px-24 pt-28 md:pt-36">
        <div className="flex items-center justify-between gap-4 mb-4">
          <Link href={`/${loc}/projects`} className="roll label font-medium">
            <span>({loc === "ar" ? "→" : "←"} {t("all")})</span>
            <span className="text-main">({loc === "ar" ? "→" : "←"} {t("all")})</span>
          </Link>
          {project.new && <span className="label px-2 py-0.5 bg-main text-brand-navy font-medium">{tp("NEW")}</span>}
        </div>
        <span data-rule className="rule" />
        <div className="label flex justify-between pt-3 text-muted">
          <span dir="ltr">({pad(index + 1)} / {pad(projects.length)})</span>
          <span>({t("label")})</span>
        </div>

        <h1 data-title className="mt-6 md:mt-10 text-[13vw] md:text-[9vw] xl:text-[8.5rem] font-medium uppercase tracking-tight leading-[0.9]">
          <SplitText text={project.name} />
        </h1>

        {/* Overview + facts */}
        <div className="mt-12 md:mt-20 grid lg:grid-cols-12 gap-x-10 gap-y-12">
          <div className="lg:col-span-7">
            <p data-fade className="label text-muted mb-4">
              ({t("overview")})
            </p>
            <p data-fade dir="auto" className="text-2xl md:text-3xl lg:text-4xl leading-[1.3] font-medium tracking-tight">
              {project.features}
            </p>
          </div>

          <dl className="lg:col-span-4 lg:col-start-9 border-t border-line/20">
            <div data-fade className="py-4 border-b border-line/20">
              <dt className="label text-muted mb-2">({t("stack")})</dt>
              <dd className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="label px-2.5 py-1 border border-line/25">
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
            <div data-fade className="py-4 border-b border-line/20 flex justify-between items-baseline">
              <dt className="label text-muted">({t("screens")})</dt>
              <dd className="font-display-i text-2xl">{pad(project.images.length)}</dd>
            </div>
            {(project.liveDemo || project.github) && (
              <div data-fade className="py-4 border-b border-line/20">
                <dt className="label text-muted mb-3">({t("links")})</dt>
                <dd className="flex flex-wrap gap-3">
                  {project.liveDemo && (
                    <Magnetic>
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2 h-12 px-6 rounded-full bg-main text-brand-navy text-sm font-medium overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-brand-navy translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                        <span className="relative group-hover:text-brand-paper transition-colors">{tp("live")} ↗</span>
                      </a>
                    </Magnetic>
                  )}
                  {project.github && (
                    <Magnetic>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2 h-12 px-6 rounded-full border border-ink/40 text-sm font-medium overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-main translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                        <span className="relative group-hover:text-brand-navy transition-colors">{tp("code")} ↗</span>
                      </a>
                    </Magnetic>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      {/* ------------------------------------------------------------ Images */}
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 mt-16 md:mt-28 pb-24 md:pb-40">
        {cover && (
          <figure>
            <div data-shot className="relative overflow-hidden aspect-[16/10] md:aspect-[16/9] bg-surface">
              <Image
                src={cover}
                alt={`${project.name} — 1`}
                fill
                priority
                sizes="100vw"
                className="object-cover will-change-transform"
              />
            </div>
            <figcaption className="label text-muted mt-3 flex justify-between">
              <span dir="ltr">(01 / {pad(project.images.length)})</span>
              <span>{project.name}</span>
            </figcaption>
          </figure>
        )}

        {shots.length > 0 && (
          <div className="mt-10 md:mt-16 grid md:grid-cols-2 gap-x-6 gap-y-10 md:gap-y-16">
            {shots.map((src, i) => {
              // Rhythm: every third screenshot runs full width.
              const wide = i % 3 === 2 || (i === shots.length - 1 && i % 3 === 0);
              return (
                <figure key={src} className={wide ? "md:col-span-2" : ""}>
                  <div
                    data-shot
                    className={`relative overflow-hidden bg-surface ${wide ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"}`}
                  >
                    <Image
                      src={src}
                      alt={`${project.name} — ${i + 2}`}
                      fill
                      sizes={wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                      className="object-cover will-change-transform"
                    />
                  </div>
                  <figcaption dir="ltr" className="label text-muted mt-3 rtl:text-right">
                    ({pad(i + 2)} / {pad(project.images.length)})
                  </figcaption>
                </figure>
              );
            })}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------ Next */}
      {next && next.id !== project.id && (
        <section data-next className="bg-main text-brand-navy overflow-hidden">
          <Link
            href={projectHref(loc, next)}
            data-cursor={t("nextCursor")}
            className="group block px-4 md:px-8 lg:px-16 xl:px-24 pt-16 md:pt-24 pb-20 md:pb-32"
          >
            <span className="rule-ink" />
            <div className="label flex justify-between pt-3">
              <span>({t("next")})</span>
              <span dir="ltr">
                ({pad(((index + 1) % projects.length) + 1)} / {pad(projects.length)})
              </span>
            </div>
            <div data-drift className="mt-10 md:mt-16 flex items-end justify-between gap-6">
              <SplitText
                text={next.name}
                className="block text-[12vw] md:text-[8vw] font-medium uppercase tracking-tight leading-[0.9] text-outline-ink group-hover:text-brand-navy transition-colors duration-500"
              />
              <span className="shrink-0 w-16 h-16 md:w-28 md:h-28 rounded-full border border-brand-navy/40 flex items-center justify-center text-2xl md:text-4xl transition-[background-color,color,transform] duration-500 ease-expo group-hover:bg-brand-navy group-hover:text-main group-hover:-rotate-45">
                {arrow}
              </span>
            </div>
          </Link>
        </section>
      )}
    </div>
  );
};

export default ProjectDetails;
