import ReactApi from 'use-react-api'
const devStatus: any = {
  // useDevMode: true,
}

const localURL = 'http://localhost:8000'
const hostURL = 'http://192.168.0.100:8000'
const onlineURL = 'https://messagen.onrender.com'

const devURL = location.host.startsWith('192') ? hostURL : localURL
const isDevMode = devStatus.useDevMode && location.protocol === 'http:'
export const baseURL = isDevMode ? devURL : onlineURL

console.clear()
console.log('Server:', baseURL)

const reactApi = ReactApi(
  {
    baseURL,
    withCredentials: true,
    headers: {
      authorization: null,
      socketid: null,
    },
  },
  {
    _getFail(err) {
      if (err.response?.status === 401) {
        $store({ type: 'auth/logout' })
      }
    },
  }
)

export default reactApi
export const { useApi, useApiOnce, createSuspenseApi } = reactApi

export const updateJwtToken = (jwt) => {
  reactApi.instance.defaults.headers.authorization = jwt
}

export const updateSocketId = (sid) => {
  reactApi.instance.defaults.headers.socketid = sid
}
