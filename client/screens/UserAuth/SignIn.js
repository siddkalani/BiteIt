import React, { useState } from "react";
import {
  StatusBar,
  Pressable,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/Slices/userDetailSlice";

const SignIn = () => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginStatus = useSelector((state) => state.users.loginStatus);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ phone: phone })).unwrap();
      Alert.alert("Success", "Logged in successfully");
      navigation.navigate("Otp", { phone: phone });
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", `Failed to log in: ${error.message}`);
    }
  };

  return (
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
        <View className="space-y-2">
          <View style={styles.inputContainer} className="space-x-2">
            <Text
              className="text-green-700"
              style={{
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_mini,
                fontWeight: 600,
              }}
            >
              +91
            </Text>
            <TextInput
              placeholder="Enter phone number"
              value={phone}
              onChangeText={setPhone}
              //   keyboardType="phone-pad"
              style={{
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_mini,
              }}
              className="flex-1"
            />
          </View>
        </View>
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
              {/* {loading ? "Loading..." : "Continue"} */}
              Continue
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
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
  prefix: {
    color: "#007022",
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.poppinsMedium,
    position: "absolute",
    left: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 35, // Space to accommodate the prefix
    fontSize: FontSize.size_mini,
  },
});

export default SignIn;


// import React, { useState } from "react";
// import {
//   StatusBar,
//   Pressable,
//   Text,
//   View,
//   Image,
//   TextInput,
//   Alert,
//   StyleSheet,
//   useWindowDimensions,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import { FontFamily, FontSize } from "../../GlobalStyles";
// import * as Icon from "react-native-feather";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../store/Slices/userDetailSlice";

// const SignIn = () => {
//   const [phone, setPhone] = useState("");
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const loginStatus = useSelector((state) => state.users.loginStatus);
//   const loading = useSelector((state) => state.users.loading);
//   const error = useSelector((state) => state.users.error);

//   const { width } = useWindowDimensions();

//   const handleLogin = async () => {
//     try {
//       await dispatch(loginUser({ phone: phone })).unwrap();
//       Alert.alert("Success", "Logged in successfully");
//       navigation.navigate("Otp", { phone: phone });
//     } catch (error) {
//       console.error("Login Error:", error);
//       Alert.alert("Error", `Failed to log in: ${error.message}`);
//     }
//   };

//   return (
//     <View className="flex-1 bg-[#F4F5F9]" style={styles.container}>
//       <StatusBar translucent backgroundColor="transparent" />
//       <View style={styles.backgroundImageContainer}>
//         <Image
//           source={require("../../assets/images/signIn/signIn.png")}
//           style={styles.backgroundImage}
//         />
//       </View>
//       <View style={[styles.formContainer, width > 600 ? styles.webFormContainer : {}]}>
//         <View>
//           <Text style={styles.welcomeText}>Welcome back!</Text>
//           <Text style={styles.subText}>Log in or Sign up </Text>
//         </View>
//         <View style={styles.inputSection}>
//           <View style={styles.inputContainer}>
//             <Text style={styles.countryCode}>+91</Text>
//             <TextInput
//               placeholder="Enter phone number"
//               value={phone}
//               onChangeText={setPhone}
//               style={styles.textInput}
//               keyboardType="phone-pad"
//             />
//           </View>
//         </View>
//         <LinearGradient
//           colors={["#007022", "#54d17a", "#bcffd0"]}
//           start={{ x: 0, y: 1 }}
//           end={{ x: 1.9, y: 0 }}
//           style={styles.gradientButton}
//         >
//           <Pressable
//             style={styles.button}
//             onPress={handleLogin}
//           >
//             <Text style={styles.buttonText}>
//               {loading ? "Loading..." : "Continue"}
//             </Text>
//           </Pressable>
//         </LinearGradient>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F4F5F9",
//   },
//   backgroundImageContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   backgroundImage: {
//     resizeMode: "cover",
//     height: "100%",
//     width: "100%",
//   },
//   formContainer: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     backgroundColor: "#F4F5F9",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 24,
//     spaceY: 20,
//   },
//   webFormContainer: {
//     width: "50%", // Center the form on the web
//     alignSelf: "center",
//     paddingVertical: 32,
//   },
//   welcomeText: {
//     fontFamily: FontFamily.poppinsBold,
//     fontSize: FontSize.textRegularLowercase_size,
//   },
//   subText: {
//     fontFamily: FontFamily.poppinsMedium,
//     fontSize: FontSize.size_mini,
//     color: "#868889",
//     marginTop: -4,
//   },
//   inputSection: {
//     marginTop: 16,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     padding: 10,
//     borderRadius: 8,
//     spaceX: 10,
//   },
//   countryCode: {
//     color: "#007022",
//     fontSize: FontSize.size_mini,
//     fontFamily: FontFamily.poppinsRegular,
//     fontWeight: "600",
//   },
//   textInput: {
//     flex: 1,
//     fontFamily: FontFamily.poppinsRegular,
//     fontSize: FontSize.size_mini,
//   },
//   gradientButton: {
//     borderRadius: 12,
//     marginTop: 24,
//   },
//   button: {
//     paddingVertical: 12,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontFamily: FontFamily.poppinsSemiBold,
//     fontSize: FontSize.size_lg,
//   },
// });

// export default SignIn;
