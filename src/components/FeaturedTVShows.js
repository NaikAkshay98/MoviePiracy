import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import '../css/FeaturedMoviesTVShows.css'; 

const FeaturedTVShows = () => {
  const [featuredtvshows, setFeaturedTVShows] = useState([]); 

  useEffect(() => {
    const fetchFeaturedTVShows = async () => {
      try {
        // Use axios to fetch data from your API endpoint
        const response = await axios.get('https://moviepiracy-3b45209c39bf.herokuapp.com/api/tvshows/featured');
        setFeaturedTVShows(response.data); 
      } catch (error) {
        console.error('Error fetching featured TV shows:', error);
        
      }
    };

    fetchFeaturedTVShows();
  }, []);

  

  return (
    <section className="featured-movies">
      <div className="featured-header">
        <h2>Featured TV Shows</h2>
        <Link to="/movies" className="view-all">View All</Link>
      </div>
      <div className="movie-container">
      {featuredtvshows.map((tvShow) => (
          <Link key={tvShow.id} to={`/${tvShow.title}/${tvShow.id}`}>
            <div className="movie-card">
              <img src={tvShow.poster} alt={tvShow.title} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );



};

export default FeaturedTVShows;
