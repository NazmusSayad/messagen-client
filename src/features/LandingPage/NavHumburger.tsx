import css from './NavHumburger.module.scss'
import React from 'react'
import { ButtonReset } from '$components/Button'

const Humburger = ({
  active,
  ...props
}: React.ComponentProps<'button'> & { active: boolean }) => {
  return (
    <ButtonReset
      {...props}
      is-active={active ? '' : undefined}
      className={css.Humburger}
    >
      <div />
      <div />
      <div />
    </ButtonReset>
  )
}

export default Humburger
