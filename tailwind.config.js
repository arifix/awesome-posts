/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#arifix-ap-app",
  theme: {
    extend: {
      colors: {
        ap: {
          primary: "#745FF1",
          secondary: "#0da8e9",
          text: "#818181",
        },
      },
    },
  },
  plugins: [],
};
