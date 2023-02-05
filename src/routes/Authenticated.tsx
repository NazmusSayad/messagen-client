import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { createSuspenseApi } from '$api/http'
import { navigateTo } from './utils'
import * as socket from '$src/socket'
import { Store } from '$store'
import Auth from '$slice/Auth'
import Loading from '$components/Loading'

const useSuspenseApi = createSuspenseApi()

const Authenticated = () => {
  const auth = useSelector<Store, Store['auth']>((state) => state.auth)

  if (!auth.jwt) {
    useSuspenseApi(['get', '/auth/token'], ([{ data, ok }]) => {
      if (!ok) return
      $store(Auth.jwt(data.token))
      $store(Auth.putUser(data.user))
    })
  }

  useLayoutEffect(() => {
    socket.connectSocket(auth.jwt)
  }, [])

  if (auth.socketError) return <h1>{auth.socketError}</h1>
  return !auth.isSocketConnected ? (
    <Loading />
  ) : (
    <Routes>
      <Route index element={<h1>Dashboard</h1>} />

      {navigateTo(['signup', 'login'], '/account')}
    </Routes>
  )
}

export default Authenticated
