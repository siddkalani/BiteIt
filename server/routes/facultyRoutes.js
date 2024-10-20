const express = require("express");
const { facultyLogin } = require("../controllers/faculty/facultyLogin");


const router = express.Router();

// Faculty login route
router.route("/login").post(facultyLogin);

module.exports = router;
