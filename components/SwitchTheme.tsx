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
  // const toTop = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (toTop.current) {
  //       // Toggle 'show' class based on scroll position
  //       if (window.scrollY >= 600) {
  //         toTop.current.classList.add("show");
  //       } else {
  //         toTop.current.classList.remove("show");
  //       }
  //     }
  //   };

  //   const handleToTop = () => {
  //     if (toTop.current) {
  //       window.scrollTo({
  //         top: 0,
  //         behavior: "smooth",
  //       });
  //     }
  //   };

  //   // Add event listener for scrolling
  //   window.addEventListener("scroll", handleScroll);

  //   // Add click event listener for 'toTop' button
  //   if (toTop.current) {
  //     toTop.current.addEventListener("click", handleToTop);
  //   }

  //   // Cleanup event listeners on component unmount
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     if (toTop.current) {
  //       toTop.current.removeEventListener("click", handleToTop);
  //     }
  //   };
  // }, []);

  const scrollProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollProgress = scrollProgressRef.current;

    const handleScroll = () => {
      if (!scrollProgress) return;

      const scrollTop = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const percentValue = (scrollTop * 100) / height;

      // Toggle visibility
      if (scrollTop >= 450) {
        scrollProgress.classList.add("show");
      } else {
        scrollProgress.classList.remove("show");
      }

      // Set background
      scrollProgress.style.background = `conic-gradient(#F0BB78 ${percentValue}%, #F0BB783a ${percentValue}%)`;
    };

    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    scrollProgress?.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      scrollProgress?.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col fixed right-6 bottom-6 gap-4 items-center h-auto w-[45px] z-[100000]">
        <div
          ref={scrollProgressRef}
          className="totop flex items-center justify-center"
        >
          <div className="inner flex items-center justify-center bg-white dark:bg-dark-200">
            ↑
          </div>
        </div>

        {theme === "dark" ? (
          <div
            onClick={handleTheme}
            className="bg-white text-black px-5 z-[100000] w-[55px] h-[55px] rounded-full
        flex items-center justify-center cursor-pointer"
          >
            <div>
              <Moon size={25} />
            </div>
          </div>
        ) : (
          <div
            onClick={handleTheme}
            className="bg-white shadow-md px-5 z-[100000] w-[55px] h-[55px] rounded-full
        flex items-center justify-center cursor-pointer"
          >
            <div>
              <Sun size={25} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SwitchTheme;
