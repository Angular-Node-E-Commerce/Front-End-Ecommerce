/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      'foshia': '#e75e8d ',
      'blackback':'#1f2122',
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

