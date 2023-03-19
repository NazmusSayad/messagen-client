import { useWs } from '$api/ws'
import Message, { MessageType } from '$slice/Message'
import {
  createTempObjectId,
  parseFileListToBASE64,
  parseFileListToURL,
  parseFormInputs,
} from '$utils'
import { useState } from 'react'
import MessageTextInput from './MessageTextInput'
import css from './MessageForm.module.scss'
import { ContactType } from '$slice/User'
import { useStore } from '$store'

const MessageForm = ({ contact }: { contact: ContactType }) => {
  const ws = useWs()
  const [text, setText] = useState('')
  const user = useStore((state) => state.user.user)

  const handleSubmit = async (e) => {
    e.preventDefault()
    type UserInput = { text: string; images: FileList }
    const { text, images } = parseFormInputs<UserInput>(e.target)
    if (!text && images.length === 0) return
    const body = {
      to: contact._id,
      text: text || (undefined as any),
      images: await parseFileListToBASE64(images),
    }

    const tempId = createTempObjectId()
    const tempMessage: MessageType = {
      _id: tempId,
      from: user,
      ...body,
      images: parseFileListToURL(images),
      createdAt: Date.now().toString(),
      pending: true,
    }

    setText('')
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
      <input type="file" name="images" multiple />
      <MessageTextInput value={text} setValue={setText} />
      <button type="submit">Send</button>
    </form>
  )
}

export default MessageForm
