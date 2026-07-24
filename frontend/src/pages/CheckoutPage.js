import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import "./CheckoutPage.css";

const CheckoutPage = () => {

  const navigate = useNavigate();
  const { placeOrder } = useOrder();

  // ==========================
  // PRODUCTS
  // ==========================

  const buyNowProduct =
    JSON.parse(
      localStorage.getItem("buyNowProduct")
    );

  const cartItems =
    JSON.parse(
      localStorage.getItem("cartItems")
    ) || [];

  const products =
    buyNowProduct
      ? [buyNowProduct]
      : cartItems;

  // ==========================
  // WEBSITE SETTINGS
  // ==========================

  const websiteSettings =
    JSON.parse(
      localStorage.getItem("websiteSettings")
    ) || {};

  // ==========================
  // PAYMENT SETTINGS
  // ==========================

  const paymentSettings =
    JSON.parse(
      localStorage.getItem("paymentSettings")
    ) || {

      codEnabled: true,

      upiEnabled: true,

      upiId: "",

      upiName: "",

      qrCode: "",

    };

  // ==========================
  // ADDRESS
  // ==========================

  const [address, setAddress] =
    useState({

      fullName: "",

      mobile: "",

      address: "",

      city: "",

      state: "",

      pincode: "",

    });

  // ==========================
  // PAYMENT
  // ==========================

  const [paymentMethod, setPaymentMethod] =
    useState(

      paymentSettings.codEnabled
        ? "COD"
        : "UPI"

    );

  const [transactionId, setTransactionId] =
    useState("");

  // ==========================
  // ADDRESS CHANGE
  // ==========================

  const handleChange = (e) => {

    setAddress({

      ...address,

      [e.target.name]: e.target.value,

    });

  };

  // ==========================
  // PRICE CALCULATION
  // ==========================

  const subTotal = products.reduce(

    (sum, item) =>

      sum +

      (Number(item.price) || 0) *

      (Number(item.qty) || 1),

    0

  );

  const delivery =
    subTotal >= 1000 ? 0 : 99;

  const total =
    subTotal + delivery;

  // ==========================
  // PLACE ORDER
  // ==========================

  const handlePlaceOrder = () => {

    if (

      !address.fullName ||

      !address.mobile ||

      !address.address ||

      !address.city ||

      !address.state ||

      !address.pincode

    ) {

      alert("Please fill all address details.");

      return;

    }

    if (

      paymentMethod === "UPI" &&

      !transactionId.trim()

    ) {

      alert("Please enter Transaction ID.");

      return;

    }

    placeOrder(products, total);

    localStorage.removeItem("buyNowProduct");

    localStorage.removeItem("cartItems");

    alert("Order placed successfully!");

    navigate("/orders");

  };

  // ==========================
  // RETURN
  // ==========================

  return (
        <div className="checkout-page">

      <h1 className="checkout-title">
        Checkout
      </h1>

      <div className="checkout-container">

        {/* ==========================
            LEFT SIDE
        ========================== */}

        <div className="address-card">

          <h2>Delivery Address</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={address.mobile}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Complete Address"
            value={address.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleChange}
          />

        </div>

        {/* ==========================
            RIGHT SIDE
        ========================== */}

        <div className="summary-card">

          <h2>Order Summary</h2>

          {products.length === 0 ? (

            <p>Your cart is empty.</p>

          ) : (

            <>

              <div className="checkout-products">

                {products.map((item) => (

                  <div
                    className="checkout-item"
                    key={item._id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="checkout-image"
                    />

                    <div className="checkout-info">

                      <h3>{item.name}</h3>

                      <p>
                        Qty : {item.qty || 1}
                      </p>

                      <p>
                        ₹{item.price}
                      </p>

                    </div>

                    <div className="checkout-price">

                      ₹
                      {(Number(item.price) || 0) *
                        (Number(item.qty) || 1)}

                    </div>

                  </div>

                ))}

              </div>

              <hr />

              <div className="summary-row">

                <span>Subtotal</span>

                <span>₹{subTotal}</span>

              </div>

              <div className="summary-row">

                <span>Delivery</span>

                <span>

                  {delivery === 0
                    ? "FREE"
                    : `₹${delivery}`}

                </span>

              </div>

              <hr />

              <div className="summary-total">

                <span>Total Amount</span>

                <span>₹{total}</span>

              </div>

              {/* ==========================
                  PAYMENT
              ========================== */}

              <div className="payment-box">

                <h3>
                  Select Payment Method
                </h3>
                                {paymentSettings.codEnabled && (

                  <label className="payment-option">

                    <input
                      type="radio"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() =>
                        setPaymentMethod("COD")
                      }
                    />

                    Cash On Delivery

                  </label>

                )}

                {paymentSettings.upiEnabled && (

                  <label className="payment-option">

                    <input
                      type="radio"
                      value="UPI"
                      checked={paymentMethod === "UPI"}
                      onChange={() =>
                        setPaymentMethod("UPI")
                      }
                    />

                    UPI Payment

                  </label>

                )}

                {paymentMethod === "UPI" && (

                  <div className="upi-box">

                    <p>

                      <strong>UPI ID :</strong>{" "}

                      {paymentSettings.upiId ||
                        "Not Available"}

                    </p>

                    <p>

                      <strong>Name :</strong>{" "}

                      {paymentSettings.upiName ||
                        websiteSettings.websiteName ||
                        "Not Available"}

                    </p>

                    {paymentSettings.qrCode && (

                      <img
                        src={paymentSettings.qrCode}
                        alt="UPI QR"
                        className="upi-qr"
                      />

                    )}

                    <input
                      type="text"
                      placeholder="Enter Transaction ID"
                      value={transactionId}
                      onChange={(e) =>
                        setTransactionId(
                          e.target.value
                        )
                      }
                    />

                  </div>

                )}

              </div>

              <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
              >

                📦 Place Order

              </button>

            </>

          )}

        </div>

      </div>

    </div>

  );

};

export default CheckoutPage;