// components/Cart/TipSectionComponent.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const TipSectionComponent = () => {
  return (
    <View className="bg-white p-3 rounded-lg shadow-md mb-2">
      <Text className="text-lg font-semibold">
        Please tip your delivery partner
      </Text>
      <View className="flex-row justify-start space-x-4 mt-3">
        <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-md">
          <Text>₹50</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-md">
          <Text>₹70</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-md">
          <Text>₹100</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-md">
          <Text>Other</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TipSectionComponent;
