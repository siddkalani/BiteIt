// import React, { useState, useRef } from "react";
// import {
//   Text,
//   Pressable,
//   TextInput,
//   View,
//   TouchableOpacity,
//   Platform,
//   SafeAreaView,
//   StatusBar as RNStatusBar,
//   Alert,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { LinearGradient } from "expo-linear-gradient";
// import { FontFamily, FontSize } from "../../GlobalStyles";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import axios from "axios";
// import { BASE_URL } from "@env";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const OTP = () => {
//   const [otp, setOtp] = useState(["", "", "", "", ""]);
//   const [focusedIndex, setFocusedIndex] = useState(null);
//   const inputRefs = useRef([]);
//   const navigation = useNavigation();
//   const route = useRoute();

//   const phone = route.params?.phone;

//   const handleChangeText = (text, index) => {
//     let newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);
//     setFocusedIndex(index);

//     if (text.length === 1 && index < inputRefs.current.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
//       if (index > 0) {
//         inputRefs.current[index - 1].focus();
//         setFocusedIndex(index - 1);
//       }
//     }
//   };

//   const handleBackPress = () => {
//     navigation.navigate("SignIn");
//   };

//   const handleVerify = async () => {
//     try {
//       const response = await axios.post(`${BASE_URL}/user/verify/phone/otp`, {
//         phone: phone,
//         otp: otp.join(""),
//       });
//       const data = response.data;
//       console.log("Response Data:", data); // Debugging line

//       if (
//         response.status === 200 &&
//         data.message === "User phone verified successfully!"
//       ) {
//         // Save user details and token
//         await AsyncStorage.setItem("userToken", data.token);
//         await AsyncStorage.setItem("userName", data.user.name);
//         await AsyncStorage.setItem("userId", data.user.id);

//         navigation.replace("Home");
//       } else if (response.status === 200 && data.message === "Admin phone verified successfully!") {
//         // Save user details and token
//         await AsyncStorage.setItem("userToken", data.token);
//         if (data.admin?.name) {
//           await AsyncStorage.setItem("adminName", data.admin.name);
//         }
//         await AsyncStorage.setItem("adminId", data.admin?.id || "");

//         navigation.replace("AdminHome");
//       } else if (
//         response.status === 400 &&
//         data.error === "Name is required for new users"
//       ) {
//         navigation.replace("NewUser", { phone: phone, otp: otp.join("") });
//       } else {
//         Alert.alert("Error", "Invalid OTP");
//       }
//     } catch (error) {
//       console.error("Verification Error:", error);

//       // Handling specific error case here
//       if (error.response) {
//         const errorData = error.response.data;
//         const errorStatus = error.response.status;

//         console.error("Error Response Data:", errorData);
//         console.error("Error Response Status:", errorStatus);

//         // Check for the specific error message and navigate
//         if (
//           errorStatus === 400 &&
//           errorData.error === "Name is required for new users"
//         ) {
//           navigation.replace("NewUser", { phone: phone, otp: otp.join("") });
//         } else {
//           Alert.alert("Error", "Failed to verify OTP");
//         }
//       } else {
//         Alert.alert("Error", "Network Error. Please try again.");
//       }
//     }
//     // navigation.navigate("Home")
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
//       }}
//       className="bg-[#ffffff]"
//     >
//       <RNStatusBar
//         barStyle="dark-content"
//         backgroundColor="transparent"
//         translucent
//       />
//       <View className="flex-1 py-2 items-center">
//         <View className="w-[90%] space-y-10">
//           <TouchableOpacity onPress={handleBackPress} className="p-2">
//             <Ionicons name="arrow-back" size={24} color="black" />
//           </TouchableOpacity>

//           <View className="items-center">
//             <Text className="text-3xl font-bold text-primary">
//               OTP Verification
//             </Text>
//             <Text className="text-sm font-semibold text-gray-700 mt-2">
//               Verification code sent to +91{phone}
//             </Text>
//           </View>

//           <View className="flex-row justify-center">
//             {otp.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 ref={(ref) => (inputRefs.current[index] = ref)}
//                 value={digit}
//                 onChangeText={(text) => handleChangeText(text, index)}
//                 onKeyPress={(e) => handleKeyPress(e, index)}
//                 onFocus={() => setFocusedIndex(index)}
//                 onBlur={() => setFocusedIndex(null)}
//                 className={`caret-transparent w-12 h-12 border rounded-md text-3xl font-bold text-gray-800 items-center text-center mx-2 ${
//                   focusedIndex === index || digit
//                     ? "border-orange-500"
//                     : "border-chocolate-100"
//                 }`}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 returnKeyType="next"
//               />
//             ))}
//           </View>

