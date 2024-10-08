/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#007D53",
        lightgreen: "#007D5314",
        grey: "#728075",
        titleBlack: "#001201",
        lightblue: "#03037714",
        darkblue: "#030377",
      },
    },
  },
  plugins: [],
};
