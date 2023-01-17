import css from './index.module.scss'
import RootLayout from '$layouts/RootLayout'
import Hero from './Hero'
import Stats from './Stats'
import FeaturesOverview from './FeaturesOverview'

const index = () => {
  return (
    <RootLayout className={css.LandingPage}>
      <Hero />
      <Stats />
      <FeaturesOverview />

      <div style={{ height: '500vh' }} />
    </RootLayout>
  )
}

export default index
