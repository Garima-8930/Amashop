// src/App.js

import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";

import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

// =====================================================
// GET CURRENT USER
// =====================================================

const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  } catch (error) {
    console.error("Invalid user data:", error);

    localStorage.removeItem("user");

    return null;
  }
};

// =====================================================
// PROTECTED ROUTE
// =====================================================

const ProtectedRoute = ({ allowedRole, children }) => {
  const location = useLocation();

  const user = getCurrentUser();

  // No user logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          redirectTo: location.pathname,
          role: allowedRole,
        }}
        replace
      />
    );
  }

  // User exists but wrong role
  if (user.role !== allowedRole) {
    alert(
      `Access denied ❌ ${allowedRole} only`
    );

    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

  // Correct role
  return children;
};

// =====================================================
// USER ROUTE
// =====================================================

const UserRoute = ({ children }) => {
  const location = useLocation();

  const user = getCurrentUser();

  // User can access these pages even without login.
  // Login requirement can be handled by the individual pages.
  if (!user) {
    return children;
  }

  // Admin/Seller should not be treated as normal user
  if (
    user.role === "admin" ||
    user.role === "seller"
  ) {
    return children;
  }

  return children;
};

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <Router>
      <OrderProvider>
        <CartProvider>

          {/* ==========================
              GLOBAL NAVBAR
          ========================== */}

          <Navbar />

          {/* ==========================
              ROUTES
          ========================== */}

          <Routes>

            {/* ==========================
                DEFAULT
            ========================== */}

            <Route
              path="/"
              element={
                <Navigate
                  to="/home"
                  replace
                />
              }
            />

            {/* ==========================
                HOME
            ========================== */}

            <Route
              path="/home"
              element={
                <HomePage />
              }
            />

            {/* ==========================
                LOGIN
            ========================== */}

            <Route
              path="/login"
              element={
                <LoginPage />
              }
            />

            {/* ==========================
                USER ROUTES
            ========================== */}

            <Route
              path="/cart"
              element={
                <UserRoute>
                  <CartPage />
                </UserRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <UserRoute>
                  <CheckoutPage />
                </UserRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <UserRoute>
                  <OrdersPage />
                </UserRoute>
              }
            />

            {/* ==========================
                SELLER ROUTE
            ========================== */}

            <Route
              path="/seller"
              element={
                <ProtectedRoute allowedRole="seller">
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />

            {/* ==========================
                ADMIN ROUTE
            ========================== */}

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* ==========================
                PAGE NOT FOUND
            ========================== */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/home"
                  replace
                />
              }
            />

          </Routes>

        </CartProvider>
      </OrderProvider>
    </Router>
  );
}

export default App;