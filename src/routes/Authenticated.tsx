import { useLayoutEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { createSuspenseApi } from '$api/http'
import { navigateTo } from './utils'
import * as socket from '$src/socket'
import { useStore } from '$store'
import Auth from '$slice/Auth'
import User from '$slice/User'
import Loading from '$components/Loading'

import Dashboard from '$features/Dashboard'
import Chat from '$features/Chat'
import Contacts from '$features/Contacts'
import Settings from '$features/Settings'
import Profile from '$features/Profile'

const useAuthApi = createSuspenseApi()

const Authenticated = () => {
  let suspenseError
  const auth = useStore((state) => state.auth)

  if (!auth.jwt) {
    const [{ error }] = useAuthApi(['get', '/auth/token'], ([{ data, ok }]) => {
      if (!ok) return
      $store(Auth.jwt(data.token))
      $store(User.setUser(data.user))
    })

    suspenseError = error
  }

  useLayoutEffect(() => {
    auth.jwt && socket.connectSocket(auth.jwt)
  }, [])

  if (suspenseError) return <h1>{suspenseError}</h1>
  if (auth.socketError) return <h1>{auth.socketError}</h1>

  return !auth.isSocketConnected ? (
    <Loading />
  ) : (
    <Routes>
      <Route element={<Dashboard />}>
        <Route index element={<Navigate to="chat" />} />

        <Route path="chat" element={<Chat />}>
          <Route index element={<h1>HelloIndex</h1>} />
          <Route path=":id" element={<h1>Hello id</h1>} />
        </Route>
        <Route path="contacts" element={<Contacts />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {navigateTo(['signup', 'login'], '/profile')}
    </Routes>
  )
}

export default Authenticated
