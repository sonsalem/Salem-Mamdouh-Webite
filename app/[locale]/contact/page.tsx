"use client";

import { SocilMedias } from "@/constants";
import { Handshake, UserRoundSearch } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const t = useTranslations("contact");
  return (
    <div className="container px-4 md:px-8 lg:px-16 xl:px-32 mx-auto py-52">
      <div
        data-aos="fade-down"
        className="disAos text-3xl mb-12 font-bold text-center flex justify-center items-center gap-2"
      >
        {t("Contact Us").toUpperCase()}
        <Handshake />
      </div>
      <div className="flex gap-4 items-center justify-center flex-wrap">
        {SocilMedias.map((skill) => (
          <Link href={skill.href} className="box" data-aos="zoom-in">
            <Image src={skill.src} alt={skill.src} width={80} height={80} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
