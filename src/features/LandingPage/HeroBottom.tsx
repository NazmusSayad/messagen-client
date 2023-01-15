import css from './HeroBottom.module.scss'
import macWallpeper from '$assets/mac-wallpaper.jpg'
import { useCallback, useLayoutEffect, useRef } from 'react'

const HeroBottom = ({ heroClass }: { heroClass: string }) => {
  const containerRef = useRef<HTMLDivElement>()!

  const handleChange = useCallback(() => {
    const hero = document.querySelector<HTMLDivElement>(`.${heroClass}`)!
    const container = containerRef.current as HTMLDivElement
    const margin =
      container.offsetTop + container.clientHeight * 1.33 - hero.clientHeight
    hero.style.marginBottom = `${margin > 0 ? margin : 0}px`
  }, [])

  useLayoutEffect(() => {
    handleChange()
    window.addEventListener('resize', handleChange)
    return () => {
      window.removeEventListener('resize', handleChange)
    }
  }, [])

  return (
    <div className={css.HeroBottom} ref={containerRef as any}>
      <div className={css.content}>
        <img src={macWallpeper} alt="Mac wallpaper..." onLoad={handleChange} />

        <div className={css.appScreenshot}>
          <img
            src={macWallpeper}
            alt="Mac wallpaper..."
            onLoad={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default HeroBottom
