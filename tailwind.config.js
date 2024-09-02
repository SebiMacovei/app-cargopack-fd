import * as flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */

const usedColors = ["red", "green", "blue", "cyan", "gray"];
export default {
    safelist: usedColors.map((color) => `after:border-${color}-600`),
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        flowbite.content(),
    ],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                "yellow-melon": "#FFC107",
                "black-pro": "#212121",
                "mold": "#B3B2A5",
                "darker-mold": "#8D8C80"
            }
        },
    },
    plugins: [
        flowbite.plugin(),
    ],
}

