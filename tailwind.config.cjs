/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mjs}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '391px',
      },
    },
  },
  plugins: [],
}
