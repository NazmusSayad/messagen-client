import css from './index.module.scss'
import RootLayout from '$layouts/RootLayout'
import Hero from './Hero'
import Stats from './Stats'

const index = () => {
  return (
    <RootLayout className={css.LandingPage}>
      <Hero />
      <Stats />
    </RootLayout>
  )
}

export default index
