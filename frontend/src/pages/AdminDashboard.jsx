import React, {
  useState,
  useEffect,
  useMemo,
} from "react";

import axios from "axios";
import "./AdminDashboard.css";

import API_URL from "../config";

const AdminDashboard = () => {

  // ======================================
  // DASHBOARD STATS
  // ======================================

  const [stats, setStats] = useState({

    totalUsers: 0,

    totalProducts: 0,

    totalOrders: 0,

    totalRevenue: 0,

  });

  // ======================================
  // USERS
  // ======================================

  const [users, setUsers] = useState([]);

  // ======================================
  // PRODUCTS
  // ======================================

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

      sellerEmail: "admin@amashop.com",

    });

  // ======================================
  // ORDERS
  // ======================================

  const [orders, setOrders] =
    useState([]);

  // ======================================
  // WEBSITE SETTINGS
  // ======================================

  const [settings, setSettings] =
    useState({

      websiteName: "AMASHOP",

      heroTitle:
        "Premium Electronics Store",

      heroSubtitle:
        "Discover Premium Electronics at Best Prices",

      contact: "",

      email: "",

      adminUsername: "",

      adminPassword: "",

    });

  // ======================================
  // PAYMENT SETTINGS
  // ======================================

  const [paymentSettings, setPaymentSettings] =
    useState({

      codEnabled: true,

      upiEnabled: true,

      upiId: "",

      upiName: "",

    });

  // ======================================
  // AUTO QR
  // ======================================

  const qrCode = useMemo(() => {

    if (!paymentSettings.upiId)
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

  // ======================================
 
  
 // LOAD DATA
  // ======================================


  // ======================================
  // ======================================
  // CALCULATE STATS
  // ======================================

  useEffect(() => {

    const revenue = orders.reduce(

      (sum, order) =>

        sum +

        Number(

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
    // ======================================
  // FETCH USERS
  // ======================================

  const fetchUsers = async () => {

    try {

      const { data } = await axios.get(
        `${API_URL}/users`
      );

      setUsers(data || []);

    } catch (error) {

      console.error(
        "Users Load Error",
        error
      );

    }

  };

  // ======================================
  // FETCH PRODUCTS
  // ======================================

  const fetchProducts = async () => {

    try {

      const { data } = await axios.get(
        `${API_URL}/products`
      );

      setProducts(data || []);

    } catch (error) {

      console.error(
        "Products Load Error",
        error
      );

    }

  };

  // ======================================
// LOAD DASHBOARD
// ======================================

const loadDashboard = async () => {

  await Promise.all([

    fetchUsers(),

    fetchProducts(),

    fetchOrders(),

  ]);

  loadWebsiteSettings();

  loadPaymentSettings();

};

// ======================================
// LOAD DATA
// ======================================
useEffect(() => {
  loadDashboard();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  // ======================================
  // FETCH ORDERS
  // ======================================

  const fetchOrders = async () => {

    try {

      const { data } = await axios.get(
        `${API_URL}/orders`
      );

      setOrders(data || []);

    } catch (error) {

      console.error(
        "Orders Load Error",
        error
      );

    }

  };

  // ======================================
  // LOAD WEBSITE SETTINGS
  // ======================================

  const loadWebsiteSettings = () => {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "websiteSettings"
        )
      );

    if (saved) {

      setSettings(saved);

    }

  };

  // ======================================
  // LOAD PAYMENT SETTINGS
  // ======================================

  const loadPaymentSettings = () => {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "paymentSettings"
        )
      );

    if (saved) {

      setPaymentSettings(saved);

    }

  };

  // ======================================
  // SAVE WEBSITE SETTINGS
  // ======================================

  const saveWebsiteSettings = () => {

    localStorage.setItem(

      "websiteSettings",

      JSON.stringify(settings)

    );

    alert(
      "Website Settings Saved Successfully ✅"
    );

  };

  // ======================================
  // SAVE PAYMENT SETTINGS
  // ======================================

  const savePaymentSettings = () => {

    localStorage.setItem(

      "paymentSettings",

      JSON.stringify({

        ...paymentSettings,

        qrCode,

      })

    );

    alert(
      "Payment Settings Saved Successfully ✅"
    );

  };

  // ======================================
  // INPUT CHANGE
  // ======================================

  const handleSettingChange = (e) => {

    setSettings({

      ...settings,

      [e.target.name]:
        e.target.value,

    });

  };

  // ======================================
  // PAYMENT CHANGE
  // ======================================

  const handlePaymentChange = (e) => {

    const {

      name,

      value,

      type,

      checked,

    } = e.target;

    setPaymentSettings({

      ...paymentSettings,

      [name]:

        type === "checkbox"

          ? checked

          : value,

    });

  };
    // ======================================
  // PRODUCT INPUT CHANGE
  // ======================================

  const handleProductChange = (e) => {

    setNewProduct({

      ...newProduct,

      [e.target.name]: e.target.value,

    });

  };

  // ======================================
  // ADD PRODUCT
  // ======================================

  const addProduct = async () => {

    if (

      !newProduct.name ||

      !newProduct.price ||

      !newProduct.category ||

      !newProduct.image

    ) {

      alert("Please fill all required fields.");

      return;

    }

    try {

      const { data } = await axios.post(

        `${API_URL}/products`,

        newProduct

      );

      setProducts((prev) => [

        ...prev,

        data,

      ]);

      setNewProduct({

        name: "",

        price: "",

        category: "",

        image: "",

        description: "",

        sellerEmail: "admin@amashop.com",

      });

      alert("Product Added Successfully ✅");

    } catch (error) {

      console.error(error);

      alert("Unable to add product.");

    }

  };

  // ======================================
  // EDIT PRODUCT
  // ======================================

  const startEditProduct = (product) => {

    setEditingProduct(product._id);

    setNewProduct({

      name: product.name,

      price: product.price,

      category: product.category,

      image: product.image,

      description: product.description,

      sellerEmail:

        product.sellerEmail ||

        "admin@amashop.com",

    });

  };

  // ======================================
  // UPDATE PRODUCT
  // ======================================

  const updateProduct = async () => {

    try {

      const { data } = await axios.put(

        `${API_URL}/products/${editingProduct}`,

        newProduct

      );

      setProducts((prev) =>

        prev.map((item) =>

          item._id === editingProduct

            ? data

            : item

        )

      );

      setEditingProduct(null);

      setNewProduct({

        name: "",

        price: "",

        category: "",

        image: "",

        description: "",

        sellerEmail: "admin@amashop.com",

      });

      alert("Product Updated Successfully ✅");

    } catch (error) {

      console.error(error);

      alert("Unable to update product.");

    }

  };

  // ======================================
  // DELETE PRODUCT
  // ======================================

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(

      "Delete this product?"

    );

    if (!confirmDelete) return;

    try {

      await axios.delete(

        `${API_URL}/products/${id}`

      );

      setProducts((prev) =>

        prev.filter(

          (item) => item._id !== id

        )

      );

      alert("Product Deleted Successfully 🗑");

    } catch (error) {

      console.error(error);

      alert("Unable to delete product.");

    }

  };

  // ======================================
  // CANCEL EDIT
  // ======================================

  const cancelEdit = () => {

    setEditingProduct(null);

    setNewProduct({

      name: "",

      price: "",

      category: "",

      image: "",

      description: "",

      sellerEmail: "admin@amashop.com",

    });

  };
    // ======================================
  // SEARCH
  // ======================================

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {

    return products.filter((product) =>

      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [products, search]);

  // ======================================
  // DASHBOARD CARDS
  // ======================================

  const DashboardCards = () => (

    <div className="dashboard-cards">

      <div className="dashboard-card users-card">

        <h3>👥 Users</h3>

        <h1>{stats.totalUsers}</h1>

        <p>Registered Users</p>

      </div>

      <div className="dashboard-card products-card">

        <h3>📦 Products</h3>

        <h1>{stats.totalProducts}</h1>

        <p>Total Products</p>

      </div>

      <div className="dashboard-card orders-card">

        <h3>🛒 Orders</h3>

        <h1>{stats.totalOrders}</h1>

        <p>Orders Received</p>

      </div>

      <div className="dashboard-card revenue-card">

        <h3>💰 Revenue</h3>

        <h1>

          ₹

          {stats.totalRevenue.toLocaleString(
            "en-IN"
          )}

        </h1>

        <p>Total Revenue</p>

      </div>

    </div>

  );

  // ======================================
  // HEADER
  // ======================================

  const DashboardHeader = () => (

    <div className="dashboard-header">

      <div>

        <h1>

          Admin Dashboard

        </h1>

        <p>

          Welcome back, Admin 👋

        </p>

      </div>

      <input

        type="text"

        placeholder="Search Products..."

        value={search}

        onChange={(e) =>

          setSearch(e.target.value)

        }

        className="dashboard-search"

      />

    </div>

  );

  // ======================================
  // PAGE START
  // ======================================

  return (

    <div className="admin-dashboard">

      <DashboardHeader />

      <DashboardCards />

      {/* Remaining Sections */}
            {/* ======================================
          WEBSITE SETTINGS
      ====================================== */}

      <section className="admin-section">

        <h2>🌐 Website Settings</h2>

        <div className="form-grid">

          <input
            type="text"
            name="websiteName"
            placeholder="Website Name"
            value={settings.websiteName}
            onChange={handleSettingChange}
          />

          <input
            type="text"
            name="heroTitle"
            placeholder="Hero Title"
            value={settings.heroTitle}
            onChange={handleSettingChange}
          />

          <input
            type="text"
            name="heroSubtitle"
            placeholder="Hero Subtitle"
            value={settings.heroSubtitle}
            onChange={handleSettingChange}
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={settings.contact}
            onChange={handleSettingChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={settings.email}
            onChange={handleSettingChange}
          />

        </div>

        <button
          className="save-btn"
          onClick={saveWebsiteSettings}
        >

          💾 Save Website Settings

        </button>

      </section>

      {/* ======================================
          PAYMENT SETTINGS
      ====================================== */}

      <section className="admin-section">

        <h2>💳 Payment Settings</h2>

        <div className="form-grid">

          <label className="checkbox">

            <input
              type="checkbox"
              name="codEnabled"
              checked={paymentSettings.codEnabled}
              onChange={handlePaymentChange}
            />

            Cash On Delivery

          </label>

          <label className="checkbox">

            <input
              type="checkbox"
              name="upiEnabled"
              checked={paymentSettings.upiEnabled}
              onChange={handlePaymentChange}
            />

            UPI Payment

          </label>

          <input
            type="text"
            name="upiId"
            placeholder="UPI ID"
            value={paymentSettings.upiId}
            onChange={handlePaymentChange}
          />

          <input
            type="text"
            name="upiName"
            placeholder="UPI Name"
            value={paymentSettings.upiName}
            onChange={handlePaymentChange}
          />

        </div>

        {qrCode && (

          <div className="qr-preview">

            <h3>QR Preview</h3>

            <img
              src={qrCode}
              alt="UPI QR"
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

      {/* ======================================
          PRODUCT MANAGEMENT
      ====================================== */}
            <section className="admin-section">

        <h2>

          📦 Product Management

        </h2>

        {/* ==========================
            ADD / EDIT PRODUCT
        ========================== */}

        <div className="product-form">

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

          <textarea
            name="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={handleProductChange}
          />

          <div className="product-buttons">

            {editingProduct ? (

              <>

                <button
                  className="update-btn"
                  onClick={updateProduct}
                >

                  ✏ Update Product

                </button>

                <button
                  className="cancel-btn"
                  onClick={cancelEdit}
                >

                  ❌ Cancel

                </button>

              </>

            ) : (

              <button
                className="add-btn"
                onClick={addProduct}
              >

                ➕ Add Product

              </button>

            )}

          </div>

        </div>

        {/* ==========================
            PRODUCT LIST
        ========================== */}

        <div className="products-table">

          <table>

            <thead>

              <tr>

                <th>Image</th>

                <th>Name</th>

                <th>Category</th>

                <th>Price</th>

                <th>Seller</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
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

                      {product.sellerEmail}

                    </td>

                    <td>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          startEditProduct(product)
                        }
                      >

                        Edit

                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* ======================================
          USERS SECTION
      ====================================== */}
            <section className="admin-section">

        <h2>👥 Users Management</h2>

        <div className="users-table">

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
                    style={{
                      textAlign: "center",
                      padding: "25px",
                    }}
                  >

                    No Users Available

                  </td>

                </tr>

              ) : (

                users.map((user) => (

                  <tr key={user._id || user.email}>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>

                      <span
                        className={`role-badge ${user.role}`}
                      >

                        {user.role}

                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* ======================================
          ORDERS MANAGEMENT
      ====================================== */}

      <section className="admin-section">

        <h2>🛒 Orders Management</h2>

        <div className="orders-table">

          <table>

            <thead>

              <tr>

                <th>Customer</th>

                <th>Products</th>

                <th>Amount</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {orders.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "25px",
                    }}
                  >

                    No Orders Found

                  </td>

                </tr>

              ) : (

                orders.map((order) => (

                  <tr key={order._id}>

                    <td>

                      {order.customerName ||
                        order.name ||
                        "Customer"}

                    </td>

                    <td>

                      {(order.products || [])

                        .map((item) => item.name)

                        .join(", ")}

                    </td>

                    <td>

                      ₹

                      {order.totalAmount ||
                        order.totalPrice ||
                        0}

                    </td>

                    <td>

                      <span className="status-badge">

                        {order.status ||
                          "Pending"}

                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* ======================================
          END OF DASHBOARD BODY
      ====================================== */}
            {/* ======================================
          ANALYTICS
      ====================================== */}

      <section className="admin-section">

        <h2>📊 Dashboard Analytics</h2>

        <div className="analytics-grid">

          <div className="analytics-card">

            <h3>Today's Orders</h3>

            <h1>{orders.length}</h1>

            <p>Orders received today</p>

          </div>

          <div className="analytics-card">

            <h3>Products Available</h3>

            <h1>{products.length}</h1>

            <p>Products in store</p>

          </div>

          <div className="analytics-card">

            <h3>Registered Users</h3>

            <h1>{users.length}</h1>

            <p>Total customers</p>

          </div>

          <div className="analytics-card">

            <h3>Total Revenue</h3>

            <h1>

              ₹

              {stats.totalRevenue.toLocaleString(
                "en-IN"
              )}

            </h1>

            <p>Overall earnings</p>

          </div>

        </div>

      </section>

      {/* ======================================
          RECENT ACTIVITY
      ====================================== */}

      <section className="admin-section">

        <h2>📝 Recent Activity</h2>

        <div className="activity-list">

          {orders.length === 0 ? (

            <p>No recent activity.</p>

          ) : (

            orders

              .slice(0, 5)

              .map((order) => (

                <div
                  key={order._id}
                  className="activity-card"
                >

                  <h4>

                    📦 New Order

                  </h4>

                  <p>

                    Customer :

                    {" "}

                    {order.customerName ||

                      order.name ||

                      "Customer"}

                  </p>

                  <p>

                    Amount :

                    ₹

                    {order.totalAmount ||

                      order.totalPrice ||

                      0}

                  </p>

                  <span>

                    {order.status ||

                      "Pending"}

                  </span>

                </div>

              ))

          )}

        </div>

      </section>

      {/* ======================================
          QUICK ACTIONS
      ====================================== */}

      <section className="admin-section">

        <h2>⚡ Quick Actions</h2>

        <div className="quick-actions">

          <button
            className="action-btn"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >

            ⬆ Back to Top

          </button>

          <button
            className="action-btn"
            onClick={fetchProducts}
          >

            🔄 Refresh Products

          </button>

          <button
            className="action-btn"
            onClick={fetchOrders}
          >

            🛒 Refresh Orders

          </button>

          <button
            className="action-btn"
            onClick={fetchUsers}
          >

            👥 Refresh Users

          </button>

        </div>

      </section>

      {/* ======================================
          MOBILE NOTE
      ====================================== */}

      <section className="admin-section">

        <div className="admin-info">

          <h3>

            📱 Responsive Dashboard

          </h3>

          <p>

            This dashboard is optimized for Desktop,

            Tablet and Mobile devices.

          </p>

        </div>

      </section>
            {/* ======================================
          SIDEBAR SHORTCUTS
      ====================================== */}

      <section className="admin-section">

        <h2>🚀 Quick Navigation</h2>

        <div className="shortcut-grid">

          <button
            className="shortcut-btn"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            🏠 Dashboard
          </button>

          <button
            className="shortcut-btn"
            onClick={() =>
              document
                .querySelector(".product-form")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            📦 Products
          </button>

          <button
            className="shortcut-btn"
            onClick={() =>
              document
                .querySelector(".users-table")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            👥 Users
          </button>

          <button
            className="shortcut-btn"
            onClick={() =>
              document
                .querySelector(".orders-table")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            🛒 Orders
          </button>

        </div>

      </section>

      {/* ======================================
          SYSTEM INFORMATION
      ====================================== */}

      <section className="admin-section">

        <h2>💻 System Information</h2>

        <div className="system-info">

          <div className="info-box">

            <h4>Website</h4>

            <p>{settings.websiteName}</p>

          </div>

          <div className="info-box">

            <h4>Version</h4>

            <p>v2.0</p>

          </div>

          <div className="info-box">

            <h4>Environment</h4>

            <p>Production</p>

          </div>

          <div className="info-box">

            <h4>Status</h4>

            <p className="online">

              🟢 Online

            </p>

          </div>

        </div>

      </section>

      {/* ======================================
          ADMIN PROFILE
      ====================================== */}

      <section className="admin-section">

        <h2>👤 Admin Profile</h2>

        <div className="admin-profile">

          <div>

            <h3>

              {settings.adminUsername || "Administrator"}

            </h3>

            <p>

              {settings.email || "admin@amashop.com"}

            </p>

          </div>

          <button

            className="logout-btn"

            onClick={() => {

              localStorage.removeItem("user");

              window.location.href = "/home";

            }}

          >

            🚪 Logout

          </button>

        </div>

      </section>

      {/* ======================================
          FOOTER
      ====================================== */}

      <footer className="admin-footer">

        <p>

          © {new Date().getFullYear()}

          {" "}

          {settings.websiteName}

          {" "}Admin Dashboard

        </p>

        <p>

          Developed with ❤️ using React + Node + MongoDB

        </p>

      </footer>
            {/* ======================================
          DASHBOARD SUMMARY
      ====================================== */}

      <section className="admin-section">

        <h2>📋 Dashboard Summary</h2>

        <div className="summary-box">

          <p>

            Total Users :
            <strong> {stats.totalUsers}</strong>

          </p>

          <p>

            Total Products :
            <strong> {stats.totalProducts}</strong>

          </p>

          <p>

            Total Orders :
            <strong> {stats.totalOrders}</strong>

          </p>

          <p>

            Total Revenue :
            <strong>

              ₹{stats.totalRevenue.toLocaleString("en-IN")}

            </strong>

          </p>

        </div>

      </section>

    </div>

  );

};

export default AdminDashboard;