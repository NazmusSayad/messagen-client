import { ContactType } from '$slice/User'
import css from './MessageHeader.module.scss'

type Props = { contact: ContactType }
export default function MessageHeader({ contact }: Props) {
  return (
    <div className={css.Header}>
      <h3>{contact.name ?? contact.user.name}</h3>
    </div>
  )
}
