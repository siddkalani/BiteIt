import * as React from "react";
import { StatusBar, Pressable, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import SafeAreaAndroid from "../../components/utils/SafeAreaAndroid";
import Ionicons from "react-native-vector-icons/Ionicons";
const introFoodImage = require("../../assets/images/intro/introFood.png");

const { width, height } = Dimensions.get('window');

const Intro1 = () => {
        const navigation = useNavigation();
        console.log(SafeAreaAndroid.AndroidSafeArea);

    const handlePress = () => {
        navigation.navigate('LogIn');
    };

    const handleSkip = () => {
        navigation.navigate('ClientTabs', { isAuth: false }); // Pass isAuth as false
    };

    return (
        <View style={SafeAreaAndroid.AndroidSafeArea} className="flex-1">
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            
            {/* Skip button with icon */}
            <TouchableOpacity
                onPress={handleSkip}
                className="absolute top-12 right-5 bg-slate-200 p-2 rounded-lg flex-row items-center z-10"
            >
                <Text className="text-blue-500 text-sm font-semibold mr-1">
                    Skip
                </Text>
                <Ionicons name="arrow-forward" size={16} color="#0070FF" />
            </TouchableOpacity>

            <View className="flex-1 items-center justify-between">
                {/* Background Image */}
                <Image
                    source={introFoodImage}
                    style={{ resizeMode: 'cover', height: '100%', width: '100%' }}
                    className="absolute bottom-[-10] w-full h-full -z-10"
                />
                
                {/* Main content with title and subtitle */}
                <View className="bg-white rounded-b-full" style={{ height: height * 0.5, width: width * 1.2 }}>
                    <View className="w-full items-center justify-center rounded-b-lg" style={{ height: height * 0.5 }}>
                        <Text style={{ fontFamily: FontFamily.poppinsSemiBold, fontSize: FontSize.size_11xl }} className="text-center text-[#2b054c]">
                            Order Food{'\n'}
                            <Text style={{ fontFamily: FontFamily.poppinsSemiBold, fontSize: FontSize.size_11xl }} className="text-[#2b054c]">
                                Without cash
                            </Text>
                        </Text>
                        <View className="mt-1">
                            <Text style={{ fontFamily: FontFamily.poppinsMedium, fontSize: FontSize.size_mini }} className="text-[#868889] text-center">
                                Enjoy a hassle-free experience and{'\n'}
                                avoid the need to carry cash with you{'\n'}
                                when ordering food.
                            </Text>
                        </View>
                    </View>
                </View>
                
                {/* Get Started Button */}
                <View className="w-full px-4 py-6">
                    <LinearGradient
                        colors={["#1d0336", "#2b054c", "#bcffd0"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1.9, y: 0 }}
                        className="rounded-xl"
                    >
                        <Pressable className="p-3 justify-center items-center" onPress={handlePress}>
                            <Text className="text-white" style={{ fontFamily: FontFamily.poppinsSemiBold, fontSize: FontSize.size_lg }}>
                                Get Started
                            </Text>
                        </Pressable>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
};

export default Intro1;
