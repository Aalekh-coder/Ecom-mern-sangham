const express = require("express");

const { searchProducts } = require("../../Controllers/shop/searchController");

const router = express.Router();

router.get("/:keyword", searchProducts);

module.exports = router;