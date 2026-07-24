import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const router = express.Router();

// 🟢 Migrate sellerId → user
// @route GET /api/migrate/products
// @access Admin-only (temp use)
router.get(
  "/products",
  asyncHandler(async (req, res) => {
    try {
      const result = await Product.updateMany(
        { sellerId: { $exists: true } },
        [
          { $set: { user: "$sellerId" } },
          { $unset: "sellerId" },
        ]
      );

      res.json({
        message: "Migration complete ✅",
        matched: result.matchedCount,
        modified: result.modifiedCount,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
);

export default router;
