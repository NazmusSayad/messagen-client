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

  const closeParent = () => {
    const element = dialogRef.current.parentElement
    const parentDialog = element?.closest<HTMLDialogElement>('dialog[open]')
    parentDialog?.close()
    return parentDialog
  }

  useLayoutEffect(() => {
    dialogRef.current.close()

    if (open) {
      closeParent()?.show()
      const child = dialogRef.current.querySelector('dialog[open]')
      child ? dialogRef.current.show() : dialogRef.current.showModal()
    } else {
      closeParent()?.showModal()
    }

    return () => closeParent()?.showModal()
  }, [open])

  /*   useLayoutEffect(() => {
    const elemets = (
      [
        ...document.querySelectorAll(`dialog.${css.Dialog}[data-id]`),
      ] as HTMLDialogElement[]
    )
      .filter((a) => a !== dialogRef.current)
      .sort((a, b) => +a.dataset.id! - +a.dataset.id!)

    if (!open) {
      elemets.at(-1)?.close()
      elemets.at(-1)?.showModal()
      dialogRef.current.removeAttribute('data-id')
      return dialogRef.current.close()
    }
    if (dialogRef.current.open) dialogRef.current.close()

    elemets.forEach((dialog) => {
      dialog.close()
      dialog.show()
    })

    const lastInd = +(elemets.at(-1)?.dataset.id! || 0)
    dialogRef.current.dataset.id = String(lastInd + 1)
    dialogRef.current.showModal()
  }, [open]) */

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
