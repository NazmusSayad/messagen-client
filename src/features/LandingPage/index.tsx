import css from './index.module.scss'
import RootLayout from '$layouts/RootLayout'
import Hero from './Hero'
import Stats from './Stats'
import Features from './Features'
import Reviews from './Reviews'

const index = () => {
  return (
    <RootLayout className={css.LandingPage}>
      <Hero />
      <Stats />
      <Features />
      <Reviews />

      <div style={{ height: '500vh' }} />
    </RootLayout>
  )
}

export default index
