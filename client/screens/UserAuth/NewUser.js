import React, { useState, useRef } from 'react';
import { Text, Pressable, TextInput, View, TouchableOpacity, Platform, SafeAreaView, StatusBar as RNStatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const NewUser = () => {
    const [otp, setOtp] = useState(['']);
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
        navigation.navigate("Home")
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
                        <Text className="text-3xl font-bold text-primary">Hi User,</Text>
                        <Text className="text-sm font-semibold text-gray-700 mt-2">
                            Enter your name here
                        </Text>
                    </View>

                    <View className="flex-row justify-center">
                        
                            <TextInput
                                
                                // ref={ref => inputRefs.current[index] = ref}
                                // value={digit}
                                // onChangeText={(text) => handleChangeText(text, index)}
                                // onKeyPress={(e) => handleKeyPress(e, index)}
                                // onFocus={() => setFocusedIndex(index)}
                                // onBlur={() => setFocusedIndex(null)}
                                className={`caret-transparent border w-full rounded-md text-xl text-gray-800 justify-center items-center p-2 `}
                                // maxLength={1}
                                // keyboardType="numeric"
                                // returnKeyType="next"
                            />
                       
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
                                    Proceed
                                </Text>
                            </Pressable>
                        </LinearGradient>

                        {/* <View className="flex-row justify-center mt-4">
                            <Text className="text-gray-700 text-sm font-semibold">Didn’t receive a code?</Text>
                            <TouchableOpacity>
                                <Text className="text-orange-500 text-sm font-bold ml-1">Resend</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NewUser;