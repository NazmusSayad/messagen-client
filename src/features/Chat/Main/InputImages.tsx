import { ChangeEvent } from 'react'

const MessageFileInput = ({ addImage }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    files &&
      [...files].forEach((file) => {
        addImage(file)
      })

    e.target.value = ''
  }

  return (
    <input
      hidden
      multiple
      type="file"
      name="images"
      accept=".jpg, .jpeg, .png, .webp"
      onChange={handleInputChange}
    />
  )
}

export default MessageFileInput
