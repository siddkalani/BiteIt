const express = require("express");
const {
  getCategory,
  getAllCategories,
} = require("../controllers/categories/getCategory");
const { createCategory } = require("../controllers/categories/postCategory");
const router = express.Router();

router.route("/get/:id").get(getCategory);
router.route("/get").get(getAllCategories);
router.route("/add").post(createCategory);

module.exports = router;
