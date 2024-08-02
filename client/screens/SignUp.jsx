import * as React from "react";
import { SafeAreaView, StatusBar, Pressable, Text, View, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../GlobalStyles";
import * as Icon from 'react-native-feather';

const SignIn = () => {
    const navigation = useNavigation();

    const handleEvent = () => {
        navigation.navigate('Home');
    };

    const handleForgotPasswordPress = () => {
        // Handle forgot password logic or navigation
        console.log('Forgot password pressed');
    };

    return (
        <View className='flex-1 bg-[#F4F5F9]'>
            <StatusBar translucent backgroundColor="transparent" />
            <View className='absolute top-0 left-0 right-0 bottom-0'>
                <Image
                    source={require("../assets/images/signIn/signIn.png")}
                    style={{ resizeMode: 'cover', height: '100%', width: '100%' }}
                />
            </View>
            <View className='absolute bottom-0 w-full flex-1 bg-[#F4F5F9] rounded-t-2xl px-4 py-6 space-y-5'>
                <View>
                    <Text style={{ fontFamily: FontFamily.poppinsBold, fontSize: FontSize.textRegularLowercase_size }}>Create account</Text>
                    <Text style={{ fontFamily: FontFamily.poppinsMedium, fontSize: FontSize.size_mini }} className='text-[#868889] mt-[-4]'>Quickly create account</Text>
                </View>
                <View className='space-y-2'>
                    <View className='flex-row items-center bg-[#FFFFFF] p-3 rounded-md'>
                        <Icon.User
                            height={20}
                            width={20}
                            stroke='gray'
                        />
                        <TextInput
                            placeholder='Name'
                            className='flex-1 ml-3'
                        />
                    </View>
                    <View className='flex-row items-center bg-[#FFFFFF] p-3 rounded-md'>
                        <Icon.Mail
                            height={20}
                            width={20}
                            stroke='gray'
                        />
                        <TextInput
                            placeholder='Student ID number'
                            className='flex-1 ml-3'
                        />
                    </View>
                    <View className='flex-row items-center bg-[#FFFFFF] p-3 rounded-md'>
                        <Icon.PhoneCall
                            height={20}
                            width={20}
                            stroke='gray'
                        />
                        <TextInput
                            placeholder='Phone number'
                            className='flex-1 ml-3'
                        />
                    </View>
                    <View className='flex-row items-center bg-[#FFFFFF] p-3 rounded-md'>
                        <Icon.Lock
                            height={20}
                            width={20}
                            stroke='gray'
                        />
                        <TextInput
                            placeholder='Password'
                            className='flex-1 ml-3'
                        />
                    </View>
                </View>
                <View className='items-end'>
                    <Pressable onPress={handleForgotPasswordPress}>
                        <Text className='text-[#407EC7]' style={{ fontFamily: FontFamily.poppinsMedium, fontSize: FontSize.size_mini }}>Forgot password</Text>
                    </Pressable>
                </View>
                <LinearGradient
                    colors={["#007022", "#54d17a", "#bcffd0"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.9, y: 0 }}
                    className='rounded-xl'
                >
                    <Pressable className='p-3 justify-center items-center' onPress={handleEvent}>
                        <Text className='text-white' style={{ fontFamily: FontFamily.poppinsSemiBold, fontSize: FontSize.size_lg }}>Login</Text>
                    </Pressable>
                </LinearGradient>
                <View className='items-center'>
                    <View className='flex-row'>
                        <Text className='text-[#868889]' style={{ fontFamily: FontFamily.poppinsMedium, fontSize: FontSize.size_mini }}>Don’t have an account?</Text>
                        <Pressable onPress={handleEvent}>
                            <Text className='text-black' style={{ fontFamily: FontFamily.poppinsMedium, fontSize: FontSize.size_mini }}> Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SignIn;
