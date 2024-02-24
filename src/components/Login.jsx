import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from './loader'; // Import the Loader component

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLoginSuccess = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://esportsappbackend.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      onLoginSuccess(data.user);
      navigate('/'); // Navigate to the home page after successful login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading && <Loader />}
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
      <label>Password:</label>
  <input
    type={showPassword ? 'text' : 'password'}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button
    className="toggle-password-btn"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? 'Hide' : 'Show'}
  </button> 
</div>

      <button className='btnl' onClick={handleLoginSuccess}>Login</button>
      {loading && <div className="BoltLoader-container"></div>}
      <div>
        <p>not a member?</p>
        <Link to="/signup" className="btnlogin">
          Signup/Register
        </Link>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;
