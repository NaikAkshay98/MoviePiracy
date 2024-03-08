import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/ListingPage.css'; 


const ListingPage = () => {
  const [allContent, setAllContent] = useState([]);
  const [content, setContent] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/db.JSON'); 
      const data = await response.json();
      const combinedContent = [...data.movies, ...data.tvShows.map(show => ({ ...show, isTvShow: true }))]; 
      setAllContent(combinedContent);
      setContent(combinedContent);
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
