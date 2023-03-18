import css from './CreateGroup.module.scss'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { ButtonBlank, ButtonPrimary } from '$components/Button'
import { useState } from 'react'
import Dialog from '$components/Dialog'

const CreateGroup = () => {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div className={css.CreateGroup}>
      <ButtonPrimary className={css.button} onClick={() => setFormOpen(true)}>
        <AiOutlineUsergroupAdd />
        Create group
      </ButtonPrimary>

      {formOpen && (
        <Dialog open className={css.dialog} backdropClassName={css.backdrop}>
          <ButtonBlank onClick={() => setFormOpen(false)}>Close</ButtonBlank>
        </Dialog>
      )}
    </div>
  )
}

export default CreateGroup
