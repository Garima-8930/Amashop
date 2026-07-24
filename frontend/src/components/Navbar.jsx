// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   const user = JSON.parse(localStorage.getItem("user")); // assuming you store user in localStorage after login

//   return (
//     <nav
//       style={{
//         display: "flex",
//         gap: "20px",
//         padding: "10px",
//         background: "#eee",
//       }}
//     >
//       <Link to="/">Home</Link>
//       <Link to="/products">Products</Link>
//       <Link to="/cart">Cart</Link>
//       {user ? (
//         <>
//           <span>Hi, {user.name}</span>
//           {user.role === "seller" && <Link to="/seller-dashboard">Seller Dashboard</Link>}
//           <button
//             onClick={() => {
//               localStorage.removeItem("user");
//               window.location.href = "/login";
//             }}
//           >
//             Logout
//           </button>
//         </>
//       ) : (
//         <Link to="/login">Login</Link>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
