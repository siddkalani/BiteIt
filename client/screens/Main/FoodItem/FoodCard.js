import React from "react";
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
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../../../constants/constant";
import { saveCartToStorage } from "../../../utils/storageUtils"; // Adjust the path as needed

const FoodCard = ({ foodItem }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const itemInCart = cartItems.find((item) => item._id === foodItem._id);

  // const handleAddToCart = () => {
  //   dispatch(addToCart(foodItem));
  //   saveCartToStorage(cartItems); // Save cart to AsyncStorage
  // };

  // const handleIncrement = () => {
  //   if (itemInCart) {
  //     dispatch(
  //       updateCartQuantity({
  //         itemId: foodItem._id,
  //         quantity: itemInCart.quantity + 1,
  //       })
  //     );
  //     saveCartToStorage(cartItems); // Save cart to AsyncStorage
  //   }
  // };

  // const handleDecrement = () => {
  //   if (itemInCart && itemInCart.quantity > 1) {
  //     dispatch(
  //       updateCartQuantity({
  //         itemId: foodItem._id,
  //         quantity: itemInCart.quantity - 1,
  //       })
  //     );
  //     saveCartToStorage(cartItems);
  //   } else if (itemInCart && itemInCart.quantity === 1) {
      
  //     dispatch(removeFromCart({ itemId: foodItem._id }));
  //     // saveCartToStorage(cartItems);,
  //   }
  
  //   saveCartToStorage(cartItems); 
  // };

  const handleAddToCart = () => {
    // Check if the item is already in the cart
    if (itemInCart) {
      // If it is, just increment the quantity
      handleIncrement();
    } else {
      // If not, add it to the cart
      dispatch(addToCart(foodItem));
      saveCartToStorage([...cartItems, { ...foodItem, quantity: 1 }]); // Save new item to AsyncStorage
    }
  };

  const handleIncrement = () => {
    if (itemInCart) {
      const newQuantity = itemInCart.quantity + 1;
      dispatch(
        updateCartQuantity({
          itemId: foodItem._id,
          quantity: newQuantity,
        })
      );
      saveCartToStorage(cartItems.map(item => 
        item._id === foodItem._id ? { ...item, quantity: newQuantity } : item
      )); // Update storage
    }
  };

  const handleDecrement = () => {
    if (itemInCart) {
      const newQuantity = itemInCart.quantity - 1;

      if (newQuantity > 0) {
        dispatch(
          updateCartQuantity({
            itemId: foodItem._id,
            quantity: newQuantity,
          })
        );
        saveCartToStorage(cartItems.map(item => 
          item._id === foodItem._id ? { ...item, quantity: newQuantity } : item
        )); // Update storage
      } else {
        // If quantity is 0, remove item from cart
        dispatch(removeFromCart({ itemId: foodItem._id }));
        saveCartToStorage(cartItems.filter(item => item._id !== foodItem._id)); // Remove from storage
      }
    }
  };

  return (
      <View className="bg-white rounded-lg w-full items-center space-y-1 flex-1">
        {/* Food Image */}
        <Image
          source={{ uri: `${BASE_URL}/items_uploads/${foodItem.image}` }}
          style={{ width: "100%", height: 100, borderRadius: 8 }}
        />

        {/* Food Name and Price */}
        <View className="w-full items-center flex-row justify-between">
          <Text
            style={{
              fontFamily: FontFamily.poppinsMedium,
              fontSize: FontSize.size_mini,
            }}
          >
            {foodItem.itemName}
          </Text>

          {/* Info Icon and Time Text */}
          <View className="flex-row items-center justify-center space-x-1">
            <View className=''>
            <Icon.Clock width={12} height={12} stroke="gray" />
            </View>
            <View className='justify-center items-center'>
            <Text
              style={{
                // fontFamily: FontFamily.poppinsRegular,
                // fontSize: FontSize.size_small,
                color: "gray",
              }}
              className='text-xs text-center'
            >
              15 mins
            </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            // fontFamily: FontFamily.poppinsMedium,
            // fontSize: FontSize.size_mini,
          }}
          className="text-green-600 font-bold text-lg"
        >
          ${foodItem.itemPrice}
        </Text>

        {/* Add to Cart / Increment Decrement */}
        {itemInCart ? (
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
        )}
      </View>
  );
};

export default FoodCard;
