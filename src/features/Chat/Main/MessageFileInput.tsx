import { ChangeEvent } from 'react'

const MessageFileInput = ({ setValue }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    files && setValue((prev) => [...prev, ...files])
    setTimeout(() => (e.target.value = ''))
  }

  return (
    <input name="images" type="file" multiple onChange={handleInputChange} />
  )
}

export default MessageFileInput
