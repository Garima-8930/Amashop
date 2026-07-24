import React, { useEffect, useMemo, useState } from "react";
import "./AdminDashboard.css";
import axios from "axios";

import API_URL from "../config";

const AdminDashboard = () => {

  // ==========================
  // USERS
  // ==========================

  const [users, setUsers] = useState([]);

  // ==========================
  // PRODUCTS
  // ==========================

  const [products, setProducts] = useState([]);

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

  // ==========================
  // ORDERS
  // ==========================

  const [orders, setOrders] =
    useState([]);

  // ==========================
  // WEBSITE SETTINGS
  // ==========================

  const [settings, setSettings] =
    useState({

      websiteName: "AMA SHOP",

      heroTitle: "",

      heroSubtitle: "",

      contact: "",

      email: "",

      adminUsername: "",

      adminPassword: "",

    });

  // ==========================
  // PAYMENT SETTINGS
  // ==========================

  const [paymentSettings, setPaymentSettings] =
    useState({

      codEnabled: true,

      upiEnabled: true,

      upiId: "",

      upiName: "",

    });

  // ==========================
  // AUTO QR
  // ==========================

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

  // ==========================
  // LOAD
  // ==========================

  useEffect(() => {

    fetchUsers();

    fetchProducts();

    fetchOrders();

    const website =
      JSON.parse(
        localStorage.getItem(
          "websiteSettings"
        )
      );

    if (website) {

      setSettings(website);

    }

    const payment =
      JSON.parse(
        localStorage.getItem(
          "paymentSettings"
        )
      );

    if (payment) {

      setPaymentSettings(payment);

    }

  }, []);

  // ==========================
  // FETCH USERS
  // ==========================

  const fetchUsers = () => {

    const data =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    setUsers(data);

  };

  // ==========================
  // FETCH PRODUCTS
  // ==========================

  const fetchProducts =
    async () => {

      try {

        const { data } =
          await axios.get(
            `${API_URL}/products/all`
          );

        setProducts(data);

      } catch (error) {

        console.log(error);

      }

    };

  // ==========================
  // FETCH ORDERS
  // ==========================

  const fetchOrders = () => {

    const data =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    setOrders(data);

  };

  // ==========================
  // WEBSITE SETTINGS
  // ==========================

  const handleSettingsChange =
    (e) => {

      setSettings({

        ...settings,

        [e.target.name]:
          e.target.value,

      });

    };

  // ==========================
  // PAYMENT SETTINGS
  // ==========================

  const handlePaymentChange =
    (e) => {

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

  // ==========================
  // SAVE SETTINGS
  // ==========================

  const saveSettings = () => {

    localStorage.setItem(

      "websiteSettings",

      JSON.stringify(settings)

    );

    localStorage.setItem(

      "paymentSettings",

      JSON.stringify({

        ...paymentSettings,

        qrCode,

      })

    );

    alert(
      "Settings Saved Successfully"
    );

  };

  // ==========================
  // ADD PRODUCT
  // ==========================
    // ==========================
  

  const handleInput = (e) => {

    setNewProduct({

      ...newProduct,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleAddProduct =
    async (e) => {

      e.preventDefault();

      if (

        !newProduct.name ||

        !newProduct.price ||

        !newProduct.image

      ) {

        alert(
          "Please fill all required fields."
        );

        return;

      }

      try {

        await axios.post(

          `${API_URL}/products`,

          {

            ...newProduct,

            status: "approved",

          }

        );

        alert(
          "Product Added Successfully"
        );

        setNewProduct({

          name: "",

          price: "",

          category: "",

          image: "",

          description: "",

          sellerEmail:
            "admin@amashop.com",

        });

        fetchProducts();

      } catch (error) {

        console.log(error);

        alert(
          "Unable to add product."
        );

      }

    };

  // ==========================
  // EDIT PRODUCT
  // ==========================

  const startEdit = (product) => {

    setEditingProduct({

      ...product,

    });

  };
    // ==========================
  // UPDATE PRODUCT
  // ==========================

  const handleUpdate =
    async () => {

      if (!editingProduct)
        return;

      try {

        await axios.put(

          `${API_URL}/products/${editingProduct._id}`,

          editingProduct

        );

        alert(
          "Product Updated Successfully"
        );

        setEditingProduct(null);

        fetchProducts();

      } catch (error) {

        console.log(error);

        alert(
          "Unable to update product."
        );

      }

    };

  // ==========================
  // APPROVE PRODUCT
  // ==========================

  const handleApprove =
    async (id) => {

      try {

        await axios.put(

          `${API_URL}/products/approve/${id}`

        );

        alert(
          "Product Approved Successfully"
        );

        fetchProducts();

      } catch (error) {

        console.log(error);

        alert(
          "Unable to approve product."
        );

      }

    };

  // ==========================
  // DELETE PRODUCT
  // ==========================

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this product?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(

          `${API_URL}/products/${id}`

        );

        alert(
          "Product Deleted Successfully"
        );

        fetchProducts();

      } catch (error) {

        console.log(error);

        alert(
          "Unable to delete product."
        );

      }

    };

  // ==========================
  // RETURN
  // ==========================

  return (<div className="dashboard">

  <h1 className="dashboard-title">
    🧑‍💼 Admin Dashboard
  </h1>

  {/* ================= ADD PRODUCT ================= */}

  <div className="card">

    <h2 className="section-title">

      ➕ Add Product

    </h2>

    <form
      className="settings-grid"
      onSubmit={handleAddProduct}
    >

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={handleInput}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={handleInput}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={newProduct.category}
        onChange={handleInput}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newProduct.image}
        onChange={handleInput}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={newProduct.description}
        onChange={handleInput}
      />

      <button
        className="save-btn"
        type="submit"
      >

        ➕ Add Product

      </button>

    </form>

  </div>

  {/* ================= USERS ================= */}

  <div className="card">

    <h2 className="section-title">

      👥 Registered Users

    </h2>

    <table className="custom-table">

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
              className="empty"
            >

              No Users Found

            </td>

          </tr>

        ) : (

          users.map((user,index)=>(

            <tr key={index}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

  {/* ================= PRODUCTS ================= */}

  <div className="card">

    <h2 className="section-title">

      📦 Products

    </h2>

    <table className="custom-table">

      <thead>

        <tr>

          <th>Image</th>

          <th>Name</th>

          <th>Price</th>

          <th>Category</th>

          <th>Status</th>

          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {products.length===0 ? (

          <tr>

            <td
              colSpan="6"
              className="empty"
            >

              No Products Found

            </td>

          </tr>

        ) : (

          products.map((product)=>(

            <tr key={product._id}>

              <td>

                <img
                  src={product.image}
                  alt={product.name}
                  width="70"
                />

              </td>

              <td>

                {editingProduct?._id===product._id ? (

                  <input
                    value={editingProduct.name}
                    onChange={(e)=>
                      setEditingProduct({

                        ...editingProduct,

                        name:e.target.value,

                      })
                    }
                  />

                ) : (

                  product.name

                )}

              </td>

              <td>

                {editingProduct?._id===product._id ? (

                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e)=>
                      setEditingProduct({

                        ...editingProduct,

                        price:e.target.value,

                      })
                    }
                  />

                ) : (

                  <>₹{product.price}</>

                )}

              </td>

              <td>

                {editingProduct?._id===product._id ? (

                  <input
                    value={editingProduct.category}
                    onChange={(e)=>
                      setEditingProduct({

                        ...editingProduct,

                        category:e.target.value,

                      })
                    }
                  />

                ) : (

                  product.category

                )}

              </td>

              <td>

                {product.status}

              </td>

              <td>
                                {editingProduct?._id === product._id ? (

                  <button
                    className="save-btn"
                    onClick={handleUpdate}
                  >
                    💾 Save
                  </button>

                ) : (

                  <button
                    className="edit-btn"
                    onClick={() =>
                      startEdit(product)
                    }
                  >
                    ✏ Edit
                  </button>

                )}

                {product.status === "pending" && (

                  <button
                    className="approve-btn"
                    onClick={() =>
                      handleApprove(product._id)
                    }
                  >
                    ✔ Approve
                  </button>

                )}

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(product._id)
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

  {/* ================= ORDERS ================= */}

  <div className="card">

    <h2 className="section-title">

      🛒 Orders

    </h2>

    <table className="custom-table">

      <thead>

        <tr>

          <th>Customer</th>

          <th>Items</th>

          <th>Payment</th>

          <th>Total</th>

          <th>Status</th>

        </tr>

      </thead>

      <tbody>

        {orders.length === 0 ? (

          <tr>

            <td
              colSpan="5"
              className="empty"
            >

              No Orders Found

            </td>

          </tr>

        ) : (

          orders.map((order,index)=>(

            <tr key={index}>

              <td>

                <strong>

                  {order.customerName ||
                    order.user?.name}

                </strong>

                <br/>

                {order.phone}

              </td>

              <td>

                {order.products?.map(
                  (item,i)=>(

                    <div key={i}>

                      {item.name}

                      {" × "}

                      {item.quantity ||
                        item.qty ||
                        1}

                    </div>

                  )
                )}

              </td>

              <td>

                {order.paymentMethod}

              </td>

              <td>

                ₹

                {order.totalAmount ||
                  order.totalPrice}

              </td>

              <td>

                {order.orderStatus ||
                  "Pending"}

              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>
    {/* ================= WEBSITE SETTINGS ================= */}

  <div className="card">

    <h2 className="section-title">

      ⚙ Website Settings

    </h2>

    <div className="settings-grid">

      <input
        type="text"
        name="websiteName"
        placeholder="Website Name"
        value={settings.websiteName}
        onChange={handleSettingsChange}
      />

      <input
        type="text"
        name="heroTitle"
        placeholder="Hero Title"
        value={settings.heroTitle}
        onChange={handleSettingsChange}
      />

      <input
        type="text"
        name="heroSubtitle"
        placeholder="Hero Subtitle"
        value={settings.heroSubtitle}
        onChange={handleSettingsChange}
      />

      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={settings.contact}
        onChange={handleSettingsChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Support Email"
        value={settings.email}
        onChange={handleSettingsChange}
      />

    </div>

  </div>

  {/* ================= PAYMENT SETTINGS ================= */}

  <div className="card">

    <h2 className="section-title">

      💳 Payment Settings

    </h2>

    <div className="settings-grid">

      <label className="checkbox-label">

        <input
          type="checkbox"
          name="codEnabled"
          checked={paymentSettings.codEnabled}
          onChange={handlePaymentChange}
        />

        Enable Cash On Delivery

      </label>

      <label className="checkbox-label">

        <input
          type="checkbox"
          name="upiEnabled"
          checked={paymentSettings.upiEnabled}
          onChange={handlePaymentChange}
        />

        Enable UPI Payment

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

    {paymentSettings.upiEnabled &&
      paymentSettings.upiId && (

      <div
        style={{
          marginTop: "25px",
          textAlign: "center",
        }}
      >

        <h3>

          Auto Generated QR

        </h3>

        <img
          src={qrCode}
          alt="UPI QR"
          style={{
            width: "220px",
            height: "220px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            padding: "10px",
            background: "#fff",
          }}
        />

        <p
          style={{
            marginTop: "15px",
          }}
        >

          <strong>

            {paymentSettings.upiId}

          </strong>

        </p>

      </div>

    )}

    <button
      className="save-btn"
      onClick={saveSettings}
    >

      💾 Save Settings

    </button>

  </div>

</div>

  );

};

export default AdminDashboard;