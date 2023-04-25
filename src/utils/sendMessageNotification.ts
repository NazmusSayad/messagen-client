import { MessageType } from '$slice/Message'
import store from '$store'

const speaker = new SpeechSynthesisUtterance()
speechSynthesis.onvoiceschanged = handleVoiceLoad
handleVoiceLoad()

const pendingMessages: MessageType[] = []
let timeoutId

function handleVoiceLoad() {
  const voices = speechSynthesis.getVoices()
  const voice = voices.find((v) => v.name.endsWith('English Male'))!
  speaker.voice = voice
}

function speak() {
  const users = [...new Set(pendingMessages.map((m) => JSON.stringify(m.from)))]
  const usersText = users.map((u) => JSON.parse(u).name).join(' and ')
  const text = `You have got${
    pendingMessages.length > 1 ? 'multiple messages' : 'a message'
  } from${users.length > 1 ? `: ${usersText}` : ` ${usersText}`}`

  speaker.text = text
  pendingMessages.length = 0
  speechSynthesis.speak(speaker)
}

export default (message: MessageType) => {
  const user = store.getState().user.user
  if (message.from._id === user._id || document.visibilityState === 'visible') {
    return
  }

  pendingMessages.push(message)
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    if (pendingMessages.length || document.visibilityState === 'hidden') {
      speak()
    }
  }, 1500)
}
