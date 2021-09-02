const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#BD0707',
      secondary: '#6207BD',
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      yellow: colors.yellow,
      white: colors.white,
      gray: colors.gray,
      transparent: 'transparent'
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '50%'
    },
    extend: {
      flex: {
        '1/2': '0 1 50%',
        '2/5': '0 1 40%',
        '3/5': '0 1 60%'
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
