import { io, Socket } from 'socket.io-client'
import socketEvent from './socketEvent'
import { baseURL } from '$api/http'
import Auth from '$slice/Auth'
import * as mem from './store'
import store from '$store'

const runListner = (event: string, data) => {
  if (event.startsWith('#')) return
  const handler = socketEvent[event]
  if (!(handler instanceof Function)) {
    return console.warn('No handler found for ' + event)
  }
  handler(data?.data ?? data)
}

export { get } from './store'

export const connect = (token) => {
  if (mem.get()) return
  mem.set(true)

  const soc = io(baseURL, {
    auth: { authorization: token },
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax: 2500,
    reconnectionAttempts: Infinity,
  })

  soc.on('#ok', () => {
    mem.set(soc)
    $store(Auth.socketId(soc.id))
  })

  soc.on('#error', (message) => {
    disconnect(soc)
    $store(Auth.setSocketError(message))
  })

  soc.on('disconnect', () => {
    // disconnect(soc)
  })

  soc.onAny(runListner)
}

export const disconnect = (soc = mem.get()) => {
  if (!soc || !soc.disconnect) return
  soc.disconnect()
  soc.close()
  mem.set()
  $store(Auth.socketId(null))
}

export const update = (token = store.getState().auth.jwt) => {
  token ? connect(token) : disconnect()
}
