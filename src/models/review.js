import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {timestamps: true});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
