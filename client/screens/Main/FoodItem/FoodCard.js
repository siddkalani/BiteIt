import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../../../store/Slices/cartSlice"; // Adjust the path as needed
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import * as Icon from "react-native-feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BASE_URL } from "../../../constants/constant";
import { saveCartToStorage } from "../../../utils/storageUtils"; // Adjust the path as needed
import FoodItemModal from "./FoodItemModal"; // Import the modal here

const FoodCard = ({ foodItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility

  const itemInCart = cartItems.find((item) => item._id === foodItem._id);

  const handleAddToCart = () => {
    if (foodItem.isOnline === 'true') {
      dispatch(addToCart(foodItem));
      saveCartToStorage(cartItems);
    }
  };

  const handleIncrement = () => {
    if (itemInCart && foodItem.isOnline === 'true' && itemInCart.quantity < foodItem.stock) {
      dispatch(
        updateCartQuantity({
          itemId: foodItem._id,
          quantity: itemInCart.quantity + 1,
        })
      );
      saveCartToStorage(cartItems);
    }
  };

  const handleDecrement = () => {
    if (itemInCart && itemInCart.quantity > 1) {
      dispatch(
        updateCartQuantity({
          itemId: foodItem._id,
          quantity: itemInCart.quantity - 1,
        })
      );
      saveCartToStorage(cartItems);
    } else if (itemInCart && itemInCart.quantity === 1) {
      dispatch(removeFromCart({ itemId: foodItem._id }));
      saveCartToStorage(cartItems);
    }
  };

  return (
    <View className="bg-white rounded-lg w-full items-center space-y-1 flex-1">
      {/* Food Image */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)} // Open modal on image press
        className='w-full'
      >
        <View style={{ position: 'relative', width: '100%', height: 100 }}>
          <Image
            source={{ uri: `${BASE_URL}/items_uploads/${foodItem.image}` }}
            style={{ width: "100%", height: 100, borderRadius: 8 }}
          />

          {/* Arrow-back icon positioned inside the image */}
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="white" // White to contrast against the image
            style={{
              position: 'absolute',
              top: 10, // Adjust as needed
              right: 10, // Adjust as needed
              zIndex: 1, // Ensure the icon is above the image
            }}
          />
        </View>
      </TouchableOpacity>


      {/* Food Name and Price */}
      <View className="w-full items-center flex-col justify-between">
        <Text
          style={{
            fontFamily: FontFamily.poppinsMedium,
            fontSize: FontSize.size_mini,
          }}
        >
          {foodItem.itemName}
        </Text>

        {/* Star Rating and Info */}
        <View className="flex-row items-center space-x-1">
          {/* Star Rating */}
          <Ionicons name="star" size={13} color="#FFD700" />
          <Text className="text-xs text-gray-600">3.7</Text>

          {/* Separator */}
          <Text className="text-xs text-gray-500 ml-1">|</Text>

          {/* Info */}
          <TouchableOpacity className='flex-row items-center ml-1'>
            <Ionicons name="time" size={13} color="#FFD700" />
            <Text className="text-xs text-gray-600" style={{ fontFamily: FontFamily.poppinsMedium, marginLeft: 2 }}>
              15 mins
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          color: foodItem.isOnline === 'true' ? "green" : "green",
          fontSize: 16,
        }}
        className={`font-bold ${foodItem.isOnline === 'true'? '':''}`}
      >
        ${foodItem.itemPrice}
      </Text>

      {/* Add to Cart / Increment Decrement */}
      {foodItem.isOnline === "true" ? (
        itemInCart ? (
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={handleDecrement}
              className="p-2 bg-gray-200 rounded-full"
            >
              <Icon.Minus width={16} height={16} stroke="green" />
            </TouchableOpacity>
            <View className="w-6 items-center justify-center">
              <Text
                className="text-lg font-semibold"
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {itemInCart.quantity}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleIncrement}
              className="p-2 bg-gray-200 rounded-full"
              disabled={itemInCart.quantity >= foodItem.stock}
            >
              <Icon.Plus width={16} height={16} stroke="green" />
            </TouchableOpacity>
          </View>
        ) : (
          <LinearGradient
            colors={["#007022", "#54d17a", "#bcffd0"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.9, y: 0 }}
            className="rounded-md w-full"
          >
            <TouchableOpacity
              onPress={handleAddToCart}
              className="py-1 justify-center items-center flex-row"
              style={{ alignSelf: "center" }} // Ensure the button aligns centrally
            >
              <View className="h-4 w-4">
                <Icon.Plus width={15} height={15} stroke="white" />
              </View>
              <View className="h-6 w-10">
                <Text
                  className="text-white ml-1" // Adding some margin between icon and text
                  style={{
                    fontFamily: FontFamily.poppinsMedium,
                    fontSize: FontSize.size_mini,
                    textAlignVertical: "center",
                  }}
                >
                  Add
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        )
      ) : (
        <Text className="text-red-500 font-semibold">Not Available</Text>
      )}

      {/* Food Item Modal */}
      <FoodItemModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

export default FoodCard;
