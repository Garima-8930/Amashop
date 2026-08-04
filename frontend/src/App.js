// src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";

import LoginPage from "./pages/LoginPage";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

function App() {

  return (

    <Router>

      <OrderProvider>

        <CartProvider>

          <Navbar />

          <Routes>

            {/* ================= HOME ================= */}

            <Route
              path="/"
              element={<Navigate to="/home" replace />}
            />

            <Route
              path="/home"
              element={<HomePage />}
            />

            {/* ================= USER ================= */}

            <Route
              path="/login"
              element={<LoginPage />}
            />

            {/* ================= CART ================= */}

            <Route
              path="/cart"
              element={<CartPage />}
            />

            <Route
              path="/checkout"
              element={<CheckoutPage />}
            />

            <Route
              path="/orders"
              element={<OrdersPage />}
            />

            {/* ================= SELLER ================= */}

            <Route
              path="/seller"
              element={<SellerDashboard />}
            />

            {/* ================= ADMIN ================= */}

            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            {/* ================= 404 ================= */}

            <Route
              path="*"
              element={<Navigate to="/home" replace />}
            />

          </Routes>

        </CartProvider>

      </OrderProvider>

    </Router>

  );

}

export default App;