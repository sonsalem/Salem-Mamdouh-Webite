import { getTranslations } from "next-intl/server";
import Experiences from "@/components/Experiences";
import SectionHeading from "@/components/SectionHeading";

const page = async () => {
  const t = await getTranslations("titles");
  const s = await getTranslations("sections");

  return (
    <section className="px-4 md:px-8 lg:px-16 xl:px-24 pt-32 md:pt-44 pb-24 md:pb-40">
      <SectionHeading as="h1" index="02" label={s("experience")} title={t("Experience")} />
      <Experiences />
    </section>
  );
};

export default page;
