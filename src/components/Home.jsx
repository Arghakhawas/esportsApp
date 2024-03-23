import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home({ isAuthenticated }) {
  return (
    
    <div>
    <div className="slider">
      <div className="slide"></div>
      <div className="slide"></div>
      <div className="slide"></div>
      <div className="slide"></div>
      <div className="slide"></div>
   
    <div className="has-scrollbar">
      <section className="section hero" id="home" aria-label="home">
        <div className="hero-content">
          <p className="hero-subtitle">World Gaming</p>
          <h1 className="h1 hero-title">
            Play <span className="span">Tournament</span> Matches
          </h1>
          <p className="hero-text">
            Join the First Step to Esports Gamer and Win Prizes
          </p>
          {!isAuthenticated && (
              <>
                <div>
                  <Link to="/signup" className="btn skewBg">Signup/Register</Link>
                </div>
                <div>
                  <Link to="/login" className="btn skewBg">Login</Link>
                </div>
                <div>
                  {/* Add a link/button for admin login */}
                  <Link to="/admin/login" className="btn skewBg">Admin Login</Link>
                </div>
              </>
            )}
          {isAuthenticated && (
                <p>
                <Link to="/tournament" className="btn skewBg">Tournament Registraion</Link>
                </p>
          )}

        </div>
        
      </section>
     

       </div>
        </div>
    <footer className="footer">

      <div className="footer-top">
        <div className="container">

          <div className="footer-brand">

            <a href="#" className="logo">Esports  Empire</a>

            <p className="footer-text">
           Esports Empires
            </p>

            <ul className="contact-list">

              <li className="contact-item">
                <div className="contact-icon">
                  <ion-icon name="location"></ion-icon>
                </div>

                <address className="item-text">
                  Address : Kolkata,wesbengal
                  support from :Esports.
                </address>
              </li>

              <li className="contact-item">
                <div className="contact-icon">
                  <ion-icon name="headset"></ion-icon>
                </div>

                <a href="tel:+919073069788" className="item-text">Phone : 9073069788/9073357827</a>
              </li>

              <li className="contact-item">
                <div className="contact-icon">
                  <ion-icon name="mail-open"></ion-icon>
                </div>

                <a href="mailto: esportsempires7@gmail.com" className="item-text">Email : esportsempires7@gmail.com</a>
              </li>

            </ul>

          </div>

          <ul className="footer-list">

            <li>
              <p className="footer-list-title">Gaming Products</p>
            </li>

            <li>
              <a href="#" className="footer-link">Graphics cards(30)</a>
            </li>

            <li>
              <a href="#" className="footer-link">gaming pad (11)</a>
            </li>

            <li>
              <a href="#" className="footer-link">Gaming Conttoler (9)</a>
            </li>

            <li>
              <a href="#" className="footer-link">Store</a>
            </li>

            <li>
              <a href="#" className="footer-link">Tournament (17)</a>
            </li>

          </ul>

          <ul className="footer-list">

            <li>
              <p className="footer-list-title">Need Help?</p>
            </li>

            <li>
              <a href="#" className="footer-link">Terms & Conditions</a>
            </li>

            <li>
              <a href="#" className="footer-link">Privacy Policy</a>
            </li>

            <li>
              <a href="#" className="footer-link">Refund Policy</a>
            </li>

            <li>
              <a href="#" className="footer-link">Affiliate</a>
            </li>

            <li>
              <a href="#" className="footer-link">Use Cases</a>
            </li>

          </ul>

          <div className="footer-wrapper">

            <div className="social-wrapper">

              <p className="footer-list-title">Follow Us</p>

              <ul className="social-list">

                <li>
                  <a href="#" className="social-link" style={{ backgroundColor: '#3b5998' }}>
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="social-link" style={{ backgroundColor: '#55acee' }}>
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="social-link" style={{ backgroundColor: '#d71e18' }}>
                    <ion-icon name="logo-pinterest"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="social-link" style={{ backgroundColor: '#1565c0' }}>
                    <ion-icon name="logo-linkedin"></ion-icon>
                  </a>
                </li>

              </ul>

            </div>

            <div className="footer-newsletter">

              <p className="footer-list-title">Contact us</p>

              <form action="" className="footer-newsletter">
                <input type="email" name="email_address" aria-label="email" placeholder="Enter your email" required
                  className="email-field" />

                <button type="submit" className="footer-btn" aria-label="submit">
                  <ion-icon name="rocket"></ion-icon>
                </button>
              </form>

            </div>

          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">

          <p className="copyright">
            &copy; 2020 Esports Empire. All Right Reserved by <a href="#" className="copyright-link">Aghori Gaming</a>
          </p>

          <img src="./assets/images/footer-bottom-img.png" width="340" height="21" loading="lazy" alt=""
            className="footer-bottom-img" />

        </div>
      </div>

    </footer>
  






  <a href="#top" className="back-top-btn" aria-label="back to top" data-back-top-btn>
    <ion-icon name="caret-up"></ion-icon>
  </a>
</div>
    
  );
}

export default Home;
