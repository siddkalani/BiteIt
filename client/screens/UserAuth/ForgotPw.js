import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GlobalHeader from "../../components/Layout/GlobalHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { resendOtp, verifyResentOtp, resetPassword } from "../../api/userAuth";

const ForgotPw = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for button re-enabling
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendCode = async () => {
    // Clear any previous error message
    setErrorMessage("");
  
    // Email validation
    if (!email) {
      setErrorMessage("Please enter an email");
      return; // Stop further execution
    } else if (!email.endsWith("@somaiya.edu")) {
      setErrorMessage("Please enter a valid @somaiya.edu email");
      return; // Stop further execution
    }
  
    // If validation passes, proceed to send the code
    setIsSendingCode(true);
    setCountdown(60); // Disable button for 60 seconds
  
    try {
      await resendOtp(email, setStep);
    } catch (error) {
      setCountdown(0); // Reset countdown on error
      setErrorMessage("Failed to send verification code.");
    } finally {
      setIsSendingCode(false);
    }
  };
  

  const handleOtpChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpVerify = async () => {
    setIsVerifyingOtp(true);
    setErrorMessage("");

    try {
      await verifyResentOtp(email, otp, setStep);
    } catch (error) {
      setErrorMessage("Failed to verify OTP.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handlePasswordReset = async () => {
    setIsResettingPassword(true);
    setErrorMessage("");

    try {
      await resetPassword(email, otp, newPassword, confirmPassword, navigation);
    } catch (error) {
      setErrorMessage("Failed to reset password.");
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        paddingBottom: Platform.OS === "ios" ? 0 : bottom,
      }}
      className="bg-white flex-1"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View className="bg-white px-4 py-3">
        <GlobalHeader title="Forgot Password" />
      </View>

      <View className="flex-1 px-5 space-y-8 mt-4 items-center">
        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <Text className="text-3xl font-bold text-center mb-4">Forgot Password?</Text>
            <Text className="text-base text-gray-500 text-center mb-6">Enter your email to receive a verification code.</Text>
            <TextInput
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
              style={{
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_mini,
              }}
              className="w-full border p-3 rounded-lg border-gray-300 mb-4"
            />
            {errorMessage ? (
              <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
            ) : null}
            <TouchableOpacity className="w-full" onPress={handleSendCode} disabled={isSendingCode}>
              <LinearGradient colors={["#007022", "#54d17a", "#bcffd0"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} className="rounded-md">
                {isSendingCode ? (
                  <ActivityIndicator size="small" color="#ffffff" className="py-4" />
                ) : (
                  <Text className="text-white font-bold text-lg text-center py-4">
                   Send Code
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <>
            <Text className="text-3xl font-bold text-center mb-4">Enter OTP</Text>
            <Text className="text-base text-gray-500 text-center mb-6">Enter the code sent to <Text className="text-green-600">{email}</Text>.</Text>
            <View className="flex-row justify-center space-x-2 mb-6">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  className={`w-12 h-12 text-2xl text-center rounded-lg border ${
                    digit ? "border-green-600" : "border-gray-300"
                  }`}
                  maxLength={1}
                  keyboardType="numeric"
                />
              ))}
            </View>
            {errorMessage ? (
              <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
            ) : null}
            <TouchableOpacity className="w-full" onPress={handleOtpVerify} disabled={isVerifyingOtp}>
              <LinearGradient colors={["#007022", "#54d17a", "#bcffd0"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} className="rounded-md">
                {isVerifyingOtp ? (
                  <ActivityIndicator size="small" color="#ffffff" className="py-4" />
                ) : (
                  <Text className="text-white font-bold text-lg text-center py-4">Verify OTP</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity className="mt-4" onPress={handleSendCode} disabled={isSendingCode || countdown > 0}>
              <Text className="text-center text-blue-500 font-bold">
                {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Step 3: Create New Password */}
        {step === 3 && (
          <>
            <Text className="text-3xl font-bold text-center mb-4">Create New Password</Text>
            <TextInput
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              style={{
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_mini,
              }}
              className="w-full border p-3 rounded-lg border-gray-300 mb-4"
            />
            <TextInput
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={{
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_mini,
              }}
              className="w-full border p-3 rounded-lg border-gray-300 mb-4"
            />
            {errorMessage ? (
              <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
            ) : null}
            <TouchableOpacity className="w-full" onPress={handlePasswordReset} disabled={isResettingPassword}>
              <LinearGradient colors={["#007022", "#54d17a", "#bcffd0"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} className="rounded-md">
                {isResettingPassword ? (
                  <ActivityIndicator size="small" color="#ffffff" className="py-4" />
                ) : (
                  <Text className="text-white font-bold text-lg text-center py-4">Reset Password</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity className="mt-4" onPress={() => setStep(2)}>
              <Text className="text-center text-blue-500 font-bold">Back to OTP</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPw;
