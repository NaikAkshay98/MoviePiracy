import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SearchResultsPopup.css'; 

const SearchResultsPopup = ({ searchResults, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="search-results-popup">
      <div className="search-results-backdrop" onClick={onClose} />
      <div className="search-results-content">
        <button className="search-results-close-btn" onClick={onClose}>X</button>
        <h2>Search Results</h2>
        {searchResults.length > 0 ? (
          <div className="search-results-grid">
            {searchResults.map((result) => (
              <div 
                key={result.id} 
                className="search-result-item"
                onClick={() => {
                  onClose(); 
                  navigate(`/${result.title}/${result.id}`); 
                }}
              >
                <img src={result.poster} alt={result.title} className="search-result-image" />
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPopup;
