import { createSuspenseApi } from '$api/http'
import User from '$slice/User'
import { Outlet } from 'react-router-dom'
import css from './index.module.scss'
import Sidebar from './Sidebar'

const useBaseApi = createSuspenseApi()

const index = () => {
  useBaseApi(['get', '/contacts'], ([{ data }]) => {
    data && $store(User.setContacts(data.contacts))
  })

  return (
    <div className={css.Dashboard}>
      <div className={css.sidebar}>
        <Sidebar />
      </div>

      <div className={css.main}>
        <Outlet />
      </div>
    </div>
  )
}

export default index
