import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { createSuspenseApi } from '$api/react'
import { navigateTo } from './utils'
import * as socket from '$src/socket'
import { Store } from '$store'
import Auth from '$slice/Auth'
import Loading from '$components/Loading'

const useSuspenseApi = createSuspenseApi()

const Authenticated = () => {
  const auth = useSelector<Store, Store['auth']>((state) => state.auth)

  if (!auth.jwt) {
    useSuspenseApi(
      ['get', '/auth/token'],
      ([
        {
          data: { user, token },
        },
      ]) => {
        $store(Auth.jwt(token))
        socket.connectSocket(token)
      }
    )
  }

  if (!auth.isSocketConnected) return <Loading />
  socket.sendRequest('test', 'hello testing...').then((data) => {
    console.log(data)
  })

  return (
    <Routes>
      <Route index element={<h1>Dashboard</h1>} />

      {navigateTo(['signup', 'login'], '/account')}
    </Routes>
  )
}

export default Authenticated
