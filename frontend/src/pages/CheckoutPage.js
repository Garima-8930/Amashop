// src/pages/CheckoutPage.jsx

import React, {
  useState,
  useMemo,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import { useOrder } from "../context/OrderContext";

import "./CheckoutPage.css";

const CheckoutPage = () => {

  const navigate = useNavigate();

  const { placeOrder } = useOrder();

  // =====================================
  // CURRENT USER
  // =====================================

  const user = JSON.parse(

    localStorage.getItem("user")

  );

  // =====================================
  // LOGIN CHECK
  // =====================================

  useEffect(() => {

    if (!user) {

      alert(

        "Please login to continue."

      );

      navigate("/login", {

        state: {

          redirectTo: "/checkout",

        },

      });

    }

  }, []);

  // =====================================
  // PRODUCTS
  // =====================================

  const buyNowProduct =

    JSON.parse(

      localStorage.getItem(

        "buyNowProduct"

      )

    );

  const cartItems =

    JSON.parse(

      localStorage.getItem(

        "cartItems"

      )

    ) || [];

  const products =

    buyNowProduct

      ? [buyNowProduct]

      : cartItems;

  // =====================================
  // WEBSITE SETTINGS
  // =====================================

  const websiteSettings =

    JSON.parse(

      localStorage.getItem(

        "websiteSettings"

      )

    ) || {};

  // =====================================
  // PAYMENT SETTINGS
  // =====================================

  const paymentSettings =

    JSON.parse(

      localStorage.getItem(

        "paymentSettings"

      )

    ) || {

      codEnabled: true,

      upiEnabled: true,

      upiId: "",

      upiName: "",

      qrCode: "",

    };
      // =====================================
  // ADDRESS
  // =====================================

  const [address, setAddress] =
    useState({

      fullName:
        user?.name || "",

      email:
        user?.email || "",

      mobile: "",

      address: "",

      city: "",

      state: "",

      pincode: "",

    });

  // =====================================
  // PAYMENT
  // =====================================

  const [paymentMethod, setPaymentMethod] =
    useState(

      paymentSettings.codEnabled

        ? "COD"

        : "UPI"

    );

  const [transactionId, setTransactionId] =
    useState("");

  // =====================================
  // ORDER DETAILS
  // =====================================

  const orderId = useMemo(() => {

    return (

      "AMA" +

      Date.now()

    );

  }, []);

  const orderDate = useMemo(() => {

    return new Date().toLocaleString();

  }, []);

  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (e) => {

    const {

      name,

      value,

    } = e.target;

    setAddress((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

  // =====================================
  // VALIDATION
  // =====================================

  const validateForm = () => {

    if (

      !address.fullName ||

      !address.mobile ||

      !address.address ||

      !address.city ||

      !address.state ||

      !address.pincode

    ) {

      alert(

        "Please fill all delivery details."

      );

      return false;

    }

    if (

      paymentMethod === "UPI" &&

      !transactionId.trim()

    ) {

      alert(

        "Please enter Transaction ID."

      );

      return false;

    }

    return true;

  };
    // =====================================
  // PRICE CALCULATION
  // =====================================

  const subTotal = useMemo(() => {

    return products.reduce(

      (total, item) =>

        total +

        (Number(item.price) || 0) *

        (Number(item.qty) || 1),

      0

    );

  }, [products]);

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
  // PLACE ORDER
  // =====================================

  const handlePlaceOrder = () => {

    if (!validateForm()) return;

    const order = {

      orderId,

      orderDate,

      customer: {

        name: address.fullName,

        email: address.email,

        mobile: address.mobile,

      },

      address: {

        address: address.address,

        city: address.city,

        state: address.state,

        pincode: address.pincode,

      },

      products,

      paymentMethod,

      transactionId:

        paymentMethod === "UPI"

          ? transactionId

          : "N/A",

      paymentStatus:

        paymentMethod === "COD"

          ? "Pending"

          : "Paid",

      orderStatus: "Pending",

      subTotal,

      deliveryCharge,

      discount,

      total,

    };

    // =====================================
    // SAVE USING CONTEXT
    // =====================================

    placeOrder(order);

    // =====================================
    // SAVE LOCAL ORDERS
    // =====================================

    const oldOrders =

      JSON.parse(

        localStorage.getItem("orders")

      ) || [];

    oldOrders.push(order);

    localStorage.setItem(

      "orders",

      JSON.stringify(oldOrders)

    );

    // =====================================
    // CLEAR CART
    // =====================================

    localStorage.removeItem(

      "cartItems"

    );

    localStorage.removeItem(

      "buyNowProduct"

    );

    alert(

      "Order placed successfully."

    );

    navigate("/orders");

  };
    // =====================================
  // RETURN
  // =====================================

  return (

    <div className="checkout-page">

      <h1 className="checkout-title">

        Secure Checkout

      </h1>

      <div className="checkout-container">

        {/* ==========================
            ORDER SUMMARY
        ========================== */}

        <div className="summary-card">

          <h2>

            🛒 Order Summary

          </h2>

          {products.length === 0 ? (

            <p>

              No products available.

            </p>

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

                      <h3>

                        {item.name}

                      </h3>

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

                  Grand Total

                </span>

                <span>

                  ₹{total}

                </span>

              </div>

            </>

          )}

        </div>
                {/* ==========================
            DELIVERY ADDRESS
        ========================== */}

        <div className="address-card">

          <h2>

            🚚 Delivery Address

          </h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={address.email}
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

          {/* ==========================
              PAYMENT
          ========================== */}

          <div className="payment-box">

            <h3>

              💳 Payment Method

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

                  <strong>

                    UPI ID :

                  </strong>{" "}

                  {paymentSettings.upiId ||

                    "Not Available"}

                </p>

                <p>

                  <strong>

                    Name :

                  </strong>{" "}

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

            📦 Place Order • ₹{total}

          </button>

        </div>
              </div>

    </div>

  );

};

export default CheckoutPage;