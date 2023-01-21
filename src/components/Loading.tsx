import css from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={css.Loading} {...{ theme: 'dark' }}>
      <div className={css.loaderContainer}>
        <div className={css.loader}>Loading...</div>
      </div>
    </div>
  )
}

export default Loading
