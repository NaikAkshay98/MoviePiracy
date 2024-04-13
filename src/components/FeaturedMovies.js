import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/FeaturedMoviesTVShows.css'; 


const FeaturedMovies = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]); 

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await fetch('https://moviepiracy-3b45209c39bf.herokuapp.com/api/movies/featured');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFeaturedMovies(data); 
      } catch (error) {
        console.error('Error fetching featured movies:', error);
        
      }
    };

    fetchFeaturedMovies();
  }, []);

  return (
    <section className="featured-movies">
      <div className="featured-header">
        <h2>Featured Movies</h2>
        <Link to="/movies" className="view-all">View All</Link>
      </div>
      <div className="movie-container">
        {featuredMovies.map((movie) => (
          <Link key={movie.id} to={`/${movie.title}/${movie.id}`}>
            <div className="movie-card">
              <img src={movie.poster} alt={movie.title} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMovies;
