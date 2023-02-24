import { ButtonBlank } from '$components/Button'
import { FaUserFriends } from 'react-icons/fa'
import { AiFillMessage } from 'react-icons/ai'
import { IoSettings } from 'react-icons/io5'
import css from './Sidebar.module.scss'
import catAvatar from '$assets/cat-x256.jpg'
import { useStore } from '$store'

const SidebarIcon = ({ icon, ...props }) => {
  return (
    <ButtonBlank {...props} className={[css.button, 'buttonFocus']}>
      <div className={css.icon}>{icon}</div>
    </ButtonBlank>
  )
}

const Sidebar = () => {
  const userAvatar = useStore((state) => state.user.user.avatar)

  return (
    <div className={css.Sidebar}>
      <div className={css.top}>
        <SidebarIcon icon={<AiFillMessage />} nav to="chat" />
        <SidebarIcon icon={<FaUserFriends />} nav to="contacts" />
        <SidebarIcon icon={<IoSettings />} nav to="settings" />
      </div>

      <div className={css.bottom}>
        <ButtonBlank className={css.avatarBtn}>
          <img src={userAvatar || catAvatar} alt="" />
        </ButtonBlank>
      </div>
    </div>
  )
}

export default Sidebar
