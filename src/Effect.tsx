import { useStore } from '$store'
import { setLocalStorage } from '$utils'
import { useLayoutEffect } from 'react'

const Effect = () => {
  const settings = useStore((state) => state.settings)

  useLayoutEffect(() => {
    setLocalStorage('settings', settings)
  }, [settings])

  useLayoutEffect(() => {
    const target = document.body
    settings.theme
      ? target.setAttribute('theme', settings.theme)
      : target.removeAttribute('theme')
  }, [settings.theme])

  return <></>
}

export default Effect
