"use client"; // Add this directive at the top

import projects from "@/constants";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { Github, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const Works = () => {
  const t = useTranslations();
  const { locale } = useParams();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
      {projects.map((project, i) => (
        <div
          className="relative hover:z-30"
          key={i}
          dir="ltr"
          data-aos="zoom-in"
        >
          <div className="project max-w-[100%] p-3 bg-[#f9f9f9] dark:bg-dark-200 hover:transition-all hover:duration-500 rounded-lg cursor-pointer">
            <div className="images relative overflow-hidden rounded-lg">
              <Swiper
                modules={[Navigation]}
                navigation={true}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
              >
                {project.images.map((img, index) => (
                  <SwiperSlide key={index} className="">
                    <Image
                      src={img.src}
                      alt="image"
                      height={1000}
                      width={1000}
                      className="w-full rounded-lg h-full aspect-[2] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="links flex gap-2 items-center justify-center w-full absolute left-0 z-10 bottom-4 md:-bottom-10 transition-all duration-500">
                {project.github && (
                  <Link
                    href={project.github}
                    className="w-[30px] h-[30px] bg-[#ffffffA1] dark:bg-[#000000A1] rounded-full flex items-center justify-center"
                  >
                    <Github size={16} />
                  </Link>
                )}
                {project.liveDemo && (
                  <Link
                    href={project.liveDemo}
                    className="w-[30px] h-[30px] bg-[#ffffffA1] dark:bg-[#000000A1] rounded-full flex items-center justify-center"
                  >
                    <Globe size={16} />
                  </Link>
                )}
              </div>
              {project.new && (
                <div
                  className={`absolute bg-main dark:bg-dark-100 top-6 z-[100] text-sm px-4 py-1 ${
                    locale === "en"
                      ? "left-0 rounded-e-md"
                      : "right-0 rounded-s-md"
                  }`}
                >
                  {t("NEW")}
                </div>
              )}
            </div>
            <div className="texts my-2 md:max-h-0 overflow-hidden px-3">
              <div className="font-semibold mb-2">{project.name}</div>
              <div className="text-light-gray-200 mb-3 dark:text-dark-gray-200 text-xs">
                {project.features}
              </div>
              <div className="flex gap-2 flex-wrap text-xs">
                {project.techStack.map((teck, i) => {
                  if (i !== project.techStack.length - 1) {
                    return (
                      <div className="font-semibold" key={i}>
                        {teck} |
                      </div>
                    );
                  } else {
                    return (
                      <div className="font-semibold" key={i}>
                        {teck}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Works;
