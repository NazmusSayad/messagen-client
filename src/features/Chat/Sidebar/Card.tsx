import css from './Card.module.scss'
import { HiOutlineClock } from 'react-icons/hi'
import { ContactType } from '$slice/User'
import { useStore } from '$store'
import defaultGroupAvatar from '$assets/friend-cat.jpg'
import defaultAvatar from '$assets/cat-x256.jpg'
import { ButtonBlank } from '$components/Button'

type CardProps = { contact: ContactType }
const Card = ({ contact }: CardProps) => {
  const lastMessage = useStore((state) =>
    state.messages.messagesMap[contact._id]?.at(-1)
  )

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
              <span className={css.message}>{lastMessage.text}</span>

              <span className={css.time}>
                {lastMessage.pending ? (
                  <HiOutlineClock />
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
