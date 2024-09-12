// SearchHeader.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontFamily, FontSize } from "../../GlobalStyles";

const CartHeader = () => {
  return (
    <View className="flex-row items-center space-x-3">
      <TouchableOpacity
        // onPress={closeSearchModal}
        className="w-10 h-10 justify-center absolute"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View className="flex-1 items-center">
        <Text
          style={{
            fontFamily: FontFamily.poppinsMedium,
            fontSize: FontSize.size_lg,
            lineHeight: 28,
          }}
          className="text-black"
        >
          Food Cart
        </Text>
      </View>
    </View>
  );
};

export default CartHeader;
