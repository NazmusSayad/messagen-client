import { io, Socket } from 'socket.io-client'
import { baseURL } from '$api/http'
import Auth from '$slice/Auth'
import socketEvent from './socketEvent'
let __socket__: Socket

export const connectSocket = (jwt) => {
  if (getSocket()) return
  $store(Auth.setSocketError(''))

  const socket = setSocket(
    io(baseURL, {
      auth: { authorization: jwt },
    })
  )

  socket.on('init', socketEvent.$init)
  socket.on('ok', () => $store(Auth.socketId(socket.id)))

  socket.on('error', (message) => {
    $store(Auth.setSocketError(message))
    socket.disconnect()
  })

  socket.on('disconnect', () => {
    $store(Auth.socketId(null))
    disconnectSocket()
  })

  socket.onAny((ev: string, data) => {
    if (!ev.startsWith('$')) return

    const cb = socketEvent[ev.slice(1)]
    if (cb) cb(data)
    else console.log('Callback for', ev, 'not found!', data)
  })
}

export const getSocket = () => __socket__
export const setSocket = (socket: Socket) => (__socket__ = socket)
export const disconnectSocket = () => {
  const socket = getSocket()
  socket?.connected && socket.disconnect()
  setSocket(null as any)
}
