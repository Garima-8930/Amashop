// backend/routes/admin.js
import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import { isAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

/* ---------------------- PRODUCTS ---------------------- */

// Get all products
router.get("/products", isAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new product
router.post("/products", isAdmin, async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;

    if (!name || !price || !description || !category || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = new Product({ name, price, description, category, image });
    await newProduct.save();

    res.status(201).json({ message: "✅ Product added", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put("/products/:id", isAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "✅ Product updated", product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
router.delete("/products/:id", isAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "🗑️ Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------- USERS ---------------------- */

// Get all users (no password)
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete("/users/:id", isAdmin, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "🗑️ User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------- ORDERS ---------------------- */

// Get all orders
router.get("/orders", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status
router.put("/orders/:id", isAdmin, async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "✅ Order updated", order: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------- CARTS ---------------------- */

// Get all carts
router.get("/carts", isAdmin, async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("user", "name email")
      .populate("products.product", "name price");
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
