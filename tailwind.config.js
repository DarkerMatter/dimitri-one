// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        f1: {
          red: '#FF1801',
          dark: '#15151E',
          carbon: '#1F1F1F',
          silver: '#A8A9AD',
        }
      },
      fontFamily: {
        racing: ['"Titillium Web"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      animation: {
        'drive-in': 'driveIn 1s ease-out forwards',
      },
      keyframes: {
        driveIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};