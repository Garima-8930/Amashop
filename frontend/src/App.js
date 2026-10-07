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
import LoginPage from "./pages/LoginPage";

import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";

import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

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
                <CartPage />
              }
            />

            <Route
              path="/checkout"
              element={
                <CheckoutPage />
              }
            />

            <Route
              path="/orders"
              element={
                <OrdersPage />
              }
            />

            {/* ==========================
                SELLER
            ========================== */}

            <Route
              path="/seller"
              element={
                <SellerDashboard />
              }
            />

            {/* ==========================
                ADMIN
            ========================== */}

            <Route
              path="/admin"
              element={
                <AdminDashboard />
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