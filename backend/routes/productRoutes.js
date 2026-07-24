// backend/routes/productRoutes.js
import express from "express";
import {
  getProducts,
  getMyProducts,
  getAllProducts,
  approveProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Public Route
router.get("/", getProducts);

// Seller
router.get("/mine", getMyProducts);
router.post("/", addProduct);

// Admin
router.get("/all", getAllProducts);
router.put("/approve/:id", approveProduct);

// Common
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

