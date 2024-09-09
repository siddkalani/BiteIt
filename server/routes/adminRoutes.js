const express = require("express");
const addAdmin = require("../controllers/admin/addAdmin");
const {
  getAllAdmins,
  getSingleAdmin,
} = require("../controllers/admin/getAdmin");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { logout } = require("../controllers/userAuth/logout");
const {
  getPendingOrders,
  updateOrderStatus,
} = require("../controllers/admin/adminOrder/getPendingOrder");


// router.use(validateToken);

router.route("/all").get(getAllAdmins);
router.route("/:phone").get(getSingleAdmin);
router.route("/add").post(addAdmin);
router.route("/logout").post(logout);

router.route("/order/pending").get(getPendingOrders);
router.route("/order/status/:id").patch(updateOrderStatus);

module.exports = router;
