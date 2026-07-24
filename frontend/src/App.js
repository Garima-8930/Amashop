// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import { CartProvider } from "./context/CartContext";
import OrdersPage from "./pages/OrdersPage";
import { OrderProvider } from "./context/OrderContext";
import CheckoutPage from "./pages/CheckoutPage";

function AppContent() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* ❌ Login page par Navbar nahi dikhega */}
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 👤 User */}
        <Route
          path="/home"
          element={user?.role === "user" ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* 🛒 Cart */}
        <Route
          path="/cart"
          element={user?.role === "user" ? <CartPage /> : <Navigate to="/login" />}
        />
{/* 📦 Orders */}
<Route
  path="/orders"
  element={
    user?.role === "user"
      ? <OrdersPage />
      : <Navigate to="/login" />
  }
/>
{/* 💳 Checkout */}
<Route
  path="/checkout"
  element={
    user?.role === "user"
      ? <CheckoutPage />
      : <Navigate to="/login" />
  }
/>
        {/* 🛍 Seller */}
        <Route
          path="/seller"
          element={user?.role === "seller" ? <SellerDashboard /> : <Navigate to="/login" />}
        />

        {/* 👑 Admin */}
        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        {/* 🔑 Login */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <OrderProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </OrderProvider>
    </Router>
  );
}

export default App;
