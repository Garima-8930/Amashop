// src/pages/LoginPage.jsx

import React, {
  useState,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./LoginPage.css";

const LoginPage = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  // =====================================
  // STATES
  // =====================================

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // REDIRECT PATH
  // =====================================

  const redirectTo =

    location.state?.redirectTo ||

    "/";

  const loginRole =

    location.state?.role ||

    "user";

  // =====================================
  // SAVE USER
  // =====================================

  const saveUser = (user) => {

    localStorage.setItem(

      "user",

      JSON.stringify(user)

    );

  };

  // =====================================
  // SAVE USERS LIST
  // =====================================

  const saveUserList = (user) => {

    const users =

      JSON.parse(

        localStorage.getItem("users")

      ) || [];

    const exists = users.find(

      (u) =>

        u.email === user.email

    );

    if (!exists) {

      users.push(user);

      localStorage.setItem(

        "users",

        JSON.stringify(users)

      );

    }

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

    if (

      loginRole === "admin" ||

      (

        email === "garima@gmail.com" &&

        password === "8930664976"

      )

    ) {

      if (

        email !== "garima@gmail.com" ||

        password !== "8930664976"

      ) {

        alert("Invalid Admin Credentials");

        setLoading(false);

        return;

      }

      const adminUser = {

        name: "Admin",

        email,

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

      const sellerUser = {

        name: email.split("@")[0],

        email,

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
    // USER LOGIN
    // =====================================

    const user = {

      name: email.split("@")[0],

      email,

      role: "user",

    };

    saveUser(user);

    saveUserList(user);

    navigate(redirectTo, {

      replace: true,

    });

  };
    // =====================================
  // RETURN
  // =====================================

  return (

    <div className="login-page">

      <div className="login-card">

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

              ? "Sign in to manage your products."

              : "Login to continue shopping."}

          </p>

        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <div className="input-group">

            <label>

              Email Address

            </label>

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

          <div className="input-group">

            <label>

              Password

            </label>

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

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading

              ? "Please Wait..."

              : "Login"}

          </button>
                    <div className="login-info">

            {loginRole === "admin" ? (

              <p>

                🔒 Admin access is restricted.

              </p>

            ) : loginRole === "seller" ? (

              <p>

                🛍 Login to manage your products and orders.

              </p>

            ) : (

              <p>

                🛒 Login to access your Cart, Orders and Checkout.

              </p>

            )}

          </div>

        </form>

        <div className="login-footer">

          <button
            className="back-home-btn"
            onClick={() => navigate("/")}
          >

            ← Back to Home

          </button>

        </div>

      </div>

    </div>

  );

};

export default LoginPage;