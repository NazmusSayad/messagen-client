import { FriendType, UserType } from '$slice/User'
import { useStore } from '$store'
import { useMemo } from 'react'
import css from './Friends.module.scss'
import friendCat from '$assets/friend-cat.jpg'
import { ButtonBlank } from '$components/Button'
import { useApi } from '$api/http'

interface FriendGroupProps {
  label: string
  friends: FormattedFriendType[]
  request?: boolean
}

const Friend = ({ friend, request }) => {
  const api = useApi()

  const handleDelete = async () => {}

  const handleAccept = async () => {}

  return (
    <div key={friend.user._id} className={css.Friend}>
      <img src={friend.user.avatar || friendCat} alt={friend.user.name} />

      <section className={css.bio}>
        <p>{friend.user.name}</p>
        <p>@{friend.user.username}</p>
      </section>

      <section className={css.controls}>
        {request && <ButtonBlank>Accept</ButtonBlank>}
        <ButtonBlank>Delete</ButtonBlank>
      </section>
    </div>
  )
}

const FriendGroup = ({ label, friends, request }: FriendGroupProps) => {
  const content = useMemo(() => {
    return friends.map((friend) => (
      <Friend key={friend.user._id} request={request} friend={friend} />
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

type FormattedFriendType = {
  accepted: boolean
  user: UserType
}

const formatFriend = (friend: FriendType): FormattedFriendType => ({
  accepted: friend.accepted,
  user: friend.user._id ? friend.user : friend.friend,
})
