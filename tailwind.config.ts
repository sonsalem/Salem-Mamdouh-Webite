import type { Config } from "tailwindcss";

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
        main: "#F0BB78",
        dark: {
          gray: {
            100: "#e8e8e8",
            200: "#a6abb4",
          },
          text: "#f9f9f9",
          "100": "#909dac",
          "200": "#1c1b1e",
          "300": "#111013",
        },
        light: {
          // "100": "#FFF0DC",
          // "200": "#F0BB78",
          // "300": "#543A14",
          // "400": "##131010",
          gray: {
            100: "#a6abb4",
            200: "#777",
          },
          text: "#121212",
          "100": "#FFF0DC",
          "200": "#F0BB78",
          "300": "#111013",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
