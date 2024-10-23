import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Icon from "react-native-feather";

const PaymentMethod = ({ handlePayment }) => (
  <TouchableOpacity
    onPress={handlePayment}
    className="bg-white p-3 rounded-lg shadow-md mb-2 flex-row justify-between"
  >
    <View>
      <Text className="text-lg font-semibold">Payment Method</Text>
      <Text className="text-gray-500 mt-1">UPI (Default)</Text>
    </View>
    <Icon.ChevronRight width={24} height={24} stroke="gray" />
  </TouchableOpacity>
);

export default PaymentMethod;
