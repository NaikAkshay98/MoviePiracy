import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/MovieDetail.css'; 

const MovieDetail = ({ movie }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch('/db.JSON'); 
      const data = await response.json();
      
      const details = [...data.movies, ...data.tvShows].find(movie => movie.id === parseInt(id));
      setMovieDetails(details);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>; 
  }


  return (
    <div className="movie-detail-container">
  <div className="movie-info-container">
    <h1 className="movie-title">{movieDetails.title}</h1>
    <p className="movie-synopsis">{movieDetails.synopsis}</p>
    <div className="movie-pricing">
      <button className="rent-button">Rent ${movieDetails.rentPrice}</button>
      <button className="buy-button">Buy ${movieDetails.buyPrice}</button>
    </div>
  </div>
  
</div>

  );
};

export default MovieDetail;
