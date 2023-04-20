import { useApi } from '$api/http'
import { useNavigate } from 'react-router-dom'
import Auth from '$slice/Auth'
import Layout from './Layout'
import User from '$slice/User'
import { Input } from '$components/Input'
import { ButtonPrimary } from '$components/Button'
import { parseFormToObj, convertToFormData } from '$utils'
import AvatarPicker from '$components/AvatarPicker'

const Login = () => {
  const api = useApi()
  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = parseFormToObj(e.target)
    const data = await api.post(
      '/auth/signup',
      formData.avatar ? convertToFormData(formData) : formData
    )

    if (!data) return
    $store(User.setUser(data.user))
    $store(Auth.jwt(data.token))
    navigate('/')
  }

  return (
    <Layout
      label="Login"
      link="/login"
      des="Already have an account?"
      onSubmit={handleFormSubmit}
    >
      <AvatarPicker />
      <Input type="text" name="name" placeholder="John Doe" />
      <Input type="text" name="username" placeholder="johndoe11" />
      <Input type="email" name="email" placeholder="john@example.com" />
      <Input type="password" name="password" placeholder="Password" />
      <ButtonPrimary>Signup</ButtonPrimary>
    </Layout>
  )
}

export default Login
