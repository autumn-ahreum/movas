import React , { useState, useEffect }from 'react'
import { dummy } from '../../cardDummy';
import Card from '../elements/Card';


// API  
// URL = base_url + actual_url + API_key
let API_key = "&api_key=337d4aa999639b97c6ca769ff17079b1";
const base_url = "https://api.themoviedb.org/3";
let url = base_url + "/movie/popular?language=en-US&page=1" + API_key;

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
  const [ movieData, setMovieData ] = useState([]);
  const [url_set, setUrl] = useState(url);

  useEffect ( ()=> {
    const dataFromLocalStorage = JSON.parse( localStorage.getItem('myList')) || [];

    fetch(url_set)
      .then(response => response.json())
      .then(apiData => {
        // Check if it has an Id that already added to list, adding state (addToList = true)
          const updatedData = apiData.results.map( item => {
            if(dataFromLocalStorage.some( itemFromLocalStorage => itemFromLocalStorage.id === item.id)) {
              return {...item, addToList : true };
            }
            return item
          })
      setMovieData(updatedData);
    }, [url_set])

    
  })

  return (
    <>
    <div class = "cards-section popular" >
    <h2>Popular</h2>
    <Swiper
      modules = {[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween = {2}
      slidesPerView = {2}
      navigation
      scrollbar = {{ draggable: true }}
      onSlideChange = {() => console.log('slide change')}
      onSwiper = {(swiper) => console.log(swiper)}
    >
      {
        (movieData.length === 0)? (
          <SwiperSlide>
            <p>Not Found : movie data fetch error</p>
          </SwiperSlide>
        )  : 
        movieData.map(item  => (

          <SwiperSlide key={item.id}>
            <Card 
              id = {item.id}
              title = {item.title}
              poster_path = {item.poster_path}
              vote_average = {item.vote_average}
              overview = {item.overview}
              release_date = {item.release_date}
              addedToList = {item.addToList}
            />
          </SwiperSlide>
        ))
      }    
    </Swiper>
    </div>
    </>
  );
};

