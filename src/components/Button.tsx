import { Link, NavLink } from 'react-router-dom'
import css from './Button.module.scss'

type ButtonProps = Parameters<typeof Button>[0]
type ButtonCustomProps = {
  children: any
  default?: boolean
  className?: string | any[]
  loading?: boolean
  loadingElement?: any
  href?: string
  to?: string
  nav?: boolean
  [i: string]: any
}

export const Button = ({
  default: defaultStyles = false,
  className,
  children,
  loading = false,
  loadingElement = 'Loading...',
  href,
  to,
  nav,
  ...props
}: ButtonCustomProps) => {
  props.disabled ??= loading
  const allProps = {
    ...props,
    className: $cn(defaultStyles || 'button', 'buttonFocus', className),
  }

  if (href) return <a {...allProps} href={href} children={children} />
  if (to) {
    return nav ? (
      <NavLink {...allProps} to={to} children={children} />
    ) : (
      <Link {...allProps} to={to} children={children} />
    )
  }

  return (
    <button {...allProps}>
      {loading ? <div className={css.loading}>{loadingElement}</div> : children}
    </button>
  )
}

export const ButtonDefault = (props: ButtonProps) => {
  return <Button {...props} default />
}

export const ButtonBlank = ({ className, ...props }: ButtonProps) => {
  return <Button {...props} className={['button__blank', className]} default />
}

export const ButtonText = ({ className, ...props }: ButtonProps) => {
  return <Button {...props} className={['button__text', className]} />
}

export const ButtonPrimary = ({ className, ...props }: ButtonProps) => {
  return <Button {...props} className={['button__primary', className]} />
}

export const ButtonSecondary = ({ className, ...props }: ButtonProps) => {
  return <Button {...props} className={['button__secondary', className]} />
}

export const ButtonOutline = ({ className, ...props }: ButtonProps) => {
  return <Button {...props} className={['button__outline', className]} />
}

export const ButtonRed = ({ className, ...props }: ButtonProps) => {
  return <Button {...props} className={['button__red', className]} />
}
