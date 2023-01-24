import { createSlice } from '@reduxjs/toolkit'
import { getCookies } from '$utils'
import * as api from '$api/http'

const initialState = {
  isAuthenticated: false,
  isSocketConnected: false,
  jwt: null as null | string,
  socket: null as null | string,
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
      api.updateJwtToken(payload ? `Bearer ${payload}` : undefined)
      sessionState.isAuthenticated = Boolean(payload)

      state.jwt = payload || null
      state.isAuthenticated = Boolean(payload)
    },

    login(state) {
      sessionState.isAuthenticated = true
      state.isAuthenticated = true
    },

    logout(state) {
      console.log('Hited Logout')
      Object.assign(sessionState, initialState)
      Object.assign(state, initialState)
    },

    socketId(state, { payload }) {
      api.updateSocketId(payload || undefined)

      state.socket = payload || null
      state.isSocketConnected = Boolean(payload)
    },
  },
})

setInterval(() => {
  const hasToken = 'hasToken' in getCookies()
  if (hasToken === sessionState.isAuthenticated) return
  $store(hasToken ? Auth.actions.login() : Auth.actions.logout())
}, 750)

export const authReducers = Auth.reducer
export default Auth.actions
