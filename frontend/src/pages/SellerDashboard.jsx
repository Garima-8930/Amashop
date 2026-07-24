import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const SellerDashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // 🔐 ROLE GUARD
  useEffect(() => {
    if (!currentUser) {
      alert("Please login first ❌");
      navigate("/login");
      return;
    }

    if (currentUser.role !== "seller") {
      alert("Access denied ❌ Seller only");
      navigate("/home");
      return;
    }

    fetchProducts();
    // eslint-disable-next-line
  }, []);

  // 🔹 Fetch ONLY seller products
 const fetchProducts = async () => {
  try {
    const { data } = await axios.get(
      `${API_URL}/products`
    );

      const sellerProducts = data.filter(
        (p) => p.sellerEmail === currentUser.email
      );

      setProducts(sellerProducts);
    } catch (err) {
      console.error("Fetch products error:", err.message);
    }
  };

  // ➕ Add Product
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...newProduct,
        price: Number(newProduct.price),
        sellerEmail: currentUser.email,
      };

      await axios.post(
  `${API_URL}/products`,
  productData
);

      alert("Product added successfully ✅");

      setNewProduct({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
      });

      fetchProducts();
    } catch (err) {
      alert("Add product failed ❌");
      console.error(err.message);
    }
  };

  // ❌ Delete Product
  const handleDelete = async (id) => {
    try {
      await axios.delete(
  `${API_URL}/products/${id}`
);
      alert("Product deleted ✅");
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  // 🔙 Back to Home (RESET ROLE)
  const goBackHome = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...currentUser, role: "user" })
    );
    navigate("/home");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍️ Seller Dashboard</h1>

      <button
        onClick={goBackHome}
        style={{
          marginBottom: "20px",
          padding: "8px 14px",
          background: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ⬅ Back to Home
      </button>

      {/* ➕ ADD PRODUCT */}
      <form
        onSubmit={handleAdd}
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Name"
          required
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          required
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          required
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />

        <input
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              category: e.target.value,
            })
          }
        />

        <input
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              description: e.target.value,
            })
          }
        />

        <button
          type="submit"
          style={{
            background: "green",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>

      {/* 📦 PRODUCTS */}
      <h2>Your Products</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" align="center">
                No products added yet
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={p.image}
                    alt={p.name}
                    width="60"
                    height="60"
                  />
                </td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button
                    onClick={() => handleDelete(p._id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SellerDashboard;
