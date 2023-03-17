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

export interface GroupType {
  _id: string
  name: string
  avatar: string
  owner: UserType
  users: { user: UserType; accepted: boolean }[]
}

const initialState = {
  user: {} as UserType,
  friends: [] as FriendType[],
  groups: [] as GroupType[],
}

const User = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: { payload: UserType }) {
      state.user = payload
    },

    setFriends(state, { payload }: { payload: FriendType[] }) {
      state.friends = payload
    },

    addFriend(state, { payload }: { payload: FriendType }) {
      state.friends.push(payload)
    },

    removeFriend(state, { payload }: { payload: string }) {
      state.friends = state.friends.filter((user) => {
        return user._id !== payload
      })
    },

    updateFriend(state, { payload }: { payload: FriendType }) {
      state.friends.find((user) => {
        if (user._id !== payload._id) return false
        Object.assign(user, payload)
        return true
      })
    },

    setGroups(state, { payload }) {
      state.groups = payload
    },
  },
})

export const userReducers = User.reducer
export default User.actions
