import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-content">
      <div className="footer-logo">
        <img src="MoviePiracyLogo.png" alt="MoviePiracyLogo" /> 
      </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024-2024, MoviePiracy.com, Inc. or its affiliates</p>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com"><FaFacebook /></a>
          <a href="https://www.twitter.com"><FaTwitter /></a>
          <a href="https://www.instagram.com"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
