import { useStore } from '$store'
import RootRoutes from '$routes/Root'
import Authenticated from '$routes/Authenticated'
import NotAuthenticated from '$routes/NotAuthenticated'
import { Suspense } from 'react'
import Loading from '$components/Loading'
import Effect from './Effect'

const App = () => {
  const isAuthenticated = useStore((state) => state.auth.isAuthenticated)

  return (
    <>
      <Effect />

      <Suspense fallback={<Loading />}>
        <RootRoutes
          element={isAuthenticated ? <Authenticated /> : <NotAuthenticated />}
        />
      </Suspense>
    </>
  )
}

export default App
