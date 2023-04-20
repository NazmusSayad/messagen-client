import { ButtonBlank } from '$components/Button'
import Settings from '$slice/Settings'
import { useStore } from '$store'
import css from './Appearance.module.scss'
import {
  MdOutlineAutoMode,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from 'react-icons/md'

const Appearance = () => {
  const theme = useStore((state) => state.settings.theme)

  return (
    <div>
      <div className={css.theme}>
        <ButtonBlank
          onClick={() => $store(Settings.setTheme('auto'))}
          className={[css.auto, (theme === 'auto' || !theme) && css.active]}
        >
          <div className={css.dark}></div>
          <div className={css.light}></div>
          <div className={css.center}>
            <MdOutlineAutoMode />
          </div>
        </ButtonBlank>

        <ButtonBlank
          onClick={() => $store(Settings.setTheme('dark'))}
          className={[css.dark, theme === 'dark' && css.active]}
        >
          <div className={css.center}>
            <MdOutlineDarkMode />
          </div>
        </ButtonBlank>

        <ButtonBlank
          onClick={() => $store(Settings.setTheme('light'))}
          className={[css.light, theme === 'light' && css.active]}
        >
          <div className={css.center}>
            <MdOutlineLightMode />
          </div>
        </ButtonBlank>
      </div>
    </div>
  )
}

export default Appearance
