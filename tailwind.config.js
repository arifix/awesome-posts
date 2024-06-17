/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#tss-app",
  theme: {
    extend: {
      colors: {
        tonic: {
          primary: "#745FF1",
          secondary: "#880021",
          text: "#818181",
        },
      },
    },
  },
  plugins: [],
};
