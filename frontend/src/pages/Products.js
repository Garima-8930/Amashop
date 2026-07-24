import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import API_URL from "../config";

const Products = () => {
  const { addToCart, getCurrentUserCart } = useCart();
  const cart = getCurrentUserCart();   // ✅ ab sahi cart milega
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchProducts();
}, []);

  const increaseQty = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));

  const decreaseQty = (id) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));

  const isInCart = (id) =>
    Array.isArray(cart) && cart.some((item) => item._id === id);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "10px",
              width: "220px",
              textAlign: "center",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <button onClick={() => decreaseQty(p._id)}>-</button>
              <span>{quantities[p._id]}</span>
              <button onClick={() => increaseQty(p._id)}>+</button>
            </div>

            <button
              onClick={() =>
                addToCart({ ...p, quantity: quantities[p._id] })
              }
              disabled={isInCart(p._id)}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: isInCart(p._id) ? "not-allowed" : "pointer",
                fontWeight: "bold",
                backgroundColor: isInCart(p._id) ? "gray" : "green",
                color: "#fff",
              }}
            >
              {isInCart(p._id) ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
