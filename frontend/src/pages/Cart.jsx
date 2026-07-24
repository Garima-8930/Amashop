// // src/pages/CartPage.js
// import React from "react";
// import { useCart } from "../context/CartContext";

// function CartPage() {
//   const { cart, removeFromCart } = useCart();

//   const totalPrice = Array.isArray(cart)
//     ? cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0)
//     : 0;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Your Cart 🛒</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div>
//           {cart.map((item) => (
//             <div
//               key={item._id}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginBottom: "10px",
//                 padding: "10px",
//                 border: "1px solid #ddd",
//                 borderRadius: "5px",
//               }}
//             >
//               <div>
//                 <h4>{item.name}</h4>
//                 <p>
//                   {item.quantity} × ${item.price} = ${item.price * item.quantity}
//                 </p>
//               </div>
//               <button onClick={() => removeFromCart(item._id)}>❌ Remove</button>
//             </div>
//           ))}

//           <h3>Total: ${totalPrice.toFixed(2)}</h3>
//           <button
//             style={{
//               padding: "10px 20px",
//               background: "green",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//             onClick={() => alert("Proceeding to checkout...")}
//           >
//             Checkout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CartPage;
