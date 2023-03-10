import { useMemo, useState } from 'react'
import css from './Nav.module.scss'
import Wrapper from '$layouts/Wrapper'
import NavHumburger from './NavHumburger'
import { ButtonBlank, ButtonOutline, ButtonText } from '$components/Button'

const Nav = () => {
  const [isActive, setIsActive] = useState(false)

  useMemo(() => {
    if (isActive) {
      const root = document.querySelector('#Root')!
      root.scrollTop = 0
    }
  }, [isActive])

  return (
    <div className={css.Nav}>
      <style>
        {isActive &&
          `html {
            overflow-y: scroll;
          }
                    
          #Root {
            overflow: hidden !important;
          }`}
      </style>

      <Wrapper className={css.wrapper}>
        <ButtonBlank to="/" className={css.brand}>
          <h3>Messagen</h3>
        </ButtonBlank>

        <NavHumburger
          active={isActive}
          onClick={() => setIsActive((prev) => !prev)}
        />

        <div
          onClick={() => setIsActive(false)}
          className={css.backdrop}
          is-active={isActive ? '' : undefined}
        ></div>

        <div
          className={css.listContainer}
          is-active={isActive ? '' : undefined}
        >
          <div className={css.linksContainer}>
            <ButtonText nav to="/product">
              Product
            </ButtonText>
            <ButtonText nav to="/pricing">
              Pricing
            </ButtonText>
            <ButtonText nav to="/download">
              Download
            </ButtonText>
            <ButtonText nav to="/contact">
              Contact
            </ButtonText>
          </div>

          <div className={css.ctaContainer}>
            <ButtonOutline to="/login">Login</ButtonOutline>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Nav
