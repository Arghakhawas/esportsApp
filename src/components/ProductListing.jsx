import React, { useState, useEffect } from 'react';

const ProductListing = ({ token }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products`);
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

  const addToCart = async (productId) => {
    try {
      const response = await fetch(`/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (response.ok) {
        console.log('Item added to the cart');
      } else {
        console.error('Failed to add item to the cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
