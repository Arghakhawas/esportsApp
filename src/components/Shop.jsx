// Shop.jsx
import React, { useState, useEffect } from 'react';
import './Shop.css';
import ProductListing from './ProductListing';
import AddToCart from './AddToCart';

const Shop = ({ token }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://esportsappbackend.onrender.com/api/products');
        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="section shop" id="shop">
      <div className="container">
        <h2 className="h2 section-title">Gaming Product <span className="span">Corner</span></h2>
        <ul className="has-scrollbar">
          {products.map(product => (
            <li className="scrollbar-item" key={product._id}>
              <div className="shop-card">
                <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 260 }}>
                  <img src={product.imageUrl} width="300" height="260" loading="lazy" alt={product.name} className="img-cover" />
                </figure>
                <div className="card-content">
                  <a href="#" className="card-badge skewBg">{product.category}</a>
                  <h3 className="h3">
                    <a href="#" className="card-title">{product.name}</a>
                  </h3>
                  <div className="card-wrapper">
                    <p className="card-price">${product.price}</p>
                    <ion-icon name="basket"></ion-icon> Add to Cart  <AddToCart productId={product._id} productName={product.name} productPrice={product.price} token={token} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Shop;
                      
             