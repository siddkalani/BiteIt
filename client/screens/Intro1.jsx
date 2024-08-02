import * as React from "react";
import { SafeAreaView, StatusBar, Pressable, Text, View, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../GlobalStyles";
import SafeAreaAndroid from "../components/SafeAreaAndroid";

const { width, height } = Dimensions.get('window');

const Intro1 = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('SignIn');
    };

    return (
        <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea} className='flex-1 bg-white'>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View className="flex-1 items-center justify-between">
                <Image
                    source={require("../assets/images/intro/ellipse-main.png")}
                    style={{ resizeMode: 'cover', height: height * 0.6, width: width * 1.2, top: -height * 0.1 }}
                    className='absolute h-full w-full'
                />
                <Image
                    source={require("../assets/images/intro/introFood.png")}
                    style={{ resizeMode: 'cover', height: '100%', width: '100%' }}
                    className='absolute bottom-[-10] w-full h-full -z-10'
                />
                <View className='w-full items-center justify-center' style={{ height: height * 0.5 }}>
                    <Text style={{ fontFamily: FontFamily.poppinsSemiBold, fontSize: FontSize.size_11xl }} className='text-center'>
                        Order Food{'\n'}
                        <Text style={{ fontFamily: FontFamily.poppinsSemiBold, fontSize: FontSize.size_11xl }} className='text-green-700'>Without cash</Text>
                    </Text>
                    <View className='mt-1'>
                        <Text style={{ fontFamily: FontFamily.poppinsMedium, fontSize: FontSize.size_mini }} className='text-[#868889] text-center'>
                            Enjoy a hassle-free experience and{'\n'}
                            avoid the need to carry cash with you{'\n'}
                            when ordering food.
                        </Text>
                    </View>
                </View>
                <View className='w-full px-4 py-6'>
                    <LinearGradient
                        colors={["#007022", "#54d17a", "#bcffd0"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1.9, y: 0 }}
                        className='rounded-xl'
                    >
                        <Pressable className='p-3 justify-center items-center' onPress={handlePress}>
                            <Text className='text-white' style={{ fontFamily: FontFamily.poppinsSemiBold, fontSize: FontSize.size_lg }}>Get Started</Text>
                        </Pressable>
                    </LinearGradient>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Intro1;
