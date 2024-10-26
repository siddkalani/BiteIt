import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import GlobalHeader from "../../components/Layout/GlobalHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontFamily, FontSize } from "../../GlobalStyles";
import axios from 'axios'
import { BASE_URL } from "../../constants/constant";

const ForgotPw = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("")
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email;

  const handleChangeText = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setFocusedIndex(index);

    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
        setFocusedIndex(index - 1);
      }
    }
  };

  const handleSendCode = async () => {
    const lowercaseEmail = email.toLowerCase();
    try {
      const response = await axios.post(`${BASE_URL}/user/request/reset-password`, {
        email:lowercaseEmail,
      });
  
      if (response.status === 200) {
        Alert.alert("Success", "Verification code sent to your email.");
        // Navigate to the next screen, e.g., a verification code entry screen
        // navigation.navigate("VerificationCodeScreen"); // Replace with your actual screen name
      }
    } catch (error) {
      console.error("Send Code Error:", error);
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "Failed to send verification code.");
      } else {
        Alert.alert("Error", "Network error. Please try again.");
      }
    }
  };
  

  const handleBackPress = () => {
    navigation.navigate("LogIn");
  };

  const handleVerify = async () => {
    const otpValue = otp.join(""); // Join the OTP array into a string
    const lowercaseEmail = email.toLowerCase(); // Ensure the email is in lowercase
    const newPasswordValue = newPassword; // Capture the new password

    try {
      const response = await axios.post(`${BASE_URL}/user/reset-password`, {
        email: lowercaseEmail,
        otp: otpValue,
        newPassword: newPasswordValue,
      });

      if (response.status === 200) {
        Alert.alert("Success", "Your password has been reset successfully.");
        // Optionally navigate to the login screen or another screen
        navigation.navigate("LogIn"); 
      }
    } catch (error) {
      console.error("Verify Error:", error);
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "Failed to reset password.");
      } else {
        Alert.alert("Error", "Network error. Please try again.");
      }
    }
  };


  const { top, bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        paddingBottom: Platform.OS === "ios" ? 0 : bottom,
      }}
      className="bg-white flex-1"
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View className="bg-white px-4 py-3">
        <GlobalHeader title="" />
      </View>

      <View className="flex-1 px-5 space-y-6 mt-4">
        <View className="items-center space-y-2">
          <Text className="text-2xl font-bold">Forgot Password?</Text>
          <Text className="text-base text-gray-500 text-center">
            Please enter the verification code sent to{" "}
            {/* <Text className="text-green-600">{phone}</Text>. */}
          </Text>
        </View>

        <View className="">
          <TextInput
            placeholder={email}
            keyboardType="email-address"
            style={{
              fontFamily: FontFamily.poppinsRegular,
              fontSize: FontSize.size_mini,
            }}
            className="w-full h-12 border p-4 rounded-lg border-gray-300"
          />
          <TouchableOpacity className="mt-2" onPress={handleSendCode}>
            <Text className="text-right text-blue-500">Send code</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              className={`w-14 h-14 text-2xl text-center rounded-lg border items-center justify-center ${
                focusedIndex === index || digit
                  ? "border-green-600"
                  : "border-gray-300"
              }`}
              maxLength={1}
              keyboardType="numeric"
              returnKeyType="next"
            />
          ))}
        </View>

        <View className="">
         

          <View className="mt-5 items-center flex-row justify-center">
            <Text className="text-gray-500">Didn’t receive a code?</Text>
            <TouchableOpacity>
              <Text className="text-green-600 font-bold ml-1"> Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-2xl font-bold">New Password</Text>
        <TextInput
            placeholder="Enter your New Password"
            keyboardType="email-address"
            onChangeText={setNewPassword}
            style={{
              fontFamily: FontFamily.poppinsRegular,
              fontSize: FontSize.size_mini,
            }}
            className="w-full h-12 border p-4 rounded-lg border-gray-300"
          />
           <LinearGradient
            colors={["#007022", "#54d17a", "#bcffd0"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.9, y: 0 }}
            className="rounded-md"
          >
            <Pressable
              onPress={handleVerify}
              className="py-4 items-center"
              android_ripple={{ color: "rgba(255,255,255,0.3)" }}
            >
              <Text className="text-white font-bold text-lg">Verify</Text>
            </Pressable>
          </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPw;
