import Product from "../models/productModel.js";

// 📌 Get all products (Public)
// =======================
// PUBLIC PRODUCTS
// Only Approved Products
// =======================

export const getProducts = async (req, res) => {
  try {

    const products = await Product.find({
      status: "approved",
    }).sort({
      createdAt: -1,
    });

    res.json(products);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error fetching products",
    });

  }
};

// 📌 Get seller products (OPTION-1)

// =======================
// SELLER PRODUCTS
// =======================

export const getMyProducts = async (req, res) => {

  try {

    const { sellerEmail } = req.query;

    const products = await Product.find({
      sellerEmail,
    }).sort({
      createdAt: -1,
    });

    res.json(products);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error fetching seller products",
    });

  }

};

// 📌 Add product (OPTION-1: NO AUTH)
// =======================
// ADD PRODUCT
// Default Status Pending
// =======================

export const addProduct = async (req, res) => {

  try {

    const {
      name,
      description,
      price,
      image,
      category,
      sellerEmail,
    } = req.body;

    // Admin product direct approved
const status =
  sellerEmail === "admin@amashop.com"
    ? "approved"
    : "pending";

const product = new Product({

  name,

  description,

  price,

  image,

  category,

  sellerEmail,

  status,

  featured: false,

  bestSeller: false,

  inStock: true,

});

    const createdProduct =
      await product.save();

    res.status(201).json(createdProduct);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error saving product",
    });

  }

};
// 📌 Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// 📌 Delete product (OPTION-1)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting product" });
  }
};
// =======================
// ADMIN - GET ALL PRODUCTS
// =======================

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error fetching all products",
    });
  }
};

// =======================
// ADMIN - APPROVE PRODUCT
// =======================

export const approveProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
      },
      {
        new: true,
        runValidators: false,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product Approved Successfully",
      product,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};