import { PropsWithChildren } from 'react'

const Wrapper = ({ className, children, ...props }: PropsWithChildren<any>) => {
  return (
    <div {...props} className={$cn('my-auto w-full max-w-[144rem]', className)}>
      {children}
    </div>
  )
}

export default Wrapper
