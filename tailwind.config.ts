import { type Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    `${process.env.DATA_PATH ?? "../pnp-data/"}/**/*.md`,
  ],
} satisfies Config;
