import { Navigate, Route, Routes } from 'react-router-dom'
import { createSuspenseApi } from '$api/http'
import { navigateTo } from './utils'
import { useStore } from '$store'
import Auth from '$slice/Auth'
import User from '$slice/User'
import * as page from '$pages/Authenticated'
import * as socket from '$src/socket'
import Loading from '$components/Loading'
import Verificaiton from '$features/Auth/Verificaiton'
const useAuthApi = createSuspenseApi()

const Authenticated = () => {
  let suspenseError
  const auth = useStore((state) => state.auth)
  const user = useStore((state) => state.user.user)

  if (!auth.jwt) {
    const [{ error }] = useAuthApi(['get', '/auth/token'], ([{ data, ok }]) => {
      if (!ok) return
      $store(Auth.jwt(data.token))
      $store(User.setUser(data.user))
    })

    suspenseError = error
  }

  if (suspenseError) return <h1>{suspenseError}</h1>
  if (user._id && !user.isVerified) return <Verificaiton user={user} />

  socket.connect(auth.jwt)
  if (auth.socketError) return <h1>{auth.socketError}</h1>
  if (!auth.isSocketConnected) return <Loading />

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
