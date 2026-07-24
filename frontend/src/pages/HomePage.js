import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import API_URL from "../config";

const HomePage = () => {

  const navigate = useNavigate();

  // ==========================
  // PRODUCTS
  // ==========================

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  // ==========================
  // WEBSITE SETTINGS
  // ==========================

  const [settings, setSettings] =
    useState({

      websiteName: "AMASHOP",

      heroTitle:
        "Premium Electronics Store",

      heroSubtitle:
        "Discover Premium Electronics at Best Prices",

      contact: "",

      email: "",

      upiId: "",

      upiName: "",

      qrCode: "",

    });

  // ==========================
  // CART
  // ==========================

  const [cart, setCart] =
    useState(

      JSON.parse(
        localStorage.getItem("cartItems")
      ) || []

    );

  // ==========================
  // USER
  // ==========================

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // ==========================
  // LOAD WEBSITE SETTINGS
  // ==========================

  useEffect(() => {

    const savedSettings =
      JSON.parse(

        localStorage.getItem(
          "websiteSettings"
        )

      );

    if (savedSettings) {

      setSettings(savedSettings);

    }

  }, []);

  // ==========================
  // FETCH PRODUCTS
  // ==========================

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          await axios.get(`${API_URL}/products`);

          setProducts(data);

          setFilteredProducts(data);

        } catch (err) {

          console.error(err);

          setError(
            "Unable to load products."
          );

        } finally {

          setLoading(false);

        }

      };

    fetchProducts();

  }, []);

  // ==========================
  // SEARCH
  // ==========================

  useEffect(() => {

    const result =
      products.filter((item) =>
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    setFilteredProducts(result);

  }, [search, products]);

  // ==========================
  // ADD TO CART
  // ==========================

  const addToCart =
    (product) => {

      const exist =
        cart.find(
          (item) =>
            item._id === product._id
        );

      let updatedCart = [];

      if (exist) {

        updatedCart =
          cart.map((item) =>

            item._id === product._id

              ? {
                  ...item,
                  qty: item.qty + 1,
                }

              : item

          );

      } else {

        updatedCart = [

          ...cart,

          {
            ...product,
            qty: 1,
          },

        ];

      }

      setCart(updatedCart);

      localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedCart)
      );

    };

  // ==========================
  // BUY NOW
  // ==========================

  const buyNow =
    (product) => {

      localStorage.setItem(

        "buyNowProduct",

        JSON.stringify({

          ...product,

          qty: 1,

        })

      );

      navigate("/checkout");

    };

  // ==========================
  // CART CHECK
  // ==========================

  const isAdded =
    (id) => {

      return cart.some(

        (item) =>
          item._id === id

      );

    };

  // ==========================
  // SELLER
  // ==========================

  const openSellerDashboard =
    () => {

      if (!user) {

        alert(
          "Please Login First"
        );

        return;

      }

      if (
        user.role === "admin"
      ) {

        alert(
          "Admin can't become Seller"
        );

        return;

      }

      localStorage.setItem(

        "user",

        JSON.stringify({

          ...user,

          role: "seller",

        })

      );

      navigate("/seller");

    };

  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (
      <div className="loading">
        Loading Products...
      </div>
    );

  }

  if (error) {

    return (
      <div className="error">
        {error}
      </div>
    );

  }

  // ==========================
  // RETURN
  // ==========================

  return (
    <div className="home-page">

  {/* ================= HERO ================= */}

  <section className="hero-section">

    <div className="hero-content">

      <h1 className="hero-title">
        {settings.websiteName}
      </h1>

      <h2 className="hero-heading">
        {settings.heroTitle}
      </h2>

      <p className="hero-subtitle">
        {settings.heroSubtitle}
      </p>

    </div>

    <div className="search-box">

      <input
        type="text"
        placeholder="🔍 Search Products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

    </div>

  </section>

  {/* ================= SELLER ================= */}

  {user?.role === "user" && (

    <section className="seller-banner">

      <div>

        <h2>
          Become a Seller 🚀
        </h2>

        <p>

          Sell your products on
          {" "}
          {settings.websiteName}

          {" "}
          and grow your business.

        </p>

      </div>

      <button
        className="seller-btn"
        onClick={openSellerDashboard}
      >
        Seller Dashboard
      </button>

    </section>

  )}

  {/* ================= PRODUCTS ================= */}

  <h2 className="section-title">

    Featured Products

  </h2>

  <div className="products-grid">

    {filteredProducts.length === 0 ? (

      <div className="no-product">

        No Products Available

      </div>

    ) : (

      filteredProducts.map((product) => (

        <div
          key={product._id}
          className="product-card"
        >

          <span className="discount-badge">

            SALE

          </span>

          <div className="image-box">

            <img
              src={product.image}
              alt={product.name}
              className="product-img"
            />

          </div>

          <h3>

            {product.name}

          </h3>

          <div className="rating">

            ⭐⭐⭐⭐⭐

            <span>
              {" "}
              (4.8)
            </span>

          </div>

          <p className="description">

            {product.description}

          </p>

          <div className="price-box">

            <span className="price">

              ₹{product.price}

            </span>

          </div>

          <p className="delivery">

            🚚 Free Delivery

          </p>

          <div className="product-buttons">

            <button
              className="cart-btn"
              onClick={() =>
                addToCart(product)
              }
              disabled={isAdded(product._id)}
            >

              {isAdded(product._id)

                ? "✔ Added"

                : "🛒 Add to Cart"}

            </button>

            <button
              className="buy-btn"
              onClick={() =>
                buyNow(product)
              }
            >

              ⚡ Buy Now

            </button>

          </div>

        </div>

      ))

    )}

  </div>
        {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-left">

          <h2>
            {settings.websiteName}
          </h2>

          <p>

            {settings.heroSubtitle}

          </p>

        </div>

        <div className="footer-center">

          <h3>
            Contact Us
          </h3>

          <p>
            📞 {settings.contact || "Not Available"}
          </p>

          <p>
            📧 {settings.email || "Not Available"}
          </p>

        </div>

        <div className="footer-right">

          <h3>
            Payment Details
          </h3>

          <p>

            <strong>UPI ID :</strong>

            {" "}

            {settings.upiId || "Not Available"}

          </p>

          <p>

            <strong>Name :</strong>

            {" "}

            {settings.upiName || "Not Available"}

          </p>

          {settings.qrCode && (

            <img
              src={settings.qrCode}
              alt="QR Code"
              className="footer-qr"
            />

          )}

        </div>

      </footer>

      {/* ================= COPYRIGHT ================= */}

      <div className="copyright">

        © {new Date().getFullYear()}{" "}

        {settings.websiteName}

        {" "}

        | All Rights Reserved.

      </div>

    </div>

  );

};

export default HomePage;