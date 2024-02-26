import React, { useState, useEffect } from 'react';
import Card from '../components/elements/Card';

const MyListPage = () => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('myList')) || [];
    setMyList( storedList );
  }, []);

  function removeFromList(id) {
    const updatedList = myList.filter(item => item.id !== id);
    setMyList(updatedList);
    localStorage.setItem('myList', JSON.stringify(updatedList));
  }

  return (
    <main class="mylist-contents-wrapper">
      <h1>My List</h1>
      {
      ( myList.length === 0) ? (
        <div class="massage">
          <p >Sorry! You have no favourited movies. </p>
          <p >Return to the home page to add a favourite movie.</p>
        </div>
      )  : 
      <div class="mylist-gallery">
        { myList.map ( item => (
        <Card
          key = {item.id}
          id = {item.id}
          title = {item.title}
          poster_path = {item.poster_path}
          vote_average = {item.vote_average}
          overview = {item.overview}
          release_date = {item.release_date}
          addedToList = {true} 
          removeFromList = {removeFromList}
        />
      ))   
      }
      </div>
      }
    </main>
  );
};

export default MyListPage;
