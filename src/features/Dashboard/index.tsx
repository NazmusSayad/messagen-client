import { Outlet } from 'react-router-dom'
import css from './index.module.scss'
import Sidebar from './Sidebar'

const index = () => {
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
