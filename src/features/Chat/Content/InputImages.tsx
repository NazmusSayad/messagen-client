import { ChangeEvent } from 'react'
const allowedTypes = ['jpg', 'jpeg', 'png', 'bmp', 'webp']

const MessageFileInput = ({ addImage, focusTextArea }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = [...e.target.files]
    e.target.value = ''

    files.forEach((file) => {
      const isExtAllowed = allowedTypes.includes(file.type.split('/')[1])
      const isFileSmallerThan3MB = file.size / 1024 <= 3072
      isExtAllowed && isFileSmallerThan3MB && addImage(file)
    })
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
