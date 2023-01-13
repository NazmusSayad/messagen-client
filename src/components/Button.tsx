import React from 'react'
import css from './Button.module.scss'

export const ButtonPrimary = ({
  className,
  ...props
}: React.ComponentProps<'button'>) => {
  return (
    <button
      {...props}
      className={$cn(
        css.Button,
        'bg-clr-05 hover:bg-clr-06 active:bg-clr-07',
        className
      )}
    />
  )
}

export const ButtonSecondary = ({
  className,
  ...props
}: React.ComponentProps<'button'>) => {
  return <button {...props} className={$cn(css.Button, '')} />
}

export const ButtonOutline = ({
  className,
  ...props
}: React.ComponentProps<'button'>) => {
  return (
    <button
      {...props}
      className={$cn.tw(
        css.Button,
        'bg-transparent border-solid border-2 border-clr-00 ',
        // 'hover:(bg-clr-01 text-clr-010)',
        css.outline,
        'active:(border-clr-03 bg-clr-03 text-clr-010)',
        className
      )}
    />
  )
}
