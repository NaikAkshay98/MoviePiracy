import React from 'react';
import '../css/Registration.css'; 

const Registration = ({ onClose }) => {
  return (
    <div className="registration-modal">
      <div className="registration-content">
        <button onClick={onClose} className="close-button">X</button>
        <h2>Create a New Account</h2>
        <form className="registration-form">
          <div className="name-field">
            <input type="text" placeholder="First name" required />
            <input type="text" placeholder="Last name" required />
          </div>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        
      </div>
    </div>
  );
};

export default Registration;
