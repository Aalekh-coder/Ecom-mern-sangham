
const { Schema, model } = require("mongoose")

const ProductReviewSchema = new Schema(
  {
    productId: String,
    userId: String,
    userName: String,
    reviewValue: Number,
    reviewMessage: String,
  },
  { timestamps: true }
);
const ProductReview = model("ProductReview", ProductReviewSchema);
module.exports = ProductReview;
