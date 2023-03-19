import css from './NavHumburger.module.scss'
import React from 'react'
import { ButtonBlank } from '$components/Button'

const Humburger = ({
  active,
  ...props
}: React.ComponentProps<'button'> & { active: boolean }) => {
  return (
    <ButtonBlank
      {...(props as any)}
      is-active={active ? '' : undefined}
      className={css.Humburger}
    >
      <div />
      <div />
      <div />
    </ButtonBlank>
  )
}

export default Humburger
