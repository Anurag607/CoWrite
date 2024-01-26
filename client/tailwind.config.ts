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
        xs: "350px",
        "mobile-sm": {
          max: "475px",
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
        main: "var(--main)",
        sidebar: "var(--sidebar)",
        hover: "var(--hover)",
        primary: "var(--text-primary)",
        grey: "var(--text-grey)",
        brown: "var(--text-brown)",
        orange: "var(--text-orange)",
        yellow: "var(--text-yellow)",
        green: "var(--text-green)",
        blue: "var(--text-blue)",
        purple: "var(--text-purple)",
        pink: "var(--text-pink)",
        red: "var(--text-red)",
      },
      backgroundColor: {
        hover: "var(--bg-hover)",
        grey: "var(--bg-grey)",
        brown: "var(--bg-brown)",
        orange: "var(--bg-orange)",
        yellow: "var(--bg-yellow)",
        green: "var(--bg-green)",
        blue: "var(--bg-blue)",
        purple: "var(--bg-purple)",
        pink: "var(--bg-pink)",
        red: "var(--bg-red)",
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
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
};
export default config;
