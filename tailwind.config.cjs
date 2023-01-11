/** @type {import('tailwindcss').Config} */

const baseColors = [
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

const baseColorsObj = Object.fromEntries(
  baseColors.map((color, ind) => [10 - (ind + 1), color])
)
const darkColorsObj = Object.fromEntries(
  baseColors.map((color, ind) => [ind + 1, color])
)

const themeSwapper = require('tailwindcss-theme-swapper')({
  themes: [
    {
      name: 'base',
      selectors: [':root'],
      theme: {
        colors: { clr: baseColorsObj },
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
  content: ['./src/**/*.{jsx,tsx}'],
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
}
