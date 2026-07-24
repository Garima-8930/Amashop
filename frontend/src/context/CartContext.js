import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

// ✅ Normalize product so har product ke पास हमेशा _id रहे
const normalizeProduct = (product) => {
  return {
    ...product,
    _id: product._id || product.id || String(Date.now()), // fallback id
  };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newProduct = normalizeProduct(action.payload);

      const existing = state.find((item) => item._id === newProduct._id);

      if (existing) {
        return state.map((item) =>
          item._id === newProduct._id
            ? { ...item, quantity: item.quantity + newProduct.quantity }
            : item
        );
      }
      return [...state, { ...newProduct, quantity: newProduct.quantity || 1 }];
    }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item._id !== action.payload);

    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE_QUANTITY":
      return state.map((item) =>
        item._id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // ✅ Helper functions
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const getCurrentUserCart = () => cart;

  return (
    <CartContext.Provider value={{ cart, dispatch, addToCart, removeFromCart, getCurrentUserCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
