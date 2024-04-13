import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/MovieDetail.css';

const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        let response = await axios.get(`https://moviepiracy-3b45209c39bf.herokuapp.com/api/movies/${id}`);
        if (response.data) {
          response.data.title = capitalizeTitle(response.data.title);
          setMovieDetails(response.data);
          return;
        }
      } catch (error) {
        console.log('Fetching movie details failed, trying TV shows...');
        try {
          let response = await axios.get(`https://moviepiracy-3b45209c39bf.herokuapp.com/api/tvshows/${id}`);
          if (response.data) {
            response.data.title = capitalizeTitle(response.data.title);
            setMovieDetails(response.data);
          }
        } catch (tvError) {
          console.error('Fetching TV show details failed:', tvError);
        }
      }
    };

    fetchMovieDetails();
  }, [id]);

  const capitalizeTitle = (title) => {
    return title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-detail-container" style={{ backgroundImage: `url(${movieDetails.poster})` }}>
      <div className="movie-info-container">
        <h1 className="movie-title">{movieDetails.title}</h1>
        <p className="movie-synopsis">{movieDetails.synopsis}</p>
        <div className="movie-pricing">
          <button className="rent-button">Rent ${movieDetails.rentPrice}</button>
          <button className="buy-button">Buy ${movieDetails.purchasePrice}</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
