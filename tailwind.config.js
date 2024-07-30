import * as flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */

const usedColors = ["red", "green", "blue","cyan","gray"];
export default {
  safelist: usedColors.map((color) => `after:border-${color}-600`),
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}

