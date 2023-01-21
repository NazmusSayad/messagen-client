import { Route } from 'react-router-dom'
import { navigateTo } from './utils'
import Home from '$pages/NotAuthenticated/Home'

export default (
  <Route path="/*">
    <Route index element={<Home />} />
    <Route path="login" element={<h1>Login</h1>} />
    <Route path="signup" element={<h1>Signup</h1>} />

    {navigateTo(['account'], '/login')}
  </Route>
)
