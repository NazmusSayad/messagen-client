import css from './index.module.scss'
import RootLayout from '$layouts/RootLayout'
import Hero from './Hero'
import Stats from './Stats'
import Features from './Features'

const index = () => {
  return (
    <RootLayout className={css.LandingPage}>
      <Hero />
      <Stats />
      <Features />

      <div style={{ height: '500vh' }} />
    </RootLayout>
  )
}

export default index
