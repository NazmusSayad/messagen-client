import { useSelector } from 'react-redux'
import { Store } from '$store'
import RootRoutes from '$routes/Root'
import Authenticated from '$routes/Authenticated'
import NotAuthenticated from '$routes/NotAuthenticated'
import { Suspense } from 'react'
import Loading from '$components/Loading'

const App = () => {
  const isAuthenticated = useSelector<Store>(
    (state) => state.auth.isAuthenticated
  )

  return (
    <Suspense fallback={<Loading />}>
      <RootRoutes
        element={isAuthenticated ? <Authenticated /> : <NotAuthenticated />}
      />
    </Suspense>
  )
}

export default App
