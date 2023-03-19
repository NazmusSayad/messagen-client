import { useLayoutEffect, useRef } from 'react'
import css from './Dialog.module.scss'

type Props = {
  children: any
  open?: boolean

  className?: any
  openClassName?: any
  closeClassName?: any

  rootClassName?: any
  openRootClassName?: any
  closeRootClassName?: any

  backdropClassName?: any
  openBackdropClassName?: any
  closeBackdropClassName?: any

  onBackdropClick?: Function
  [key: string]: any
}

const Dialog = ({
  open = false,
  className,
  openClassName,
  closeClassName,

  rootClassName,
  openRootClassName,
  closeRootClassName,

  backdropClassName,
  openBackdropClassName,
  closeBackdropClassName,

  onBackdropClick,
  ...props
}: Props) => {
  const dialogRef = useRef() as { current: HTMLDialogElement }
  const commonProps = { active: open ? '' : undefined }

  useLayoutEffect(() => {
    if (!open) return dialogRef.current.close()
    dialogRef.current.open || dialogRef.current.showModal()
  }, [open])

  return (
    <dialog
      ref={dialogRef as any}
      {...commonProps}
      className={$cn(
        css.Dialog,
        rootClassName,
        open ? openRootClassName : closeRootClassName
      )}
    >
      <div
        {...commonProps}
        onClick={onBackdropClick as any}
        className={$cn(
          css.backdrop,
          backdropClassName,
          open ? openBackdropClassName : closeBackdropClassName
        )}
      />

      <div
        {...commonProps}
        {...props}
        className={$cn(
          css.main,
          className,
          open ? openClassName : closeClassName
        )}
      />
    </dialog>
  )
}

export default Dialog
