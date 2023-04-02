import Message, { MessageType } from '$slice/Message'
import css from './Card.module.scss'
import defaultImg from '$assets/cat-x256.jpg'
import { ButtonBlank } from '$components/Button'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useWs } from '$api/ws'

type Props = { message: MessageType; you: boolean; setImages }
export default function Card({ message, setImages, you }: Props) {
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

          <div className={css.messageContainer}>
            {message.text && (
              <p className={css.textContainer}>{message.text}</p>
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
                    <img src={src} alt={`message from ${message.from.name}`} />
                  </a>
                ))}
              </div>
            )}

            {you && (
              <ButtonBlank className={css.deleteBtn} onClick={handleDelete}>
                <FaRegTrashAlt />
              </ButtonBlank>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
