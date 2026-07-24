// // src/pages/AdminProducts.js
// import React, { useEffect, useState } from "react";

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });

//   // 🔹 Fetch products from API
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/products");
//       const data = await res.json();
//       setProducts(data);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   // 🔹 Add product
//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     if (!newProduct.name || !newProduct.price || !newProduct.image) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newProduct),
//       });

//       if (res.ok) {
//         setNewProduct({ name: "", price: "", image: "" });
//         fetchProducts();
//       }
//     } catch (err) {
//       console.error("Error adding product:", err);
//     }
//   };

//   // 🔹 Delete product
//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/products/${id}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         setProducts(products.filter((p) => p._id !== id));
//       }
//     } catch (err) {
//       console.error("Error deleting product:", err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Admin - Manage Products</h2>

//       {/* Add Product Form */}
//       <form
//         onSubmit={handleAddProduct}
//         style={{
//           display: "flex",
//           gap: "10px",
//           marginBottom: "20px",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={newProduct.name}
//           onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={newProduct.price}
//           onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={newProduct.image}
//           onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//         />
//         <button type="submit" style={{ background: "green", color: "white" }}>
//           Add
//         </button>
//       </form>

//       {/* Products Table */}
//       <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr style={{ background: "#f4f4f4" }}>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Price (₹)</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.length === 0 ? (
//             <tr>
//               <td colSpan="4" style={{ textAlign: "center" }}>No products found</td>
//             </tr>
//           ) : (
//             products.map((p) => (
//               <tr key={p._id}>
//                 <td>
//                   <img src={p.image} alt={p.name} style={{ width: "60px", height: "60px", objectFit: "cover" }} />
//                 </td>
//                 <td>{p.name}</td>
//                 <td>₹{p.price}</td>
//                 <td>
//                   <button
//                     onClick={() => handleDelete(p._id)}
//                     style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminProducts;
