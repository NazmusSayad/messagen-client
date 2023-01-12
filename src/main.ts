import store from '$store'
import getClassName from 'get-classnames'

declare global {
  var $store: typeof store
  var $cn: typeof getClassName
}

window.$cn = getClassName
window.$store = store
import './index'
