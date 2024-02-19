import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Shop from './components/Shop';
import Tournament from './components/Tournament';

import TournamentDetails from './components/TournamentDetails';

import UserProfile from './components/UserProfile';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData.user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleSignup = (userData) => {
    setIsAuthenticated(true);
    setUser(userData.user);
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/shop" element={<Shop />} />
          {isAuthenticated && (
            <>
              <Route path="/profile" element= {<UserProfile />} />
          
<Route path="/tournament" element={<Tournament />} />

              <Route path="/tournament-details" element={<TournamentDetails/>} />
            
            </>
          )}
 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
