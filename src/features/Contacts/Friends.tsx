import { FriendType, UserType } from '$slice/User'
import { useStore } from '$store'
import { useMemo } from 'react'
import css from './Friends.module.scss'
import friendCat from '$assets/friend-cat.jpg'
import { ButtonBlank } from '$components/Button'
import { useApi } from '$api/http'
import {
  AiOutlineUserAdd,
  AiOutlineDelete,
  AiOutlineCheck,
} from 'react-icons/ai'

interface FriendGroupProps {
  label: string
  friends: UserType[]
  request?: boolean
}

export const Friend = ({ user, request = false, add = false }) => {
  const api = useApi()

  const handleAdd = async () => {}

  const handleDelete = async () => {}

  const handleAccept = async () => {}

  return (
    <div key={user._id} className={css.Friend}>
      <img src={user.avatar || friendCat} alt={user.name} />

      <section className={css.bio}>
        <p>{user.name}</p>
        <p>@{user.username}</p>
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
          <ButtonBlank onClick={handleDelete}>
            <AiOutlineDelete />
          </ButtonBlank>
        )}
      </section>
    </div>
  )
}

const FriendGroup = ({ label, friends, request }: FriendGroupProps) => {
  const content = useMemo(() => {
    return friends.map((user) => (
      <Friend key={user._id} request={request} user={user} />
    ))
  }, [friends])

  if (!content?.length) return <></>
  return (
    <div className={css.Group}>
      {label && <h4>{label}</h4>}
      <div>{content}</div>
    </div>
  )
}

const Friends = () => {
  const _friends = useStore((state) => state.user.friends)
  const friends = useMemo(() => {
    const result = {
      friends: [] as any[],
      requests: [] as any[],
      requested: [] as any[],
    }

    _friends?.forEach((friend) => {
      const formatted = formatFriend(friend)

      if (friend.accepted) {
        return result.friends.push(formatted)
      }

      if (!friend.user._id) {
        return result.requested.push(formatted)
      }

      if (!friend.friend._id) {
        return result.requests.push(formatted)
      }
    })

    return result
  }, [_friends])

  return (
    <div>
      <FriendGroup label="" friends={friends.friends} />
      <FriendGroup label="Requests" friends={friends.requests} request />
      <FriendGroup label="Requested" friends={friends.requested} />
    </div>
  )
}

export default Friends

const formatFriend = (friend: FriendType): UserType => {
  return friend.user._id ? friend.user : friend.friend
}
