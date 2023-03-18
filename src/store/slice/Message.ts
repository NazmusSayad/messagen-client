import { createSlice } from '@reduxjs/toolkit'
import { UserType } from './User'

export interface MessageType {
  _id: string
  to: string
  from: UserType

  text: string
  images: string[]
}

const initialState: MessageType[] = []

const Message = createSlice({
  name: 'Message',
  initialState,
  reducers: {
    addMessage(state, { payload }: { payload: MessageType }) {
      state.push(payload)
    },

    removeMessages(state, { payload }: { payload: string }) {
      const ind = state.findIndex((msg) => msg._id === payload)
      state.splice(ind, 1)
    },
  },
})

export const messageReducers = Message.reducer
export default Message.actions
