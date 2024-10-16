const express = require("express");
const { getAllCanteens } = require("../controllers/canteen/getCanteen");
const { createCanteen } = require("../controllers/canteen/postCanteen");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/get").get(getAllCanteens);
router.route("/add").post(createCanteen);

module.exports = router;
