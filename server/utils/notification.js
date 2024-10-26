const { Expo } = require("expo-server-sdk");
const User = require('../models/userModel'); 

const expo = new Expo();

const sendNotification = async (userId, title, body) => {
  try {
    const user = await User.findById(userId).select('pushToken');

    if (!user || !user.pushToken) {
      console.error("User or push token not found");
      return;
    }

    const pushToken = user.pushToken;

    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      return;
    }

    const message = {
      to: pushToken,
      sound: "default",
      title,
      body,
      data: { userId },
    };

    const response = await expo.sendPushNotificationsAsync([message]);
    console.log("Notification sent successfully", response);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

module.exports = { sendNotification };
