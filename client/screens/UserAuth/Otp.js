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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Notifications from "expo-notifications";

import { BASE_URL } from "../../constants/constant";
import GlobalHeader from "../../components/Layout/GlobalHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();

  const email = route.params?.email;
  // const phone = route.params?.phone;

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

  const handleBackPress = () => {
    navigation.navigate("LogIn");
  };

 

  const handleVerify = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/verify/otp`, {
        email: email,
        otp: otp.join(""),
      });
      const data = response.data;
  
      if (response.status === 200 && data.message === "Email verified successfully.") {
        navigation.replace("Login"); 
      } else {
        Alert.alert("Verification Failed", data.message || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      if (error.response) {
        const errorData = error.response.data;
        Alert.alert("Verification Error", errorData.message || "An error occurred during verification.");
      } else {
        Alert.alert("Error", "Network Error. Please try again.");
      }
    }
  };
  

  const postPushToken = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const pushToken = await getPushTokenFromDevice();

      const response = await axios.post(`${BASE_URL}/user/pushToken`, {
        userId,
        token: pushToken,
      });

      console.log("Push token posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting push token to backend:", error);
    }
  };

  const getPushTokenFromDevice = async () => {
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

    const tokenData = await Notifications.getExpoPushTokenAsync();
    return tokenData.data;
  };

  const { top, bottom } = useSafeAreaInsets();
  return (
    <SafeAreaView style={{
      flex: 1,
      paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
      paddingBottom: Platform.OS === "ios" ? 0 : bottom,
    }}
     className='bg-white flex-1'
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View className="bg-white px-4 py-3 ">
          <GlobalHeader title="" />
        </View>
      <View className="flex-1 px-5 space-y-8 mt-4">
     

        <View className="items-center">
          <Text className="text-2xl font-bold">OTP Verification</Text>
          <Text className="text-base text-gray-500">
            Verification code sent to {email}
          </Text>
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
              className={`w-12 h-12 text-3xl text-center flex-row rounded-md border items-center justify-center ${
                focusedIndex === index || digit
                  ? "border-green-600"
                  : "border-gray-400"
              }`}
              maxLength={1}
              keyboardType="numeric"
              returnKeyType="next"
            />
          ))}
        </View>

        <View className="">
          <LinearGradient
            colors={["#007022", "#54d17a", "#bcffd0"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.9, y: 0 }}
            className="rounded-md"
          >
            <Pressable onPress={handleVerify} className="py-4 items-center">
              <Text className="text-white font-bold text-lg">Verify</Text>
            </Pressable>
          </LinearGradient>

          <View className="mt-5 items-center flex-row justify-center">
            <Text className="text-gray-500">Didn’t receive a code?</Text>
            <TouchableOpacity>
              <Text className="text-green-600 font-bold"> Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTP;










// const handleVerify = async () => {
//   try {
//     const response = await axios.post(`${BASE_URL}/user/verify/phone/otp`, {
//       phone: phone,
//       otp: otp.join(""),
//     });
//     const data = response.data;

//     if (
//       response.status === 200 &&
//       data.message === "User phone verified successfully!"
//     ) {
//       await AsyncStorage.setItem("userToken", data.token);
//       await AsyncStorage.setItem("userName", data.user.name);
//       await AsyncStorage.setItem("userId", data.user.id);
//       console.log(data.token);
//       await postPushToken();
//       navigation.replace("ClientTabs");
//     } else if (
//       response.status === 200 &&
//       data.message === "Admin phone verified successfully!"
//     ) {
//       await AsyncStorage.setItem("adminToken", data.token);

//       if (data.admin?.name) {
//         await AsyncStorage.setItem("adminName", data.admin.name);
//       }
//       await AsyncStorage.setItem("adminId", data.admin?.id || "");
//       await postPushToken();
//       navigation.replace("AdminTabs");
//     } else if (
//       response.status === 400 &&
//       data.error === "Name is required for new users"
//     ) {
//       navigation.replace("NewUser", { phone: phone, otp: otp.join("") });
//     } else {
//       Alert.alert("Error", "Invalid OTP");
//     }
//   } catch (error) {
//     console.error("Verification Error:", error);
//     if (error.response) {
//       const errorData = error.response.data;
//       const errorStatus = error.response.status;
//       if (
//         errorStatus === 400 &&
//         errorData.error === "Name is required for new users"
//       ) {
//         navigation.replace("NewUser", { phone: phone, otp: otp.join("") });
//       } else {
//         Alert.alert("Error", "Failed to verify OTP");
//       }
//     } else {
//       Alert.alert("Error", "Network Error. Please try again.");
//     }
//   }
// };