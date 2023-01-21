import { Route } from 'react-router-dom'
import { navigateTo } from './utils'

export default (
  <Route path="/*">
    <Route index element={<h1>Dashboard</h1>} />

    {navigateTo(['signup', 'login'], '/account')}
  </Route>
)
