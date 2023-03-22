import { useMemo, useRef, useState } from 'react'
import useActiveState from 'use-active-state'
import { UserType } from '$slice/User'
import { useApi } from '$api/http'

import { Input } from '$components/Input'
import css from './AddFriends.module.scss'
import { useAbortSignal } from 'use-react-api'
import { useStore } from '$store'
import { FriendCard } from './Card'

const AddFriends = ({
  manageMember,
  groupId,
  excludeUserIds = undefined as any,
}) => {
  const [handleOnChange, users, isLoading] = useSearchFriends(excludeUserIds)
  const [isShowing, toggleState, containerRref] = useActiveState()

  const userList = users.map((user) => {
    return (
      <FriendCard
        key={user._id}
        manageMember={manageMember}
        contact={{
          ...user,
          userId: user._id,
          _id: groupId || user._id,
        }}
        add
      />
    )
  })

  const content = isShowing && (
    <section className={css.userListContainer}>
      {isLoading ? (
        <p>Searching for user...</p>
      ) : userList.length ? (
        <ul className={css.userList}>{userList}</ul>
      ) : (
        <p>Horse egg found!</p>
      )}
    </section>
  )

  return (
    <div className={css.AddFriends} ref={containerRref as any}>
      <Input
        type="text"
        name="search-user"
        placeholder="Type a username"
        onChange={handleOnChange}
        onFocus={() => toggleState(true)}
      />

      {content}
    </div>
  )
}

const useSearchFriends = (exclude?: string[]): [any, UserType[], boolean] => {
  const [users, setUsers] = useState([] as any[])
  const contacts = useStore((state) => state.user.contacts)

  const timeoutRef = useRef<NodeJS.Timeout>()
  const api = useApi()
  const abort = useAbortSignal()

  const handleOnChange = (e) => {
    clearTimeout(timeoutRef.current)
    abort.abort()

    const username = e.target.value
    if (!username) return setUsers([])

    timeoutRef.current = setTimeout(async () => {
      const data = await api.get('/account/search?username=' + username, {
        signal: abort.signal,
      })
      if (!data) return
      setUsers(data.users)
    }, 400)
  }

  const filteredUsers = useMemo(() => {
    const friendsId = Object.fromEntries(
      exclude
        ? exclude.map((userId) => [userId, true])
        : contacts.map((contact) => {
            if (contact.isGroup) return ['none', false]
            return [contact.user._id, true]
          })
    )

    return users.filter((user) => !friendsId[user._id])
  }, [users, contacts, exclude])

  return [handleOnChange, filteredUsers, api.loading]
}

export default AddFriends
