import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Dimensions,
    ScrollView,
    StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Icon from "react-native-feather";
import { BlurView } from "expo-blur";

const FoodItemModal = ({ isVisible, onClose }) => {
    const { height } = Dimensions.get("window");

    const handlePress = () => {
        // Handle any press actions here
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    backgroundColor: "rgba(0, 0, 0, 0)", // Semi-transparent background
                }}
            >
                <View
                    style={{
                        height: height / 2, // Set modal to half the screen height
                        backgroundColor: "white",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        overflow: "hidden",
                    }}
                >

                    <View className="flex-1">

                        <View className="flex-1">
                            <View className="w-full h-[200]">
                                <Image
                                    source={{ uri: "https://content.jdmagicbox.com/v2/comp/mumbai/g6/022pxx22.xx22.190920191150.c6g6/catalogue/burger-nation-andheri-west-mumbai-burger-joints-bfj00ads8q.jpg" }} // Hardcoded image
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                                <BlurView
                                    intensity={40}
                                    tint="dark"
                                    style={{
                                        position: "absolute",
                                        top: 10,
                                        left: 16,
                                        width: 40,
                                        height: 40,
                                        borderRadius: 24,
                                        overflow: "hidden",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity onPress={onClose} style={{ padding: 2 }}>
                                        <Ionicons name="arrow-back" size={28} color="white" />
                                    </TouchableOpacity>
                                </BlurView>
                            </View>
                        </View>

                        <LinearGradient colors={["#d4f4d1", "#ffffff"]} className="flex-1">
                            <View className="flex-1 rounded-t-2xl">
                                <View className="space-y-3 px-4 py-2 flex-1 rounded-t-2xl justify-between">
                                    <View>
                                        <View className="flex-row items-center justify-between">
                                            <Text className="mt-[-2] text-2xl">
                                                Pizza
                                            </Text>
                                            <Text className="text-[#54D17A] text-2xl">
                                                $10.99
                                            </Text>

                                        </View>

                                        <View className='mt-1'>
                                            <Text style={{ fontSize: 14 }}>
                                                A delicious cheesy pizza topped with fresh ingredients.
                                            </Text>
                                        </View>
                                    </View>

                                    <View className="space-y-2 mb-4">
                                        <LinearGradient
                                            colors={["#007022", "#54d17a", "#bcffd0"]}
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1.9, y: 0 }}
                                            className="rounded-xl"
                                        >
                                            <TouchableOpacity
                                                className="flex-row space-x-2 p-3 justify-center items-center"
                                                onPress={handlePress}
                                            >
                                                <Icon.ShoppingBag width={20} height={20} stroke="white" />
                                                <Text className="text-white" style={{ fontSize: 16 }}>
                                                    Add to cart
                                                </Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default FoodItemModal;