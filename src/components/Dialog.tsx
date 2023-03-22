import { KeyboardEvent, useLayoutEffect, useRef } from 'react'
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
    if (dialogRef.current.open) dialogRef.current.close()
    dialogRef.current.showModal()
  }, [open])

  const handleCancel = (e) => {
    e.preventDefault()
  }

  return (
    <dialog
      {...commonProps}
      ref={dialogRef as any}
      onCancel={handleCancel}
      aria-modal={open || undefined}
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
