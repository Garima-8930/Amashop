// src/pages/OrdersPage.jsx

import React, {

  useMemo,

} from "react";

import {

  useNavigate,

} from "react-router-dom";

import {

  useOrder,

} from "../context/OrderContext";

import "./OrdersPage.css";

const OrdersPage = () => {

  const navigate =

    useNavigate();

  const { orders } =

    useOrder();

  const user =

    JSON.parse(

      localStorage.getItem(

        "user"

      )

    );

  // =====================================
  // USER ORDERS
  // =====================================

  const myOrders = useMemo(() => {

    if (!user)

      return [];

    return orders.filter(

      (order) =>

        order.customer?.email ===

        user.email

    );

  }, [

    orders,

    user,

  ]);
    // =====================================
  // RETURN
  // =====================================

  return (

    <div className="orders-page">

      <h1 className="orders-title">

        📦 My Orders

      </h1>

      {myOrders.length === 0 ? (

        <div className="empty-orders">

          <h2>

            No Orders Found

          </h2>

          <p>

            You haven't placed any orders yet.

          </p>

          <button
            className="shop-btn"
            onClick={() =>
              navigate("/home")
            }
          >

            Continue Shopping

          </button>

        </div>

      ) : (

        <div className="orders-container">

          {myOrders.map((order) => (

            <div
              className="order-card"
              key={order.orderId}
            >

              {/* ==========================
                  ORDER HEADER
              ========================== */}

              <div className="order-header">

                <div>

                  <h2>

                    Order ID

                  </h2>

                  <p>

                    {order.orderId}

                  </p>

                  <small>

                    {order.orderDate}

                  </small>

                </div>

                <div
                  className={`status ${order.orderStatus?.toLowerCase()}`}
                >

                  {order.orderStatus}

                </div>

              </div>
                            {/* ==========================
                  CUSTOMER DETAILS
              ========================== */}

              <div className="customer-details">

                <div className="detail-box">

                  <h3>

                    👤 Customer

                  </h3>

                  <p>

                    <strong>Name:</strong>{" "}

                    {order.customer?.name}

                  </p>

                  <p>

                    <strong>Email:</strong>{" "}

                    {order.customer?.email}

                  </p>

                  <p>

                    <strong>Mobile:</strong>{" "}

                    {order.customer?.mobile}

                  </p>

                </div>

                <div className="detail-box">

                  <h3>

                    🚚 Delivery Address

                  </h3>

                  <p>

                    {order.address?.address}

                  </p>

                  <p>

                    {order.address?.city},{" "}

                    {order.address?.state}

                  </p>

                  <p>

                    PIN : {order.address?.pincode}

                  </p>

                </div>

              </div>

              {/* ==========================
                  PAYMENT
              ========================== */}

              <div className="payment-details">

                <div>

                  <strong>

                    Payment Method

                  </strong>

                  <p>

                    {order.paymentMethod}

                  </p>

                </div>

                <div>

                  <strong>

                    Payment Status

                  </strong>

                  <p>

                    {order.paymentStatus}

                  </p>

                </div>

                {order.paymentMethod === "UPI" && (

                  <div>

                    <strong>

                      Transaction ID

                    </strong>

                    <p>

                      {order.transactionId}

                    </p>

                  </div>

                )}

              </div>

              {/* ==========================
                  PRODUCTS
              ========================== */}

              <div className="order-products">

                {order.products?.map((product) => (

                  <div
                    className="order-item"
                    key={product._id}
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      className="order-image"
                    />

                    <div className="order-info">

                      <h3>

                        {product.name}

                      </h3>

                      <p>

                        Qty : {product.qty || 1}

                      </p>

                      <p>

                        ₹{product.price}

                      </p>

                    </div>

                    <div className="item-total">

                      ₹

                      {(Number(product.price) || 0) *

                        (Number(product.qty) || 1)}

                    </div>

                  </div>

                ))}

              </div>
                            <hr />

              {/* ==========================
                  ORDER SUMMARY
              ========================== */}

              <div className="order-summary">

                <div className="summary-row">

                  <span>

                    Subtotal

                  </span>

                  <span>

                    ₹{order.subTotal}

                  </span>

                </div>

                <div className="summary-row">

                  <span>

                    Delivery Charge

                  </span>

                  <span>

                    {order.deliveryCharge === 0

                      ? "FREE"

                      : `₹${order.deliveryCharge}`}

                  </span>

                </div>

                <div className="summary-row">

                  <span>

                    Discount

                  </span>

                  <span>

                    - ₹{order.discount}

                  </span>

                </div>

                <hr />

                <div className="summary-total">

                  <span>

                    Grand Total

                  </span>

                  <span>

                    ₹{order.total}

                  </span>

                </div>

              </div>

              {/* ==========================
                  ORDER FOOTER
              ========================== */}

              <div className="order-footer">

                <div>

                  <strong>

                    Order Status

                  </strong>

                  <p>

                    {order.orderStatus}

                  </p>

                </div>

                <div>

                  <strong>

                    Payment Status

                  </strong>

                  <p>

                    {order.paymentStatus}

                  </p>

                </div>

              </div>

            </div>

          ))}
                  </div>

      )}

    </div>

  );

};

export default OrdersPage;