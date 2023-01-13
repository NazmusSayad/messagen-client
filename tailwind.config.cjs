const generateColorObj = (invert) => {
  const colors = [
    '#131517',
    '#1E1F25',
    '#282932',
    '#606389',
    '#4569c4',
    '#296EFF',
    '#5f93ff',
    '#94b7ff',
    '#cadbff',
    '#e2ebff',
    '#f9fbff',
  ]
  const output = {}
  ;(invert ? colors.reverse() : colors).forEach((clr, ind) => {
    output[ind] = clr
    output['0' + ind] = clr
  })

  return output
}

const themeSwapper = require('tailwindcss-theme-swapper')({
  themes: [
    {
      name: 'base',
      selectors: [':root'],
      theme: {
        colors: { clr: generateColorObj(true) },
      },
    },
    {
      name: 'dark',
      selectors: ['.theme-dark'],
      theme: {
        colors: { clr: generateColorObj(false) },
      },
    },
  ],
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: {
    files: ['./src/**/*.{jsx,tsx}'],
    transform: require('tailwind-variant-group').default,
  },

  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      rubik: ['Rubik', 'sans-serif'],
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
