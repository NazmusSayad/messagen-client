import { useState } from 'react'
import css from './Nav.module.scss'
import Wrapper from '$layouts/Wrapper'
import NavHumburger from './NavHumburger'

const Nav = () => {
  const [isActive, setIsActive] = useState(false)

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
        <h3 className={css.brand}>Messagen</h3>

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
          <div>Links</div>
          <div>Cta</div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Nav
