import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`${API_URL}/admin/products`);
      setProducts(data);
    };
    const fetchOrders = async () => {
     const { data } = await axios.get(`${API_URL}/admin/orders`);
      setOrders(data);
    };
    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <h2 className="text-2xl font-semibold mb-2">Products</h2>
      <ul className="mb-6">
        {products.map((p) => (
          <li key={p._id}>{p.name} - ${p.price}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Orders</h2>
      <ul>
        {orders.map((o) => (
          <li key={o._id}>
            {o.user.name} - ${o.totalAmount} - {o.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
