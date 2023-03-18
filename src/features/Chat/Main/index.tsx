import { useWs } from '$api/ws'
import Message from '$slice/Message'
import { ContactType } from '$slice/User'
import { useStore } from '$store'
import { FormEvent, useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import css from './index.module.scss'

const index = () => {
  const ws = useWs()
  const contact = useContact()
  if (!contact) return <Navigate to=".." />

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      to: contact._id,
      text: e.target['text'].value,
    }

    const data = await ws.send('messages/post', body)
    console.log(data)
    $store(Message.addMessage(data.message))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea name="text" />
        <button type="submit">Send</button>
      </form>
    </div>
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
