import { ContactType } from '$slice/User'
import { useStore } from '$store'
import { useMemo, useState } from 'react'
import Card from './Card'
import css from './index.module.scss'

const index = () => {
  const [contacts, setQuery] = useContactsSearch()

  return (
    <div className={css.Sidebar}>
      <div className={css.top}>
        <h3 className={css.title}>Messages</h3>
        <input type="search" onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div>
        {contacts.map((contact) => {
          return <Card key={contact._id} contact={contact} />
        })}
      </div>
    </div>
  )
}

const useContactsSearch = (): [ContactType[], Function] => {
  const [query, setQuery] = useState('')
  const contacts = useStore((state) => state.user.contacts)

  const matchedQuery = useMemo(() => {
    return contacts.filter((contact) => {
      if (
        !(
          (contact.isGroup && contact.me.accepted) ||
          (contact.me.accepted && contact.friend.accepted)
        )
      ) {
        return false
      }

      const contactStr = JSON.stringify(contact)
      return contactStr.includes(query)
    })
  }, [query, contacts])

  return [matchedQuery, setQuery]
}

export default index
