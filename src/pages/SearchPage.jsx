import React, { useState, useEffect } from 'react';
import Card from '../components/elements/Card';

const API_key = "&api_key=337d4aa999639b97c6ca769ff17079b1";
const BASE_URL = "https://api.themoviedb.org/3/search/movie?query=";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const dataFromLocalStorage = JSON.parse( localStorage.getItem('myList')) || [];
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPages] = useState(1);

const createMovieObject = (movie) => {
  const movieFromLocalStorage = dataFromLocalStorage.find(item => item.id === movie.id);

  return {
      poster_path: movie.poster_path,
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      vote_average: movie.vote_average, 
      overview: movie.overview,
      addToList: movieFromLocalStorage ? true : movie.addToList,
  }
}
  const loadMore = async () => {
    setPages((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (search.length > 2) { 
      const fetchData = async () => {
        try {
          const response = await fetch(BASE_URL + search + API_key + `&page=` + page);
          const data = await response.json();
          setTotalPages(data.total_pages);
          setResults(prevResults => 
            page === 1 ? data.results.map(movie => createMovieObject(movie)) : [
              ...prevResults, 
              ...data.results.map(movie => createMovieObject(movie))
            ]
          );
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    } else {
      setResults([]);
    }
  }, [search, page]);

  const searchMovie = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
    }
  };

  return (
    <main class="mylist-contents-wrapper search-wrapper">
      <h1>Search</h1>
      <form class="search-bar"> 
        <input
          type="text"
          placeholder="Type a movie name..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyDown={searchMovie}
          class="search-text"
        ></input>
      </form>
      <div class="mylist-gallery">
      {results && (
          results.map((movie) => (
            <Card 
            key = {movie.id}
            id = {movie.id}
            title = {movie.title}
            poster_path = {movie.poster_path}
            vote_average = {movie.vote_average}
            overview = {movie.overview}
            release_date = {movie.release_date}
            addedToList = {movie.addToList}
             />
          ))
        ) }
      </div>
      {results.length > 0 && totalPages > 1 && totalPages > page && (
        <button
          onClick={loadMore}
          class="btn-load-more"        
        >
          Load More
        </button>
      )}
    </main>
  );
};

export default SearchPage;
