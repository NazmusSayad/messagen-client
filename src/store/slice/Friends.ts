import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}

const Friends = createSlice({
  name: 'Friends',
  initialState,
  reducers: {
    init(state, { payload }) {
      state.list = payload
    },
  },
})

export const friendsReducers = Friends.reducer
export default Friends.actions
