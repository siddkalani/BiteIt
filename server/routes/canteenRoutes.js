const express = require("express");
const { getAllCanteens } = require("../controllers/canteen/getCanteen");
const { createCanteen } = require("../controllers/canteen/postCanteen");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { getCanteenStatus} = require("../controllers/canteen/canteenStatus");
const { updateCanteenStatus } = require("../controllers/canteen/updateOnlineStatus");

// router.use(validateToken);

router.route("/get").get(getAllCanteens);
router.route("/add").post(createCanteen);
router.route("/status").get(getCanteenStatus);
router.route('/:id/status').patch(updateCanteenStatus)
router.route('/:id/status').get(getCanteenStatus)

module.exports = router;
