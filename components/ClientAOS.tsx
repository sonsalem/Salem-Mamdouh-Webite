"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ClientAOS = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 50,
      // once: true,
      easing: "ease-in-out",
    });
  }, []);

  return null;
};

export default ClientAOS;
