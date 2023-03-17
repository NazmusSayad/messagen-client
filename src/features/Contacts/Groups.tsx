import { GroupType } from '$slice/User'
import { useStore } from '$store'
import { useMemo } from 'react'
import { FriendsSection } from './Card'

const Groups = () => {
  const _groups = useStore((state) => state.user.groups)
  const userId = useStore((state) => state.user.user._id)

  const [joined, requests] = useMemo(() => {
    const joinedGroups: GroupType[] = []
    const requestGroups: GroupType[] = []

    _groups.forEach((group) => {
      if (
        group.owner._id === userId ||
        group.users.find((user) => user.user._id === userId && user.accepted)
      ) {
        return joinedGroups.push(group)
      }

      requestGroups.push(group)
    })

    return [joinedGroups, requestGroups]
  }, [_groups, userId])

  return (
    <div>
      <FriendsSection label="" users={joined} isGroup />
      <FriendsSection label="Invitations" users={requests} request isGroup />
    </div>
  )
}

export default Groups
