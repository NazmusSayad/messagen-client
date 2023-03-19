import { io, Socket } from 'socket.io-client'
import { baseURL } from '$api/http'
import Auth from '$slice/Auth'
import socketEvent from './socketEvent'
let socket: Socket

export const connectSocket = (jwt) => {
  if (socket) return
  disconnectSocket()
  $store(Auth.setSocketError(''))
  socket = io(baseURL, {
    auth: { authorization: jwt },
  })

  socket.on('#ok', () => $store(Auth.socketId(socket.id)))
  socket.on('#error', (message) => {
    $store(Auth.setSocketError(message))
    socket.disconnect()
  })

  socket.on('disconnect', () => {
    $store(Auth.socketId(null))
    disconnectSocket()
  })

  socket.onAny((ev: string, data) => {
    if (ev.startsWith('#')) return
    const listner = socketEvent[ev]
    if (listner) return listner(data.data || data)
    console.log('Callback for', ev, 'not found!', data)
  })
}

export const getSocket = () => socket
export const disconnectSocket = () => {
  socket?.connected && socket.disconnect()
  socket?.removeAllListeners()
  socket = null as any
}
