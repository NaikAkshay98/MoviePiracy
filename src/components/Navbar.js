import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../css/Navbar.css';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import SearchResultsPopup from './SearchResultsPopup'; 
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
    setShowSearchPopup(false);
  
    
    const normalizedQuery = encodeURIComponent(searchQuery.trim());
    console.log(normalizedQuery);
    let movies = [];
    let tvshows = [];
  
    try {
      const moviesResponse = await axios.get(`https://moviepiracy-3b45209c39bf.herokuapp.com/api/search/movies?title=${normalizedQuery}`);
      if (moviesResponse.data && Array.isArray(moviesResponse.data)) {
        movies = moviesResponse.data;
      }
  
      const tvShowsResponse = await axios.get(`https://moviepiracy-3b45209c39bf.herokuapp.com/api/search/tvshows?title=${normalizedQuery}`);
      if (tvShowsResponse.data && Array.isArray(tvShowsResponse.data)) {
        tvshows = tvShowsResponse.data;
      }
  
      const combinedResults = [...movies, ...tvshows];
      setSearchResults(combinedResults);
      if (combinedResults.length > 0) {
        setShowSearchPopup(true);
      } else {
        toast.info('No results found.');
      }
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
      toast.error('Search failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };
  
  
  
  
  
  
  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);
  
  

  const handleSignOut = () => {
    signOut(); 
    navigate('/'); 
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
              <Link to="/dashboard" className="navbar__greeting">Hello, {user.firstName}</Link> 
              <button onClick={handleSignOut} className="sign-out-btn">Sign Out</button>

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
