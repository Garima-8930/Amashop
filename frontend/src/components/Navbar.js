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

  navigate("/home");

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
  // CLOSE MENU
  // ==========================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ==========================
  // RETURN
  // ==========================

  return (
        <nav className="navbar">

      {/* ================= LOGO ================= */}

      <div className="logo">
        <Link to="/" onClick={closeMenu}>
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
          placeholder="Search Products..."
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

      {/* ================= NAVIGATION ================= */}

      <div
        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}
      >

        {/* HOME */}

        <Link to="/" onClick={closeMenu}>
          <FaHome /> Home
        </Link>

        {/* USER LINKS */}

        {user?.role === "user" && (
          <>
            <Link
              to="/cart"
              className="cart-link"
              onClick={closeMenu}
            >
              <FaShoppingCart />

              Cart

              {totalItems > 0 && (
                <span className="cart-badge">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/orders"
              onClick={closeMenu}
            >
              📦 My Orders
            </Link>
          </>
        )}

        {/* SELLER */}

        <Link
          to="/seller"
          onClick={closeMenu}
        >
          <FaStore />
          Seller
        </Link>

        {/* ADMIN */}

        <Link
          to="/admin"
          onClick={closeMenu}
        >
          <FaUserShield />
          Admin
        </Link>

        {/* LOGIN */}

        {!user && (
          <Link
            to="/login"
            onClick={closeMenu}
          >
            Login
          </Link>
        )}

        {/* PROFILE */}

        {user && (

          <div className="profile-section">

            <div className="user-name">

              <FaUserCircle />

              <span>

                Hi, {user.name}

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