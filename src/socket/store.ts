import { Socket } from 'socket.io-client'
let socket

export const set = (soc?: Socket | true) => {
  socket = soc
}

export const get = (): Socket => {
  return socket
}
