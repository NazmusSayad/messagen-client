/** @type {import('tailwindcss').Config} */

const colors = [
  '#131517',
  '#1E1F25',
  '#282932',
  '#606389',
  '#296EFF',
  '#94b7ff',
  '#cadbff',
  '#e2ebff',
  '#f9fbff',
]

const lightColorsObj = Object.fromEntries(
  colors.map((color, ind) => [10 - (ind + 1), color])
)
const darkColorsObj = Object.fromEntries(
  colors.map((color, ind) => [ind + 1, color])
)

const themeSwapper = require('tailwindcss-theme-swapper')({
  themes: [
    {
      name: 'base',
      selectors: [':root'],
      theme: {
        colors: { clr: lightColorsObj },
      },
    },
    {
      name: 'dark',
      selectors: ['.theme-dark'],
      theme: {
        colors: { clr: darkColorsObj },
      },
    },
  ],
})

module.exports = {
  // mode: 'jit',
  content: {
    files: ['./src/**/*.{jsx,tsx}'],
    transform: require('tailwind-variant-group').default,
  },

  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      dm: ['DM Sans', 'sans-serif'],
    },
    screens: {
      xxs: '25em',
      xs: '31.25em',
      sm: '37.5em',
      md: '48em',
      lg: '62em',
      xl: '75em',
      xxl: '120em',
    },
  },
  plugins: [themeSwapper],
  corePlugins: {
    preflight: false,
  },
}
