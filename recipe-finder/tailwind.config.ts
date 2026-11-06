// tailwind.config.ts
import type { Config } from "tailwindcss";

const terracotta = {
  DEFAULT: "#E05A1B",
  50: "#FFF3EC",
  100: "#FFE2D1",
  200: "#FFC7A8",
  300: "#FBA377",
  400: "#F07B43",
  500: "#E05A1B",
  600: "#C24A12",
  700: "#9A3A0E",
  800: "#7A2E0B",
  900: "#5F250A",
  950: "#351104",
};

const rosemary = {
  DEFAULT: "#2D5A3F",
  50: "#EFF6F1",
  100: "#D8EBDD",
  200: "#B0D7BB",
  300: "#7FBA91",
  400: "#4F966A",
  500: "#2D5A3F",
  600: "#234A33",
  700: "#1B3A28",
  800: "#152E20",
  900: "#0F2419",
  950: "#08150E",
};

const apricot = {
  DEFAULT: "#F4A261",
  50: "#FFF7ED",
  100: "#FEEAD2",
  200: "#FDD6A9",
  300: "#FCBE78",
  400: "#F9A94D",
  500: "#F4A261",
  600: "#E07B2F",
  700: "#B95C1E",
  800: "#93481B",
  900: "#763C19",
  950: "#401C0B",
};

const espresso = {
  DEFAULT: "#2B2623",
  50: "#F8F5F3",
  100: "#EFE9E5",
  200: "#DCD1C9",
  300: "#C2B2A7",
  400: "#A18A7C",
  500: "#7F675B",
  600: "#655049",
  700: "#4A423C",
  800: "#352F2C",
  900: "#1F1B18",
  950: "#100E0C",
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
        // Design tokens
        canvas: "#FAF6F0",
        porcelain: "#FFFFFF",
        ecru: "#F3ECE1",

        terracotta,
        rosemary,
        apricot,
        espresso,

        // Legacy aliases remapped to new theme
        alabaster: "#FFFBF8",
        oatmeal: "#F3ECE1",
        linen: "#E1BFB4",
        mineral: "#594139",
        ink: {
          DEFAULT: "#2B2623",
          950: "#100E0C",
          900: "#1A1715",
          800: "#2B2623",
          700: "#4A423C",
        },
        sage: rosemary,
        clay: terracotta,
        brand: terracotta,
        basil: rosemary,
        cream: {
          50: "#FAF6F0",
          100: "#F3ECE1",
          200: "#E7D7CF",
          300: "#D8C3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-bricolage)", "ui-sans-serif", "sans-serif"],
        latin: ["var(--font-dm-sans)", "sans-serif"],
      },
      boxShadow: {
        rest: "0 10px 30px -4px rgba(43, 38, 35, 0.06)",
        lift: "0 18px 40px -8px rgba(224, 90, 27, 0.12)",
        sheet: "0 20px 40px -8px rgba(43, 38, 35, 0.12)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;