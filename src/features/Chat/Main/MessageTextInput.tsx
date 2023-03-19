import { Input, Textarea } from '$components/Input'
const replaceMap = { '  ': ' ', '\n ': '\n', '\n\n': '\n' }
const replaceRegex = new RegExp(Object.keys(replaceMap).join('|'), 'g')

const MessageTextInput = ({ value, setValue }) => {
  const rows = value.match(/\n/g)?.length ?? 0

  return (
    <Input
      name="text"
      value={value}
      // rows={1 + (rows > 2 ? 2 : rows)}
      placeholder="assalamu alaikum..."
      onChange={(e) =>
        setValue(
          e.target.value
            .trimStart()
            .replace(replaceRegex, (match) => replaceMap[match])
        )
      }
    />
  )
}

export default MessageTextInput
