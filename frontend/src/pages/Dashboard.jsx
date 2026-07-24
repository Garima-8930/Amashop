// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import API_URL from "../config";

const Dashboard = () => {
  const { user, token } = useAuth(); // ✅ token use karenge protected routes ke liye
  const [products, setProducts] = useState([]);

  // 🔹 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(data);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};
    fetchProducts();
  }, []);

  // 🔹 Add Product (admin/seller only)
  const addProduct = async () => {
    const name = prompt("Enter product name:");
    const price = prompt("Enter product price:");
    const description = prompt("Enter product description:");
    const category = prompt("Enter product category:");
    const image = prompt("Enter image URL:");
    if (!name || !price || !description || !category || !image) return;
try {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, price, description, category, image }),
  });

      const data = await res.json();
      if (res.ok) {
        setProducts([...products, data]);
      } else {
        alert(data.msg || "Error adding product");
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // 🔹 Delete Product
 const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        const data = await res.json();
        alert(data.msg || "Error deleting product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  if (!user) {
    return <h2 style={{ padding: "20px" }}>⚠️ Please login first</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user.name}</h2>
      <h3>Role: {user.role}</h3>

      {/* ---------------- ADMIN ---------------- */}
      {user.role === "admin" && (
        <div>
          <h2>👑 Admin Dashboard</h2>
          <button onClick={addProduct}>Add Product</button>

          <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>{p.category}</td>
                  <td>
                    <button onClick={() => deleteProduct(p._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------------- SELLER ---------------- */}
      {user.role === "seller" && (
        <div>
          <h2>🏪 Seller Dashboard</h2>
          <button onClick={addProduct}>Add Product</button>
          <ul>
            {products.map((p) => (
              <li key={p._id}>
                {p.name} - ₹{p.price}{" "}
                <button onClick={() => deleteProduct(p._id)}>Delete</button>
              </li>
            ))}
            {products.length === 0 && <li>No products yet.</li>}
          </ul>
        </div>
      )}

      {/* ---------------- USER ---------------- */}
      {user.role === "user" && (
        <div>
          <h2>🙋 User Dashboard</h2>
          <p>Email: {user.email}</p>
          <p>Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
