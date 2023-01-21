import css from './Layout.module.scss'
import FooterWave from '$assets/footer-wave.svg?component'

const Layout = ({ children }) => {
  return (
    <div>
      {children}
      <FooterWave />
    </div>
  )
}

export default Layout
