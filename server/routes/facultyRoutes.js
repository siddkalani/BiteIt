const express = require("express");
const { loginFaculty } = require("../controllers/userAuth/emailOTPVerification/loginFaculty");
const { registerFaculty } = require("../controllers/userAuth/emailOTPVerification/registerFaculty");
const { verifyEmailOTP } = require("../controllers/userAuth/emailOTPVerification/verifyEmailOTP");
const { requestPasswordReset } = require("../controllers/userAuth/emailOTPVerification/resendEmailOTP");
const { verifyOtpAndResetPassword } = require("../controllers/userAuth/emailOTPVerification/verifyResendOtp");

const router = express.Router();

router.route('/login').post(loginFaculty);
router.route('/register').post(registerFaculty)
router.route('/verify/otp').post(verifyEmailOTP)
router.route('/request/reset-password').post(requestPasswordReset)
router.route('/reset-password').post(verifyOtpAndResetPassword)

module.exports = router;
