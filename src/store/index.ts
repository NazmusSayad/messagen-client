import { messageReducers } from '$slice/Message'
import { userReducers } from '$slice/User'
import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { authReducers } from './slice/Auth'
import { utilsReducers } from '$slice/Utils'
import { settingsReducers } from '$slice/Settings'

const store = configureStore({
  reducer: {
    auth: authReducers,
    user: userReducers,
    messages: messageReducers,
    utils: utilsReducers,
    settings: settingsReducers,
  },
})

export type Store = ReturnType<typeof store.getState>
export default store

export const useStore = <T>(selector: (state: Store) => T) => {
  return useSelector(selector)
}
