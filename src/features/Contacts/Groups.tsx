import { FriendsSection } from './Card'

const Groups = ({ groups, groupRequests }) => {
  return (
    <div>
      <FriendsSection label="" contacts={groups} />
      <FriendsSection label="Invitations" contacts={groupRequests} request />
    </div>
  )
}

export default Groups
