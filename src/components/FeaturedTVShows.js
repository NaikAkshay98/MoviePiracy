import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import '../css/FeaturedMoviesTVShows.css'; 

const FeaturedTVShows = ({ }) => {
  const [tvShows, setTvshows] = useState([]);

  useEffect(() => {
    
    const fetchTvShows = async () => {
      const response = await fetch('/db.JSON');
      const data = await response.json();
      setTvshows(data.tvShows); 
    };

    fetchTvShows();
  }, []);

  return (
    <section className="featured-movies">
      <div className="featured-header">
        <h2>Featured TV Shows</h2>
        <Link to="/movies" className="view-all">View All</Link>
      </div>
      <div className="movie-container">
        {tvShows.map((tvShow) => (
          <div key={tvShow.id} className="movie-card">
            <img src={tvShow.poster} alt={tvShow.title} />
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedTVShows;
