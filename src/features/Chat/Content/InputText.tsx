import { ChangeEvent, KeyboardEvent, memo } from 'react'
import { Textarea } from '$components/Input'
import { ALLOWED_IMAGE_FORMATS } from '$config'
const replaceMap = { '  ': ' ', '\n ': '\n', '\n\n': '\n' }
const replaceRegex = new RegExp(Object.keys(replaceMap).join('|'), 'g')

const MessageTextInput = ({ value, setValue, id, addImage }) => {
  const rows = value.match(/\n/g)?.length ?? 0
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const notOk =
      e.key !== 'Enter' || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey
    if (notOk) return

    e.preventDefault()
    const form = e.currentTarget.closest('form')!
    const btn = form.querySelector<HTMLButtonElement>('[type="submit"]')!
    btn.click()
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(
      e.target.value
        .trimStart()
        .replace(replaceRegex, (match) => replaceMap[match])
    )
  }

  const handlePaste = (e) => {
    const files = [...e.clipboardData.files].filter(({ type }) => {
      const [, ext] = type.split('/')
      return ALLOWED_IMAGE_FORMATS.includes(ext)
    })
    if (!files.length) return
    files.forEach(addImage)
  }

  return (
    <Textarea
      name="text"
      value={value}
      rows={1 + (rows > 2 ? 2 : rows)}
      autoComplete="off"
      placeholder="assalamu alaikum..."
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      className={id}
      onPaste={handlePaste}
    />
  )
}

export default memo(MessageTextInput)
