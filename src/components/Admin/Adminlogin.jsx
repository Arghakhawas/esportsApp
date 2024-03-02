// AdminLogin Component
import React, { useState } from 'react';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Check if email and password match the admin credentials
      if (email === 'admin@example.com' && password === 'adminpassword') {
        // Mocking token generation for simplicity
        const token = 'mocked-token';
        // Store JWT token securely (e.g., in local storage)
        localStorage.setItem('adminToken', token);
        // Call the onLoginSuccess callback to indicate successful login
        onLoginSuccess();
      } else {
        // Handle invalid credentials
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
