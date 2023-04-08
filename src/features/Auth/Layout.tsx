import css from './Layout.module.scss'
import FooterWave from '$assets/footer-wave.svg?component'
import { ButtonBlank } from '$components/Button'

const Layout = ({ children, onSubmit, label = '', link = '', des = '' }) => {
  return (
    <div className={css.Container}>
      <div className={css.content}>
        <form onSubmit={onSubmit}>{children}</form>
        <p className={css.footer}>
          {des} <ButtonBlank to={link}>{label}</ButtonBlank>
        </p>
      </div>

      <div className={css.wave}>
        <FooterWave />
      </div>
    </div>
  )
}

export default Layout
