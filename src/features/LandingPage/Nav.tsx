import {
  MutableRefObject,
  PointerEvent,
  useMemo,
  useRef,
  useState,
} from 'react'
import css from './Nav.module.scss'
import Wrapper from '$layouts/Wrapper'
import NavHumburger from './NavHumburger'
import { ButtonBlank, ButtonOutline, ButtonText } from '$components/Button'

const Nav = () => {
  const [isActive, setIsActive] = useState(false)
  const backdropRef = useRef() as MutableRefObject<HTMLDivElement>
  useMemo(() => {
    if (isActive) {
      const root = document.querySelector('#Root')!
      root.scrollTop = 0
    }
  }, [isActive])

  const handleLinkHoverEnter = (e) => {
    const top = e.target.offsetTop
    const left = e.target.offsetLeft
    const width = e.target.clientWidth
    const height = e.target.clientHeight

    backdropRef.current.style.opacity = '1'
    backdropRef.current.style.top = `${top}px`
    backdropRef.current.style.left = `${left}px`
    backdropRef.current.style.width = `${width}px`
    backdropRef.current.style.height = `${height}px`
  }

  const handleLinkHoverLeave = (e) => {
    backdropRef.current.style.opacity = '0'
  }

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
          <h2>Messagen</h2>
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
          <div
            className={css.linksContainer}
            onPointerLeave={handleLinkHoverLeave}
          >
            <ButtonText nav to="/product" onPointerEnter={handleLinkHoverEnter}>
              Product
            </ButtonText>
            <ButtonText nav to="/pricing" onPointerEnter={handleLinkHoverEnter}>
              Pricing
            </ButtonText>
            <ButtonText nav to="/download" onPointerEnter={handleLinkHoverEnter}>
              Download
            </ButtonText>
            <ButtonText nav to="/contact" onPointerEnter={handleLinkHoverEnter}>
              Contact
            </ButtonText>

            <div className={css.linkBackdrop} ref={backdropRef}></div>
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
