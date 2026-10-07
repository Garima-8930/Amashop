// src/pages/AdminDashboard.jsx

import React, {
  useState,
  useEffect,
  useMemo,
} from "react";

import axios from "axios";

import API_URL from "../config";

import "./AdminDashboard.css";

const AdminDashboard = () => {

  // =====================================
  // ADMIN AUTHENTICATION
  // =====================================

  const admin = JSON.parse(

    localStorage.getItem("user")

  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {

  if (!admin || admin.role !== "admin") {

    alert("Access Denied");

    window.location.href = "/login";

  }

}, [admin]);
  // =====================================
  // DASHBOARD STATS
  // =====================================

  const [stats, setStats] =

    useState({

      totalUsers: 0,

      totalProducts: 0,

      totalOrders: 0,

      totalRevenue: 0,

    });

  // =====================================
  // USERS
  // =====================================

  const [users, setUsers] =

    useState([]);

  // =====================================
  // PRODUCTS
  // =====================================

  const [products, setProducts] =

    useState([]);

  const [editingProduct, setEditingProduct] =

    useState(null);

  const [newProduct, setNewProduct] =

    useState({

      name: "",

      price: "",

      category: "",

      image: "",

      description: "",

      sellerEmail:

        "admin@amashop.com",

    });

  // =====================================
  // ORDERS
  // =====================================

  const [orders, setOrders] =

    useState([]);

  // =====================================
  // WEBSITE SETTINGS
  // =====================================

  const [settings, setSettings] =

    useState({

      websiteName: "AMASHOP",

      heroTitle:

        "Premium Electronics Store",

      heroSubtitle:

        "Discover Premium Electronics at Best Prices",

      contact: "",

      email: "",

      adminUsername:

        "Administrator",

      adminPassword: "",

    });

  // =====================================
  // PAYMENT SETTINGS
  // =====================================

  const [

    paymentSettings,

    setPaymentSettings,

  ] = useState({

    codEnabled: true,

    upiEnabled: true,

    upiId: "",

    upiName: "",

    qrCode: "",

  });

  // =====================================
  // SEARCH
  // =====================================

  const [search, setSearch] =

    useState("");

  // =====================================
  // LOADING
  // =====================================

  const [loading, setLoading] =

    useState(true);

  // =====================================
  // QR CODE
  // =====================================

  const qrCode = useMemo(() => {

    if (

      !paymentSettings.upiId

    )

      return "";

    const upiLink =

      `upi://pay?pa=${paymentSettings.upiId}` +

      `&pn=${encodeURIComponent(

        paymentSettings.upiName

      )}`;

    return `https://quickchart.io/qr?text=${encodeURIComponent(

      upiLink

    )}`;

  }, [

    paymentSettings.upiId,

    paymentSettings.upiName,

  ]);
    // =====================================
  // FETCH USERS
  // =====================================

  const fetchUsers = async () => {

    try {

      const { data } = await axios.get(

        `${API_URL}/users`

      );

      setUsers(

        Array.isArray(data)

          ? data

          : []

      );

    } catch (error) {

      console.error(

        "Unable to load users",

        error

      );

      setUsers([]);

    }

  };

  // =====================================
  // FETCH PRODUCTS
  // =====================================

  const fetchProducts = async () => {

    try {

      const { data } = await axios.get(

        `${API_URL}/products`

      );

      setProducts(

        Array.isArray(data)

          ? data

          : []

      );

    } catch (error) {

      console.error(

        "Unable to load products",

        error

      );

      setProducts([]);

    }

  };

  // =====================================
  // FETCH ORDERS
  // =====================================

  const fetchOrders = async () => {

    try {

      const { data } = await axios.get(

        `${API_URL}/orders`

      );

      setOrders(

        Array.isArray(data)

          ? data

          : []

      );

    } catch (error) {

      console.error(

        "Unable to load orders",

        error

      );

      setOrders([]);

    }

  };

  // =====================================
  // LOAD WEBSITE SETTINGS
  // =====================================

  const loadWebsiteSettings = () => {

    const saved = JSON.parse(

      localStorage.getItem(

        "websiteSettings"

      )

    );

    if (saved) {

      setSettings(saved);

    }

  };

  // =====================================
  // LOAD PAYMENT SETTINGS
  // =====================================

  const loadPaymentSettings = () => {

    const saved = JSON.parse(

      localStorage.getItem(

        "paymentSettings"

      )

    );

    if (saved) {

      setPaymentSettings(saved);

    }

  };

  // =====================================
  // LOAD DASHBOARD
  // =====================================

  const loadDashboard = async () => {

    setLoading(true);

    await Promise.all([

      fetchUsers(),

      fetchProducts(),

      fetchOrders(),

    ]);

    loadWebsiteSettings();

    loadPaymentSettings();

    setLoading(false);

  };
    // =====================================
  // INITIAL LOAD
  // =====================================

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    loadDashboard();

  }, []);

  // =====================================
  // DASHBOARD STATISTICS
  // =====================================

  useEffect(() => {

    const revenue = orders.reduce(

      (sum, order) =>

        sum +

        Number(

          order.total ||

          order.totalAmount ||

          order.totalPrice ||

          0

        ),

      0

    );

    setStats({

      totalUsers: users.length,

      totalProducts: products.length,

      totalOrders: orders.length,

      totalRevenue: revenue,

    });

  }, [

    users,

    products,

    orders,

  ]);

  // =====================================
  // SEARCH PRODUCTS
  // =====================================

  const filteredProducts = useMemo(() => {

    return products.filter((product) =>

      product.name

        ?.toLowerCase()

        .includes(

          search.toLowerCase()

        )

    );

  }, [

    products,

    search,

  ]);

  // =====================================
  // SAVE WEBSITE SETTINGS
  // =====================================

  const saveWebsiteSettings = () => {

    localStorage.setItem(

      "websiteSettings",

      JSON.stringify(settings)

    );

    alert(

      "✅ Website Settings Saved"

    );

  };

  // =====================================
  // SAVE PAYMENT SETTINGS
  // =====================================

  const savePaymentSettings = () => {

    localStorage.setItem(

      "paymentSettings",

      JSON.stringify({

        ...paymentSettings,

        qrCode,

      })

    );

    alert(

      "✅ Payment Settings Saved"

    );

  };

  // =====================================
  // PRODUCT INPUT CHANGE
  // =====================================

  const handleProductChange = (e) => {

    setNewProduct({

      ...newProduct,

      [e.target.name]:

        e.target.value,

    });

  };

  // =====================================
  // RESET PRODUCT FORM
  // =====================================

  const resetProductForm = () => {

    setEditingProduct(null);

    setNewProduct({

      name: "",

      price: "",

      category: "",

      image: "",

      description: "",

      sellerEmail:

        "admin@amashop.com",

    });

  };
    // =====================================
  // ADD / UPDATE PRODUCT
  // =====================================

  const saveProduct = async () => {

    if (

      !newProduct.name ||

      !newProduct.price ||

      !newProduct.category

    ) {

      alert(

        "Please fill all required fields."

      );

      return;

    }

    try {

      if (editingProduct) {

        await axios.put(

          `${API_URL}/products/${editingProduct._id}`,

          newProduct

        );

        alert(

          "✅ Product Updated Successfully"

        );

      } else {

        await axios.post(

          `${API_URL}/products`,

          newProduct

        );

        alert(

          "✅ Product Added Successfully"

        );

      }

      resetProductForm();

      fetchProducts();

    } catch (error) {

      console.error(error);

      alert(

        "❌ Unable to save product."

      );

    }

  };

  // =====================================
  // EDIT PRODUCT
  // =====================================

  const editProduct = (product) => {

    setEditingProduct(product);

    setNewProduct({

      name: product.name || "",

      price: product.price || "",

      category: product.category || "",

      image: product.image || "",

      description:

        product.description || "",

      sellerEmail:

        product.sellerEmail ||

        "admin@amashop.com",

    });

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  // =====================================
  // DELETE PRODUCT
  // =====================================

  const deleteProduct = async (id) => {

    const confirmDelete =

      window.confirm(

        "Delete this product?"

      );

    if (!confirmDelete) return;

    try {

      await axios.delete(

        `${API_URL}/products/${id}`

      );

      alert(

        "🗑 Product Deleted"

      );

      fetchProducts();

    } catch (error) {

      console.error(error);

      alert(

        "❌ Unable to delete product."

      );

    }

  };

  // =====================================
  // REFRESH DASHBOARD
  // =====================================

  const refreshDashboard = async () => {

    await loadDashboard();

    alert(

      "✅ Dashboard Refreshed"

    );

  };

  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";

  };
    // =====================================
  // RETURN
  // =====================================

  if (loading) {

    return (

      <div className="admin-loading">

        <h2>

          Loading Dashboard...

        </h2>

      </div>

    );

  }

  return (

    <div className="admin-dashboard">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="admin-header">

        <div>

          <h1>

            👑 Admin Dashboard

          </h1>

          <p>

            Welcome,

            {" "}

            {admin?.name || "Administrator"}

          </p>

        </div>

        <div className="header-buttons">

          <button

            className="refresh-btn"

            onClick={refreshDashboard}

          >

            🔄 Refresh

          </button>

          <button

            className="logout-btn"

            onClick={logout}

          >

            🚪 Logout

          </button>

        </div>

      </header>

      {/* =====================================
          DASHBOARD STATS
      ===================================== */}

      <section className="stats-grid">

        <div className="stat-card users">

          <h2>

            👥 Users

          </h2>

          <h1>

            {stats.totalUsers}

          </h1>

        </div>

        <div className="stat-card products">

          <h2>

            📦 Products

          </h2>

          <h1>

            {stats.totalProducts}

          </h1>

        </div>

        <div className="stat-card orders">

          <h2>

            🛒 Orders

          </h2>

          <h1>

            {stats.totalOrders}

          </h1>

        </div>

        <div className="stat-card revenue">

          <h2>

            💰 Revenue

          </h2>

          <h1>

            ₹{stats.totalRevenue}

          </h1>

        </div>

      </section>

      {/* =====================================
          MAIN GRID
      ===================================== */}

      <div className="dashboard-grid">
                {/* =====================================
            WEBSITE SETTINGS
        ===================================== */}

        <section className="dashboard-card">

          <h2>

            🌐 Website Settings

          </h2>

          <div className="form-grid">

            <input
              type="text"
              placeholder="Website Name"
              value={settings.websiteName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  websiteName: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Hero Title"
              value={settings.heroTitle}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  heroTitle: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Hero Subtitle"
              value={settings.heroSubtitle}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  heroSubtitle: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Contact Number"
              value={settings.contact}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              value={settings.email}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  email: e.target.value,
                })
              }
            />

          </div>

          <button
            className="save-btn"
            onClick={saveWebsiteSettings}
          >

            💾 Save Website Settings

          </button>

        </section>

        {/* =====================================
            PAYMENT SETTINGS
        ===================================== */}

        <section className="dashboard-card">

          <h2>

            💳 Payment Settings

          </h2>

          <div className="form-grid">

            <input
              type="text"
              placeholder="UPI ID"
              value={paymentSettings.upiId}
              onChange={(e) =>
                setPaymentSettings({
                  ...paymentSettings,
                  upiId: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="UPI Name"
              value={paymentSettings.upiName}
              onChange={(e) =>
                setPaymentSettings({
                  ...paymentSettings,
                  upiName: e.target.value,
                })
              }
            />

          </div>

          <div className="payment-options">

            <label>

              <input
                type="checkbox"
                checked={paymentSettings.codEnabled}
                onChange={(e) =>
                  setPaymentSettings({
                    ...paymentSettings,
                    codEnabled: e.target.checked,
                  })
                }
              />

              Cash On Delivery

            </label>

            <label>

              <input
                type="checkbox"
                checked={paymentSettings.upiEnabled}
                onChange={(e) =>
                  setPaymentSettings({
                    ...paymentSettings,
                    upiEnabled: e.target.checked,
                  })
                }
              />

              UPI Payment

            </label>

          </div>

          {qrCode && (

            <div className="qr-preview">

              <h3>

                UPI QR Preview

              </h3>

              <img
                src={qrCode}
                alt="UPI QR"
                className="qr-image"
              />

            </div>

          )}

          <button
            className="save-btn"
            onClick={savePaymentSettings}
          >

            💾 Save Payment Settings

          </button>

        </section>
                {/* =====================================
            PRODUCT MANAGEMENT
        ===================================== */}

        <section className="dashboard-card full-width">

          <h2>

            📦 Product Management

          </h2>

          <div className="form-grid">

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleProductChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleProductChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newProduct.category}
              onChange={handleProductChange}
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={handleProductChange}
            />

          </div>

          <textarea
            className="product-description"
            name="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={handleProductChange}
          />

          <div className="product-actions">

            <button
              className="save-btn"
              onClick={saveProduct}
            >

              {editingProduct
                ? "✏ Update Product"
                : "➕ Add Product"}

            </button>

            {editingProduct && (

              <button
                className="cancel-btn"
                onClick={resetProductForm}
              >

                ❌ Cancel Edit

              </button>

            )}

          </div>

          <div className="search-box">

            <input
              type="text"
              placeholder="🔍 Search Product..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="products-table">

            <table>

              <thead>

                <tr>

                  <th>Image</th>

                  <th>Name</th>

                  <th>Category</th>

                  <th>Price</th>

                  <th>Seller</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="empty-data"
                    >

                      No Products Found

                    </td>

                  </tr>

                ) : (

                  filteredProducts.map((product) => (

                    <tr key={product._id}>

                      <td>

                        <img
                          src={product.image}
                          alt={product.name}
                          className="table-image"
                        />

                      </td>

                      <td>

                        {product.name}

                      </td>

                      <td>

                        {product.category}

                      </td>

                      <td>

                        ₹{product.price}

                      </td>

                      <td>

                        {product.sellerEmail || "-"}

                      </td>

                      <td>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            editProduct(product)
                          }
                        >

                          ✏ Edit

                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteProduct(product._id)
                          }
                        >

                          🗑 Delete

                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>
                {/* =====================================
            REGISTERED USERS
        ===================================== */}

        <section className="dashboard-card full-width">

          <h2>

            👥 Registered Users

          </h2>

          <div className="table-responsive">

            <table>

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Role</th>

                </tr>

              </thead>

              <tbody>

                {users.length === 0 ? (

                  <tr>

                    <td
                      colSpan="3"
                      className="empty-data"
                    >

                      No Users Found

                    </td>

                  </tr>

                ) : (

                  users.map((user, index) => (

                    <tr key={index}>

                      <td>

                        {user.name || "-"}

                      </td>

                      <td>

                        {user.email || "-"}

                      </td>

                      <td>

                        <span
                          className={`role-badge ${user.role || "user"}`}
                        >

                          {user.role || "user"}

                        </span>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* =====================================
            ORDERS
        ===================================== */}

        <section className="dashboard-card full-width">

          <h2>

            🛒 Customer Orders

          </h2>

          <div className="table-responsive">

            <table>

              <thead>

                <tr>

                  <th>Order ID</th>

                  <th>Customer</th>

                  <th>Mobile</th>

                  <th>Payment</th>

                  <th>Status</th>

                  <th>Total</th>

                </tr>

              </thead>

              <tbody>

                {orders.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="empty-data"
                    >

                      No Orders Found

                    </td>

                  </tr>

                ) : (

                  orders.map((order) => (

                    <tr key={order.orderId}>

                      <td>

                        {order.orderId}

                      </td>

                      <td>

                        {order.customer?.name || "-"}

                      </td>

                      <td>

                        {order.customer?.mobile || "-"}

                      </td>

                      <td>

                        {order.paymentMethod}

                      </td>

                      <td>

                        <span className="status-badge">

                          {order.orderStatus}

                        </span>

                      </td>

                      <td>

                        ₹{order.total}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>
                {/* =====================================
            ORDER DETAILS
        ===================================== */}

        {orders.length > 0 && (

          <section className="dashboard-card full-width">

            <h2>

              📋 Order Details

            </h2>

            {orders.map((order) => (

              <div
                className="order-detail-card"
                key={order.orderId}
              >

                <div className="order-top">

                  <h3>

                    Order :

                    {" "}

                    {order.orderId}

                  </h3>

                  <span className="status-badge">

                    {order.orderStatus}

                  </span>

                </div>

                <div className="order-grid">

                  <div>

                    <strong>

                      Customer

                    </strong>

                    <p>

                      {order.customer?.name}

                    </p>

                    <p>

                      {order.customer?.email}

                    </p>

                    <p>

                      {order.customer?.mobile}

                    </p>

                  </div>

                  <div>

                    <strong>

                      Delivery Address

                    </strong>

                    <p>

                      {order.address?.address}

                    </p>

                    <p>

                      {order.address?.city},{" "}

                      {order.address?.state}

                    </p>

                    <p>

                      PIN :

                      {" "}

                      {order.address?.pincode}

                    </p>

                  </div>

                  <div>

                    <strong>

                      Payment

                    </strong>

                    <p>

                      Method :

                      {" "}

                      {order.paymentMethod}

                    </p>

                    <p>

                      Status :

                      {" "}

                      {order.paymentStatus}

                    </p>

                    <p>

                      Txn ID :

                      {" "}

                      {order.transactionId}

                    </p>

                  </div>

                </div>

                <div className="ordered-products">

                  <h4>

                    Ordered Products

                  </h4>

                  {order.products?.map((product) => (

                    <div
                      className="ordered-product"
                      key={product._id}
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                        className="table-image"
                      />

                      <div>

                        <strong>

                          {product.name}

                        </strong>

                        <p>

                          Qty :

                          {" "}

                          {product.qty || 1}

                        </p>

                      </div>

                      <div>

                        ₹

                        {(product.price || 0) *

                          (product.qty || 1)}

                      </div>

                    </div>

                  ))}

                </div>

                <div className="order-bottom">

                  <h3>

                    Grand Total :

                    {" "}

                    ₹{order.total}

                  </h3>

                </div>

              </div>

            ))}

          </section>

        )}
                {/* =====================================
            QUICK SUMMARY
        ===================================== */}

        <section className="dashboard-card">

          <h2>

            📊 Quick Summary

          </h2>

          <div className="summary-list">

            <div className="summary-item">

              <span>Total Users</span>

              <strong>{stats.totalUsers}</strong>

            </div>

            <div className="summary-item">

              <span>Total Products</span>

              <strong>{stats.totalProducts}</strong>

            </div>

            <div className="summary-item">

              <span>Total Orders</span>

              <strong>{stats.totalOrders}</strong>

            </div>

            <div className="summary-item">

              <span>Total Revenue</span>

              <strong>

                ₹{stats.totalRevenue}

              </strong>

            </div>

          </div>

        </section>

        {/* =====================================
            SYSTEM INFORMATION
        ===================================== */}

        <section className="dashboard-card">

          <h2>

            ⚙️ System Information

          </h2>

          <div className="system-info">

            <p>

              <strong>Website :</strong>{" "}

              {settings.websiteName}

            </p>

            <p>

              <strong>Contact :</strong>{" "}

              {settings.contact || "Not Available"}

            </p>

            <p>

              <strong>Email :</strong>{" "}

              {settings.email || "Not Available"}

            </p>

            <p>

              <strong>UPI ID :</strong>{" "}

              {paymentSettings.upiId || "Not Available"}

            </p>

            <p>

              <strong>COD :</strong>{" "}

              {paymentSettings.codEnabled

                ? "Enabled"

                : "Disabled"}

            </p>

            <p>

              <strong>UPI :</strong>{" "}

              {paymentSettings.upiEnabled

                ? "Enabled"

                : "Disabled"}

            </p>

          </div>

        </section>

      </div>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="admin-footer">

        <p>

          © {new Date().getFullYear()}{" "}

          {settings.websiteName}

          {" "}Admin Panel

        </p>

        <p>

          Built with ❤️ using React + Node.js

        </p>

      </footer>

    </div>

  );

};

export default AdminDashboard;