import React, { useRef } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Icon from "react-native-feather";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

const BottomBarComponent = ({
  deliveryType,
  selectedCanteen,
  handleChangeDelivery,
  sliderValue,
  handlePlaceOrder,
}) => {
  // Define Animated Event for Gesture
  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: sliderValue } }],
    { useNativeDriver: false }
  );

  const handleGestureStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      const { translationX } = nativeEvent;
      const threshold = width - 120; // Adjust threshold as needed

      if (translationX > threshold) {
        // If slider moved sufficiently
        Animated.timing(sliderValue, {
          toValue: width - 100, // Move to the end
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          handlePlaceOrder(); // Execute place order function
          resetSlider(); // Reset slider after placing order
        });
      } else {
        // Reset slider if not moved enough
        resetSlider();
      }
    }
  };

  const resetSlider = () => {
    Animated.timing(sliderValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
      {/* Delivery Information Section */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-1">
          {/* Deliver To Section */}
          <View className="flex-row items-center space-x-2 mb-2">
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={20} color="#4CAF50" />
              <Text className="ml-2 text-base font-semibold text-black">
                Delivering to
              </Text>
            </View>
            <Text className="text-sm font-medium text-gray-500">
              {deliveryType}
            </Text>
          </View>

          {/* From Section */}
          <View className="flex-row items-center space-x-2">
            <View className="flex-row items-center">
              <Ionicons name="restaurant-outline" size={20} color="#4CAF50" />
              <Text className="ml-2 text-base font-semibold text-black">
                From
              </Text>
            </View>
            <Text className="text-sm font-medium text-gray-500">
              {selectedCanteen}
            </Text>
          </View>
        </View>

        {/* Change Button */}
        <TouchableOpacity
          onPress={handleChangeDelivery}
          className="flex-row items-center"
        >
          <Icon.ChevronDown
            width={16}
            height={16}
            stroke="green"
            strokeWidth="3"
          />
          <Text className="text-green-600 font-semibold ml-1">Change</Text>
        </TouchableOpacity>
      </View>

      {/* Slide to Pay */}
      <View style={{ alignItems: "center" }}>
        <LinearGradient
          colors={["green", "green"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: width - 32,
            height: 60,
            borderRadius: 99,
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
            Slide to Pay
          </Text>

          <PanGestureHandler
            onGestureEvent={handleGestureEvent}
            onHandlerStateChange={handleGestureStateChange}
          >
            <Animated.View
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
          </PanGestureHandler>
        </LinearGradient>
      </View>
    </View>
  );
};

export default BottomBarComponent;
