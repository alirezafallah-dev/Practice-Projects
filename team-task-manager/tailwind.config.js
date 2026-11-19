/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand palette - Inspired by Vercel/Linear
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1", // Primary
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          950: "#1E1B4B",
        },
        // Surface - Sophisticated grays
        surface: {
          light: "#FAFAFA",
          dark: "#09090B",
        },
        // Semantic colors
        success: {
          50: "#ECFDF5",
          500: "#10B981",
          600: "#059669",
        },
        warning: {
          50: "#FFFBEB",
          500: "#F59E0B",
          600: "#D97706",
        },
        danger: {
          50: "#FEF2F2",
          500: "#EF4444",
          600: "#DC2626",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Inter Tight"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        "soft": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "glow": "0 0 20px rgba(99, 102, 241, 0.15)",
        "glow-lg": "0 0 40px rgba(99, 102, 241, 0.2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(to bottom right, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};