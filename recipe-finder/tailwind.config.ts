import type { Config } from "tailwindcss";

const sage = {
  50: "#f2f7f3", 100: "#e2ece4", 200: "#c5d8c9", 300: "#98b5a3", 400: "#6d907c",
  500: "#496455", 600: "#3a5445", 700: "#2d4739", 800: "#22362c", 900: "#173124", 950: "#0d1f16",
};
const clay = {
  50: "#fdf4f1", 100: "#fbe6df", 200: "#f6cabd", 300: "#efa792", 400: "#e0836a",
  500: "#c46851", 600: "#984631", 700: "#7a2f1d", 800: "#5c2416", 900: "#3c0700",
};

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: "#FBFBFA",
        oatmeal: "#F4F3F0",
        linen: "#E8E6E1",
        mineral: "#6B726C",
        ink: { DEFAULT: "#1F2421", 950: "#101311", 900: "#181C19", 800: "#1F2421", 700: "#2C322E" },
        sage,
        clay,
        brand: sage,
        basil: sage,
        cream: { 50: "#FBFBFA", 100: "#F4F3F0", 200: "#E8E6E1", 300: "#DFE4DF" },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        latin: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        rest: "0 4px 20px -2px rgba(31,36,33,0.04)",
        lift: "0 12px 32px -4px rgba(31,36,33,0.08)",
        sheet: "0 24px 48px -8px rgba(31,36,33,0.12)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-up": "fade-up 0.6s ease-out both" },
    },
  },
  plugins: [],
};

export default config;