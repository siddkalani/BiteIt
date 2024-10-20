const express = require("express");
const { getAllCanteens } = require("../controllers/canteen/getCanteen");
const { createCanteen } = require("../controllers/canteen/postCanteen");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { getCanteenStatus, updateCanteenStatus } = require("../controllers/canteen/canteenStatus");

// router.use(validateToken);

router.route("/get").get(getAllCanteens);
router.route("/add").post(createCanteen);
router.route("/status").get(getCanteenStatus);
router.route("/status").patch(updateCanteenStatus);

module.exports = router;
