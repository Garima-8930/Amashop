import express from "express";

import {
  placeOrder,
  getAllOrders,
  getSellerOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// ===============================
// PLACE ORDER
// ===============================
router.post("/", placeOrder);

// ===============================
// ADMIN - ALL ORDERS
// ===============================
router.get("/", getAllOrders);

// ===============================
// SELLER - MY ORDERS
// ===============================
router.get("/seller", getSellerOrders);

// ===============================
// UPDATE ORDER STATUS
// ===============================
router.put("/:id", updateOrderStatus);

// ===============================
// DELETE ORDER
// ===============================
router.delete("/:id", deleteOrder);

export default router;