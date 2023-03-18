import { useMemo } from 'react'
import { UserType } from '$slice/User'
import { useStore } from '$store'
import { FriendsSection } from './Card'

const Friends = ({ friends, friendRequests, friendRequested }) => {
  return (
    <div>
      <FriendsSection label="" contacts={friends} />
      <FriendsSection label="Requests" contacts={friendRequests} request />
      <FriendsSection label="Requested" contacts={friendRequested} />
    </div>
  )
}

export default Friends
