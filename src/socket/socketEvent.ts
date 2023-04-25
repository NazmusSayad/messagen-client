import Message from '$slice/Message'
import User from '$slice/User'
import sendMessageNotification from '$utils/sendMessageNotification'

export default {
  ['messages/post'](data) {
    sendMessageNotification(data.message)
    $store(Message.addMessage(data.message))
  },

  ['messages/delete'](id) {
    $store(Message.removeMessage(id))
  },

  ['contact/put'](data) {
    $store(User.putContact(data.contact))
  },

  ['contact/delete'](id) {
    $store(User.deleteContact(id))
  },
}
