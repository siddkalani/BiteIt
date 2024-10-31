// components/Cart/BillingDetailsComponent.js
import React from "react";
import { View, Text } from "react-native";

const BillingDetailsComponent = ({
  totalItems,
  totalBill,
  deliveryCharge,
  taxes,
  donation,
  finalTotal,
}) => {
  return (
    <View className="bg-white p-3 rounded-lg shadow-md mb-2">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold">
          Item Total ({totalItems} items)
        </Text>
        <Text>₹{totalBill.toFixed(2)}</Text>
      </View>
      <View className="flex-row justify-between mt-1">
        <Text className="text-gray-500">Delivery Charge</Text>
        <Text>₹{deliveryCharge}</Text>
      </View>
      <View className="flex-row justify-between mt-1">
        <Text className="text-gray-500">Taxes & charges</Text>
        <Text>₹{taxes.toFixed(2)}</Text>
      </View>
      <View className="flex-row justify-between mt-1">
        <Text className="text-gray-500">Donate ₹5 to charity</Text>
        <Text>₹{donation}</Text>
      </View>
      <View className="flex-row justify-between mt-1">
        <Text className="font-semibold">Grand Total</Text>
        <Text className="font-semibold">₹{finalTotal.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default BillingDetailsComponent;
