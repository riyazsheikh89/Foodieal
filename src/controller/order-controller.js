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
            message: "Order not found with the given OrderID!"
        })
      }
      return res.status(200).json({
        success: true,
        data: order,
        message: "Fetched the order",
        err: {}
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: {},
        message: "Something went wrong at fetching the order!",
        err: error
      });
    }
}