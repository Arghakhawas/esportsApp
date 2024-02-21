import React, { useState } from 'react';
import './Signup.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referId, setReferId] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true); // Set loading to true when signup process starts

      const response = await fetch('https://esportsappbackend.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, referId, number }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      onSignup(data);
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false when signup process completes (success or failure)
    }
  };

  return (
    <div className="custom-signup-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      {loading && <div className="blur-background"></div>}
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Number:</label>
      <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Refer id:</label>
      <input type="number" value={referId} onChange={(e) => setReferId(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
      {loading && (
        <div className="BoltLoader-container">
        
        </div>
      )}
      <div>
        <Link to="/login" className="btnsignup">
          Login
        </Link>
      </div>
    </div>
  );
};

Signup.propTypes = {
  onSignup: PropTypes.func.isRequired,
};

export default Signup;
