/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    `${process.env.DATA_PATH ?? "../pnp-data/"}/**/*.md`,
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        ...defaultTheme.screens,
        xs: "400px",
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwindcss-animate"),
  ],
  daisyui: {
    themes: [
      {
        winter: {
          ...require("daisyui/src/theming/themes")["winter"],
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "rgb(37 99 235)",
          neutral: "#191D24",
          "neutral-focus": "#111318",
          "base-100": "#2A303C",
          "base-200": "#242933",
          "base-300": "#20252E",
        },
      },
    ],
  },
} satisfies Config;
