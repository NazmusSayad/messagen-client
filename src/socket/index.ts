import { io, Socket } from 'socket.io-client'
import { baseURL } from '$api/react'
import Auth from '$slice/Auth'
import socketEvent from './socketEvent'

const getSocket = () => {
  return window.__socket__
}

const setSocket = (socket: Socket) => {
  return (window.__socket__ = socket)
}

export const connectSocket = (jwt) => {
  const socket =
    getSocket() ?? setSocket(io(baseURL, { auth: { authorization: jwt } }))

  socket.on('connect', () => $store(Auth.socketId(socket.id)))
  socket.onAny((ev: string, data) => {
    if (ev.startsWith('$')) return

    const cb = socketEvent[ev]
    if (cb) cb(data)
    else console.log('Callback for', ev, 'not found!')
  })
}

export const disconnectSocket = () => {
  getSocket()?.disconnect()
  setSocket(null as any)
}

export const sendRequest = (ev, data) => {
  const socket = getSocket()
  if (!socket) return Promise.resolve(false)

  return new Promise((resolve) => {
    socket.emit(ev, data, (res) => {
      console.log(res)
      resolve({ data: res.data, error: res.message })
    })
  })
}
