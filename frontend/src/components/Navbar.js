import React, {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaHome,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
  FaStore,
  FaUserShield,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";

import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const { cart } = useCart();

  // =====================================
  // STATES
  // =====================================

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem("user")
      )
    );

  // =====================================
  // LIVE USER UPDATE
  // =====================================

  useEffect(() => {

    const interval = setInterval(() => {

      setUser(

        JSON.parse(

          localStorage.getItem("user")

        )

      );

    }, 500);

    return () =>
      clearInterval(interval);

  }, []);

  // =====================================
  // CART COUNT
  // =====================================

  const totalItems = Array.isArray(cart)

    ? cart.reduce(

        (total, item) =>

          total +

          (item.quantity ||

            item.qty ||

            1),

        0

      )

    : 0;
      // =====================================
  // CLOSE MOBILE MENU
  // =====================================

  const closeMenu = () => {

    setMenuOpen(false);

  };

  // =====================================
  // LOGOUT
  // =====================================

  const logoutHandler = () => {

    localStorage.removeItem("user");

    setUser(null);

    closeMenu();

    navigate("/");

  };

  // =====================================
  // SEARCH
  // =====================================

  const handleSearch = (e) => {

    e.preventDefault();

    if (!search.trim()) return;

    navigate(

      `/search/${search.trim()}`

    );

    closeMenu();

  };

  // =====================================
  // LOGIN REQUIRED
  // =====================================

  const requireLogin = (path) => {

    if (!user) {

      navigate("/login", {

        state: {

          redirectTo: path,

        },

      });

      return;

    }

    navigate(path);

  };

  // =====================================
  // SELLER
  // =====================================

  const openSeller = () => {

    closeMenu();

    if (

      user?.role === "seller" ||

      user?.role === "admin"

    ) {

      navigate("/seller");

      return;

    }

    navigate("/login", {

      state: {

        role: "seller",

      },

    });

  };

  // =====================================
  // ADMIN
  // =====================================

  const openAdmin = () => {

    closeMenu();

    if (

      user?.role === "admin"

    ) {

      navigate("/admin");

      return;

    }

    navigate("/login", {

      state: {

        role: "admin",

      },

    });

  };
    // =====================================
  // HIDE NAVBAR ON LOGIN PAGE
  // =====================================

  if (location.pathname === "/login") {

    return null;

  }

  // =====================================
  // RETURN
  // =====================================

  return (

    <nav className="navbar">

      {/* ==========================
          LOGO
      ========================== */}

      <div className="logo">

        <Link
          to="/"
          onClick={closeMenu}
        >

          <span>AMA</span>SHOP

        </Link>

      </div>

      {/* ==========================
          SEARCH
      ========================== */}

      <form
        className="search-form"
        onSubmit={handleSearch}
      >

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button type="submit">

          <FaSearch />

        </button>

      </form>

      {/* ==========================
          MOBILE MENU
      ========================== */}

      <button
        className="menu-btn"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >

        {menuOpen
          ? <FaTimes />
          : <FaBars />}

      </button>

      {/* ==========================
          NAVIGATION
      ========================== */}

      <div
        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}
      >

        {/* HOME */}

        <Link
          to="/"
          onClick={closeMenu}
        >

          <FaHome />

          Home

        </Link>

        {/* CART */}

        <button
          className="nav-btn"
          onClick={() =>
            requireLogin("/cart")
          }
        >

          <FaShoppingCart />

          Cart

          {totalItems > 0 && (

            <span className="cart-badge">

              {totalItems}

            </span>

          )}

        </button>

        {/* ORDERS */}

        <button
          className="nav-btn"
          onClick={() =>
            requireLogin("/orders")
          }
        >

          📦 Orders

        </button>
                {/* SELLER */}

        <button
          className="nav-btn"
          onClick={openSeller}
        >
          <FaStore />
          Seller Dashboard
        </button>

        {/* ADMIN */}

        <button
          className="nav-btn"
          onClick={openAdmin}
        >
          <FaUserShield />
          Admin Dashboard
        </button>

        {/* LOGIN */}

        {!user && (

          <button
            className="login-btn"
            onClick={() => {

              closeMenu();

              navigate("/login");

            }}
          >

            Login

          </button>

        )}

        {/* USER */}

        {user && (

          <div className="profile-section">

            <div className="user-name">

              <FaUserCircle />

              <span>

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