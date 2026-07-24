// // src/components/Cart.js
// import React from "react";
// import { useCart } from "../context/CartContext";

// function Cart() {
//   const { cart, removeFromCart } = useCart();

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Your Cart</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           {cart.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between border-b py-2"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-16 h-16 object-cover rounded"
//               />

//               <div className="flex-1 ml-3">
//                 <h3 className="font-semibold">{item.name}</h3>
//                 <p className="text-gray-600">
//                   ₹{item.price} × {item.quantity}
//                 </p>
//               </div>

//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <h3 className="text-lg font-bold mt-4">Total: ₹{total}</h3>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;
