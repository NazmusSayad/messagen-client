import { Navigate, Route } from 'react-router-dom'

export const navigateTo = (path: string[], to: string, replace = true) => {
  const element = <Navigate replace={replace} to={to} />

  return path.map((from) => {
    return <Route key={from + to} path={from} element={element} />
  })
}
