/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/client/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem"
    },
    extend: {}
  },
  plugins: [require("flowbite/plugin")]
};
