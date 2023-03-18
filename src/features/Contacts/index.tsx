import Wrapper from '$layouts/Wrapper'
import { ContactType } from '$slice/User'
import { useStore } from '$store'
import { group } from 'console'
import { useMemo } from 'react'
import AddFriends from './AddFriends'
import Friends from './Friends'
import Groups from './Groups'
import css from './index.module.scss'

const Group = ({ title = '', children }) => {
  return (
    <Wrapper className={css.group}>
      {title && <h3>{title}</h3>}
      {children}
    </Wrapper>
  )
}

const index = () => {
  const contacts = useStore((state) => state.user.contacts)
  const result = useMemo(() => {
    const output = {
      groups: [] as ContactType[],
      groupRequests: [] as ContactType[],

      friends: [] as ContactType[],
      friendRequests: [] as ContactType[],
      friendRequested: [] as ContactType[],
    }

    contacts.forEach((contact) => {
      if (contact.isGroup && contact.me.accepted) {
        return output.groups.push(contact)
      }

      if (contact.isGroup) {
        return output.groupRequests.push(contact)
      }

      if (contact.me.accepted && contact.friend.accepted) {
        return output.friends.push(contact)
      }

      if (!contact.me.accepted && contact.friend.isOwner) {
        return output.friendRequests.push(contact)
      }

      if (contact.me.isOwner && !contact.friend.accepted) {
        return output.friendRequested.push(contact)
      }
    })

    return output
  }, [contacts])

  return (
    <div className={css.Contacts}>
      <Wrapper className={css.wrapper}>
        <Wrapper className={css.addFriends}>{<AddFriends />}</Wrapper>

        <div className={css.contacts}>
          <Group title="Groups">
            <Groups
              groups={result.groups}
              groupRequests={result.groupRequests}
            />
          </Group>

          <Group title="Friends">
            {
              <Friends
                friends={result.friends}
                friendRequests={result.friendRequests}
                friendRequested={result.friendRequested}
              />
            }
          </Group>
        </div>
      </Wrapper>
    </div>
  )
}

export default index
