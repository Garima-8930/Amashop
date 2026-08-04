// src/pages/LoginPage.js

import React, { useState } from "react";

const LoginPage = () => {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = () => {

    // =========================
    // ADMIN LOGIN
    // =========================

    if (

      email === "garima@gmail.com" &&

      password === "8930664976"

    ) {

      const admin = {

        name: "Garima",

        email,

        role: "admin",

      };

      localStorage.setItem(
        "user",
        JSON.stringify(admin)
      );

      window.location.href = "/admin";

      return;

    }

    // =========================
    // SELLER LOGIN
    // =========================

    if (

      email.endsWith("@seller.com") &&

      password.length >= 4

    ) {

      const seller = {

        name: email.split("@")[0],

        email,

        role: "seller",

      };

      localStorage.setItem(
        "user",
        JSON.stringify(seller)
      );

      window.location.href = "/seller";

      return;

    }

    alert("Invalid Admin / Seller Credentials");

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>

          Admin / Seller Login

        </h2>

        <p style={styles.subtitle}>

          Users can browse the website without login.

        </p>

        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>

            setEmail(e.target.value)

          }

          style={styles.input}

        />

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>

            setPassword(e.target.value)

          }

          style={styles.input}

        />

        <button

          onClick={handleLogin}

          style={styles.button}

        >

          Login

        </button>

      </div>

    </div>

  );

};

const styles = {

  container: {

    height: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    background: "#0d0d0d",

  },

  card: {

    width: "380px",

    background: "#1b1b1b",

    padding: "35px",

    borderRadius: "12px",

    textAlign: "center",

  },

  title: {

    color: "#FFD700",

    marginBottom: "10px",

  },

  subtitle: {

    color: "#ccc",

    marginBottom: "25px",

  },

  input: {

    width: "100%",

    padding: "14px",

    marginBottom: "15px",

    borderRadius: "8px",

    border: "1px solid #444",

    background: "#111",

    color: "#fff",

  },

  button: {

    width: "100%",

    padding: "14px",

    border: "none",

    borderRadius: "8px",

    background: "#FFD700",

    color: "#111",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: "16px",

  },

};

export default LoginPage;