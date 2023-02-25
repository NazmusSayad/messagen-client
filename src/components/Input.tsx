import { ComponentProps } from 'react'
import css from './Input.module.scss'

interface Props {
  className?: any
}

export const Input = ({
  className,
  ...props
}: ComponentProps<'input'> | Props) => {
  return <input {...props} className={$cn(css.Input, className)} />
}

export const Textarea = ({
  className,
  ...props
}: ComponentProps<'textarea'> & Props) => {
  return <textarea {...props} className={$cn(css.Textarea, className)} />
}
