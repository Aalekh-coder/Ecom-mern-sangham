const express = require("express");

const { getFilteredProducts,getProductById } = require("../../Controllers/shop/ProductController");

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductById);

module.exports = router;
