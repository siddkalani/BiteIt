import React, { useState } from "react";
import {
  StatusBar,
  Pressable,
  Text,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../../store/Slices/userDetailSlice";
import { AntDesign } from '@expo/vector-icons'; // To use arrow icon
import { TouchableOpacity } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const LogIn = () => {
  const navigation = useNavigation();
  const loginStatus = useSelector((state) => state.users.loginStatus);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  // Google Auth State
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '908599769443-pc2g0ipv4mqbuj5luio3d3ltdvcebnrm.apps.googleusercontent.com',
    redirectUri: 'https://canteenApp.expoapp.com/__/auth/handler',
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // Handle authentication (e.g., store token, navigate, etc.)
      Alert.alert("Success", "Logged in with Google!");
      navigation.navigate("FacultyHome"); // Navigate to the next page
    } else if (response?.type === "error") {
      Alert.alert("Error", "Login failed. Please try again.");
    }
  }, [response]);

  // Handle Google Login
  const handleFacultyLogin = () => {
    promptAsync(); // Initiate Google Login
  };

  // Dummy navigation for continue button
  const handleLogin = () => {
    navigation.navigate("Otp");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Avoid scrolling when keyboard appears
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-[#F4F5F9]">
        <StatusBar translucent backgroundColor="transparent" />
        <View className="absolute top-0 left-0 right-0 bottom-0">
          <Image
            source={require("../../assets/images/signIn/signIn.png")}
            style={{ resizeMode: "cover", height: "100%", width: "100%" }}
          />
        </View>
        <View className="absolute bottom-0 w-full flex-1 bg-[#F4F5F9] rounded-t-2xl px-4 py-6 space-y-5">
          <View>
            <Text
              style={{
                fontFamily: FontFamily.poppinsBold,
                fontSize: FontSize.textRegularLowercase_size,
              }}
            >
              Welcome back!
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.poppinsMedium,
                fontSize: FontSize.size_mini,
              }}
              className="text-[#868889] mt-[-4]"
            >
              Log in or Sign up{" "}
            </Text>
          </View>

          {/* Faculty Login Option */}
          <TouchableOpacity
            onPress={handleFacultyLogin} // Trigger Google Login
            style={[styles.facultyLoginContainer, styles.inputContainer]}
          >
            <Text
              style={{
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_mini,
                fontWeight: 600,
              }}
            >
              Faculty Login
            </Text>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>

          {/* Continue Button */}
          <LinearGradient
            colors={["#007022", "#54d17a", "#bcffd0"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.9, y: 0 }}
            className="rounded-xl"
          >
            <Pressable
              className="p-3 justify-center items-center"
              onPress={handleLogin}
            >
              <Text
                className="text-white"
                style={{
                  fontFamily: FontFamily.poppinsSemiBold,
                  fontSize: FontSize.size_lg,
                }}
              >
                Continue
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
  },
  facultyLoginContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
});

export default LogIn;
