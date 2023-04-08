import { useApi } from '$api/http'
import { useNavigate } from 'react-router-dom'
import Auth from '$slice/Auth'
import Layout from './Layout'
import User from '$slice/User'
import { Input } from '$components/Input'
import { ButtonPrimary } from '$components/Button'
import { parseFormToObj } from '$utils'

const Login = () => {
  const api = useApi()
  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = parseFormToObj(e.target)
    const data = await api.post('/auth/login', formData)
    if (!data) return
    $store(User.setUser(data.user))
    $store(Auth.jwt(data.token))
    navigate('/')
  }

  return (
    <Layout
      label="Signup"
      link="/signup"
      des="Don't have an account?"
      onSubmit={handleFormSubmit}
    >
      <Input type="text" name="login" placeholder="email or username" />
      <Input type="password" name="password" placeholder="Password" />
      <ButtonPrimary>Login</ButtonPrimary>
    </Layout>
  )
}

export default Login
