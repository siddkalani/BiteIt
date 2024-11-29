// EmptyState.js
import React from "react";
import { View, Text, Image } from "react-native";

const EmptyState = ({ activeTab }) => {
  // Define images based on activeTab if needed
  const getImageSource = () => {
    switch (activeTab) {
      case "Pending":
        return require("../../../assets/images/admin/storeOpen.png");
      case "Preparing":
        return require("../../../assets/images/admin/storeOpen.png");
      case "Ready":
        return require("../../../assets/images/admin/storeOpen.png");
      case "PickedUp":
        return require("../../../assets/images/admin/storeOpen.png");
      default:
        return require("../../../assets/images/admin/storeOpen.png");
    }
  };

  const getMessage = () => {
    switch (activeTab) {
      case "Pending":
        return "No pending orders at the moment.";
      case "Preparing":
        return "No orders are being prepared right now.";
      case "Ready":
        return "No orders are ready for pickup.";
      case "PickedUp":
        return "No orders have been picked up yet.";
      default:
        return "No orders available.";
    }
  };

  return (
    <View className="flex-1 justify-center items-center mt-10">
      <Image
        source={getImageSource()}
        style={{ width: 150, height: 150 }}
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold mt-4">You are Online</Text>
      <Text className="text-gray-500 text-lg">{getMessage()}</Text>
    </View>
  );
};

export default EmptyState;
