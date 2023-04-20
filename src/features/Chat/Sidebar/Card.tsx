import css from './Card.module.scss'
import { MdErrorOutline } from 'react-icons/md'
import { HiOutlineClock, HiOutlinePhoto } from 'react-icons/hi2'
import { ContactType } from '$slice/User'
import { useStore } from '$store'
import defaultGroupAvatar from '$assets/friend-cat.jpg'
import defaultAvatar from '$assets/cat-x256.jpg'
import { ButtonBlank } from '$components/Button'
import { useMemo } from 'react'

type CardProps = { contact: ContactType }
const Card = ({ contact }: CardProps) => {
  const messages = useStore((state) => state.messages.messagesMap[contact._id])

  const lastMessage = useMemo(() => {
    if (!messages) return
    return [...messages].reverse().find((m) => !m.error)
  }, [messages])

  return (
    <ButtonBlank to={'/chat/' + contact._id} className={css.Card}>
      <img
        src={
          contact.isGroup
            ? contact.avatar || defaultGroupAvatar
            : contact.user.avatar || defaultAvatar
        }
        alt={contact.name || contact.user.name}
      />

      <div className={css.text}>
        <p>{contact.name || contact.user.name}</p>
        <p>
          {lastMessage ? (
            <>
              <span
                className={$cn(css.message, lastMessage.failed && css.error)}
              >
                {lastMessage.images?.length ? <HiOutlinePhoto /> : null}
                {lastMessage.text}
              </span>

              <span className={css.time}>
                {lastMessage.pending ? (
                  <HiOutlineClock />
                ) : lastMessage.failed ? (
                  <MdErrorOutline className={css.error} />
                ) : (
                  new Date(lastMessage.createdAt).toLocaleTimeString('en-us', {
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                )}
              </span>
            </>
          ) : (
            '...'
          )}
        </p>
      </div>
    </ButtonBlank>
  )
}

export default Card
