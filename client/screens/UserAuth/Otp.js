import React, { useState, useRef } from 'react';
import { Text, Pressable, TextInput, View, TouchableOpacity, Platform, SafeAreaView, StatusBar as RNStatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const OTP = () => {
    const [otp, setOtp] = useState(['', '', '', '','']);
    const [focusedIndex, setFocusedIndex] = useState(null);
    const inputRefs = useRef([]);
    const navigation = useNavigation();

    const handleChangeText = (text, index) => {
        let newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        setFocusedIndex(index); // Keep the current block active

        // Automatically focus the next input
        if (text.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
                setFocusedIndex(index - 1); // Keep the previous block active
            }
        }
    };

    const handleBackPress = () => {
        navigation.navigate("SignIn")
    };
    const handleVerify = () => {
        navigation.navigate("NewUser")
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 }} className='bg-[#ffffff]'>
            <RNStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View className="flex-1 items-center">
                <View className='w-[90%] space-y-10 mt-4'>
                    <TouchableOpacity onPress={handleBackPress} className="p-2 rounded-full">
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>

                    <View className="items-center">
                        <Text className="text-3xl font-bold text-primary">OTP Verification</Text>
                        <Text className="text-sm font-semibold text-gray-700 mt-2">
                            Verification code sent to +91-8238592699
                        </Text>
                    </View>

                    <View className="flex-row justify-center">
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={ref => inputRefs.current[index] = ref}
                                value={digit}
                                onChangeText={(text) => handleChangeText(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                onFocus={() => setFocusedIndex(index)}
                                onBlur={() => setFocusedIndex(null)}
                                className={`caret-transparent w-12 h-12 border rounded-md text-3xl font-bold text-gray-800 items-center text-center mx-2 ${focusedIndex === index || digit ? 'border-orange-500' : 'border-chocolate-100'}`}
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
                            <Pressable onPress={handleVerify} className="p-3 justify-center items-center">
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
                            <Text className="text-gray-700 text-sm font-semibold">Didn’t receive a code?</Text>
                            <TouchableOpacity>
                                <Text className="text-orange-500 text-sm font-bold ml-1">Resend</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default OTP;


// import React, { useState ,useRef} from "react";
// import {
//   StatusBar,
//   Pressable,
//   Text,
//   View,
//   Image,
//   TextInput,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import { FontFamily, FontSize } from "../../GlobalStyles";


// const OTP = () => {
//     const [otp, setOtp] = useState(['', '', '', '','']);
//     const [focusedIndex, setFocusedIndex] = useState(null);
//     const inputRefs = useRef([]);
//     const navigation = useNavigation();

//     const handleChangeText = (text, index) => {
//         let newOtp = [...otp];
//         newOtp[index] = text;
//         setOtp(newOtp);
//         setFocusedIndex(index); // Keep the current block active

//         // Automatically focus the next input
//         if (text.length === 1 && index < inputRefs.current.length - 1) {
//             inputRefs.current[index + 1].focus();
//         }
//     };

//     const handleKeyPress = (e, index) => {
//         if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
//             if (index > 0) {
//                 inputRefs.current[index - 1].focus();
//                 setFocusedIndex(index - 1); // Keep the previous block active
//             }
//         }
//     };

//     const handleBackPress = () => {
//         navigation.navigate("SignIn")
//     };
//     const handleVerify = () => {
//         navigation.navigate("Home")
//     }

//   return (
//     <View className="flex-1 bg-[#F4F5F9]">
//       <StatusBar translucent backgroundColor="transparent" />
//       <View className="absolute top-0 left-0 right-0 bottom-0">
//         <Image
//           source={require("../../assets/images/signIn/signIn.png")}
//           style={{ resizeMode: "cover", height: "100%", width: "100%" }}
//         />
//       </View>
//       <View className="absolute bottom-0 w-full flex-1 bg-[#F4F5F9] rounded-t-2xl px-4 py-6 space-y-6">
//         <View className='space-y-'>
//           <Text
//             style={{
//               fontFamily: FontFamily.poppinsBold,
//               fontSize: FontSize.textRegularLowercase_size,
//             }}
//           >
//             OTP Verification
//           </Text>
//           <Text
//             style={{
//               fontFamily: FontFamily.poppinsMedium,
//               fontSize: FontSize.size_mini,
//             }}
//             className="text-[#868889] mt-[-4]"
//           >
//             Verification code sent to +91-8238592699{" "}
//           </Text>
//         </View>
//         <View className="items-center">
//         <View className="flex-row">
//                 {otp.map((digit, index) => (
//                     <TextInput
//                         key={index}
//                         ref={ref => inputRefs.current[index] = ref}
//                         value={digit}
//                         onChangeText={(text) => handleChangeText(text, index)}
//                         onKeyPress={(e) => handleKeyPress(e, index)}
//                         onFocus={() => setFocusedIndex(index)}
//                         onBlur={() => setFocusedIndex(null)}
//                         className={`caret-transparent w-12 h-12 border-gray-400 border-2 rounded-md text-xl font-bold text-gray-800 items-center justify-center text-center mx-2 ${focusedIndex === index || digit ? 'border-orange-500' : ''}`}
//                         maxLength={1}
//                         keyboardType="numeric"
//                         returnKeyType="next"
//                     />
//                 ))}
//             </View>
//         </View>
//         <LinearGradient
//           colors={["#007022", "#54d17a", "#bcffd0"]}
//           start={{ x: 0, y: 1 }}
//           end={{ x: 1.9, y: 0 }}
//           className="rounded-xl"
//         >
//           <Pressable
//             className="p-3 justify-center items-center"
//             onPress={handleVerify}
//           >
//             <Text
//               className="text-white"
//               style={{
//                 fontFamily: FontFamily.poppinsSemiBold,
//                 fontSize: FontSize.size_lg,
//               }}
//             >
//             {/* {loading ? "Loading..." : "Continue"} */}
//             Verify
//             </Text>
//           </Pressable>
//         </LinearGradient>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     padding: 10,
//     borderRadius: 8,
//     position: "relative",
//   },
//   prefix: {
//     color: "#007022",
//     fontSize: FontSize.size_mini,
//     fontFamily: FontFamily.poppinsMedium,
//     position: "absolute",
//     left: 10,
//   },
//   textInput: {
//     flex: 1,
//     marginLeft: 35, // Space to accommodate the prefix
//     fontSize: FontSize.size_mini,
//   },
// });

// export default OTP;
