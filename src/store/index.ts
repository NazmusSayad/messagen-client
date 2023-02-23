import { userReducers } from '$slice/User'
import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { authReducers } from './slice/Auth'

const store = configureStore({
  reducer: {
    auth: authReducers,
    user: userReducers,
  },
})

export type Store = ReturnType<typeof store.getState>
export default store

export const useStore = <T>(selector: (state: Store) => T) => {
  return useSelector(selector)
}
