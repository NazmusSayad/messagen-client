import { io, Socket } from 'socket.io-client'
import { baseURL } from '$api/http'
import Auth from '$slice/Auth'
import socketEvent from './socketEvent'
let __socket__: Socket

export const connectSocket = (jwt) => {
  const socket =
    getSocket() ??
    setSocket(
      io(baseURL, {
        auth: { authorization: jwt },
      })
    )

  socket.on('ok', () => {
    $store(Auth.socketId(socket.id))
  })

  socket.on('disconnect', () => {
    $store(Auth.socketId(null))
    disconnectSocket()
  })

  socket.onAny((ev: string, data) => {
    if (!ev.startsWith('$')) return

    const cb = socketEvent[ev]
    if (cb) cb(data)
    else console.log('Callback for', ev, 'not found!')
  })
}

export const getSocket = () => __socket__
export const setSocket = (socket: Socket) => (__socket__ = socket)
export const disconnectSocket = () => {
  const socket = getSocket()
  socket?.connected && socket.disconnect()
  setSocket(null as any)
}
