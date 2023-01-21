import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Keyboard } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import css from './ReviewsSlide.module.scss'

const ReviewsSlide = () => {
  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay, Keyboard]}
        pagination={{ clickable: true }}
        className={css.ReviewsSlide}
        spaceBetween={30}
        loop
      >
        <SwiperSlide className={css.slide}>Slide 1</SwiperSlide>
        <SwiperSlide className={css.slide}>Slide 2</SwiperSlide>
        <SwiperSlide className={css.slide}>Slide 3</SwiperSlide>
        <SwiperSlide className={css.slide}>Slide 4</SwiperSlide>
        <SwiperSlide className={css.slide}>Slide 5</SwiperSlide>
        <SwiperSlide className={css.slide}>Slide 6</SwiperSlide>
        <SwiperSlide className={css.slide}>Slide 7</SwiperSlide>
        <SwiperSlide className={css.slide}>Slide 8</SwiperSlide>
        <SwiperSlide className={css.slide}>Slide 9</SwiperSlide>
      </Swiper>
    </>
  )
}

export default ReviewsSlide
