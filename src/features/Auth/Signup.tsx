import css from './Signup.module.scss'
import Layout from './Layout'

const Signup = () => {
  return (
    <Layout>
      <form>
        <input type="text" name="login" />
        <input type="password" name="password" />
        <button>Login</button>
      </form>
    </Layout>
  )
}

export default Signup
