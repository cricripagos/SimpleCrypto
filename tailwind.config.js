const {fontFamily} = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Nunito', ...fontFamily.sans],
      },
      colors: {
        'green-1': 'rgb(57, 91, 100)',
        'green-2': 'rgb(76, 115, 113)',
        'transparent-dark': 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
