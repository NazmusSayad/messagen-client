import { useMemo, useState } from 'react'
import { getSocket } from '$socket'

type SendSocketReturnValue = Promise<{ ok: boolean; data?: any; error?: any }>
const INITIAL_STATUS = {
  error: undefined as any,
  loading: false,
}

export const sendRequest = (ev, body: unknown): SendSocketReturnValue => {
  const socket = getSocket()
  if (!socket) {
    return Promise.resolve({
      ok: false,
      error: 'Unable to conncet with server',
    })
  }

  return new Promise((resolve) => {
    socket.emit(ev, body, (res) => {
      const ok = res.status === 'success'
      resolve(ok ? { data: res.data, ok } : { error: res.message, ok })
    })
  })
}

export const useWs = () => {
  const [status, setStatus] = useState(INITIAL_STATUS)

  const methods = useMemo(() => {
    return {
      get socket() {
        return getSocket()
      },

      async send(ev: string, body: unknown) {
        setStatus({ ...INITIAL_STATUS, loading: true })
        const { ok, data, error } = await sendRequest(ev, body)
        setStatus({ ...INITIAL_STATUS, error: ok ? undefined : error })
        return data
      },
    }
  }, [])

  return useMemo(() => ({ ...status, ...methods }), [status])
}
