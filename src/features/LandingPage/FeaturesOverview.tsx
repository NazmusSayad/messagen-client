import css from './FeaturesOverview.module.scss'
import { BsChatDots } from 'react-icons/bs'
import { MdOutlineCloud } from 'react-icons/md'
import { HiOutlineFolderMinus } from 'react-icons/hi2'
import Wrapper from '$layouts/Wrapper'

const Card = ({ icon, title, description }) => {
  return (
    <div className={css.card}>
      <div className={css.icon}>{icon}</div>
      <h3 className={css.title}>{title}</h3>
      <div className={css.description}>{description}</div>
    </div>
  )
}

const FeaturesOverview = () => {
  return (
    <div className={css.FeaturesOverview}>
      <Wrapper>
        <header className={css.header}>
          <h3>WHY MESSAGEN</h3>
          <h2>Some of our feature to help your communication</h2>
        </header>

        <div className={css.main}>
          <Card
            icon={<BsChatDots style={{ transform: 'scaleX(-1)' }} />}
            title="Team Messages"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla autem explicabo dolorum suscipit sequi, corrupti voluptatibus, voluptates eaque distinctio asperiores dolore quisquam perferendis aliquam aut placeat iure accusantium eos quis?"
          />

          <Card
            icon={<HiOutlineFolderMinus />}
            title="File Management System"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla autem explicabo dolorum suscipit sequi, corrupti voluptatibus, voluptates eaque distinctio asperiores dolore quisquam perferendis aliquam aut placeat iure accusantium eos quis?"
          />

          <Card
            icon={<MdOutlineCloud />}
            title="Light and Dark Mode"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla autem explicabo dolorum suscipit sequi, corrupti voluptatibus, voluptates eaque distinctio asperiores dolore quisquam perferendis aliquam aut placeat iure accusantium eos quis?"
          />
        </div>
      </Wrapper>
    </div>
  )
}

export default FeaturesOverview
