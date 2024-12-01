import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { Alert, Platform, ActivityIndicator, View } from "react-native";
import * as Notifications from "expo-notifications";
import AppNavigator from "./navigation";
import store from "./store";
import { initializeSocket, cleanupSocket } from "./services/foodItemSocketService";

// Set up Android notification channel
if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
  });
}

const App = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
  });

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (Platform.OS === "ios") {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          Alert.alert("Failed to get push token for push notification!");
          return;
        }
      }

      try {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo Push Token:", token);
      } catch (error) {
        console.error("Failed to get push token:", error);
      }
    };

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
        const { title, body } = notification.request.content;
        Alert.alert(title, body);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { title, body } = response.notification.request.content;
        Alert.alert(title, body);
      });

    registerForPushNotificationsAsync();
    initializeSocket();

    return () => {
      notificationListener.remove();
      responseListener.remove();
      cleanupSocket();
    };
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
