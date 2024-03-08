import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from '../pages/HomePage';
import ListingPage from '../pages/ListingPage';
import MovieDetail from '../pages/MovieDetail';
import Footer from './Footer.js';
import '../css/App.css'; 




function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/movies" element={<ListingPage />} />
          
          <Route path="/:title/:id" element={<MovieDetail />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
