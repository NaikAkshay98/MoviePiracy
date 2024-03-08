import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // Make sure to create a corresponding CSS file
import Registration from '../pages/Registration';
import Login from '../pages/Login';


const Navbar = () => {
  const [showRegistration, setShowRegistration] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  const toggleRegistration = () => setShowRegistration(!showRegistration);
  const toggleLogin = () => setShowLogin(!showLogin);


  return (
    <header className="navbar">
      

<div class="navbar">
  <div class="navbar__left">
    <div class="navbar__logo">
      <Link to="/">
          <img src="MoviePiracyLogo.png" alt="MyLogo" /> 
      </Link>
    </div>
    <div class="navbar__navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        
      </ul>
    </div>
  </div>
  <div class="navbar__right">
    
    <Link class="navbar__link" onClick={toggleLogin}>Sign In</Link>
    <Link class="navbar__link" onClick={toggleRegistration}>Sign Up</Link>
  </div>
</div>

      {showLogin && <Login onClose={toggleLogin} />}
      {showRegistration && <Registration onClose={toggleRegistration} />}
      
    </header>
  );
};

export default Navbar;
