const express = require("express");
const { getItem, getAllItems } = require("../controllers/fooodItem/getItem");
const { createItem } = require("../controllers/fooodItem/postItem");
const router = express.Router();

router.route("/get/:id").get(getItem);
router.route("/get").get(getAllItems);
router.route("/add").post(createItem);

module.exports = router;
