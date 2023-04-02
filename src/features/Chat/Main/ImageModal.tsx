import { ButtonBlank } from '$components/Button'
import Dialog from '$components/Dialog'
import { useState } from 'react'
import css from './ImageModal.module.scss'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

type Props = { active: number; images: string[]; setImage }
export default function ImageModal(props: Props) {
  const [active, setActive] = useState(props.active)
  const currentImage = props.images[active]

  const handleLeft = () => setActive((prev) => prev - 1)
  const handleRight = () => setActive((prev) => prev + 1)

  return (
    <Dialog open className={css.Modal}>
      <div className={css.header}>
        <ButtonBlank onClick={() => props.setImage({ images: [] })}>
          Click
        </ButtonBlank>
      </div>

      <div className={css.body}>
        <img src={currentImage} />
        {props.images.length && active !== 0 && (
          <ButtonBlank className={css.left} onClick={handleLeft}>
            <AiOutlineLeft />
          </ButtonBlank>
        )}

        {props.images.length - 1 !== active && (
          <ButtonBlank className={css.right} onClick={handleRight}>
            <AiOutlineRight />
          </ButtonBlank>
        )}
      </div>
    </Dialog>
  )
}
