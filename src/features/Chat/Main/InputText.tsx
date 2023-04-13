import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react'
import { Textarea } from '$components/Input'
import { createTempObjectId } from '$utils'
const replaceMap = { '  ': ' ', '\n ': '\n', '\n\n': '\n' }
const replaceRegex = new RegExp(Object.keys(replaceMap).join('|'), 'g')

const MessageTextInput = ({ value, setValue, contact }) => {
  const uniqueId = useRef() as MutableRefObject<string>
  uniqueId.current ??= createTempObjectId()

  useEffect(() => {
    const element = document.querySelector<HTMLTextAreaElement>(
      `.${uniqueId.current}`
    )
    element?.focus()
  }, [contact?._id])

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
      className={uniqueId.current}
    />
  )
}

export default memo(MessageTextInput)
