import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom';

const imageFolderPath = import.meta.env.BASE_URL + "images/";


const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/"

const Card = ({ id, title, poster_path, vote_average, overview, release_date, addedToList, removeFromList}) => {

  const [ posterClass, setPosterClass ] = useState( 'card-poster' ); // class name for poster img
  const [ addToList, setAddToList ] = useState( false ); // add my list button
  const [ check, setCheck ] = useState( false ); // add my list button

  useEffect(() => {
    if (addedToList == true) {
      setAddToList(true);
    }
  }, []);

  
  function clickAddToList() {

    if (addToList == false ) {
      setAddToList(!addToList);

      const cardData = { id, title, poster_path, vote_average, overview, release_date, addToList: !addToList };
      const myList = JSON.parse( localStorage.getItem('myList') ) || [];
  
      // Check if cardData.id does not exist in myList local storage
      if ( !myList.some( item => item.id === cardData.id ) ) {
        myList.push(cardData);
        localStorage.setItem('myList', JSON.stringify(myList));
      } 
    } else {
      setAddToList(!addToList);
      // directly remove id from local storage
      const myList = JSON.parse( localStorage.getItem('myList') ) || []
      const updatedList = myList.filter(item => item.id !==  id);
      localStorage.setItem('myList', JSON.stringify(updatedList));

      removeFromList(id); // for favolite page 
    }
  }

  const truncatedTitle = title.length > 25 ? title.slice(0, 25) + '...' : title;

  return (
    <div class= "card-container" >
        <img 
            src={IMG_BASE_URL + poster_path}
            alt={ title + ' Poster'}
            class = {posterClass}
            onError={(e) => {
              e.target.onerror = null; // prevent infinite loop
              e.target.src = `${imageFolderPath}image-place-holder.jpg`; 
              e.target.alt = 'Generic Image Place Holder';
              setPosterClass('place-holder'); // Update the poster class state 
            }}
          />
        <h5>{ truncatedTitle }</h5>
        <div class="movie-info">
        <h5>{ truncatedTitle }</h5>
        <div class='card-second-row'>
                <p>{ release_date }</p> 
                <p><i class="fa-solid fa-star"></i>
                   { vote_average ? vote_average.toFixed(1) : '...'}</p>
            </div>
            <p class="card-summary">{ overview }</p>
            <div class='card-last-row' >
                <button 
                className={`card-check-btn ${ addToList ? 'is-added' : ''}`}
                  onClick= { clickAddToList }>
                  { (addToList ) ? <i className="fa-solid fa-check"></i>  : <i className="fa-solid fa-plus"></i> } </button>
                  <Link to={ `/movie/${id}` }>
                    <button class="card-more-info-btn"> More Info</button>
                  </Link>
            </div>
            
        </div>
    </div>
  )
}
export default Card;