import Order from "../models/order.js";

// ===============================
// PLACE ORDER
// ===============================

export const placeOrder = async (req, res) => {
  try {
    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order: savedOrder,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Unable to Place Order",
    });
  }
};

// ===============================
// ADMIN - GET ALL ORDERS
// ===============================

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to Fetch Orders",
    });
  }
};

// ===============================
// SELLER - GET MY ORDERS
// ===============================

export const getSellerOrders = async (req, res) => {
  try {
    const { sellerEmail } = req.query;

    const orders = await Order.find({
      "items.sellerEmail": sellerEmail,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to Fetch Seller Orders",
    });
  }
};

// ===============================
// UPDATE ORDER STATUS
// ===============================

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    if (req.body.orderStatus) {
      order.orderStatus = req.body.orderStatus;
    }

    if (req.body.paymentStatus) {
      order.paymentStatus = req.body.paymentStatus;
    }

    await order.save();

    res.json({
      success: true,
      message: "Order Updated Successfully",
      order,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to Update Order",
    });
  }
};

// ===============================
// DELETE ORDER
// ===============================

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    await order.deleteOne();

    res.json({
      success: true,
      message: "Order Deleted Successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to Delete Order",
    });
  }
};