//           <View className="rounded-md">
//             <LinearGradient
//               colors={["#007022", "#54d17a", "#bcffd0"]}
//               start={{ x: 0, y: 1 }}
//               end={{ x: 1.9, y: 0 }}
//               className="rounded-xl"
//             >
//               <Pressable
//                 onPress={handleVerify}
//                 className="p-3 justify-center items-center"
//               >
//                 <Text
//                   className="text-white"
//                   style={{
//                     fontFamily: FontFamily.poppinsSemiBold,
//                     fontSize: FontSize.size_lg,
//                   }}
//                 >
//                   Verify
//                 </Text>
//               </Pressable>
//             </LinearGradient>

//             <View className="flex-row justify-center mt-4">
//               <Text className="text-gray-700 text-sm font-semibold">
//                 Didn’t receive a code?
//               </Text>
//               <TouchableOpacity>
//                 <Text className="text-orange-500 text-sm font-bold ml-1">
//                   Resend
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default OTP;

import React, { useState, useRef } from "react";
import {
  Text,
  Pressable,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar as RNStatusBar,
  Alert,
  Dimensions,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTP = () => {
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
    navigation.navigate("SignIn");
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/verify/phone/otp`, {
        phone: phone,
        otp: otp.join(""),
      });
      const data = response.data;

      if (
        response.status === 200 &&
        data.message === "User phone verified successfully!"
      ) {
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userName", data.user.name);
        await AsyncStorage.setItem("userId", data.user.id);

        navigation.replace("Home");
      } else if (
        response.status === 200 &&
        data.message === "Admin phone verified successfully!"
      ) {
        await AsyncStorage.setItem("adminToken", data.token);
        if (data.admin?.name) {
          await AsyncStorage.setItem("adminName", data.admin.name);
        }
        await AsyncStorage.setItem("adminId", data.admin?.id || "");

        navigation.replace("AdminHome");
      } else if (
        response.status === 400 &&
        data.error === "Name is required for new users"
      ) {
        navigation.replace("NewUser", { phone: phone, otp: otp.join("") });
      } else {
        Alert.alert("Error", "Invalid OTP");
      }
    } catch (error) {
      console.error("Verification Error:", error);

      if (error.response) {
        const errorData = error.response.data;
        const errorStatus = error.response.status;

        if (
          errorStatus === 400 &&
          errorData.error === "Name is required for new users"
        ) {
          navigation.replace("NewUser", { phone: phone, otp: otp.join("") });
        } else {
          Alert.alert("Error", "Failed to verify OTP");
        }
      } else {
        Alert.alert("Error", "Network Error. Please try again.");
      }
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
        },
      ]}
    >
      <RNStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>OTP Verification</Text>
          <Text style={styles.subHeaderText}>
            Verification code sent to +91{phone}
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              style={[
                styles.otpInput,
                focusedIndex === index || digit
                  ? styles.otpInputFocused
                  : styles.otpInputDefault,
              ]}
              maxLength={1}
              keyboardType="numeric"
              returnKeyType="next"
            />
          ))}
        </View>

        <View style={styles.verifyButtonContainer}>
          <LinearGradient
            colors={["#007022", "#54d17a", "#bcffd0"]}
            style={styles.gradientButton}
          >
            <Pressable onPress={handleVerify} style={styles.verifyButton}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </Pressable>
          </LinearGradient>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn’t receive a code?</Text>
            <TouchableOpacity>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "5%",
    justifyContent: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 8,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007022",
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555555",
    textAlign: "center",
    marginTop: 8,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
  },
  otpInputDefault: {
    borderColor: "#cccccc",
  },
  otpInputFocused: {
    borderColor: "#007022",
  },
  verifyButtonContainer: {
    width: "100%",
    alignItems: "center",
  },
  gradientButton: {
    borderRadius: 8,
    width: "100%",
  },
  verifyButton: {
    padding: 12,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  resendText: {
    color: "#555555",
    fontSize: 14,
    fontWeight: "600",
  },
  resendLink: {
    color: "#007022",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
});

export default OTP;
