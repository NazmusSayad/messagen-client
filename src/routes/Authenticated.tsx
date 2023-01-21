import { Route, Routes } from 'react-router-dom'
import { navigateTo } from './utils'

const Authenticated = () => (
  <Routes>
    <Route index element={<h1>Dashboard</h1>} />

    {navigateTo(['signup', 'login'], '/account')}
  </Routes>
)

export default Authenticated
