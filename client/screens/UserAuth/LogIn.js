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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constant";


WebBrowser.maybeCompleteAuthSession();

const LogIn = () => {
  const navigation = useNavigation();
 
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "719859135966-8gls5oiqt6hkavhqr7jugf6tl33osbgr.apps.googleusercontent.com",
    iosClientId: "719859135966-5sitmd20k7rl8e453b3l9p8s7fop58le.apps.googleusercontent.com",
    webClientId: "719859135966-1mhgra987t2htp3g7brnuatu65q45gnh.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleGoogleLogin();
  }, [response]);

  async function handleGoogleLogin() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);

      // Send email to backend for validation
      await validateUser(user.email);
      
    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
  };

  const validateUser = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/faculty/login`, { // Replace with your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();

  
      if (data && data.message === "Login successful") {
        await AsyncStorage.setItem("userId", data.facultyId);
        await AsyncStorage.setItem("userToken", data.token);

        await AsyncStorage.removeItem("@user");
        
        navigation.navigate("ClientTabs");
      } else if (data && data.message) {
        Alert.alert("Error", data.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error validating user: ", error);
      Alert.alert("Error", "There was a problem logging in. Please try again.");
    }
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
           onPress={() => promptAsync()}
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
              onPress={() => promptAsync()}
            >
              <Text
                className="text-white"
                style={{
                  fontFamily: FontFamily.poppinsSemiBold,
                  fontSize: FontSize.size_lg,
                }}
              >
               FacultyLogin
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
