import getClassName from 'get-classnames'
import store from '$store'

window.$cn = getClassName
window.$store = store

declare global {
  var $cn: typeof getClassName
  var $store: typeof store
}

import './index'
