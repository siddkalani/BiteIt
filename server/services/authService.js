const asyncHandler = require("express-async-handler");
const twilio = require("twilio");
const nodemailer = require("nodemailer");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToekn = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NO;
// const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

const twilioClient = new twilio(accountSid, authToekn);

const sendPhoneOTP = asyncHandler(async (phoneNo, otp) => {
  const sendOtp = await twilioClient.messages.create({
    body: `Hi! Your otp is: ${otp}`,
    // messagingServiceSid: messagingServiceSid,
    to: phoneNo,
    from: twilioPhone,
  });
  if (!sendOtp) {
    console.error("Error sending OTP:");
    throw new Error("Failed to send OTP");
  }
  console.log("OTP sent successfully");
});

const sendEmail = asyncHandler(async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.HOST_EMAIL_PASS,
    },
  });

  const mailData = {
    from: process.env.HOST_EMAIL,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailData);
});

const sendOTPEmail = asyncHandler(async (name, email, otp) => {
  const html = `<p>Hi ${name},</p><p>Your OTP code is: <strong>${otp}</strong></p>`;
  await sendEmail(email, "Email Verification OTP", html);
});

const resendPasswordEmail = asyncHandler(async (name, email, password) => {
  const subject = "Your Password Reset Request";
  const html = `<p>Hello ${name},</p><p>Your password is: <strong>${password}</strong></p><p>Please keep it secure.</p>`;
  await sendEmail(email, subject, html);
});

module.exports = {
  sendPhoneOTP,sendEmail, sendOTPEmail, resendPasswordEmail
};
