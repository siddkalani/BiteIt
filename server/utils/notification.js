const { Expo } = require("expo-server-sdk");

const expo = new Expo();

const sendNotification = async (userId, title, body) => {
  const pushToken = await getUserPushToken(userId); // Function to retrieve the user's Expo push token

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

  try {
    await expo.sendPushNotificationsAsync([message]);
    console.log("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

module.exports = { sendNotification };
