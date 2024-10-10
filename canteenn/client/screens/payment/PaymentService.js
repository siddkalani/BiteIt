import React from "react";
import {
    View,
    Text,
    Pressable,
    SafeAreaView,
    StatusBar,
    Image,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import PaymentHeader from "./PaymentHeader"; // Keeping your existing header component

const options = [
    {
        id: 1,
        title: "Table Service",
        image: require("../../assets/images/intro/introFood.png"), // Add correct path to the image
    },
    {
        id: 2,
        title: "Counter Pick-up",
        image: require("../../assets/images/intro/introFood.png"), // Add correct path to the image
    },
    {
        id: 3,
        title: "Advance Order",
        image: require("../../assets/images/intro/introFood.png"), // Add correct path to the image
    },
];

const PaymentService = () => {
    const handleOptionPress = (optionId) => {
        // Handle option press here (e.g., navigation or state update)
        console.log("Selected option:", optionId);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View className="flex-1 bg-gray-100">
                {/* Back Button with white background */}
                <View className="bg-white px-4 py-3">
                    <PaymentHeader />
                </View>

                {/* Question Text */}
                <View className="px-4 py-5">
                    <Text
                        className="text-lg font-bold"
                        style={{
                            fontSize: FontSize.size_xl,
                            fontFamily: FontFamily.poppinsSemiBold,
                        }}
                    >
                        How would you like to have your order?
                    </Text>
                </View>

                {/* Order Options */}
                <View className="px-4 space-y-5 flex-1">
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            onPress={() => handleOptionPress(option.id)}
                            className="flex-row items-center bg-white p-4 rounded-lg shadow-md"
                        >
                            <Image
                                source={option.image}
                                style={{ width: 80, height: 90, resizeMode: "cover",borderRadius:8}}
                            />
                            <Text
                                className="ml-4 text-base font-medium"
                                style={{ fontFamily: FontFamily.poppinsRegular }}
                            >
                                {option.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Proceed Button */}
                {/* <View className="p-4 mb-4 absolute w-full bottom-0">
                    <LinearGradient
                        colors={["#007022", "#54d17a", "#bcffd0"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1.9, y: 0 }}
                        className="rounded-xl"
                    >
                        <Pressable
                            // onPress={handleProceed}
                            className="p-3 justify-center items-center"
                        >
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
                </View> */}
            </View>
        </SafeAreaView>
    );
};

export default PaymentService;
