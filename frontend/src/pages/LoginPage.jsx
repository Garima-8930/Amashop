// src/pages/LoginPage.js
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    let role = "user";

    // 🔐 FIXED ADMIN LOGIN (HIDDEN)
    if (
      email === "garima@gmail.com" &&
      password === "8930664976"
    ) {
      role = "admin";
    } else if (email.includes("@gmail")) {
      role = "user";
    } else {
      alert("Invalid credentials ❌");
      return;
    }

    const user = {
      name: email.split("@")[0],
      email,
      role,
    };

    // 🔥 Save current user
    localStorage.setItem("user", JSON.stringify(user));

    // 🔥 Save users list (for Admin Dashboard)
    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = existingUsers.find(
      (u) => u.email === user.email
    );

    if (!alreadyExists) {
      existingUsers.push(user);
      localStorage.setItem(
        "users",
        JSON.stringify(existingUsers)
      );
    }

    // 🔀 Redirect
    if (role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/home";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to continue</p>

        <div style={styles.inputBox}>
          <span style={styles.icon}>📧</span>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputBox}>
          <span style={styles.icon}>🔒</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <button
          onClick={handleLogin}
          style={styles.button}
        >
          Login 🚀
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
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },

  card: {
    width: "350px",
    padding: "40px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    textAlign: "center",
  },

  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#fff",
  },

  subtitle: {
    color: "#eee",
    marginBottom: "25px",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.9)",
    borderRadius: "10px",
    marginBottom: "15px",
    padding: "10px",
  },

  icon: {
    marginRight: "8px",
  },

  input: {
    border: "none",
    outline: "none",
    width: "100%",
    background: "transparent",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "bold",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    background:
      "linear-gradient(135deg, #6a11cb, #2575fc)",
    marginTop: "10px",
  },
};

export default LoginPage;
