import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const imageFolderPath = import.meta.env.BASE_URL + "images/";

const API_KEY = "?&api_key=337d4aa999639b97c6ca769ff17079b1";
const BASE_URL = "https://api.themoviedb.org/3/movie/";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";


const MoviePage = () => {
  const { id } = useParams();
  const movieUrl = BASE_URL + id + API_KEY;
  const creditsUrl = BASE_URL + id + "/credits" + API_KEY;
  const [addToList, setAddToList] = useState(false); // Button state for adding to my list
  const [movieData, setMovieData] = useState(null); // State to store movie data
  const [credits, setCredits] = useState(null);


  // Fetch movie and creidt data 
  useEffect(() => {
    Promise.all([
      fetch(movieUrl),
      fetch(creditsUrl)
    ])
    .then(([resMovie, resCredit]) =>
      Promise.all([resMovie.json(), resCredit.json()])
    )
    .then(([movieData, creditData]) => {
      setMovieData(movieData);
      setCredits(creditData);
      });
  }, []);

  // Get myList from local storage when movieData changes
  useEffect(() => {
    if (!movieData ) return; 

    const myList = JSON.parse(localStorage.getItem('myList')) || [];
    const isMovieInList = myList.some(item => item.id === movieData.id);
    setAddToList(isMovieInList);
  }, [movieData]);

  // Function to handle adding/removing movie from the list
  function clickAddToList() {
    const myList = JSON.parse(localStorage.getItem('myList')) || [];
    const isMovieInList = myList.some(item => item.id === movieData.id);

    if (!isMovieInList) {
      myList.push(movieData);
      localStorage.setItem('myList', JSON.stringify(myList));
      setAddToList(true); // Update the addToList state
    } else {
      const updatedList = myList.filter(item => item.id !== movieData.id);
      localStorage.setItem('myList', JSON.stringify(updatedList));
      setAddToList(false); // Update the addToList state
    }
  }

  // Display loading message while movieData is null
  if (movieData === null) {
    return <div>Loading...</div>;
  }

  return (
    
    <main class="contents-wrapper">
      <div class="movie-banner-container">
        <div class="image-wrapper">
            {movieData.backdrop_path && (
            <img  src={IMG_BASE_URL + movieData.backdrop_path} 
                    alt={movieData.title}
                    class="movie-back-image" /> )}
        </div>
        <div class="title-container">
          <div class="left-title-side">
          <button 
              className={`card-check-btn ${ addToList ? 'is-added' : ''}`}
              onClick= { clickAddToList }>
              { (addToList ) ? <i className="fa-solid fa-check"></i>  : <i className="fa-solid fa-plus"></i> } 
            </button>

          </div>
          <div class="right-title-side">
          <h2 class="movie-title">{movieData.title}</h2>
            <p>{movieData.release_date} | Rated : {movieData.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>
      {/* Banner Image Ends  */}
      <div class="main-info-container">      
        <div class="info-left">   
          <div class="casts">
            <h3>Casts</h3> 
            <p>{credits.cast && credits.cast
              .slice(0, 5)
              .map((actor) => actor.name)
              .join(", ")}
              </p>
          </div>
          <div class="genre-container">
          {movieData.genres &&
            movieData.genres.map((genre, i) => (
            <span key={i} class='genre'>
                {genre.name}
            </span>
            ))} 
          </div>
            <div class="summary">
                <h3>Overview</h3>
                <p>{movieData.overview}</p>
            </div>
        </div>
        <div class='info-right'>
            {movieData.poster_path ? (
            <img src={IMG_BASE_URL + movieData.poster_path} 
                  alt={movieData.title}
                  class="movie-poster" /> ):
            (<img src={`${imageFolderPath}image-place-holder.jpg`}
                class="detail-place-holder"
                alt="Image Place Holder"/>
            )}
        </div>
      </div>
      {/*--Movie Main-Info Container Ends--*/}
    </main>
  )
}

export default MoviePage; 