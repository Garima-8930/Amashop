import express from "express";
import Product from "../models/product.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all products
router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Add new product
router.post("/", protect, admin, async (req, res) => {
  try {
    const { title, price, image } = req.body;
    const product = new Product({ title, price, image });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Update product
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const { title, price, image } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, price, image },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Delete product
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
