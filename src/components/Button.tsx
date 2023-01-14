import css from './Button.module.scss'

export const Button = ({
  blank = false,
  disabled,
  className,
  children,
  loading = false,
  loadingElement = 'Loading...',
  ...props
}: {
  blank?: boolean
  disabled?: boolean
  className?: string | any[]
  children: any
  loading?: boolean
  loadingElement?: any
  [i: string]: any
}) => {
  props.disabled ??= loading

  return (
    <button
      {...props}
      className={$cn(blank || 'button', css.Button, className)}
    >
      {loading ? <div className={css.loading}>{loadingElement}</div> : children}
    </button>
  )
}

export const ButtonBlank = ({
  className,
  ...props
}: Parameters<typeof Button>[0]) => {
  return <Button {...props} className={['focus', className]} blank />
}

export const ButtonReset = ({
  className,
  ...props
}: Parameters<typeof Button>[0]) => {
  return (
    <Button
      {...props}
      className={['focus', css.ButtonReset, className]}
      blank
    />
  )
}

export const ButtonPrimary = ({
  className,
  ...props
}: Parameters<typeof Button>[0]) => {
  return <Button {...props} className={['button__primary', className]} />
}

export const ButtonSecondary = ({
  className,
  ...props
}: Parameters<typeof Button>[0]) => {
  return <Button {...props} className={['button__secondary', className]} />
}

export const ButtonOutline = ({
  className,
  ...props
}: Parameters<typeof Button>[0]) => {
  return <Button {...props} className={['button__outline', className]} />
}

export const ButtonRed = ({
  className,
  ...props
}: Parameters<typeof Button>[0]) => {
  return <Button {...props} className={['button__red', className]} />
}
