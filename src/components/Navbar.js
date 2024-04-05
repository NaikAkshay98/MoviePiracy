import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported
import '../css/Navbar.css';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import SearchResultsPopup from './SearchResultsPopup'; // Import the new component
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const navigate = useNavigate();

  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const { user, signOut } = useContext(UserContext);


  const toggleRegistration = () => setShowRegistration(!showRegistration);
  const toggleLogin = () => setShowLogin(!showLogin);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    setShowSearchPopup(false); // Reset the popup visibility
  
    // Initialize empty arrays to hold the search results
    let movies = [];
    let tvshows = [];
  
    try {
      // Fetch movies
      const moviesResponse = await axios.get(`http://localhost:6070/api/search/movies?title=${searchQuery}`);
      if (moviesResponse.data && Array.isArray(moviesResponse.data)) {
        movies = moviesResponse.data;
      }
  
      // Fetch TV shows
      const tvShowsResponse = await axios.get(`http://localhost:6070/api/search/tvshows?title=${searchQuery}`);
      if (tvShowsResponse.data && Array.isArray(tvShowsResponse.data)) {
        tvshows = tvShowsResponse.data;
      }
  
      // Combine the movies and tvshows into one array
      const combinedResults = [...movies, ...tvshows];
      setSearchResults(combinedResults);
      if (combinedResults.length > 0) {
        setShowSearchPopup(true); // Show the results popup only if there are results
      } else {
        toast.info('No results found.');
      }
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]); // Clear previous search results
      toast.error('Search failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };
  
  
  
  
  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);
  
  

  const handleSignOut = () => {
    signOut(); // Call the signOut method from your context
    navigate('/'); // Redirect to home after sign out
  };

  return (
    <header className="navbar">
      <div className="navbar">
        <div className="navbar__left">
          <div className="navbar__logo">
            <Link to="/">
                <img src="MoviePiracyLogo.png" alt="Logo" /> 
            </Link>
          </div>
          <div className="navbar__navigation">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movies">Movies&TVShows</Link></li>
            </ul>
          </div>
        </div>
        <div className="navbar__right">
          <form onSubmit={handleSubmitSearch} className="navbar__search-form">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="navbar__search-input"
            />
            <button type="submit" className="navbar__search-button">Search</button>
          </form>
          {user ? (
            <>
              <Link to="/dashboard">Hello, {user.firstName}</Link> 
              <button onClick={handleSignOut}>Sign Out</button>
            </>
            ) : (
            <>
              <Link className="navbar__link" onClick={toggleLogin}>Sign In</Link>
              <Link className="navbar__link" onClick={toggleRegistration}>Sign Up</Link>
            </>
            )}
          
          
        </div>
      </div>

      {showLogin && <Login onClose={toggleLogin} />}
      {showRegistration && <Registration onClose={toggleRegistration} />}
      {showSearchPopup && (
        <SearchResultsPopup
          searchResults={searchResults}
          onClose={() => setShowSearchPopup(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
