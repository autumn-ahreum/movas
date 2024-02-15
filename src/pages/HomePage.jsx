import { useState, useEffect } from 'react'


const HomePage = () => {

    const [movies, setMovie] = useState([])

    useEffect ( () => {
        // fetch date from the movie api
        // const result = fetch
        // setMovie( [...result] )
    }, [] )

  return (
    <div>HomePage</div>
  )
}

export default HomePage;