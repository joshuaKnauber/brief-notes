/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-bg": "white",
        "theme-text": "black",
        "theme-text-low-contrast": "#737373",
      }
    },
    fontSize: {
      "xs": ".8rem",
      "sm": ".9rem",
      "base": "1rem",
      "lg": "1.1rem",
      "xl": "",
      "2xl": "",
      "3xl": "",
      "4xl": ""
    }
  },
  plugins: [],
}

