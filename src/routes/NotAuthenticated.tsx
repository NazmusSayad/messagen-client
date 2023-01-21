import { Route, Routes } from 'react-router-dom'
import { navigateTo } from './utils'
import Home from '$pages/NotAuthenticated/Home'

const NotAuthenticated = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path="login" element={<h1>Login</h1>} />
    <Route path="signup" element={<h1>Signup</h1>} />

    {navigateTo(['account'], '/login')}
  </Routes>
)

export default NotAuthenticated
