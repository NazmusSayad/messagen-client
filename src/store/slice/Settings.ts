import { getLocalStorage } from '$utils'
import { createSlice } from '@reduxjs/toolkit'

type Theme = 'auto' | 'dark' | 'light'
const localStroage = getLocalStorage('settings')
const initialState = {
  theme: 'auto' as Theme,
  ...((localStroage || {}) as {}),
}

const Settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, { payload }: { payload: Theme }) {
      state.theme = payload
    },
  },
})

export const settingsReducers = Settings.reducer
export default Settings.actions
