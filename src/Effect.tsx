import { useStore } from '$store'
import { useLayoutEffect } from 'react'

const Effect = () => {
  const theme = useStore((state) => state.settings.theme)

  useLayoutEffect(() => {
    const target = document.body
    theme
      ? target.setAttribute('theme', theme)
      : target.removeAttribute('theme')
  }, [theme])

  return <></>
}

export default Effect
