import Landing from "@/components/Landing";
import { getTranslations } from "next-intl/server";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experiences from "@/components/Experiences";
import ContactMe from "@/components/ContactMe";
import Marquee from "@/components/Marquee";
import SectionHeading from "@/components/SectionHeading";

const GUTTER = "px-4 md:px-8 lg:px-16 xl:px-24";

const page = async () => {
  const t = await getTranslations("titles");
  const s = await getTranslations("sections");

  return (
    <>
      <Landing />
      <Marquee items={[s("marquee1"), s("marquee2"), s("marquee3")]} className="-mt-10 md:-mt-14 relative z-10" />

      <section id="about" className={`${GUTTER} pt-20 md:pt-32 pb-24 md:pb-40 scroll-mt-16`}>
        <SectionHeading index="01" label={s("about")} title={t("About Me")} />
        <About />
      </section>

      <section id="experience" className={`${GUTTER} pb-24 md:pb-40 scroll-mt-16`}>
        <SectionHeading index="02" label={s("experience")} title={t("Experience")} />
        <Experiences />
      </section>

      <section id="projects" className="pb-24 md:pb-40 scroll-mt-16">
        <div className={GUTTER}>
          <SectionHeading index="03" label={s("works")} title={t("My Projects")} className="!mb-8 md:!mb-12" />
        </div>
        <Projects />
      </section>

      <Marquee items={[s("marquee2"), s("marquee1"), s("marquee3")]} reverse />

      <section id="skills" className={`${GUTTER} pt-16 md:pt-24 pb-24 md:pb-40`}>
        <SectionHeading index="04" label={s("skills")} title={t("Skills")} />
        <Skills />
      </section>

      <ContactMe />
    </>
  );
};

export default page;
