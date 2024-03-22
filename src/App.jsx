import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Shop from './components/Shop';
import Tournament from './components/Tournament';
import ProductListing from './components/ProductListing';

import TournamentDetails from './components/TournamentDetails';

import UserProfile from './components/UserProfile';

import ChangePasswordModal from './components/ChangePasswordModel';
import ShoppingCart from './components/ShoppingCart';

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
          <Route path="/shop" element={<Shop token={user?.token} />} />
          {isAuthenticated && (
            <>

          <Route path="/shopping-cart" element={<ShoppingCart token={user?.token} />} />
          <Route path="/product-listing" element={<ProductListing token={user?.token} />} />
              <Route path="/profile" element={<UserProfile />} />
              {/* <AdminRoute
                path="/admin"
                element={<AdminDashboard />}
                isAuthenticated={isAuthenticated}
              /> */}
              <Route path="/tournament" element={<Tournament />} />
              <Route path="/ChangePasswordModel" element={<ChangePasswordModal />} />
              <Route path="/tournament-details" element={<TournamentDetails />} />
          
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;