import { ButtonBlank } from '$components/Button'
import { FaUserFriends } from 'react-icons/fa'
import { AiFillMessage } from 'react-icons/ai'
import { IoSettings } from 'react-icons/io5'
import css from './Sidebar.module.scss'

const SidebarIcon = ({ icon, ...props }) => {
  return (
    <ButtonBlank {...props} className={[css.button, 'buttonFocus']}>
      <div className={css.icon}>{icon}</div>
    </ButtonBlank>
  )
}

const Sidebar = () => {
  return (
    <div className={css.Sidebar}>
      <div className={css.top}>
        <SidebarIcon icon={<AiFillMessage />} nav to="chat" />
        <SidebarIcon icon={<FaUserFriends />} nav to="friends" />
        <SidebarIcon icon={<IoSettings />} nav to="settings" />
      </div>

      <div className={css.bottom}>Profile</div>
    </div>
  )
}

export default Sidebar
