import { ContactType } from '$slice/User'
import useMessages from './useMessages'
import css from './MessageContent.module.scss'
import { useLayoutEffect, useRef } from 'react'

const MessageContent = ({ contact }: { contact: ContactType }) => {
  const [isLoading, messages] = useMessages(contact._id)
  const containerRef = useRef() as { current: HTMLDivElement }

  useLayoutEffect(() => {
    const scrollHeight = containerRef.current.scrollHeight
    const scrollTop = containerRef.current.scrollTop
    const height = containerRef.current.clientHeight
    const scrollBottom = scrollHeight - scrollTop - height

    if (scrollBottom > 400) return
    containerRef.current.scrollTop = scrollHeight
  }, [messages.length])

  return (
    <div ref={containerRef} className={css.MessageContent}>
      {isLoading && 'Loading...'}

      {messages.map((message) => (
        <p key={message._id}>{message.text}</p>
      ))}
    </div>
  )
}

export default MessageContent
