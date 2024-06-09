/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-500": "#864EBB",
        "primary-100": "#EEE0FB",
        "secondary-500": "#9A99F2",
        "secondary-100": "#E6F2FF",
        "primary-gray-500": "#A5A29D",
        "primary-gray-300": "#B7B5B1",
        "primary-gray-200": "#EDECEB",
      },
    },
  },
  plugins: [],
};
