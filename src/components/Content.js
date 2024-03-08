
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../css/Content.css'; 

const CinemaSpotlight = ({ CinemaSpotlights }) => {
  const navigate = useNavigate(); 

  const goToMovies = () => {
    navigate('/movies'); 
  };


  return (
    <div class="advertisement-banner">
      <div class="banner-text">
          <h1>Discover Hollywood's Finest</h1>
          <p>Explore a world of movies and exclusive behind-the-scenes content right here.</p>
          <button className="explore-button" onClick={goToMovies}>Explore Now</button>
      </div>
      
    </div>
  );
};


export default CinemaSpotlight;
