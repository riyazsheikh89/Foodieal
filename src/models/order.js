import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: 'India'
    },
    pincode: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },

  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
    }
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: true,
  },
  taxPrice: {
    type: Number,
    required: true,
  },
  shippingCharge: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    default: 'Processing',
    enum: ['Processing', 'Shipped', 'Delivered', 'Canceled']
  },
  deliveredAt: Date,
}, {timestamps: true});


const Order = mongoose.model("Order", orderSchema);

export default Order;
