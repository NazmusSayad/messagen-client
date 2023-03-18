import { useStore } from '$store'
import css from './Card.module.scss'
import defaultGroupAvatar from '$assets/friend-cat.jpg'
import defaultAvatar from '$assets/cat-x256.jpg'
import { Link } from 'react-router-dom'
import { ContactType } from '$slice/User'

type CardProps = {
  contact: ContactType
}

const Card = ({ contact }: CardProps) => {
  return (
    <Link to={'/chat/' + contact._id} className={css.Card}>
      <img
        src={
          contact.isGroup
            ? contact.avatar || defaultGroupAvatar
            : contact.user.avatar || defaultAvatar
        }
        alt={contact.name || contact.user.name}
      />

      <div>
        <p>{contact.name || contact.user.name}</p>
      </div>
    </Link>
  )
}

export default Card
