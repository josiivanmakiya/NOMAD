/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        nomad: {
          black: "#0a0a0a",
          white: "#f5f2eb",
          red: "#c0392b",
          green: "#2ecc71",
          amber: "#e6a817",
          grey: "#2a2a2a",
          "grey-mid": "#1a1a1a",
          "grey-light": "#888888",
        },
        ink: {
          900: "#0f172a",
          700: "#334155",
        },
        sand: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
        },
        sage: {
          100: "#d1fae5",
          400: "#34d399",
        },
        clay: {
          200: "#e7e2d6",
          400: "#c5b8a3",
        },
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        sans: ["DM Mono", "monospace"],
        serif: ["Instrument Serif", "serif"],
        mono: ["DM Mono", "monospace"],
      },
      borderColor: {
        DEFAULT: "rgba(245,242,235,0.10)",
        strong: "rgba(245,242,235,0.22)",
      },
      boxShadow: {
        calm: "0 10px 30px rgba(26, 26, 32, 0.06), 0 2px 10px rgba(26, 26, 32, 0.04)",
      },
    },
  },
  plugins: [],
};
