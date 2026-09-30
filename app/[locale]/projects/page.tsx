import { getTranslations } from "next-intl/server";
import Projects from "@/components/Projects";
import SectionHeading from "@/components/SectionHeading";

const page = async () => {
  const t = await getTranslations("titles");
  const s = await getTranslations("sections");

  return (
    <section className="pt-32 md:pt-44 pb-24 md:pb-40">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24">
        <SectionHeading as="h1" index="03" label={s("works")} title={t("My Projects")} className="!mb-8 md:!mb-12" />
      </div>
      <Projects />
    </section>
  );
};

export default page;
