"use client";

import supabase from "@/config/supabaseClients";
import Description from "@/types/about";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Loader from "./Loader";

const About = () => {
  const { locale } = useParams();

  const { data: descriptions = [], isLoading: loadingAbout } = useQuery<
    Description[]
  >({
    queryKey: ["about"],
    queryFn: async () => {
      const { data } = await supabase.from("about").select("*").order("id");
      return data || [];
    },
    gcTime: 1000 * 60,
  });

  return (
    <div className="flex justify-between items-center flex-col-reverse md:flex-row gap-4 overflow-x-hidden">
      {/* Text */}
      <div
        data-aos="fade-right"
        className="flex flex-col gap-4 leading-7 md:w-1/2"
      >
        {loadingAbout ? (
          <Loader />
        ) : (
          descriptions.map((desc) => (
            <span key={desc.id}>
              {locale === "ar" ? desc.descriptions_ar : desc.descriptions_en}
            </span>
          ))
        )}
        <Link
          href="Salem Mamdouh Salem CV.pdf"
          download
          className="rounded-lg w-fit px-4 py-2 border-[1px] border-light-gray-200 block transition-all duration-300 hover:bg-dark-200 hover:text-white dark:hover:bg-white dark:hover:text-dark-200 mt-4"
        >
          {locale === "ar" ? "تحميل سيرتي الذاتية" : "Download My CV"}
        </Link>
      </div>
      {/* Image */}
      <div data-aos="fade-left" className="images">
        <Image
          src={`/about.png`}
          alt="about Image"
          width={500}
          height={500}
          className="max-w-[100%]"
        />
      </div>
    </div>
  );
};

export default About;
