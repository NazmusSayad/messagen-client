import { Outlet } from 'react-router-dom'
import css from './index.module.scss'
import Sidebar from './Sidebar'

const index = () => {
  return (
    <div className={css.Chat}>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default index
