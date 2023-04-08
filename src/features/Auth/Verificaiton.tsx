import { useApi } from '$api/http'
import { ButtonPrimary } from '$components/Button'
import { Input } from '$components/Input'
import User, { UserType } from '$slice/User'
import Layout from './Layout'
import css from './Verificaiton.module.scss'

interface Props {
  user: UserType
}

const Verificaiton = ({ user }: Props) => {
  const api = useApi()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await api.post('/auth/acc-verification', {
      code: e.target.elements.code.value,
    })
    if (!data) return
    $store(User.setUser(data.user))
  }

  return (
    <Layout onSubmit={handleSubmit}>
      <Input type="text" name="code" placeholder="Code" />
      <ButtonPrimary>Verify</ButtonPrimary>
    </Layout>
  )
}

export default Verificaiton
