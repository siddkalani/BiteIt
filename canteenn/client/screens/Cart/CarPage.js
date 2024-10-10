import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StatusBar } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../store/Slices/cartSlice";
import * as Icon from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontFamily, FontSize } from "../../GlobalStyles";

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
    <View className="flex-row items-center space-x-2 py-2 px-4 bg-slate-100 rounded-lg mb-2">
      <Image
        source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }}
        style={{ width: 60, height: 60, borderRadius: 8 }}
      />
      <View className="flex-1">
        <Text className="font-semibold text-lg">{item.itemName}</Text>
        <Text className="text-gray-500">${item.itemPrice}</Text>
        
      </View>
      <View className="flex-row items-center space-x-2 mt-2">
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={handleDecrement}
              className="p-2 bg-gray-200 rounded-full"
            >
              <Icon.Minus width={16} height={16} stroke="green" />
            </TouchableOpacity>
            <View className="w-3 items-center justify-center">
            <Text>
              {item.quantity}
            </Text>
            </View>
            <TouchableOpacity
              onPress={handleIncrement}
              className="p-2 bg-gray-200 rounded-full"
            >
              <Icon.Plus width={16} height={16} stroke="green" />
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );

  return (
    // <SafeAreaView className="flex-1 bg-gray-100 p-4">
    //   {cartItems.length === 0 ? (
    //     <Text className="text-center text-lg font-semibold">Your cart is empty</Text>
    //   ) : (
    //     <FlatList
    //       data={cartItems}
    //       keyExtractor={(item) => item._id}
    //       renderItem={renderCartItem}
    //     />
    //   )}
    // </SafeAreaView>

    <View className="flex-1 justify-start bg-opacity-50">
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        translucent
      />
        <View className="bg-white px-4 py-2 rounded-none">
          {/* Use the separated SearchHeader component */}
          <View className="flex-row items-center space-x-4">
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
          {/* after header */}
          <View className='mt-4'>
            {cartItems.length === 0 ? (
              <Text className="text-center text-lg font-semibold">Your cart is empty</Text>
            ) : (
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item._id}
                renderItem={renderCartItem}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CartPage;
