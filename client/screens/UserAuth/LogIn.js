import React, { useState , useEffect} from "react";
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
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import * as IconF from "react-native-feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import GlobalHeader from "../../components/Layout/GlobalHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { axiosInstance } from "../../utils/refreshToken";
import { loginUser } from "../../api/userAuth";

const LogIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
        Alert.alert("Error", "Please enter your email and password.");
        return;
    }
    loginUser(email, password, navigation);
     setEmail('');
     setPassword('');
};
 
  const handleForgotPassword = () => {
    navigation.navigate("ForgotPw");
  };

  const handleSignUp = () => {
    navigation.navigate("CreateAccount");
  };

  const { top, bottom } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Avoid scrolling when keyboard appears
      style={{ flex: 1 }}
    >
      <SafeAreaView  style={{
            flex: 1,
            paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
            paddingBottom: Platform.OS === "ios" ? 0 : bottom,
          }} className="flex-1 bg-[#F4F5F9]">
        <StatusBar translucent backgroundColor="transparent" />
        <View className="bg-transparent px-4 py-3 z-[100]">
          <GlobalHeader title="Welcome" backgroundColor={'transparent'} textColor={'text-white'} iconColor={'white'} />
        </View>
        <View className="absolute top-0 left-0 right-0 bottom-0">
          <Image
            source={require("../../assets/images/signIn/signIn.png")}
            style={{ resizeMode: "cover", height: "100%", width: "100%" }}
          />
        </View>
        <View className="absolute bottom-0 w-full flex-1 bg-[#F4F5F9] rounded-t-2xl px-4 py-6 space-y-2">
          <View>
            <Text
              style={{
                fontFamily: FontFamily.poppinsBold,
                fontSize: FontSize.textRegularLowercase_size,
              }}
              className={`text-xl`}
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
          <View className="space-y-2">
            <View style={styles.inputContainer} className="space-x-2">
              <View
                className="text-green-700"
                style={{
                  fontFamily: FontFamily.poppinsRegular,
                  fontSize: FontSize.size_mini,
                  fontWeight: 600,
                }}
              >
                <IconF.Mail width={20} height={20} stroke="gray" />
              </View>
              <TextInput
                placeholder="Enter mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="default"
                style={{
                  fontFamily: FontFamily.poppinsRegular,
                  fontSize: FontSize.size_mini,
                }}
                className="flex-1"
              />
            </View>

            <View style={styles.inputContainer} className="space-x-2">
              <View
                className="text-green-700"
                style={{
                  fontFamily: FontFamily.poppinsRegular,
                  fontSize: FontSize.size_mini,
                  fontWeight: 600,
                }}
              >
                <IconF.Lock width={20} height={20} stroke="gray" />
              </View>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                keyboardType="default"
                style={{
                  fontFamily: FontFamily.poppinsRegular,
                  fontSize: FontSize.size_mini,
                }}
                className="flex-1"
              />
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text
              style={{
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_mini,
                color: '#0070FF', // Blue color
                textAlign: 'right',
              }}
            >
              Forgot password?
            </Text>
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
               Login
              </Text>
            </Pressable>
          </LinearGradient>

          {/* Sign Up Option */}
          <View style={styles.signUpContainer}>
            <Text
              style={{
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_mini,
                color: '#868889',
              }}
            >
              Don’t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text
                style={{
                  fontFamily: FontFamily.poppinsSemiBold,
                  fontSize: FontSize.size_mini,
                  color: '#0070FF', // Blue color
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default LogIn;
