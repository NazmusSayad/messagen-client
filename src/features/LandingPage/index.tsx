import css from './index.module.scss'
import RootLayout from '$layouts/RootLayout'
import Hero from './Hero'

const LandingPage = () => {
  return (
    <RootLayout className={css.LandingPage}>
      <Hero />
    </RootLayout>
  )
}

export default LandingPage
