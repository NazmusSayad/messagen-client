import { ContactType } from '$slice/User'
import useMessages from './useMessages'
import css from './MessageContent.module.scss'
import { useLayoutEffect, useRef } from 'react'
import { ButtonBlank } from '$components/Button'

const MessageContent = ({ contact }: { contact: ContactType }) => {
  const [isLoading, messages] = useMessages(contact._id)
  const containerRef = useRef() as { current: HTMLDivElement }
  const forceScrollRef = useRef(true)

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
        <p key={message._id}>{message.text}</p>
      ))}
    </div>
  )
}

export default MessageContent
