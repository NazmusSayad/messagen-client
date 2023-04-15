import { useRef, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import css from './AvatarPicker.module.scss'

interface Props {}

const AvatarPicker = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const [imgSrc, setImgSrc] = useState('')

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    setImgSrc(file ? URL.createObjectURL(file) : '')
  }

  return (
    <div className={css.AvatarPicker} onClick={handleClick}>
      {imgSrc ? <img src={imgSrc} alt="" /> : <AiOutlineCamera />}

      <input
        ref={inputRef as any}
        hidden
        type="file"
        name="avatar"
        onChange={handleChange}
      />
    </div>
  )
}

export default AvatarPicker
