import React, { useState } from 'react';
import logo from '../assets/logo.png';
import './Navbar.css';
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { GiConsoleController } from "react-icons/gi";
import { BiSolidIdCard } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { BsFillTrophyFill } from "react-icons/bs";
import { FiVideo } from "react-icons/fi";

function Navbar({  onLogout, isAuthenticated }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };
  return (
    <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-top">
        <div className="container">
       
          <div className="social-wrapper" >
            <p className="social-title">Follow us on :</p>
            <ul className="social-list">
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-pinterest"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header-bottom skewBg" data-header>
        <div className="container">
          <a href="#" className="logoContainer">
            <img src={logo} alt="Esports Empire Logo" />ESPORTS EMPIRE
          </a>
          <nav className={`navbar ${isMenuOpen ? 'active' : ''}`} data-navbar>
            <ul className="navbar-list">
              <li className="navbar-item">
              <Link to="/" className="navbar-link skewBg" data-nav-link data-tooltip="Home">
  <AiOutlineHome />
</Link>
              </li>
              <li className="navbar-item">
              <Link to="/liveviewer" className="navbar-link skewBg" data-nav-link data-tooltip="Live">
  <FiVideo />
</Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li className="navbar-item">
                  <Link to="/tournament" className="navbar-link skewBg" data-nav-link data-tooltip="Tournament">
  <BsFillTrophyFill />
</Link>
                  </li>

                </>
              ) : null}
              <li className="navbar-item">
              <Link to="/shop" className="navbar-link skewBg" data-nav-link data-tooltip="Shop">
  <BsCart4 />
</Link>
              </li>
              <li className="navbar-item">
              <Link to="/tournament-details" className="navbar-link skewBg" data-nav-link data-tooltip="Tournament Details">
  <GiConsoleController />
</Link>
              </li>
              <div className="header-actions">
                {isAuthenticated ? (
                  <>
                   <Link to="/profile" className="navbar-link skewBg" data-nav-link data-tooltip="Profile">
  <BiSolidIdCard />
</Link>

<button onClick={handleLogoutClick} className="navbar-link skewBg" data-nav-link data-tooltip="Logout">
  <AiOutlineLogout />
</button>
           
            </>
          ) : null}
        </div>

            </ul>
            {isAuthenticated && (
        <>
          {/* ... existing links */}
          <Link to="/admin" className="nav-link">
            Admin Dashboard
          </Link>
        </>
      )}
          </nav>
          <div className="header-actions">
            <button className="cart-btn" aria-label="cart">
              <ion-icon name="cart"></ion-icon>
              <span className="cart-badge">0</span>
            </button>
            <button className="search-btn" aria-label="open search" data-search-toggler>
              <ion-icon name="search-outline"></ion-icon>
            </button>
            <button className="nav-toggle-btn" aria-label="toggle menu" onClick={toggleMenu}>
              {isMenuOpen ? (
                <ion-icon name="close-outline" className="close"></ion-icon>
              ) : (
                <ion-icon name="menu-outline" className="menu"></ion-icon>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
export default Navbar;
