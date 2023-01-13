import css from './index.module.scss'
import Nav from './Nav'
import HeroMain from './HeroMain'
import Wrapper from '$layouts/Wrapper'

const Hero = () => {
  return (
    <div className={`min-h-screen text-clr-1 bg-clr-9 relative isolate`}>
      <div
        className={$cn(
          css.heroBgImg,
          'inset-0 absolute bg-center bg-cover -z-50 opacity-30'
        )}
      />

      <Nav />

      <Wrapper>
        <HeroMain />
      </Wrapper>
    </div>
  )
}

export default Hero
