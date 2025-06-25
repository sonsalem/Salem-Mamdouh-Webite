"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const Loader = () => {
  const t = useTranslations("load");

  return (
    <div className="loader mx-auto w-full flex justify-center flex-col items-center gap-4 h-60">
      {/* Light mode image */}
      <Image
        src="/loading-dark.svg"
        alt="loader"
        width={80}
        height={80}
        className="block dark:hidden"
      />

      {/* Dark mode image */}
      <Image
        src="/loading-light.svg"
        alt="loader"
        width={80}
        height={80}
        className="hidden dark:block"
      />
    </div>
  );
};

export default Loader;
