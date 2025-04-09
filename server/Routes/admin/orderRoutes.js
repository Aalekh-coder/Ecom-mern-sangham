const express = require("express");
const {
  getAllOrdersOfAllUsers,
} = require("../../Controllers/admin/orderController");

const router = express.Router();

router.get("/get", getAllOrdersOfAllUsers);

module.exports = router;
