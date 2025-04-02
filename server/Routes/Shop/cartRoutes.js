const express = require("express");

const {
  addToCart,
  deleteCartItem,
  fetchCartItem,
  updateCartItemQty,
} = require("../../Controllers/shop/CartController");


const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItem);
router.put("/update-cart", updateCartItemQty)
router.delete("/:userId/:productId", deleteCartItem)

module.exports = router