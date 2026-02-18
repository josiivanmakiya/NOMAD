/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#f8f7f4",
          100: "#f1eee8",
          200: "#e3ded4",
          300: "#d5cebf",
        },
        ink: {
          900: "#1c1b18",
          700: "#3a3833",
        },
        mist: {
          100: "#f4f6f7",
          200: "#e8edef",
        },
        sage: {
          100: "#e6efe8",
          400: "#6e8a76",
        },
        clay: {
          200: "#e8e1da",
          400: "#bbaea2",
        },
      },
      fontFamily: {
        sans: ["Inter", "Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        calm: "0 12px 30px rgba(28, 27, 24, 0.08)",
      },
    },
  },
  plugins: [],
};

/**
 * FILE ROLE:
 * Tailwind CSS configuration for the NOMAD frontend.
 *
 * CONNECTS TO:
 * - src/styles.css (Tailwind layers)
 *
 * USED BY:
 * - Vite build pipeline
 *
 * NOTES:
 * - Light-calm palette and typography tokens live here.
 */

