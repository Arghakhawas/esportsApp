import React, { useState, useEffect } from 'react';

const ShoppingCart = ({ token }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchShoppingCart = async () => {
      try {
        const response = await fetch(`/api/cart`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const cartData = await response.json();
          setCart(cartData.items);
        } else {
          console.error('Failed to fetch shopping cart');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchShoppingCart();
  }, [token]);

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch(`/api/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        console.log('Quantity updated');
        // You may want to refresh the shopping cart after updating quantity
        fetchShoppingCart();
      } else {
        console.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`/api/cart/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        console.log('Item removed from the cart');
        // You may want to refresh the shopping cart after removing an item
        fetchShoppingCart();
      } else {
        console.error('Failed to remove item from the cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {cart.map(item => (
        <div key={item.productId}>
          <p>{item.quantity} x {item.productName} - ${item.productPrice}</p>
          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
          <button onClick={() => removeFromCart(item.productId)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
