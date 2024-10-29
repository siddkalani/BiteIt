import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as Icon from "react-native-feather";
import { BASE_URL } from "../../constants/constant";

const CartItem = ({ item, handleIncrement, handleDecrement, handleRemoveFromCart }) => (
  <View className="flex-row items-center space-x-2 my-1 p-3 bg-white rounded-lg">
    <Image source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }} style={{ width: 60, height: 60, borderRadius: 8 }} />
    <View className="flex-1">
      <Text className="font-semibold text-lg">{item.itemName}</Text>
      <Text className="text-gray-500">₹{item.itemPrice}</Text>
      {!item.isOnline && (
        <Text className="text-red-500 font-semibold">Not Available</Text>
      )}
    </View>
    <View className="flex-row items-center space-x-2 h-8">
      <TouchableOpacity onPress={() => handleDecrement(item._id)} className="p-2">
        <Icon.Minus width={16} height={16} stroke="green" strokeWidth="3" />
      </TouchableOpacity>
      <Text>{item.quantity}</Text>
      <TouchableOpacity onPress={() => handleIncrement(item._id)} className="p-2">
        <Icon.Plus width={16} height={16} stroke="green" strokeWidth="3" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemoveFromCart(item._id)} className="bg-red-200 p-2 rounded-md justify-center items-center">
        <Icon.Trash2 color="red" height={16} width={16} />
      </TouchableOpacity>
    </View>
  </View>
);

export default CartItem;
