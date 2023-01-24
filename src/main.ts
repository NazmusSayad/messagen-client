import { Socket } from 'socket.io-client'
import getClassName from 'get-classnames'
import store from '$store'

window.$cn = getClassName
window.$store = store.dispatch

declare global {
  var $cn: typeof getClassName
  var $store: typeof store.dispatch
  var __socket__: Socket | undefined
}

import './index'
