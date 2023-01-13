import css from './index.module.scss'
import RootLayout from '$layouts/RootLayout'
import { lazy } from 'react'

// import Hero from './Hero'
const Hero = lazy(() => import('./Hero'))

const LandingPage = () => {
  return (
    <RootLayout className={css.LandingPage}>
      <Hero />
      Hello
    </RootLayout>
  )
}

export default LandingPage
