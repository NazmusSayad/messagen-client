import { useMemo, useState } from 'react'
import { getSocket } from '$socket'

type SendSocketReturnValue = Promise<{ ok: boolean; data?: any; error?: any }>
const initialStatus = {
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
  const [status, setStatus] = useState(initialStatus)

  const methods = useMemo(() => {
    return {
      socket: getSocket(),
      async send(ev: string, body: unknown) {
        setStatus({ ...initialStatus, loading: true })
        const { ok, data, error } = await sendRequest(ev, body)
        setStatus({ ...initialStatus, error: ok ? undefined : error })
        return data
      },
    }
  }, [])

  return useMemo(() => ({ ...status, ...methods }), [status])
}
