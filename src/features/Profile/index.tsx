import AvatarPicker from '$components/AvatarPicker'
import EditAbleInput from '$components/EditAbleInput'
import Wrapper from '$layouts/Wrapper'
import { useStore } from '$store'
import css from './index.module.scss'
import User from '$slice/User'
import { useApi } from '$api/http'
import { convertToFormData } from '$utils'

const index = () => {
  const api = useApi()
  const user = useStore((state) => state.user.user)

  return (
    <Wrapper className={css.container}>
      <div>
        <AvatarPicker
          disabled={api.loading}
          onFileChange={async (file) => {
            const data = await api.patch(
              '/account',
              convertToFormData({ avatar: file })
            )
            data && $store(User.setUser(data.user))
          }}
        />

        {api.error && <div className={css.error}>{api.error}</div>}
      </div>

      <EditAbleInput
        placeholder={user.name}
        label="Name"
        onApi={async (api, { input }, clear) => {
          const data = await api.patch('/account', { name: input })
          data && ($store(User.setUser(data.user)), clear())
        }}
      />

      <EditAbleInput
        password
        label="Username"
        placeholder={user.username}
        onApi={async (api, { input, password }, clear) => {
          const data = await api.patch('/account/username', {
            username: input,
            password,
          })
          data && ($store(User.setUser(data.user)), clear())
        }}
      />

      {user.pendingEmail ? (
        <EditAbleInput
          label="Pending Email"
          placeholder="Code"
          onApi={async (api, { input }, clear) => {
            const data = await api.patch('/account/email-verify', {
              code: input,
            })
            data && ($store(User.setUser(data.user)), clear())
          }}
        />
      ) : (
        <EditAbleInput
          password
          label="Email"
          placeholder={user.email}
          onApi={async (api, { input, password }, clear) => {
            const data = await api.post('/account/email', {
              email: input,
              password,
            })
            data && ($store(User.setUser(data.user)), clear())
          }}
        />
      )}
    </Wrapper>
  )
}

export default index
