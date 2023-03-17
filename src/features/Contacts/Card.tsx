import User, { GroupType, UserType } from '$slice/User'
import css from './Friends.module.scss'
import friendCat from '$assets/friend-cat.jpg'
import { ButtonBlank } from '$components/Button'
import Loading from '$components/Loading'
import { useApi } from '$api/http'
import { useMemo } from 'react'
import { FormatFriendType } from './Friends'
import {
  AiOutlineUserAdd,
  AiOutlineDelete,
  AiOutlineCheck,
} from 'react-icons/ai'

export const FriendCard = ({
  user,
  add = false,
  request = false,
  isGroup = false,
}: FriendCardParam) => {
  const api = useApi()

  const handleAdd = async () => {
    const data = await api.post('/friends', { friend: user._id })
    data && $store(User.addFriend(data.friend))
  }

  const handleDelete = async () => {
    const data = await api.delete('/friends/' + user._id)
    data && $store(User.removeFriend((user as FormatFriendType).friendId))
  }

  const handleAccept = async () => {
    const data = await api.patch(`/friends/${user._id}/accept`)
    data && $store(User.updateFriend(data.friend))
  }

  const handleAcceptInvitation = async () => {
    const data = await api.patch(`/groups/${user._id}/accept`)
    console.log(data)
  }

  const handleGroupDelete = async () => {
    const data = await api.delete('/groups/' + user._id)
  }

  return (
    <div key={user._id} className={css.Friend}>
      {api.loading && (
        <div className={css.loading}>
          <Loading />
        </div>
      )}

      <img src={user.avatar || friendCat} alt={user.name} />

      <section className={css.bio}>
        <p>{user.name}</p>
        {isGroup ? (
          <p>
            {(() => {
              const len = (user as GroupType).users.length + 1
              return len > 1 ? `${len} members` : 'Just you'
            })()}
          </p>
        ) : (
          <p>@{(user as FormatFriendType).username}</p>
        )}
      </section>

      <section className={css.controls}>
        {request && (
          <ButtonBlank
            onClick={isGroup ? handleAcceptInvitation : handleAccept}
          >
            <AiOutlineCheck />
          </ButtonBlank>
        )}

        {add ? (
          <ButtonBlank onClick={handleAdd}>
            <AiOutlineUserAdd />
          </ButtonBlank>
        ) : (
          <ButtonBlank
            onClick={isGroup ? handleGroupDelete : handleDelete}
            className={css.clrRed}
          >
            <AiOutlineDelete />
          </ButtonBlank>
        )}
      </section>
    </div>
  )
}

export const FriendsSection = ({
  label,
  users,
  request,
  isGroup,
}: FriendGroupProps) => {
  const content = useMemo(() => {
    return users.map((user) => (
      <FriendCard
        key={user._id}
        request={request}
        user={user as any}
        isGroup={isGroup}
      />
    ))
  }, [users])

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
  users: (FormatFriendType | GroupType)[]
  request?: boolean
  isGroup?: boolean
}

type FriendCardParam = {
  user: UserType | FormatFriendType | GroupType
  isGroup?: boolean
  request?: boolean
  add?: boolean
}
