import { Route, Routes } from 'react-router-dom'
import { navigateTo } from './utils'
import * as page from '$pages/NotAuthenticated'
import * as socket from '$src/socket'

const NotAuthenticated = () => {
  socket.disconnect()

  return (
    <Routes>
      <Route index element={<page.Home />} />
      <Route path="login" element={<page.Login />} />
      <Route path="signup" element={<page.Signup />} />

      {navigateTo(
        ['chat/*', 'contacts/*', 'settings/*', 'profile/*'],
        '/login'
      )}
    </Routes>
  )
}

export default NotAuthenticated
