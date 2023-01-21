import { useSelector } from 'react-redux'
import { Routes } from 'react-router-dom'
import { Store } from '$store'
import All from '$routes/All'
import Authenticated from '$routes/Authenticated'
import NotAuthenticated from '$routes/NotAuthenticated'
import { Suspense } from 'react'

const App = () => {
  const isAuthenticated = useSelector<Store>(
    (state) => state.auth.isAuthenticated
  )

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        {isAuthenticated ? Authenticated : NotAuthenticated}
        {All}
      </Routes>
    </Suspense>
  )
}

export default App
