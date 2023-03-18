import { useStore } from '$store'
import Card from './Card'
import css from './index.module.scss'

const index = () => {
  const contacts = useStore((s) => s.user.contacts)

  return (
    <div className={css.Sidebar}>
      {contacts.map((contact) => {
        return <Card key={contact._id} contact={contact} />
      })}
    </div>
  )
}

export default index
