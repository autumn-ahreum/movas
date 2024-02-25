import { useState, useEffect } from 'react';
// import Swiper from '../components/sections/PopularSection ';
import PopularSection from '../components/sections/PopularSection ';
import UpcomingSection from '../components/sections/UpcomingSection';
import NowplayingSection from '../components/sections/NowplayingSection';
import TopratedSection from  '../components/sections/TopratedSection';
import FrontBanner from '../components/sections/FrontBanner';


const HomePage = () => {
  return (
    <main class="main-container">
      <div class="banner-section">
        <FrontBanner />
      </div>

      <div class="card-sections-wrapper">
        <PopularSection/>
        <TopratedSection/>
        <NowplayingSection/>
        <UpcomingSection/>
      </div>
    </main>
  )
}

export default HomePage;