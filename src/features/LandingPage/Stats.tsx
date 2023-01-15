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
    <div className={css.Stats}>
      <Wrapper>
        <div className={css.content}>
          <StatsItem
            number="850K+"
            header="Downloads"
            paragraph="Hello world"
          />
          <StatsItem
            number="700K+"
            header="Active users"
            paragraph="Hello world"
          />
          <StatsItem
            number="24"
            header="Hours Support"
            paragraph="Hello world asdf asdf asd fHello world asdf asdf asd fHello world asdf asdf asd fHello world asdf asdf asd fHello world asdf asdf asd fHello world asdf asdf asd fHello world asdf asdf asd f"
          />
        </div>
      </Wrapper>
    </div>
  )
}

export default Stats
