import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import '../css/FeaturedMoviesTVShows.css'; 

const FeaturedMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    
    const fetchMovies = async () => {
      const response = await fetch('/db.JSON');
      const data = await response.json();
      setMovies(data.movies); 
    };

    fetchMovies();
  }, []);

  return (
    <section className="featured-movies">
      <div className="featured-header">
        <h2>Featured Films</h2>
        <Link to="/movies" className="view-all">View All</Link>
      </div>
      
      <div className="movie-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.poster} alt={movie.title} />
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMovies;
