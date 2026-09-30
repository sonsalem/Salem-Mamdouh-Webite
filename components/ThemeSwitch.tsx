"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type ThemeChoice = "light" | "dark" | "system";

const OPTIONS = [
  { key: "light", icon: Sun },
  { key: "dark", icon: Moon },
  { key: "system", icon: Monitor },
] as const;

const systemDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

const applyTheme = (choice: ThemeChoice) => {
  const dark = choice === "dark" || (choice === "system" && systemDark());
  document.documentElement.classList.toggle("dark", dark);
  return dark;
};

/** Icon button with a Light / Dark / System menu, same as the dashboard's. */
const ThemeSwitch = () => {
  const t = useTranslations("theme");
  const [choice, setChoice] = useState<ThemeChoice | null>(null);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Read the saved choice after mount (the inline script in the layout has
  // already applied it, so there's no flash).
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initial: ThemeChoice = saved === "dark" || saved === "light" || saved === "system" ? saved : "system";
    setChoice(initial);
    setDark(applyTheme(initial));
  }, []);

  // Follow the OS while on "system".
  useEffect(() => {
    if (choice !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setDark(applyTheme("system"));
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [choice]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (next: ThemeChoice) => {
    localStorage.setItem("theme", next);
    setChoice(next);
    setDark(applyTheme(next));
    setOpen(false);
  };

  const Icon = dark ? Moon : Sun;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t("toggle")}
        aria-haspopup="menu"
        aria-expanded={open}
        className="w-9 h-9 flex items-center justify-center rounded-full transition-[opacity,transform] duration-300 hover:opacity-70 hover:rotate-12"
      >
        <Icon key={dark ? "moon" : "sun"} size={18} className="animate-in spin-in-90 fade-in duration-300" />
      </button>

      <div
        role="menu"
        className={`absolute end-0 top-full mt-2 min-w-40 p-1 border border-line/15 bg-surface text-ink origin-top-right rtl:origin-top-left transition-all duration-200 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {OPTIONS.map(({ key, icon: OptionIcon }) => (
          <button
            key={key}
            type="button"
            role="menuitemradio"
            aria-checked={choice === key}
            onClick={() => select(key)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-main hover:text-brand-navy ${
              choice === key ? "font-medium" : ""
            }`}
          >
            <OptionIcon size={16} />
            <span className="flex-1 text-start">{t(key)}</span>
            {choice === key && <Check size={14} />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitch;
