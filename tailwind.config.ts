import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-geist-sans)", "sans-serif"],
      mono: ["var(--font-geist-mono)", "monospace"],
    },
    spacing: {
      "0": "0px",
      "0.5": "2.5px",
      "1": "5px",
      "2": "10px",
      "3": "15px",
      "4": "20px",
      "5": "25px",
      "6": "30px",
      "7": "35px",
      "8": "40px",
      "64": "16rem",
      columnGap: "60px",
      sectionGap: "140px",
      nav: "75px",
      sidebar: "320px",
    },
    extend: {
      scale: {
        "101": "1.01",
        "102": "1.02",
      },
      colors: {
        neutral: {
          925: "#0f0f0f",
        },
      },
      keyframes: {
        "expand-down": {
          from: {
            height: "0",
            opacity: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        dropIn: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "expand-down": "expand-down 0.3s ease-out",
        fadeIn: "fadeIn 0.3s ease-in-out",
        fadeOut: "fadeOut 0.3s ease-in-out",
        dropIn: "dropIn 0.3s ease-in-out",
      },
    },
  },
};

export default config;