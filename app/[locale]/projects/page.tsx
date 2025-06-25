import { getTranslations } from "next-intl/server";
import { Boxes } from "lucide-react";
import Projects from "@/components/Projects";

const page = async () => {
  const t = await getTranslations("titles");

  return (
    <div className="container px-4 md:px-8 lg:px-16 xl:px-32 mx-auto py-52">
      <div
        data-aos="fade-down"
        className="text-3xl mb-12 font-bold text-center flex justify-center items-center gap-2"
      >
        {t("My Projects").toUpperCase()}
        <Boxes />
      </div>

      <Projects />
    </div>
  );
};

export default page;
