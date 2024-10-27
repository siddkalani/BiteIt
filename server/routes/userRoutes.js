const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  postPushToken,
  getPushToken,
} = require("../controllers/userAuth/pushToken");
const { loginUser, adminLoginWithOtp } = require("../controllers/userAuth/email/loginUser");
const { registerUser } = require("../controllers/userAuth/email/registerUser");
const { verifyEmailOTP } = require("../controllers/userAuth/email/verifyOtp");
const { requestPasswordReset } = require("../controllers/userAuth/email/resendOtp");
const {  verifyResentOtp, setNewPassword } = require("../controllers/userAuth/email/verifyResentOtp");
const logoutUser = require("../controllers/userAuth/email/logoutUer");
const refreshAccessToken = require("../controllers/userAuth/email/refreshToken");

const router = express.Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerUser)
router.route('/verify/otp').post(verifyEmailOTP)
router.route('/admin/verify/otp').post(adminLoginWithOtp)
router.route('/request/reset-password').post(requestPasswordReset)
router.route('/verify/resent/otp').post(verifyResentOtp)
router.route('/reset-password').post(setNewPassword)
router.route('/refresh-token').post(refreshAccessToken)
router.route("/pushToken").post(postPushToken);
router.route("/pushToken/:id").get(getPushToken);
router.route('/logout').post(logoutUser)

module.exports = router;
