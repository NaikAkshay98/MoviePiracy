import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios

import '../css/ListingPage.css'; 

const ListingPage = () => {
  const [allContent, setAllContent] = useState([]);
  const [content, setContent] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await axios.get('https://moviepiracy-3b45209c39bf.herokuapp.com/api/movies');
        const moviesData = moviesResponse.data; // Assuming this endpoint returns an array

        const tvShowsResponse = await axios.get('https://moviepiracy-3b45209c39bf.herokuapp.com/api/tvshows');
        const tvShowsData = tvShowsResponse.data.map(show => ({ ...show, isTvShow: true })); // Mark each TV show with a flag

        const combinedContent = [...moviesData, ...tvShowsData]; 
        setAllContent(combinedContent);
        setContent(combinedContent);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error here, such as displaying a message
      }
    };

    fetchData();
  }, []);

  const filterContent = (type) => {
    if (type === 'all') {
      setContent(allContent);
    } else if (type === 'movies') {
      setContent(allContent.filter(item => !item.isTvShow));
    } else if (type === 'tvShows') {
      setContent(allContent.filter(item => item.isTvShow));
    }
    setFilter(type);
  };

  return (
    <div>
      
      <div className="filter-buttons">
      <h1 className="header-title">Movies & TV Shows</h1>
        <button onClick={() => filterContent('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => filterContent('movies')} className={filter === 'movies' ? 'active' : ''}>Movies</button>
        <button onClick={() => filterContent('tvShows')} className={filter === 'tvShows' ? 'active' : ''}>TV Shows</button>
      </div>
      <div className="grid-container">
        {content.map(item => (
          <div key={item.id} className="grid-item">
            <Link to={`/${item.title.replace(/\s/g, '-').toLowerCase()}/${item.id}`}>
              <img src={item.poster} alt={item.title} />
              
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
