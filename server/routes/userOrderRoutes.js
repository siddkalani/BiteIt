const express = require("express");

const { createOrder } = require("../controllers/userOrder/postOrder");
const {
  getUserOrders,
  getUserOrderHistory,
} = require("../controllers/userOrder/getOrder");
const {
  updateOrderStatus,
} = require("../controllers/userOrder/updateOrderStatus");
const router = express.Router();

router.route("/:userId").get(getUserOrders);
router.route("/history/:userId").get(getUserOrderHistory);
router.route("/add").post(createOrder);
router.route("/update-status/:id").post(updateOrderStatus);

module.exports = router;
