import css from './RootLayout.module.scss'
import { PropsWithChildren } from 'react'

const RootLayout = ({
  className,
  children,
  ...props
}: PropsWithChildren<any>) => {
  return (
    <div {...props} className={$cn(css.RootLayout, className)}>
      {children}
    </div>
  )
}

export default RootLayout
