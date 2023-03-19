import { useWs } from '$api/ws'
import Message from '$slice/Message'
import { parseFormInputs } from '$utils'
import { useState } from 'react'
import MessageTextInput from './MessageTextInput'
import css from './MessageForm.module.scss'
import { ContactType } from '$slice/User'

const MessageForm = ({ contact }: { contact: ContactType }) => {
  const ws = useWs()
  const [text, setText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const [formData] = parseFormInputs(e.target)
    const body = { ...formData, to: contact._id }

    setText('')
    const data = await ws.send('messages/post', body)
    data && $store(Message.addMessage(data.message))
  }

  return (
    <form onSubmit={handleSubmit}>
      <MessageTextInput value={text} setValue={setText} />
      <button type="submit">Send</button>
    </form>
  )
}

export default MessageForm
