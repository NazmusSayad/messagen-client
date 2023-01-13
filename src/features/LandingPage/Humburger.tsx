import React from 'react'
import css from './index.module.scss'
import { BlankButton } from '$components'

const Humburger = ({
  active,
  className,
  ...props
}: React.ComponentProps<'button'> & { active: boolean }) => {
  const lineCommon =
    'h-1 bg-clr-1 rounded-full ml-auto transition-[width,transform]'

  return (
    <BlankButton
      {...props}
      className={$cn.tw(
        'relative z-50 w-9 h-9 flex flex-col justify-around',
        'md:hidden',
        className
      )}
    >
      <div
        className={$cn.tw(
          lineCommon,
          'w-[75%] origin-top-right',
          active && '!w-full rotate-[-45deg]'
        )}
      />
      <div
        className={$cn.tw(
          lineCommon,
          'w-full',
          active ? css.humburgerActive : css.humburgerInactive
        )}
      />
      <div
        className={$cn.tw(
          lineCommon,
          'w-[50%] origin-bottom-right',
          active && '!w-full rotate-[45deg]'
        )}
      />
    </BlankButton>
  )
}

export default Humburger
