import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage, setLocalStorage } from '$utils'
import reactApi, * as api from '$api/http'

const initialState = {
  isAuthenticated: false,
  isSocketConnected: false,
  jwt: null as null | string,
  socket: null as null | string,
  socketError: '',
}

const sessionState = {
  ...initialState,
  isAuthenticated: Boolean(getLocalStorage('hasToken')),
}

const Auth = createSlice({
  name: 'auth',
  initialState: { ...sessionState },
  reducers: {
    jwt(state, { payload }) {
      sessionState.isAuthenticated = Boolean(payload)
      api.updateJwtToken(payload ? `Bearer ${payload}` : undefined)
      setLocalStorage('hasToken', payload ? true : null)

      state.jwt = payload || null
      state.isAuthenticated = Boolean(payload)
    },

    login(state) {
      setLocalStorage('hasToken', true)
      sessionState.isAuthenticated = true
      state.isAuthenticated = true
    },

    logout(state) {
      reactApi.methods.get('/auth/clear')
      setLocalStorage('hasToken', null)

      Object.assign(sessionState, initialState)
      Object.assign(state, initialState)
    },

    socketId(state, { payload }) {
      api.updateSocketId(payload || undefined)

      state.socket = payload || null
      state.isSocketConnected = Boolean(payload)
    },

    setSocketError(state, { payload }) {
      state.socketError = payload
    },
  },
})

setInterval(() => {
  const hasToken = Boolean(getLocalStorage('hasToken'))
  if (hasToken === sessionState.isAuthenticated) return
  $store(hasToken ? Auth.actions.login() : Auth.actions.logout())
}, 750)

export const authReducers = Auth.reducer
export default Auth.actions
