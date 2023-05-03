import { ComponentProps, forwardRef } from 'react'
import css from './Input.module.scss'

interface Props {
  className?: any
}

export const Input = forwardRef(
  ({ className, ...props }: ComponentProps<'input'> & Props, ref) => {
    return (
      <input
        {...props}
        className={$cn(css.Input, className)}
        ref={ref as any}
      />
    )
  }
)

export const Textarea = ({
  className,
  ...props
}: ComponentProps<'textarea'> & Props) => {
  return <textarea {...props} className={$cn(css.Textarea, className)} />
}
