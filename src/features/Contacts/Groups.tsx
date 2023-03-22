import { FriendsSection } from './Card'
import CreateGroup from './CreateGroup'

const Groups = ({ groups, groupRequests }) => {
  return (
    <div>
      <CreateGroup />
      <FriendsSection label="" contacts={groups} link manageGroup />
      <FriendsSection label="Invitations" contacts={groupRequests} request />
    </div>
  )
}

export default Groups
