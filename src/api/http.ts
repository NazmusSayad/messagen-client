import ReactApi from 'use-react-api'

const localURL = 'http://localhost:8000'
const onlineURL = 'https://messagen.onrender.com'

const serverURL = localURL
// const serverURL = onlineURL

export const baseURL = location.hostname === 'localhost' ? serverURL : onlineURL

const reactApi = ReactApi(
  {
    baseURL,
    withCredentials: true,
    headers: {
      token: 'Smile',
      socketid: 'hello',
    },
  },
  {
    _getFail(err) {
      if (err.response?.status === 401) {
        $store({ type: 'auth/logout', payload: undefined })
      }
    },
  }
)

export default reactApi
export const { useApi, useApiOnce, createSuspenseApi } = reactApi

export const updateJwtToken = (jwt) => {
  reactApi.instance.defaults.headers.token = jwt
}

export const updateSocketId = (sid) => {
  reactApi.instance.defaults.headers.socketid = sid
}
