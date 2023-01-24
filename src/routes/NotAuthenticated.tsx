import { useLayoutEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { navigateTo } from './utils'
import * as socket from '$src/socket'
import * as page from '$pages/NotAuthenticated'

const NotAuthenticated = () => {
  useLayoutEffect(() => socket.disconnectSocket(), [])

  return (
    <Routes>
      <Route index element={<page.Home />} />
      <Route path="login" element={<page.Login />} />
      <Route path="signup" element={<page.Signup />} />

      {navigateTo(['account'], '/login')}
    </Routes>
  )
}

export default NotAuthenticated
