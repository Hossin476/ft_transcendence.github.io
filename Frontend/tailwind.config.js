/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      green:colors.green,
      blue:colors.blue,
      transparent: 'transparent',
      current: 'currentColor',
      primaryColor:'hsl(271,100%,5%)',
      secondaryColor: 'hsl(270,33%,13%)',
      thirdColor: 'hsl(275,39%,70%)',
      forthColor:'#C77DFF',
      linkColor:'#BC9FD1',
      linkBgColor:'#2C2136',
      whiteTrans: '#221B35CC'

    },
    screens: {
      'xsm' : '320px',

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      width:{
         128:'32rem'
      },
      fontFamily:{
        'Valorax':['Valorax','sans-serif'],
        'Plaguard':['plaguard','sans-serif'],
        'poppins': ['poppins','sans-serif'],
        'inter': ['inter','sans-serif'],
      },
    },
  },
  plugins: [],
}

985