import Wrapper from '$layouts/Wrapper'
import css from './Stats.module.scss'

const StatsItem = ({ number, header, paragraph }) => {
  return (
    <div className={css.Item}>
      <div className={css.top}>
        <h2>{number}</h2>
        <h3>{header}</h3>
      </div>

      <p className={css.bottom}>{paragraph}</p>
    </div>
  )
}

const Stats = () => {
  return (
    <Wrapper className={css.Stats} id="learn-more">
      <div className={css.content}>
        <StatsItem
          number="850K+"
          header="Downloads"
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam laudantium provident porro voluptate, suscipit excepturi voluptatum hic eveniet quam amet tempore, facilis dolores veniam voluptates exercitationem ratione. Quas, sit sunt."
        />

        <StatsItem
          number="700K+"
          header="Active users"
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam laudantium provident porro voluptate, suscipit excepturi voluptatum hic eveniet quam amet tempore, facilis dolores veniam voluptates exercitationem ratione. Quas, sit sunt."
        />

        <StatsItem
          number="24"
          header="Hours Support"
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam laudantium provident porro voluptate, suscipit excepturi voluptatum hic eveniet quam amet tempore, facilis dolores veniam voluptates exercitationem ratione. Quas, sit sunt."
        />
      </div>
    </Wrapper>
  )
}

export default Stats
