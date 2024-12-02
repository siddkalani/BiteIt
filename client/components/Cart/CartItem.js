// components/Cart/CartItemComponent.js
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as Icon from "react-native-feather";

const CartItemComponent = ({
  item,
  handleIncrement,
  handleDecrement,
  handleRemoveFromCart,
  itemOnlineStatus,
}) => {
  const isItemOnline = itemOnlineStatus[item._id] ?? true; 
  return (
    <View className="flex-row items-center space-x-2 my-1 p-3 bg-white rounded-lg">
      {/* <Image
        source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }}
        style={{ width: 60, height: 60, borderRadius: 8 }}
      /> */}
      <View className="flex-1">
        <Text className="font-semibold text-lg">{item.itemName}</Text>
        <Text className="text-gray-500">₹{item.itemPrice}</Text>
        {/* Display availability status if item is offline */}
        {!isItemOnline && (
          <Text className="text-red-500 font-semibold">Not Available</Text>
        )}
      </View>
      <View className="flex-row items-center space-x-2 h-8">
        <View className="flex-row items-center space-x-2 bg-gray-200 rounded-md">
          <TouchableOpacity
            onPress={() => handleDecrement(item._id)}
            disabled={!itemOnlineStatus[item._id]}
            className="p-2 "
          >
            <Icon.Minus width={16} height={16} stroke="#2b054c" strokeWidth="3" />
          </TouchableOpacity>
          <View className="w-3.5 items-center justify-center">
            <Text adjustsFontSizeToFit numberOfLines={1} className="font-bold">
              {item.quantity}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleIncrement(item._id)}
            disabled={!itemOnlineStatus[item._id]}
            className="p-2"
          >
            <Icon.Plus width={16} height={16} stroke="#2b054c" strokeWidth="3" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => handleRemoveFromCart(item._id)}
          className="bg-red-200 p-2 rounded-md justify-center items-center"
        >
          <Icon.Trash2 color={"red"} height={16} width={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItemComponent;
