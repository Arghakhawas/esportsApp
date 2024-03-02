import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Shop from "./components/Shop";
import Tournament from "./components/Tournament";
import TournamentDetails from "./components/TournamentDetails";
import UserProfile from "./components/UserProfile";
import LiveViewer from "./components/LiveViewer";
import ChangePasswordModal from "./components/ChangePasswordModel";
import ShoppingCart from "./components/ShoppingCart";
import Live from "./components/Live/Stream";
import Preview from "./components/Live/Preview";

// Import the AdminPanel component
import AdminPanel from "./components/Admin/AdminPanel";
import AdminLogin from "./components/Admin/Adminlogin";

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
          <Route
            path="/"
            element={<Home isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/live" element={<Live />} />
          <Route path="/preview" element={<Preview />} />
          {isAuthenticated && (
            <>
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/profile" element={<UserProfile />} />
              
      <Route path="/admin" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} />
      <Route
  path="/admin"
  element={
    isAuthenticated && email === 'argha820@gmail.com' && password === '84206701' ? (
      <AdminPanel />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

      
              <Route path="/tournament" element={<Tournament />} />
              <Route
                path="/ChangePasswordModel"
                element={<ChangePasswordModal />}
              />
              <Route
                path="/tournament-details"
                element={<TournamentDetails />}
              />
              <Route path="/liveviewer" element={<LiveViewer />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
