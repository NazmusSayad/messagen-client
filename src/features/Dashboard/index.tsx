import { createSuspenseApi } from '$api/http'
import useMobileMode from '$hooks/useMobileMode'
import User from '$slice/User'
import { Outlet } from 'react-router-dom'
import css from './index.module.scss'
import Sidebar from './Sidebar'

const useBaseApi = createSuspenseApi()

const index = () => {
  useBaseApi(['get', '/contacts'], ([{ data }]) => {
    data && $store(User.setContacts(data.contacts))
  })

  const isMobile = useMobileMode()
  const sidebar = (
    <div className={css.sidebar}>
      <Sidebar />
    </div>
  )

  return (
    <div className={css.Dashboard}>
      {isMobile || sidebar}

      <div className={css.main}>
        <Outlet />
      </div>

      {isMobile && sidebar}
    </div>
  )
}

export default index
