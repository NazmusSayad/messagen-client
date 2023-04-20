import { ChangeEvent } from 'react'

const MessageFileInput = ({ addImage, focusTextArea }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files &&
      [...e.target.files]
        .filter((file) => file.size / 1024 < 3072)
        .forEach((file) => addImage(file))

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
      onInput={focusTextArea}
    />
  )
}

export default MessageFileInput
