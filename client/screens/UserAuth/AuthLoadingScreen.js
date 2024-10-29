import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AuthLoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        navigation.replace("ClientTabs"); // If logged in, go to Home
      } else {
        navigation.replace("Intro"); // If not, go to Login
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
