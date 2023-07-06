/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");


module.exports = {
  content: [
    "./App.tsx",
    "./index.tsx",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: {
        DEFAULT: "#fff",
        mask: "rgba(255,255,255,0.7)",
      },
      black: {
        DEFAULT: "#000",
        "1/10": "rgba(0,0,0,0.1)",
        "2/10": "rgba(0,0,0,0.2)",
        "3/10": "rgba(0,0,0,0.3)",
        "4/10": "rgba(0,0,0,0.4)",
        "5/10": "rgba(0,0,0,0.5)",
        "6/10": "rgba(0,0,0,0.6)",
        "7/10": "rgba(0,0,0,0.7)",
        "8/10": "rgba(0,0,0,0.8)",
        "9/10": "rgba(0,0,0,0.9)",
      },
      gray: colors.gray,
      green: colors.green,
      red: colors.red,
      orange: colors.orange,
      blue: colors.blue,
      teal: colors.teal,
    },
    extend: {},
    
  },
  plugins: [],
}

