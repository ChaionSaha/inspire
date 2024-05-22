const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#131313",
                "primary-light": "rgba(0, 0, 0, 0.80)",
                "base-100": "#fff",
                "base-200": "#F9FAFB",
                "base-300": "rgba(255,255,255,0.3)",
            }
        },
    },
    darkMode: "class",
    plugins: [nextui(), require('daisyui')],
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#131313",
                    'secondary': '#f5f5f5'
                },
            },

        ],
    },
};
