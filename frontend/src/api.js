import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AdminProducts from "./pages/AdminProducts"; // ✅ import admin page
import { useAuth } from "./context/AuthContext";

const AppContent = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<Cart />} />

      {/* ✅ Admin-only route */}
      <Route
        path="/admin"
        element={
          user && user.role === "admin" ? (
            <AdminProducts />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
