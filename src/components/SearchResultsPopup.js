import React from 'react';
import '../css/SearchResultsPopup.css'; // Make sure your CSS is properly defined

const SearchResultsPopup = ({ searchResults, onClose }) => {
  return (
    <div className="search-results-popup">
      <div className="search-results-backdrop" onClick={onClose} />
      <div className="search-results-content">
        <button className="search-results-close-btn" onClick={onClose}>X</button>
        <h2>Search Results</h2>
        {searchResults.length > 0 ? (
          <div className="search-results-grid">
            {searchResults.map((result) => (
              <div key={result._id} className="search-result-item">
                <img src={result.poster} alt={result.title} className="search-result-image" />
                <p className="search-result-title">{result.title}</p>
                {/* If you want to navigate to the detail page of the item */}
                <button onClick={() => navigateToDetailPage(result)}>View Details</button>
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

// Function to navigate to the detail page (if applicable)
const navigateToDetailPage = (result) => {
  // Use navigate function from react-router-dom to navigate to the item's detail page
  // navigate(`/details/${result._id}`); // You need to define the navigate function and the route correctly
};

export default SearchResultsPopup;
