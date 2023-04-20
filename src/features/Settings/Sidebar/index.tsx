import { ButtonBlank } from '$components/Button'
import css from './index.module.scss'

const SidebarTab = ({ id, setActiveMenu, activeMenu, children }) => {
  return (
    <div className={css.tab}>
      <ButtonBlank
        onClick={() => setActiveMenu(id)}
        className={[css.tabButton, activeMenu === id && css.active]}
      >
        {children}
      </ButtonBlank>
    </div>
  )
}

const index = ({ setActiveMenu, activeMenu, menus }) => {
  return (
    <div>
      {menus.map((menu) => {
        return (
          <SidebarTab
            key={menu.id}
            id={menu.id}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          >
            {menu.label}
          </SidebarTab>
        )
      })}
    </div>
  )
}

export default index
