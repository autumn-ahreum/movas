import React from 'react'
import { dummy } from '../../cardDummy';
import Card from '../elements/Card';

// Related to swiper only below
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={2}
      slidesPerView={2}
      navigation
      scrollbar={{ draggable: true }}

      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {/* <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide> */}
      
      <div class= "cards-section popular" >
      {
        dummy.results.map((item) => {
          return (
          <SwiperSlide key={item.id}>
            <Card 
              title = {item.title}
              poster_path = {item.poster_path}
              vote_average = {item.vote_average}
              overview = {item.overview}
              release_date = {item.release_date}
            />
          </SwiperSlide>
          )
        })
      }
    </div>
    </Swiper>
  );
};

