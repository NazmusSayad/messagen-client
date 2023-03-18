import Auth from '$slice/Auth'
import User from '$slice/User'

export default {
  ['messages/post'](data) {
    console.log(data)
  },

  ['contact/put'](data) {
    $store(User.putContact(data.contact))
  },

  ['contact/delete'](id) {
    $store(User.deleteContact(id))
  },
}
