import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {} as UserType,
  contacts: [] as ContactType[],
}

const User = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: { payload: UserType }) {
      console.log(payload.username, payload._id)
      state.user = payload
    },

    setContacts(state, { payload }: { payload: RawContactType[] }) {
      state.contacts = payload.map((contact) => formatContact(state, contact))
    },

    addContact(state, { payload }: { payload: RawContactType }) {
      state.contacts.push(formatContact(state, payload))
    },

    putContact(state, { payload }: { payload: RawContactType }) {
      const ind = state.contacts.findIndex(
        (contact) => contact._id === payload._id
      )
      const contact = formatContact(state, payload)

      if (ind < 0) {
        state.contacts.push(contact)
      } else {
        state.contacts[ind] = contact
      }
    },

    updateContact(state, { payload }: { payload: RawContactType }) {
      const ind = state.contacts.findIndex(
        (contact) => contact._id === payload._id
      )

      if (ind >= 0) {
        state.contacts[ind] = formatContact(state, payload)
      }
    },

    removeContact(state, { payload }: { payload: string }) {
      state.contacts = state.contacts.filter((contact) => {
        return contact._id !== payload
      })
    },
  },
})

const formatContact = (
  state: any,
  _rawContact: RawContactType
): ContactType => {
  const { users: rawUsers, ...rawContact } = _rawContact
  const allUsers = [
    { user: rawContact.owner, accepted: true, isOwner: true },
    ...rawUsers,
  ]

  let me
  const users: any[] = []
  const myId = state?.user?._id
  const isGroup = Boolean(rawContact.name)

  allUsers.forEach((user) => {
    if (user.user._id === myId) {
      return (me = user)
    }
    users.push(user)
  })

  return {
    ...rawContact,
    me,
    isGroup,
    friend: isGroup ? undefined : users[0],
    user: isGroup ? undefined : users[0].user,
    users: isGroup ? users : (undefined as any),
  }
}

export const userReducers = User.reducer
export default User.actions

export interface UserType {
  _id: string
  name: string
  email: string
  avatar: string
  username: string
  isVerified: boolean
}

interface RawContactType {
  _id: string
  name: string
  avatar: string
  owner: UserType
  users: { user: UserType; accepted: boolean }[]
}

interface ContactUserType {
  user: UserType
  accepted: boolean
  isOwner?: boolean
}

export interface ContactType extends RawContactType {
  isGroup: boolean
  me: ContactUserType
  user: UserType
  friend: ContactUserType
  users: ContactUserType[]
}
