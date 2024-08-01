const express = require('express');
const { getAllCanteens } = require('../controllers/canteen/getCanteen');
const { createCanteen } = require('../controllers/canteen/postCanteen');
const router = express.Router();

router.route('/get').get(getAllCanteens);
router.route('/add').post(createCanteen);

module.exports = router;