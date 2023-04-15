import { useWs } from '$api/ws'
import Message, { MessageType } from '$slice/Message'
import { useStore } from '$store'
import { useLayoutEffect, useMemo, useRef } from 'react'

export default (contactId: string, scrollRef): [boolean, MessageType[]] => {
  const ws = useWs()
  const triedRef = useRef(false)
  const found = useStore((state) => state.messages.messagesMap[contactId])
  const messages = useMemo(() => found || [], [found])

  useMemo(() => {
    triedRef.current = false
  }, [contactId])

  useLayoutEffect(() => {
    if (messages.length >= 10 || triedRef.current) return
    ;(async () => {
      triedRef.current = true
      const data = await ws.send('messages/get-older', {
        to: contactId,
        loadBefore: messages.at(-1)?._id,
      })

      if (data && data.messages) {
        data.messages.forEach((message: MessageType) => {
          $store(Message.putMessage(message))
        })
        scrollRef.current = true
      }
    })()
  }, [contactId, messages.length])

  return [ws.loading, messages]
}
