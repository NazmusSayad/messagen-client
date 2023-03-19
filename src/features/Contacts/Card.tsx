import User, { ContactType } from '$slice/User'
import friendCat from '$assets/friend-cat.jpg'
import { ButtonBlank } from '$components/Button'
import Loading from '$components/Loading'
import { useApi } from '$api/http'
import { useMemo } from 'react'
import {
  AiOutlineUserAdd,
  AiOutlineDelete,
  AiOutlineCheck,
} from 'react-icons/ai'
import css from './Card.module.scss'

export const FriendCard = ({
  contact,
  add = false,
  link = false,
  request = false,
}: FriendCardParam) => {
  const api = useApi()

  const handleAdd = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const data = await api.post('/contacts', { user: contact._id })
    data && $store(User.addContact(data.contact))
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const data = await api.delete('/contacts/' + contact._id)
    data && $store(User.deleteContact(contact._id))
  }

  const handleAccept = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const data = await api.patch(`/contacts/${contact._id}/accept`)
    data && $store(User.updateContact(data.contact))
  }

  return (
    <ButtonBlank
      anchor
      className={css.Friend}
      to={link ? `/chat/${contact._id}` : undefined}
    >
      {api.loading && (
        <div className={css.loading}>
          <Loading />
        </div>
      )}

      <img src={contact.avatar || friendCat} alt={contact.name} />

      <section className={css.bio}>
        <p>{contact.name}</p>
        <p>@{contact.username}</p>
      </section>

      <section className={css.controls}>
        {request && (
          <ButtonBlank onClick={handleAccept}>
            <AiOutlineCheck />
          </ButtonBlank>
        )}

        {add ? (
          <ButtonBlank onClick={handleAdd}>
            <AiOutlineUserAdd />
          </ButtonBlank>
        ) : (
          <ButtonBlank onClick={handleDelete} className={css.clrRed}>
            <AiOutlineDelete />
          </ButtonBlank>
        )}
      </section>
    </ButtonBlank>
  )
}

export const FriendsSection = ({
  label,
  request,
  contacts,
  ...props
}: FriendGroupProps) => {
  const content = useMemo(() => {
    return contacts.map((contact) => (
      <FriendCard
        key={contact._id}
        {...props}
        request={request}
        contact={
          contact.isGroup
            ? contact
            : {
                ...contact.user,
                _id: contact._id,
                userId: contact.user._id,
              }
        }
      />
    ))
  }, [contacts])

  if (!content?.length) return <></>
  return (
    <div className={css.Group}>
      {label && <h4>{label}</h4>}
      <div>{content}</div>
    </div>
  )
}

interface FriendGroupProps {
  label: string
  contacts: ContactType[]
  request?: boolean
  link?: boolean
  [i: string]: any
}

interface FriendCardParam {
  request?: boolean
  add?: boolean
  link?: boolean

  contact: {
    _id: string
    userId?: string

    name: string
    avatar: string
    username?: string
    [key: string]: any
  }
}
