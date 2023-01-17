import Wrapper from '$layouts/Wrapper'
import css from './Hero.module.scss'
import HeroMain from './HeroMain'
import Nav from './Nav'
import bgImg from '$assets/hero-bg-2.jpg'
import HeroBottom from './HeroBottom'

const Hero = () => {
  return (
    <div className={css.Hero} {...{ theme: 'dark' }}>
      <div className={css.Img}>
        <img src={bgImg} alt="Hero background image..." />
      </div>

      <Nav />

      <Wrapper>
        <HeroMain />
      </Wrapper>

      <HeroBottom heroClass={css.Hero} />
    </div>
  )
}

export default Hero
