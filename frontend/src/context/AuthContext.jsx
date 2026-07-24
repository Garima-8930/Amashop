import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // ✅ Axios interceptor to catch expired tokens globally
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 ||
            error.response.data.message === "Not authorized, token failed" ||
            error.response.data.message === "jwt expired")
        ) {
          console.warn("Session expired. Logging out...");
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  // ✅ Load user from backend if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          console.error("Auth error:", err.response?.data?.message || err.message);
          logout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/users/login", { email, password });
      setUser(res.data);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      return true;
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      return false;
    }
  };

  // ✅ Register
  const register = async (name, email, password) => {
    try {
      const res = await axios.post("/api/users/register", { name, email, password });
      setUser(res.data);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      return true;
    } catch (err) {
      console.error("Registration failed:", err.response?.data?.message || err.message);
      return false;
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
