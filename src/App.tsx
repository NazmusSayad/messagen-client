import { useStore } from '$store'
import RootRoutes from '$routes/Root'
import Authenticated from '$routes/Authenticated'
import NotAuthenticated from '$routes/NotAuthenticated'
import { Suspense, useLayoutEffect } from 'react'
import Loading from '$components/Loading'
import * as socket from '$src/socket'

const App = () => {
  const isAuthenticated = useStore((state) => state.auth.isAuthenticated)
  useLayoutEffect(() => socket.update(), [isAuthenticated])

  return (
    <Suspense fallback={<Loading />}>
      <RootRoutes
        element={isAuthenticated ? <Authenticated /> : <NotAuthenticated />}
      />
    </Suspense>
  )
}

export default App
