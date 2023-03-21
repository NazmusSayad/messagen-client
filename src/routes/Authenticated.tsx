import { Navigate, Route, Routes } from 'react-router-dom'
import { createSuspenseApi } from '$api/http'
import { navigateTo } from './utils'
import * as socket from '$src/socket'
import { useStore } from '$store'
import Auth from '$slice/Auth'
import User from '$slice/User'
import Loading from '$components/Loading'
import * as page from '$pages/Authenticated'

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

  socket.connect(auth.jwt)
  // if (!auth.isSocketConnected) return <Loading />
  if (suspenseError) return <h1>{suspenseError}</h1>
  if (auth.socketError) return <h1>{auth.socketError}</h1>

  return (
    <Routes>
      <Route element={<page.Dashboard />}>
        <Route index element={<Navigate to="chat" />} />

        <Route path="chat" element={<page.Chat />}>
          <Route index element={<></>} />
          <Route path=":id" element={<page.ChatMain />} />
        </Route>
        <Route path="contacts" element={<page.Contacts />} />
        <Route path="settings" element={<page.Settings />} />
        <Route path="profile" element={<page.Profile />} />
      </Route>

      {navigateTo(['signup', 'login'], '/profile')}
    </Routes>
  )
}

export default Authenticated
