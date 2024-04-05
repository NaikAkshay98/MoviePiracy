import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/FeaturedMoviesTVShows.css'; 

const FeaturedMovies = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]); // Ensure camelCase naming convention for consistency

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await fetch('http://localhost:6070/api/movies/featured');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFeaturedMovies(data); // Adjust according to the actual structure of your response
      } catch (error) {
        console.error('Error fetching featured movies:', error);
        // Handle errors, such as showing a message to the user
      }
    };

    fetchFeaturedMovies();
  }, []);

  return (
    <section className="featured-movies">
      <div className="featured-header">
        <h2>Featured TV Shows</h2>
        <Link to="/movies" className="view-all">View All</Link>
      </div>
      <div className="movie-container">
        {featuredMovies.map((tvShow) => (
          <div key={tvShow.id} className="movie-card">
            <img src={tvShow.poster} alt={tvShow.title} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMovies;
