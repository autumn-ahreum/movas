import React from 'react'

const AboutPage = () => {
  return (
    <main class="about-page-wrapper">
      <h1>About</h1>
      <div class="title">
        <h2>Welcome!</h2>
        <h2>Explore the best source of movie</h2>
      </div>
      <div class="contents-wrapper">
        <div class="first-row">
          <div class="left-side">
            <img class="logo-img" src="../../public/image/movas-logo-img1.jpg" alt="Movas Logo" />
          </div>
          <div class="right-side">
            <p>Movas is a website to provide users to search any movies and view details of movies such as summaries and main casts. Movas utilizes the movie database, which is a powerful community-built movie database.</p>
            <p>On the main page, you can view the top movies for each category: Popular, Trending, Upcoming, and Top Rated. You can read more details on each movie by hovering on any movie and clicking a “MORE INFO” button, which will take you to an individual movie detail page. On the detail page, you will find main cast and director information, ratings, and a summary of the movie. </p>
          </div>
        </div>
        <div class="second-row">
          <img class="tmdb-logo" src="../../public/image/tmdb_logo.svg" alt="TMDB Logo" />
          <p>* This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
        </div>

      </div>
      
    </main>    
  )
}

export default AboutPage;