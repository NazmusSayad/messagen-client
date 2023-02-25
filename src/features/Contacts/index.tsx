import Wrapper from '$layouts/Wrapper'
import AddFriends from './AddFriends'
import Friends from './Friends'
import Groups from './Groups'
import css from './index.module.scss'

const Group = ({ title = '', children }) => {
  return (
    <Wrapper className={css.group}>
      {title && <h3>{title}</h3>}
      {children}
    </Wrapper>
  )
}

const index = () => {
  return (
    <div className={css.Contacts}>
      <Wrapper className={css.wrapper}>
        <Wrapper className={css.addFriends}>
          <AddFriends />
        </Wrapper>

        <div className={css.contacts}>
          <Group title="Groups">
            <Groups />
          </Group>

          <Group title="Friends">
            <Friends />
          </Group>
        </div>
      </Wrapper>
    </div>
  )
}

export default index
