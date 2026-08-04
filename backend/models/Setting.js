import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    websiteName: {
      type: String,
      default: "AMASHOP",
    },
    heroTitle: {
      type: String,
      default: "Premium Electronics Store",
    },
    heroSubtitle: {
      type: String,
      default: "Discover Premium Electronics at Best Prices",
    },
    contact: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    upiId: {
      type: String,
      default: "",
    },
    upiName: {
      type: String,
      default: "",
    },
    qrCode: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Setting", settingSchema);