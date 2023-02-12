import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { createSuspenseApi } from '$api/http'
import { navigateTo } from './utils'
import * as socket from '$src/socket'
import { Store } from '$store'
import Auth from '$slice/Auth'
import Loading from '$components/Loading'

import Dashboard from '$features/Dashboard'
import Chat from '$features/Chat'

const useSuspenseApi = createSuspenseApi()

const Authenticated = () => {
  let suspenseError
  const auth = useSelector<Store, Store['auth']>((state) => state.auth)

  if (!auth.jwt) {
    const [{ error }] = useSuspenseApi(
      ['get', '/auth/token'],
      ([{ data, ok }]) => {
        if (!ok) return
        $store(Auth.jwt(data.token))
        $store(Auth.putUser(data.user))
      }
    )

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

        <Route path="settings" element={<h1>Settings</h1>} />
        <Route path="friends" element={<h1>Friends</h1>} />
        <Route path="chat" element={<Chat />}>
          <Route index element={<h1>HelloIndex</h1>} />
          <Route path=":id" element={<h1>Hello id</h1>} />
        </Route>
      </Route>

      {navigateTo(['signup', 'login'], '/account')}
    </Routes>
  )
}

export default Authenticated
