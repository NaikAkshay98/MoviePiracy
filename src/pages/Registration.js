import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext'; 
import '../css/Registration.css';

const Registration = ({ onClose }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://moviepiracy-3b45209c39bf.herokuapp.com/api/users', formData);
      setUser(response.data); 
      localStorage.setItem('user', JSON.stringify(response.data)); 
      toast.success('Registration successful!', {
        onClose: () => {
          onClose(); 
          setTimeout(() => navigate('/'), 500); 
        }
      });
    } catch (error) {
      toast.error(error.response?.data || 'An error occurred during registration.');
    }
  };

  return (
    <div className="registration-modal">
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="registration-content">
        <button onClick={onClose} className="close-button">X</button>
        <h2>Create a New Account</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="name-field">
            <input 
              type="text" 
              placeholder="First name" 
              name="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              required 
            />
            <input 
              type="text" 
              placeholder="Last name" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              required 
            />
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
          
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        
      </div>
    </div>
  );
};

export default Registration;
