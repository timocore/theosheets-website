import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#F5F0E8",
          light: "#FAF8F5",
          dark: "#EDE6DC",
        },
        charcoal: {
          DEFAULT: "#3D3630",
          light: "#6B635B",
          dark: "#2C2416", // Preferred banner/hero color
        },
        honey: {
          DEFAULT: "#C9A227",
          light: "#D4B84A",
          dark: "#A8861F",
        },
        border: {
          warm: "#E5DDD4",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
