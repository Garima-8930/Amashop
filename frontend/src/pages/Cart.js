import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // 🔹 Load cart from localStorage (ON PAGE LOAD)
  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    setCart(storedCart);
  }, []);

  // 🔹 Recalculate total whenever cart changes
  useEffect(() => {
    const sum = cart.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    setTotal(sum);

    // 🔥 ALWAYS save for Admin Orders
    localStorage.setItem("cartTotal", JSON.stringify(sum));
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  // 🔹 Place Order (Demo)
  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    alert("Order placed successfully ✅");

    // ❌ OPTIONAL: Clear cart after order
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartTotal");

    setCart([]);
    setTotal(0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table border="1" cellPadding="10" cellSpacing="0" width="100%">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      width="60"
                      height="60"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.price * item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: "15px" }}>
            Total: ₹{total}
          </h3>

          <button
            onClick={handlePlaceOrder}
            style={{
              marginTop: "10px",
              padding: "10px 15px",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
