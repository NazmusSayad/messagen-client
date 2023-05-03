import { useRef, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import css from './AvatarPicker.module.scss'

const AvatarPicker = ({ onFileChange = null as any, ...props }) => {
  const inputRef = useRef<HTMLInputElement>()
  const [imgSrc, setImgSrc] = useState('')

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    onFileChange && onFileChange(file)
    setImgSrc(file ? URL.createObjectURL(file) : '')
  }

  return (
    <div className={css.AvatarPicker} onClick={handleClick}>
      {imgSrc ? <img src={imgSrc} alt="" /> : <AiOutlineCamera />}

      <input
        {...props}
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
