import React from 'react'
import { dummy } from '../../cardDummy';
import Card from '../elements/Card';


const PopularSection = ( ) => {
  
  return (
    <div class= "cards-section popular" >
      {
        dummy.results.map((item) => {
          return (
            <Card 
              title = {item.title}
              poster_path = {item.poster_path}
              vote_average = {item.vote_average}
              overview = {item.overview}
              release_date = {item.release_date}
            />
          )
        })
      }
    </div>
  )
}

export default PopularSection;