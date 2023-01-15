import css from './index.module.scss'
import RootLayout from '$layouts/RootLayout'
import Hero from './Hero'

const index = () => {
  return (
    <RootLayout className={css.LandingPage}>
      <Hero />
      Hello world!
    </RootLayout>
  )
}

export default index
