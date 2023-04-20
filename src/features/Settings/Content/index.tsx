import Wrapper from '$layouts/Wrapper'
import css from './index.module.scss'

const index = ({ goBack, activeMenu, component }) => {
  return (
    <div className={css.content}>
      <Wrapper>{component}</Wrapper>
    </div>
  )
}

export default index
