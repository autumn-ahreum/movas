import React, { useState , useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { addToList } from '../../redux/store';

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/"

const Card = ({ id, title, poster_path, vote_average, overview, release_date, addedToList, removeFromList }) => {

  const [ posterClass, setPosterClass ] = useState( 'card-poster' ); // class name for poster img
  const [ addToList, setAddToList ] = useState( false ); // add my list button
  const [ check, setCheck ] = useState( false ); // add my list button


  // Redux 
  // let myList = useSelector( (state) => state.myList )
  // let dispatch = useDispatch()

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
  
      // Check if cardData.id does not exist in myList
      if ( !myList.some( item => item.id === cardData.id ) ) {
        myList.push(cardData);
        localStorage.setItem('myList', JSON.stringify(myList));
      } 
    } else {
        setAddToList(!addToList);
        removeFromList(id);
    }
  }



 
  return (
    <div class= "card-container" >
        <img 
            src={IMG_BASE_URL + poster_path}
            alt={ title + ' Poster'}
            class = {posterClass}
            onError={(e) => {
              e.target.onerror = null; // prevent infinite loop
              e.target.src = '../../../public/image/image-place-holder.jpg'; 
              e.target.alt = 'Generic Image Place Holder';
              setPosterClass('place-holder'); // Update the poster class state 
            }}
          />
        <h5>{ title }</h5>
        <div class="movie-info">
            <h5>{ title }</h5>
            <div class='card-second-row'>
                <p>{ release_date }</p> 
                <p><i class="fa-solid fa-star"></i>
                   { vote_average.toFixed(1) }</p>
            </div>
            <p class="card-summury">{ overview }</p>
            <div class='card-last-row' >
                <button 
                  class="card-check-btn"
                  onClick= { clickAddToList }            
                >{ (addToList ) ? <i className="fa-solid fa-check"></i>  : <i className="fa-solid fa-plus"></i> } </button>
                <button 
                  class="card-more-info-btn"
                >
                  More Info</button>
            </div>
        </div>
    </div>
  )
}

export default Card;