import { Textarea } from '$components/Input'
import { ChangeEvent, KeyboardEvent, memo } from 'react'
const replaceMap = { '  ': ' ', '\n ': '\n', '\n\n': '\n' }
const replaceRegex = new RegExp(Object.keys(replaceMap).join('|'), 'g')

const MessageTextInput = ({ value, setValue }) => {
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

  return (
    <Textarea
      name="text"
      value={value}
      rows={1 + (rows > 2 ? 2 : rows)}
      autoComplete="off"
      placeholder="assalamu alaikum..."
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  )
}

export default memo(MessageTextInput)
