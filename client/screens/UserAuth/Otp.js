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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
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
      console.log("Response Data:", data); // Debugging line

      if (
        response.status === 200 &&
        data.message === "User phone verified successfully!"
      ) {
        // Save user details and token
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userName", data.user.name);
        await AsyncStorage.setItem("userId", data.user.id);

        navigation.replace("Home");
      } else if (response.status === 200 && data.message === "Admin phone verified successfully!") {
        // Save user details and token
        await AsyncStorage.setItem("userToken", data.token);
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

      // Handling specific error case here
      if (error.response) {
        const errorData = error.response.data;
        const errorStatus = error.response.status;

        console.error("Error Response Data:", errorData);
        console.error("Error Response Status:", errorStatus);

        // Check for the specific error message and navigate
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
    // navigation.navigate("Home")
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
      }}
      className="bg-[#ffffff]"
    >
      <RNStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View className="flex-1 py-2 items-center">
        <View className="w-[90%] space-y-10">
          <TouchableOpacity onPress={handleBackPress} className="p-2">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View className="items-center">
            <Text className="text-3xl font-bold text-primary">
              OTP Verification
            </Text>
            <Text className="text-sm font-semibold text-gray-700 mt-2">
              Verification code sent to +91{phone}
            </Text>
          </View>

          <View className="flex-row justify-center">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                className={`caret-transparent w-12 h-12 border rounded-md text-3xl font-bold text-gray-800 items-center text-center mx-2 ${
                  focusedIndex === index || digit
                    ? "border-orange-500"
                    : "border-chocolate-100"
                }`}
                maxLength={1}
                keyboardType="numeric"
                returnKeyType="next"
              />
            ))}
          </View>

          <View className="rounded-md">
            <LinearGradient
              colors={["#007022", "#54d17a", "#bcffd0"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1.9, y: 0 }}
              className="rounded-xl"
            >
              <Pressable
                onPress={handleVerify}
                className="p-3 justify-center items-center"
              >
                <Text
                  className="text-white"
                  style={{
                    fontFamily: FontFamily.poppinsSemiBold,
                    fontSize: FontSize.size_lg,
                  }}
                >
                  Verify
                </Text>
              </Pressable>
            </LinearGradient>

            <View className="flex-row justify-center mt-4">
              <Text className="text-gray-700 text-sm font-semibold">
                Didn’t receive a code?
              </Text>
              <TouchableOpacity>
                <Text className="text-orange-500 text-sm font-bold ml-1">
                  Resend
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTP;


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
//   StyleSheet,
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

//    const handleVerify = async () => {
//     try {
//       const response = await axios.post(`${BASE_URL}/user/verify/phone/otp`, {
//         phone: phone,
//         otp: otp.join(""),
//       });
//       const data = response.data;
//       console.log("Response Data:", data); // Debugging line

//       if (
//         response.status === 200 &&
//         data.message === "Phone number verified successfully!"
//       ) {
//         // Save user details and token
//         await AsyncStorage.setItem("userToken", data.token);
//         await AsyncStorage.setItem("userName", data.user.name);
//         await AsyncStorage.setItem("userId", data.user.id);

//         navigation.replace("Home");
//       } else if (response.status === 200 && data.message === "Admin found") {
//         // Save user details and token
//         await AsyncStorage.setItem("userToken", data.token);
//         if (data.user?.name) {
//           await AsyncStorage.setItem("userName", data.user.name);
//         }
//         await AsyncStorage.setItem("userId", data.user?.id || "");

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
//     >
//       <RNStatusBar
//         barStyle="dark-content"
//         backgroundColor="transparent"
//         translucent
//       />
//       <View style={styles.container}>
//         <View style={styles.contentContainer}>
//           <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
//             <Ionicons name="arrow-back" size={24} color="black" />
//           </TouchableOpacity>

//           <View style={styles.headerContainer}>
//             <Text style={styles.title}>OTP Verification</Text>
//             <Text style={styles.subtitle}>
//               Verification code sent to +91{phone}
//             </Text>
//           </View>

//           <View style={styles.otpContainer}>
//             {otp.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 ref={(ref) => (inputRefs.current[index] = ref)}
//                 value={digit}
//                 onChangeText={(text) => handleChangeText(text, index)}
//                 onKeyPress={(e) => handleKeyPress(e, index)}
//                 onFocus={() => setFocusedIndex(index)}
//                 onBlur={() => setFocusedIndex(null)}
//                 style={[
//                   styles.otpInput,
//                   focusedIndex === index || digit
//                     ? styles.otpInputFocused
//                     : styles.otpInputDefault,
//                 ]}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 returnKeyType="next"
//               />
//             ))}
//           </View>

//           <View style={styles.buttonContainer}>
//             <LinearGradient
//               colors={["#007022", "#54d17a", "#bcffd0"]}
//               start={{ x: 0, y: 1 }}
//               end={{ x: 1.9, y: 0 }}
//               style={styles.gradientButton}
//             >
//               <Pressable onPress={handleVerify} style={styles.verifyButton}>
//                 <Text style={styles.verifyButtonText}>Verify</Text>
//               </Pressable>
//             </LinearGradient>

//             <View style={styles.resendContainer}>
//               <Text style={styles.resendText}>Didn’t receive a code?</Text>
//               <TouchableOpacity>
//                 <Text style={styles.resendButton}>Resend</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   contentContainer: {
//     width: "100%",
//     maxWidth: 500,
//   },
//   backButton: {
//     padding: 10,
//   },
//   headerContainer: {
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#007022",
//   },
//   subtitle: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#868889",
//     marginTop: 5,
//     textAlign: "center",
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginVertical: 20,
//   },
//   otpInput: {
//     width: 50,
//     height: 50,
//     textAlign: "center",
//     fontSize: 22,
//     fontWeight: "bold",
//     borderRadius: 8,
//     padding: 10,
//   },
//   otpInputDefault: {
//     borderColor: "#ddd",
//     borderWidth: 1,
//     backgroundColor: "#f4f5f9",
//   },
//   otpInputFocused: {
//     borderColor: "#007022",
//     borderWidth: 2,
//     backgroundColor: "#fff",
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   gradientButton: {
//     borderRadius: 10,
//   },
//   verifyButton: {
//     paddingVertical: 15,
//     alignItems: "center",
//   },
//   verifyButtonText: {
//     fontSize: 18,
//     color: "#fff",
//     fontWeight: "600",
//   },
//   resendContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   resendText: {
//     fontSize: 14,
//     color: "#868889",
//   },
//   resendButton: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#ff7f50",
//     marginLeft: 5,
//   },
// });

// export default OTP;
