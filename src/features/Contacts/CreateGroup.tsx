import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { ButtonBlank, ButtonPrimary } from '$components/Button'
import { useMemo } from 'react'
import { useApi } from '$api/http'
import Dialog from '$components/Dialog'
import { Input } from '$components/Input'
import css from './CreateGroup.module.scss'
import { parseFormToObj } from '$utils'
import User, { ContactType } from '$slice/User'
import { useStore } from '$store'
import Utils from '$slice/Utils'
import AddFriends from './AddFriends'
import { FriendCard } from './Card'

const CreateGroup = () => {
  const contact = useContact()
  const closeMenu = () => {
    $store(Utils.setManageGroupId(''))
  }

  return (
    <div className={css.CreateGroup}>
      <ButtonPrimary
        className={css.button}
        onClick={() => $store(Utils.setManageGroupId('new'))}
      >
        <AiOutlineUsergroupAdd />
        Create group
      </ButtonPrimary>

      {contact && (
        <Dialog
          open
          rootClassName={css.rootDialog}
          backdropClassName={css.backdrop}
          onBackdropClick={closeMenu}
        >
          <CreateGroupForm contact={contact} close={closeMenu} />
        </Dialog>
      )}
    </div>
  )
}

type Props = { close: any; contact: ContactType }
const CreateGroupForm = ({ close, contact = {} as any }: Props) => {
  const api = useApi()
  const excludeUserIds = contact.users?.map((user) => user.user._id) || []

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = parseFormToObj(e.target)
    const data = await api.post('/contacts', formData)
    if (data) {
      close()
      $store(User.addContact(data.contact))
    }
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    const formData = parseFormToObj(e.target)
    const data = await api.patch('/contacts/' + contact._id, formData)
    if (data) {
      close()
      $store(User.updateContact(data.contact))
    }
  }

  return (
    <form
      className={css.Form}
      onSubmit={contact._id ? handleUpdateSubmit : handleSubmit}
    >
      <div className={css.top}>
        <h4>{contact._id ? 'Update' : 'Create'} group</h4>
        <ButtonBlank onClick={close} type="button">
          Close
        </ButtonBlank>
      </div>

      <div className={css.bottom}>
        <Input
          name="name"
          defaultValue={contact.name}
          required
          minLength={1}
          placeholder="eg: work group"
        />

        {contact._id && (
          <AddFriends
            manageMember
            groupId={contact._id}
            excludeUserIds={excludeUserIds}
          />
        )}

        {contact.users?.map((user) => {
          return (
            <FriendCard
              key={user.user._id}
              manageMember
              contact={{
                ...user.user,
                _id: contact._id,
                userId: user.user._id,
              }}
            />
          )
        })}

        <ButtonPrimary loading={api.loading}>Save</ButtonPrimary>
      </div>
    </form>
  )
}

const useContact = () => {
  const manageGroupId = useStore((state) => state.utils.manageGroupId)
  const contacts = useStore((state) => state.user.contacts)
  return useMemo(() => {
    if (!manageGroupId) return null
    return contacts.find((c) => c._id === manageGroupId) || {}
  }, [contacts, manageGroupId]) as ContactType | null
}

export default CreateGroup
