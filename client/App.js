import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import AppNavigator from "./navigation";
import store from "./store";
import io from "socket.io-client";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configure notification channels for Android
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
    // Register for push notifications
    const registerForPushNotificationsAsync = async () => {
      let token;
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
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo Push Token:", token);

        // The push token is no longer posted to the server here
      } catch (error) {
        console.error("Failed to get push token:", error);
      }
    };

    registerForPushNotificationsAsync();

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

    // Initialize Socket.IO
    const socket = io(BASE_URL); // Replace with your server's IP address

    socket.on("connect", () => {
      console.log("Connected to server");
      // Join a room or emit events as needed
      socket.emit("joinRoom", "roomId");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
      socket.disconnect(); // Clean up socket connection
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

// import * as React from "react";
// import { useFonts } from "expo-font";
// import AppNavigator from "./navigation";
// import { Provider } from "react-redux";
// import store from "./store";

// const App = () => {
//   const [fontsLoaded] = useFonts({
//     "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
//     "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
//     "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
//     "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
//     "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
//   });

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <Provider store={store}>
//       <AppNavigator />
//     </Provider>
//   );
// };

// export default App;

// // // App.js
// // import * as React from "react";
// // import { useFonts } from "expo-font";
// // import AppNavigator from "./navigation";

// // const App = () => {
// //   const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

// //   const [fontsLoaded, error] = useFonts({
// //     "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
// //     "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
// //     "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
// //     "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
// //     "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
// //   });

// //   if (!fontsLoaded && !error) {
// //     return null;
// //   }

// //   return hideSplashScreen ? <AppNavigator /> : null;
// // };

// // export default App;
