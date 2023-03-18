import { FriendsSection } from './Card'

const Friends = ({ friends, friendRequests, friendRequested }) => {
  return (
    <div>
      <FriendsSection label="" contacts={friends} link />
      <FriendsSection label="Requests" contacts={friendRequests} request />
      <FriendsSection label="Requested" contacts={friendRequested} />
    </div>
  )
}

export default Friends
