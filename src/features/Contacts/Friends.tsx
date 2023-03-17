import { FriendType, UserType } from '$slice/User'
import { useStore } from '$store'
import { useMemo } from 'react'
import { FriendsSection } from './Card'

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
      <FriendsSection label="" users={friends.friends} />
      <FriendsSection label="Requests" users={friends.requests} request />
      <FriendsSection label="Requested" users={friends.requested} />
    </div>
  )
}

export type FormatFriendType = ReturnType<typeof formatFriend>

export const formatFriend = (
  friend: FriendType
): UserType & { friendId: string } => {
  return {
    ...(friend.user._id ? friend.user : friend.friend),
    friendId: friend._id,
  }
}

export default Friends
