import { useRef, useState } from 'react'
import useActiveState from 'use-active-state'
import { UserType } from '$slice/User'
import { useApi } from '$api/http'

import { Input } from '$components/Input'
import css from './AddFriends.module.scss'
import { Friend } from './Friends'

const AddFriends = () => {
  const [handleOnChange, users, isLoading] = useSearchFriends()
  const [isShowing, toggleState, containerRref] = useActiveState()

  const userList = users.map((user) => {
    return <Friend key={user._id} user={user} add />
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

const useSearchFriends = (): [any, UserType[], boolean] => {
  const [users, setUsers] = useState([])
  const timeoutRef = useRef<NodeJS.Timeout>()
  const tokenRef = useRef<any>()
  const api = useApi()

  const handleOnChange = (e) => {
    clearTimeout(timeoutRef.current)
    if (tokenRef.current) {
      tokenRef.current.signal.aborted || tokenRef.current.abort()
      tokenRef.current = null
    }

    const username = e.target.value
    if (!username) return setUsers([])

    timeoutRef.current = setTimeout(async () => {
      tokenRef.current = new AbortController()
      const data = await api.get('/account/search?username=' + username, {
        signal: tokenRef.current.signal,
      })

      data && setUsers(data.users)
    }, 400)
  }

  return [handleOnChange, users, api.loading]
}

export default AddFriends
