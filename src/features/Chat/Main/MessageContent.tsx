import { ContactType } from '$slice/User'
import useMessages from './useMessages'
import css from './MessageContent.module.scss'
import { useLayoutEffect, useRef } from 'react'
import { ButtonBlank } from '$components/Button'
import Card from './Card'
import { useStore } from '$store'

const MessageContent = ({ contact }: { contact: ContactType }) => {
  const forceScrollRef = useRef(true)
  const [isLoading, messages] = useMessages(contact._id, forceScrollRef)
  const containerRef = useRef() as { current: HTMLDivElement }
  const userId = useStore((state) => state.user.user._id)

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
        <Card
          key={message._id}
          message={message}
          you={message.from._id === userId}
        />
      ))}
    </div>
  )
}

export default MessageContent
