const express = require("express");
const { getItem, getAllItems } = require("../controllers/fooodItem/getItem");
const { createItem } = require("../controllers/fooodItem/postItem");
const upload = require("../middleware/itemMulter");
const { searchItems } = require("../controllers/foodItemSearch/search");
const router = express.Router();

router.route("/get/:id").get(getItem);
router.route("/get").get(getAllItems);
router.route("/add").post(upload.single("image"), createItem);
router.route("/search").get(searchItems);

module.exports = router;
