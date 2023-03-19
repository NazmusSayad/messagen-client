import { io } from 'socket.io-client'
import socketEvent from './socketEvent'
import { baseURL } from '$api/http'
import Auth from '$slice/Auth'
let socket: any = undefined

const runListner = (event: string, data) => {
  if (event.startsWith('#')) return
  const handler = socketEvent[event]
  if (!(handler instanceof Function)) {
    return console.warn('No handler found for ' + event)
  }
  handler(data?.data ?? data)
}

const connect = (token) => {
  if (socket) return console.log('Socket Already Connected')
  socket = true

  const soc = io(baseURL, {
    auth: { authorization: token },
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax: 2500,
    reconnectionAttempts: Infinity,
  })

  soc.on('#ok', () => {
    socket = soc
    $store(Auth.socketId(soc.id))
  })

  soc.on('#error', (message) => {
    $store(Auth.setSocketError(message))
    socket.disconnect()
  })

  soc.on('disconnect', () => {
    socket = undefined
    $store(Auth.socketId(null))
  })

  soc.onAny(runListner)
}

export const getSocket = () => socket
export default (token = '') => {
  try {
    if (!socket && token) connect(token)
    if (socket && !token) socket?.disconnect()
  } catch (err) {
    console.log(err)
    console.error('Something went wrong in setSocket')
  }
}
