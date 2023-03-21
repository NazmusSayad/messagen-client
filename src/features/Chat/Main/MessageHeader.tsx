import { ButtonBlank } from '$components/Button'
import { ContactType } from '$slice/User'
import { useState } from 'react'
import { FiInfo } from 'react-icons/fi'
import ContactMenu from './ContactMenu'
import css from './MessageHeader.module.scss'

type Props = { contact: ContactType }
export default function MessageHeader({ contact }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className={css.Header}>
      <h3>{contact.name ?? contact.user.name}</h3>
      <ButtonBlank onClick={() => setIsMenuOpen(true)}>
        <FiInfo />
      </ButtonBlank>

      {isMenuOpen && (
        <ContactMenu contact={contact} close={() => setIsMenuOpen(false)} />
      )}
    </div>
  )
}
