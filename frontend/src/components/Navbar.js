import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaBars,
  FaTimes,
  FaStore,
  FaUserShield,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const { cart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // ==========================
  // LIVE USER UPDATE
  // ==========================

  useEffect(() => {
    const interval = setInterval(() => {
      setUser(JSON.parse(localStorage.getItem("user")));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // ==========================
  // CART COUNT
  // ==========================

  const totalItems = Array.isArray(cart)
    ? cart.reduce(
        (acc, item) => acc + (item.quantity || item.qty || 1),
        0
      )
    : 0;

  // ==========================
  // LOGOUT
  // ==========================

  const logoutHandler = () => {
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  // ==========================
  // SEARCH
  // ==========================

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/search/${search}`);

    setMenuOpen(false);
  };

  // ==========================
  // RETURN START
  // ==========================

  return (
        <nav className="navbar">

      {/* ================= LOGO ================= */}

      <div className="logo">

        <Link to="/home">
          <span>AMA</span>SHOP
        </Link>

      </div>

      {/* ================= SEARCH ================= */}

      <form
        className="search-form"
        onSubmit={handleSearch}
      >

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          <FaSearch />
        </button>

      </form>

      {/* ================= MOBILE MENU ================= */}

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* ================= NAV LINKS ================= */}

      <div
        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}
      >

        {/* USER */}

        {user?.role === "user" && (
          <>
            <Link
              to="/home"
              onClick={() => setMenuOpen(false)}
            >
              <FaHome /> Home
            </Link>

            <Link
              to="/cart"
              className="cart-link"
              onClick={() => setMenuOpen(false)}
            >
              <FaShoppingCart />

              Cart

              {totalItems > 0 && (
                <span className="cart-badge">
                  {totalItems}
                </span>
              )}
            </Link>
          </>
        )}
<Link
  to="/orders"
  onClick={() => setMenuOpen(false)}
>
  📦 My Orders
</Link>
        {/* SELLER */}

        {user?.role === "seller" && (
          <Link
            to="/seller"
            onClick={() => setMenuOpen(false)}
          >
            <FaStore />

            Seller Dashboard
          </Link>
        )}

        {/* ADMIN */}

        {user?.role === "admin" && (
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
          >
            <FaUserShield />

            Admin Dashboard
          </Link>
        )}

        {/* LOGIN */}

        {!user && (
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}

        {/* USER INFO */}

        {user && (

          <div className="profile-section">

            <div className="user-name">

              <FaUserCircle />

              <span>

                Hi,
                {" "}
                {user.name}

              </span>

            </div>

            <button
              className="logout-btn"
              onClick={logoutHandler}
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>

        )}

      </div>

    </nav>

  );
}

export default Navbar;