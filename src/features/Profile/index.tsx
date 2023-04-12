import { ButtonRed } from '$components/Button'
import Auth from '$slice/Auth'
import css from './index.module.scss'

const index = () => {
  return <ButtonRed onClick={() => $store(Auth.logout())}>Logout</ButtonRed>
}

export default index
