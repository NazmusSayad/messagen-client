import css from './Sidebar.module.scss'

const Sidebar = ({ children, title, autoScroll = true }) => {
  return (
    <div className={css.Sidebar}>
      <h3 className={css.title}>{title}</h3>

      <div className={$cn(autoScroll && css.contentScroll)}>
        <div className={css.content}>{children}</div>
      </div>
    </div>
  )
}

export default Sidebar
