const express = require("express");
const addAdmin = require("../controllers/admin/addAdmin");
const {
  getAllAdmins,
  getSingleAdmin,
} = require("../controllers/admin/getAdmin");
const router = express.Router();

router.route("/all").get(getAllAdmins);
router.route("/:phone").get(getSingleAdmin);
router.route("/add").post(addAdmin);

module.exports = router;
