import { ButtonOutline, ButtonPrimary } from '$components/Button'
import css from './HeroMain.module.scss'

const HeroMain = () => {
  return (
    <div className={css.Main}>
      <h1 className={css.header}>Connect with your mate easily</h1>

      <p className={css.paragraph}>
        Messagen is a communication application for friends, family, and teams
        all at once, wrapped in one user-friendly application.
      </p>

      <div className={css.buttons}>
        <ButtonOutline href="#learn-more">Learn more</ButtonOutline>
        <ButtonPrimary to="signup">Start for free</ButtonPrimary>
      </div>
    </div>
  )
}

export default HeroMain
