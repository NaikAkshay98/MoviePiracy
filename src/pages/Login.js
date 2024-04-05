import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Login.css';
import Registration from './Registration';




const Login = ({ onClose }) => {
  const navigate = useNavigate(); 
  const [showRegistration, setShowRegistration] = React.useState(false);
  const { setUser } = useContext(UserContext);
  const toggleRegistration = () => setShowRegistration(!showRegistration);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    try {
      // Attempt to authenticate the user
      const authResponse = await axios.post('http://localhost:6070/api/users/authenticate', { email, password });
      if (authResponse.data) {
        // If authentication is successful, retrieve the user's details
        
        const userResponse = await axios.get(`http://localhost:6070/api/users/email/${email}`);
        // Now store the user details in localStorage and context state
        localStorage.setItem('user', JSON.stringify(userResponse.data));
        setUser(userResponse.data); // Update context with the user data
        console.log('User details fetched:', userResponse.data);
        toast.success('Login successful!', {
          onClose: () => {
            onClose(); // Close the registration modal
            setTimeout(() => navigate('/'), 500); // Delay navigation to give the user time to see the toast
          }
        });
      }
    } catch (error) {
      console.error('Authentication failed:', error.response ? error.response.data : 'Server error');
      toast.error(`Login failed: ${error.response ? error.response.data : 'Please check your credentials!'}`);
    }
  };
  
  return (
    <div className="login-modal">
      <div className="login-content">
        <button onClick={onClose} className="close-button">X</button>
        <h2>Sign In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <a href="/forgot-password">Forgot your password?</a>
          <button type="submit" className="login-button">Sign In</button>
          <button type="button" onClick={toggleRegistration} className="create-account-button">Create a new account</button>
        </form>
        {showRegistration && <Registration onClose={toggleRegistration} />}
      </div>
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default Login;
