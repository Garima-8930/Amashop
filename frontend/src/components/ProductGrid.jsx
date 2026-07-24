import React, { useEffect, useState } from "react";
import { fetchProducts } from "./api";
import ProductCard from "./ProductCard";
import "./ProductGrid.css"; // ensure CSS is imported

export default function ProductGrid() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setData)
      .catch((e) => alert(e.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(data.map((p) => p.category))];

  const filtered = data.filter((p) => {
    const matchQ =
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.brand.toLowerCase().includes(q.toLowerCase());
    const matchCat = cat === "All" || p.category === cat;
    return matchQ && matchCat;
  });

  if (loading) return <p className="center">Loading products…</p>;

  return (
    <>
      <div className="filters">
        <input
          placeholder="Search products…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 👇 this wrapper MUST have className="product-grid" */}
      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </>
  );
}
