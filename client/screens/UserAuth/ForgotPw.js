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

const ForgotPw = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();
  const phone = route.params?.phone;

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

  const handleVerify = () => {
    navigation.navigate("ClientTabs");
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
            <Text className="text-green-600">{phone}</Text>.
          </Text>
        </View>

        <View className="">
          <TextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            style={{
              fontFamily: FontFamily.poppinsRegular,
              fontSize: FontSize.size_mini,
            }}
            className="w-full h-12 border p-4 rounded-lg border-gray-300"
          />
          <TouchableOpacity className="mt-2">
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

          <View className="mt-5 items-center flex-row justify-center">
            <Text className="text-gray-500">Didn’t receive a code?</Text>
            <TouchableOpacity>
              <Text className="text-green-600 font-bold ml-1"> Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPw;
