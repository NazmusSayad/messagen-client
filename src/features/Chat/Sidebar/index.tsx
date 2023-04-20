import { Input } from '$components/Input'
import Sidebar from '$layouts/Sidebar'
import { ContactType } from '$slice/User'
import { useStore } from '$store'
import { useMemo, useState } from 'react'
import Card from './Card'
import css from './index.module.scss'

const index = () => {
  const [contacts, setQuery] = useContactsSearch()

  return (
    <Sidebar title="Messages">
      <Input
        type="search"
        placeholder="Search..."
        className={css.search}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div>
        {contacts.map((contact) => {
          return <Card key={contact._id} contact={contact} />
        })}
      </div>
    </Sidebar>
  )
}

const useContactsSearch = (): [ContactType[], Function] => {
  const [query, setQuery] = useState('')
  const contacts = useStore((state) => state.user.contacts)

  const matchedQuery = useMemo(() => {
    return contacts.filter((contact) => {
      if (!contact.isGroup) {
        if (!(contact.me?.accepted && contact.friend?.accepted)) return
      } else if (!contact.me?.accepted) return

      const contactStr = [
        contact._id,
        contact.name,
        contact.friend?.user?.name,
        contact.friend?.user?.username,
      ]

      const contactUsersStr = contact.users?.map(({ user }) => [
        user._id,
        user.name,
        user.username,
      ])

      return [contactStr, contactUsersStr]
        .flat()
        .filter(Boolean)
        .join('\n')
        .toLowerCase()
        .includes(query.toLowerCase())
    })
  }, [query, contacts])

  return [matchedQuery, setQuery]
}

export default index
