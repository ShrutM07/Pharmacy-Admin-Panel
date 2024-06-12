import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a new context for the cart
const CartContext = createContext();

// Custom hook to consume the CartContext
export const useCartContext = () => useContext(CartContext);

// CartProvider component to provide cart state and functions to its children
export const CartProvider = ({ children }) => {
  // State variables for the cart and cart count
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Function to add an item to the cart
  const addToCart = (item) => {
    const updatedCart = [...cart, { ...item, quantity: 1 }];
    const updatedCount = cartCount + 1;

    setCart(updatedCart);
    setCartCount(updatedCount);
  };

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    setCartCount(prevCount => prevCount - 1);
  };

  // Effect to fetch cart data when the component mounts
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        // Fetch cart data from the API
        const response = await axios.get('https://crudcrud.com/api/978f8c20a4fb4f829e16beba5ca21e50/cart');
        const medicines = response.data;
        // Update the cart state and cart count state with fetched data
        setCart(medicines);
        setCartCount(medicines.length);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    // Call the fetchMedicines function
    fetchMedicines();
    // Cleanup function to reset cart state and cart count state when the component unmounts
    return () => {
      setCart([]);
      setCartCount(0);
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Render the CartContext.Provider with the cart state and functions as value
  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};