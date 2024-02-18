import React from 'react'

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/"

const Card = ({ title, poster_path, vote_average, overview, release_date }) => {
  return (
    <div class= "card-container" >
        <img src= { IMG_BASE_URL + poster_path }/>
        <h5>{ title }</h5>
        <div class="movie-info">
            <h5>{ title }</h5>
            <div class='card-second-row'>
                <p>{ release_date }</p> 
                <p><i class="fa-solid fa-star"></i>
                   { vote_average.toFixed(1) }</p>
            </div>
            <p class="card-summury">{ overview }</p>
            <div class='card-last-row'>
                <button class="card-check-btn"><i class="fa-solid fa-plus"></i></button>

                <button class="card-more-info-btn">More Info</button>
            </div>
        </div>
    </div>
  )
}

export default Card;