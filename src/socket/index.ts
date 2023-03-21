import { io, Socket } from 'socket.io-client'
import socketEvent from './socketEvent'
import { baseURL } from '$api/http'
import Auth from '$slice/Auth'
import * as store from './store'

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
  if (store.get()) return
  store.set(true)

  const soc = io(baseURL, {
    auth: { authorization: token },
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax: 2500,
    reconnectionAttempts: Infinity,
  })

  soc.on('#ok', () => {
    store.set(soc)
    $store(Auth.socketId(soc.id))
  })

  soc.on('#error', (message) => {
    disconnect(soc)
    $store(Auth.setSocketError(message))
  })

  soc.on('disconnect', () => {
    disconnect(soc)
  })

  soc.onAny(runListner)
}

export const disconnect = (soc?: Socket) => {
  if (!soc || !soc.disconnect) return
  soc.disconnect()
  soc.close()
  store.set()
  $store(Auth.socketId(null))
}

export const update = (token: any) => {
  token ? connect(token) : disconnect()
}
