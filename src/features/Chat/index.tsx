import { Outlet } from 'react-router-dom'
import css from './index.module.scss'

const index = () => {
  return (
    <div className={css.Dashboard}>
      <Outlet />
    </div>
  )
}

export default index
