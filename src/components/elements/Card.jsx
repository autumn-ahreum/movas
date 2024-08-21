import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";
const PLACEHOLDER_IMAGE = "images/image-place-holder.jpg"; // Ensure this path is correct

const Card = ({ id, title, poster_path, vote_average, overview, release_date, addedToList, removeFromList }) => {
  const [posterClass, setPosterClass] = useState('card-poster');
  const [isAddedToList, setIsAddedToList] = useState(addedToList);

  useEffect(() => {
    setIsAddedToList(addedToList);
  }, [addedToList]);

  const handleAddToList = () => {
    setIsAddedToList(prevState => !prevState);

    const cardData = { id, title, poster_path, vote_average, overview, release_date, addToList: !isAddedToList };
    const myList = JSON.parse(localStorage.getItem('myList')) || [];

    if (!myList.some(item => item.id === cardData.id)) {
      myList.push(cardData);
      localStorage.setItem('myList', JSON.stringify(myList));
    } else {
      const updatedList = myList.filter(item => item.id !== id);
      localStorage.setItem('myList', JSON.stringify(updatedList));
      removeFromList(id);
    }
  };

  const truncatedTitle = title.length > 25 ? title.slice(0, 25) + '...' : title;

  return (
    <div className="card-container">
      <img
        src={poster_path ? IMG_BASE_URL + poster_path : PLACEHOLDER_IMAGE}
        alt={title + ' Poster'}
        className={posterClass}
        onError={(e) => {
          e.target.onerror = null; // prevent infinite loop
          e.target.src = PLACEHOLDER_IMAGE;
          e.target.alt = 'Generic Image Placeholder';
          setPosterClass('place-holder');
        }}
      />
      <h5>{truncatedTitle}</h5>
      <div className="movie-info">
        <div className='card-second-row'>
          <p>{release_date}</p>
          <p><i className="fa-solid fa-star"></i>
            {vote_average ? vote_average.toFixed(1) : '...'}</p>
        </div>
        <p className="card-summary">{overview}</p>
        <div className='card-last-row'>
          <button
            className={`card-check-btn ${isAddedToList ? 'is-added' : ''}`}
            onClick={handleAddToList}
          >
            {isAddedToList ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-plus"></i>}
          </button>
          <Link to={`/movie/${id}`}>
            <button className="card-more-info-btn">More Info</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
