import React from 'react';
import ('./Shop.css');

const Shop = () => {
  // Inside Shop.jsx
const addToCart = async (productId) => {
  try {
    const response = await fetch(`https://esportsappbackend.onrender.com/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // You need to have the user's token here
      },
      body: JSON.stringify({ productId, quantity: 1 }), // You might want to adjust quantity based on user input
    });

    if (response.ok) {
      // Handle success
      console.log('Item added to the cart');
    } else {
      // Handle error
      console.error('Failed to add item to the cart');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  const [showBackToTop, setShowBackToTop] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
    const backTopBtn = document.querySelector("[data-back-top-btn]");
  return (
    <section className="section shop" id="shop">
      <div className="container">

        <h2 className="h2 section-title">
          Gaming Product <span className="span">Corner</span>
        </h2>

        <p className="section-text">
          Compete with 100 players on a remote island for winner takes showdown known issue where certain skin strategic
        </p>

        <ul className="has-scrollbar">

          {/* Repeat this block for each shop item */}
      
    <li className="scrollbar-item">
            <div className="shop-card">
              <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                <img src="./assets/images/shop-img-1.jpg" width="300" height="260" loading="lazy" alt="Women Black T-Shirt" className="img-cover" />
              </figure>
              <div className="card-content">
                <a href="#" className="card-badge skewBg">t-shirt</a>
                <h3 className="h3">
                  <a href="#" className="card-title">Women Black T-Shirt</a>
                </h3>
                <div className="card-wrapper">
                  <p className="card-price">$29.00</p>
                  <button className="card-btn" onClick={() => addToCart(product._id)}>
  <ion-icon name="basket"></ion-icon>
</button>
                </div>
              </div>
            </div>
          </li>

          <li className="scrollbar-item">
            <div className="shop-card">
              <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                <img src="./assets/images/shop-img-1.jpg" width="300" height="260" loading="lazy" alt="Women Black T-Shirt" className="img-cover" />
              </figure>
              <div className="card-content">
                <a href="#" className="card-badge skewBg">t-shirt</a>
                <h3 className="h3">
                  <a href="#" className="card-title">Women Black T-Shirt</a>
                </h3>
                <div className="card-wrapper">
                  <p className="card-price">$29.00</p>
                  <button className="card-btn" onClick={() => addToCart(product._id)}>
  <ion-icon name="basket"></ion-icon>
</button>
                </div>
              </div>
            </div>
          </li>

          <li className="scrollbar-item">
            <div className="shop-card">
              <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                <img src="./assets/images/shop-img-1.jpg" width="300" height="260" loading="lazy" alt="Women Black T-Shirt" className="img-cover" />
              </figure>
              <div className="card-content">
                <a href="#" className="card-badge skewBg">X-box Remote</a>
                <h3 className="h3">
                  <a href="#" className="card-title">X-box 360 Remote</a>
                </h3>
                <div className="card-wrapper">
                  <p className="card-price">$29.00</p>
                  <button className="card-btn" onClick={() => addToCart(product._id)}>
  <ion-icon name="basket"></ion-icon>
</button>
                </div>
              </div>
            </div>
          </li>


          <li className="scrollbar-item">
            <div className="shop-card">
              <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                <img src="./assets/images/shop-img-1.jpg" width="300" height="260" loading="lazy" alt="Women Black T-Shirt" className="img-cover" />
              </figure>
              <div className="card-content">
                <a href="#" className="card-badge skewBg">X-box Remote</a>
                <h3 className="h3">
                  <a href="#" className="card-title">X-box 360 Remote</a>
                </h3>
                <div className="card-wrapper">
                  <p className="card-price">$29.00</p>
                  <button className="card-btn" onClick={() => addToCart(product._id)}>
  <ion-icon name="basket"></ion-icon>
</button>
                </div>
              </div>
            </div>
          </li>
          <li className="scrollbar-item">
            <div className="shop-card">
              <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                <img src="./assets/images/shop-img-1.jpg" width="300" height="260" loading="lazy" alt="Women Black T-Shirt" className="img-cover" />
              </figure>
              <div className="card-content">
                <a href="#" className="card-badge skewBg">X-box Remote</a>
                <h3 className="h3">
                  <a href="#" className="card-title">X-box 360 Remote</a>
                </h3>
                <div className="card-wrapper">
                  <p className="card-price">$29.00</p>
                  <button className="card-btn" onClick={() => addToCart(product._id)}>
  <ion-icon name="basket"></ion-icon>
</button>
                </div>
              </div>
            </div>
          </li>
          <li className="scrollbar-item">
            <div className="shop-card">
              <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                <img src="./assets/images/shop-img-1.jpg" width="300" height="260" loading="lazy" alt="Women Black T-Shirt" className="img-cover" />
              </figure>
              <div className="card-content">
                <a href="#" className="card-badge skewBg">X-box Remote</a>
                <h3 className="h3">
                  <a href="#" className="card-title">X-box 360 Remote</a>
                </h3>
                <div className="card-wrapper">
                  <p className="card-price">$29.00</p>
                  <button className="card-btn" onClick={() => addToCart(product._id)}>
  <ion-icon name="basket"></ion-icon>
</button>
                </div>
              </div>
            </div>
          </li>
          <li className="scrollbar-item">
            <div className="shop-card">
              <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                <img src="./assets/images/shop-img-1.jpg" width="300" height="260" loading="lazy" alt="Women Black T-Shirt" className="img-cover" />
              </figure>
              <div className="card-content">
                <a href="#" className="card-badge skewBg">X-box Remote</a>
                <h3 className="h3">
                  <a href="#" className="card-title">X-box 360 Remote</a>
                </h3>
                <div className="card-wrapper">
                  <p className="card-price">$29.00</p>
                  <button className="card-btn" onClick={() => addToCart(product._id)}>
  <ion-icon name="basket"></ion-icon>
</button>
                </div>
              </div>
            </div>
          </li>
          <li className="scrollbar-item">
            <div className="shop-card">
              <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                <img src="./assets/images/shop-img-1.jpg" width="300" height="260" loading="lazy" alt="Women Black T-Shirt" className="img-cover" />
              </figure>
              <div className="card-content">
                <a href="#" className="card-badge skewBg">X-box Remote</a>
                <h3 className="h3">
                  <a href="#" className="card-title">X-box 360 Remote</a>
                </h3>
                <div className="card-wrapper">
                  <p className="card-price">$29.00</p>
                  <button className="card-btn" onClick={() => addToCart(product._id)}>
  <ion-icon name="basket"></ion-icon>
</button>
                </div>
              </div>
            </div>
          </li>
          <li className="scrollbar-item">
            <div className="shop-card">
              <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                <img src="./assets/images/shop-img-1.jpg" width="300" height="260" loading="lazy" alt="Women Black T-Shirt" className="img-cover" />
              </figure>
              <div className="card-content">
                <a href="#" className="card-badge skewBg">X-box Remote</a>
                <h3 className="h3">
                  <a href="#" className="card-title">X-box 360 Remote</a>
                </h3>
                <div className="card-wrapper">
                  <p className="card-price">$29.00</p>
                  <button className="card-btn" onClick={() => addToCart(product._id)}>
  <ion-icon name="basket"></ion-icon>
</button>
                </div>
              </div>
            </div>
          </li>
          <li className="scrollbar-item">
            <div className="shop-card">
              <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                <img src="./assets/images/shop-img-1.jpg" width="300" height="260" loading="lazy" alt="Women Black T-Shirt" className="img-cover" />
              </figure>
              <div className="card-content">
                <a href="#" className="card-badge skewBg">X-box Remote</a>
                <h3 className="h3">
                  <a href="#" className="card-title">X-box 360 Remote</a>
                </h3>
                <div className="card-wrapper">
                  <p className="card-price">$29.00</p>
                  <button className="card-btn" onClick={() => addToCart(product._id)}>
  <ion-icon name="basket"></ion-icon>
</button>
                </div>
              </div>
            </div>
          </li>
          <li className="scrollbar-item">
            <div className="shop-card">
              <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                <img src="./assets/images/shop-img-1.jpg" width="300" height="260" loading="lazy" alt="Women Black T-Shirt" className="img-cover" />
              </figure>
              <div className="card-content">
                <a href="#" className="card-badge skewBg">X-box Remote</a>
                <h3 className="h3">
                  <a href="#" className="card-title">X-box 360 Remote</a>
                </h3>
                <div className="card-wrapper">
                  <p className="card-price">$29.00</p>
                  <button className="card-btn" onClick={() => addToCart(product._id)}>
  <ion-icon name="basket"></ion-icon>
</button>
                </div>
              </div>
            </div>
          </li>
          <li className="scrollbar-item">
            <div className="shop-card">
              <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                <img src="./assets/images/shop-img-1.jpg" width="300" height="260" loading="lazy" alt="Women Black T-Shirt" className="img-cover" />
              </figure>
              <div className="card-content">
                <a href="#" className="card-badge skewBg">X-box Remote</a>
                <h3 className="h3">
                  <a href="#" className="card-title">X-box 360 Remote</a>
                </h3>
                <div className="card-wrapper">
                  <p className="card-price">$29.00</p>
                  <button className="card-btn" onClick={() => addToCart(product._id)}>
  <ion-icon name="basket"></ion-icon>
</button>
                </div>
              </div>
            </div>
          </li>



  
    
  



        </ul>
        {showBackToTop && (
      <a href="#top" className="back-top-btn" aria-label="back to top">
        <ion-icon name="caret-up"></ion-icon>
      </a>
    )}
      </div>
    </section>
  );
};

export default Shop;
