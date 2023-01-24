import { useApi } from '$api/react'
import { useNavigate } from 'react-router-dom'
import Auth from '$slice/Auth'
import css from './Login.module.scss'
import Layout from './Layout'

const Login = () => {
  const api = useApi()
  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      login: e.target.elements.login.value,
      password: e.target.elements.password.value,
    }

    const data = await api.post('/auth/login', formData)
    if (!data) return
    console.log(data.user)
    $store(Auth.jwt(data.token))
    navigate('/')
  }

  return (
    <Layout>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="login" />
        <input type="password" name="password" />
        <button>Login</button>
      </form>
    </Layout>
  )
}

export default Login
