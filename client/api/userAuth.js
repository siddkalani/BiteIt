import { axiosInstance } from "../utils/refreshToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../constants/constant";
import { Alert } from 'react-native';
import * as Notifications from "expo-notifications";
import axios from "axios"
import { CommonActions } from "@react-navigation/native";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { clearCart } from "../store/Slices/cartSlice";
//Handle USER REGISTER
export const registerUser = async (formData, navigation, setIsLoading, setErrorMessage) => {
  setIsLoading(true); // Start loading
  setErrorMessage(''); // Clear previous errors

  // Email Validation
  if (!formData.email) {
    setErrorMessage("Please enter an email");
    setIsLoading(false);
    return;
  } else if (!formData.email.includes("@")) {
    setErrorMessage("Please enter a valid email");
    setIsLoading(false);
    return;
  // } else if (!formData.email.endsWith("@somaiya.edu") && formData.email.includes("@")) {
  //   setErrorMessage("Only @somaiya.edu emails are allowed");
  //   setIsLoading(false);
  //   return;
  } else if (!formData.password) {
    setErrorMessage("Please enter a password");
    setIsLoading(false);
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}/user/register`, formData);
    console.log("Registration successful:", response.data);

    if (response.status === 200) {
      navigation.navigate("Otp", { email: formData.email });
    }
  } catch (error) {
    console.error("Registration Error:", error);
    setErrorMessage(error.response?.data.message || "Registration failed.");
  } finally {
    setIsLoading(false); // Stop loading in both success and error cases
  }
};


// Function to handle USER LOGIN
export const loginUser = async (email, password, navigation, setIsLoading, setErrorMessage) => {
  setIsLoading(true);
  setErrorMessage(''); // Clear previous errors

  // Email and Password Validation
  if (!email) {
    setErrorMessage("Please enter email");
    setIsLoading(false);
    return;
  } else if (!email.includes("@")) {
    setErrorMessage("Please enter a valid email");
    setIsLoading(false);
    return
  // } else if (!email.endsWith("@somaiya.edu") && email.includes("@")) {
  //   setErrorMessage("Only @somaiya.edu emails are allowed");
  //   setIsLoading(false);
  //   return;
  } else if (!password) {
    setErrorMessage("Please enter password");
    setIsLoading(false);
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}/user/login`, { email, password });
    const data = response.data;

    if (response.status === 200) {
      const { token, refreshToken, data: userData, message } = data;

      if (message === "Admin account found. Please use OTP for login.") {
        navigation.navigate("Otp", { email, isAdmin: true });
        setIsLoading(false); // Stop loading if OTP login is needed
        return;
      }

      const { name, id, role } = userData;
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userRefreshToken", refreshToken);
      await AsyncStorage.setItem("userName", name);
      await AsyncStorage.setItem("userId", id);
      await AsyncStorage.setItem("role", role);


      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "ClientTabs" }] }));

      if (role === "user" || role === "faculty") {
        navigation.navigate("ClientTabs");
      }
      await postPushToken();
    }
  } catch (error) {
    console.error("Login Error:", error);
    setErrorMessage(error.response?.data.message || "Login failed.");
  } finally {
    setIsLoading(false); // Stop loading in both success and error cases
  }
};


// Function to post push notification token
export const postPushToken = async () => {
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

    const response = await axios.post(verifyUrl, {
      email: email,
      otp: otp.join(""),
    });
    const data = response.data;

    if (response.status === 200 && data.message === "Successful") {
      if (isAdmin) {
        const { token, refreshToken, data: userData, message } = data;
        console.log(token, userData)
        const { name, id, role, canteenId } = userData; // Destructure name, id, and role from userData

        await AsyncStorage.setItem("userToken", token);
        // await AsyncStorage.setItem("userRefreshToken", refreshToken);
        // await AsyncStorage.setItem("userName", name);
        await AsyncStorage.setItem("userId", id);
        await AsyncStorage.setItem("role", role);
        await AsyncStorage.setItem("canteenId", canteenId);
        // await AsyncStorage.setItem("canteenName", canteenName);


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
    const response = await axios.post(`${BASE_URL}/user/request/reset-password`, {
      email: lowercaseEmail,
    });

    if (response.status === 200) {
      Alert.alert("Success", "Verification code sent to your email.");
      setStep(2);
    }
  } catch (error) {
    // Alert.alert("Error", error.response?.data.message || "Failed to send verification code.");
    console.log(error.response?.data.message)
  }
};


//Handle RESENT OTP VERIFICATION -> forgot password
export const verifyResentOtp = async (email, otp, setStep) => {
  const otpValue = otp.join("");
  const lowercaseEmail = email.toLowerCase();

  try {
    const response = await axios.post(`${BASE_URL}/user/verify/resent/otp`, {
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
    const response = await axios.post(`${BASE_URL}/user/reset-password`, {
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


//LOGOUT 
export const logoutUser = async (navigation, dispatch, setIsAuthenticated) => {
  try {
    // Retrieve role from AsyncStorage
    const role = await AsyncStorage.getItem("role");

    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          try {
            // Check role and clear local storage accordingly
            if (role === "admin") {
              // Clear all except userName for admin
              await AsyncStorage.multiRemove(["userToken", "userId", "role","canteenId" ]);
            } else {
              // Clear all data for non-admin users
              await AsyncStorage.multiRemove([
                "userToken",
                "userId",
                "userName",
                "role",
              ]);
            }

            // Clear other states if needed, such as the cart
            dispatch(clearCart());

            // Reset auth status
            setIsAuthenticated(false);

            // Navigate to Intro screen
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Intro" }],
              })
            );
          } catch (error) {
            console.error("Logout Error:", error);
          }
        },
      },
    ]);
  } catch (error) {
    console.error("Error fetching role:", error);
  }
};