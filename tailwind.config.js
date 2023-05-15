/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#FF6347',
        'main-blur': 'rgba(255, 99, 71, 0.3)',
        'background-main': '#F1F1F1',
        'black': '#2F2F2F',
        'success': '#4E9D64',
      },
      height: {
        'jumbotron': '170px',
        'jumbotron-search': '130px',
        'search': '33px'
      },
      borderRadius: {
        'search': '12px'
      },
      fontSize: {
        'search': '9px'
      },
      screens: {
        'tablet': '396px'
      },
      inset: {
        '22': '86px'
      },
      keyframes: {
        "dot-keyframes": {
          "33%": {
            "background-size": 'calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%'
          },
          "50%": {
            "background-size": 'calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%'
          },
          "66%": {
            "background-size": 'calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%'
          }
        }
      },
      animation: {
        "dot-loader": 'dot-keyframes 1s infinite linear'
      }
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addComponents({
        '.dot-load': {
          width: "56px",
          height: "13.4px",
          background: "radial-gradient(circle closest-side,#ff6347 90%,#0000) 0%   50%, radial-gradient(circle closest-side,#ff6347 90%,#0000) 50%  50%, radial-gradient(circle closest-side,#ff6347 90%,#0000) 100% 50%",
          backgroundSize: "calc(100%/3) 100%",
          backgroundRepeat: "no-repeat",
          // animation: "dot-keyframes 1s infinite linear"
        }
      })
    })
  ],
}