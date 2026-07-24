// backend/routes/cartRoutes.js
import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🛒 Add product to cart
router.post("/add", protect, async (req, res) => {
  try {
    const userId = req.user._id; 
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.json(await cart.populate("items.productId"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🛒 Get logged-in user's cart
router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    res.json(cart || { userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🛒 Remove product from cart
router.delete("/remove/:productId", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json(await cart.populate("items.productId"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🛒 Clear entire cart
router.delete("/clear", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ msg: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
