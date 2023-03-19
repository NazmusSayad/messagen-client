import { createSlice } from '@reduxjs/toolkit'
import { UserType } from './User'

export interface MessageType {
  _id: string
  to: string
  from: UserType
  createdAt: Date

  text: string
  images: string[]
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
      const contacts = state.messagesMap[payload.to] ?? []
      contacts.push(payload)

      state.messagesMap[payload.to] = contacts.sort(sortMessagesFn)
      state.contactsMap[payload._id] = payload.to
    },

    removeMessage(state, { payload }: { payload: string }) {
      const contact = state.contactsMap[payload]
      if (!contact) return

      const contacts = state.messagesMap[contact]
      const ind = contacts.findIndex((msg) => msg._id === payload)
      if (ind < 0) return

      contacts.splice(ind, 1)
      delete state.contactsMap[payload]
    },
  },
})

export const messageReducers = Message.reducer
export default Message.actions
