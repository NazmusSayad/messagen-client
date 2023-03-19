import { useLayoutEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { navigateTo } from './utils'
import socket from '$src/socket'
import * as page from '$pages/NotAuthenticated'

const NotAuthenticated = () => {
  useLayoutEffect(() => socket(), [])

  return (
    <Routes>
      <Route index element={<page.Home />} />
      <Route path="login" element={<page.Login />} />
      <Route path="signup" element={<page.Signup />} />

      {navigateTo(['chat*', 'contacts*', 'settings*', 'profile*'], '/login')}
    </Routes>
  )
}

export default NotAuthenticated
