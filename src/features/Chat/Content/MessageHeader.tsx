import { ButtonBlank } from '$components/Button'
import { ContactType } from '$slice/User'
import css from './MessageHeader.module.scss'
import { IoArrowBack } from 'react-icons/io5'

type Props = { contact: ContactType; isMobile: boolean }
export default function MessageHeader({ contact, isMobile }: Props) {
  return (
    <div className={css.Header}>
      {isMobile && (
        <ButtonBlank to="..">
          <IoArrowBack />
        </ButtonBlank>
      )}

      <h3>{contact.name ?? contact.user.name}</h3>
    </div>
  )
}
