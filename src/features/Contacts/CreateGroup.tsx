import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { ButtonBlank, ButtonPrimary } from '$components/Button'
import { useState } from 'react'
import { useApi } from '$api/http'
import Dialog from '$components/Dialog'
import { Input } from '$components/Input'
import css from './CreateGroup.module.scss'
import { parseFormInputs } from '$utils'
import User from '$slice/User'

const CreateGroup = () => {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div className={css.CreateGroup}>
      <ButtonPrimary className={css.button} onClick={() => setFormOpen(true)}>
        <AiOutlineUsergroupAdd />
        Create group
      </ButtonPrimary>

      {formOpen && (
        <Dialog
          open
          rootClassName={css.rootDialog}
          backdropClassName={css.backdrop}
          onBackdropClick={() => setFormOpen(false)}
        >
          <CreateGroupForm close={() => setFormOpen(false)} />
        </Dialog>
      )}
    </div>
  )
}

const CreateGroupForm = ({ close }) => {
  const api = useApi()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = parseFormInputs(e.target)
    const data = await api.post('/contacts', formData)
    if (data) {
      close()
      $store(User.addContact(data.contact))
    }
  }

  return (
    <form className={css.Form} onSubmit={handleSubmit}>
      <div className={css.top}>
        <h4>Create group</h4>
        <ButtonBlank onClick={close}>Close</ButtonBlank>
      </div>

      <div className={css.bottom}>
        <Input
          name="name"
          required
          minLength={1}
          placeholder="eg: work group"
        />
        <ButtonPrimary loading={api.loading}>Ok</ButtonPrimary>
      </div>
    </form>
  )
}

export default CreateGroup
