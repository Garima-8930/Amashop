// src/pages/ProductsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";

const ProductsPage = () => {
  const { addToCart } = useCart();
  const { addOrder } = useOrder();
  const [products, setProducts] = useState([]);

  // fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 👇 ab proxy ka use karenge (sirf /api/products likhna hai)
        const { data } = await axios.get("/api/products");
        console.log("Fetched products:", data); // debug ke liye
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Order Now → direct order
  const handleOrderNow = (product) => {
    const newOrder = {
      id: Date.now(),
      items: [{ ...product, quantity: 1 }],
      total: product.price,
      date: new Date().toLocaleString(),
    };
    addOrder(newOrder);
    alert(`${product.name} ordered successfully!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>📦 Products</h2>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id} // mongo se _id aa raha hai
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <h3>{product.name}</h3>
              <p style={{ color: "#555", fontSize: "14px" }}>
                {product.description}
              </p>
              <p style={{ fontWeight: "bold" }}>₹{product.price}</p>

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    marginRight: "10px",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "blue",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => handleOrderNow(product)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "green",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
