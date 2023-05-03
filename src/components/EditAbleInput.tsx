import css from './EditAbleInput.module.scss'
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai'
import { Input } from './Input'
import { ButtonBlank } from './Button'
import { useEffect, useRef, useState } from 'react'
import { useApi } from '$api/http'

const EditAbleInput = ({
  loading = false,
  password = false,
  code = false,
  label,
  onApi,
  ...props
}) => {
  const api = useApi()
  const [isDisabled, setIsDisabled] = useState(true)
  const inputRef = useRef<HTMLInputElement>()
  const passRef = useRef<HTMLInputElement>()
  const isPassEnabled = !isDisabled && password

  useEffect(() => {
    if (isDisabled) return
    inputRef.current?.focus()
  }, [isDisabled])

  function handleClick(e) {
    e.preventDefault()
    if (isDisabled) return setIsDisabled(false)

    if (
      inputRef.current?.value && isPassEnabled ? passRef.current?.value : true
    ) {
      onApi(
        api.methods,
        {
          input: inputRef.current?.value,
          password: passRef.current?.value,
        },
        () => {
          passRef.current && (passRef.current.value = '')
          inputRef.current && (inputRef.current.value = '')
          setIsDisabled(true)
        }
      )
    }

    if (!inputRef.current?.value) {
      setIsDisabled(true)
    }
  }

  return (
    <form onSubmit={handleClick}>
      <div className={css.label}>{label}</div>

      <div className={css.Input}>
        <Input
          {...props}
          ref={inputRef}
          required
          type="text"
          disabled={isDisabled || api.loading}
        />

        <ButtonBlank loading={!isDisabled && loading} className={css.icon}>
          <div className={css.svg}>
            {isDisabled ? <AiOutlineEdit /> : <AiOutlineCheck />}
          </div>
        </ButtonBlank>
      </div>

      {isPassEnabled && (
        <Input
          required
          type={password ? 'password' : 'text'}
          placeholder={password ? 'Password' : 'Code'}
          className={css.password}
          ref={passRef}
          disabled={api.loading}
        />
      )}

      {api.error && <div className={css.error}>{api.error}</div>}
    </form>
  )
}

export default EditAbleInput
