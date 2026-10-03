"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";
import { projectHref, useProjects } from "@/lib/projects";
import { gsap, useGsap } from "@/lib/motion";
import Gallery from "./Gallery";
import Loader from "./Loader";

/**
 * Works. On desktop the section pins and vertical scrolling drives the panels
 * sideways (the reference's horizontal scroll), with a progress hairline. On smaller screens, or with reduced motion,
 * it's a plain vertical stack.
 */
const Projects = () => {
  const t = useTranslations("projects");
  const { locale } = useParams();
  const rootRef = useRef<HTMLDivElement>(null);

  const { data: projects = [], isLoading } = useProjects();

  useGsap(
    () => {
      const root = rootRef.current!;
      const track = root.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const rtl = locale === "ar";
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Horizontal layout only exists while this animation does, so with
        // reduced motion the panels stay in a normal, reachable grid.
        root.classList.add("is-horizontal");
        const distance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => (rtl ? distance() : -distance()),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.fromTo(
          root.querySelector("[data-progress]"),
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${distance()}`, scrub: true } }
        );

        return () => root.classList.remove("is-horizontal");
      });

      mm.add("(max-width: 1023px)", () => {
        root.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
          gsap.from(panel, {
            y: 60,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, start: "top 88%" },
          });
        });
      });

      return () => mm.revert();
    },
    rootRef,
    [projects.length, locale]
  );

  if (isLoading) return <Loader />;

  return (
    <div ref={rootRef} className="works relative">
      <div
        data-track
        className="works-track grid gap-16 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-24 px-4 md:px-8 lg:px-16 xl:px-24"
      >
        {projects.map((project, i) => (
          <article
            key={project.id}
            data-panel
            className="works-panel group min-w-0 shrink-0 flex flex-col [container-type:inline-size]"
          >
            {/* Meta row */}
            <div className="label flex items-center justify-between gap-4 border-t border-line/20 pt-3 mb-4 text-muted">
              <span>({String(i + 1).padStart(2, "0")})</span>
              {project.new && <span className="px-2 py-0.5 bg-main text-brand-navy font-medium">{t("NEW")}</span>}
            </div>

            {/* Gallery */}
            <Gallery
              images={project.images}
              name={project.name}
              href={projectHref(String(locale), project)}
              labels={{ prev: t("prev"), next: t("next"), cursor: t("open") }}
            />

            {/* Title + details */}
            <div className="mt-5 grid md:grid-cols-12 gap-x-6 gap-y-3 items-start">
              {/* Sized to the panel, not the viewport, so long words fit their column. */}
              <h3 className="md:col-span-7 min-w-0 break-words text-[clamp(2rem,7cqw,3.75rem)] font-medium uppercase tracking-tight leading-[0.95]">
                <Link href={projectHref(String(locale), project)} className="hover:text-main transition-colors duration-300">
                  {project.name}
                </Link>
              </h3>
              <div className="md:col-span-5 flex flex-col gap-3">
                <p dir="auto" className="text-sm text-muted leading-6 line-clamp-4">{project.features}</p>
                <p dir="ltr" className="label rtl:text-right">{project.techStack.join(" / ")}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" data-cursor={t("view")} className="roll">
                      <span>{t("live")} ↗</span>
                      <span className="text-main">{t("live")} ↗</span>
                    </a>
                  )}
                  {project.githubPrivate ? (
                    <span className="text-muted">{t("private")}</span>
                  ) : project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor={t("code")} className="roll">
                      <span>{t("code")} ↗</span>
                      <span className="text-main">{t("code")} ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Horizontal progress (desktop) */}
      <div className="works-progress hidden shrink-0 mx-[8vw] mb-8">
        <div className="label flex justify-between text-muted mb-2">
          <span>{t("scrollHint")}</span>
          <span>({String(projects.length).padStart(2, "0")})</span>
        </div>
        <span className="block h-px bg-line/20">
          <span data-progress className="block h-px bg-main origin-left rtl:origin-right" />
        </span>
      </div>
    </div>
  );
};

export default Projects;
