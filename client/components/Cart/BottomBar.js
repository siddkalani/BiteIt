import React from "react";
import { View, TouchableOpacity, Animated, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Icon from "react-native-feather";

const { width } = Dimensions.get("window");

const BottomBar = ({ handleChangeDelivery, sliderValue, panResponder, handlePlaceOrder }) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-1">
          <View className="flex-row items-center space-x-2 mb-2">
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={20} color="#4CAF50" />
              <Text className="ml-2 text-base font-semibold text-black">Delivering to</Text>
            </View>
            <Text className="text-sm font-medium text-gray-500">B-203</Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <View className="flex-row items-center">
              <Ionicons name="restaurant-outline" size={20} color="#4CAF50" />
              <Text className="ml-2 text-base font-semibold text-black">From</Text>
            </View>
            <Text className="text-sm font-medium text-gray-500">Canteen1</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleChangeDelivery} className="flex-row items-center">
          <Icon.ChevronDown width={16} height={16} stroke="green" strokeWidth="3" />
          <Text className="text-green-600 font-semibold ml-1">Change</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={{ alignItems: "center" }}>
          <LinearGradient
            colors={["green", "green"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: width - 32, height: 60, borderRadius: 99, justifyContent: "center" }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>Slide to Pay</Text>
            <Animated.View
              {...panResponder.panHandlers}
              style={{
                position: "absolute",
                left: sliderValue,
                marginLeft: 7,
                width: 50,
                height: 50,
                borderRadius: 99,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 5,
              }}
            >
              <Icon.ArrowRight width={24} height={24} stroke="green" />
            </Animated.View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default BottomBar;
