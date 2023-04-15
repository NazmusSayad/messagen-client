import Message, { MessageType } from '$slice/Message'
import css from './Card.module.scss'
import defaultImg from '$assets/cat-x256.jpg'
import { ButtonBlank } from '$components/Button'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useWs } from '$api/ws'

type Props = { message: MessageType; you: boolean; setImages; scrollToBottom }
export default function Card({
  message,
  setImages,
  you,
  scrollToBottom,
}: Props) {
  const ws = useWs()
  const handleDelete = async () => {
    const data = await ws.send('messages/delete', message._id)
    data && $store(Message.removeMessage(message._id))
  }

  return (
    <div className={$cn(css.Card, you ? css.Right : css.Left)}>
      <div className={css.content}>
        {you || <div className={css.username}>{message.from.name}</div>}

        <div className={css.bottom}>
          {you || (
            <div className={css.image}>
              <img
                src={message.from.avatar ?? defaultImg}
                alt={message.from.username}
              />
            </div>
          )}

          <div
            className={$cn(
              css.messageContainer,
              message.pending && css.pending
            )}
          >
            {(message.text || message.error) && (
              <div className={css.textContainer}>
                {(message.error && !message.text) ||
                (message.error &&
                  message.error?.length > message.text?.length) ? (
                  <span className={css.transparentError}>{message.error}</span>
                ) : (
                  message.text.split('\n').map((text) => <p>{text}</p>)
                )}
              </div>
            )}

            {message.images?.length > 0 && (
              <div
                className={$cn(
                  css.imageContainer,
                  message.images?.length === 1 && css.single
                )}
              >
                {message.images.map((src, i) => (
                  <a
                    href={src}
                    className={css.img}
                    key={i + '-' + src}
                    onClick={(e) => {
                      e.preventDefault()
                      setImages({ active: i, images: message.images })
                    }}
                  >
                    <img
                      src={src}
                      onLoad={scrollToBottom}
                      alt={`message from ${message.from.name}`}
                    />
                  </a>
                ))}
              </div>
            )}

            {you && !message.error && (
              <ButtonBlank className={css.deleteBtn} onClick={handleDelete}>
                <FaRegTrashAlt />
              </ButtonBlank>
            )}

            {message.error && (
              <div className={css.errorContainer}>
                <p>{message.error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
