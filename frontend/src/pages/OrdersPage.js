import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import "./OrdersPage.css";

const OrdersPage = () => {

  const { orders } = useOrder();

  const navigate = useNavigate();

  return (

    <div className="orders-page">

      <h1 className="orders-title">

        📦 My Orders

      </h1>

      {orders.length === 0 ? (

        <div className="empty-orders">

          <h2>

            No Orders Yet

          </h2>

          <p>

            Start shopping and your orders will appear here.

          </p>

          <button

            className="shop-btn"

            onClick={() => navigate("/home")}

          >

            Continue Shopping

          </button>

        </div>

      ) : (

        <div className="orders-container">

          {orders.map((order, index) => {

            const total = order.items.reduce(

              (sum, item) =>

                sum + item.price * (item.qty || item.quantity || 1),

              0

            );

            return (

              <div

                className="order-card"

                key={index}

              >

                <div className="order-header">

                  <div>

                    <h2>

                      Order #{index + 1}

                    </h2>

                    <p>

                      {new Date(order.date).toLocaleString()}

                    </p>

                  </div>

                  <span className="status">

                    Delivered

                  </span>

                </div>

                <div className="order-products">
                                    {order.items.map((item, i) => (

                    <div
                      className="order-item"
                      key={i}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="order-image"
                      />

                      <div className="order-info">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          Qty :
                          {" "}
                          {item.qty || item.quantity || 1}
                        </p>

                        <p className="price">

                          ₹{item.price}

                        </p>

                      </div>

                      <div className="item-total">

                        ₹
                        {item.price *
                          (item.qty ||
                            item.quantity ||
                            1)}

                      </div>

                    </div>

                  ))}

                </div>

                <hr />

                <div className="order-footer">

                  <div>

                    <strong>

                      Payment

                    </strong>

                    <br />

                    Cash on Delivery

                  </div>

                  <div>

                    <strong>

                      Total

                    </strong>

                    <br />

                    <span className="grand-total">

                      ₹{total}

                    </span>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>

  );

};

export default OrdersPage;