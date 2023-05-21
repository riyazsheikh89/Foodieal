import Order from "../models/order.js";


// Create new Order
export const placeOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      itemsPrice,
      taxPrice,
      shippingCharge,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo, 
      orderItems, 
      itemsPrice, 
      taxPrice, 
      shippingCharge, 
      totalPrice,
      user: req.user.id,
    });

    return res.status(501).json({
      success: true,
      data: order,
      message: "Successfully placed a order",
      err: {},
    });
  } catch (error) {
    return res.status(201).json({
      success: false,
      data: {},
      message: "Failed to create a order!",
      err: error,
    });
  }
};


// Get a single order details
export const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("user","name email");
    // if order not found
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found with the given OrderID!",
      });
    }
    return res.status(200).json({
      success: true,
      data: order,
      message: "Fetched the order",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      message: "Something went wrong at fetching the order!",
      err: error,
    });
  }
};


// Get all my orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    return res.status(200).json({
      success: true,
      data: orders,
      message: "Fetched all my orders",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      message: "failed to get all orders",
      err: error,
    });
  }
};


// Get all orders -- (ADMIN only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
    return res.status(200).json({
      success: true,
      totalAmount,
      orders,
      message: "Successfully Fetched all orders",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      message: "failed to get all orders",
      err: error,
    });
  }
}


// Update Order Status  -- (ADMIN only)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      console.log('Order not found with this id');
      throw ('Order not found with this id');
    }
    
    if (order.orderStatus === 'Processing') {
      order.orderStatus = 'Shipped';
      await order.save();
    } else if (order.orderStatus === 'Shipped') {
      order.orderStatus = 'Delivered';
      order.deliveredAt = new Date();
      await order.save();
    }

    return res.status(200).json({
      success: true,
      data: order,
      message: "Updated order status successfully",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      message: "failed to update order status",
      err: error,
    });
  }
}