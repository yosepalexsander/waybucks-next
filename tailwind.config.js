const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#BD0707',
      secondary: '#6207BD',
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      yellow: colors.yellow
    },
    extend: {},
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
