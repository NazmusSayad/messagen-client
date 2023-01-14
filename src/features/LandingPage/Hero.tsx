import Wrapper from '$layouts/Wrapper'
import css from './Hero.module.scss'
import HeroMain from './HeroMain'
import Nav from './Nav'
import bgImg from '$assets/hero-bg.webp'

const Hero = () => {
  return (
    <div className={css.Hero} {...{ theme: 'dark' }}>
      <img className={css.Img} src={bgImg} alt="" />

      <Nav />

      <Wrapper>
        <HeroMain />
      </Wrapper>
    </div>
  )
}

export default Hero
