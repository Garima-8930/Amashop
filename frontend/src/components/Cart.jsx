import React from "react";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Calculate total dynamically
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 0),
    0
  );

  return (
    <aside className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="muted">Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="grow">
                <div className="title">{item.name}</div>
                <div className="muted">Qty: {item.quantity}</div>
                <div>₹{(item.price * item.quantity).toLocaleString("en-IN")}</div>
              </div>
              <button
                className="danger"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        Total: ₹{total.toLocaleString("en-IN")}
      </div>
      <button disabled={cart.length === 0}>Checkout (demo)</button>
      <button onClick={clearCart} disabled={cart.length === 0}>
        Clear Cart
      </button>
    </aside>
  );
}
