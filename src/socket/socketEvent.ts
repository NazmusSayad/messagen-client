import Message from '$slice/Message'
import User from '$slice/User'

export default {
  ['messages/post'](data) {
    $store(Message.addMessage(data.message))
  },

  ['contact/put'](data) {
    $store(User.putContact(data.contact))
  },

  ['contact/delete'](id) {
    $store(User.deleteContact(id))
  },
}
