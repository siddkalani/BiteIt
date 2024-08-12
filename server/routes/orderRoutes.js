const express = require("express");

const { createOrder } = require("../controllers/userOrder/postOrder");
const {
  getUserOrders,
  getOrderHistory,
} = require("../controllers/userOrder/getOrder");
const {
  updateOrderStatus,
} = require("../controllers/userOrder/updateOrderStatus");
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler')

router.use(validateToken)

router.route("/:userId").get(getUserOrders);
router.route("/history/:userId").get(getOrderHistory);
router.route("/add").post(createOrder);
router.route("/update-status/:id").post(updateOrderStatus);

module.exports = router;
