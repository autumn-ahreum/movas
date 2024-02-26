import React, { useState , useEffect } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



let API_key = "&api_key=337d4aa999639b97c6ca769ff17079b1";
const base_url = "https://api.themoviedb.org/3";
let url = base_url + "/movie/popular?language=en-US&page=1" + API_key;


const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/"

export default() => {
  const [ movieData, setMovieData ] = useState([]);
  const [url_set, setUrl] = useState(url);


  useEffect( () => {
    fetch(url)
      .then(response => response.json())
      .then(apiData => {
        setMovieData(apiData.results);
      });
  }, [url_set] );

  return (
    <>
      <Swiper
      modules = {[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween = {10}
      slidesPerView = {1}
      navigation
      pagination={{ clickable: true }}   
      // onSlideChange = {() => console.log('slide change')}
      // onSwiper = {(swiper) => console.log(swiper)}
      >
      {
        (movieData.length === 0) ? (
            <p>Not Found : movie data fetch error</p>
        ): 
          movieData.slice(0, 5).map(item => (
            <SwiperSlide key={item.id} >
              <div class="front-slide-contaniner">
                <h3>{item.title}</h3>
                <div class="img-container">
                  <img src={IMG_BASE_URL + item.backdrop_path} alt={item.title} />
                </div>
              </div>
            </SwiperSlide>
          ))
      }
    </Swiper>
    
    </>

    
    
  )
}