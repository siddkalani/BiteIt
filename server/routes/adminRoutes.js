const express = require("express");
const addAdmin = require("../controllers/admin/addAdmin");
const {
  getAllAdmins,
  getSingleAdmin,
} = require("../controllers/admin/getAdmin");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { logout } = require("../controllers/userAuth/logout");

router.use(validateToken);

router.route("/all").get(getAllAdmins);
router.route("/:phone").get(getSingleAdmin);
router.route("/add").post(addAdmin);
router.route("/logout").post(logout);

module.exports = router;
