import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
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


  const handleSendCode = async() =>{
    resendOtp(email, setStep)
  }

  const handleOtpChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text.charAt(0).toLowerCase() + text.slice(1)); // Ensure the first letter is lowercase
  };


const handleOtpVerify = () =>{
  verifyResentOtp(email, otp, setStep)
}

  const handlePasswordReset = () =>{
    resetPassword(email, otp, newPassword, confirmPassword, navigation)
  }
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
              onChangeText={handleEmailChange}
              style={{
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_mini,
              }}
              className="w-full border p-3 rounded-lg border-gray-300 mb-4"
            />
            <TouchableOpacity className="w-full" onPress={handleSendCode}>
              <LinearGradient colors={["#007022", "#54d17a", "#bcffd0"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} className="rounded-md">
                <Text className="text-white font-bold text-lg text-center py-4">Send Code</Text>
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
            <TouchableOpacity className="w-full" onPress={handleOtpVerify}>
              <LinearGradient colors={["#007022", "#54d17a", "#bcffd0"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} className="rounded-md">
                <Text className="text-white font-bold text-lg text-center py-4">Verify OTP</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity className="mt-4" onPress={() => setStep(1)}>
              <Text className="text-center text-blue-500 font-bold">Back to Email</Text>
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
              className="w-full h-12 border p-4 rounded-lg border-gray-300 mb-4"
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
              className="w-full h-12 border p-4 rounded-lg border-gray-300 mb-4"
            />
            <TouchableOpacity className="w-full" onPress={handlePasswordReset}>
              <LinearGradient colors={["#007022", "#54d17a", "#bcffd0"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} className="rounded-md">
                <Text className="text-white font-bold text-lg text-center py-4">Reset Password</Text>
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
