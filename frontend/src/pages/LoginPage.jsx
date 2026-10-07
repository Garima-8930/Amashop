// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // =====================================
  // STATES
  // =====================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================
  // LOGIN ROLE
  // =====================================

  const loginRole = location.state?.role || "user";

  const redirectTo = location.state?.redirectTo || "/home";

  // =====================================
  // SAVE USER
  // =====================================

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  // =====================================
  // SAVE USERS LIST
  // =====================================

  const saveUserList = (user) => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const existingIndex = users.findIndex(
      (u) => u.email === user.email
    );

    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );
  };

  // =====================================
  // LOGIN
  // =====================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter email.");
      return;
    }

    if (!password.trim()) {
      alert("Please enter password.");
      return;
    }

    setLoading(true);

    // =====================================
    // ADMIN LOGIN
    // =====================================

    if (loginRole === "admin") {
      const ADMIN_EMAIL = "garima@gmail.com";
      const ADMIN_PASSWORD = "8930664976";

      if (
        email.trim().toLowerCase() !==
          ADMIN_EMAIL ||
        password !== ADMIN_PASSWORD
      ) {
        alert("Invalid Admin Credentials");
        setLoading(false);
        return;
      }

      const adminUser = {
        name: "Admin",
        email: ADMIN_EMAIL,
        role: "admin",
      };

      saveUser(adminUser);
      saveUserList(adminUser);

      navigate("/admin", {
        replace: true,
      });

      return;
    }

    // =====================================
    // SELLER LOGIN
    // =====================================

    if (loginRole === "seller") {
      // Any seller can login with their own
      // email and password.

      const sellerUser = {
        name: email
          .split("@")[0]
          .replace(/[._-]/g, " "),
        email: email.trim().toLowerCase(),
        role: "seller",
      };

      saveUser(sellerUser);
      saveUserList(sellerUser);

      navigate("/seller", {
        replace: true,
      });

      return;
    }

    // =====================================
    // NORMAL USER LOGIN
    // =====================================

    const user = {
      name: email
        .split("@")[0]
        .replace(/[._-]/g, " "),
      email: email.trim().toLowerCase(),
      role: "user",
    };

    saveUser(user);
    saveUserList(user);

    navigate(redirectTo, {
      replace: true,
    });
  };

  // =====================================
  // PAGE
  // =====================================

  return (
    <div className="login-page">
      <div className="login-card">

        {/* ===============================
            HEADER
        =============================== */}

        <div className="login-header">
          <h1>
            {loginRole === "admin"
              ? "👑 Admin Login"
              : loginRole === "seller"
              ? "🛍 Seller Login"
              : "👤 User Login"}
          </h1>

          <p>
            {loginRole === "admin"
              ? "Authorized administrators only."
              : loginRole === "seller"
              ? "Seller login – use your own account."
              : "Login to continue shopping."}
          </p>
        </div>

        {/* ===============================
            LOGIN FORM
        =============================== */}

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          {/* EMAIL */}

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          {/* PASSWORD */}

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "Please Wait..."
              : "Login"}
          </button>

          {/* INFO */}

          <div className="login-info">

            {loginRole === "admin" ? (
              <p>
                🔒 Admin access is restricted.
              </p>
            ) : loginRole === "seller" ? (
              <p>
                🛍 Sellers can login using their
                own email and password.
              </p>
            ) : (
              <p>
                🛒 Login to use Cart, Buy Now,
                Checkout and Orders.
              </p>
            )}

          </div>

        </form>

        {/* ===============================
            FOOTER
        =============================== */}

        <div className="login-footer">
          <button
            className="back-home-btn"
            onClick={() => navigate("/home")}
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;