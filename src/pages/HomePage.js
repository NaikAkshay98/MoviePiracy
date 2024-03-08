import React from 'react';
import FeaturedMovies from '../components/FeaturedMovies.js';
import HeroSection from '../components/HeroSection.js';
import FeaturedTVShows from '../components/FeaturedTVShows.js';
import Content from '../components/Content.js';






const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection/>
      <FeaturedMovies/>
      <FeaturedTVShows/>
      <Content/>
      
    </div>
  );
}

export default HomePage;
