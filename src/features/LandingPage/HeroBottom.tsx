import css from './HeroBottom.module.scss'
import macWallpeper from '$assets/mac-wallpaper.jpg'
import appScreenshot from '$assets/app-screenshot.png'
import { useCallback, useLayoutEffect, useRef } from 'react'

const HeroBottom = ({ heroClass }: { heroClass: string }) => {
  const bottomImageRef = useRef<HTMLImageElement>()!
  const containerRef = useRef<HTMLDivElement>()!

  const handleChange = useCallback(() => {
    const hero = document.querySelector<HTMLDivElement>(`.${heroClass}`)!
    const container = containerRef.current as HTMLDivElement
    const bottomImg = bottomImageRef.current as HTMLImageElement

    const margin =
      container.offsetTop +
      bottomImg.clientHeight * 1.33 -
      hero.clientHeight +
      60

    hero.style.marginBottom = `calc(${margin > 0 ? margin : 0}px - 1.5vh + 1vw)`
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
            ref={bottomImageRef as any}
            src={appScreenshot}
            alt="Mac wallpaper..."
            onLoad={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default HeroBottom
