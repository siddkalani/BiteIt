const asyncHandler = require("express-async-handler");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToekn = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NO;

const twilioClient = new twilio(accountSid, authToekn);

const sendPhoneOTP = asyncHandler(async (phoneNo, otp) => {
  const sendOtp = await twilioClient.messages.create({
    body: `Hi! Your otp is: ${otp}`,
    to: phoneNo,
    from: twilioPhone,
  });
  if (!sendOtp) {
    console.error("Error sending OTP:");
    throw new Error("Failed to send OTP");
  }
  console.log("OTP sent successfully");
});

module.exports = {
  sendPhoneOTP,
};
