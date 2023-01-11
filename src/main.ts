import store from '$store'
import getClassName from 'get-classnames'

window.$store = store
window.$cn = getClassName

declare global {
  var $store: typeof store
  var $cn: typeof getClassName
}

import './index'
