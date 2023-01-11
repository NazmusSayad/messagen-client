import { PropsWithChildren } from 'react'

const RootLayout = ({
  className,
  children,
  ...props
}: PropsWithChildren<any>) => {
  return (
    <div {...props} className={$cn('min-h-[100%]', className)}>
      {children}
    </div>
  )
}

export default RootLayout
