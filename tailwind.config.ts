import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      screens: {
        "mobile-sm": {
          max: "400px",
        },
        mobile: {
          max: "531px",
        },
        "anti-mobile": {
          min: "531px",
          max: "640px",
        },
        "max-sm": {
          max: "640px",
        },
        "max-md": {
          max: "768px",
        },
        "max-lg": {
          max: "1024px",
        },
        "max-xl": {
          max: "1280px",
        },
        "max-2xl": {
          max: "1536px",
        },
        "anti-ham": {
          min: "500px",
        },
        "hero-section-sm": {
          max: "670px",
        },
        "hero-section": {
          min: "670px",
          max: "800px",
        },
        "hero-section-lg": {
          min: "800px",
          max: "960px",
        },
      },
      colors: {
        primary: "#37474f",
        "footer-light": "#7FF68B",
        "primary-light": "#E5FFE0",
        "text-primary": "#333333",
        "text-secondary": "#828282",
        "home-header": "#F8F0E3",
        "rating-good": "#6FCF97",
        "rating-mid": "#F2C94C",
        "rating-bad": "#EB5757",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        dmSerifDisplay: ["DM Serif Display", "serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      borderRadius: {
        sxl: "0.625rem", //10px
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
