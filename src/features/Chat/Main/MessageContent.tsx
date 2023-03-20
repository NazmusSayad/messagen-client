import { ContactType } from '$slice/User'
import useMessages from './useMessages'
import css from './MessageContent.module.scss'
import { useLayoutEffect, useRef } from 'react'
import { ButtonBlank } from '$components/Button'

const MessageContent = ({ contact }: { contact: ContactType }) => {
  const forceScrollRef = useRef(true)
  const [isLoading, messages] = useMessages(contact._id, forceScrollRef)
  const containerRef = useRef() as { current: HTMLDivElement }

  useLayoutEffect(() => {
    const scrollHeight = containerRef.current.scrollHeight
    const scrollTop = containerRef.current.scrollTop
    const height = containerRef.current.clientHeight
    const scrollBottom = scrollHeight - scrollTop - height

    if (!forceScrollRef && scrollBottom > 400) return
    containerRef.current.scrollTop = scrollHeight
    forceScrollRef.current = false
  }, [messages.length])

  return (
    <div ref={containerRef} className={css.MessageContent}>
      {isLoading && <ButtonBlank loading className={css.loading} children="" />}

      {messages.map((message) => (
        <div key={message._id}>
          <p>{message.pending && '...'}</p>
          <p>{message.text}</p>
          <p>{message.images}</p>
          <p>{message.error}</p>
        </div>
      ))}
    </div>
  )
}

export default MessageContent
