import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import useMobileMode from '$hooks/useMobileMode'
import { useStore } from '$store'
import Dialog from '$components/Dialog'
import MessageForm from './MessageForm'
import css from './index.module.scss'
import MessageContent from './MessageContent'

const index = () => {
  const isMobile = useMobileMode()
  const contact = useContact()
  if (!contact) return <Navigate to=".." />

  return (
    <Dialog open={isMobile} className={css.Dialog}>
      <h2>{contact.name ?? contact.user.name}</h2>
      <MessageContent contact={contact} />
      <MessageForm contact={contact} />
    </Dialog>
  )
}

const useContact = () => {
  const paramId = useParams().id!
  const contacts = useStore((state) => state.user.contacts)

  const contact = useMemo(() => {
    return contacts.find((contact) => contact._id === paramId)!
  }, [paramId, contacts])

  return contact
}

export default index
