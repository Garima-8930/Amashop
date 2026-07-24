import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CartPage.css";

const CartPage = () => {

  const navigate = useNavigate();

  

  const [cart, setCart] = useState([]);

  // ==========================
  // LOAD CART
  // ==========================

  useEffect(() => {

    const savedCart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    setCart(savedCart);

  }, []);

  // ==========================
  // SAVE CART
  // ==========================

  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cart)
    );

  }, [cart]);

  // ==========================
  // QUANTITY +
  // ==========================

  const increaseQty = (id) => {

    const updatedCart = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            qty: item.qty + 1,
          }
        : item
    );

    setCart(updatedCart);

  };

  // ==========================
  // QUANTITY -
  // ==========================

  const decreaseQty = (id) => {

    const updatedCart = cart.map((item) =>
      item._id === id && item.qty > 1
        ? {
            ...item,
            qty: item.qty - 1,
          }
        : item
    );

    setCart(updatedCart);

  };

  // ==========================
  // REMOVE ITEM
  // ==========================

  const removeItem = (id) => {

    const updatedCart =
      cart.filter((item) => item._id !== id);

    setCart(updatedCart);

  };

  // ==========================
  // CALCULATIONS
  // ==========================

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const deliveryCharge =
    subTotal > 5000 ? 0 : 99;

  const discount =
    subTotal > 20000 ? 1000 : 0;

  const total =
    subTotal + deliveryCharge - discount;

  // ==========================
  // PLACE ORDER
  // ==========================

  const handlePlaceOrder = () => {

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  navigate("/checkout");
};
  // ==========================
  // RETURN
  // ==========================

  return (
        <div className="cart-page">

      <h1 className="cart-title">
        🛒 Shopping Cart
      </h1>

      {cart.length === 0 ? (

        <div className="empty-cart">

          <h2>Your Cart is Empty</h2>

          <p>
            Looks like you haven't added any products yet.
          </p>

          <button
            className="continue-btn"
            onClick={() => navigate("/home")}
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <div className="cart-container">

          {/* ================= LEFT ================= */}

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-card"
                key={item._id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-image"
                />

                <div className="cart-details">

                  <h3>{item.name}</h3>

                  <p>
                    ₹{item.price}
                  </p>

                  <div className="qty-box">

                    <button
                      onClick={() =>
                        decreaseQty(item._id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item._id)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="cart-right">

                  <h3>

                    ₹
                    {item.price * item.qty}

                  </h3>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item._id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* ================= RIGHT ================= */}

          <div className="summary-card">

            <h2>

              Order Summary

            </h2>

            <div className="summary-row">

              <span>

                Subtotal

              </span>

              <span>

                ₹{subTotal}

              </span>

            </div>

            <div className="summary-row">

              <span>

                Delivery

              </span>

              <span>

                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge}`}

              </span>

            </div>

            <div className="summary-row">

              <span>

                Discount

              </span>

              <span>

                - ₹{discount}

              </span>

            </div>

            <hr />

            <div className="summary-total">

              <span>

                Total

              </span>

              <span>

                ₹{total}

              </span>

            </div>

            <button
              className="checkout-btn"
              onClick={handlePlaceOrder}
            >

              📦 Place Order

            </button>

          </div>

        </div>

      )}

    </div>

  );

};

export default CartPage;