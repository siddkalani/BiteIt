const express = require("express");
const {
  getCategory,
  getAllCategories,
} = require("../controllers/categories/getCategory");
const { createCategory } = require("../controllers/categories/postCategory");
const upload = require("../middleware/multer");
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler')

// router.use(validateToken)

router.route("/get/:id").get(getCategory);
router.route("/get").get(getAllCategories);
router.route("/add").post(upload.single("image"), createCategory);

module.exports = router;
