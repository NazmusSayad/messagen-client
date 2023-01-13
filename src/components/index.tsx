import React from 'react'

export const BlankButton = ({
  className,
  ...props
}: React.ComponentProps<'button'>) => {
  return (
    <button
      {...props}
      className={$cn.tw('border-none bg-transparent', className)}
    />
  )
}
