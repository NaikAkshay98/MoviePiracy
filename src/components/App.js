import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from '../pages/HomePage';
import ListingPage from '../pages/ListingPage';
import MovieDetail from '../pages/MovieDetail';
import Dashboard from '../pages/Dashboard';
import Footer from './Footer';
import '../css/App.css';
import { UserProvider } from './UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<ListingPage />} />
            <Route path="/:title/:id" element={<MovieDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
