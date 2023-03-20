import { createSlice } from '@reduxjs/toolkit'
import { UserType } from './User'

export interface MessageType {
  _id: string
  createdAt: string
  to: string
  from: UserType

  text: string
  images: string[]

  pending?: true
  error?: string
}

interface InitialState {
  messagesMap: {
    [contact: string]: MessageType[]
  }
  contactsMap: {
    [message: string]: string
  }
}
const initialState: InitialState = {
  messagesMap: {},
  contactsMap: {},
}

const sortMessagesFn = (a: MessageType, b: MessageType) => {
  return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
}

const Message = createSlice({
  name: 'Message',
  initialState,
  reducers: {
    addMessage(state, { payload }: { payload: MessageType }) {
      const messages = state.messagesMap[payload.to] ?? []
      messages.push(payload)

      state.messagesMap[payload.to] = messages.sort(sortMessagesFn)
      state.contactsMap[payload._id] = payload.to
    },

    putMessage(state, { payload }: { payload: MessageType }) {
      const messages = state.messagesMap[payload.to] ?? []
      const ind = messages.findIndex((msg) => msg._id === payload._id)
      if (ind < 0) {
        messages.push(payload)
        state.messagesMap[payload.to] = messages.sort(sortMessagesFn)
        state.contactsMap[payload._id] = payload.to
      } else {
        Object.assign(messages[ind], payload)
      }
    },

    replaceMessage(state, { payload }: { payload: { id; message } }) {
      const { id, message } = payload

      const contact = state.contactsMap[id]
      if (!contact) return

      const messages = state.messagesMap[contact]
      const ind = messages.findIndex((msg) => msg._id === id)
      if (ind < 0) return

      messages[ind] = message
    },

    removeMessage(state, { payload }: { payload: string }) {
      const contact = state.contactsMap[payload]
      if (!contact) return

      const messages = state.messagesMap[contact]
      const ind = messages.findIndex((msg) => msg._id === payload)
      if (ind < 0) return

      messages.splice(ind, 1)
      delete state.contactsMap[payload]
    },
  },
})

export const messageReducers = Message.reducer
export default Message.actions
