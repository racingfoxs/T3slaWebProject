/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-main":
          "url('https://www.spacex.com/static/images/backgrounds/dragon_humans.jpg')",
      },
      scale: {
        "-100": "-1",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
