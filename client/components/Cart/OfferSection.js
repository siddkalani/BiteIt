import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const OffersSection = ({ offerDiscount, setModalVisible }) => (
  <View className="bg-white p-3 rounded-lg shadow-md mb-2">
    <View className="flex-row justify-between items-center">
      <Text className="text-lg font-semibold">Offers</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text className="text-green-600">View offers</Text>
      </TouchableOpacity>
    </View>
    <Text className="text-gray-500 mt-2 bg-green-100 p-2 rounded-lg">
      ₹{offerDiscount} Cashback applied!
    </Text>
  </View>
);

export default OffersSection;
