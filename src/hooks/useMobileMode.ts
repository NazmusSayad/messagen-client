import useMediaQuery from 'use-css-query'
const md = '48em' // 768px
const lg = '62em' // 992px

const useMobileMode = () => useMediaQuery(`(max-width: ${md})`)

export default useMobileMode
