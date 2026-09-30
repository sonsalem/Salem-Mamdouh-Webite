import type { Config } from "tailwindcss";

// Brand palette (shared with the dashboard)
//   Primary orange  #FF6500  — the single loud colour: hero canvas, loader, hover fills
//   Dark blue       #1E3E62  — secondary
//   Dark navy       #0B192C  — ink
//
// Theme-aware tokens (canvas / ink / muted / line / surface) are CSS variables
// defined in globals.css, so they flip with the .dark class.
const themed = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: themed("canvas"),
        ink: themed("ink"),
        muted: themed("muted"),
        line: themed("line"),
        surface: themed("surface"),
        main: "#FF6500",
        brand: {
          orange: "#FF6500",
          blue: "#1E3E62",
          navy: "#0B192C",
          paper: "#F2F5F9",
        },
        // Legacy tokens, kept for anything still using them.
        dark: {
          gray: { 100: "#D8E1EC", 200: "#94A8C0" },
          text: "#E8EEF6",
          "100": "#FF6500",
          "200": "#0E1F35",
          "300": "#07111F",
        },
        light: {
          gray: { 100: "#94A3B8", 200: "#475569" },
          text: "#0B192C",
          "100": "#F2F5F9",
          "200": "#FF6500",
          "300": "#0B192C",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Cairo", "system-ui", "sans-serif"],
        display: ["'Instrument Serif'", "Cairo", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        // Same curve as the reference's letter reveals.
        expo: "cubic-bezier(0.7, 0.2, 0.1, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
