import React , { useState, useEffect }from 'react'
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

// API  
// URL = base_url + actual_url + API_key
let API_key = "&api_key=337d4aa999639b97c6ca769ff17079b1";
const base_url = "https://api.themoviedb.org/3";
let url = base_url + "/movie/top_rated?language=en-US&page=1" + API_key;



export default () => {
  const [ movieData, setMovieData ] = useState([]);
  const [url_set, setUrl] = useState(url);

  const [slidesPerView, setSlidesPerView] = useState(2);

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

    const handleResize = () => {
      if (window.innerWidth > 1853) {
        setSlidesPerView(8.9); 
      } else if (window.innerWidth > 1530) {
        setSlidesPerView(8.2); 
      } else if (window.innerWidth > 1400) {
        setSlidesPerView(7.1); 
      } else if (window.innerWidth > 1200) {
        setSlidesPerView(6.5); 
      } else if (window.innerWidth > 940) {
        setSlidesPerView(6.1); 
      } else if (window.innerWidth > 840) {
        setSlidesPerView(5.5); 
      } else if (window.innerWidth > 780) {
        setSlidesPerView(4.8); 
      } else if (window.innerWidth > 670) {
        setSlidesPerView(4.3); 
      } else if (window.innerWidth > 580) {
        setSlidesPerView(3.8); 
      } else if (window.innerWidth > 500) {
        setSlidesPerView(3.2); 
      } else if (window.innerWidth > 400) {
        setSlidesPerView(2.6); 
      } else if ( window.innerWidth > 320){
        setSlidesPerView(2); 
      } else {
        setSlidesPerView(1.8);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <div class = "cards-section toprated" >
      <div class="cards-section-header"> 
        <h2>Top Rated</h2> 
        {/* <a href="">See more &gt; </a> */} 
        {/* Backlog for ver2 */}
      </div>

    <Swiper
      modules = {[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween = {2}
      slidesPerView = {slidesPerView}
      navigation
      scrollbar = {{ draggable: true }}
      // onSlideChange = {() => console.log('slide change')}
      // onSwiper = {(swiper) => console.log(swiper)}
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

