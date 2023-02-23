import { createSlice } from '@reduxjs/toolkit'

export interface UserType {
  _id: string
  name: string
  email: string
  avatar: string
  username: string
  isVerified: boolean
}

const initialState = {
  user: {} as UserType,
  friends: [],
  groups: [],
}

const User = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload
    },

    setFriends(state, { payload }) {
      state.friends = payload
    },

    setGroups(state, { payload }) {
      state.groups = payload
    },
  },
})

export const userReducers = User.reducer
export default User.actions
