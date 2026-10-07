// src/pages/CartPage.jsx

import React, {
  useEffect,
  useState,
  useMemo,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import "./CartPage.css";

const CartPage = () => {

  const navigate =
    useNavigate();

  // =====================================
  // STATES
  // =====================================

  const [cart, setCart] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user =

    JSON.parse(

      localStorage.getItem("user")

    );

  // =====================================
  // LOGIN CHECK
  // =====================================

  useEffect(() => {

    if (!user) {

      alert(

        "Please login to view your cart."

      );

      navigate(

        "/login",

        {

          state: {

            redirectTo: "/cart",

          },

        }

      );

      return;

    }

    loadCart();

  }, []);

  // =====================================
  // LOAD CART
  // =====================================

  const loadCart = () => {

    const savedCart =

      JSON.parse(

        localStorage.getItem(

          "cartItems"

        )

      ) || [];

    setCart(savedCart);

    setLoading(false);

  };

  // =====================================
  // SAVE CART
  // =====================================

  useEffect(() => {

    if (!loading) {

      localStorage.setItem(

        "cartItems",

        JSON.stringify(cart)

      );

    }

  }, [

    cart,

    loading,

  ]);
    // =====================================
  // INCREASE QUANTITY
  // =====================================

  const increaseQty = (id) => {

    setCart((prevCart) =>

      prevCart.map((item) =>

        item._id === id

          ? {

              ...item,

              qty: (item.qty || 1) + 1,

            }

          : item

      )

    );

  };

  // =====================================
  // DECREASE QUANTITY
  // =====================================

  const decreaseQty = (id) => {

    setCart((prevCart) =>

      prevCart.map((item) =>

        item._id === id

          ? {

              ...item,

              qty: Math.max(

                1,

                (item.qty || 1) - 1

              ),

            }

          : item

      )

    );

  };

  // =====================================
  // REMOVE ITEM
  // =====================================

  const removeItem = (id) => {

    const confirmRemove =

      window.confirm(

        "Remove this product from cart?"

      );

    if (!confirmRemove) return;

    setCart((prevCart) =>

      prevCart.filter(

        (item) => item._id !== id

      )

    );

  };

  // =====================================
  // CLEAR CART
  // =====================================

  const clearCart = () => {

    const confirmClear =

      window.confirm(

        "Clear your entire cart?"

      );

    if (!confirmClear) return;

    setCart([]);

    localStorage.removeItem(

      "cartItems"

    );

  };

  // =====================================
  // CONTINUE SHOPPING
  // =====================================

  const continueShopping = () => {

    navigate("/home");

  };
    // =====================================
  // PRICE CALCULATION
  // =====================================

  const subTotal = useMemo(() => {

    return cart.reduce(

      (total, item) =>

        total +

        (Number(item.price) || 0) *

        (Number(item.qty) || 1),

      0

    );

  }, [cart]);

  const deliveryCharge =

    subTotal >= 1000

      ? 0

      : 99;

  const discount =

    subTotal >= 10000

      ? Math.round(subTotal * 0.10)

      : 0;

  const total =

    subTotal +

    deliveryCharge -

    discount;

  // =====================================
  // CHECKOUT
  // =====================================

  const handleCheckout = () => {

    if (!user) {

      alert(

        "Please login to continue."

      );

      navigate("/login", {

        state: {

          redirectTo: "/checkout",

        },

      });

      return;

    }

    if (cart.length === 0) {

      alert(

        "Your cart is empty."

      );

      return;

    }

    localStorage.setItem(

      "cartItems",

      JSON.stringify(cart)

    );

    navigate("/checkout");

  };

  // =====================================
  // BUY NOW
  // =====================================

  const handleBuyNow = (product) => {

    if (!user) {

      alert(

        "Please login to continue."

      );

      navigate("/login", {

        state: {

          redirectTo: "/checkout",

        },

      });

      return;

    }

    localStorage.setItem(

      "buyNowProduct",

      JSON.stringify({

        ...product,

        qty: product.qty || 1,

      })

    );

    navigate("/checkout");

  };

  // =====================================
  // EMPTY CART
  // =====================================

  if (loading) {

    return (

      <div className="cart-loading">

        Loading Cart...

      </div>

    );

  }
    // =====================================
  // RETURN
  // =====================================

  return (

    <div className="cart-page">

      <h1 className="cart-title">

        🛒 Shopping Cart

      </h1>

      {cart.length === 0 ? (

        <div className="empty-cart">

          <h2>

            Your Cart is Empty

          </h2>

          <p>

            Start shopping to add products to your cart.

          </p>

          <button
            className="continue-btn"
            onClick={continueShopping}
          >

            Continue Shopping

          </button>

        </div>

      ) : (

        <div className="cart-container">

          {/* ==========================
              CART ITEMS
          ========================== */}

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

                  <h3>

                    {item.name}

                  </h3>

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

                      {item.qty || 1}

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

                    {(Number(item.price) || 0) *

                      (Number(item.qty) || 1)}

                  </h3>

                  <button
                    className="buy-now-btn"
                    onClick={() =>
                      handleBuyNow(item)
                    }
                  >

                    Buy Now

                  </button>

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
                    {/* ==========================
              ORDER SUMMARY
          ========================== */}

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

                Delivery Charge

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

                Grand Total

              </span>

              <span>

                ₹{total}

              </span>

            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >

              Proceed To Checkout

            </button>

            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >

              Clear Cart

            </button>

          </div>

        </div>

      )}

    </div>

  );

};

export default CartPage;