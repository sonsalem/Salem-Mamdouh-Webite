"use client";

import supabase from "@/config/supabaseClients";
import Contact from "@/types/contacts";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { EXPO, gsap, useGsap } from "@/lib/motion";
import Loader from "./Loader";
import Magnetic from "./motion/Magnetic";
import SplitText from "./motion/SplitText";

/**
 * Contact finale on the orange canvas: a huge two-line invitation, a magnetic
 * circular CTA, and the social links as full-width rows that fill navy on hover.
 */
const ContactMe = ({ showCta = true, index = "05" }: { showCta?: boolean; index?: string }) => {
  const t = useTranslations("contact");
  const { locale } = useParams();
  const rootRef = useRef<HTMLElement>(null);

  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    // Was ["Skills"], which collided with the skills query's cache.
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data } = await supabase.from("contacts").select("*").order("id");
      return data || [];
    },
    gcTime: 1000 * 60,
  });

  useGsap(
    () => {
      const q = gsap.utils.selector(rootRef);
      const tl = gsap.timeline({ scrollTrigger: { trigger: rootRef.current, start: "top 70%" }, defaults: { ease: EXPO } });
      tl.fromTo(q(".rule-ink"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut", stagger: 0.08 })
        .to(q(".split-inner"), { y: 0, yPercent: 0, duration: 1.2, stagger: 0.03 }, "<0.2")
        .from(q("[data-cta]"), { scale: 0, rotate: -45, duration: 1.2 }, "<0.5");

      gsap.from(q("[data-social]"), {
        yPercent: 60,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: q("[data-socials]")[0], start: "top 90%" },
      });

      // The big title drifts sideways while the section scrolls by.
      gsap.fromTo(
        q("[data-drift]"),
        { xPercent: locale === "ar" ? -6 : 6 },
        {
          xPercent: locale === "ar" ? 6 : -6,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    },
    rootRef,
    [contacts.length, locale]
  );

  return (
    <section ref={rootRef} id="contact" className="relative bg-main text-brand-navy overflow-hidden">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 pt-24 md:pt-36 pb-16 md:pb-24">
        <span className="rule-ink" />
        <div className="label flex justify-between pt-3">
          <span>({index})</span>
          <span>({t("label")})</span>
        </div>

        <div className="relative mt-10 md:mt-16">
          <h2 data-drift className="leading-[0.88] tracking-tight">
            <SplitText text={t("title1")} className="block font-display-i text-[18vw] md:text-[14vw]" />
            <SplitText
              text={t("title2")}
              className="block text-outline-ink font-medium text-[15vw] md:text-[11.5vw] ps-[8vw]"
            />
          </h2>

          {showCta && (
            <div className="mt-10 md:mt-0 md:absolute md:end-[4vw] md:bottom-[8%]">
              <Magnetic strength={0.4}>
                <Link
                  href={`/${locale}/contact`}
                  data-cta
                  className="group relative flex items-center justify-center w-32 h-32 md:w-44 md:h-44 rounded-full bg-brand-navy text-brand-paper font-medium overflow-hidden"
                >
                  <span className="absolute inset-0 rounded-full bg-brand-paper scale-0 group-hover:scale-100 transition-transform duration-500 ease-expo" />
                  <span className="relative flex items-center gap-2 group-hover:text-brand-navy transition-colors">
                    {t("cta")} <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
                  </span>
                </Link>
              </Magnetic>
            </div>
          )}
        </div>

        {/* Social rows */}
        <div data-socials className="mt-16 md:mt-24">
          <p className="label mb-3">({t("findMe")})</p>
          {isLoading ? (
            <Loader />
          ) : (
            <ul className="border-t border-brand-navy/40">
              {contacts.map((contact, i) => (
                <li key={contact.id} data-social className="border-b border-brand-navy/40 overflow-hidden">
                  <a
                    href={contact.url}
                    {...(/^https?:/.test(contact.url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    data-cursor={t("open")}
                    className="group relative flex items-center gap-4 md:gap-8 py-5 md:py-7 px-1"
                  >
                    <span className="absolute inset-0 bg-brand-navy origin-bottom scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-500 ease-expo" />
                    <span className="relative label w-10 group-hover:text-brand-paper transition-colors">
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                    <Image
                      src={contact.img}
                      alt=""
                      width={40}
                      height={40}
                      className="relative w-8 h-8 md:w-10 md:h-10 object-contain"
                    />
                    <span className="relative text-2xl md:text-5xl font-medium uppercase tracking-tight group-hover:text-brand-paper transition-[color,transform] duration-500 ease-expo group-hover:translate-x-3 rtl:group-hover:-translate-x-3">
                      {contact.title}
                    </span>
                    <span className="relative ms-auto text-2xl md:text-4xl group-hover:text-main transition-[color,transform] duration-500 ease-expo group-hover:-rotate-45">
                      {locale === "ar" ? "←" : "→"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
