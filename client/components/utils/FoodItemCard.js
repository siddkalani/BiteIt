import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Icon from "react-native-feather";
import { FontFamily } from "../../GlobalStyles"; // Make sure the paths match
import { BASE_URL } from "../../constants/constant"; 

const FoodItemCard = ({ item, handleAddToCart, handleIncrement, handleDecrement, itemInCart }) => {
  return (
    <View
      key={item._id}
      className="bg-white rounded-lg shadow-sm flex-row items-center mb-4 px-3 py-2"
    >
      {/* Food Image */}
      <Image
        source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }} // Adjust image path if needed
        className="h-16 w-16 rounded-lg" // Slightly larger image with square rounded corners
        resizeMode="cover"
      />

      <View className="flex-1 ml-4">
        {/* Item Name */}
        <Text className="text-base font-semibold" style={{ fontFamily: FontFamily.poppinsMedium }}>
          {item.itemName}
        </Text>

        {/* Star Rating and Info */}
        <View className="flex-row items-center space-x-1">
          {/* Star Rating */}
          <Ionicons name="star" size={13} color="#FFD700" />
          <Text className="text-xs text-gray-600">{item.rating || "3.7"}</Text>

          {/* Separator */}
          <Text className="text-xs text-gray-500 ml-1">|</Text>

          {/* Info */}
          <TouchableOpacity className='flex-row items-center ml-1'>
            <Ionicons name="time" size={13} color="#FFD700" />
            <Text className="text-xs text-gray-600" style={{ fontFamily: FontFamily.poppinsMedium, marginLeft: 2 }}>
              Info
            </Text>
          </TouchableOpacity>
        </View>

        {/* Price */}
        <Text className="text-base text-black mt-1" style={{ fontFamily: FontFamily.poppinsSemiBold }}>
          ₹{item.itemPrice}
        </Text>
      </View>

      {/* Add to Cart or Quantity Control */}
      {itemInCart ? (
        <View className="flex-row items-center space-x-1 bg-gray-200 rounded-md">
          <TouchableOpacity onPress={() => handleDecrement(item)} className="p-2">
            <Icon.Minus width={16} height={16} stroke="green" strokeWidth="3" />
          </TouchableOpacity>
          <View className="w-3.5 items-center justify-center">
            <Text adjustsFontSizeToFit numberOfLines={1} className="font-bold">
              {itemInCart.quantity}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleIncrement(item)} className="p-2">
            <Icon.Plus width={16} height={16} stroke="green" strokeWidth="3" />
          </TouchableOpacity>
        </View>
      ) : (
        <LinearGradient
          colors={["#007022", "#54d17a", "#bcffd0"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.9, y: 0 }}
          className="rounded-md"
          style={{ paddingHorizontal: 10, paddingVertical: 6 }}
        >
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            className="flex-row items-center justify-center"
            style={{ borderRadius: 5 }}
          >
            <Icon.Plus width={15} height={15} stroke="white" strokeWidth={3} />
            <Text className="text-white ml-1 font-bold">Add</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </View>
  );
};

export default FoodItemCard;
