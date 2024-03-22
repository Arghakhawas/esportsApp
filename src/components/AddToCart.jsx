// AddToCart.jsx
import React from 'react';

const AddToCart = ({ productId, productName, productPrice, token }) => {
  const addToCart = async () => {
    try {
      const response = await fetch(`https://esportsappbackend.onrender.com/api/cart/add`, {
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
    <button onClick={addToCart}>Add to Cart</button>
  );
};

export default AddToCart;
