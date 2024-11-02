import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AuthLoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      const role = await AsyncStorage.getItem("role"); // Fetch the stored role (e.g., 'admin' or 'user')

      if (userToken && role === "admin") {
        navigation.replace("AdminTabs"); // If admin, go to Admin screen
      } else if (userToken) {
        navigation.replace("ClientTabs"); // If user, go to User screen
      } else {
        navigation.replace("Intro"); // If not logged in, go to Login/Intro screen
      }
    };
    checkAuth();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#309624" />
    </View>
  );
};

export default AuthLoadingScreen;
