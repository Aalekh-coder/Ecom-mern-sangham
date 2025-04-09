

const express = require("express");

const { createOrder,capturePayment,getAllOrderByUser,
    getAllOrderDetails } = require("../../Controllers/shop/orderController");

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrderByUser);
router.get("/details/:id", getAllOrderDetails);

module.exports = router;