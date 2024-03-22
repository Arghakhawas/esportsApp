// ProductListing.jsx
import React, { useState, useEffect } from 'react';
import AddToCart from './AddToCart';

const ProductListing = ({ token }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://esportsappbackend.onrender.com/api/products`);
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
    <div>
      {products.map(product => (
        <div key={product._id}>
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          {product.type === 'monitor' && (
            <div>
              <p>Customize Monitor Size:</p>
              <select>
                {product.customizationOptions && product.customizationOptions.sizes.map((size, index) => (
                  <option key={index}>{size}</option>
                ))}
              </select>
            </div>
          )}
          {product.type === 'desktop' && (
            <div>
              <p>Customize RAM:</p>
              <select>
                {product.customizationOptions && product.customizationOptions.ram.map((ramOption, index) => (
                  <option key={index}>{ramOption}</option>
                ))}
              </select>
              <p>Customize Hard Disk:</p>
              <select>
                {product.customizationOptions && product.customizationOptions.hardDisk.map((diskOption, index) => (
                  <option key={index}>{diskOption}</option>
                ))}
              </select>
              {/* Add more customization options as needed */}
            </div>
          )}
          <AddToCart productId={product._id} productName={product.name} productPrice={product.price} token={token} />
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
