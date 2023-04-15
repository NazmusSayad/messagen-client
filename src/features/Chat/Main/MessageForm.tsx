import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useWs } from '$api/ws'
import Message, { MessageType } from '$slice/Message'
import { useStore } from '$store'
import { ContactType } from '$slice/User'
import { createTempObjectId, parseFilesToURL, convertToFormData } from '$utils'
import { ButtonBlank } from '$components/Button'
import MessageTextInput from './InputText'
import MessageFileInput from './InputImages'
import { BsImage } from 'react-icons/bs'
import { IoSend } from 'react-icons/io5'
import css from './MessageForm.module.scss'
import { useApi } from '$api/http'

const MessageForm = ({ contact }: { contact: ContactType }) => {
  const ws = useWs()
  const api = useApi()
  const [text, setText] = useState('')
  const [form, preview, addImg, getImg, clearImg] = useImagePreview(contact._id)
  const user = useStore((state) => state.user.user)
  const inputUniqueId = useRef() as MutableRefObject<string>
  inputUniqueId.current ??= createTempObjectId()

  const focusTextArea = () => {
    document
      .querySelector<HTMLTextAreaElement>(`.${inputUniqueId.current}`)
      ?.focus()
  }

  useEffect(focusTextArea, [contact?._id])

  const handleSubmit = async (e) => {
    focusTextArea()
    e.preventDefault()
    const images = getImg()
    if (!text && images.length === 0) return
    const body: any = { to: contact._id }
    if (text) body.text = text
    if (images.length) body.images = images

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

    const data = await (body.images
      ? api.post('/messages', convertToFormData(body))
      : ws.send('messages/post', body))

    ;(async () => {
      $store(
        Message.replaceMessage({
          id: tempId,
          message: data
            ? data.message
            : { ...tempMessage, pending: false, error: ws.error, failed: true },
        })
      )
    })()
  }

  const openImageInFS = () => {
    form.current.querySelector('input[name="images"]').click()
  }

  return (
    <form onSubmit={handleSubmit} className={css.Form} ref={form}>
      {preview}
      <MessageFileInput addImage={addImg} focusTextArea={focusTextArea} />

      <div className={css.inputContainer}>
        <ButtonBlank type="button" onClick={openImageInFS} className={css.icon}>
          <BsImage />
        </ButtonBlank>

        <MessageTextInput
          value={text}
          addImage={addImg}
          setValue={setText}
          id={inputUniqueId.current}
        />

        <ButtonBlank type="submit" className={css.icon}>
          <IoSend />
        </ButtonBlank>
      </div>

      {api.error}
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

    const container = getImageContainer()
    div.addEventListener('click', handleClick)
    container.appendChild(div)
    container.onwheel = (e: any) => {
      const length = e.wheelDelta * -1
      e.currentTarget.scrollLeft += length
    }
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
