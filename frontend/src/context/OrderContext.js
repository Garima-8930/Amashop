// src/context/OrderContext.jsx

import React, {

  createContext,

  useContext,

  useEffect,

  useState,

} from "react";

const OrderContext =

  createContext();

export const OrderProvider = ({

  children,

}) => {

  const [orders, setOrders] =

    useState([]);

  // =====================================
  // LOAD ORDERS
  // =====================================

  useEffect(() => {

    const savedOrders =

      JSON.parse(

        localStorage.getItem(

          "orders"

        )

      ) || [];

    setOrders(savedOrders);

  }, []);

  // =====================================
  // SAVE ORDERS
  // =====================================

  useEffect(() => {

    localStorage.setItem(

      "orders",

      JSON.stringify(orders)

    );

  }, [

    orders,

  ]);
    // =====================================
  // PLACE ORDER
  // =====================================

  const placeOrder = (orderData) => {

    const newOrder = {

      orderId:

        orderData.orderId ||

        "AMA" + Date.now(),

      orderDate:

        orderData.orderDate ||

        new Date().toLocaleString(),

      customer:

        orderData.customer || {},

      address:

        orderData.address || {},

      products:

        orderData.products || [],

      paymentMethod:

        orderData.paymentMethod ||

        "COD",

      transactionId:

        orderData.transactionId ||

        "N/A",

      paymentStatus:

        orderData.paymentStatus ||

        "Pending",

      orderStatus:

        orderData.orderStatus ||

        "Pending",

      subTotal:

        orderData.subTotal || 0,

      deliveryCharge:

        orderData.deliveryCharge || 0,

      discount:

        orderData.discount || 0,

      total:

        orderData.total || 0,

    };

    setOrders((prevOrders) =>

      [...prevOrders, newOrder]

    );

    return newOrder;

  };
    // =====================================
  // UPDATE ORDER STATUS
  // =====================================

  const updateOrderStatus = (

    orderId,

    status

  ) => {

    setOrders((prevOrders) =>

      prevOrders.map((order) =>

        order.orderId === orderId

          ? {

              ...order,

              orderStatus: status,

            }

          : order

      )

    );

  };

  // =====================================
  // DELETE ORDER
  // =====================================

  const deleteOrder = (

    orderId

  ) => {

    setOrders((prevOrders) =>

      prevOrders.filter(

        (order) =>

          order.orderId !== orderId

      )

    );

  };

  // =====================================
  // GET ORDER BY ID
  // =====================================

  const getOrderById = (

    orderId

  ) => {

    return orders.find(

      (order) =>

        order.orderId === orderId

    );

  };

  // =====================================
  // CLEAR ORDERS
  // =====================================

  const clearOrders = () => {

    setOrders([]);

    localStorage.removeItem(

      "orders"

    );

  };
    // =====================================
  // CONTEXT PROVIDER
  // =====================================

  return (

    <OrderContext.Provider

      value={{

        orders,

        placeOrder,

        updateOrderStatus,

        deleteOrder,

        getOrderById,

        clearOrders,

      }}

    >

      {children}

    </OrderContext.Provider>

  );

};

// =====================================
// CUSTOM HOOK
// =====================================

export const useOrder = () =>

  useContext(OrderContext);