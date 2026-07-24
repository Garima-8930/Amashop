// // src/pages/Admin.js
// import React, { useState, useEffect } from "react";

// const Admin = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("products")) || [];
//     setProducts(stored);
//   }, []);

//   const addProduct = () => {
//     const newProduct = {
//       id: Date.now(),
//       name: `Product ${products.length + 1}`,
//       price: Math.floor(Math.random() * 1000) + 100,
//     };
//     const updated = [...products, newProduct];
//     setProducts(updated);
//     localStorage.setItem("products", JSON.stringify(updated));
//   };

//   const deleteProduct = (id) => {
//     const updated = products.filter((p) => p.id !== id);
//     setProducts(updated);
//     localStorage.setItem("products", JSON.stringify(updated));
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Admin Dashboard</h2>
//       <button onClick={addProduct}>Add Product</button>
//       <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price (₹)</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((p) => (
//             <tr key={p.id}>
//               <td>{p.name}</td>
//               <td>{p.price}</td>
//               <td>
//                 <button onClick={() => deleteProduct(p.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Admin;
