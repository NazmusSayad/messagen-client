import { ContactType } from '$slice/User'
import useMessages from './useMessages'
import css from './MessageContent.module.scss'
import { useLayoutEffect, useRef, useState } from 'react'
import { ButtonBlank } from '$components/Button'
import Card from './Card'
import { useStore } from '$store'
import ImageModal from './ImageModal'

const MessageContent = ({ contact }: { contact: ContactType }) => {
  const forceScrollRef = useRef(true)
  const [isLoading, messages] = useMessages(contact._id, forceScrollRef)
  const containerRef = useRef() as { current: HTMLDivElement }
  const userId = useStore((state) => state.user.user._id)
  const [images, setImages] = useState<{ active: number; images: string[] }>({
    images: [],
  } as any)

  const scrollToBottom = (force = false) => {
    const scrollHeight = containerRef.current.scrollHeight
    const scrollTop = containerRef.current.scrollTop
    const height = containerRef.current.clientHeight
    const scrollBottom = scrollHeight - scrollTop - height

    forceScrollRef.current = false
    if (force || forceScrollRef.current || scrollBottom < height) {
      containerRef.current.scrollTop = scrollHeight
    }
  }

  useLayoutEffect(() => {
    scrollToBottom(messages.at(-1)?.from._id === userId)
  }, [messages.length, userId])

  return (
    <div ref={containerRef} className={css.MessageContent}>
      {isLoading && <ButtonBlank loading className={css.loading} children="" />}
      {images.active != null && <ImageModal {...images} setImage={setImages} />}

      {messages.map((message) => (
        <Card
          key={message._id}
          message={message}
          setImages={setImages}
          you={message.from._id === userId}
          scrollToBottom={scrollToBottom}
        />
      ))}
    </div>
  )
}

export default MessageContent
