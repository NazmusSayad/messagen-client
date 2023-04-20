import SidebarContent from './Sidebar'
import Content from './Content'
import css from './index.module.scss'
import Sidebar from '$layouts/Sidebar'
import useMobileMode from '$hooks/useMobileMode'
import Dialog from '$components/Dialog'
import { useState } from 'react'
import Appearance from './Content/Appearance'

const menus = [
  { id: 'appearance', label: 'Appearance', component: <Appearance /> },
]

const index = () => {
  const mobileMode = useMobileMode()
  const [activeMenu, setActiveMenu] = useState(menus[0].id)
  const goBack = () => setActiveMenu('')

  return (
    <div className={css.Settings}>
      <Sidebar title="Settings">
        <SidebarContent
          menus={menus}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      </Sidebar>

      {!(mobileMode && !activeMenu) && (
        <Dialog open={mobileMode}>
          <Content
            goBack={goBack}
            activeMenu={activeMenu}
            component={menus.find((m) => m.id === activeMenu)?.component}
          />
        </Dialog>
      )}
    </div>
  )
}

export default index
