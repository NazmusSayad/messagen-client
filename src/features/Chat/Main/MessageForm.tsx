import { useWs } from '$api/ws'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import Message, { MessageType } from '$slice/Message'
import { useStore } from '$store'
import { ContactType } from '$slice/User'
import { createTempObjectId, parseFilesToURL, parseFilesToBASE64 } from '$utils'
import { ButtonBlank } from '$components/Button'
import MessageTextInput from './InputText'
import MessageFileInput from './InputImages'
import css from './MessageForm.module.scss'

const MessageForm = ({ contact }: { contact: ContactType }) => {
  const ws = useWs()
  const [text, setText] = useState('')
  const [form, preview, addImg, getImg, clearImg] = useImagePreview(contact._id)
  const user = useStore((state) => state.user.user)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const images = getImg()
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
    clearImg()
    $store(Message.addMessage(tempMessage))
    const data = await ws.send('messages/post', body)

    $store(
      Message.replaceMessage({
        id: tempId,
        message: data
          ? data.message
          : { ...tempMessage, pending: false, error: 'Failed' },
      })
    )
  }

  const openImageInFS = () => {
    form.current.querySelector('input[name="images"]').click()
  }

  return (
    <form onSubmit={handleSubmit} className={css.Form} ref={form}>
      {preview}
      <MessageFileInput addImage={addImg} />

      <div className={css.inputContainer}>
        <ButtonBlank onClick={openImageInFS}>AddImage</ButtonBlank>
        <MessageTextInput value={text} setValue={setText} />
        <ButtonBlank type="submit">Send</ButtonBlank>
      </div>
    </form>
  )
}

const useImagePreview = (contactId: string) => {
  const imageContainer = useRef<any>()
  const formRef = useRef() as { current: HTMLFormElement }
  imageContainer.current ??= <div className={css.Preview} />

  const getImageContainer = (): HTMLDivElement => {
    return formRef.current.querySelector(`.${css.Preview}`)!
  }

  const addImage = (file: File) => {
    const div = document.createElement('div') as HTMLDivElement & { file: File }
    const url = URL.createObjectURL(file)
    div.innerHTML = `<img src=${url} />`
    div.file = file

    const handleClick = () => {
      div.classList.add(css.remove)
      div.remove()
    }

    div.addEventListener('click', handleClick)
    getImageContainer().appendChild(div)
  }

  const getImages = () => {
    return [...getImageContainer().children].map((div: any) => {
      return div.file
    })
  }

  const clearImages = () => {
    getImageContainer().innerHTML = ''
  }

  useLayoutEffect(clearImages, [contactId])

  return [formRef, imageContainer.current, addImage, getImages, clearImages]
}

export default MessageForm
