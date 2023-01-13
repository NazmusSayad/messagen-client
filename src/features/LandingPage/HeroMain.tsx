import css from './index.module.scss'
import { ButtonOutline, ButtonPrimary } from '$components/Button'

const HeroMain = () => {
  return (
    <div className={'text-center'}>
      <h1 className={$cn('text-7xl mt-[10vh] sm:mt-[12vh]', css.heroH1)}>
        Connect with your mate easily
      </h1>

      <p
        className={
          'max-w-[45ch] mx-auto text-clr-2 my-16 sm:my-[4.5rem] font-dm'
        }
      >
        Messagen is a communication application for friends, family, and teams
        all at once, wrapped in one user-friendly application.
      </p>

      <div className={'flex gap-4 justify-center'}>
        <ButtonOutline>Learn more</ButtonOutline>
        <ButtonPrimary>Start for free</ButtonPrimary>
      </div>

      <div>
        <img src="" alt="" />
      </div>
    </div>
  )
}

export default HeroMain
