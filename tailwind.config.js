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
      pink: colors.pink,
      yellow: colors.yellow,
      green: colors.green,
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
    maxWidth: {
      'xs': '16rem',
      'sm': '20rem',
      'md': '24rem',
      'lg': '28rem',
      'xl': '32rem'
    },
    extend: {
      flex: {
        '1/2': '0 1 50%',
        '2/5': '0 1 40%',
        '3/5': '0 1 60%'
      },
      ringColor: ['hover', 'active', 'focus'],
    },
    fill: theme => ({
      'current': 'currentColor',
      'red': theme('colors.red.500'),
      'blue': theme('colors.blue.500'),
      'pink': theme('colors.pink.500'),
    })
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
