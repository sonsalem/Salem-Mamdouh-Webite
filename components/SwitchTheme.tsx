"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun, ChevronUp } from "lucide-react";

const SwitchTheme = () => {
  // Theme
  const [theme, setTheme] = useState<string>("");

  const handleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Scroll To Top
  const toTop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (toTop.current) {
        // Toggle 'show' class based on scroll position
        if (window.scrollY >= 600) {
          toTop.current.classList.add("show");
        } else {
          toTop.current.classList.remove("show");
        }
      }
    };

    const handleToTop = () => {
      if (toTop.current) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    // Add event listener for scrolling
    window.addEventListener("scroll", handleScroll);

    // Add click event listener for 'toTop' button
    if (toTop.current) {
      toTop.current.addEventListener("click", handleToTop);
    }

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (toTop.current) {
        toTop.current.removeEventListener("click", handleToTop);
      }
    };
  }, []);

  return (
    <>
      <div className="flex flex-col fixed right-6 bottom-6 gap-4 items-center h-[100px] w-[45px] z-[100000]">
        <div
          ref={toTop}
          className="to-top -z-[10] opacity-0 transition-all duration-300 cursor-pointer w-[30px] h-[30px]
        rounded-md bg-light-200 dark:bg-dark-100 text-dark-text dark:text-light-text flex items-center justify-center"
        >
          <ChevronUp />
        </div>
        {theme === "dark" ? (
          <div
            onClick={handleTheme}
            className="bg-gray-300 text-black px-5 z-[100000] w-[45px] min-h-[45px] rounded-full
        flex items-center justify-center cursor-pointer"
          >
            <div>
              <Moon size={20} />
            </div>
          </div>
        ) : (
          <div
            onClick={handleTheme}
            className="bg-white shadow-md px-5 fixed right-6 bottom-6 z-[100000] w-[45px] h-[45px] rounded-full
        flex items-center justify-center cursor-pointer"
          >
            <div>
              <Sun size={20} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SwitchTheme;
