const express = require("express");
const userLogin = require("../controllers/userAuth/login");
const verifyOtp = require("../controllers/userAuth/verifyPhoneOTP");
const resendOtp = require("../controllers/userAuth/resendPhoneOTP");
const router = express.Router();

router.route('/login').post(userLogin)
router.route('/verify/phone/otp').post(verifyOtp)
router.route('/resend/phone/otp').post(resendOtp)

module.exports = router;
