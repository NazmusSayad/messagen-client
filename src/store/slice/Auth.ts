import { createSlice } from '@reduxjs/toolkit'
import { getCookies } from '$utils'

const initialState = {
  jwt: null as null | string,
  isAuthenticated: false,
}

const sessionState = {
  ...initialState,
  isAuthenticated: Boolean(getCookies().hasToken),
}

const Auth = createSlice({
  name: 'auth',
  initialState: { ...sessionState },
  reducers: {
    jwt(state, { payload }) {
      state.jwt = payload || null
      state.isAuthenticated = Boolean(payload)
      sessionState.isAuthenticated = Boolean(payload)
    },

    login(state) {
      state.isAuthenticated = true
      sessionState.isAuthenticated = true
    },

    logout(state) {
      Object.assign(state, initialState)
      Object.assign(sessionState, initialState)
    },
  },
})

setInterval(() => {
  const hasToken = 'hasToken' in getCookies()
  if (hasToken === sessionState.isAuthenticated) return
  $store(hasToken ? Auth.actions.login() : Auth.actions.logout())
}, 500)

export const authReducers = Auth.reducer
export default Auth.actions
