import Landing from "@/components/Landing";
import { getTranslations } from "next-intl/server";
import { Boxes, PenTool, UserRound } from "lucide-react";
import Image from "next/image";
import React from "react";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";

const page = async () => {
  const t = await getTranslations("titles");

  return (
    <>
      <main className="min-h-[100vh] w-full relative z-1 py-40 lg:py-60 overflow-x-clip">
        <Image
          src="/hero-bg-1.svg"
          alt="circle"
          fill
          objectFit="cover"
          sizes="100%"
          className="!h-[100vmax] !w-[100vmax] circle-1 dark:opacity-15 pointer-events-none -z-40"
        />
        <Image
          src="/hero-bg-2.svg"
          alt="circle"
          fill
          objectFit="cover"
          sizes="100%"
          className="!h-[100vmax] !w-[100vmax] circle-2 dark:opacity-15 pointer-events-none -z-40"
        />
        <Landing />
      </main>
      <div
        id="about"
        className="container px-4 md:px-8 lg:px-16 xl:px-32 mx-auto py-40 -mt-40"
      >
        <div
          data-aos="fade-down"
          className="text-3xl mb-12 font-bold text-center flex justify-center items-center gap-2"
        >
          {t("About Me").toUpperCase()}
          <UserRound />
        </div>
        <About />
      </div>
      <div className="container px-4 md:px-8 lg:px-16 xl:px-32 mx-auto mb-40">
        <div
          data-aos="fade-down"
          className="text-3xl mb-12 font-bold text-center flex justify-center items-center gap-2"
        >
          {t("My Projects").toUpperCase()}
          <Boxes />
        </div>

        <Projects />
      </div>
      <div className="ontainer px-4 md:px-8 lg:px-16 xl:px-32 mx-auto mb-40">
        <div
          data-aos="fade-down"
          className="disAos text-3xl mb-12 font-bold text-center flex justify-center items-center gap-2"
        >
          {t("Skills").toUpperCase()}
          <PenTool />
        </div>
        <Skills />
      </div>
    </>
  );
};

export default page;
