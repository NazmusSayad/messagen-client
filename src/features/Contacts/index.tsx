import Wrapper from '$layouts/Wrapper'
import Friends from './Friends'
import Groups from './Groups'
import css from './index.module.scss'

const Group = ({ title, children }) => {
  return (
    <Wrapper className={css.group}>
      <h3>{title}</h3>
      {children}
    </Wrapper>
  )
}

const index = () => {
  return (
    <Wrapper className={css.wrapper}>
      <Group title="Groups">
        <Groups />
      </Group>

      <Group title="Friends">
        <Friends />
      </Group>
    </Wrapper>
  )
}

export default index
