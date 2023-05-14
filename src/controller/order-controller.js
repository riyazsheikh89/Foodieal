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

    return res.status(201).json({
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