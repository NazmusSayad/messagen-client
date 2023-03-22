import Dialog from '$components/Dialog'
import { ContactType } from '$slice/User'
import css from './ContactMenu.module.scss'

type Props = { contact: ContactType; close: Function }
export default function ({ contact, close }: Props) {
  return (
    <Dialog
      onBackdropClick={close}
      rootClassName={css.rootDialog}
      className={css.Dialog}
      open
    >
      ContactMenu
    </Dialog>
  )
}
