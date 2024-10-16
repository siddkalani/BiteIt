const express = require('express');
const { facultyLogin } = require('../controllers/faculty/facultyLogin');

const router = express.Router();

router.route('/login').post(facultyLogin)


module.exports = router;
