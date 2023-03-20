import { useWs } from '$api/ws'
import { useState } from 'react'
import Message, { MessageType } from '$slice/Message'
import { createTempObjectId, parseFilesToURL, parseFilesToBASE64 } from '$utils'
import MessageTextInput from './MessageTextInput'
import { ContactType } from '$slice/User'
import { useStore } from '$store'
import { ButtonBlank } from '$components/Button'
import MessageFileInput from './MessageFileInput'
import css from './MessageForm.module.scss'

const MessageForm = ({ contact }: { contact: ContactType }) => {
  const ws = useWs()
  const [text, setText] = useState('')
  const [images, setImages] = useState([] as File[])
  const user = useStore((state) => state.user.user)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text && images.length === 0) return
    const body = {
      to: contact._id,
      text: text || (undefined as any),
      images: await parseFilesToBASE64(images),
    }

    const tempId = createTempObjectId()
    const tempMessage: MessageType = {
      _id: tempId,
      from: user,
      ...body,
      images: parseFilesToURL(images),
      createdAt: Date.now().toString(),
      pending: true,
    }

    setText('')
    setImages([])
    $store(Message.addMessage(tempMessage))
    const data = await ws.send('messages/post', body)
    $store(
      Message.replaceMessage({
        id: tempId,
        message:
          data && data.message
            ? data.message
            : { ...tempMessage, error: ws.error ?? 'Failed' },
      })
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <MessageFileInput setValue={setImages} />
      <MessageTextInput value={text} setValue={setText} />
      <ButtonBlank type="submit">Send</ButtonBlank>
    </form>
  )
}

export default MessageForm
