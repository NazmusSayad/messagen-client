import { friendsReducers } from '$slice/Friends'
import { configureStore } from '@reduxjs/toolkit'
import { authReducers } from './slice/Auth'

const store = configureStore({
  reducer: {
    auth: authReducers,
    friends: friendsReducers,
  },
})

export type Store = ReturnType<typeof store.getState>
export default store
