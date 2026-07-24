// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  // अगर login ही नहीं है
  if (!user) {
    return <Navigate to="/welcome" />;
  }

  // अगर admin-only page है और user का role admin नहीं है
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // otherwise → access allowed
  return children;
};

export default PrivateRoute;
