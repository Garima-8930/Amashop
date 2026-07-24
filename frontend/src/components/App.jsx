import React, { useEffect, useState } from "react";
import API_URL from "../config";

function App() {
  const [products, setProducts] = useState([]);
useEffect(() => {
  fetch(`${API_URL}/products`)
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => console.error(err));
}, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>⚡ ElectroShop ⚡</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              background: "#f9f9f9",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <h3>{p.name}</h3>
            <p style={{ color: "gray" }}>{p.brand}</p>
            <p style={{ fontWeight: "bold" }}>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
