import { createSlice } from '@reduxjs/toolkit'

export interface UserType {
  _id: string
  name: string
  email: string
  avatar: string
  username: string
  isVerified: boolean
}

export interface FriendType {
  _id: string
  accepted: boolean
  user: UserType
  friend: UserType
}

export interface GroupType {}

const initialState = {
  user: {} as UserType,
  friends: [] as FriendType[],
  groups: [],
}

const User = createSlice({
  name: 'user',
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
