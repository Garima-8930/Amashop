import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    sellerEmail: {
      type: String,
      required: true,
    },

    // ✅ Product Approval Status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // ✅ Admin rejection reason (optional)
    rejectReason: {
      type: String,
      default: "",
    },

    // ✅ Featured Product
    featured: {
      type: Boolean,
      default: false,
    },

    // ✅ Bestseller
    bestSeller: {
      type: Boolean,
      default: false,
    },

    // ✅ Product Availability
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;