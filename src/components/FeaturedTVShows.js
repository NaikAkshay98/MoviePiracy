import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to install and import axios
import { Link } from 'react-router-dom';
import '../css/FeaturedMoviesTVShows.css'; 

const FeaturedTVShows = () => {
  const [featuredtvshows, setFeaturedTVShows] = useState([]); // Changed to camelCase for consistency

  useEffect(() => {
    const fetchFeaturedTVShows = async () => {
      try {
        // Use axios to fetch data from your API endpoint
        const response = await axios.get('http://localhost:6070/api/tvshows/featured');
        setFeaturedTVShows(response.data); // Assuming the API returns the data array directly
      } catch (error) {
        console.error('Error fetching featured TV shows:', error);
        // Handle error here, e.g., update state to show an error message to the user
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
