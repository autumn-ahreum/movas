import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/elements/Card';
import debounce from 'lodash.debounce';

const API_key = "&api_key=337d4aa999639b97c6ca769ff17079b1";
const BASE_URL = "https://api.themoviedb.org/3/search/movie?query=";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const dataFromLocalStorage = JSON.parse(localStorage.getItem('myList')) || [];

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
    };
  };

  const loadMore = async () => {
    setPages(prevPage => prevPage + 1);
  };

  const fetchData = async () => {
    if (search.length > 2) {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  // Debounced fetchData function
  const debouncedFetchData = useCallback(debounce(fetchData, 500), [search, page]);

  useEffect(() => {
    debouncedFetchData();
  }, [search, page, debouncedFetchData]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <main className="mylist-contents-wrapper search-wrapper">
      <h1>Search</h1>
      <form className="search-bar">
        <input
          type="text"
          placeholder="Type a movie name..."
          onChange={handleSearchChange}
          value={search}
          className="search-text"
        />
      </form>
      {loading && <p>Loading...</p>}
      <div className="mylist-gallery">
        {results.map(movie => (
          <Card 
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
            overview={movie.overview}
            release_date={movie.release_date}
            addedToList={movie.addToList}
          />
        ))}
      </div>
      {results.length > 0 && totalPages > 1 && totalPages > page && (
        <button
          onClick={loadMore}
          className="btn-load-more"
        >
          Load More
        </button>
      )}
    </main>
  );
};

export default SearchPage;
