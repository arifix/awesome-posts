/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#afx-ap-app",
  theme: {
    extend: {
      colors: {
        ap: {
          primary: "#745FF1",
          secondary: "#880021",
          text: "#818181",
        },
      },
    },
  },
  plugins: [],
};
