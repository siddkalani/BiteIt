import { axiosInstance } from "../utils/refreshToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../constants/constant";
import { Alert } from 'react-native';
import * as Notifications from "expo-notifications";
// import axiosInstance from "axiosInstance"

//Handle USER REGISTER
export const registerUser = async (formData, navigation) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/user/register`, formData);
      console.log(response.data);
      navigation.navigate("Otp", { email: formData.email });
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
};

// Function to handle USER LOGIN
export const loginUser = async (email, password, navigation) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/user/login`, {
        email,
        password,
      });
      const data = response.data;
  
      if (response.status === 200) {
        const { token, refreshToken, data: userData, message } = data;
        console.log("Access token:", token);
        console.log("Refresh token:", refreshToken);
  
        if (message === "Admin account found. Please use OTP for login.") {
          navigation.navigate("Otp", { email, isAdmin: true });
          return;
        }
  
        const { name, id, role } = userData;
        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userRefreshToken", refreshToken);
        await AsyncStorage.setItem("userName", name);
        await AsyncStorage.setItem("userId", id);
        await AsyncStorage.setItem("role", role);
  
        if (role === "user" || role === "faculty") {
          navigation.navigate("ClientTabs");
        }
        await postPushToken(); 
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "Login failed.");
      } else {
        Alert.alert("Error", "Network error. Please try again.");
      }
    }
  };
  
  // Function to post push notification token
  export const postPushToken = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const pushToken = await getPushTokenFromDevice();
  
      const response = await axiosInstance.post(`${BASE_URL}/user/pushToken`, {
        userId,
        token: pushToken,
      });
  
      console.log("Push token posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting push token to backend:", error);
    }
  };
  
  // Function to get push notification token from the device
  export const getPushTokenFromDevice = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
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
  
//Handle Otp Verification 
export const verifyOtp = async (email, otp, isAdmin, navigation) => {
    try {
      const verifyUrl = isAdmin 
        ? `${BASE_URL}/user/admin/verify/otp` // URL for admin verification
        : `${BASE_URL}/user/verify/otp`;  // URL for user verification

      const response = await axiosInstance.post(verifyUrl, {
        email: email,
        otp: otp.join(""),
      });
      const data = response.data;
  
      if (response.status === 200 && data.message === "Successful") {
        if (isAdmin) {
          const { token,refreshToken, data: userData, message } = data; 
          const { name, id, role,  } = userData; // Destructure name, id, and role from userData
    
          await AsyncStorage.setItem("userToken", token);
          await AsyncStorage.setItem("userRefreshToken", refreshToken);
          await AsyncStorage.setItem("userName", name);
          await AsyncStorage.setItem("userId", id);
          await AsyncStorage.setItem("role", role);

          navigation.replace("AdminTabs");

        } else {
          navigation.replace("LogIn");
        }
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


//Handle RESEND OTP -> forgot password
  export const resendOtp = async (email, setStep) => {
    const lowercaseEmail = email.toLowerCase();
    
    try {
      const response = await axiosInstance.post(`${BASE_URL}/user/request/reset-password`, {
        email: lowercaseEmail,
      });
  
      if (response.status === 200) {
        Alert.alert("Success", "Verification code sent to your email.");
        setStep(2);
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data.message || "Failed to send verification code.");
    }
  };


//Handle RESENT OTP VERIFICATION -> forgot password
export const verifyResentOtp = async (email, otp, setStep) => {
    const otpValue = otp.join("");
    const lowercaseEmail = email.toLowerCase();
  
    try {
      const response = await axiosInstance.post(`${BASE_URL}/user/verify/resent/otp`, {
        email: lowercaseEmail,
        otp: otpValue,
      });
  
      if (response.status === 200) {
        Alert.alert("Success", "OTP verified. Please create a new password.");
        setStep(3);
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data.message || "Failed to verify OTP.");
    }
  };

//Handle setNEWPASSWORD -> fw pass
  export const resetPassword = async (email, otp, newPassword, confirmPassword, navigation) => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
  
    try {
      const response = await axiosInstance.post(`${BASE_URL}/user/reset-password`, {
        email: email.toLowerCase(),
        otp: otp,
        newPassword,
      });
  
      if (response.status === 200) {
        Alert.alert("Success", "Your password has been reset successfully.");
        navigation.navigate("LogIn");
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data.message || "Failed to reset password.");
    }
  };
  