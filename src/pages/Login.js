import React from 'react';
import '../css/Login.css';
import Registration from './Registration';

const Login = ({ onClose }) => {
  const [showRegistration, setShowRegistration] = React.useState(false);
  

  const toggleRegistration = () => setShowRegistration(!showRegistration);
  


  return (
    <div className="login-modal">
      <div className="login-content">
        <button onClick={onClose} className="close-button">X</button>
        <h2>Sign In</h2>
        <form className="login-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <a href="/forgot-password">Forgot your password?</a>
          <button type="submit" className="login-button">Sign In</button>
          <button onClick={toggleRegistration} className="create-account-button">Create a new account</button>
        </form>
        {showRegistration && <Registration onClose={toggleRegistration} />}
      </div>
    </div>
  );
};

export default Login;
