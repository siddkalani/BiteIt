import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../store/Slices/cartSlice";
import * as Icon from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "@env";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ itemId }));
  };

  const handleIncrement = (itemId) => {
    const item = cartItems.find(item => item._id === itemId);
    if (item) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find(item => item._id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity - 1 }));
    }
  };

  const renderCartItem = ({ item }) => (
    <View className="flex-row items-center space-x-2 py-2 px-4 bg-white rounded-lg mb-2">
      <Image
        source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }}
        style={{ width: 60, height: 60, borderRadius: 8 }}
      />
      <View className="flex-1">
        <Text className="font-semibold text-lg">{item.itemName}</Text>
        <Text className="text-gray-500">${item.itemPrice}</Text>
        <View className="flex-row items-center space-x-2 mt-2">
          <TouchableOpacity
            onPress={() => handleDecrement(item._id)}
            className="p-2 bg-gray-200 rounded-full"
          >
            <Icon.Minus width={16} height={16} stroke="black" />
          </TouchableOpacity>
          <Text>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleIncrement(item._id)}
            className="p-2 bg-gray-200 rounded-full"
          >
            <Icon.Plus width={16} height={16} stroke="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveFromCart(item._id)}
        className="p-2 bg-red-500 rounded-full"
      >
        <Icon.Trash2 width={16} height={16} stroke="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      {cartItems.length === 0 ? (
        <Text className="text-center text-lg font-semibold">Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item._id}
          renderItem={renderCartItem}
        />
      )}
    </SafeAreaView>
  );
};

export default CartPage;
