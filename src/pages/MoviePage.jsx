import React, { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
let API_key = "?&api_key=337d4aa999639b97c6ca769ff17079b1";
let base_url = "https://api.themoviedb.org/3/movie/";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";
let backgroundImage_path = '';


const MoviePage = () => {
  const { id } = useParams();

  // Call API data 
  let url = base_url + id + API_key;
  let videoUrl = base_url + id + "/videos" + API_key;
  let creditsUrl = base_url + id + "/credits" + API_key;

  const [ movieData, setMovieData ] = useState();
  const [video, setVideo] = useState();
  const [credits, setCredits] = useState();
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect( () => {
    fetch( url ) 
      .then(response => response.json())
      .then(apiData => {
        setMovieData(apiData);
      });

    fetch( creditsUrl )
    .then(response => response.json())
    .then(apiData => {
      setCredits(apiData);
    });

    fetch( videoUrl ) 
    .then(response => response.json())
    .then(apiData => {
      const trailer = apiData.results.find((video) => video.type === "Trailer");
      console.log(trailer);
      if (trailer) {
        setVideo(trailer.key);
      }
    }); 
  }, [id])
  // console.log(movieData.backdrop_path);

  // backgroundImage_path = IMG_BASE_URL + movieData.backdrop_path;
  // setBackgroundImage(backgroundImage_path); 
  console.log(video);

  console.log(movieData);
  console.log(credits);


  return (
    <>
      <div>MoviePage {id}</div>
      <main>
        <div>
        {/* <div class="movie-main-section"  style= {{backgroundImage: url(`${backgroundImage}`)}}> */}
          <img src=''></img>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, modi? Repudiandae natus sint ratione provident consequatur doloribus, minima eaque eos. Asperiores aperiam facere deleniti dolorum sint dolore repellendus alias dolores.</p>


        </div>
      </main>
    </>
  )
}

export default MoviePage; 